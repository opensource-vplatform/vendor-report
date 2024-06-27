import {
  hasCellTagPluginByIndex,
  isFunction,
  isUndefined,
} from '@toone/report-util';

import CellChart from './CellChart';

const PLUGINS = [CellChart];

export const paint = function (ctx, value, x, y, w, h, style, options) {
  let isBreak = false;
  const {sheet,row,col} = options;
  for (let i = 0; i < PLUGINS.length; i++) {
    const plugin = PLUGINS[i];
    if (isFunction(plugin.paintCell)&&hasCellTagPluginByIndex(sheet,row,col,plugin.PLUGIN_TYPE)) {
      const res = plugin.paintCell(ctx, value, x, y, w, h, style, options);
      if (!isUndefined(res)) {
        isBreak = res.break === true;
        value = res.value;
      }
    }
  }
  return { break: isBreak, value };
};
