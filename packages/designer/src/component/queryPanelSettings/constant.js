import {
  CheckBoxItem,
  IntegerItem,
  Selectitem,
  TextItem,
} from '@toone/report-ui';

export const optionalControls = [
  { type: 'Text', config: { labelText: '文本' } },
  {
    type: 'Integer',
    config: { labelText: '整数' },
  },
  {
    type: 'Boolean',
    config: {
      labelText: '布尔',
    },
  },
  {
    type: 'Select',
    config: {
      labelText: '下拉框',
    },
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
  Boolean: CheckBoxItem,
  Select: Selectitem,
};

export const dropdownDatasource = {
  Select: true,
};

export const defaultQueryPanelSettings = {
  visible: true,
  position: 'Top', //位置
  colCount: 3,
  triggerMode: 'Click', //Click||Change
  items: [],
};
