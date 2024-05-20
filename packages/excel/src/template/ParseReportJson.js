import {
  enhanceFormula,
  exePlugins,
  getTableCodesFromFormula,
} from '../enhance/index';
import Tool from '../enhance/Tool';
import { getNamespace } from '../utils/spreadUtil';
import UnionDatasource from './UnionDatasource';

const GC = getNamespace();
const spreadNS = GC.Spread.Sheets;

function getPrintConversionUnits() {
    //打印换算单位
    const divId = 'wd2mn37k18jf19j8yw1q8d4pt2jpzx35xlw8nzjbj';
    let div = document.getElementById(divId);
    if (!div) {
        div = document.createElement('div');
        div.id = divId;
        document.body.append(div);
    }
    div.style.width = '1in';
    const divWidth = getComputedStyle(div).width;
    return Number(divWidth.slice(0, -2));
}

function resetSheet({
    sheet,
    dataTable,
    rules,
    spans,
    rows,
    rowCount,
    autoMergeRanges,
}) {
    if (!sheet) {
        return;
    }

    const sheetCount = rowCount > 0 ? rowCount : sheet.rowCount;

    sheet.data.dataTable = dataTable;

    sheet.rowCount = sheetCount;

    //条件格式规则
    sheet.conditionalFormats = sheet.conditionalFormats
        ? sheet.conditionalFormats
        : {};
    sheet.conditionalFormats.rules = rules;

    //合并单元格
    sheet.spans = spans;

    //行高
    if (sheet.rows) {
        sheet.rows.length = 0;
    } else {
        sheet.rows = [];
    }
    sheet.rows.push(...rows);

    //自动合并区域
    sheet.autoMergeRangeInfos = autoMergeRanges;
}

function genAutoMergeRanges(merge, autoMergeRanges, startRow) {
    let direction = spreadNS.AutoMerge.AutoMergeDirection.column; //1
    let mode = spreadNS.AutoMerge.AutoMergeMode.free; //0
    let sheetArea = spreadNS.SheetArea.viewport; //3
    let selectionMode = spreadNS.AutoMerge.SelectionMode.merged; //0

    if (merge.columnMerge && merge.rowMerge) {
        direction = spreadNS.AutoMerge.AutoMergeDirection.rowColumn; //值等于4。在行方向上优先于列方向应用自动合并
    } else if (merge.rowMerge) {
        direction = spreadNS.AutoMerge.AutoMergeDirection.row; //值等于2.在行方向上应用自动合并
    }

    let range = {
        row: merge.row - startRow,
        col: merge.col,
        rowCount: merge?.rowCount,
        colCount: merge?.colCount,
    };

    autoMergeRanges.push({
        range,
        direction,
        mode,
        sheetArea,
        selectionMode,
    });
}

function genPageIndexHandler(index) {
    return function () {
        return index;
    };
}

function Copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function getOldRowHeight(rows, row) {
    return rows?.[row] || { size: 20 };
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
                colHandler(Copy(item));
            }
            return res;
        });
    }

    return result;
}

