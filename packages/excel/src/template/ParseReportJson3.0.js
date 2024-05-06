import {
  execute,
  PluginTool,
} from '../plugin';

console.log(execute, PluginTool);

function genSpans({ spans, row, startRow }) {
    const newSpans = [];
    let maxRowCount = 1;
    spans.forEach(function (span) {
        if (span.row === row) {
            newSpans.push({
                ...span,
                row: row - startRow,
            });

            if (span.rowCount > maxRowCount) {
                maxRowCount = span.rowCount;
            }
        }
    });

    return {
        spans: newSpans,
        maxRowCount,
    };
}

function parseRowPlugins({ dataTable, pluginTool }) {
    Object.entries(dataTable).forEach(function ([col, { tag }]) {
        parsePlugins({
            tag,
            dataTable: dataTable[col],
            pluginTool,
        });
    });
}

function parsePlugins({ tag, dataTable, pluginTool }) {
    if (tag) {
        const plugins = JSON.parse(tag).plugins;
        if (Array.isArray(plugins)) {
            const { type, value } = execute('', plugins, pluginTool);
            const key = type === 'formula' ? type : 'value';
            dataTable[key] = value;
        }
    }
}

function genPageIndexHandler(index) {
    return function () {
        return index;
    };
}

function jsonDeepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function getOldRowHeight(rows, row) {
    return rows?.[row] || { size: 20 };
}

function changeRulesRow({ row, rules, newRules }) {
    rules.forEach(function (rule) {
        newRules.push({
            ...rule,
            ranges: [
                {
                    ...rule.ranges[0],
                    row,
                },
            ],
        });
    });
}

function getRowRules({ rules, row }) {
    let result = rules;
    if (Number.isFinite(row) && row >= 0) {
        result =
            rules.filter(function ({ ranges }) {
                return ranges.some(function ({ row: _row, rowCount }) {
                    return _row <= row && row < _row + rowCount;
                });
            }) || [];
    }
    return result;
}

function getColRules({ rules, col, colHandler }) {
    let result = rules;
    if (Number.isFinite(col) && col >= 0) {
        result = result.filter(function (item) {
            const { ranges } = item;
            const res = ranges.some(function ({ col: _col, colCount }) {
                return _col <= col && col < _col + colCount;
            });

            if (res && typeof colHandler === 'function') {
                colHandler(jsonDeepCopy(item));
            }
            return res;
        });
    }

    return result;
}

