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
    setSheetRows(sheet, rows);

    //自动合并区域
    sheet.autoMergeRangeInfos = autoMergeRanges;
}

function setSheetRows(sheet, rows) {
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

function calcTempHeight(params) {
    const { templates, isCalcTemp = false } = params;
    let height = 0;
    templates.forEach(function (temp) {
        const { datas, dataTables } = temp;
        const unionDatasource = getUnionDatasource(datas);
        const dataLen = isCalcTemp ? 1 : unionDatasource.getCount() || 1;

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
    });
    return {
        height,
    };
}

function getUnionDatasource(datas, setting) {
    const _datas = Object.fromEntries(datas);
    const unionDatasource = new UnionDatasource(Object.keys(_datas), setting);
    unionDatasource.load(_datas);
    return unionDatasource;
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
        this.datas = datas;
        this.reportJson = reportJson;
        this.tempConfig = tempConfig;
        this.newSheets = {};
        this.setting = setting;
        this.templatesPageInfos = {};
        this.delayPlugins = [];
        this.delayFormula = [];
        this.groupSumFooterTemplates = [];
        this.groupSumHeaderTemplates = [];
        this.hasGroupSumArea = false;

        //如果有模板，则对数据进行分组，每个组一个sheet
        this.groupTemplate();

        this.analysisTemplate();

        //新增页签。分页后新增的页签
        Object.entries(this.newSheets).forEach(function ([sheetName, sheet]) {
            reportJson.sheets[sheetName] = sheet;
            reportJson.sheetCount += 1;
        });

        const newSheets = {};
        Object.values(reportJson.sheets).forEach(function (sheet) {
            newSheets[sheet.name] = sheet;
        });
        reportJson.sheets = newSheets;

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
    }
    render(pageInfos) {
        const { headerTemplates, footerTemplates, contentTemplates } = this;
        //需要分页
        if (pageInfos.pageArea) {
            const calculate = (
                headerTemplates,
                footerTemplates,
                contentDatasLen = 1
            ) => {
                //头部
                const { height: headerHeight } = calcTempHeight({
                    templates: headerTemplates,
                });
                //底部
                const { height: footerHeight } = calcTempHeight({
                    templates: footerTemplates,
                });

                //内容模板高度
                const { height: contentTempHeight } = calcTempHeight({
                    templates: contentTemplates,
                    isCalcTemp: true,
                });

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
            };

            const recursionRender = (
                headerTemplates,
                footerTemplates,
                isInterrupt
            ) => {
                let { pageSubtotal, lastContentTempCount, contentTempCount } =
                    calculate(
                        headerTemplates,
                        footerTemplates,
                        contentTemplates?.[0]?.dataLen || 1
                    );

                let index = 0;
                let startIndex = 0;
                while (index < pageSubtotal) {
                    const isLastPage = index + 1 >= pageSubtotal;
                    if (isLastPage) {
                        const {
                            pageSubtotal: _pageSubtotal,
                            lastContentTempCount: _lastContentTempCount,
                            contentTempCount: _contentTempCount,
                        } = calculate(
                            this.groupSumHeaderTemplates,
                            this.groupSumFooterTemplates,
                            lastContentTempCount
                        );
                        if (_pageSubtotal === 1) {
                            headerTemplates = this.groupSumHeaderTemplates;
                            footerTemplates = this.groupSumFooterTemplates;
                            lastContentTempCount = _lastContentTempCount;
                            contentTempCount = _lastContentTempCount;
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
            };
            recursionRender(headerTemplates, footerTemplates, false);
        } else {
            this.genPageDataTables({
                templates: headerTemplates,
                pageInfos,
            });
        }
        resetSheet(pageInfos);
    }

    splitTemplate({ sheet, pageArea, groupSumArea }) {
        const { rowCount = 200 } = sheet;

        //头部区域模板
        const headerTemplates = [];
        //底部区域模板
        const footerTemplates = [];
        //表格区域模板
        const contentTemplates = [];

        this.groupSumHeaderTemplates = [];
        this.groupSumFooterTemplates = [];

        const REG = /^\d+:\d+$/;
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

            //当前行与上一行存在合并关系，这两行作为一个模板
            if (template && row < template.endRow) {
                template.height += rowTemplate.height;
                template.dataTables.push(...rowTemplate.dataTables);
                if (rowTemplate.endRow > template.endRow) {
                    template.endRow = rowTemplate.endRow;
                    template.rowCount = template.endRow - template.row;
                }

                rowTemplate.datas.forEach(function (value, tableCode) {
                    if (value.length > template.dataLen) {
                        template.dataLen = value.length;
                    }
                    template.datas.set(tableCode, value);
                });

                if (rowTemplate.isGroupSumArea) {
                    template.isGroupSumArea = rowTemplate.isGroupSumArea;
                }
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
                    this.groupSumHeaderTemplates.push(template);
                    if (template.isGroupSumArea) {
                        this.hasGroupSumArea = true;
                    } else {
                        headerTemplates.push(template);
                    }
                } else if (template.row >= pageAreaEndRow) {
                    this.groupSumFooterTemplates.push(template);

                    if (template.isGroupSumArea) {
                        this.hasGroupSumArea = true;
                    } else {
                        footerTemplates.push(template);
                    }
                } else {
                    contentTemplates.push(template);
                }
                template = null;
            }

            row++;
        } while (row < rowCount);

        this.headerTemplates = headerTemplates;
        this.footerTemplates = footerTemplates;
        this.contentTemplates = contentTemplates;
    }
    setTemplateDatas(template, tableCode, sheetName) {
        let ds = this.datas?.[tableCode] || [];
        const groupName = this.nameMaps[sheetName];
        const groupedDs =
            this.groupsDatas?.[sheetName]?.[tableCode]?.[groupName];
        if (Array.isArray(groupedDs)) {
            ds = groupedDs;
        }

        if (!template.datas.has(tableCode)) {
            template.datas.set(tableCode, Copy(ds));
            if (ds.length > template.dataLen) {
                template.dataLen = ds.length;
            }
        }
    }
    parseRowDataTable(params) {
        const { row, sheet } = params;
        const {
            name: sheetName,
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
            datas: new Map(),
            dataTables: [dataTableInfos],
            dataLen: 0,
            height: 0,
            isGroupSumArea: false,
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
                    const tableCode = bindingPath.split('.')[0];
                    this.setTemplateDatas(result, tableCode, sheetName);
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
                    }
                }
                if (formula) {
                    const tableCodes = getTableCodesFromFormula(formula);
                    if (Array.isArray(tableCodes)) {
                        tableCodes.forEach((tableCode) => {
                            this.setTemplateDatas(result, tableCode, sheetName);
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
    groupTemplate() {
        let { reportJson, datas, tempConfig } = this;
        let sheetCount = reportJson.sheetCount;
        let groupTableCode = undefined;
        const changedGroupNames = []; //用于判断sheet名称是否重复

        const nameMaps = {};
        const groupsDatas = {};
        const template = { ...tempConfig };
        Object.entries(tempConfig).forEach(function ([
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
            const sheet = reportJson?.sheets?.[sheetName];
            if (sheet && sheet.visible !== 0) {
                const cobySheet = JSON.stringify(sheet);
                //根据分组名称创建sheet，Object.values(groupsDatas)[0]，只支持一个实体进行分组
                const grouedData = Object.values(currentSheetDatas)[0];
                const groupNames = Object.keys(grouedData);
                groupNames.forEach(function (_newSheetName, index) {
                    let newSheetName = _newSheetName;
                    //处理同名的sheet
                    let suffix = 1;
                    while (reportJson.sheets[newSheetName]) {
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
                    nameMaps[newSheetName] = _newSheetName;

                    if (index <= 0) {
                        sheet.name = newSheetName;
                    } else {
                        const sheet = JSON.parse(cobySheet);
                        sheet.name = newSheetName;
                        sheet.isSelected = false;
                        sheet.index = sheetCount++;
                        sheet.order = sheet.index;
                        reportJson.sheets[newSheetName] = sheet;
                        reportJson.sheetCount += 1;
                    }

                    template[newSheetName] = {
                        ...templateInfo,
                        fromTempSheet: sheetName,
                    };
                });
            }
            //只支持一个实体进行分组
            return true;
        });

        this.template = template;
        this.groupsDatas = groupsDatas;
        this.nameMaps = nameMaps;
    }
    analysisTemplate() {
        Object.values(this.reportJson.sheets).forEach((sheet) => {
            const {
                name,
                visible = 1,
                data,
                printInfo: {
                    paperSize: { height = 1100, width = 850 },
                    orientation,
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
                left: marginLeft,
                right: marginRight,
            } = margin;

            const templateInfo = this.template[name];
            let pageArea = '';
            let isFillData = false;
            let groupSumArea = '';
            const sheetTag = data?.defaultDataNode?.tag;
            if (sheetTag) {
                const res = JSON.parse(sheetTag);
                pageArea = res?.pageArea || '';
                isFillData = res?.isFillData;
                groupSumArea = res?.groupSumArea || '';
            }

            if (sheet?.rowHeaderData?.dataTable) {
                sheet.rowHeaderData.dataTable = {};
            }

            //以分页区域为边界，对模板进行拆分成头部区模板，内容区模板，底部区模板
            this.splitTemplate({
                sheet,
                pageArea,
                groupSumArea,
            });

            let pageTotalHeight = 0;
            if (orientation === 2) {
                pageTotalHeight =
                    width -
                    marginLeft -
                    marginFooter -
                    marginHeader -
                    marginRight;
            } else {
                pageTotalHeight =
                    height -
                    marginBottom -
                    marginFooter -
                    marginHeader -
                    marginTop;
            }

            const isTemplate = templateInfo ? true : false;
            const fromTempSheet = templateInfo?.fromTempSheet;
            if (isTemplate) {
                if (!this.templatesPageInfos[fromTempSheet]) {
                    this.templatesPageInfos[fromTempSheet] = {
                        pageIndex: 0,
                        pageTotal: 0,
                    };
                }

                this.templatesPageInfos[fromTempSheet].pageIndex += 1;
                this.templatesPageInfos[fromTempSheet].pageTotal += 1;
            }

            const pageInfos = {
                sheet,

                spans: [],
                rows: {},
                rules: [],
                dataTable: {},
                autoMergeRanges: [],

                rowCount: 0,
                pageIndex: 1,
                pageTotal: 1,
                pageArea,
                pageTotalHeight,
                pageHeight: 0,

                isFillData,
                isCurrentSheet: templateInfo?.isCurrentSheet,
                isTemplate,
                cobySheet: JSON.stringify(sheet),
                page: {},
                fromTempSheet,
            };

            this.render(pageInfos);
        });
    }
    getSheetCount() {
        return this.reportJson.sheetCount + Object.keys(this.newSheets).length;
    }

    genPageDataTables(params) {
        const { templates, pageInfos, startIndex = 0, endIndex = 0 } = params;
        templates.forEach((temp) => {
            const {
                datas,
                dataTables,
                height: tempHeight,
                isGroupSumArea,
            } = temp;
            let { verticalAutoMergeRanges } = temp;
            const unionDatasource = getUnionDatasource(datas, this.setting);
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
                        const dataTable = Copy(rowDataTable);
                        Object.entries(dataTable).forEach(
                            ([colStr, colDataTable]) => {
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

                                tool.setGroupNameHandler(
                                    () => pageInfos.sheet.name
                                );

                                tool.setIsGroupSumAreaHandler(
                                    () => isGroupSumArea
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
                            pageInfos.rows[rowCount] = rows;

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
            pageInfos.rows = {};
            pageInfos.rules = [];
            pageInfos.autoMergeRanges = [];
            pageInfos.rowCount = 0;
        } else {
            //在当前页签中显示下一页
            let diff = pageInfos.pageTotalHeight - pageInfos.pageHeight;
            if (diff > 0) {
                const { rowCount } = pageInfos;
                pageInfos.dataTable[rowCount] = {};
                pageInfos.rows[rowCount] = {
                    size: diff,
                };
                pageInfos.rowCount += 1;
            }
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