export default class Render {
    constructor(reportJson, datas, tempConfig = {}, setting) {
        console.time('耗时多久');
        this.datas = datas;
        this.reportJson = reportJson;
        this.tempConfig = Copy(tempConfig);
        this.newSheets = {};
        this.setting = setting;
        this.templatesPageInfos = {};
        this.delayPlugins = [];
        this.delayFormula = [];

        //打印换算单位
        this.printConversionUnits = getPrintConversionUnits();
        this.parse();
        /* reportJson.sheets = {};
        reportJson.sheetCount = 0;
        debugger;
        //新增页签。分页后新增的页签
        Object.entries(this.newSheets).forEach(function ([sheetName, sheet]) {
            reportJson.sheets[sheetName] = sheet;
            reportJson.sheetCount += 1;
        });
 */
        //总页数需延后渲染
        while (this.delayPlugins.length) {
            const pluginHandler = this.delayPlugins.pop();
            pluginHandler();
        }
        //总页数需延后渲染
        while (this.delayFormula.length) {
            const formulaHandler = this.delayFormula.pop();
            formulaHandler();
        }
        console.timeEnd('耗时多久');
    }
    render(pageInfos) {
        const {
            templates: { header, footer, content },
        } = pageInfos;
        //需要分页
        if (pageInfos.pageArea) {
            let index = 0;
            let startIndex = 0;

            function calculate(header, footer, content, contentDatasLen) {
                let { height: headerHeight } = header;
                let { height: footerHeight } = footer;
                let { height: contentTempHeight } = content;

                const _height = headerHeight + footerHeight;

                let contentHeight = pageInfos.pageTotalHeight;
                if (_height > pageInfos.pageTotalHeight) {
                    const diff = _height % pageInfos.pageTotalHeight;
                    if (diff >= contentTempHeight) {
                        contentHeight = diff;
                    }
                } else if (_height < pageInfos.pageTotalHeight) {
                    const diff = pageInfos.pageTotalHeight - _height;
                    if (diff >= contentTempHeight) {
                        contentHeight = diff;
                    }
                }

                //当前页可以渲染多少个内容模板
                const contentTempCount = Math.floor(
                    contentHeight / contentTempHeight
                );

                //分页小计。分页小计不等于总页数
                const pageSubtotal = Math.ceil(
                    contentDatasLen / contentTempCount
                );
                const lastContentTempCount = contentDatasLen % contentTempCount;
                return {
                    pageSubtotal,
                    lastContentTempCount,
                    contentTempCount,
                };
            }

            let { template: headerTemplates } = header[3];
            let { template: footerTemplates } = footer[3];
            let { template: contentTemplates } = content[3];

            let { pageSubtotal, lastContentTempCount, contentTempCount } =
                calculate(
                    header[3],
                    footer[3],
                    content[3],
                    content[3].template[0].unionDatasource.getCount()
                );

            while (index < pageSubtotal) {
                const isLastPage = index + 1 >= pageSubtotal;
                if (isLastPage) {
                    let {
                        pageSubtotal: _pageSubtotal,
                        lastContentTempCount: _lastContentTempCount,
                        contentTempCount: _contentTempCount,
                    } = calculate(
                        header[2],
                        footer[2],
                        content[2],
                        lastContentTempCount
                    );

                    if (_pageSubtotal <= 1) {
                        if (
                            pageInfos.groups.indexOf(pageInfos.sheet.name) ===
                            pageInfos.groups.length - 1
                        ) {
                            const {
                                pageSubtotal: _pageSubtotal,
                                lastContentTempCount: _lastContentTempCount_,
                                contentTempCount: _contentTempCount_,
                            } = calculate(
                                header[1],
                                footer[1],
                                content[1],
                                _lastContentTempCount
                            );
                            if (_pageSubtotal <= 1) {
                                headerTemplates = header[1].template;
                                footerTemplates = footer[1].template;
                                lastContentTempCount = _lastContentTempCount_;
                                contentTempCount = _contentTempCount_;
                            } else {
                                pageSubtotal += 1;
                            }
                        } else {
                            headerTemplates = header[2].template;
                            footerTemplates = footer[2].template;
                            lastContentTempCount = _lastContentTempCount;
                            contentTempCount = _contentTempCount;
                        }
                    } else {
                        pageSubtotal += 1;
                    }
                }

                this.genPageDataTables({
                    templates: headerTemplates,
                    pageInfos,
                });
                let endIndex = startIndex + contentTempCount;
                //最后一页
                if (isLastPage && !pageInfos.isFillData) {
                    endIndex = startIndex + lastContentTempCount;
                }
                this.genPageDataTables({
                    templates: contentTemplates,
                    pageInfos,
                    startIndex,
                    endIndex,
                });
                this.genPageDataTables({
                    templates: footerTemplates,
                    pageInfos,
                });

                if (index + 1 < pageSubtotal) {
                    this.onAfterPage(pageInfos);
                }
                pageInfos.pageHeight = 0;

                startIndex += contentTempCount;
                index++;
            }
        } else {
            this.genPageDataTables({
                templates: header[1].template,
                pageInfos,
            });
        }
    }
    genPageInfos({ sheet }) {
        const {
            name,
            data,
            printInfo: {
                paperSize: { height = 1100, width = 850 },
                orientation,
                margin = {
                    bottom: 75,
                    top: 75,
                },
            },
            colHeaderVisible = true,
            colHeaderRowInfos = [],
        } = sheet;

        const templateInfo = this.tempConfig?.[name];
        let isFillData = false;
        const sheetTag = data?.defaultDataNode?.tag;
        let tag = {};
        if (sheetTag) {
            const res = JSON.parse(sheetTag);
            isFillData = res?.isFillData;
            tag = res;
        }

        let { bottom: marginBottom, top: marginTop } = margin;

        let pageTotalHeight = 0;
        const printConversionUnits = this.printConversionUnits;
        const _width = (printConversionUnits * (width || 850)) / 100;
        const _height = (printConversionUnits * (height || 1100)) / 100;
        marginBottom = (printConversionUnits * marginBottom) / 100;
        marginTop = (printConversionUnits * marginTop) / 100;

        let defaultHeaderHeight = 20;
        if (colHeaderRowInfos.length > 0) {
            const height = colHeaderRowInfos.reduce((res, cur) => {
                let size = 20;
                if (cur.hasOwnProperty('size')) {
                    size = cur.size;
                }
                return res + size;
            }, 0);
            defaultHeaderHeight = height;
        }

        const colHeaderHeight = colHeaderVisible ? defaultHeaderHeight : 0;
        if (orientation === 2) {
            pageTotalHeight =
                _width - marginBottom - marginTop - colHeaderHeight;
        } else {
            pageTotalHeight =
                _height - marginBottom - marginTop - colHeaderHeight;
        }
        const isTemplate = templateInfo ? true : false;

        const pageInfos = {
            spans: [],
            rows: [],
            rules: [],
            dataTable: {},
            autoMergeRanges: [],

            rowCount: 0,
            pageIndex: 1,
            pageTotal: 1,
            pageArea: tag?.pageArea,
            pageTotalHeight,
            pageHeight: 0,

            isFillData,
            isCurrentSheet: templateInfo?.isCurrentSheet,
            isTemplate,
            page: {},
        };

        return pageInfos;
    }
    parse() {
        const sheets = Object.values(this.reportJson.sheets);
        this.sheetNames = [];
        sheets.forEach((sheet) => {
            const { visible = 1, rowCount = 200, data, name } = sheet;
            //当前sheet不可见，直接跳过解析
            if (visible === 0) {
                return;
            }

            //头部区域模板
            const headerTemplates = [];
            //底部区域模板
            const footerTemplates = [];
            //表格区域模板
            const contentTemplates = [];

            const sheetTag = data?.defaultDataNode?.tag;
            let tag = {};
            if (sheetTag) {
                const res = JSON.parse(sheetTag);
                tag = res;
            }

            const REG = /^\d+:\d+$/;
            const { pageArea = '', groupSumArea = '', totalArea = '' } = tag;
            //分页区域范围
            let pageAreaStartRow = rowCount;
            let pageAreaEndRow = rowCount;

            if (pageArea && REG.test(pageArea)) {
                const res = pageArea.split(':');
                pageAreaStartRow = Number(res[0]) - 1;
                pageAreaEndRow = Number(res[1]);
            }

            //分组汇总区域范围
            let groupSumAreaStartRow = rowCount;
            let groupSumAreaEndRow = rowCount;

            if (groupSumArea && REG.test(groupSumArea)) {
                const res = groupSumArea.split(':');
                groupSumAreaStartRow = Number(res[0]) - 1;
                groupSumAreaEndRow = Number(res[1]);
            }

            //统计区域范围
            let totalAreaStartRow = rowCount;
            let totalAreaEndRow = rowCount;
            if (totalArea && REG.test(totalArea)) {
                const res = totalArea.split(':');
                totalAreaStartRow = Number(res[0]) - 1;
                totalAreaEndRow = Number(res[1]);
            }

            let template = null;
            let row = 0;
            do {
                let rowTemplate = this.parseRowDataTable({
                    row,
                    sheet,
                });

                //判断当前行是否属于分组汇总区域
                if (row >= groupSumAreaStartRow && row < groupSumAreaEndRow) {
                    rowTemplate.isGroupSumArea = true;
                }

                //判断当前行是否属于总计区域
                if (row >= totalAreaStartRow && row < totalAreaEndRow) {
                    rowTemplate.isTotalArea = true;
                }

                //当前行与上一行存在合并关系，这两行作为一个模板
                if (template && row < template.endRow) {
                    template.height += rowTemplate.height;
                    template.dataTables.push(...rowTemplate.dataTables);
                    if (rowTemplate.endRow > template.endRow) {
                        template.endRow = rowTemplate.endRow;
                        template.rowCount = template.endRow - template.row;
                    }

                    template.datas = {
                        ...template.datas,
                        ...rowTemplate.datas,
                    };

                    template.allDatas = {
                        ...template.allDatas,
                        ...rowTemplate.allDatas,
                    };

                    if (rowTemplate.isGroupSumArea) {
                        template.isGroupSumArea = rowTemplate.isGroupSumArea;
                    }

                    template.dataPath.push(...rowTemplate.dataPath);
                    template.cellPlugins.push(...rowTemplate.cellPlugins);
                    template.tableCodes = {
                        ...template.tableCodes,
                        ...rowTemplate.tableCodes,
                    };
                } else {
                    template = rowTemplate;
                }

                //分页区域作为一个整体处理
                if (row >= pageAreaStartRow && row < pageAreaEndRow) {
                    template.endRow = pageAreaEndRow;
                    template.rowCount = template.endRow - template.row;
                }

                //将模板方法指定区域模板中
                if (row + 1 === template.endRow) {
                    template.verticalAutoMergeRanges = [];
                    template.dataTables.forEach(function (dataTable) {
                        const { mergeInfos = [] } = dataTable;
                        const len = mergeInfos.length;
                        if (len > 0) {
                            const autoMergeRanges = [];
                            let merge = mergeInfos[0];
                            for (let i = 1; i < len; i++) {
                                const item = mergeInfos[i];
                                if (
                                    merge.row === item.row &&
                                    merge.rowCount === item.rowCount &&
                                    merge.columnMerge === item.columnMerge &&
                                    merge.rowMerge === item.rowMerge &&
                                    merge.col + merge.colCount === item.col
                                ) {
                                    merge.colCount += item.colCount;
                                } else {
                                    genAutoMergeRanges(
                                        merge,
                                        autoMergeRanges,
                                        template.row
                                    );
                                    merge = item;
                                }
                            }
                            genAutoMergeRanges(
                                merge,
                                autoMergeRanges,
                                template.row
                            );
                            dataTable.autoMergeRanges = [];

                            autoMergeRanges.filter(function (item) {
                                if (item.range.rowCount === template.rowCount) {
                                    template.verticalAutoMergeRanges.push(item);
                                } else if (item.range.colCount > 1) {
                                    dataTable.autoMergeRanges.push(item);
                                }
                            });
                        }
                    });

                    if (template.row < pageAreaStartRow) {
                        headerTemplates.push(template);
                    } else if (template.row >= pageAreaEndRow) {
                        footerTemplates.push(template);
                    } else {
                        contentTemplates.push(template);
                    }
                    template = null;
                }

                row++;
            } while (row < rowCount);
            const templateInfo = this.tempConfig[name];
            let sheetNames = [name];
            let sheetDatas = {};
            let tableCode = '';
            if (templateInfo) {
                const res = this.groupDatas(templateInfo);
                sheetDatas = res.sheetDatas;
                sheetNames = res.groupNames;
                tableCode = res.tableCode;
            }
            this.templatesPageInfos[name] = {
                pageIndex: 0,
                pageTotal: 0,
            };
            const pageInfos = this.genPageInfos({
                sheet,
            });

            pageInfos.groups = templateInfo?.groupNames || [];

            pageInfos.tableCode = tableCode;
            pageInfos.cobySheet = JSON.stringify(sheet);
            pageInfos.sheet = sheet;
            pageInfos.fromTempSheet = name;
            const templates = this.splitTemplate({
                headerTemplates,
                footerTemplates,
                contentTemplates,
            });

            pageInfos.templates = templates;

            sheetNames.forEach((sheetName, index) => {
                this.templatesPageInfos[name].pageIndex += 1;
                this.templatesPageInfos[name].pageTotal += 1;
                pageInfos.groupName = sheetName;

                if (sheetDatas[sheetName]) {
                    pageInfos.groupDatas = sheetDatas[sheetName];
                    this.dataSourceMap.forEach(
                        ({ tableCode, datas, unionDatasource }) => {
                            if (tableCode === pageInfos.tableCode) {
                                unionDatasource.load({
                                    ...datas,
                                    [tableCode]: pageInfos.groupDatas,
                                });
                            }
                        }
                    );
                }

                if (index > 0) {
                    //强制打印时在当前行换页
                    const { rowCount } = pageInfos;
                    const rows = pageInfos.rows?.[rowCount] || {};
                    rows.pageBreak = true;
                    pageInfos.rows[rowCount] = rows;
                }

                this.render(pageInfos);
            });
            resetSheet(pageInfos);
            this.newSheets[pageInfos.sheet.name] = pageInfos.sheet;
        });
    }
    parseRowDataTable(params) {
        const { row, sheet } = params;
        const {
            spans = [],
            data = {},
            rows = {} /* 行高 */,
            conditionalFormats = {},
        } = sheet;
        const rules = conditionalFormats?.rules || [];
        const dataTable = data?.dataTable || {};
        const rowDataTable = dataTable?.[row] || {};
        const rowRules = getRowRules({ rules, row });

        const dataTableInfos = {
            spans: [],
            mergeInfos: [],
            rules: [],
            rows: null,
            rowDataTable,
        };

        const result = {
            row,
            endRow: row + 1,
            rowCount: 1,
            datas: {},
            allDatas: {},
            dataTables: [dataTableInfos],
            dataLen: 0,
            height: 0,
            isGroupSumArea: false,
            isTotalArea: false,
            dataPath: [],
            cellPlugins: [],
            tableCodes: {},
        };

        let maxRowCount = 1;
        //当前行的合并信息
        const rowSpans = spans.filter((span) => {
            if (span.row === row) {
                if (span.rowCount > maxRowCount) {
                    maxRowCount = span.rowCount;
                }
                return true;
            }
            return false;
        });
        dataTableInfos.spans.push(...rowSpans);

        //行高等信息
        dataTableInfos.rows = getOldRowHeight(rows, row);
        result.height = dataTableInfos?.rows?.size;

        Object.entries(rowDataTable).forEach(
            ([colStr, { bindingPath, tag, formula, style = {} }]) => {
                const col = Number(colStr);
                let isBindEntity = bindingPath?.includes?.('.');

                if (isBindEntity) {
                    result.dataPath.push(bindingPath);
                    const tableCode = bindingPath.split('.')[0];
                    result.tableCodes[tableCode] = true;
                    result.datas[tableCode] = this.datas[tableCode] || [];
                    result.allDatas[tableCode] = this.datas[tableCode] || [];
                    const span = rowSpans.find((span) => span.col === col) || {
                        rowCount: 1,
                        colCount: 1,
                    };
                    if (tag) {
                        //收集当前单元格是否已经设置了行合并或列合并
                        const jsonTag = JSON.parse(tag);
                        const columnMerge = jsonTag.columnMerge || false;
                        const rowMerge = jsonTag.rowMerge || false;
                        if (columnMerge || rowMerge) {
                            dataTableInfos.mergeInfos.push({
                                ...span,
                                row,
                                col,
                                columnMerge,
                                rowMerge,
                            });
                        }
                        const plugins = jsonTag.plugins;
                        if (Array.isArray(plugins)) {
                            result.cellPlugins.push({
                                plugins,
                                bindingPath,
                            });
                        }
                    }
                }
                if (formula) {
                    const tableCodes = getTableCodesFromFormula(formula);
                    if (Array.isArray(tableCodes)) {
                        tableCodes.forEach((tableCode) => {
                            result.tableCodes[tableCode] = true;
                            result.datas[tableCode] =
                                this.datas[tableCode] || [];
                            result.allDatas[tableCode] =
                                this.datas[tableCode] || [];
                        });
                    }
                }

                if (style?.decoration) {
                    delete style?.decoration;
                }

                getColRules({
                    rules: rowRules,
                    col,
                    colHandler(rule) {
                        dataTableInfos.rules.push({
                            ...rule,
                        });
                    },
                });
            }
        );
        result.rowCount = maxRowCount;
        result.endRow = result.row + maxRowCount;
        return result;
    }
    groupDatas(temp = {}) {
        let { datas } = this;

        const { groups } = temp;
        if (!groups) {
            return;
        }
        const sheetDatas = {};
        const groupNames = new Set();
        let tableCode = '';

        //对数据进行分组，分组的名称就是sheet的名称
        Object.entries(groups).some(([dsName, group]) => {
            if (
                Array.isArray(datas?.[dsName]) &&
                Array.isArray(group) &&
                group.length
            ) {
                tableCode = dsName;
                const groupFieldCode = group?.[0]?.code;
                datas?.[dsName].forEach(function (item) {
                    const groupName = item[groupFieldCode];
                    groupNames.add(groupName);
                    sheetDatas[groupName] = sheetDatas[groupName] || [];
                    sheetDatas[groupName].push(item);
                });
                return true;
            }
            return false;
        });

        temp.groupNames = [...groupNames];
        temp.tableCode = tableCode;

        //只支持一个实体进行分组
        return { sheetDatas, groupNames: temp.groupNames, tableCode };
    }

