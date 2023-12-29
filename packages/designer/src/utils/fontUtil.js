import { toBorders } from '@metadatas/border';
import { getFontSizeValues } from '@metadatas/font';
import { getNamespace } from '@utils/spreadUtil';

import {
    applyStyleToSelectedCell,
    applyToSelectedCell,
    withBatchUpdate,
} from './spreadUtil';

const tempSpan = document.createElement('span');
export function px2pt(pxValue) {
    tempSpan.style.fontSize = '96pt';
    const tempPx = tempSpan.style.fontSize;
    if (tempPx.indexOf('px') !== -1) {
        const tempPxValue = parseFloat(tempPx);
        return Math.round((pxValue * 96) / tempPxValue);
    } else {
        return Math.round((pxValue * 72) / 96);
    }
}

export function setBorder(params) {
    const { sheet, value } = params;
    const selections = sheet.getSelections();
    for (let i = 0; i < selections.length; i++) {
        const range = selections[i];
        setRangeBorder({
            range,
            value,
            sheet,
        });
    }
}

export function setRangeBorder(params) {
    const { range, value, sheet } = params;
    const { row, col, rowCount, colCount } = range;
    sheet
        .getRange(row, col, rowCount, colCount)
        .setBorder(value.lineborder, value.options);
}

const toFontStr = function (params) {
    const {
        fontFamily = '',
        fontStyle = '',
        fontVariant = '',
        fontWeight = '',
        fontSize = '',
        lineHeight = '',
    } = params;
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
    let fontStyle = 'normal',
        fontVariant = 'normal',
        fontWeight = 'normal',
        fontFamily,
        fontSize,
        lineHeight = 'normal';
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
    return {
        fontStyle,
        fontVariant,
        fontWeight,
        fontSize,
        lineHeight,
        fontFamily,
    };
};

