


import resourceManager from 'resource-manager-js';
import { getBaseUrl } from '../utils/environmentUtil';
import { sum as sumCalc, div as divideCalc } from '../utils/mathUtil'

/**
 * 计算函数
 * 
 * @param {Object[]} data - 数据源
 * @param {string} key - 计算列
 * @returns {number} - 返回计算结果
 */
const calcDatas = {
  sum: (data, key) => {
    return data.reduce((sum, item) => sumCalc([sum, item[key]]), 0);
  },
  count: (data) => {
    return data.length;
  },
  average: (data, key) => {
    const total = data.reduce((sum, item) => sumCalc([sum, item[key]]), 0);
    return parseFloat(divideCalc(total, data.length).toFixed(2));
  },
  max: (data, key) => {
    return Math.max.apply(null, data.map(item => item[key]));
  },
  min: (data, key) => {
    return Math.min.apply(null, data.map(item => item[key]));
  }
}

/**
 * 计算函数
 * 
 * @param {string[]} type - 计算方式 (sum,count,average,max,min)
 * @param {Object[]} data - 数据源
 * @param {string} key - 计算列
 * @returns {number} - 返回计算结果
 */
const calcDatasFunc = (type, data, key) => {
  return calcDatas[type](data, key)
}

/**
 * 图例实例
 */
class Chart {


  constructor(config = {}) {
    this.config = config;
  }

  updateConfig(config) {
    this.config = Object.assign(this.config, config);
    this.ChartInstance && this.ChartInstance.setOption(generateEChartsOption(config), true);
  }
  async mount(el) {
    await resourceManager.loadScript(`${getBaseUrl()}/vendor/echart/echarts.min.js`);
    this.chartDom = el;
    this.ChartInstance = echarts.init(el);
    this.ChartInstance.setOption(generateEChartsOption(this.config));
    return this.ChartInstance;
  }
}
/**
 * 行与列转换
 * @param {*} data 数据源
 * @returns 
 */
const transformData = (data) => {
  var result = [];

  // 初始化结果数组的第一行
  result.push(data.map(row => row[0]));

  // 遍历数据的列
  for (var i = 1; i < data[0].length; i++) {
    var newRow = [data[0][i]];
    for (var j = 1; j < data.length; j++) {
      newRow.push(data[j][i]);
    }
    result.push(newRow);
  }

  return result;
}


/**
 * 数据分组
 * @param {*} data 数据集
 * @param {*} keys 分组字段合集
 * @returns 
 */
const groupBy = (data, keys) => {
  if (keys.length === 0) {
    return data;
  }

  const [firstKey, ...restKeys] = keys;

  let grouped;
  if (!firstKey)
    grouped = {
      '': data
    }
  else
    grouped = data.reduce((result, item) => {
      const key = item[firstKey];
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
      return result;
    }, {});

  if (restKeys.length > 0) {
    for (let key in grouped) {
      grouped[key] = groupBy(grouped[key], restKeys);
    }
  }

  return grouped;
}


/**
 * 生成 echarts 配置
 * @param {*} config 配置
 * @returns 返回ECharts 配置
 * example:
 const config = {
  type: "bar",
  config: {
    titleVisible: true,
    title: '部门性别统计柱状图',
    datasource: dataSource,
    group: ['depart'], // 按部门分组
    seriesType: 'fieldValue', // 'fieldValue' 或 'fieldName'
    valueSeriesConfig: { 
      seriesName: 'sex',
      value: 'value',
      sumType: 'sum' // 'sum', 'count', 'average','max','min'，这里选择求和
    },
    nameSeriesConfigs: [
    {
    seriesName: '性别',
    fieldCode: 'sex',
    sumType: 'count', // 'sum', 'count', 'average'，这里选择求和
    },
    {
    seriesName: '计算值',
    fieldCode: 'value',
    sumType: 'sum', // 'sum', 'count', 'average'，这里选择求和
    },
   ],
  }
};
 */
