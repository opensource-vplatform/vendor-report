
import { uuid as genUUID } from '@toone/report-util'
import { getNamespace } from '@utils/spreadUtil'
import Chart from '../../chart';
import { getCellTagPlugin } from '@toone/report-util'

const GC = getNamespace();

const PLUGIN_TYPE = 'cellChart';

const ChartInstanceMap = new Map();

const paintCell = function (context, value, x, y, w, h, style, options) {
  const { sheet, row, col } = options;
  // 清空单元格内容
  // context.clearRect(x, y, w, h);

  const chartConfig = getCellTagPlugin(sheet, row, col, PLUGIN_TYPE);
  // console.log('=====================', chartConfig)
  // 初始化浮动对象
  const uuId = `echart-${row}-${col}`;
  let span = sheet.getSpan(row, col)
  if (!span) {
    span = {
      row: row,
      col: col,
      rowCount: row + 1,
      colCount: col + 1
    }
  } else {
    span = {
      row: row,
      col: col,
      rowCount: span.row + span.rowCount,
      colCount: span.col + span.colCount
    }
  }
  if (!!sheet.floatingObjects.get(uuId)) {
    // onsole.log('++++++++++++++++', sheet.getDataSource()?.getValue("Ipes_MP_Certificate_DetailCalc"))
    // console.log(ChartInstanceMap)

    ChartInstanceMap.get(uuId) && ChartInstanceMap.get(uuId).updateConfig({
      type: chartConfig.config.type,
      config: {
        ...chartConfig.config.config,
        datasource: sheet.getDataSource()?.getValue(chartConfig.config.config.datasource) || []
      }
    })
    !!ChartInstanceMap.get(uuId) && ChartInstanceMap.get(uuId).ChartInstance?.resize()
    return
  }
  var customFloatingObject = new GC.Spread.Sheets.FloatingObjects.FloatingObject(uuId);

  customFloatingObject.startRow(span.row);
  customFloatingObject.startColumn(span.col);
  customFloatingObject.endRow(span.rowCount);
  customFloatingObject.endColumn(span.colCount);
  customFloatingObject.allowResize(false);
  customFloatingObject.allowMove(false);
  // if (!sheet.getBindingPath(row, col) && !!chartConfig?.config?.config?.datasource)
  //   sheet.setBindingPath(row, col, chartConfig?.config?.config?.datasource);

  // 创建ECharts容器
  var div = document.createElement('div');
  div.innerHTML = `<div class="${uuId}" style="width:100%;height:100%; "></div>`;

  setTimeout(async () => {
    const chart = new Chart({
      type: chartConfig.config.type,
      config: {
        ...chartConfig.config.config,
        datasource: sheet.getDataSource()?.getValue(chartConfig.config.config.datasource) || []
      }

    });
    for (let dom of document.querySelectorAll('.' + uuId)) {
      await chart.mount(dom);
    }
    ChartInstanceMap.set(uuId, chart)
  }, 0)


  // 将ECharts添加到浮动层中
  customFloatingObject.content(div);
  sheet.floatingObjects.add(customFloatingObject);
  return { break: true }
};

export default { paintCell, PLUGIN_TYPE };
