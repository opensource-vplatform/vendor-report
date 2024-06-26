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
        icon: 'bar-v-2d',
        title: '竖向柱状图2D',
        config: {
          type: 'bar',
          orientation: 'portrait',
          dimension: '2d',
          style: '',
        },
      },
      {
        value: 'bar-h-2d',
        icon: 'bar-h-2d',
        title: '横向柱状图2D',
        config: {
          type: 'bar',
          orientation: 'landscape',
          style: '',
        }
      },
      /*{
          value: 'bar-v-3d',
          icon: 'bar-v-3d',
          title: '竖向柱状图3D',
          config:{
            type: 'bar',
            orientation: 'portrait',
            dimension: '3d',
          }
      },{
          value: 'bar-h-3d',
          icon: 'bar-h-3d',
          title: '横向柱状图3D'
          config:{
            type: 'bar',
            orientation: 'landscape',
            dimension: '3d',
          },
      },*/ {
        value: 'bar-v-stack-2d',
        icon: 'bar-v-stack-2d',
        title: '竖向堆叠柱状图2D',
        config: {
          type: 'bar',
          orientation: 'portrait',
          style: 'stack',
        }
      },
      {
        value: 'bar-h-stack-2d',
        icon: 'bar-h-stack-2d',
        title: '横向堆叠柱状图2D',
        config: {
          type: 'bar',
          orientation: 'landscape',
          style: 'stack',
        }
      } /*{
          value: 'bar-v-stack-3d',
          icon: 'bar-v-stack-3d',
          title: '竖向堆叠柱状图3D',
          config:{
            type: 'bar',
            orientation: 'portrait',
            style: 'stack',
            dimension: '3d',
          }
      },{
          value: 'bar-h-stack-3d',
          icon: 'bar-h-stack-3d',
          title: '横向堆叠柱状图3D',
          config:{
            type: 'bar',
            orientation: 'landscape',
            style: 'stack',
            dimension: '3d',
          }
      },*/,
    ],
  },
  {
    title: '饼图',
    value: 'pie',
    charts: [
      {
        value: 'pie-2d',
        title: '饼图2D',
        icon: 'pie-2d',
        config: {
          type: 'pie',
          dimension: '2d',
        }
      },
      {
        value: 'pie-3d',
        title: '饼图3D',
        icon: 'pie-3d',
        config: {
          type: 'pie',
          dimension: '3d',
        }
      },
      {
        value: 'pie-cycle-2d',
        icon: 'pie-cycle-2d',
        title: '环形图2D',
        config: {
          type: 'pie',
          dimension: '2d',
          style: 'cycle',
        },
      },
      {
        value: 'pie-cycle-3d',
        icon: 'pie-cycle-3d',
        title: '环形图3D',
        config: {
          type: 'pie',
          style: 'cycle',
          dimension: '3d',
        }
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
        config: {
          type: 'line',
        }
      },
    ],
  },
];

export const SUM_TYPES = [{
  value: 'sum',
  text: '求和',
}, {
  value: 'average',
  text: '平均值',
}, {
  value: 'count',
  text: '计数',
}, {
  value: 'min',
  text: '最小值',
}, {
  value: 'max',
  text: '最大值',
},];