const generateEChartsOption = (config) => {
  const { type, config: conf = {} } = config;
  const {
    dimension = '2d',
    style = '',
    orientation = "portrait",
    titleVisible = true,
    title = '',
    datasource = [],
    groups = [],
    seriesType = 'fieldValue',
    nameSeriesConfigs = [],
    valueSeriesConfig
  } = conf;
  const nameSeriesConfigs_conf = nameSeriesConfigs.filter(conf => !!conf.fieldCode);
  if (!datasource.length || !groups.length
    || (seriesType == 'fieldValue' && (!valueSeriesConfig || !valueSeriesConfig?.sumType || !valueSeriesConfig?.value))
    || (seriesType == 'fieldName' && !nameSeriesConfigs_conf.length))
    return {
      title: {
        text: title,
        show: titleVisible
      }
    };

  // 按照 group 字段分组数据 作为 x轴
  const groupedData = groupBy(datasource, groups.concat(seriesType === 'fieldValue' ? valueSeriesConfig.seriesName ?? [] : []));

  const xAxisData = Object.keys(groupedData);

  let seriesDatas = [[groups[0]]];
  let seriesTypesKeys = [];

  xAxisData.forEach((groupKey, index) => {
    const groupItems = groupedData[groupKey];

    if (seriesType === 'fieldValue' && !valueSeriesConfig.seriesName && index === 0) {
      seriesDatas[0].push('');
      seriesTypesKeys.push('');
    } else {

      if (!!valueSeriesConfig?.seriesName || seriesType !== 'fieldValue')
        if (seriesType === 'fieldValue') {
          Object.keys(groupItems).forEach(item => {
            if (seriesTypesKeys.indexOf(item) === -1)
              seriesTypesKeys.push(item);
          });
          // Object.values(groupedData).forEach(item => {
          //   const newKeys = Object.keys(item)
          //   if (!seriesTypesKeys || seriesTypesKeys.length < newKeys.length)
          //     seriesTypesKeys = newKeys;
          // })
          if (xAxisData.length - 1 === index)
            seriesDatas[0].push(...seriesTypesKeys);
        } else {
          if (xAxisData.length - 1 === index) {
            seriesDatas[0].push(...nameSeriesConfigs_conf.map(item => item.seriesName));
            seriesTypesKeys = nameSeriesConfigs_conf.map(item => item.seriesName);
          }
        }
    }

    const seriesArrayValue = [];

    if (seriesType === 'fieldValue') {
      if (!valueSeriesConfig.seriesName)
        seriesArrayValue.push(calcDatasFunc(valueSeriesConfig.sumType, groupItems, valueSeriesConfig.value));
      else {
        let seriesArrayObj = {}
        Object.keys(groupItems).forEach(key => {
          seriesArrayObj[key] = calcDatasFunc(valueSeriesConfig.sumType, groupItems[key], valueSeriesConfig.value);
        })
        seriesTypesKeys.forEach(key => {
          seriesArrayValue.push(seriesArrayObj[key] || 0);
        })

      }
    } else {
      seriesArrayValue.push(...nameSeriesConfigs_conf.map(seriesConfig => {
        return calcDatasFunc(seriesConfig.sumType, groupItems, seriesConfig.fieldCode);
      }))
    }
    seriesDatas[index + 1] = [xAxisData[index], ...seriesArrayValue];
  });
  let option;
  if (type === 'bar')
    // 构造 ECharts 配置项
    option = {
      legend: {
        bottom: 0  // 将图例放在底部
      },
      title: {
        text: title,
        show: titleVisible
      },
      tooltip: {},
      xAxis: type == 'pie' ? {} : orientation == 'portrait' ? { type: 'category', axisTick: { show: false }, data: xAxisData } : {},
      yAxis: type == 'pie' ? {} : orientation != 'portrait' ? { type: 'category', axisTick: { show: false }, data: xAxisData } : {},
      dataset: {
        source: seriesDatas
      },
      series: seriesTypesKeys.map(() => ({
        type,
        // radius: '50%',
        stack: style == 'stack' ? 'one' : undefined,
      }))
    };
  else if (type === 'pie') {
    if (!groups[0]){
      seriesDatas[0][0] = 'product';
      seriesDatas[1][0] = 'xxx';
    }
    // 行列转换
    seriesDatas = transformData(seriesDatas)
    var series = [];
    const size = + parseFloat(divideCalc(100, seriesDatas[0].length - 1).toFixed(2));
    const subTitle = []

    for (var i = 1; i < seriesDatas[0].length; i++) {
      series.push({
        type: 'pie',
        radius: seriesDatas[0].length > 2 ? size : 50 + '%',
        center: [size * (i - 1) + size / 2 + '%', '50%'],
        label: {
          formatter: '{b}: {@' + seriesDatas[0][i] + '} ({d}%)',
          // show: seriesDatas[0].length - 1 > 1 ? false : true,
          show: true,
        },
        encode: {
          itemName: seriesDatas[0][0],
          value: seriesDatas[0][i]
        },
        name: seriesDatas[0][i]
      });
      subTitle.push({
        subtext: seriesDatas[0][i],
        left: size * (i - 1) + size / 2 + '%',
        top: '75%',
        textAlign: 'center'
      })
    }

    option = {
      legend: {
        orient: 'horizontal', // 水平排列
        width: '100%', // 设置图例宽度为容器宽度
        left: 'center', // 图例居中
        bottom: 0, // 将图例放在底部
        // textStyle: {
        //   width: 'auto',
        //   overflow: 'truncate'
        // }

      },
      title: [{
        text: title,
        show: titleVisible
      }, ...subTitle],
      tooltip: {},
      dataset: {
        source: seriesDatas
      },
      series
    };
  }
  return option;
}

export default Chart;


