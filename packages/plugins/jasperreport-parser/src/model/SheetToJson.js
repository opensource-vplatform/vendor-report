import { addUniqueItem } from '../util/ArrayUtil';

const DefaultSpreadJson = {
  version: '17.0.10',
  name: '',
  docProps: {},
  sheetCount: 1,
  tabStripRatio: 0.6,
  highlightInvalidData: true,
  allowDynamicArray: true,
  iterativeCalculation: false,
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
  data: {
    defaultDataNode: {
      style: {
        themeFont: 'Body',
      },
    },
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

class SheetToJson {
  constructor(sheet) {
    this.sheet = sheet;
  }

  /**
   * 设置列数
   * @param {*} lefts 
   * @param {*} sheetJson 
   */
  setColumnCount(lefts,sheetJson){
    sheetJson.columnCount = lefts.length - 1;
  }

  /**
   * 设置行数
   * @param {*} tops 
   * @param {*} sheetJson 
   */
  setRowCount(tops,sheetJson){
    sheetJson.rowCount = tops.length - 1;
  }

  /**
   * 设置列宽
   */
  setColumnWidths(lefts,sheetJson){
    const columns = [];
    lefts.forEach((left,index)=>{
        if(index!=lefts.length-1){
            columns.push({
                size: lefts[index+1]-left
            });
        }
    });
    sheetJson.columns = columns;
  }

  /**
   * 设置行高
   * @param {*} tops 
   * @param {*} sheetJson 
   */
  setRowHeights(tops,sheetJson){
    const rows = [];
    tops.forEach((top,index)=>{
        if(index!=tops.length-1){
            rows.push({
                size: tops[index+1]-top
            });
        }
    });
    sheetJson.rows = rows;
  }

  parseSheet() {
    const name = this.sheet.getName();
    const sheetJson = DefaultSheetJson;
    sheetJson.name = name;
    const lefts = [0]; //所有左边距
    const tops = [0]; //所有上边距
    const cells = this.sheet.getCells();
    cells.forEach((cell) => {
      let top = cell.getTop();
      let left = cell.getLeft();
      addUniqueItem(top, tops);
      addUniqueItem(left, lefts);
      addUniqueItem(left + cell.getWidth(), lefts);
      addUniqueItem(top + cell.getHeight(), tops);
    });
    this.setColumnCount(lefts,sheetJson);
    this.setColumnWidths(lefts,sheetJson);
    this.setRowCount(tops,sheetJson);
    this.setRowHeights(tops,sheetJson);
    return { [name]: sheetJson };
  }

  /**
   * 根据单元格创建行
   * 实现原理：
   * 遍历所有单元格，搜集单元四个角的左边距和上边距信息，
   * 根据所有左边距和上边距生成一个表格
   * @param {*} tds
   */
  genTRByTDs(tds) {
    const lefts = [0]; //所有左边距
    const tops = [0]; //所有上边距
    tds.forEach((td) => {
      let top = td.getTop();
      if (tops.indexOf(top) == -1) {
        tops.push(top);
      }
      let left = td.getLeft();
      if (lefts.indexOf(left) == -1) {
        lefts.push(left);
      }
      const width = td.getWidth();
      const height = td.getHeight();
      left += width;
      top += height;
      if (lefts.indexOf(left) == -1) {
        lefts.push(left);
      }
      if (tops.indexOf(top) == -1) {
        tops.push(top);
      }
    });
    //排序坐标
    lefts.sort((a, b) => a - b);
    tops.sort((a, b) => a - b);
    const trs = [];
    /*
     *遍历所有坐标，查找单元格，找到单元格，则设置列合并和行合并信息，否则生成新的单元格
     */
    for (let topIndex = 0; topIndex < tops.length - 1; topIndex++) {
      const top = tops[topIndex];
      const tr = new TR();
      tr.setHeight(tops[topIndex + 1] - top);
      for (let leftIndex = 0; leftIndex < lefts.length - 1; leftIndex++) {
        const left = lefts[leftIndex];
        tds.forEach((td, index) => {
          const l = td.getLeft();
          const t = td.getTop();
          if (l === left && t === top) {
          }
        });
      }
    }
    return trs;
  }

  toJSON() {
    let json = DefaultSpreadJson;
    json.sheets = this.parseSheet();
    return json;
  }
}

export default SheetToJson;
