import {
  CheckBoxItem,
  FloatItem,
  IntegerItem,
  RadioGroupItem,
  Selectitem,
  TextItem,
} from '@toone/report-ui';

export const optionalControls = [
  { type: 'text', config: { label: '文本' } },
  {
    type: 'integer',
    config: { label: '整数' },
  },
  {
    type: 'float',
    config: { label: '小数' },
  },
  {
    type: 'boolean',
    config: {
      label: '布尔',
    },
  },
  {
    type: 'select',
    config: {
      label: '下拉框',
    },
  },
  {
    type: 'radioGroup',
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
  text: TextItem,
  integer: IntegerItem,
  boolean: CheckBoxItem,
  select: Selectitem,
  radioGroup: RadioGroupItem,
  float: FloatItem,
};

export const dropdownDatasource = {
  select: true,
  integer: true,
};

export const defaultQueryPanelSettings = {
  visible: true,
  position: 'Top', //位置
  colCount: 3,
  triggerMode: 'Click', //Click||Change
  items: [],
};
