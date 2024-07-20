import { Commands } from '@commands/index';
import { getFontSizeValues } from '@metadatas/font';
import { getDefault } from '@metadatas/style';
import { isFunction, isString, isUndefined } from '@toone/report-util';

import { cellSettingToStyle, show } from './cellSettingUtil';
import { fireCellEnter } from './eventUtil';
import {
  applyStyleToSelectedCell,
  exeCommand,
  getNamespace,
} from './spreadUtil';
import { getActiveIndexBySheet } from './worksheetUtil';

const tempSpan = document.createElement('span');

const dealFontFamily = function (fontFamily) {
  return fontFamily &&
    fontFamily.indexOf("'") === -1 &&
    fontFamily.indexOf('"') === -1
    ? `"${fontFamily}"`
    : fontFamily;
};

function px2pt(pxValue) {
  tempSpan.style.fontSize = '96pt';
  const tempPx = tempSpan.style.fontSize;
  if (tempPx.indexOf('px') !== -1) {
    const tempPxValue = parseFloat(tempPx);
    return Math.round((pxValue * 96) / tempPxValue);
  } else {
    return Math.round((pxValue * 72) / 96);
  }
}

const toFontStr = function (params) {
  let {
    fontFamily = '',
    fontStyle = '',
    fontVariant = '',
    fontWeight = '',
    fontSize = '',
    lineHeight = '',
  } = params;
  fontFamily = dealFontFamily(fontFamily);
  fontSize = isString(fontSize) ? fontSize : `${fontSize}pt`;
  const fontStr = [
    fontStyle,
    fontVariant,
    fontWeight,
    fontSize,
    lineHeight,
    fontFamily,
  ].join(' ');
  const fontElement = document.createElement('span');
  fontElement.style.font = fontStr;
  return fontElement.style.font;
};

const parseFontStr = function (font) {
  let fontStyle = Style_Default.fontStyle,
    fontVariant = Style_Default.fontVariant,
    fontWeight = Style_Default.fontWeight,
    fontFamily = Style_Default.fontFamily,
    fontSize,
    lineHeight = Style_Default.lineHeight;
  if (font) {
    const elements = font.split(/\s+/);
    let element;
    while ((element = elements.shift())) {
      switch (element) {
        case 'normal':
          break;
        case 'italic':
        case 'oblique':
          fontStyle = element;
          break;
        case 'small-caps':
          fontVariant = element;
          break;
        case 'bold':
        case 'bolder':
        case 'lighter':
        case '100':
        case '200':
        case '300':
        case '400':
        case '500':
        case '600':
        case '700':
        case '800':
        case '900':
          fontWeight = element;
          break;
        default:
          if (!fontSize) {
            const parts = element.split('/');
            fontSize = parts[0];
            if (fontSize.indexOf('px') !== -1) {
              fontSize = px2pt(parseFloat(fontSize));
            } else if (fontSize.indexOf('pt') !== -1) {
              fontSize = parseInt(fontSize);
            }
            if (parts.length > 1) {
              lineHeight = parts[1];
              if (lineHeight.indexOf('px') !== -1) {
                lineHeight = px2pt(parseFloat(lineHeight));
              }
            }
            break;
          }

          fontFamily = element;
          if (elements.length) {
            fontFamily += ' ' + elements.join(' ');
          }
      }
    }
  }
  if (!fontSize) {
    fontSize = Style_Default.fontSize;
  }
  return {
    fontStyle,
    fontVariant,
    fontWeight,
    fontSize,
    lineHeight,
    fontFamily,
  };
};

const fillValue = function (style, attr, value) {
  //if (!isNullOrUndef(value)) {
  style[attr] = value;
  //}
};

const Style_Default = getDefault();

const getValue = function (style, attr) {
  let val = style[attr];
  return isUndefined(val) ? Style_Default[attr] : val;
};

const handleFont = function (style, newValues) {
  const oldFont = parseFontStr(style.font);
  const {
    fontFamily = oldFont.fontFamily,
    fontStyle = oldFont.fontStyle,
    fontWeight = oldFont.fontWeight,
    fontSize = oldFont.fontSize,
  } = newValues;
  return {
    font: toFontStr({ fontFamily, fontStyle, fontWeight, fontSize }),
  };
};

