import { hasCellTagPluginByIndex } from '@toone/report-util';
import { setErrorDecoration } from '../utils';

const PLUGIN_TYPE = 'error';

const isStaticCell = function (sheet, row, col) {
  const bindingPath = sheet.getBindingPath(row, col);
  return !bindingPath;
};

const paintCell = function (context, style, value) {
  const { sheet, row, col } = context;
  if (
    isStaticCell(sheet, row, col) &&
    hasCellTagPluginByIndex(sheet, row, col, PLUGIN_TYPE)
  ) {
    setErrorDecoration(style);
  }
  return value;
};

export default {
  paintCell,
  PLUGIN_TYPE,
};
