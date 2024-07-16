import { setConfig } from '@store/chartSlice';
import { deepMerge } from '@toone/report-util'

export const getSelectedChart = function (sheet) {
  const charts = sheet && sheet.charts;
  if (charts) {
    const chartList = charts.all();
    for (let i = 0; i < chartList.length; i++) {
      const chart = chartList[i];
      if (chart.isSelected()) {
        return chart
      }
    }
  }
  return null;
}

/**
 * 更新图例配置信息
 * @param {*} dispatch 触发更新
 * @param {*} config  更新配置信息 (eg : type 可以为 'legend' 或者 'legend.data'...)
 */
export const updateConfig = (dispatch, { config, type, attr, value }) => {
  try {
    if (!config || !type || !attr || !dispatch) {
      throw new Error('参数类型异常');
    }

    let nestedObject = {};
    const keys = type.split('.');
    let currentLevel = nestedObject;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        currentLevel[key] = { [attr]: value };
      } else {
        currentLevel[key] = currentLevel[key] || {};
        currentLevel = currentLevel[key];
      }
    });

    const newConfig = deepMerge({}, config, nestedObject);
    dispatch(setConfig(newConfig));
  } catch (error) {
    console.error('更新配置异常:', error);
  }
};