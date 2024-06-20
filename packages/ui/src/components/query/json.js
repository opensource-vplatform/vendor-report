const json = {
  visible: true,
  position: 'Top', //位置
  colCount: 2,
  triggerMode: 'Click', //Click||Change
  btns: [
    {
      label: '重置',
      desc: '',
    },
    {
      label: '查询',
      desc: '',
    },
  ],
  items: [
    {
      type: 'select',
      config: {
        label: '', //标签
        labelWidth: '', //标签宽度
        datasource: '', //数据集
        fieldCode: '', //保存字段
        fieldName: '', //显示字段
        defaultValue: '', //默认值
        dropDownSource: {
          type: '', //下拉数据源类型。datasource(数据集) || custom(自定义)
          text: 'text', //显示字段
          value: 'value', //保存字段
          datas: [
            {
              text: '张三', //显示字段
              value: 'zs', //保存字段
            },
            {
              text: '李四', //显示字段
              value: 'ls', //保存字段
            },
          ],
        },
      },
    },
  ],
};
