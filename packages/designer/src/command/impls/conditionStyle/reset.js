import { clearCellTagPlugin } from '@toone/report-util';
import { genCommandImpl } from '../../util';

export default genCommandImpl(
  'toone.conditionStyle.reset',
  function (sheet, options) {
    const { configs, removed } = options;
    sheet.conditionalFormats.clearRule();
    configs.forEach(({ rule, selections }) => {
      rule.bind(sheet);
      rule.applySelections(selections);
    });
    if (removed && removed.length > 0) {
      removed.forEach((item) => {
        const ruleType = item?.config?.ruleType;
        if (ruleType == 'rowColumnVisibleRule') {
          const ranges = item?.config?.ranges;
          if (ranges && ranges.length > 0) {
            ranges.forEach(({ row, col, rowCount, colCount }) => {
              for (let i = 0; i < rowCount; i++) {
                for (let j = 0; j < colCount; j++) {
                  clearCellTagPlugin(sheet, row + i, col + j, {
                    type: 'rowColumnVisible',
                  });
                }
              }
            });
          }
        }
      });
    }
  }
);
