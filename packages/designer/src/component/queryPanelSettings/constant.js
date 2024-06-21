import {
  CheckBoxItem,
  IntegerItem,
  RadioGroupItem,
  Selectitem,
  TextItem,
} from '@toone/report-ui';

export const optionalControls = [
  { type: 'Text', config: { label: '文本' } },
  {
    type: 'Integer',
    config: { label: '整数' },
  },
  {
    type: 'Boolean',
    config: {
      label: '布尔',
    },
  },
  {
    type: 'Select',
    config: {
      label: '下拉框',
    },
  },
  {
    type: 'RadioGroup',
    config: {
      label: '单选组',
      options: [
        {
          value: '选项1',
          label: '选项1',
        },
        {
          value: '选项2',
          label: '选项2',
        },
      ],
    },
  },
];

//测试滚动条
/* for (let i = 1; i < 30; i++) {
  optionalControls.push({
    type: 'Integer',
    config: { label: `整数${i}` },
  });
} */

export const optionalControlsMap = {
  Text: TextItem,
  Integer: IntegerItem,
  Boolean: CheckBoxItem,
  Select: Selectitem,
  RadioGroup: RadioGroupItem,
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
