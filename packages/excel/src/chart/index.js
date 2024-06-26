


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
    this.ChartInstance = echarts.init(el);
    this.ChartInstance.setOption(generateEChartsOption(this.config));
    return this.ChartInstance;
  }
}

/**
 * 数据分组
 * @param {*} data 数据集
 * @param {*} keys 分组字段合集
 * @returns 
 */
function groupBy(data, keys) {
  if (keys.length === 0) {
    return data;
  }

  const [firstKey, ...restKeys] = keys;

  const grouped = data.reduce((result, item) => {
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
    || (seriesType == 'fieldValue' && (!valueSeriesConfig || !valueSeriesConfig?.sumType))
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
          Object.values(groupedData).forEach(item => {
            const newKeys = Object.keys(item)
            if (!seriesTypesKeys || seriesTypesKeys.length < newKeys.length)
              seriesTypesKeys = newKeys;
          })
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
      else
        seriesArrayValue.push(...Object.keys(groupItems).map(key => {
          return calcDatasFunc(valueSeriesConfig.sumType, groupItems[key], valueSeriesConfig.value);
        }))
    } else {
      seriesArrayValue.push(...nameSeriesConfigs_conf.map(seriesConfig => {
        return calcDatasFunc(seriesConfig.sumType, groupItems, seriesConfig.fieldCode);
      }))
    }
    seriesDatas[index + 1] = [xAxisData[index], ...seriesArrayValue];
  });


  // 构造 ECharts 配置项
  const option = {
    title: {
      text: title,
      show: titleVisible
    },
    tooltip: {},
    xAxis: orientation == 'portrait' ? { type: 'category', axisTick: { show: false }, data: xAxisData } : {},
    yAxis: orientation != 'portrait' ? { type: 'category', axisTick: { show: false }, data: xAxisData } : {},
    dataset: {
      source: seriesDatas
    },
    series: seriesTypesKeys.map(() => ({
      type,
      stack: style == 'stack' ? 'one' : undefined,
    }))
  };

  return option;
}

export default Chart;