    splitTemplate({ headerTemplates, footerTemplates, contentTemplates }) {
        const dataSourceMap = [];
        const templates = [
            {
                type: 'header',
                template: headerTemplates,
            },
            {
                type: 'footer',
                template: footerTemplates,
            },
            {
                type: 'content',
                template: contentTemplates,
            },
        ];

        const _templates = {
            header: {
                1: {
                    template: headerTemplates,
                    height: 0,
                    allTableCodes: {},
                },
                2: {
                    template: [],
                    height: 0,
                    allTableCodes: {},
                },
                3: {
                    template: [],
                    height: 0,
                    allTableCodes: {},
                },
            },
            footer: {
                1: {
                    template: footerTemplates,
                    height: 0,
                    allTableCodes: {},
                },
                2: {
                    template: [],
                    height: 0,
                    allTableCodes: {},
                },
                3: {
                    template: [],
                    height: 0,
                    allTableCodes: {},
                },
            },
            content: {
                1: {
                    template: contentTemplates,
                    height: 0,
                    allTableCodes: {},
                },
                2: {
                    template: [],
                    height: 0,
                    allTableCodes: {},
                },
                3: {
                    template: [],
                    height: 0,
                    allTableCodes: {},
                },
                dataLen: 0,
            },
        };

        templates.forEach(({ type, template }) => {
            template.forEach((temp) => {
                const {
                    tableCodes,
                    datas,
                    allDatas,
                    dataTables,
                    dataPath,
                    cellPlugins,
                } = temp;

                //生成联合数据源
                const setting = {
                    ...this.setting,
                    cellPlugins,
                };
                const unionDatasource = new UnionDatasource(dataPath, setting);
                unionDatasource.load(datas);
                Object.keys(datas).forEach((tableCode) => {
                    dataSourceMap.push({
                        tableCode,
                        datas,
                        unionDatasource,
                    });
                });
                temp.unionDatasource = unionDatasource;

                const unionDatasourceAll = new UnionDatasource(
                    dataPath,
                    setting
                );
                unionDatasourceAll.load(allDatas);
                temp.unionDatasourceAll = unionDatasourceAll;

                //计算高度
                let height = 0;
                const dataLen =
                    type === 'content' ? 1 : unionDatasource.getCount() || 1;

                for (let i = 0; i < dataLen; i++) {
                    dataTables.forEach(function ({ rows = {} }) {
                        //计算高度
                        if (rows.hasOwnProperty('size')) {
                            height += rows?.size;
                        } else {
                            height += 20;
                        }
                    });
                }

                //所有模板
                let tempType = 1;
                if (type === 'content') {
                    _templates[type].dataLen = unionDatasource.getCount() || 1;
                }
                _templates[type][tempType].allTableCodes = {
                    ..._templates[type][tempType].allTableCodes,
                    tableCodes,
                };
                _templates[type][tempType].height += height;
                tempType += 1;

                if (!temp.isTotalArea) {
                    //不包含总计的模板

                    _templates[type][tempType].template.push(temp);
                    _templates[type][tempType].allTableCodes = {
                        ..._templates[type][tempType].allTableCodes,
                        tableCodes,
                    };
                    _templates[type][tempType].height += height;
                    tempType += 1;

                    //不包含章合计和总计的模板
                    if (!temp.isGroupSumArea) {
                        _templates[type][tempType].template.push(temp);
                        _templates[type][tempType].allTableCodes = {
                            ..._templates[type][tempType].allTableCodes,
                            tableCodes,
                        };
                        _templates[type][tempType].height += height;
                    }
                }
            });
        });
        this.dataSourceMap = dataSourceMap;
        return _templates;
    }
    getSheetCount() {
        return this.reportJson.sheetCount + Object.keys(this.newSheets).length;
    }

