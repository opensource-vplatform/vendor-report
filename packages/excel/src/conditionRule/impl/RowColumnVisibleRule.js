import { setCellTagPlugin } from '@toone/report-util';

import Rule from './Rule';

class RowColumnVisibleRule extends Rule {
  constructor(operator, target, visible, value, value1) {
    super();
    this.operator = operator;
    this.target = target;
    this.visible = visible;
    this.value = value;
    this.value1 = value1;
  }

  applySelections(selections) {
    if (selections && selections.length > 0) {
      selections.forEach(({ row, col, rowCount, colCount }) => {
        for (let i = 0; i < rowCount; i++) {
          for (let j = 0; j < colCount; j++) {
            setCellTagPlugin(this.sheet, row + i, col + j, {
              type: 'rowColumnVisible',
              config: {
                operator: this.operator,
                target: this.target,
                visible: this.visible,
                value: this.value,
                value1: this.value1,
              },
            });
          }
        }
      });
    }
  }
}

RowColumnVisibleRule.fromJson = function (json) {
  const { operator, target, visible, value, value1 } = json;
  return new RowColumnVisibleRule(operator, target, visible, value, value1);
};

export default RowColumnVisibleRule;