const attrDispatcher = {
  textIndentDelta: function (style, delta) {
    let oldIndent = getValue(style, 'textIndent');
    let newIndent = oldIndent + delta;
    if (newIndent < 0) {
      newIndent = 0;
    }
    return { textIndent: newIndent };
  },
  fontFamily: function (style, fontSize, newStyle) {
    return handleFont(style, newStyle);
  },
  fontStyle: function (style, fontSize, newStyle) {
    return handleFont(style, newStyle);
  },
  fontWeight: function (style, fontSize, newStyle) {
    return handleFont(style, newStyle);
  },
  fontSize: function (style, fontSize, newStyle) {
    return handleFont(style, newStyle);
  },
};

/**
 * 设置样式
 * @param {*} sheet
 * @param {*} style
 */
export const setStyle = function (sheet, style) {
  applyStyleToSelectedCell(sheet, function (sheet, row, col) {
    let sty = sheet.getStyle(row, col);
    const GC = getNamespace();
    sty = sty ? sty.toJSON() : new GC.Spread.Sheets.Style();
    for (let [attr, val] of Object.entries(style)) {
      const handler = attrDispatcher[attr];
      if (isFunction(handler)) {
        const result = handler(sty, val, style);
        Object.assign(sty, result);
      } else {
        fillValue(sty, attr, val);
      }
    }
    sheet.setStyle(row, col, sty);
  });
};

/**
 * 解析样式
 * @param {*} sheet
 * @returns
 */
export function parseStyle(sheet) {
  const { row, col } = getActiveIndexBySheet(sheet);
  const style = sheet.getActualStyle(row, col);
  let wordWrap = !!style?.wordWrap,
    textDecoration = style?.textDecoration || 0,
    textOrientation = style?.textOrientation || 0,
    isVerticalText = !!style?.isVerticalText,
    hAlign = style?.hAlign || 0,
    vAlign = style?.vAlign || 0,
    backColor = style?.backColor,
    showEllipsis = !!style?.showEllipsis,
    shrinkToFit = !!style?.shrinkToFit,
    textIndent = style?.textIndent || 0,
    foreColor = style?.foreColor;
  const {
    fontFamily,
    fontStyle,
    fontVariant,
    fontWeight,
    fontSize,
    lineHeight,
  } = parseFontStr(style?.font);
  return {
    fontStyle,
    fontVariant,
    fontWeight,
    fontSize,
    lineHeight,
    fontFamily,
    hAlign,
    vAlign,
    backColor,
    foreColor,
    wordWrap,
    textOrientation,
    textDecoration,
    isVerticalText,
    showEllipsis,
    shrinkToFit,
    textIndent,
  };
}

//增大字体
export function increasedFontSize(currentSize) {
  const sizeArray = getFontSizeValues();
  const _currentSize = parseInt(currentSize);
  if (_currentSize >= sizeArray[sizeArray.length - 1]) {
    return;
  }
  for (let i = 0; i < sizeArray.length; i++) {
    if (_currentSize < sizeArray[i]) {
      return sizeArray[i];
    } else if (_currentSize === sizeArray[i]) {
      return sizeArray[i + 1];
    }
  }
}

//减小字体
export function decreasedFontSize(currentSize) {
  const sizeArray = getFontSizeValues();
  const _currentSize = parseInt(currentSize);
  if (_currentSize <= sizeArray[0]) {
    return;
  }
  for (let i = sizeArray.length - 1; i > 0; i--) {
    if (_currentSize > sizeArray[i]) {
      return sizeArray[i];
    } else if (_currentSize === sizeArray[i]) {
      return sizeArray[i - 1];
    }
  }
}

export const exeStyleCommand = (spread, style) => {
  exeCommand(spread, Commands.Style.Style, style);
};

export const handleStyle = (spread, style) => {
  exeStyleCommand(spread, style);
  fireCellEnter(spread);
};

export const genCellSettingVisibleHandler = function (
  spread,
  dispatch,
  active
) {
  return () =>
    show(dispatch, {
      onConfirm: (cellSetting) => {
        const style = cellSettingToStyle(cellSetting);
        handleStyle(spread, style);
      },
      active,
    });
};
