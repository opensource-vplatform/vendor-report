import { addUniqueItem } from '../util/ArrayUtil';
import {
  addSpan,
  getDefaultSheetJson,
  getDefaultSpreadJson,
  setBindingPath,
  setColumnCount,
  setColumnWidths,
  setFormula,
  setRowCount,
  setRowHeights,
  setStyle,
  setValue,
  toHAlign,
  toVAlign,
} from '../util/SpreadUtil';

class SheetToJson {
  constructor(sheet) {
    this.sheet = sheet;
    this.sheetJson = null;
  }

  toColumnWidths(lefts) {
    const columns = [];
    lefts.forEach((left, index) => {
      if (index != lefts.length - 1) {
        columns.push({
          size: lefts[index + 1] - left,
        });
      }
    });
    return columns;
  }

  /**
   * 设置行高
   * @param {*} tops
   * @param {*} sheetJson
   */
  toRowHeights(tops) {
    const rows = [];
    tops.forEach((top, index) => {
      if (index != tops.length - 1) {
        rows.push({
          size: tops[index + 1] - top,
        });
      }
    });
    return rows;
  }

  appnedBorderStyle(type, border, style) {
    if (border) {
      style[type] = {
        style: 1, //border.type == 'Thin' ? 1: 5,
        color: border.color,
      };
    }
  }

  /**
   * 设置单元格样式
   * @param {*} col
   * @param {*} cell
   */
  setCellStyle(row, col, cell) {
    const font = cell.getFont();
    const fontSize = cell.getFontSize();
    const style = {
      hAlign: toHAlign(cell.getHAlign().toLowerCase()),
      vAlign: toVAlign(cell.getVAlign().toLowerCase()),
      font: `${fontSize}pt ${font}`,
      fontFamily: font,
      fontSize: fontSize + 'pt',
      fontWeight: cell.isBold() ? 'bold':'normal',
      wordWrap: cell.isWordWrap(),
    };
    const formatter = cell.getFormatter();
    if(formatter){
      style.formatter = formatter;
    }
    this.appnedBorderStyle('borderTop', cell.getBorderTop(), style);
    this.appnedBorderStyle('borderRight', cell.getBorderRight(), style);
    this.appnedBorderStyle('borderBottom', cell.getBorderBottom(), style);
    this.appnedBorderStyle('borderLeft', cell.getBorderLeft(), style);
    setStyle(row, col, style, this.sheetJson);
  }

  /**
   * 设置单元格
   * @param {*} lefts
   * @param {*} tops
   * @param {*} cells
   */
  setCells(lefts, tops, cells) {
    cells.forEach((cell) => {
      const left = cell.getLeft();
      const top = cell.getTop();
      const right = cell.getRight();
      const bottom = cell.getBottom();
      const row = tops.indexOf(top);
      const col = lefts.indexOf(left);
      const rowEnd = tops.indexOf(bottom);
      const colEnd = lefts.indexOf(right);
      const rowCount = rowEnd - row;
      const colCount = colEnd - col;
      setValue(row, col, cell.getText(), this.sheetJson);
      setBindingPath(row, col, cell.getBindingPath(), this.sheetJson);
      setFormula(row, col, cell.getFormula(), this.sheetJson);
      for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
          this.setCellStyle(row + i, col + j, cell);
        }
      }
      if (rowCount > 1 || colCount > 1) {
        addSpan(row, col, rowCount, colCount, this.sheetJson);
      }
    });
  }

  parseSheet() {
    this.sheetJson = getDefaultSheetJson();
    const name = this.sheet.getName();
    this.sheetJson.name = name;
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
    const sortHandler = function (a, b) {
      return a - b;
    };
    lefts.sort(sortHandler);
    tops.sort(sortHandler);
    setColumnCount(lefts.length - 1, this.sheetJson);
    setRowCount(tops.length - 1, this.sheetJson);
    setColumnWidths(this.toColumnWidths(lefts), this.sheetJson);
    setRowHeights(this.toRowHeights(tops), this.sheetJson);
    this.setCells(lefts, tops, cells);
    return { [name]: this.sheetJson };
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
    const spread = getDefaultSpreadJson();
    spread.sheets = this.parseSheet();
    return spread;
  }
}

export default SheetToJson;
