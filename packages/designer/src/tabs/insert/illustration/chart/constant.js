export const stepsDatas = [
  {
    text: '选择图表类型',
  },
  {
    text: '配置图表属性',
  },
  {
    text: '创建',
  },
];

export const CATALOGS = [
  {
    value: null,
    text: '全部图表',
  },
  {
    value: 'bar',
    text: '柱状图',
  },
  {
    value: 'pie',
    text: '饼图',
  },
  {
    value: 'line',
    text: '折线图',
  },
];

export const CLASSIFY_CHARTS = [
  {
    title: '柱状图',
    value: 'bar',
    charts: [
      {
        value: 'bar-v-2d',
        type: 'bar',
        orientation: 'portrait',
        icon: 'bar-v-2d',
        title: '竖向柱状图2D',
      },
      {
        value: 'bar-h-2d',
        type: 'bar',
        orientation: 'landscape',
        icon: 'bar-h-2d',
        title: '横向柱状图2D',
      },
      /*{
          value: 'bar-v-3d',
          icon: 'bar-v-3d',
          dimension: '3d',
          title: '竖向柱状图3D'
      },{
          value: 'bar-h-3d',
          icon: 'bar-h-3d',
          dimension: '3d',
          title: '横向柱状图3D'
      },*/ {
        value: 'bar-v-stack-2d',
        icon: 'bar-v-stack-2d',
        orientation: 'portrait',
        style: 'stack',
        title: '竖向堆叠柱状图2D',
      },
      {
        value: 'bar-h-stack-2d',
        icon: 'bar-h-stack-2d',
        orientation: 'landscape',
        style: 'stack',
        title: '横向堆叠柱状图2D',
      } /*{
          value: 'bar-v-stack-3d',
          icon: 'bar-v-stack-3d',
          style: 'stack',
          dimension: '3d',
          title: '竖向堆叠柱状图3D'
      },{
          value: 'bar-h-stack-3d',
          icon: 'bar-h-stack-3d',
          style: 'stack',
          dimension: '3d',
          title: '横向堆叠柱状图3D'
      },*/,
    ],
  },
  {
    title: '饼图',
    value: 'pie',
    charts: [
      {
        value: 'pie-2d',
        type: 'pie',
        icon: 'pie-2d',
        title: '饼图2D',
      },
      {
        value: 'pie-3d',
        icon: 'pie-3d',
        dimension: '3d',
        title: '饼图3D',
      },
      {
        value: 'pie-cycle-2d',
        icon: 'pie-cycle-2d',
        type: 'pie',
        style: 'cycle',
        title: '环形图2D',
      },
      {
        value: 'pie-cycle-3d',
        icon: 'pie-cycle-3d',
        style: 'cycle',
        dimension: '3d',
        title: '环形图3D',
      },
    ],
  },
  {
    title: '折线图',
    value: 'line',
    charts: [
      {
        value: 'line',
        icon: 'line',
        title: '折线图',
      },
    ],
  },
];