export default class ParseReportJson {
    constructor(jsonData, datas, _template = {}) {
        const _this = this;
        const newSheets = {};
        const groupsDatas = {};
        let sheetCount = jsonData.sheetCount;
        const template = { ..._template };
        let groupTableCode = undefined;
        const changedGroupNames = []; //用于判断sheet名称是否重复
        //如果有模板，则对数据进行分组，每个组一个sheet
        Object.entries(_template).forEach(function ([
            sheetName,
            templateValue,
        ]) {
            const groups = templateValue?.groups;
            if (!groups) {
                return;
            }
            const templateInfo = template[sheetName];
            const currentSheetDatas = {};
            //对数据进行分组，分组的名称就是sheet的名称
            Object.entries(groups).some(function ([dsName, group]) {
                if (!groupTableCode) {
                    groupTableCode = dsName;
                }
                currentSheetDatas[dsName] = {};
                const toBeGroupedData = datas[dsName];
                if (
                    Array.isArray(toBeGroupedData) &&
                    Array.isArray(group) &&
                    group.length
                ) {
                    const groupFieldCode = group?.[0]?.code;
                    toBeGroupedData.forEach(function (item) {
                        const groupName = item[groupFieldCode];
                        if (
                            !Array.isArray(currentSheetDatas[dsName][groupName])
                        ) {
                            currentSheetDatas[dsName][groupName] = [];
                        }
                        currentSheetDatas[dsName][groupName].push(item);
                    });
                }
            });
            const sheet = jsonData?.sheets?.[sheetName];
            if (sheet) {
                const cobySheet = JSON.stringify(sheet);
                //根据分组名称创建sheet，Object.values(groupsDatas)[0]，只支持一个实体进行分组
                const grouedData = Object.values(currentSheetDatas)[0];
                const groupNames = Object.keys(grouedData);
                groupNames.forEach(function (_newSheetName, index) {
                    let newSheetName = _newSheetName;
                    //处理同名的sheet
                    let suffix = 1;
                    while (jsonData.sheets[newSheetName]) {
                        newSheetName = `${_newSheetName}${suffix++}`;
                    }
                    while (
                        (groupNames.includes(newSheetName) &&
                            newSheetName !== _newSheetName) ||
                        changedGroupNames.includes(newSheetName)
                    ) {
                        newSheetName = `${_newSheetName}${suffix++}`;
                    }
                    //更改修正后的名称
                    if (newSheetName !== _newSheetName) {
                        const cache = currentSheetDatas[_newSheetName];
                        delete currentSheetDatas[_newSheetName];
                        currentSheetDatas[newSheetName] = cache;
                    }
                    changedGroupNames.push(newSheetName);

                    groupsDatas[newSheetName] = currentSheetDatas;

                    if (index <= 0) {
                        sheet.name = newSheetName;
                    } else {
                        const sheet = JSON.parse(cobySheet);
                        sheet.name = newSheetName;
                        sheet.isSelected = false;
                        sheet.index = sheetCount++;
                        sheet.order = sheet.index;
                        jsonData.sheets[newSheetName] = sheet;
                        jsonData.sheetCount += 1;
                    }
                    template[newSheetName] = templateInfo;
                });
            }
            //只支持一个实体进行分组
            return true;
        });

        Object.values(jsonData.sheets).forEach(function (_sheet) {
            let sheet = _sheet;
            const {
                name,
                visible = 1,
                spans = [],
                rowCount = 200,
                data,
                rows = {} /* 行高 */,
                conditionalFormats = {},
                printInfo: {
                    paperSize: { height = 1100 },
                    margin = {
                        bottom: 75,
                        footer: 30,
                        header: 30,
                        left: 70,
                        right: 70,
                        top: 75,
                    },
                },
            } = sheet;
            //当前sheet不可见，直接跳过解析
            if (visible === 0) {
                return;
            }

            const {
                bottom: marginBottom,
                footer: marginFooter,
                header: marginHeader,
                top: marginTop,
            } = margin;

            const templateInfo = template[name];
            const isTemplate = templateInfo ? true : false;

            let { tableInfos, headerInfos, footerInfos } = _this.splitTemp(
                {
                    spans,
                    rows,
                    rules: conditionalFormats?.rules,
                    dataTable: data?.dataTable,
                    rowCount,
                },
                groupTableCode
            );

            headerInfos = _this.beforeRender(headerInfos, datas);
            footerInfos = _this.beforeRender(footerInfos, datas);
            const contentHeight =
                height -
                marginBottom -
                marginFooter -
                marginHeader -
                marginTop -
                headerInfos.height -
                footerInfos.height;

            const pageInfos = {
                height: 0,
                spans: [],
                rows: {},
                rules: [],
                dataTable: {},
                rowCount: 0,
                contentHeight,
                headerInfos,
                footerInfos,
                isTemplate,
                pageIndex: 1,
                pageTotal: 1,
                pageSize: 0,
                sheet,
            };

            _this.enhanceTable({
                isTemplate,
                tableInfos,
                pageInfos,
                datas,
                groupsDatas,
                sheetName: name,
            });

            const pluginTool = new PluginTool();
            const totalPagesHandler = function () {
                return pageInfos.pageTotal;
            };
            pageInfos.totalPagesHandler = totalPagesHandler;

            const pageHander = genPageIndexHandler(1);

            pluginTool.setPageHandler(pageHander);
            pluginTool.setTotalPagesHandler(totalPagesHandler);

            /*   pluginTool.setFieldIndexHandler(function (tableCode, fieldCode) {
                return tableFieldIndexs?.[tableCode]?.[fieldCode];
            });
            pluginTool.setDataCountHandler(function (tableCode) {
                return tableDataCounts[tableCode];
            }); */
            debugger;
            _this.render({
                pageInfos,
                isTemplate,
                headerInfos,
                footerInfos,
                pluginTool,
                tableInfos,
                templateInfo,
                newSheets,
                sheetCount,
            });
        });

        Object.entries(newSheets).forEach(function ([name, info]) {
            jsonData.sheets[name] = info;
            jsonData.sheetCount += 1;
        });
    }
    renderTableHandler({ dataTable, pageInfos, tableData }) {
        const curRowDataTable = jsonDeepCopy(dataTable);

        Object.entries(curRowDataTable).forEach(function ([
            rowStr,
            rowDataTable,
        ]) {
            const row = Number(rowStr) + pageInfos.rowCount;
            pageInfos.dataTable[row] = {};
            Object.entries(rowDataTable).forEach(function ([
                col,
                colDataTable,
            ]) {
                const { bindingPath } = colDataTable;
                if (bindingPath?.includes?.('.')) {
                    const [tableCode, fieldCode] = bindingPath.split('.');
                    delete colDataTable.bindingPath;
                    const newVlaue = tableData?.[tableCode]?.[fieldCode] || '';
                    colDataTable.value = newVlaue;

                    //复制超链接信息
                    let tag = colDataTable.tag;
                    if (tag) {
                        let hyperlinkInfo = JSON.parse(tag).hyperlinkInfo;
                        if (
                            hyperlinkInfo &&
                            hyperlinkInfo.type === 'document' &&
                            hyperlinkInfo.isAutoDoc
                        ) {
                            colDataTable.hyperlink.url = `sjs://${newVlaue}!A1`;
                            if (colDataTable.hyperlink.tooltip) {
                                colDataTable.hyperlink.tooltip = newVlaue;
                            }
                        }
                    }
                }

                pageInfos.dataTable[row][col] = colDataTable;
            });
        });
    }
    render({
        pageInfos,
        isTemplate,
        headerInfos,
        footerInfos,
        pluginTool,
        tableInfos,
        templateInfo,
        newSheets = {},
        sheetCount = 0,
    }) {
        let curPageIndex = 0;
        const isCurrentSheet = templateInfo?.isCurrentSheet;
        let sheetIndex = sheetCount + Object.keys(newSheets).length;
        let sheet = pageInfos.sheet;

        while (curPageIndex < pageInfos.pageTotal) {
            //如果是在新的页签中展示另一页，则需重置数据
            if (isTemplate && !isCurrentSheet) {
                pageInfos.dataTable = {};
                pageInfos.spans = [];
                pageInfos.rows = {};
                pageInfos.rules = [];
                pageInfos.pageIndex = 1;
                pageInfos.rowCount = 0;
            }

            //头部区域
            this.commonDataTableHandler({
                infos: headerInfos,
                pageInfos,
                pluginTool,
            });

            //表格区域
            if (tableInfos.startRow !== -1) {
                const temp = tableInfos;
                const { startRow: row, endRow, dataTable, tableDatas } = temp;
                const rowCount = endRow - row;
                const baseParams = {
                    pageInfos,
                    temp,
                };
                let index = 0;
                while (index < pageInfos.pageSize) {
                    //取出每一个实体数据的第一条记录，用于渲染表格模板
                    let tableData = {};
                    Object.entries(tableDatas).forEach(function ([
                        tableCode,
                        datas,
                    ]) {
                        if (datas.length) {
                            tableData[tableCode] = datas.shift();
                        }
                    });
                    index++;
                    //行高,合并信息等
                    this.genOtherInfos(baseParams);

                    this.renderTableHandler({
                        dataTable,
                        pageInfos,
                        tableData,
                    });

                    pageInfos.rowCount += rowCount;
                }
            }

            //底部区域
            this.commonDataTableHandler({
                infos: footerInfos,
                pageInfos,
            });

            if (
                isTemplate &&
                curPageIndex + 1 < pageInfos.pageTotal &&
                isCurrentSheet
            ) {
                pageInfos.rowCount += pageInfos.otherRowCount;
            }

            if (isTemplate && !isCurrentSheet) {
                if (curPageIndex > 0) {
                    sheet = jsonDeepCopy(sheet);
                    sheet.name += `_${curPageIndex}`;
                    sheet.index = sheetIndex++;
                    sheet.isSelected = false;
                    newSheets[sheet.name] = sheet;
                }
                this.resetSheet({
                    ...pageInfos,
                    sheet,
                });
            }

            curPageIndex++;
            pageInfos.pageIndex += 1;
        }

        if (!isTemplate || isCurrentSheet) {
            this.resetSheet({
                ...pageInfos,
                sheet,
            });
        }
    }
    resetSheet(params) {
        const { sheet, dataTable, rules, spans, rows, rowCount } = params;
        if (!sheet) {
            return;
        }

        const sheetCount = rowCount > 0 ? rowCount : sheet.rowCount;

        sheet.data.dataTable = Object.keys(dataTable).length
            ? dataTable
            : sheet.data.dataTable;

        sheet.rowCount = sheetCount;

        //条件格式规则
        sheet.conditionalFormats = sheet.conditionalFormats
            ? sheet.conditionalFormats
            : {};
        sheet.conditionalFormats.rules = rules;

        //合并单元格
        sheet.spans = spans;

        //行高
        this.setSheetRows(sheet, rows);
    }
    enhanceTable({
        isTemplate,
        tableInfos,
        datas,
        pageInfos,
        groupsDatas,
        sheetName,
    }) {
        //表格需要的数据以及总页数等
        if (tableInfos.startRow !== -1) {
            const temp = tableInfos;
            const { tableCodes } = temp;
            const tableCodesArray = Object.keys(tableCodes);
            if (tableCodesArray.length) {
                //当前表格模板需要的所有实体数据
                const tableDatas = {};
                tableInfos.tableDatas = tableDatas;
                tableInfos.dataCount = 0;
                tableCodesArray.forEach(function (code) {
                    let ds = datas[code];
                    const groupedDs =
                        groupsDatas?.[sheetName]?.[code]?.[sheetName];
                    if (Array.isArray(groupedDs)) {
                        ds = groupedDs;
                    }
                    tableDatas[code] = jsonDeepCopy(ds);
                    let len = ds.length;
                    if (len > tableInfos.dataCount) {
                        tableInfos.dataCount = len;
                    }
                });

                if (isTemplate) {
                    const tempHeight = this.calcTempHeight(temp, isTemplate);
                    pageInfos.pageSize = Math.floor(
                        pageInfos.contentHeight / tempHeight
                    );
                    pageInfos.pageTotal = Math.ceil(
                        tableInfos.dataCount / pageInfos.pageSize
                    );

                    const diff =
                        pageInfos.contentHeight -
                        tempHeight * pageInfos.pageSize;

                    if (diff > 0) {
                        const rowCount = Math.floor(diff / 20);
                        pageInfos.otherRowCount = rowCount;
                    }
                } else {
                    pageInfos.pageSize = tableInfos.dataCount;
                }
            }
        }
    }
    beforeRender(temp, datas) {
        const pageInfos = {
            dataTable: {},
            rowCount: 0,
            spans: [],
            rows: {},
            height: 0,
            rules: [],
            pageTotal: 1,
        };
        const { tableInfos, headerInfos, footerInfos } = this.splitTemp(temp);
        this.enhanceTable({
            tableInfos,
            datas,
            pageInfos,
        });

        this.render({
            pageInfos,
            headerInfos,
            footerInfos,
            tableInfos,
        });
        return pageInfos;
    }

