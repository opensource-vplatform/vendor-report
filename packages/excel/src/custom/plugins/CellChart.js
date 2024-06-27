
import { uuid as genUUID } from '@toone/report-util'
import { getNamespace } from '@utils/spreadUtil'
import Chart from '../../chart';
import { getCellTagPlugin } from '@toone/report-util'

const GC = getNamespace();

const PLUGIN_TYPE = 'cellChart';

const paintCell = function (context, value, x, y, w, h, style, options) {
  const { sheet, row, col } = options;

  const chartConfig = getCellTagPlugin(sheet, row, col, PLUGIN_TYPE);
  console.log('=====================', chartConfig)
  // 初始化浮动对象
  const uuId = `echart-${row}${col}`;
  if (!!sheet.floatingObjects.get(uuId)) {
    // document.getElementById(uuId).style.width = w;
    // if (!echarts) return
    // var myChart = echarts.getInstanceByDom(document.querySelectorAll('.'+uuId)[1]);
    // myChart.resize()
    return
  }
  var customFloatingObject = new GC.Spread.Sheets.FloatingObjects.FloatingObject(uuId);
  // GC.Spread.Sheets.Range(row, col, 1, 1)
  customFloatingObject.startRow(row);
  customFloatingObject.startColumn(col);
  customFloatingObject.endColumn(row + 1);
  customFloatingObject.endRow(col + 1);

  const dataSource = [
    { name: 'A', depart: 'a', sex: '男', value: 10 },
    { name: 'B', depart: 'a', sex: '女', value: 20 },
    { name: 'C', depart: 'b', sex: '女', value: 30 },
    { name: 'D', depart: 'b', sex: '男', value: 80 },
    { name: 'E', depart: 'c', sex: '女', value: 12 },
    { name: 'F', depart: 'c', sex: '男', value: 5 },
    { name: 'G', depart: 'c', sex: '男', value: 8 }
  ];
  // 创建ECharts容器
  var div = document.createElement('div');
  div.innerHTML = `<div class="${uuId}" style="width:100%;height:100%; ">123456</div>`;
  // console.log('=====================', sheet.getDataSource().getValue("Ipes_MP_Certificate_DetailCalc"))
  setTimeout(() => {
    // const chart = new Chart({
    //   ...chartConfig.config,
    //   // datasource: sheet.getDataSource().getValue(chartConfig.config.datasource) || []
    // });
    const chart = new Chart({
      type: 'bar',
      config: {
        titleVisible: true,
        title: '地区类别销售量统计柱状图',
        datasource: dataSource,
        groups: ['depart'],
        seriesType: 'fieldValue',
        valueSeriesConfig: {
          seriesName: 'sex',
          value: 'value',
          sumType: 'count',
        },
      },
    })
    document.querySelectorAll('.' + uuId)[2] && chart.mount(document.querySelectorAll('.' + uuId)[2]);
  }, 0)
  // 将ECharts添加到浮动层中
  customFloatingObject.content(div);
  sheet.floatingObjects.add(customFloatingObject);
  return { break: true }
};

export default { paintCell, PLUGIN_TYPE };
