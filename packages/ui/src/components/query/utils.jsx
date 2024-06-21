const maxTitleWidth = 196;

const calTitleWidth = function (title) {
  title = title || '';
  let txtArr = title.split('');
  let width = 0;
  txtArr.forEach((txt) => {
    if (/[0-9]/g.test(txt)) {
      //数字宽度过滤
      width += 8;
    } else {
      width += /[u4E00-u9FA5]/g.test(txt) ? 7 : 14;
    }
  });
  width += 9; //添加paddingRight为6px值
  width = width > maxTitleWidth ? maxTitleWidth : width;
  return width;
};

/**
 * 获取实际列数
 * 1、当子元素的colSpan超过colCount时，使用子元素中最大的colSpan
 * 2、否则计算整行colSpan和。
 * @param {*} items
 * @param {*} colCount
 * @returns
 */
export function getActualColCount(items, colCount) {
  let res = colCount;
  if (items && items.length > 0) {
    let temp = 0;
    let maxTemp = 0;
    for (let i = 0; i < items.length; i++) {
      const { colSpan = 1 } = items[i];
      if (colSpan > colCount && colSpan > maxTemp) {
        maxTemp = colSpan;
      }
      temp += colSpan;
      if (temp > colCount) {
        res = temp;
        temp = 0;
      } else if (temp == colCount) {
        temp = 0;
      }
    }
    return maxTemp != 0 ? maxTemp : temp < res ? res : temp;
  }
  return res;
}

/**
 *
 * @param {*} items
 * @param {*} colCount
 * @returns
 */
export const setItemsTitleWidth = function (items, colCount) {
  if (items && items.length > 0) {
    let tempColSpan = 0;
    let itemArea = [];
    //开始将子元素分类，第一列放入itemArea第一个元素，如此类推
    items.forEach((item) => {
      const { colSpan = 1, config = { label: '' } } = item;
      const area = itemArea[tempColSpan] || [];
      area.push(item);
      itemArea[tempColSpan] = area;
      tempColSpan += colSpan;
      if (tempColSpan >= colCount) {
        tempColSpan = 0;
      }
    });
    itemArea.forEach((area) => {
      let labelWidth = 0;
      area.forEach((item) => {
        const config = item.config || {};
        const label = config.label || '';
        let width = calTitleWidth(label);
        const required = config.required;
        if (required) {
          width += 6; //必填时，添加必填*占用的宽度
        }
        labelWidth = labelWidth > width ? labelWidth : width;
      });
      area.forEach((item) => {
        const config = item.config || {};
        config.labelWidth = labelWidth;
        item.config = config;
      });
    });
  }
};

export const getActionButtonColSpan = function (items, colCount) {
  let temp = 0;
  items.forEach(({ colSpan = 1 }) => {
    temp += colSpan;
    if (temp == colCount) {
      temp = 0;
    } else if (temp > colCount) {
      temp = colSpan;
    }
  });
  return colCount - temp;
};

export const findValue = function (values, value) {
  return values.find(
    (item) => item.datasource == value.datasource && item.code == value.code
  );
};

export const getItemValue = function(values,config){
    const value = findValue(values,config);
    return value ? value.value:null;
}
