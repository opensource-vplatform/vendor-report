const DefaultSpreadJson = {
  version: '17.0.10',
  name: '',
  docProps: {},
  sheetCount: 1,
  tabStripRatio: 0.6,
  tabStripVisible: false,
  highlightInvalidData: true,
  allowDynamicArray: true,
  iterativeCalculation: false,
  scrollbarShowMax: false,
  showHorizontalScrollbar: false,
  showVerticalScrollbar: false,
  iterativeCalculationMaximumIterations: 100,
  iterativeCalculationMaximumChange: 0.001,
  dynamicReferences: false,
  customList: [],
  defaultSheetTabStyles: {},
  sheets: {},
  sheetTabCount: 0,
  namedStyles: [],
  namedPatterns: {},
  pivotCaches: {},
};

const DefaultSheetJson = {
  name: 'Sheet1',
  isSelected: true,
  visible: 1,
  theme: 'Office',
  colHeaderVisible: false,
  rowHeaderVisible: false,
  data: {
    dataTable: {},
    defaultDataNode: {
      style: {
        themeFont: 'Body',
      },
    },
  },
  gridline: {
    showHorizontalGridline: false,
    showVerticalGridline: false,
  },
  rowHeaderData: {
    defaultDataNode: {
      style: {
        themeFont: 'Body',
      },
    },
  },
  colHeaderData: {
    defaultDataNode: {
      style: {
        themeFont: 'Body',
      },
    },
  },
  defaultData: {},
  leftCellIndex: 0,
  topCellIndex: 0,
  selections: undefined,
  rowOutlines: {
    items: [],
  },
  columnOutlines: {
    items: [],
  },
  cellStates: {},
  states: {},
  outlineColumnOptions: {},
  autoMergeRangeInfos: [],
  shapeCollectionOption: {
    snapMode: 0,
  },
  printInfo: {
    paperSize: {
      height: 1169.2913385826773,
      kind: 9,
      width: 826.7716535433073,
    },
  },
  index: 0,
  order: 0,
};

const getNamespace = function () {
  return window.GC;
};

const HAligns = {
  left: 0,
  center: 1,
  right: 2,
};

const VAlgins = {
  bottom: 2,
  middle: 1,
  top: 0,
};

export const toHAlign = function (hAlign) {
  //return NS.Spread.Sheets.HorizontalAlign[hAlign];
  return HAligns[hAlign];
};

export const toVAlign = function (vAlign) {
  //return NS.Spread.Sheets.VerticalAlign[vAlign];
  return VAlgins[vAlign]
};

const cloneJson = function (json) {
  return JSON.parse(JSON.stringify(json));
};

export const getDefaultSpreadJson = function () {
  return cloneJson(DefaultSpreadJson);
};

export const getDefaultSheetJson = function () {
  return cloneJson(DefaultSheetJson);
};

/**
 * 设置列数
 * @param {*} lefts
 * @param {*} sheetJson
 */
export const setColumnCount = function (columnCount, sheetJson) {
  sheetJson.columnCount = columnCount;
};

/**
 * 设置行数
 * @param {*} tops
 * @param {*} sheetJson
 */
export const setRowCount = function (rowCount, sheetJson) {
  sheetJson.rowCount = rowCount;
};

export const setColumnWidths = function (widths, sheetJson) {
  sheetJson.columns = widths;
};

export const setRowHeights = function (heights, sheetJson) {
  sheetJson.rows = heights;
};

/**
 * 获取单元格，如果没有则创建
 * @param {*} row
 * @param {*} col
 * @param {*} sheetJson
 */
const getCell = function (row, col, sheetJson) {
  const dataTable = sheetJson.data.dataTable;
  const colDefs = dataTable[row] || {};
  const colDef = colDefs[col] || {};
  colDefs[col] = colDef;
  dataTable[row] = colDefs;
  return colDef;
};

export const setValue = function (row, col, value, sheetJson) {
  const cell = getCell(row, col, sheetJson);
  cell.value = value;
};

export const setBindingPath = function(row,col,bindingPath,sheetJson){
  if(bindingPath){
    const cell = getCell(row,col,sheetJson);
    cell.bindingPath = bindingPath;
  }
}

export const setFormula = function(row,col,formula,sheetJson){
  if(formula){
    const cell = getCell(row,col,sheetJson);
    cell.formula = formula;
  }
}

export const setStyle = function (row, col, style, sheetJson) {
  const cell = getCell(row, col, sheetJson);
  const st = cell.style || {};
  Object.assign(st, style);
  cell.style = st;
};

export const addSpan = function (row, col, rowCount, colCount, sheetJson) {
  const spans = sheetJson.spans || [];
  sheetJson.spans = spans;
  spans.push({
    row,
    rowCount,
    col,
    colCount,
  });
};
