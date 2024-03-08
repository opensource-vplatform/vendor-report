import {
  applyToRange,
  getNamespace,
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

const dealFontFamily = function (fontFamily) {
    return fontFamily &&
        fontFamily.indexOf("'") === -1 &&
        fontFamily.indexOf('"') === -1
        ? `"${fontFamily}"`
        : fontFamily;
};

const parseFontStr = function (font) {
    let fontStyle = 'normal',
        fontVariant = 'normal',
        fontWeight = 'normal',
        fontFamily = 'Calibri',
        fontSize = 11,
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

const toValue = function (value, def) {
    return value === null || typeof value == 'undefined' ? def : value;
};

export const setStyle = function (sheet, cellRange, styleParams) {
    const GC = getNamespace();
    let {
        fontWeight,
        fontStyle,
        fontFamily,
        fontSize,
        textDecoration,
        backColor,
        foreColor,
    } = styleParams;
    applyToRange(cellRange, sheet, (sheet, row, col) => {
        const style = new GC.Spread.Sheets.Style();
        const preStyle = sheet.getStyle(row, col);
        const preFont = parseFontStr(preStyle.font);
        Object.assign(style, preStyle);
        fontFamily = toValue(fontFamily, preFont.fontFamily);
        fontSize = toValue(fontSize, preFont.fontSize);
        fontStyle = toValue(fontStyle, preFont.fontStyle);
        fontWeight = toValue(fontWeight, preFont.fontWeight);
        textDecoration = toValue(textDecoration, preStyle.textDecoration);
        backColor = toValue(backColor, preStyle.backColor);
        foreColor = toValue(foreColor, preStyle.foreColor);
        const fontFamilyVal = dealFontFamily(fontFamily);
        const font = toFontStr({
            fontFamily: fontFamilyVal,
            fontSize: fontSize ? `${fontSize}pt` : '',
            fontStyle,
            fontWeight,
        });
        style.font = font;
        style.textDecoration = textDecoration;
        style.backColor = backColor;
        style.foreColor = foreColor;
        sheet.setStyle(row, col, style);
    });
};