    commonDataTableHandler({ infos, pageInfos = {}, pluginTool }) {
        const { dataTable: pageDataTable = {} } = pageInfos;

        const { dataTable, rowCount } = infos;
        Object.entries(dataTable).forEach(([rowStr, dataTable]) => {
            if (pluginTool) {
                pluginTool.setPageHandler(
                    genPageIndexHandler(pageInfos.pageIndex)
                );
                parseRowPlugins({
                    dataTable,
                    pluginTool,
                });
            }
            const row = Number(rowStr) + pageInfos.rowCount;
            pageDataTable[row] = jsonDeepCopy(dataTable);
        });

        this.genOtherInfos({
            pageInfos,
            temp: infos,
        });

        pageInfos.rowCount += rowCount;
    }

    calcTempHeight(temp, isTemplate) {
        let height = 0;
        if (isTemplate) {
            const { startRow, endRow, rows } = temp;
            const rowCount = endRow - startRow;
            for (let i = 0; i < rowCount; i++) {
                height += rows?.[i]?.size || 20;
            }
        }
        return height;
    }

    //生成其它信息(例如行高，单元格合并信息等)
    genOtherInfos({ pageInfos = {}, temp = {} }) {
        const {
            spans: pageSpans = [],
            rows: pageRows = {},
            rules: pageRules = [],
            rowCount: pageRowCount = 0,
        } = pageInfos;

        const { spans = [], rows = {}, rules = [] } = temp;

        //合并信息
        spans.forEach(function (span) {
            pageSpans.push({
                ...span,
                row: span.row + pageRowCount,
            });
        });
        //行高
        Object.entries(rows).forEach(function ([rowStr, rowSize]) {
            const row = Number(rowStr) + pageRowCount;
            pageRows[row] = rowSize;
            pageInfos.height += rowSize?.size;
        });

        //条件规则
        rules.forEach(function (rule) {
            pageRules.push({
                ...rule,
                ranges: [
                    {
                        ...rule.ranges[0],
                        row: rule.ranges[0].row + pageRowCount,
                    },
                ],
            });
        });
    }
    splitTemp(infos, dsCode) {
        const {
            spans = [],
            rowCount = 200,
            rows = {},
            dataTable = {},
            rules = [],
        } = infos;

        //底部区域与其它内容区域
        const otherDataTable = [];

        //头部区域
        const headerInfos = {
            dataTable: {},
            rowCount: 0,
            spans: [],
            rows: {},
            height: 0,
            rules: [],
        };

        //底部区域
        const footerInfos = {
            dataTable: {},
            rowCount: 0,
            spans: [],
            rows: {},
            height: 0,
            rules: [],
        };
        const tableCodes = {};
        //表格区域
        const tableInfos = {
            dataTable: {},
            rowCount: 0,
            spans: [],
            rows: {},
            height: 0,
            rules: [],
            startRow: -1,
            endRow: -1,
            tableCodes,
        };

        let startRow = 0;

        if (dataTable) {
            for (let row = 0; row < rowCount; row++) {
                const rowDataTable = dataTable?.[row] || {};
                let hasBindTableField = false;

                const rowRules = getRowRules({ rules, row });
                const newRules = [];

                Object.entries(rowDataTable).forEach(function ([
                    colStr,
                    { bindingPath },
                ]) {
                    const col = Number(colStr);
                    let res = bindingPath?.includes?.('.');
                    if (res) {
                        const tableCode = bindingPath.split('.')[0];
                        if ((dsCode && dsCode === tableCode) || !dsCode) {
                            tableCodes[tableCode] = true;

                            if (tableInfos.startRow === -1) {
                                tableInfos.startRow = row;
                                startRow = row;
                            }
                            hasBindTableField = res;
                        }
                    }
                    const newRow = row - startRow;
                    getColRules({
                        rules: rowRules,
                        col,
                        colHandler(rule) {
                            newRules.push({
                                ...rule,
                                ranges: [
                                    {
                                        row: newRow,
                                        col,
                                        rowCount: 1,
                                        colCount: 1,
                                    },
                                ],
                            });
                        },
                    });
                });

                if (hasBindTableField) {
                    const newRow = row - tableInfos.startRow;
                    const res = genSpans({
                        spans,
                        row,
                        startRow: tableInfos.startRow,
                    });

                    const { spans: newSpans, maxRowCount } = res;

                    tableInfos.endRow = row + maxRowCount;
                    tableInfos.dataTable[newRow] = rowDataTable;
                    tableInfos.rows[newRow] = getOldRowHeight(rows, row);
                    tableInfos.rules.push(...newRules);
                    tableInfos.spans.push(...newSpans);
                    continue;
                }
                const newSpans = genSpans({
                    spans,
                    row,
                    startRow: startRow,
                }).spans;

                if (tableInfos.startRow === -1) {
                    headerInfos.dataTable[row] = rowDataTable;
                    headerInfos.rows[row] = getOldRowHeight(rows, row);
                    headerInfos.rules.push(...newRules);
                    headerInfos.spans.push(...newSpans);
                } else {
                    otherDataTable.push({
                        rules: newRules,
                        row,
                        dataTable: rowDataTable,
                        spans: newSpans,
                    });
                }
            }
        }

        if (tableInfos.startRow !== -1) {
            otherDataTable.forEach(function (item) {
                const { row, dataTable: rowDataTable, rules, spans } = item;
                let infos = footerInfos;
                let newRow = row - tableInfos.endRow;
                //表格区域
                if (row < tableInfos.endRow) {
                    infos = tableInfos;
                    newRow = row - tableInfos.startRow;
                }
                spans.forEach(function (span) {
                    infos.spans.push({
                        ...span,
                        row: newRow,
                    });
                });

                changeRulesRow({
                    rules,
                    newRules: infos.rules,
                    row: newRow,
                });
                infos.dataTable[newRow] = rowDataTable;
                infos.rows[newRow] = getOldRowHeight(rows, row);
            });
        }

        if (tableInfos.startRow === -1) {
            headerInfos.rowCount = rowCount;
        } else {
            headerInfos.rowCount = tableInfos.startRow;
        }

        if (tableInfos.endRow !== -1) {
            footerInfos.rowCount = rowCount - tableInfos.endRow;
        }

        for (let i = 0; i < headerInfos.rowCount; i++) {
            headerInfos.height += headerInfos?.rows?.[i].size || 20;
        }
        for (let i = 0; i < footerInfos.rowCount; i++) {
            footerInfos.height += footerInfos?.rows?.[i]?.size || 20;
        }
        debugger;
        return {
            headerInfos,
            footerInfos,
            tableInfos,
        };
    }

    setSheetRows(sheet, rows) {
        if (sheet.rows) {
            Object.keys(sheet.rows).forEach(function (key) {
                delete sheet.rows[key];
            });
            Object.entries(rows).forEach(function ([key, value]) {
                sheet.rows[key] = value;
            });
            return;
        }
        sheet.rows = rows;
    }
}
