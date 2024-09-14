import { isUndefined, uuid } from '@toone/report-util';

import { addUniqueItem } from '../../util/ArrayUtil';
import { clone } from '../../util/ObjectUtil';
import {
  getHeight as getPaperHeight,
  getWidth as getPaperWidth,
} from '../metadata/Paper';
import { getSheetJson } from '../metadata/Sheet';
import { ResultType } from '../printer/Constanst';
import Context from '../printer/Context';
import { convertFormatter, isNumberFormatter } from '../util/formatterUtil';
import { toHAlign, toVAlign } from '../util/spreadUtil';
import { parse } from '../util/syntaxUtil';

class Sheet {
  constructor(report, metadata) {
    this.report = report;
    this.metadata = metadata;
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
    const { text, areaType } = cell.getConfig();
    if (text) {
      const config = this.report.getConfig();
      const name = config.name;
      const ctx = new Context(
        `${name}_parameter`,
        `${name}_detail`,
        this.metadata
      );
      try {
        const res = parse(text, ctx);
        const type = res.type;
        const resText = res.text;
        switch (type) {
          case ResultType.formula:
            return this.setFormula(row, col, resText);
          case ResultType.bindingPath:
            const index = res.index;
            if (!isUndefined(index)) {
              if (['columnHeader'].indexOf(areaType) != -1) {
                this.setCellPlugin(row, col, 'cellText', { listIndex: index });
              } else if (['detail'].indexOf(areaType) != -1) {
                this.setCellPlugin(row, col, 'cellList', { listIndex: index });
              }
            }
            return this.setBindingPath(row, col, resText);
          default:
            this.setValue(row, col, resText);
        }
      } catch (e) {
        this.setValue(row, col, text);
        this.setCellPlugin(row, col, 'error', {});
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

  setAreaInfo(areaType, row) {
    switch (areaType) {
      case 'detail':
        return this.setPageArea(row);
      case 'groupFooter':
        return this.setTotalArea(row);
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
      pattern,
      borderTop,
      borderRight,
      borderBottom,
      borderLeft,
      areaType,
    } = cell.getConfig();
    const style = {
      hAlign: toHAlign(hAlign),
      vAlign: toVAlign(vAlign),
      font: `${fontSize}pt ${font}`,
      fontFamily: font,
      fontSize: fontSize + 'pt',
      fontWeight: bold ? 'bold' : 'normal',
      wordWrap: wordWrap,
    };
    if (pattern) {
      style.formatter = convertFormatter(pattern);
    }
    this.appnedBorderStyle('borderTop', borderTop, style);
    this.appnedBorderStyle('borderRight', borderRight, style);
    this.appnedBorderStyle('borderBottom', borderBottom, style);
    this.appnedBorderStyle('borderLeft', borderLeft, style);
    this.setStyle(row, col, style);
    this.setAreaInfo(areaType, row);
    this.setAutoFit(cell, row, col);
  }

  setAutoFit(cell, row, col) {
    const { pattern, isStretchWithOverflow } = cell.getConfig();
    if (isStretchWithOverflow) {
      let rowHeight;
      if (pattern && isNumberFormatter(pattern)) {
        rowHeight = 'autoFitByZoom';
      } else {
        rowHeight = 'autoFitByContent';
      }
      this.setCellPlugin(row, col, 'cellList', { rowHeight });
    }
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

  setCellPlugin(row, col, cellType, pluginConfig) {
    const cell = this.getCell(row, col);
    const tag = cell.tag;
    let tagObj;
    if (tag) {
      tagObj = JSON.parse(tag);
      const plugins = tagObj.plugins;
      let notAssigned = true;
      const pluginTypes = ['cellList', 'cellText'];
      for (let i = 0; i < plugins.length; i++) {
        const plugin = plugins[i];
        const type = plugin.type;
        const index1 = pluginTypes.indexOf(type);
        const index2 = pluginTypes.indexOf(cellType);
        if (index1 != -1 && index2 != -1) {
          notAssigned = false;
          if (index2 > index1) {
            plugin.type = cellType;
          }
          plugin.config = {
            ...plugin.config,
            ...pluginConfig,
          };
          break;
        }
      }
      if (notAssigned) {
        plugins.push({
          type: cellType,
          config: pluginConfig,
        });
      }
    } else {
      tagObj = {
        instanceId: uuid(),
        plugins: [{ type: cellType, config: pluginConfig }],
      };
    }
    cell.tag = JSON.stringify(tagObj);
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

  getOrCreateSheetTag() {
    let tag = this.json.data.defaultDataNode.tag;
    if (!tag) {
      tag = '{}';
    }
    return JSON.parse(tag);
  }

  setSheetTag(tag) {
    this.json.data.defaultDataNode.tag = JSON.stringify(tag);
  }

  genArea(row, area) {
    if (area) {
      const [minStr, maxStr] = area.split(':');
      let min = parseInt(minStr);
      let max = parseInt(maxStr);
      if (row < min) {
        min = row;
      } else if (row > max) {
        max = row;
      }
      return `${min}:${max}`;
    } else {
      return `${row}:${row}`;
    }
  }

  /**
   * 设置分页区域
   */
  setPageArea(row) {
    row += 1;
    const tag = this.getOrCreateSheetTag();
    tag.isFillData = true;
    tag.pageArea = this.genArea(row, tag.pageArea);
    this.setSheetTag(tag);
  }

  /**
   * 设置总计区域
   * @param {*} area
   */
  setTotalArea(row) {
    row += 1;
    const tag = this.getOrCreateSheetTag();
    tag.totalArea = this.genArea(row, tag.totalArea);
    this.setSheetTag(tag);
  }
}

export default Sheet;