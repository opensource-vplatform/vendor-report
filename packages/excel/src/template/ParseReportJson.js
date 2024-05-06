import {
  execute,
  PluginTool,
} from '../plugin';

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

export default class Render {
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
            let pageArea = '';
            let isFillData = false;
            const sheetTag = data?.defaultDataNode?.tag;
            if (sheetTag) {
                const res = JSON.parse(sheetTag);
                pageArea = res?.pageArea || '';
                isFillData = res?.isFillData;
            }
            //以分页区域为边界，对模板进行拆分成头部区，内容区，底部区
            let { tableInfos, headerInfos, footerInfos } = _this.splitTemp(
                {
                    spans,
                    rows,
                    rules: conditionalFormats?.rules,
                    dataTable: data?.dataTable,
                    rowCount,
                },
                {
                    pageArea,
                    type: 'page',
                }
            );

            //以分页区域为边界对模板进行拆分后，再次分别对头部区，底部区根据实体字段作为边界进行拆分成头部区，内容区，底部区
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
                isFillData,
                pageArea,
                pageType: 'page',
            };

            _this.enhanceTable({
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
        const cobySheet = JSON.stringify(sheet);
        let pageSize = pageInfos.isFillData
            ? pageInfos.pageSize
            : tableInfos?.pageSizes?.shift?.();

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
                const {
                    startRow: row,
                    endRow,
                    dataTable,
                    tableDatas,
                    pageSizes = [],
                } = temp;
                const rowCount = endRow - row;
                const baseParams = {
                    pageInfos,
                    temp,
                };
                let index = 0;

                while (index < pageSize) {
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

                if (!pageInfos.isFillData) {
                    pageSize = pageSizes.shift();
                }
            }

            //底部区域
            this.commonDataTableHandler({
                infos: footerInfos,
                pageInfos,
            });

            if (
                (isTemplate &&
                    curPageIndex + 1 < pageInfos.pageTotal &&
                    isCurrentSheet) ||
                (!isTemplate && pageInfos.pageType === 'page')
            ) {
                pageInfos.rowCount += pageInfos.otherRowCount;
            }

            //在不同的页签中显示不同的分页，需要每次解析完当前页后重置json数据并且新增页签
            if (isTemplate && !isCurrentSheet) {
                //从第二页起在新的页签中显示当前页
                if (curPageIndex > 0) {
                    sheet = JSON.parse(cobySheet);
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
        //如果是在同一个页签显示所有的分页，则解析完成所有分页后重重json数据
        if (!isTemplate || (isTemplate && isCurrentSheet)) {
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
    enhanceTable({ tableInfos, datas, pageInfos, groupsDatas, sheetName }) {
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
                tableInfos.pageSizes = [];
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

                if (pageInfos.pageArea) {
                    const tempHeight = this.calcTempHeight(temp);
                    pageInfos.pageSize = Math.floor(
                        pageInfos.contentHeight / tempHeight
                    );
                    pageInfos.pageTotal = Math.ceil(
                        tableInfos.dataCount / pageInfos.pageSize
                    );

                    //收集每一个显示的记录数，用于填充数据
                    let dataCount = tableInfos.dataCount;
                    while (dataCount >= pageInfos.pageSize) {
                        tableInfos.pageSizes.push(pageInfos.pageSize);
                        dataCount -= pageInfos.pageSize;
                    }
                    if (dataCount > 0) {
                        tableInfos.pageSizes.push(dataCount);
                    }

                    const diff =
                        pageInfos.contentHeight -
                        tempHeight * pageInfos.pageSize;

                    if (diff > 0) {
                        const rowCount = Math.floor(diff / 20);
                        pageInfos.otherRowCount = rowCount;
                    }
                } else {
                    pageInfos.pageSize = tableInfos.dataCount;
                    tableInfos.pageSizes.push(tableInfos.dataCount);
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

    calcTempHeight(temp) {
        let height = 0;
        const { startRow, endRow, rows } = temp;
        const rowCount = endRow - startRow;
        for (let i = 0; i < rowCount; i++) {
            height += rows?.[i]?.size || 20;
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
        Object.entries(rows).forEach(function ([rowStr, rowInfo]) {
            const row = Number(rowStr) + pageRowCount;
            pageRows[row] = rowInfo;
            if (rowInfo?.visible !== false) {
                pageInfos.height += rowInfo?.size || 20;
            }
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
    splitTemp(infos, options = {}) {
        const {
            spans = [],
            rowCount = 200,
            rows = {},
            dataTable = {},
            rules = [],
        } = infos;

        const { type = 'noPage', pageArea } = options;

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
        let pageAreaStartRow = -1;
        let pageAreaEndRow = -1;
        const REG = /^\d+:\d+$/;
        const isSetPageArea = pageArea && REG.test(pageArea);
        if (isSetPageArea) {
            const res = pageArea.split(':');
            pageAreaStartRow = Number(res[0]) - 1;
            pageAreaEndRow = Number(res[1]) - 1;
        }
        if (dataTable) {
            for (let row = 0; row < rowCount; row++) {
                const rowDataTable = dataTable?.[row] || {};
                let hasBindTableField = false;
                const isPageArea =
                    type === 'page' &&
                    row >= pageAreaStartRow &&
                    row <= pageAreaEndRow;

                if (isPageArea) {
                    hasBindTableField = true;
                    if (tableInfos.startRow === -1) {
                        tableInfos.startRow = row;
                        startRow = row;
                    }
                }

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

                        if (isPageArea || type !== 'page') {
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
