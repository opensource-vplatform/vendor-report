import { isNullOrUndef } from '@toone/report-util';
import { getBaseUrl } from '@utils/environmentUtil';
import { getNamespace } from '@utils/spreadUtil';
import { getBindingPathText } from '@utils/tableUtil';

export const getBindText = function (bindingPath, spread) {
  return getBindingPathText(spread, bindingPath);
};

/**
 * 是否绑定实体字段
 * @param {*} sheet
 * @param {*} row
 * @param {*} col
 * @returns
 */
export const hasBindField = function (sheet, row, col) {
  const bindingPath = sheet.getBindingPath(row, col);
  //有绑定信息，且绑定的为实体字段
  return bindingPath && bindingPath.split && bindingPath.split('.').length > 1;
};

export const setIconDecoration = function (style, type, expandDirection) {
  const GC = getNamespace();
  const icons = [];
  /*if(expandDirection=='vertical'){
        icons.push({
            src: getBaseUrl() + `/css/icons/design/arrowRight.svg`,
            width: 10,
            height: 5,
            v_i: false,
            position: GC.Spread.Sheets.IconPosition.left,
        })
    }*/
  icons.push({
    src: getBaseUrl() + `/css/icons/design/${type}.svg`,
    width: 16,
    height: 16,
    v_i: true,
    position: GC.Spread.Sheets.IconPosition.leftOfText,
  });
  style.decoration = {
    icons,
  };
  const hAlign = style.hAlign;
  const HorizontalAlign = GC.Spread.Sheets.HorizontalAlign;
  if (
    hAlign == HorizontalAlign.left ||
    hAlign == HorizontalAlign.general ||
    isNullOrUndef(hAlign)
  ) {
    style.textIndent = style.textIndent || 2;
  }
};

export const setFormulaDecoration = function (style) {
  setIconDecoration(style, 'formula');
};

export const setListDecoration = function (style) {
  setIconDecoration(style, 'list', 'vertical');
};

export const setErrorDecoration = function(style){
  const GC = getNamespace();
  const decoration = style.decoration||{};
  decoration.cornerFold = {
    size: 6,
    position: GC.Spread.Sheets.CornerPosition.rightTop,
    color: "red"
  }
  style.decoration = decoration;
}

export const setGroupDecoration = function (style) {
  setIconDecoration(style, 'group', 'vertical');
};

export const setSumDecoration = function (style) {
  setIconDecoration(style, 'sum');
};

export const setImageDecoration = function (style) {
  setIconDecoration(style, 'image', 'vertical');
};
