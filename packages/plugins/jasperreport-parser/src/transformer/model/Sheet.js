import {
  isUndefined,
  uuid,
} from '@toone/report-util';

import { addUniqueItem } from '../../util/ArrayUtil';
import { clone } from '../../util/ObjectUtil';
import {
  getHeight as getPaperHeight,
  getWidth as getPaperWidth,
} from '../metadata/Paper';
import { getSheetJson } from '../metadata/Sheet';
import { ResultType } from '../printer/Constanst';
import Context from '../printer/Context';
import { convertFormatter } from '../util/formatterUtil';
import {
  toHAlign,
  toVAlign,
} from '../util/spreadUtil';
import { parse } from '../util/syntaxUtil';

class Sheet {
  constructor(report) {
    this.report = report;
    this.json = clone(getSheetJson());
  }

  /**
   * 获取缩放比例
   */
  getZoom() {
    const config = this.report.getConfig();
    const orientation = config.orientation;
    const paperWidth = config.paperWidth;
    return orientation == 'landscape'
      ? getPaperHeight() / paperWidth
      : getPaperWidth() / paperWidth;
  }

  toJSON() {
    const config = this.report.getConfig();
    this.setAttr('name', config.name);
    this.parseCells();
    return this.json;
  }

  setCellText(cell, row, col) {
    const { text } = cell.getConfig();
    if (text) {
      const config = this.report.getConfig();
      const name = config.name;
      const ctx = new Context(`${name}_parameter`, `${name}_detail`);
      try {
        const res = parse(text, ctx);
        const type = res.type;
        const text = res.text;
        switch (type) {
          case ResultType.formula:
            return this.setFormula(row, col, text);
          case ResultType.bindingPath:
            return this.setBindingPath(row, col, text);
          default:
            this.setValue(row, col, text);
        }
      } catch (e) {
        this.setValue(row, col, text);
        this.setTag(
          row,
          col,
          JSON.stringify({
            instanceId: uuid(),
            plugins: [{ type: 'error', config: {} }],
          })
        );
      }
    }
  }

  /**
   * 解析单元格
   * 1、生成单元格合并信息
   * 2、设置单元格样式
   * @param {*} cell
   * @param {*} lefts
   * @param {*} tops
   */
  parseCell(cell, lefts, tops) {
    const { left, top, width, height } = cell.getConfig();
    const right = left + width;
    const bottom = top + height;
    const row = tops.indexOf(top);
    const col = lefts.indexOf(left);
    const rowEnd = tops.indexOf(bottom);
    const colEnd = lefts.indexOf(right);
    const rowCount = rowEnd - row;
    const colCount = colEnd - col;
    this.setCellText(cell, row, col);
    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < colCount; j++) {
        this.setCellStyle(row + i, col + j, cell);
      }
    }
    if (rowCount > 1 || colCount > 1) {
      this.addSpan(row, col, rowCount, colCount, this.sheetJson);
    }
  }

  /**
   * 设置单元格样式
   * @param {*} col
   * @param {*} cell
   */
  setCellStyle(row, col, cell) {
    const {
      font,
      fontSize,
      hAlign,
      vAlign,
      bold,
      wordWrap,
      formatter,
      borderTop,
      borderRight,
      borderBottom,
      borderLeft,
    } = cell.getConfig();
    const style = {
      hAlign: toHAlign(hAlign.toLowerCase()),
      vAlign: toVAlign(vAlign.toLowerCase()),
      font: `${fontSize}pt ${font}`,
      fontFamily: font,
      fontSize: fontSize + 'pt',
      fontWeight: bold ? 'bold' : 'normal',
      wordWrap: wordWrap,
    };
    if (formatter) {
      style.formatter = convertFormatter(formatter);
    }
    this.appnedBorderStyle('borderTop', borderTop, style);
    this.appnedBorderStyle('borderRight', borderRight, style);
    this.appnedBorderStyle('borderBottom', borderBottom, style);
    this.appnedBorderStyle('borderLeft', borderLeft, style);
    this.setStyle(row, col, style);
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
   * 解析单元格信息
   * 1、生成行数
   * 2、生成列数
   * 3、生成行高
   * 4、生成列宽
   */
  parseCells() {
    const cells = this.report.getCells();
    const lefts = [0]; //所有左边距
    const tops = [0]; //所有上边距
    cells.forEach((cell) => {
      const { left, top, width, height } = cell.getConfig();
      addUniqueItem(top, tops);
      addUniqueItem(left, lefts);
      addUniqueItem(left + width, lefts);
      addUniqueItem(top + height, tops);
    });
    const sortHandler = function (a, b) {
      return a - b;
    };
    lefts.sort(sortHandler);
    tops.sort(sortHandler);
    this.setAttr('columnCount', lefts.length - 1);
    this.setAttr('rowCount', tops.length - 1);
    this.setAttr('columns', this.toColumnWidths(lefts));
    this.setAttr('rows', this.toRowHeights(tops));
    cells.forEach((cell) => this.parseCell(cell, lefts, tops));
  }

  withZoom(value) {
    if (!this.zoom) {
      this.zoom = this.getZoom();
    }
    return Math.floor(value * this.zoom);
  }

  /**
   * 将左边距值转换成列宽
   * @param {*} lefts
   * @returns
   */
  toColumnWidths(lefts) {
    const columns = [];
    lefts.forEach((left, index) => {
      if (index != lefts.length - 1) {
        columns.push({
          size: this.withZoom(lefts[index + 1] - left),
        });
      }
    });
    return columns;
  }

  /**
   * 将上边距转换成行高
   * @param {*} tops
   * @param {*} sheetJson
   */
  toRowHeights(tops) {
    const rows = [];
    tops.forEach((top, index) => {
      if (index != tops.length - 1) {
        rows.push({
          size: this.withZoom(tops[index + 1] - top),
        });
      }
    });
    return rows;
  }

  /**
   * 设置属性
   * @param {*} attrName
   * @param {*} val
   */
  setAttr(attrName, val) {
    this.json[attrName] = val;
  }

  /**
   * 获取单元格，如果没有则创建
   * @param {*} row
   * @param {*} col
   */
  getCell(row, col) {
    const dataTable = this.json.data.dataTable;
    const colDefs = dataTable[row] || {};
    const colDef = colDefs[col] || {};
    colDefs[col] = colDef;
    dataTable[row] = colDefs;
    return colDef;
  }

  setValue(row, col, value) {
    if (!isUndefined(value)) {
      const cell = this.getCell(row, col);
      cell.value = value;
    }
  }

  setBindingPath = function (row, col, bindingPath) {
    if (bindingPath) {
      const cell = this.getCell(row, col);
      cell.bindingPath = bindingPath;
    }
  };

  setFormula(row, col, formula) {
    if (formula) {
      const cell = this.getCell(row, col);
      cell.formula = formula;
    }
  }

  setTag(row, col, tag) {
    if (tag) {
      const cell = this.getCell(row, col);
      cell.tag = tag;
    }
  }

  addSpan(row, col, rowCount, colCount) {
    const spans = this.json.spans || [];
    this.json.spans = spans;
    spans.push({
      row,
      rowCount,
      col,
      colCount,
    });
  }

  setStyle(row, col, style) {
    const cell = this.getCell(row, col);
    const st = cell.style || {};
    Object.assign(st, style);
    cell.style = st;
  }
}

export default Sheet;
