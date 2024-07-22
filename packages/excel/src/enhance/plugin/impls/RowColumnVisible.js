import { evaluateFormula } from '@toone/report-util';

import Plugin from '../Plugin';

class RowColumnVisible extends Plugin {
  valueToFormula(val) {
    const { type, value } = val;
    if (type == 'text') {
      return typeof value == 'string' ? `"${value}"` : value;
    } else {
      return value;
    }
  }

  handleVisible(config, tool) {
    const { target, visible } = config;
    const sheetJson = tool.getSheetJson();
    if (target == 'row') {
      const rows = sheetJson.rows || [];
      const rowIndex = tool.getRow();
      const row = rows[rowIndex] | {};
      row.visible = visible;
      rows[rowIndex] = row;
      sheetJson.rows = rows;
    } else {
      const columns = sheetJson.columns || [];
      const colIndex = tool.getCol();
      const column = columns[colIndex] || {};
      column.visible = visible;
      columns[colIndex] = column;
      sheetJson.columns = columns;
    }
  }

  greaterThan(value, config, tool) {
    const formula = `${this.valueToFormula(value)}>${config.value}`;
    if (evaluateFormula(formula)) {
      this.handleVisible(config, tool);
    }
  }

  lessThan(value, config, tool) {
    const formula = `${this.valueToFormula(value)}<${config.value}`;
    if (this.evaluateFormula(formula)) {
    }
  }

  between(value, config, tool) {
    const valExp = this.valueToFormula(value);
    const formula = `${valExp}>=${config.value}&&${valExp}<=${config.value1}`;
    if (this.evaluateFormula(formula)) {
      this.handleVisible(config, tool);
    }
  }

  equalTo(value, config, tool) {
    const formula = `${this.valueToFormula(value)}=${config.value}`;
    if (this.evaluateFormula(formula)) {
      this.handleVisible(config, tool);
    }
  }

  contains(value, config, tool) {
    const formula = `ISNUMBER(SEARCH(${config.value},${this.valueToFormula(
      value
    )}))`;
    if (this.evaluateFormula(formula)) {
      this.handleVisible(config, tool);
    }
  }

  execute(value, tool) {
    const config = this.getConfig();
    const operator = config.operator;
    const handler = this[operator];
    if (handler) {
      handler.call(this, value, config, tool);
    }
    return {
      type: 'text',
      value: value,
    };
  }
}

export default RowColumnVisible;
