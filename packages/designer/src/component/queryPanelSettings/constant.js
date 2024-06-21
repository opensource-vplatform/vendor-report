import {
  CheckBoxItem,
  IntegerItem,
  RadioGroupItem,
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
  {
    type: 'RadioGroup',
    config: {
      labelText: '单选组',
      datas: [
        {
          value: '选项1',
          text: '选项1',
        },
        {
          value: '选项2',
          text: '选项2',
        },
      ],
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
