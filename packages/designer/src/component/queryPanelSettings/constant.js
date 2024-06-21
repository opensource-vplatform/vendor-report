import {
  IntegerItem,
  TextItem,
} from '@toone/report-ui';

export const optionalControls = [
  { type: 'Text', config: { labelText: '文本' } },
  {
    type: 'Integer',
    config: { labelText: '整数' },
  },
];

//测试滚动条
/* for (let i = 1; i < 30; i++) {
  optionalControls.push({
    type: 'Integer',
    config: { labelText: `整数${i}` },
  });
} */

export const optionalControlsMap = {
  Text: TextItem,
  Integer: IntegerItem,
};
