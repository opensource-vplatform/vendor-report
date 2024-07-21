import { uuid } from './uuidUtil';

/**
 * 获取命令空间
 */
export const getNamespace = function () {
  return window.GC;
};

/**
 * 批量更新数据到spread
 * @param {*} spread
 * @param {*} updateHandler
 */
export const withBatchUpdate = function (spread, updateHandler) {
  if (spread) {
    spread.suspendPaint();
    const sheet = spread.getActiveSheet();
    if (sheet) {
      try {
        updateHandler(sheet);
      } finally {
        spread.resumePaint();
      }
    }
  }
};

export const getActiveIndexBySpread = function (spread) {
  const sheet = spread.getActiveSheet();
  return getActiveIndexBySheet(sheet);
};

export const getActiveIndexBySheet = function (sheet) {
  const row = sheet.getActiveRowIndex();
  const col = sheet.getActiveColumnIndex();
  return { sheet, row, col };
};

//设置表单的标签值
export function setSheetTag(sheetInstance, key, vlaue) {
  if (!sheetInstance) {
    return;
  }
  const _tag = sheetInstance.tag();
  const _tagJson = _tag ? JSON.parse(_tag) : {};
  //生成表单的实例id
  if (!_tagJson.hasOwnProperty('instanceId')) {
    _tagJson['instanceId'] = uuid();
  }

  if (key) {
    _tagJson[key] = vlaue;
  }

  sheetInstance.tag(JSON.stringify(_tagJson));
  return _tagJson;
}

//获取表单的标签值
export function getSheetTag(sheetInstance, key) {
  if (!sheetInstance) {
    return;
  }
  const _tag = sheetInstance.tag();
  const _tagJson = _tag ? JSON.parse(_tag) : {};
  if (key) {
    return _tagJson[key];
  }
  return;
}

//获取表单的实例id
export function getSheetInstanceId(sheetInstance) {
  if (!sheetInstance) {
    return;
  }

  let instanceId = getSheetTag(sheetInstance, 'instanceId');
  if (instanceId) {
    return instanceId;
  }

  //还没有实例id，则创建实例id并且输出示例id
  return setSheetTag(sheetInstance)['instanceId'];
}

export function getCellTagPlugins(sheet, row, col) {
  return getCellTag(sheet, row, col, 'plugins');
}

export function hasCellTagPluginByIndex(sheet, row, col, pluginType) {
  const plugins = getCellTagPlugins(sheet, row, col);
  if (plugins) {
    const pl = plugins.find((pl) => pl.type == pluginType);
    return !!pl;
  }
  return false;
}

export function hasCellTagPlugin(sheet, pluginType) {
  const { row, col } = getActiveIndexBySheet(sheet);
  return hasCellTagPluginByIndex(sheet, row, col, pluginType);
}

/**
 * 清除单元格插件
 * @param {*} sheet
 * @param {*} row
 * @param {*} col
 * @param {*} plugin
 * {
 *  type:string,//插件类型
 *  ...
 * }
 */
export function clearCellTagPlugin(sheet, row, col, plugin) {
  const plugins = getCellTagPlugins(sheet, row, col);
  if (plugins) {
    const pl = plugins.find((pl) => pl.type == plugin.type);
    if (pl) {
      const index = plugins.indexOf(pl);
      plugins.splice(index, 1);
      setCellTag(sheet, row, col, 'plugins', plugins);
    }
  }
}

export function clearAllCellTagPlugin(sheet, row, col) {
  withBatchUpdate(sheet.getParent(), () => {
    const plugins = getCellTagPlugins(sheet, row, col);
    if (plugins) {
      plugins.forEach((plugin) => clearCellTagPlugin(sheet, row, col, plugin));
    }
    const GC = getNamespace();
    sheet.clear(
      row,
      col,
      1,
      1,
      GC.Spread.Sheets.SheetArea.viewport,
      GC.Spread.Sheets.StorageType.data
    );
  });
}

/**
 * 设置单元格插件,如果已存在该类型插件，则更新，否则新增
 * @param {*} sheet
 * @param {*} row
 * @param {*} col
 * @param {*} plugin
 * {
 *  type:string,//插件类型
 *  config:{
 *     //插件配置信息
 *  }
 * }
 */
export function setCellTagPlugin(sheet, row, col, plugin) {
  const plugins = getCellTagPlugins(sheet, row, col) || [];
  const pl = plugins.find((pl) => plugin.type == pl.type);
  if (pl) {
    Object.assign(pl, plugin);
  } else {
    plugins.push(plugin);
  }
  setCellTag(sheet, row, col, 'plugins', plugins);
}

/**
 * 获取单元格插件
 * @param {*} sheet
 * @param {*} row
 * @param {*} col
 * @param {*} pluginType
 * @returns
 */
export function getCellTagPlugin(sheet, row, col, pluginType) {
  const plugins = getCellTagPlugins(sheet, row, col);
  return plugins ? plugins.find((pl) => pl.type == pluginType) : null;
}

//设置表单单元格的标签值
export function setCellTag(sheetInstance, row, col, key, value) {
  if (!sheetInstance) {
    return;
  }

  const _tag = sheetInstance.getTag(row, col);
  const _tagJson = _tag ? JSON.parse(_tag) : {};
  //生成表单的实例id
  if (!_tagJson.hasOwnProperty('instanceId')) {
    _tagJson['instanceId'] = uuid();
  }

  if (key) {
    _tagJson[key] = value;
  }

  sheetInstance.setTag(row, col, JSON.stringify(_tagJson));
  return _tagJson;
}

//获取表单单元格的标签值
export function getCellTag(sheetInstance, row, col, key) {
  if (!sheetInstance) {
    return;
  }
  const _tag = sheetInstance.getTag(row, col);
  const _tagJson = _tag ? JSON.parse(_tag) : {};
  if (key === 'instanceId') {
    return setCellTag(sheetInstance, row, col)['instanceId'];
  }
  if (key) {
    return _tagJson[key];
  }
  return;
}

//获取表单单元格的实例id
export function getCellInstanceId(sheetInstance, row, col) {
  if (!sheetInstance) {
    return;
  }

  let instanceId = getCellTag(sheetInstance, row, col, 'instanceId');
  if (instanceId) {
    return instanceId;
  }

  //还没有实例id，则创建实例id并且输出示例id
  return setCellTag(sheetInstance, row, col)['instanceId'];
}