    genPageDataTables(params) {
        const { templates, pageInfos, startIndex = 0, endIndex = 0 } = params;
        templates.forEach((temp) => {
            const {
                dataTables,
                height: tempHeight,
                isGroupSumArea,
                isTotalArea,
                unionDatasource,
                unionDatasourceAll,
            } = temp;

            let { verticalAutoMergeRanges } = temp;

            const dataLen = endIndex || unionDatasource.getCount() || 1;
            verticalAutoMergeRanges = Copy(verticalAutoMergeRanges);
            verticalAutoMergeRanges.forEach(function (item) {
                item.range.row = pageInfos.rowCount;
            });

            const page = pageInfos.page;

            let startRow = pageInfos.rowCount;
            let dataIndex = startIndex;
            for (let i = startIndex; i < dataLen; i++) {
                if (pageInfos.pageArea) {
                    if (
                        pageInfos.pageHeight + tempHeight >
                        pageInfos.pageTotalHeight
                    ) {
                        startRow = pageInfos.rowCount;
                        dataIndex = i;
                        this.onAfterPage(pageInfos, tempHeight);
                    } else {
                        pageInfos.pageHeight += tempHeight;
                    }
                }
                dataTables.forEach(
                    ({
                        rows = {},
                        rowDataTable,
                        spans = [],
                        rules = [],
                        autoMergeRanges = [],
                    }) => {
                        const dataTable = { ...rowDataTable };
                        Object.entries(dataTable).forEach(
                            ([colStr, _colDataTable]) => {
                                const colDataTable = { ..._colDataTable };
                                dataTable[colStr] = colDataTable;
                                const col = Number(colStr);
                                const { bindingPath, tag, formula } =
                                    colDataTable;
                                if (bindingPath?.includes?.('.')) {
                                    const [tableCode, fieldCode] =
                                        bindingPath.split('.');
                                    delete colDataTable.bindingPath;
                                    const { type, value: newVlaue } =
                                        unionDatasource.getValue(
                                            tableCode,
                                            fieldCode,
                                            i
                                        );
                                    if (type === 'text') {
                                        colDataTable.value = newVlaue;
                                    }
                                }

                                const tool = new Tool();
                                const groupName = pageInfos.groupName;
                                tool.setGroupNameHandler(() => groupName);

                                tool.setIsGroupSumAreaHandler(
                                    () => isGroupSumArea || isTotalArea
                                );
                                if (tag) {
                                    const tagObj = JSON.parse(tag);

                                    const instanceId = tagObj.instanceId;
                                    //当前单元格在当前页中的起始行，记录数等信息
                                    page[pageInfos.pageIndex] =
                                        page[pageInfos.pageIndex] || {};
                                    page[pageInfos.pageIndex][instanceId] =
                                        page[pageInfos.pageIndex][instanceId] ||
                                        {};
                                    const targetCell =
                                        page[pageInfos.pageIndex][instanceId];
                                    targetCell['row'] = startRow;
                                    targetCell['col'] = col;
                                    targetCell['count'] =
                                        targetCell['count'] || 0;
                                    targetCell['count'] += 1;
                                    targetCell['dataIndex'] = dataIndex;
                                    targetCell['unionDatasource'] =
                                        unionDatasource;
                                    targetCell['unionDatasourceAll'] =
                                        unionDatasourceAll;

                                    //处理超链接信息
                                    const hyperlinkInfo =
                                        tagObj.hyperlinkInfo || {};
                                    if (
                                        hyperlinkInfo?.type === 'document' &&
                                        hyperlinkInfo?.isAutoDoc
                                    ) {
                                        colDataTable.hyperlink.url = `sjs://${colDataTable.value}!A1`;
                                        if (colDataTable.hyperlink.tooltip) {
                                            colDataTable.hyperlink.tooltip =
                                                colDataTable.value;
                                        }
                                    }

                                    //执行插件
                                    const plugins = tagObj.plugins;
                                    if (Array.isArray(plugins)) {
                                        let targetInstanceId = '';
                                        const isDelay = plugins.some(function ({
                                            type,
                                            config,
                                        }) {
                                            if (type === 'cellSubTotal') {
                                                targetInstanceId =
                                                    config?.instanceId;
                                            }
                                            return ['cellSubTotal'].includes(
                                                type
                                            );
                                        });

                                        const pageIndex = pageInfos.pageIndex;
                                        function pluginHandler() {
                                            //汇总
                                            const targetCell =
                                                page?.[pageIndex]?.[
                                                    targetInstanceId
                                                ];
                                            tool.setFieldIndexHandler(() => {
                                                return {
                                                    row: targetCell?.['row'],
                                                    col: targetCell?.['col'],
                                                };
                                            });

                                            tool.setDataCountHandler(() => {
                                                return targetCell?.['count'];
                                            });

                                            tool.setDataIndex(() => {
                                                return targetCell?.[
                                                    'dataIndex'
                                                ];
                                            });

                                            tool.setUnionDatasourceHandler(
                                                () => {
                                                    if (isTotalArea) {
                                                        return targetCell?.[
                                                            'unionDatasourceAll'
                                                        ];
                                                    }

                                                    return targetCell?.[
                                                        'unionDatasource'
                                                    ];
                                                }
                                            );

                                            const { type, value } = exePlugins(
                                                {
                                                    type: 'text',
                                                    value: colDataTable.value,
                                                },
                                                plugins,
                                                tool
                                            );
                                            const key =
                                                type === 'formula'
                                                    ? type
                                                    : 'value';
                                            colDataTable[key] = value;
                                        }

                                        if (isDelay) {
                                            this.delayPlugins.push(
                                                pluginHandler
                                            );
                                        } else {
                                            pluginHandler();
                                        }
                                    }
                                }

                                let pageIndex = pageInfos.pageIndex;
                                const { fromTempSheet } = pageInfos;
                                if (this.templatesPageInfos[fromTempSheet]) {
                                    pageIndex =
                                        this.templatesPageInfos[fromTempSheet]
                                            .pageIndex;
                                }

                                //先执行插件，后执行函数
                                const pageHandler =
                                    genPageIndexHandler(pageIndex);

                                if (formula) {
                                    const formulaHandler = () => {
                                        //当前页
                                        tool.setPageHandler(pageHandler);
                                        //总页数
                                        tool.setTotalPagesHandler(() => {
                                            if (
                                                this.templatesPageInfos[
                                                    fromTempSheet
                                                ]
                                            ) {
                                                return this.templatesPageInfos[
                                                    fromTempSheet
                                                ].pageTotal;
                                            } else {
                                                return pageInfos.pageTotal;
                                            }
                                        });

                                        tool.setValueHandler((...args) => {
                                            if (args.length === 1) {
                                                return {
                                                    type: 'text',
                                                    value: this.datas[args[0]],
                                                };
                                            } else {
                                                return unionDatasource.getValue(
                                                    args[0],
                                                    args[1],
                                                    i
                                                );
                                            }
                                        });

                                        const { type, value } = enhanceFormula(
                                            {
                                                type: 'formula',
                                                value: formula,
                                            },
                                            tool
                                        );
                                        const key =
                                            type === 'formula' ? type : 'value';
                                        colDataTable[key] = value;
                                    };
                                    this.delayFormula.push(formulaHandler);
                                }
                            }
                        );

                        if (pageInfos) {
                            const { rowCount } = pageInfos;
                            pageInfos.dataTable[rowCount] = dataTable;
                            //合并信息
                            spans.forEach(function (span) {
                                pageInfos.spans.push({
                                    ...span,
                                    row: rowCount,
                                });
                            });

                            //条件规则
                            rules.forEach(function (rule) {
                                pageInfos.rules.push({
                                    ...rule,
                                    ranges: [
                                        {
                                            ...rule.ranges[0],
                                            row: rowCount,
                                        },
                                    ],
                                });
                            });

                            //行高
                            pageInfos.rows[rowCount] = {
                                ...(pageInfos.rows[rowCount] || {}),
                                ...rows,
                            };

                            //自动合并区域
                            autoMergeRanges.forEach(function (item) {
                                const cobyItem = Copy(item);
                                cobyItem.range.row = rowCount;
                                pageInfos.autoMergeRanges.push(cobyItem);
                            });

                            pageInfos.rowCount += 1;
                        }
                    }
                );
            }
            verticalAutoMergeRanges.forEach(function (item) {
                item.range.rowCount = pageInfos.rowCount - item.range.row;
                pageInfos.autoMergeRanges.push(item);
            });
        });
    }
    onAfterPage(pageInfos, initHeight = 0) {
        if (pageInfos.isTemplate && !pageInfos.isCurrentSheet) {
            //在新的页签显示下一页
            resetSheet(pageInfos);
            pageInfos.sheet = JSON.parse(pageInfos.cobySheet);
            pageInfos.sheet.name += `_${pageInfos.pageIndex}`;
            pageInfos.sheet.index = this.getSheetCount();
            pageInfos.sheet.isSelected = false;
            this.newSheets[pageInfos.sheet.name] = pageInfos.sheet;

            pageInfos.dataTable = {};
            pageInfos.spans = [];
            pageInfos.rows = [];
            pageInfos.rules = [];
            pageInfos.autoMergeRanges = [];
            pageInfos.rowCount = 0;
        } else {
            //强制打印时在当前行换页
            const { rowCount } = pageInfos;
            const rows = pageInfos.rows?.[rowCount] || {};
            rows.pageBreak = true;
            pageInfos.rows[rowCount] = rows;
        }
        pageInfos.pageHeight = initHeight;
        pageInfos.pageIndex += 1;
        pageInfos.pageTotal += 1;
        if (pageInfos?.fromTempSheet) {
            this.templatesPageInfos[pageInfos?.fromTempSheet].pageIndex += 1;
            this.templatesPageInfos[pageInfos?.fromTempSheet].pageTotal += 1;
        }
    }
}
