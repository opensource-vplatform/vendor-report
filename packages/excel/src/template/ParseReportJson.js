import {
  getFitFontSize,
  getFitHeight,
  isObject,
  isString,
} from '@toone/report-util';

import {
  enhanceFormula,
  exePlugins,
  getTableCodesFromFormula,
} from '../enhance/index';
import Tool from '../enhance/Tool';
import { getVarName } from '../utils/varUtil';
import UnionDatasource from './UnionDatasource';

function enhance(dataTable, enhanceResult) {
  let res = enhanceResult;
  if (!Array.isArray(res)) {
    res = [res];
  }
  res.forEach(({ type, value }) => {
    const key = type === 'text' ? 'value' : type;
    dataTable[key] = value;
  });
}

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

function genAutoMergeRanges(merge, autoMergeRanges, startRow) {
  let direction = 1; //在列方向上应用自动合并
  let mode = 0; //0:在相邻单元格具有相同值时应用自动合并;1:在相邻单元格具有相同值并且自动合并前一行或前一列中的相应单元格时应用自动合并
  let sheetArea = 3; //spreadNS.SheetArea.viewpor
  let selectionMode = 1; //0:在应用自动合并时选择单个单元格;1:在应用自动合并时选择具有相同值的所有单元格

  if (merge.columnMerge && merge.rowMerge) {
    direction = 4; //在行方向上优先于列方向应用自动合并
  } else if (merge.rowMerge) {
    direction = 2; //在行方向上应用自动合并
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

function getOldRowHeight(rows, row, rowHeight = 20) {
  return rows?.[row] || { size: rowHeight };
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

export default class ParseReportJson {
  constructor(config) {
    const {
      reportJson,
      datas,
      tempConfig = {},
      setting,
      showPageCount = 20,
    } = config;
    console.time('耗时多久');
    reportJson.scrollbarMaxAlign = true;
    /* reportJson.showHorizontalScrollbar = false;
    reportJson.showVerticalScrollbar = false; */
    this.paper = {};
    this.datas = datas;
    this.showPageCount = showPageCount;
    this.reportJson = reportJson;
    this.tempConfig = Copy(tempConfig);
    this.setting = setting;
    this.delayPlugins = [];
    this.delayFormula = [];
    this.sheetPages = {};
    this.sheetPrintPages = {};
    this.removeDesignerInfo();
    //打印换算单位
    this.printConversionUnits = getPrintConversionUnits();
    this.parse();

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
  /**
   * 移除设计器中设置的样式信息
   * 如：行列合并设置的角标
   */
  removeDesignerInfo() {
    if (this.reportJson) {
      const sheets = this.reportJson?.sheets;
      if (!sheets) {
        return;
      }
      Object.entries(sheets).forEach(([sheetName, sheet]) => {
        const dataTable = sheet.data?.dataTable;
        if (!dataTable) {
          return;
        }
        Object.entries(dataTable).forEach(([rowStr, columns]) => {
          Object.entries(columns).forEach(([colStr, { style }]) => {
            if (style && isObject(style)) {
              style.decoration = undefined;
            }
          });
        });
      });
    }
  }
  initTempates() {
    this.dataSourceMap = [];
    this.templates = {
      header: {
        template: [],
        height: 0,
        totalArea: {
          height: 0,
          dataTables: {},
        },
        groupSumArea: {
          height: 0,
          dataTables: {},
        },
      },
      footer: {
        template: [],
        height: 0,
        totalArea: {
          height: 0,
          dataTables: {},
        },
        groupSumArea: {
          height: 0,
          dataTables: {},
        },
      },
      content: {
        template: [],
        height: 0,
        totalArea: {
          height: 0,
          dataTables: {},
        },
        groupSumArea: {
          height: 0,
          dataTables: {},
        },
        dataLen: 0,
      },
      datas: {},
    };
  }
  horizontalExpansion(pageInfos, templates) {
    const { header, footer, content } = templates;
    if (!this.isHorizontalExpansion) {
      return { header, footer, content };
    }

    const { columnCount, columns } = pageInfos.sheet;
    const newColumns = [];
    const columnsUnionDatasource = {};
    Object.entries(this.horizontalExpansionInfos.columns).forEach(
      ([key, { tableCodes, cellPlugins, dataPath }]) => {
        const datas = {};
        const setting = {
          ...this.setting,
          cellPlugins,
        };
        Object.keys(tableCodes).forEach((tableCode) => {
          datas[tableCode] = templates.datas[tableCode];
        });
        const unionDatasource = new UnionDatasource(dataPath, setting);
        unionDatasource.load(datas);
        columnsUnionDatasource[key] = unionDatasource;
      }
    );

    const tempKeys = ['header', 'content', 'footer'];
    let maxColumnCount = 0;
    tempKeys.forEach((tempKey) => {
      const tempInfos = templates[tempKey];
      const { template } = tempInfos;
      template.forEach((temp) => {
        if (temp) {
          const { dataTables = [] } = temp;
          dataTables.forEach((dataTableInfos) => {
            const {
              rows = {},
              rowDataTable,
              spans = [],
              rules = [],
              autoMergeRanges = [],
            } = dataTableInfos;
            dataTableInfos.rowDataTable = {};
            dataTableInfos.rules = [];
            const dataTable = { ...rowDataTable };
            let newColumnCount = 0;
            for (let col = 0; col < columnCount; col++) {
              const _colDataTable = dataTable[col];
              //条件规则
              const newRules = rules.filter((rule) => {
                const ranges = rule.ranges || [];
                return ranges.some((range) => {
                  return range.col <= col && col < range.col + range.colCount;
                });
              });
              if (newColumnCount < col) {
                newColumnCount = col;
              }
              const colDataTable = { ..._colDataTable };
              const { bindingPath, tag, style } = colDataTable;
              const unionDatasource = columnsUnionDatasource[col];
              if (unionDatasource) {
                const dataLen = unionDatasource.getCount();
                let isHorizontalExpansion = false;
                if (tag) {
                  const jsonTag = JSON.parse(tag);
                  const plugins = jsonTag?.plugins;
                  if (Array.isArray(plugins)) {
                    plugins.forEach(({ config = {} }) => {
                      if (config?.direction === 'horizontal') {
                        isHorizontalExpansion = true;
                      }
                    });
                  }
                }

                //当前单元格是否是横向扩展
                if (isHorizontalExpansion) {
                  for (let i = 0; i < dataLen; i++) {
                    const colDataTable = { ..._colDataTable };
                    if (bindingPath?.includes?.('.')) {
                      const [tableCode, fieldCode] = bindingPath.split('.');
                      delete colDataTable.bindingPath;
                      const { type, value: newVlaue } =
                        unionDatasource.getValue(tableCode, fieldCode, i);
                      if (type === 'text') {
                        colDataTable.value = newVlaue;
                      }
                    }
                    dataTableInfos.rowDataTable[newColumnCount] = colDataTable;
                    if (columns[col]) {
                      newColumns[newColumnCount] = columns[col];
                    }
                    newRules.forEach((rule) => {
                      const ranges = rule.ranges || [];
                      ranges.forEach((range) => {
                        if (
                          range.col <= col &&
                          col < range.col + range.colCount
                        ) {
                          range.colCount += 1;
                        }
                      });
                    });
                    newColumnCount++;
                  }
                } else {
                  for (let i = 0; i < dataLen; i++) {
                    const colDataTable = { ..._colDataTable };
                    dataTableInfos.rowDataTable[newColumnCount] = colDataTable;
                    if (columns[col]) {
                      newColumns[newColumnCount] = columns[col];
                    }
                    newColumnCount++;
                  }
                }
              } else {
                dataTableInfos.rowDataTable[newColumnCount] =
                  colDataTable || {};
                if (columns[col]) {
                  newColumns[newColumnCount] = columns[col];
                }
                newColumnCount++;
              }
              dataTableInfos.rules.push(...newRules);
            }

            if (newColumnCount > maxColumnCount) {
              maxColumnCount = newColumnCount;
            }
          });
        }
      });
    });
    if (maxColumnCount > columnCount) {
      pageInfos.sheet.columnCount = maxColumnCount;
    }
    pageInfos.sheet.columns = newColumns;
    return { header, footer, content };
  }
  render(pageInfos, templates) {
    //如果有横向扩展，则先横向扩展
    const { header, footer, content } = this.horizontalExpansion(
      pageInfos,
      templates
    );
    //需要分页
    if (pageInfos.pageArea) {
      function calculate(header, footer, content) {
        let { height: headerHeight } = header;
        let { height: footerHeight } = footer;
        let { height: contentTempHeight } = content;

        const { pageTotalHeight } = pageInfos;

        const _height = headerHeight + footerHeight;
        const remainderHeight = _height % pageTotalHeight;
        const diffHeight = pageTotalHeight - remainderHeight;
        let contentHeight = pageInfos.pageTotalHeight;
        if (diffHeight >= contentTempHeight) {
          contentHeight = diffHeight;
        }
        contentHeight -= 5;
        return {
          contentHeight,
        };
      }

      let { template: headerTemplates } = header;
      let { template: footerTemplates, height: footerHeight } = footer;
      let { template: contentTemplates } = content;

      //计算内容区域的可用高度，不包含章合计和总计
      let { contentHeight } = calculate(header, footer, content);

      //内容总高度，不包括头部和底部
      pageInfos.contentTotalHeight = contentHeight;
      //已经消耗的内容高度
      pageInfos.contentHeight = 0;
      //内容所用到的数据的起始索引
      pageInfos.contentDataIndex = 0;
      //标识内容是否已经循环处理完。true表示还未处理完
      pageInfos.flag = true;
      //内容所用到的数据的长度
      pageInfos.dataLen = undefined;
      //标识是否在最后一页已经处理过章合计
      pageInfos.hasHandleLastPage = false;

      while (pageInfos.flag) {
        //用于存储当前页内容
        const sheetPage = {
          sheet: pageInfos.sheet,
          columns: JSON.parse(JSON.stringify(pageInfos.sheet.columns)),
          spans: [],
          rows: [],
          rules: [],
          dataTable: {},
          autoMergeRanges: [],
          rowCount: 0,
        };

        if (!pageInfos.sheetPrintPage) {
          //用于存储打印内容，例如次打印20页
          pageInfos.sheetPrintPage = {
            sheet: pageInfos.sheet,
            columns: JSON.parse(JSON.stringify(pageInfos.sheet.columns)),
            spans: [],
            rows: [],
            rules: [],
            dataTable: {},
            autoMergeRanges: [],
            rowCount: 0,
          };
        }

        //处理头部区域
        this.genPageDataTables({
          templates: headerTemplates,
          pageInfos,
          sheetPage,
          sheetPrintPage: pageInfos.sheetPrintPage,
        });

        //处理内容区域
        this.genContentPageDataTables({
          templates: contentTemplates,
          pageInfos,
          sheetPage,
          sheetPrintPage: pageInfos.sheetPrintPage,
        });

        let diffHeight = 0;
        //判断是否已经是最后一页
        if (!pageInfos.flag) {
          //只包含章合计
          let height = footer.groupSumArea.height + footerHeight;
          const newTemplates = [...footerTemplates];
          Object.entries(footer.groupSumArea.dataTables).forEach(
            ([key, value]) => {
              newTemplates[key] = value;
            }
          );
          if (pageInfos.isLastGroup) {
            //最后一组的最后一页的底部包含章合计和总计
            height += footer.totalArea.height;
            Object.entries(footer.totalArea.dataTables).forEach(
              ([key, value]) => {
                newTemplates[key] = value;
              }
            );
          }

          const { pageTotalHeight, pageHeight } = pageInfos;
          const remainderHeight = height % pageTotalHeight;
          diffHeight = pageTotalHeight - pageHeight - remainderHeight;
          if (diffHeight > 0 || pageInfos.hasHandleLastPage) {
            //如果剩余高度能渲染包含章合计的底部，则用包含章合计的底部模板渲染
            footerTemplates = newTemplates;
          } else {
            //如果剩余高度不能渲染包含章合计的底部，则继续循环
            pageInfos.dataLen += 1;
            pageInfos.flag = true;
            pageInfos.hasHandleLastPage = true;
          }
        }

        //最后一页，填充数据
        if (!pageInfos.flag) {
          const { lastSpans, lastDataTable } = pageInfos;
          if (pageInfos.isFillData && pageInfos.singleRowFill) {
            //1，单行填充
            const height = diffHeight - 10;
            if (height > 0) {
              this.fillData({
                tempHeight: height,
                fillCount: 1,
                lastSpans,
                lastDataTable,
                pageInfos,
                sheetPage,
              });
            }
          } else if (pageInfos.isFillData) {
            //2，多行填充
            const height = diffHeight - 10;
            if (height > 0) {
              const tempHeight = content.height;
              const fillCount = Math.floor(height / tempHeight);
              this.fillData({
                tempHeight,
                fillCount,
                lastSpans,
                lastDataTable,
                pageInfos,
                sheetPage,
              });
            }
          }
        }

        //底部
        this.genPageDataTables({
          templates: footerTemplates,
          pageInfos,
          sheetPage,
          sheetPrintPage: pageInfos.sheetPrintPage,
        });
        if (pageInfos.flag) {
          this.onAfterPage(pageInfos);
        }
        this.onAfterPage(pageInfos.sheetPrintPage);

        pageInfos.pageHeight = 0;
        pageInfos.contentHeight = 0;
        this.sheetPages[pageInfos.sheet.name].datas.push(sheetPage);
        if (pageInfos.showPageCount % this.showPageCount === 0) {
          this.sheetPrintPages[pageInfos.sheet.name].datas.push(
            pageInfos.sheetPrintPage
          );
          pageInfos.sheetPrintPage = null;
          pageInfos.showPageCount = 0;
        }
        pageInfos.showPageCount += 1;
      }
    } else {
      const sheetPage = {
        sheet: pageInfos.sheet,
        columns: JSON.parse(JSON.stringify(pageInfos.sheet.columns)),
        spans: [],
        rows: [],
        rules: [],
        dataTable: {},
        autoMergeRanges: [],
        rowCount: 0,
      };
      this.genPageDataTables({
        templates: header.template,
        pageInfos,
        sheetPage,
      });
      this.sheetPages[pageInfos.sheet.name].datas.push(sheetPage);
      this.sheetPrintPages[pageInfos.sheet.name].datas.push(sheetPage);
      pageInfos.sheetPrintPage = null;
    }
  }
  fillData({
    fillCount,
    tempHeight,
    pageInfos,
    sheetPage,
    lastSpans,
    lastDataTable,
  }) {
    for (let i = 0; i < fillCount; i++) {
      pageInfos.pageHeight += tempHeight;
      let dataTable = JSON.parse(JSON.stringify(lastDataTable));
      sheetPage.dataTable[sheetPage.rowCount] = dataTable;
      const sheetPrintPage = pageInfos.sheetPrintPage;
      if (sheetPrintPage) {
        sheetPrintPage.dataTable[sheetPrintPage.rowCount] = dataTable;
      }

      //行高
      if (tempHeight != pageInfos.defaults.rowHeight) {
        sheetPage.rows[sheetPage.rowCount] = {
          size: tempHeight,
        };
        if (sheetPrintPage) {
          sheetPrintPage.rows[sheetPrintPage.rowCount] = {
            size: tempHeight,
          };
        }
      }

      lastSpans.forEach(function (span) {
        sheetPage.spans.push({
          ...span,
          rowCount: 1,
          row: sheetPage.rowCount,
        });
        sheetPrintPage &&
          sheetPrintPage.spans.push({
            ...span,
            rowCount: 1,
            row: sheetPrintPage.rowCount,
          });
      });

      sheetPage.rowCount += 1;
      sheetPrintPage && (sheetPrintPage.rowCount += 1);
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
          left: 75,
          right: 75,
        },
        showColumnHeader = 2,
      },
      colHeaderRowInfos = [],
      columns,
      defaults = {
        colHeaderRowHeight: 20,
        colWidth: 62,
        rowHeaderColWidth: 40,
        rowHeight: 20,
        _isExcelDefaultColumnWidth: false,
      },
    } = sheet;

    const templateInfo = this.tempConfig?.[name];
    let isFillData = false;
    let singleRowFill = false;
    const sheetTag = data?.defaultDataNode?.tag;
    let tag = {};
    if (sheetTag) {
      const res = JSON.parse(sheetTag);
      isFillData = res?.isFillData;
      singleRowFill = res?.singleRowFill;
      tag = res;
    }

    let {
      bottom: marginBottom,
      top: marginTop,
      left: marginLeft,
      right: marginRight,
    } = margin;

    let pageTotalHeight = 0;
    const printConversionUnits = this.printConversionUnits;
    const _width = (printConversionUnits * (width || 850)) / 100;
    const _height = (printConversionUnits * (height || 1100)) / 100;
    marginBottom = (printConversionUnits * marginBottom) / 100;
    marginTop = (printConversionUnits * marginTop) / 100;
    marginLeft = (printConversionUnits * marginLeft) / 100;
    marginRight = (printConversionUnits * marginRight) / 100;
    this.paper.width = _width;
    this.paper.height = _height;
    this.paper.paddingBottom = marginBottom;
    this.paper.paddingTop = marginTop;
    this.paper.paddingLeft = marginLeft;
    this.paper.paddingRight = marginRight;

    let defaultHeaderHeight = defaults.colHeaderRowHeight;
    if (colHeaderRowInfos.length > 0) {
      const height = colHeaderRowInfos.reduce((res, cur) => {
        let size = defaults.rowHeight;
        if (cur.hasOwnProperty('size')) {
          size = cur.size;
        }
        return res + size;
      }, 0);
      defaultHeaderHeight = height;
    }

    const colHeaderHeight = showColumnHeader === 2 ? defaultHeaderHeight : 0;
    if (orientation === 2) {
      pageTotalHeight = _width - marginBottom - marginTop - colHeaderHeight;
      this.paper.width = _height;
      this.paper.height = _width;
    } else {
      pageTotalHeight = _height - marginBottom - marginTop - colHeaderHeight;
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
      singleRowFill,
      isFillData,
      isCurrentSheet: templateInfo?.isCurrentSheet,
      isTemplate,
      page: {},
      columns,
      lastSpans: [],
      lastDataTable: {},
      dataIndex: 0,
      defaults,
    };

    return pageInfos;
  }
  collectTemplate(temp, type, columns = []) {
    const { datas, allDatas, dataTables, dataPath, cellPlugins } = temp;

    //生成联合数据源
    const setting = {
      ...this.setting,
      cellPlugins,
    };
    const unionDatasource = new UnionDatasource(dataPath, setting);
    unionDatasource.load(datas);
    Object.keys(datas).forEach((tableCode) => {
      this.dataSourceMap.push({
        tableCode,
        datas,
        unionDatasource,
        type,
      });
    });
    temp.unionDatasource = unionDatasource;

    const unionDatasourceAll = new UnionDatasource(dataPath, setting);
    unionDatasourceAll.load(allDatas);
    temp.unionDatasourceAll = unionDatasourceAll;

    //计算高度
    let height = 0;
    const dataLen = type === 'content' ? 1 : unionDatasource.getCount() || 1;
    this.templates.datas = { ...this.templates.datas, ...datas };
    for (let i = 0; i < dataLen; i++) {
      height += this.calcTempAfterRenderHeight({
        dataTables,
        unionDatasource,
        pageInfos: { columns },
        dataIndex: i,
      });
    }
    //如果不是章合计区域并且不是总计区域
    if (!temp.isTotalArea && !temp.isGroupSumArea) {
      this.templates[type].template.push(temp);
      this.templates[type].height += height;
    } else {
      const areaKey = temp.isTotalArea ? 'totalArea' : 'groupSumArea';
      this.templates[type][areaKey].height += height;
      const len = this.templates[type].template.length;
      this.templates[type][areaKey].dataTables[len] = temp;
      this.templates[type].template.push(null);
    }

    //所有模板
    if (type === 'content') {
      this.templates[type].dataLen = unionDatasource.getCount() || 1;
    }
  }
  genTemplateFromSheet(sheet) {
    this.namedStyles = [];
    const { rowCount = 200, data, columns } = sheet;

    this.initTempates();

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
                genAutoMergeRanges(merge, autoMergeRanges, template.row);
                merge = item;
              }
            }
            genAutoMergeRanges(merge, autoMergeRanges, template.row);
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
          this.collectTemplate(template, 'header', columns);
        } else if (template.row >= pageAreaEndRow) {
          this.collectTemplate(template, 'footer', columns);
        } else {
          this.collectTemplate(template, 'content', columns);
        }
        template = null;
      }

      row++;
    } while (row < rowCount);
  }
  parse() {
    const sheets = Object.values(this.reportJson.sheets);
    this.sheetNames = [];
    sheets.forEach((sheet) => {
      const { visible = 1, name, isSelected } = sheet;
      //当前sheet不可见，直接跳过解析
      if (visible === 0) {
        return;
      }

      if (isSelected) {
        this.activeSheetName = name;
      }
      this.horizontalExpansionInfos = {
        columns: {},
      };
      this.initTempates();
      this.genTemplateFromSheet(sheet);
      const templateInfo = this.tempConfig[name];
      let sheetNames = [name];
      let sheetDatas = {};
      let tableCode = '';
      if (templateInfo) {
        const res = this.groupDatas(templateInfo);
        sheetDatas = res.sheetDatas;
        res.groupNames.length && (sheetNames = res.groupNames);
        tableCode = res.tableCode;
      }

      const pageInfos = this.genPageInfos({
        sheet,
      });

      pageInfos.tableCode = tableCode;
      pageInfos.sheet = sheet;
      const templates = this.templates;

      const groupCount = sheetNames.length;
      this.sheetPages[name] = {
        isPage: pageInfos.pageArea ? true : false,
        pageIndex: 0,
        datas: [],
      };

      this.sheetPrintPages[name] = {
        isPage: pageInfos.pageArea ? true : false,
        pageIndex: 0,
        datas: [],
      };

      pageInfos.unionDatasourceDatas = {};

      pageInfos.sheetPrintPage = {
        sheet: pageInfos.sheet,
        spans: [],
        rows: [],
        rules: [],
        dataTable: {},
        autoMergeRanges: [],
        rowCount: 0,
      };
      pageInfos.showPageCount = 1;

      sheetNames.forEach((sheetName, index) => {
        pageInfos.groupName = sheetName;
        pageInfos.isLastGroup = groupCount === index + 1;

        if (sheetDatas[sheetName]) {
          pageInfos.groupDatas = sheetDatas[sheetName];
          let heightChangeInfos = {};
          this.dataSourceMap.forEach(
            ({ tableCode, datas, unionDatasource, type }) => {
              if (tableCode === pageInfos.tableCode) {
                const newDatas = {
                  ...datas,
                  [tableCode]: pageInfos.groupDatas,
                };
                this.templates.datas[tableCode] = pageInfos.groupDatas;
                pageInfos.unionDatasourceDatas[sheetName] = newDatas;
                const oldCount = unionDatasource.getCount();
                unionDatasource.load(newDatas);
                const newCount = unionDatasource.getCount();
                if (
                  oldCount !== newCount &&
                  (type === 'header' || type === 'footer')
                ) {
                  heightChangeInfos[type] = true;
                }
              }
            }
          );
          //如果头部和尾部用到了分组数据，则重新计算头部和尾部高度
          Object.keys(heightChangeInfos).forEach((key) => {
            const tempInfos = this.templates[key];
            Object.values(tempInfos).forEach((infos) => {
              infos.height = 0;
              infos.template.forEach((temp) => {
                const { dataTables, unionDatasource } = temp;

                let height = 0;
                const dataLen = unionDatasource.getCount() || 1;

                for (let i = 0; i < dataLen; i++) {
                  height += this.calcTempAfterRenderHeight({
                    dataTables,
                    unionDatasource,
                    pageInfos,
                    dataIndex: i,
                  });
                }

                infos.height += height;
              });
            });
          });
        }
        if (index > 0) {
          //强制打印时在当前行换页
          this.onAfterPage(pageInfos);
        }
        this.render(pageInfos, templates);
      });
      if (pageInfos.sheetPrintPage) {
        this.sheetPrintPages[pageInfos.sheet.name].datas.push(
          pageInfos.sheetPrintPage
        );
      }
      pageInfos.sheet.namedStyles = this.namedStyles;
      this.resetSheet(this.sheetPages[name].datas[0]);
      this.reportJson.sheets[name] = this.sheetPages[name].datas[0].sheet;
    });
  }
  parseRowDataTable(params) {
    const { row, sheet } = params;
    const {
      spans = [],
      data = {},
      rows = {} /* 行高 */,
      conditionalFormats = {},
      defaults = {
        colHeaderRowHeight: 20,
        colWidth: 62,
        rowHeaderColWidth: 40,
        rowHeight: 20,
        _isExcelDefaultColumnWidth: false,
      },
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
    dataTableInfos.rows = getOldRowHeight(rows, row, defaults.rowHeight);
    result.height = dataTableInfos?.rows?.size;

    Object.entries(rowDataTable).forEach(([colStr, _colDataTable]) => {
      const { bindingPath, tag, formula, style = {} } = _colDataTable;
      let isUseNamespace = true;
      let isHorizontalExpansion = false;
      if (tag) {
        const jsonTag = JSON.parse(tag);
        const plugins = jsonTag?.plugins;
        if (Array.isArray(plugins)) {
          let rowHeightType = '';
          plugins.forEach(({ config = {} }) => {
            if (config?.rowHeight) {
              rowHeightType = config?.rowHeight;
            }
            if (config?.direction === 'horizontal') {
              isHorizontalExpansion = true;
            }
          });

          //当前单元格是否是横向扩展
          if (isHorizontalExpansion) {
            this.isHorizontalExpansion = true;
            const tableCode = bindingPath.split('.')[0];
            this.horizontalExpansionInfos.columns[colStr] =
              this.horizontalExpansionInfos.columns[colStr] || {};
            this.horizontalExpansionInfos.columns[colStr].tableCodes =
              this.horizontalExpansionInfos.columns[colStr].tableCodes || {};
            this.horizontalExpansionInfos.columns[colStr].tableCodes[
              tableCode
            ] = true;
            this.horizontalExpansionInfos.columns[colStr].dataPath =
              this.horizontalExpansionInfos.columns[colStr].dataPath || [];
            this.horizontalExpansionInfos.columns[colStr].dataPath.push(
              bindingPath
            );
            this.horizontalExpansionInfos.columns[colStr].cellPlugins =
              this.horizontalExpansionInfos.columns[colStr].cellPlugins || [];
            this.horizontalExpansionInfos.columns[colStr].cellPlugins.push({
              plugins,
              bindingPath,
            });

            this.templates.datas[tableCode] = this.datas[tableCode] || [];
          }
          if (rowHeightType === 'autoFitByContent') {
            style.wordWrap = true;
          } else if (rowHeightType === 'autoFitByZoom') {
            isUseNamespace = false;
          }
        }
      }
      //样式采用命名空间
      if (
        _colDataTable.style &&
        typeof _colDataTable.style !== 'string' &&
        !_colDataTable?.style?.parentName &&
        isUseNamespace
      ) {
        const namedStyles = getVarName();
        this.namedStyles.push({
          ...style,
          name: namedStyles,
        });
        _colDataTable.style = namedStyles;
      }

      const col = Number(colStr);
      let isBindEntity = bindingPath?.includes?.('.');

      if (isBindEntity) {
        const tableCode = bindingPath.split('.')[0];

        if (!isHorizontalExpansion) {
          result.dataPath.push(bindingPath);
          result.tableCodes[tableCode] = true;
          result.datas[tableCode] = this.datas[tableCode] || [];
          result.allDatas[tableCode] = this.datas[tableCode] || [];
        }

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
          if (Array.isArray(plugins) && !isHorizontalExpansion) {
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
            result.datas[tableCode] = this.datas[tableCode] || [];
            result.allDatas[tableCode] = this.datas[tableCode] || [];
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
    });
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

  handleDataTable(params) {
    const {
      pageInfos,
      sheetPage,
      sheetPrintPage,
      temp,
      i,
      type,
      isRetainHorizontalExpansionData,
    } = params;
    const { page, lastDataTable, dataIndex, sheet } = pageInfos;
    const sharedFormulas = sheet?.sharedFormulas;
    const {
      dataTables,
      isGroupSumArea,
      isTotalArea,
      unionDatasource,
      unionDatasourceAll,
    } = temp;

    const sheetPageRowCount = sheetPage.rowCount;
    const sheetPrintPageRowCount = sheetPrintPage?.rowCount;

    dataTables.forEach(
      ({
        rows = {},
        rowDataTable,
        spans = [],
        rules = [],
        autoMergeRanges = [],
      }) => {
        const dataTable = { ...rowDataTable };
        const printDataTalbe = { ...rowDataTable };
        let rowHeight = 0;
        Object.entries(dataTable).forEach(([colStr, _colDataTable]) => {
          const colDataTable = { ..._colDataTable };
          const printColDataTable = { ..._colDataTable };
          if (type === 'content') {
            lastDataTable[colStr] = {
              style: colDataTable.style,
            };
          }

          dataTable[colStr] = colDataTable;
          printDataTalbe[colStr] = printColDataTable;
          const col = Number(colStr);
          const { bindingPath, tag, style } = colDataTable;

          let tagObj = null;
          if (tag) {
            tagObj = JSON.parse(tag);
          }

          if (bindingPath?.includes?.('.')) {
            const bindingPaths = bindingPath.split('.');
            if (bindingPaths.length === 2) {
              bindingPaths.push('');
            }
            delete colDataTable.bindingPath;
            delete printColDataTable.bindingPath;
            const plugins = tagObj?.plugins;
            const { type, value: newVlaue } = unionDatasource.getValue(
              ...bindingPaths,
              i,
              plugins
            );
            if (type === 'text') {
              colDataTable.value = newVlaue;
              printColDataTable.value = newVlaue;
            }
          }

          const height = this.getFitHeight({
            tag,
            style,
            pageInfos,
            colDataTable,
            colStr,
          });

          //字体
          const { fontSize, unit } = this.getFitFontSize({
            tag,
            style,
            pageInfos,
            colDataTable,
            colStr,
            height: rows?.size || pageInfos?.defaults?.rowHeight,
          });
          if (fontSize) {
            colDataTable.style = { ...(colDataTable.style || {}) };
            colDataTable.style.fontSize = fontSize + unit;
          }

          if (height > rowHeight) {
            rowHeight = height;
          }

          const tool = new Tool();
          const printTool = new Tool();
          const groupName = pageInfos.groupName;
          tool.setGroupNameHandler(() => groupName);
          printTool.setGroupNameHandler(() => groupName);

          tool.setIsGroupSumAreaHandler(() => isGroupSumArea || isTotalArea);
          printTool.setIsGroupSumAreaHandler(
            () => isGroupSumArea || isTotalArea
          );

          //设置行号
          tool.setRowHandler(() => {
            return sheetPage?.rowCount || 0;
          });
          printTool.setRowHandler(() => {
            return sheetPrintPage?.rowCount || 0;
          });
          //设置列号
          tool.setColHandler(() => {
            return col;
          });
          printTool.setColHandler(() => {
            return col;
          });

          //获取json
          tool.setSheetJsonHandler(() => {
            return sheetPage;
          });
          printTool.setSheetJsonHandler(() => {
            return sheetPrintPage;
          });

          let hasRuntimePlugins = false;
          let isHorizontalExpansion = false;
          if (tagObj) {
            const instanceId = tagObj.instanceId;
            //当前单元格在当前页中的起始行，记录数等信息
            page[pageInfos.pageIndex] = page[pageInfos.pageIndex] || {};
            page[pageInfos.pageIndex][instanceId] =
              page[pageInfos.pageIndex][instanceId] || {};
            const targetCell = page[pageInfos.pageIndex][instanceId];
            //内容区域在当前页的起始行
            targetCell['row'] = targetCell['row'] ?? sheetPageRowCount;
            //打印的内容区域在当前页的起始行
            targetCell['printRow'] =
              targetCell['printRow'] ?? sheetPrintPageRowCount;
            targetCell['col'] = col;
            //当前分组的联合数据源在当前页的记录数
            targetCell['count'] = targetCell['count'] || 0;
            targetCell['count'] += 1;
            //当前分组的联合数据源在当前页的起始索引
            targetCell['dataStartIndex'] = dataIndex;
            //当前分组的联合数据源
            targetCell['unionDatasource'] = unionDatasource;
            //未分组的联合数据源
            targetCell['unionDatasourceAll'] = unionDatasourceAll;

            //处理超链接信息
            const hyperlinkInfo = tagObj.hyperlinkInfo || {};
            if (
              hyperlinkInfo?.type === 'document' &&
              hyperlinkInfo?.isAutoDoc
            ) {
              colDataTable.hyperlink.url = `sjs://${colDataTable.value}!A1`;
              if (colDataTable.hyperlink.tooltip) {
                colDataTable.hyperlink.tooltip = colDataTable.value;
              }
            }

            //执行插件
            const plugins = tagObj.plugins;
            if (Array.isArray(plugins)) {
              let targetInstanceId = '';
              const isDelay = plugins.some(function ({ type, config }) {
                if (type === 'cellSubTotal') {
                  targetInstanceId = config?.instanceId;
                }
                return ['cellSubTotal'].includes(type);
              });

              plugins.forEach(({ config = {} }) => {
                if (config?.direction === 'horizontal') {
                  isHorizontalExpansion = true;
                }
              });

              hasRuntimePlugins = plugins.some(
                ({ retention }) => retention === 'runtime'
              );

              const pageIndex = pageInfos.pageIndex;
              const groupName = pageInfos.groupName;
              function pluginHandler() {
                //汇总
                const targetCell = page?.[pageIndex]?.[targetInstanceId];
                tool.setFieldIndexHandler(() => {
                  return {
                    row: targetCell?.['row'],
                    col: targetCell?.['col'],
                  };
                });

                printTool.setFieldIndexHandler(() => {
                  return {
                    row: targetCell?.['printRow'],
                    col: targetCell?.['col'],
                  };
                });

                tool.setDataCountHandler(() => {
                  return targetCell?.['count'];
                });

                printTool.setDataCountHandler(() => {
                  return targetCell?.['count'];
                });

                tool.setDataIndex(() => {
                  return targetCell?.['dataStartIndex'];
                });

                printTool.setDataIndex(() => {
                  return targetCell?.['dataStartIndex'];
                });

                tool.setUnionDatasourceHandler(() => {
                  if (isTotalArea) {
                    return targetCell?.['unionDatasourceAll'];
                  }
                  const unionDatasource = targetCell?.['unionDatasource'];
                  const datas = pageInfos.unionDatasourceDatas[groupName];
                  if (datas) {
                    unionDatasource.load(datas);
                  }
                  return unionDatasource;
                });

                printTool.setUnionDatasourceHandler(() => {
                  if (isTotalArea) {
                    return targetCell?.['unionDatasourceAll'];
                  }
                  const unionDatasource = targetCell?.['unionDatasource'];
                  const datas = pageInfos.unionDatasourceDatas[groupName];
                  if (datas) {
                    unionDatasource.load(datas);
                  }
                  return unionDatasource;
                });

                let res = exePlugins(
                  {
                    type: 'text',
                    value: colDataTable.value,
                  },
                  plugins,
                  tool
                );

                enhance(colDataTable, res);

                let res1 = exePlugins(
                  {
                    type: 'text',
                    value: printColDataTable.value,
                  },
                  plugins,
                  printTool
                );

                enhance(printColDataTable, res1);
              }

              if (isDelay) {
                this.delayPlugins.push(pluginHandler);
              } else {
                pluginHandler();
              }
            }
          }
          if (isHorizontalExpansion && !isRetainHorizontalExpansionData) {
            colDataTable.value = '';
          }
          let pageIndex = pageInfos.pageIndex;

          //先执行插件，后执行函数
          const pageHandler = genPageIndexHandler(pageIndex);

          if (colDataTable.formula) {
            const formulaHandler = () => {
              //当前页
              tool.setPageHandler(pageHandler);
              //总页数
              tool.setTotalPagesHandler(() => pageInfos.pageTotal);

              tool.setValueHandler((...args) => {
                if (args.length === 1) {
                  return {
                    type: 'text',
                    value: this.datas[args[0]],
                  };
                } else {
                  const parameter = [...args];
                  if (parameter.length === 2) {
                    parameter.push('');
                  }
                  return unionDatasource.getValue(...parameter, i);
                }
              });

              //序列号
              tool.setSeqHandler((...args) => {
                let value = i + 1;
                if (args.length <= 0) {
                  value -= dataIndex;
                }
                if (value <= 1) {
                  value = 1;
                }
                return { type: 'text', value };
              });

              let res = enhanceFormula(
                {
                  type: 'formula',
                  value: isString(colDataTable.formula)
                    ? colDataTable.formula
                    : sharedFormulas?.[colDataTable?.formula?.si]?.formula,
                },
                tool
              );
              enhance(colDataTable, res);
              enhance(printColDataTable, res);
            };
            this.delayFormula.push(formulaHandler);
          }
          if (!hasRuntimePlugins) {
            delete colDataTable.tag;
            delete printColDataTable.tag;
          }
        });

        if (pageInfos) {
          let sheetPageRowCount = sheetPage.rowCount;
          sheetPage.dataTable[sheetPageRowCount] = dataTable;
          if (sheetPrintPage) {
            sheetPrintPage.dataTable[sheetPrintPage.rowCount] = printDataTalbe;
          }

          //合并信息
          spans.forEach(function (span) {
            sheetPage.spans.push({
              ...span,
              row: sheetPageRowCount,
            });

            if (sheetPrintPage) {
              sheetPrintPage.spans.push({
                ...span,
                row: sheetPrintPage.rowCount,
              });
            }
          });

          //合并信息
          if (spans.length > 0 && type === 'content') {
            pageInfos.lastSpans = spans;
          }

          //条件规则
          rules.forEach(function (rule) {
            sheetPage.rules.push({
              ...rule,
              ranges: [
                {
                  ...rule.ranges[0],
                  row: sheetPageRowCount,
                },
              ],
            });
            sheetPrintPage &&
              sheetPrintPage.rules.push({
                ...rule,
                ranges: [
                  {
                    ...rule.ranges[0],
                    row: sheetPrintPage.rowCount,
                  },
                ],
              });
          });

          //行高
          let size = rows?.size || pageInfos.defaults.rowHeight;
          size = size > rowHeight ? size : rowHeight;
          const newRows = { ...rows, size };
          const rowsKeys = Object.keys(newRows);
          const hasSizeKey = newRows.hasOwnProperty('size');
          if (
            !(
              hasSizeKey &&
              rowsKeys.length === 1 &&
              newRows.size == pageInfos.defaults.rowHeight
            )
          ) {
            sheetPage.rows[sheetPageRowCount] = {
              ...(sheetPage.rows[sheetPageRowCount] || {}),
              ...rows,
              size,
            };

            if (sheetPrintPage) {
              sheetPrintPage.rows[sheetPrintPage.rowCount] = {
                ...(sheetPrintPage.rows[sheetPrintPage.rowCount] || {}),
                ...rows,
                size,
              };
            }
          }

          //横向上的自动合并区域(在纵向上不连续)
          autoMergeRanges.forEach(function (item) {
            sheetPage.autoMergeRanges.push({
              ...item,
              range: {
                ...item.range,
                row: sheetPageRowCount,
              },
            });

            sheetPrintPage &&
              sheetPrintPage.autoMergeRanges.push({
                ...item,
                range: {
                  ...item.range,
                  row: sheetPrintPage.rowCount,
                },
              });
          });

          pageInfos.rowCount += 1;
          sheetPage && (sheetPage.rowCount += 1);
          sheetPrintPage && (sheetPrintPage.rowCount += 1);
        }
      }
    );
  }

  genPageDataTables(params) {
    const { templates, pageInfos, sheetPage, sheetPrintPage } = params;
    templates.forEach((temp) => {
      if (!temp) {
        return;
      }
      const {
        height: tempHeight,
        unionDatasource,
        verticalAutoMergeRanges,
      } = temp;

      const dataLen = unionDatasource.getCount() || 1;

      const sheetPageRowCount = sheetPage.rowCount;
      const sheetPrintPageRowCount = sheetPrintPage?.rowCount;

      for (let i = 0; i < dataLen; i++) {
        if (pageInfos.pageArea) {
          if (pageInfos.pageHeight + tempHeight > pageInfos.pageTotalHeight) {
            pageInfos.dataIndex = i;
            this.onAfterPage(pageInfos, tempHeight);
            this.onAfterPage(sheetPage, tempHeight);
          } else {
            pageInfos.pageHeight += tempHeight;
          }
        }
        this.handleDataTable({
          ...params,
          temp,
          i,
        });
      }
      //纵向上自动合并信息(在纵向上连续，只需修改起始行号和行号数)
      verticalAutoMergeRanges.forEach(function (item) {
        //当前页的纵向合并
        sheetPage.autoMergeRanges.push({
          ...item,
          range: {
            ...item.range,
            rowCount: sheetPage.rowCount - sheetPageRowCount,
            row: sheetPageRowCount,
          },
        });

        //打印区域页面纵向合并
        sheetPrintPage &&
          sheetPrintPage.autoMergeRanges.push({
            ...item,
            range: {
              ...item.range,
              rowCount: sheetPrintPage.rowCount - sheetPrintPageRowCount,
              row: sheetPrintPageRowCount,
            },
          });
      });
    });
  }
  getFitHeight({ tag, style, pageInfos, colDataTable, colStr }) {
    let _style = {};
    if (typeof style === 'string') {
      const res = this.namedStyles.find(({ name }) => name === style);
      if (res) {
        _style = res;
      }
    } else if (style) {
      _style = style;
    }

    let rowHeight = 0;
    if (tag) {
      const jsonTag = JSON.parse(tag);
      const plugins = jsonTag?.plugins;
      if (Array.isArray(plugins)) {
        let rowHeightType = '';
        plugins.forEach(({ config = {} }) => {
          if (config?.rowHeight) {
            rowHeightType = config?.rowHeight;
          }
        });

        if (rowHeightType === 'autoFitByContent') {
          const height = getFitHeight(
            colDataTable.value,
            pageInfos?.columns?.[colStr]?.size || 64,
            _style?.fontSize || '11pt'
          );
          if (height > rowHeight) {
            rowHeight = height;
          }
        }
      }
    }
    return rowHeight;
  }
  getFitFontSize({ tag, style, pageInfos, colDataTable, colStr, height }) {
    let _style = {};
    if (typeof style === 'string') {
      const res = this.namedStyles.find(({ name }) => name === style);
      if (res) {
        _style = res;
      }
    } else if (style) {
      _style = style;
    }

    let fontSize = null;
    let unit = null;
    if (tag) {
      const jsonTag = JSON.parse(tag);
      const plugins = jsonTag?.plugins;
      if (Array.isArray(plugins)) {
        let rowHeightType = '';
        plugins.forEach(({ config = {} }) => {
          if (config?.rowHeight) {
            rowHeightType = config?.rowHeight;
          }
        });

        if (rowHeightType === 'autoFitByZoom') {
          let fontSizeStr = '9pt';
          if (_style?.fontSize) {
            if (Number.isFinite(Number(_style?.fontSize))) {
              fontSizeStr = _style?.fontSize + 'pt';
            } else {
              fontSizeStr = _style?.fontSize;
            }
          }
          const regex = /(\d+)(\D+)/;
          const match = fontSizeStr.match(regex);
          const number = match[1]; // 提取数字部分
          unit = match[2]; // 提取单位部分

          fontSize = getFitFontSize(
            colDataTable.value,
            pageInfos?.columns?.[colStr]?.size || 64,
            height,
            number,
            unit
          );
        }
      }
    }
    return { fontSize, unit };
  }
  calcTempAfterRenderHeight({
    dataTables,
    unionDatasource,
    pageInfos,
    dataIndex,
  }) {
    let tempRowsHeight = 0;
    dataTables.forEach(({ rows = {}, rowDataTable }) => {
      const dataTable = { ...rowDataTable };
      let rowHeight = 0;
      Object.entries(dataTable).forEach(([colStr, _colDataTable]) => {
        const colDataTable = { ..._colDataTable };
        dataTable[colStr] = colDataTable;
        const { bindingPath, tag, style } = colDataTable;
        if (bindingPath?.includes?.('.')) {
          const bindingPaths = bindingPath.split('.');
          if (bindingPaths.length === 2) {
            bindingPaths.push('');
          }
          const { type, value: newVlaue } = unionDatasource.getValue(
            ...bindingPaths,
            dataIndex
          );
          if (type === 'text') {
            colDataTable.value = newVlaue;
          }
        }

        //
        const height = this.getFitHeight({
          tag,
          style,
          pageInfos,
          colDataTable,
          colStr,
        });
        if (height > rowHeight) {
          rowHeight = height;
        }
      });

      let size = rows.size > rowHeight ? rows.size : rowHeight;
      tempRowsHeight += size;
    });
    return tempRowsHeight;
  }
  genContentPageDataTables(params) {
    const { templates, pageInfos, sheetPage, sheetPrintPage } = params;
    const startIndex = pageInfos.contentDataIndex;
    if (templates.length <= 0) {
      pageInfos.flag = false;
    }
    templates.forEach((temp) => {
      if (!temp) {
        return;
      }
      const { dataTables, unionDatasource, verticalAutoMergeRanges } = temp;
      const dataLen = pageInfos.dataLen || unionDatasource.getCount() || 1;
      pageInfos.dataLen = dataLen;
      pageInfos.dataIndex = startIndex;

      //处理内容前先缓存内容在当前页起始行
      const sheetPageRowCount = sheetPage.rowCount;
      const sheetPrintPageRowCount = sheetPrintPage?.rowCount;

      for (let i = startIndex; i < dataLen; i++) {
        //计算当前渲染后的高度
        const tempRowsHeight = this.calcTempAfterRenderHeight({
          dataTables,
          unionDatasource,
          pageInfos,
          dataIndex: i,
        });

        //当前页剩余高度不足以渲染内容
        if (pageInfos.pageArea) {
          if (
            pageInfos.contentHeight + tempRowsHeight >
            pageInfos.contentTotalHeight
          ) {
            break;
          } else {
            pageInfos.contentHeight += tempRowsHeight;
            pageInfos.pageHeight += tempRowsHeight;
          }
        }
        pageInfos.contentDataIndex += 1;
        this.handleDataTable({
          ...params,
          temp,
          i,
          type: 'content',
          isRetainHorizontalExpansionData: i === startIndex,
        });
      }
      //标识内容处理结束
      if (pageInfos.contentDataIndex >= dataLen) {
        pageInfos.flag = false;
      }

      //纵向上自动合并信息(在纵向上连续，只需修改起始行号和行号数)
      verticalAutoMergeRanges.forEach(function (item) {
        //当前页的纵向合并
        sheetPage.autoMergeRanges.push({
          ...item,
          range: {
            ...item.range,
            rowCount: sheetPage.rowCount - sheetPageRowCount,
            row: sheetPageRowCount, //使用缓存起始行
          },
        });

        //打印区域页面纵向合并
        sheetPrintPage &&
          sheetPrintPage.autoMergeRanges.push({
            ...item,
            range: {
              ...item.range,
              rowCount: sheetPrintPage.rowCount - sheetPrintPageRowCount,
              row: sheetPrintPageRowCount, //使用缓存起始行
            },
          });
      });
    });
  }
  onAfterPage(pageInfos, initHeight = 0) {
    //强制打印时在当前行换页
    const { rowCount } = pageInfos;
    const rows = pageInfos.rows?.[rowCount] || {};
    rows.pageBreak = true;
    pageInfos.rows[rowCount] = rows;
    pageInfos.pageHeight = initHeight;
    pageInfos.pageIndex += 1;
    pageInfos.pageTotal += 1;
  }

  resetSheet({
    sheet,
    dataTable,
    rules,
    spans,
    rows,
    rowCount,
    autoMergeRanges,
    columns = [],
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

    //行高
    if (sheet.columns) {
      sheet.columns.length = 0;
    } else {
      sheet.columns = [];
    }
    sheet.columns.push(...columns);

    //自动合并区域
    sheet.autoMergeRangeInfos = autoMergeRanges;
  }
}
