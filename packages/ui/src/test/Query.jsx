/**
 * 查询面板测试
 */

import { Query } from '../components/query/Index';

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
      type: 'text',
      config: { label: '项目名称', datasource: 'ds3', code: 'field2' },
    },
    {
      type: 'integer',
      config: { label: '合同金额', datasource: 'ds4', code: 'field2' },
    },
    {
      type: 'float',
      config: { label: '回款金额', datasource: 'ds5', code: 'field1' },
    },
    {
      type: 'select',
      config: {
        label: '所在城市',
        datasource: 'ds6',
        code: 'field1',
        options: [
          { value: 1, label: '广州' },
          { value: 2, label: '深圳' },
          { value: 3, label: '珠海' },
        ],
      },
    },
    {
      type: 'radioGroup',
      config: {
        label: '施工地点',
        datasource: 'ds6',
        code: 'field2',
        options: [
          { value: 1, label: '广州' },
          { value: 2, label: '深圳' },
          { value: 3, label: '珠海' },
        ],
      },
    },
    {
      type: 'checkbox',
      config: { label: '是否已报销', datasource: 'ds6', code: 'field3' },
    },
    {
      type: 'text',
      colSpan: 2,
      config: { label: '备注', datasource: 'ds6', code: 'field4' },
    },
    {
      type: 'date',
      colSpan: 2,
      config: { label: '开始日期', datasource: 'ds6', code: 'field5' },
    },
  ],
};

export default function () {
  return <Query {...json} onQuery={(values) => console.log(values)}></Query>;
}