//解析激活状态的单元格字体
export function parseFont(sheet) {
    const style = sheet.getActualStyle(
        sheet.getActiveRowIndex(),
        sheet.getActiveColumnIndex()
    );
    let wordWrap = !!style?.wordWrap,
        textDecoration = style?.textDecoration || 0,
        textOrientation = style?.textOrientation,
        isVerticalText = !!style?.isVerticalText,
        hAlign = style?.hAlign || 0,
        vAlign = style?.vAlign || 0,
        backColor = style?.backColor,
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

/**
 * 设置对齐方式
 * @param {*} spread
 * @param {*} hAlign
 */
export function setAlign(params) {
    const {
        spread,
        vAlign,
        hAlign,
        textOrientation,
        isVerticalText,
        wordWrap,
    } = params;
    withBatchUpdate(spread, (sheet) => {
        applyStyleToSelectedCell(sheet, function (sheet, row, col) {
            const style = sheet.getActualStyle(row, col);
            style.vAlign = vAlign;
            style.hAlign = hAlign;
            style.textOrientation = textOrientation;
            style.isVerticalText = isVerticalText;
            style.wordWrap = wordWrap;
            sheet.setStyle(row, col, style);
            if (sheet.defaults.rowHeight === sheet.getRowHeight(row)) {
                sheet.autoFitRow(row);
            }
        });
    });
}

const dealFontFamily = function (fontFamily) {
    return fontFamily &&
        fontFamily.indexOf("'") === -1 &&
        fontFamily.indexOf('"') === -1
        ? `"${fontFamily}"`
        : fontFamily;
};

/**
 * 字体相关设置
 */
export function setFont(params) {
    const {
        spread,
        fontFamily,
        fontSize,
        fontWeight,
        fontStyle,
        textDecoration,
        backColor,
        foreColor,
    } = params;
    withBatchUpdate(spread, (sheet) => {
        applyStyleToSelectedCell(sheet, function (sheet, row, col) {
            //需要实例化一个新的Style，否则字体设置无效
            const GC = getNamespace();
            const style = new GC.Spread.Sheets.Style();
            const preStyle = sheet.getStyle(row, col);
            Object.assign(style, preStyle);
            const fontFamilyVal = dealFontFamily(fontFamily);
            const font = toFontStr({
                fontFamily: fontFamilyVal,
                fontSize: `${fontSize}pt`,
                fontStyle,
                fontWeight,
            });
            style.font = font;
            style.textDecoration = textDecoration;
            style.backColor = backColor;
            style.foreColor = foreColor;
            sheet.setStyle(row, col, style);
        });
    });
}

/**
 * 设置缩进
 * @param {*} spread
 * @param {*} delta
 */
export function setIndent(spread, delta) {
    withBatchUpdate(spread, (sheet) => {
        applyToSelectedCell(sheet, (sheet, row, col) => {
            const style = sheet.getActualStyle(row, col);
            let oldIndent = style.textIndent;
            if (isNaN(oldIndent)) {
                oldIndent = 0;
            }
            let newIndent = oldIndent + delta;
            if (newIndent < 0) {
                newIndent = 0;
            }
            style.textIndent = newIndent;
            sheet.setStyle(row, col, style);
        });
    });
}

/**
 * 设置缩进值(不叠加历史缩进值)
 * @param {*} spread
 * @param {*} delta
 */
export function setIndentByCounter(spread, indentNumber) {
    withBatchUpdate(spread, (sheet) => {
        applyToSelectedCell(sheet, (sheet, row, col) => {
            const style = sheet.getActualStyle(row, col);
            style.textIndent = indentNumber;
            sheet.setStyle(row, col, style);
        });
    });
}

/**
 * 合并居中
 * @param {*} params
 */
export function mergeCenter(spread) {
    withBatchUpdate(spread, (sheet) => {
        const selections = sheet.getSelections();
        for (let i = 0; i < selections.length; i++) {
            let { row, col, rowCount, colCount } = selections[i];
            row = row === -1 ? 0 : row;
            col = col === -1 ? 0 : col;
            sheet.addSpan(row, col, rowCount, colCount);
            const style = sheet.getActualStyle(row, col);
            style.hAlign = 1;
            sheet.setStyle(row, col, style);
        }
    });
}

/**
 * 跨越合并
 * @param {*} params
 */
export function mergeAcross(spread) {
    withBatchUpdate(spread, (sheet) => {
        const selections = sheet.getSelections();
        for (let i = 0; i < selections.length; i++) {
            let { row, col, rowCount, colCount } = selections[i];
            row = row === -1 ? 0 : row;
            col = col === -1 ? 0 : col;
            for (let m = 0; m < rowCount; m++) {
                for (let n = 0; n < colCount; n++) {
                    sheet.removeSpan(row + m, col + n);
                }
            }
            for (let j = 0; j < rowCount; j++) {
                sheet.addSpan(row + j, col, 1, colCount);
            }
        }
    });
}

/**
 * 合并单元格
 * @param {*} params
 */
export function mergeCells(spread) {
    withBatchUpdate(spread, (sheet) => {
        const selections = sheet.getSelections();
        const selectionsLength = selections.length;
        for (let i = 0; i < selectionsLength; i++) {
            let { row, col, rowCount, colCount } = selections[i];
            row = row === -1 ? 0 : row;
            col = col === -1 ? 0 : col;
            sheet.addSpan(row, col, rowCount, colCount);
        }
    });
}

/**
 * 取消合并
 * @param {*} params
 */
export function unMergeCell(spread) {
    withBatchUpdate(spread, (sheet) => {
        const selections = sheet.getSelections();
        for (let i = 0; i < selections.length; i++) {
            let { row, col, rowCount, colCount } = selections[i];
            row = row === -1 ? 0 : row;
            col = col === -1 ? 0 : col;
            for (let m = 0; m < rowCount; m++) {
                for (let n = 0; n < colCount; n++) {
                    sheet.removeSpan(row + m, col + n);
                }
            }
        }
    });
}

export function isUnderline(textDecoration) {
    return textDecoration == 1;
}

export function toUnderline() {
    return 1;
}

export function isDoubleUnderline(textDecoration) {
    return textDecoration == 8;
}

export function toDoubleUnderline() {
    return 8;
}

export function setBorderByType(spread, type, color, lineType) {
    withBatchUpdate(spread, (sheet) => {
        const values = toBorders(type, color, lineType);
        values.forEach((value) => {
            setBorder({
                value,
                sheet,
            });
        });
    });
}
