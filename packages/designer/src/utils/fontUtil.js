function setFontStyle(params) {
    const { style, attribute, value, row, column, sheet } = params;
    const fontElement = document.createElement('span');
    fontElement.style.font = style.font;
    fontElement.style[attribute] = value;
    style.font = fontElement.style.font;
    sheet.setStyle(row, column, style);
}

function execInSelections(sheet, func) {
    var i, j;
    var selections = sheet.getSelections();
    for (var k = 0; k < selections.length; k++) {
        var selection = selections[k];
        var col = selection.col,
            row = selection.row,
            rowCount = selection.rowCount,
            colCount = selection.colCount;
        if (col === -1 && row === -1) {
            func(sheet, -1, -1);
        } else if (row === -1) {
            for (i = 0; i < colCount; i++) {
                func(sheet, -1, col + i);
            }
        } else if (col === -1) {
            for (i = 0; i < rowCount; i++) {
                func(sheet, row + i, -1);
            }
        } else {
            for (i = 0; i < rowCount; i++) {
                for (j = 0; j < colCount; j++) {
                    func(sheet, row + i, col + j);
                }
            }
        }
    }
}

function execInSelectionsForSetStyle(sheet, func) {
    var i, j;
    var selections = sheet.getSelections();
    for (var k = 0; k < selections.length; k++) {
        var selection = selections[k];
        var col = selection.col,
            row = selection.row,
            rowCount = selection.rowCount,
            colCount = selection.colCount;
        var style, r, c;
        if (col === -1 || row === -1) {
            if (col === -1 && row === -1) {
                for (r = 0; r < rowCount; r++) {
                    func(sheet, r, -1);
                }
                for (c = 0; c < colCount; c++) {
                    func(sheet, -1, c);
                }
                for (r = 0; r < rowCount; r++) {
                    for (c = 0; c < colCount; c++) {
                        style = sheet.getStyle(r, c);
                        if (style) {
                            func(sheet, r, c);
                        }
                    }
                }
            } else if (col === -1) {
                for (r = 0; r < rowCount; r++) {
                    func(sheet, r + row, -1);
                }
                for (r = 0; r < rowCount; r++) {
                    for (c = 0; c < colCount; c++) {
                        style = sheet.getStyle(r + row, c);
                        if (style) {
                            func(sheet, r + row, c);
                        }
                    }
                }
            } else if (row === -1) {
                for (c = 0; c < colCount; c++) {
                    func(sheet, -1, c + col);
                }
                for (r = 0; r < rowCount; r++) {
                    for (c = 0; c < colCount; c++) {
                        style = sheet.getStyle(r, c + col);
                        if (style) {
                            func(sheet, r, c + col);
                        }
                    }
                }
            }
        } else {
            for (i = 0; i < rowCount; i++) {
                for (j = 0; j < colCount; j++) {
                    func(sheet, row + i, col + j);
                }
            }
        }
    }
}

export function setStyle(params) {
    const {
        attribute,
        property = 'font',
        value,
        adjustValue,
        additionArgs,
        sheet,
        spread,
    } = params;

    spread.suspendPaint();
    execInSelectionsForSetStyle(sheet, function (_sheet, row, column) {
        var style = _sheet.getActualStyle(row, column);
        /*   if (row === -1 || column === -1) {
              style = _sheet.getStyle(row, column);
              if (!style) {
                  style = new GC.Spread.Sheets.Style();
              }
          } else {
              style = _sheet.getActualStyle(row, column);
          } */
        //options._styles[self.getKey(row, column)] = style && style[property];     // save related information, use row, column as the key
        /* if (adjustValue) {
            value = adjustValue.apply(self, [_sheet, row, column, style, value].concat(additionArgs || []));
            style[property] = value;
            _sheet.setStyle(row, column, style);
        } */
        if (
            ['font-size', 'font-weight', 'font-style'].indexOf(attribute) >= 0
        ) {
            setFontStyle({ style, attribute, value, row, column, sheet });
        } else if ('font-family' === attribute) {
            //style.themeFont = keyword_undefined;
            debugger;
            var newValue = value;
            if (
                value &&
                value.indexOf("'") === -1 &&
                value.indexOf('"') === -1
            ) {
                newValue = '"' + value + '"';
            }
            setFontStyle({
                style,
                attribute,
                value: newValue,
                row,
                column,
                sheet,
            });
        } else {
            style[property] = value;
            _sheet.setStyle(row, column, style);
            if (
                property === 'wordWrap' /* && !rowHigh[row] */ &&
                _sheet.defaults.rowHeight === _sheet.getRowHeight(row)
            ) {
                _sheet.autoFitRow(row);
            }
        }
    });
    spread.resumePaint();
}

export function setIndent(params) {
    const { value, sheet } = params;
    execInSelections(sheet, function (sheet, row, column) {
        const style = sheet.getActualStyle(row, column);
        let oldIndent = style.textIndent;
        if (isNaN(oldIndent)) {
            oldIndent = 0;
        }
        let newIndent = oldIndent + value;
        if (newIndent < 0) {
            newIndent = 0;
        }
        style.textIndent = newIndent;
        sheet.setStyle(row, column, style);
    });
}

export function mergeCenter(params) {
    const { sheet } = params;
    const selections = sheet.getSelections();
    for (let i = 0; i < selections.length; i++) {
        let { row, col, rowCount, colCount } = selections[i];
        row = row === -1 ? 0 : row;
        col = col === -1 ? 0 : col;
        sheet.addSpan(row, col, rowCount, colCount);
        const style = sheet.getActualStyle(row, col);
        /* if (!style) {
          style = new Sheets.Style()
        } */
        style.hAlign = 1; /* 居中 */
        sheet.setStyle(row, col, style);
    }
}

export function mergeAcross(params) {
    const { sheet } = params;
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
}

export function mergeCells(params) {
    const { sheet } = params;
    const selections = sheet.getSelections();
    const selectionsLength = selections.length;
    for (let i = 0; i < selectionsLength; i++) {
        let { row, col, rowCount, colCount } = selections[i];
        row = row === -1 ? 0 : row;
        col = col === -1 ? 0 : col;
        sheet.addSpan(row, col, rowCount, colCount);
    }
}

export function unMergeCell(params) {
    const { sheet } = params;
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
}

const tempSpan = document.createElement('span');
export function px2pt(pxValue) {
    tempSpan.style.fontSize = '96pt';

    //tempSpan.appendTo($(document.body));
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

//解析激活状态的单元格字体
export function parseFont(spread) {
    const sheet = spread.getActiveSheet();
    const style = sheet.getActualStyle(
        sheet.getActiveRowIndex(),
        sheet.getActiveColumnIndex()
    );
    let font = style?.font;
    let fontFamily = null,
        fontSize = null,
        fontStyle = 'normal',
        fontWeight = 'normal',
        fontVariant = 'normal',
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
                            fontSize = px2pt(parseFloat(fontSize)) + 'pt';
                        }
                        if (parts.length > 1) {
                            lineHeight = parts[1];
                            if (lineHeight.indexOf('px') !== -1) {
                                lineHeight =
                                    px2pt(parseFloat(lineHeight)) + 'pt';
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
        fontStyle: fontStyle,
        fontVariant: fontVariant,
        fontWeight: fontWeight,
        fontSize: fontSize,
        lineHeight: lineHeight,
        fontFamily: fontFamily,
    };
}

//增大字体
export function increasedFontSize(currentSize) {
    const sizeArray = [
        8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 26, 28, 36, 48, 72,
    ];
    const _currentSize = parseInt(currentSize);
    if (_currentSize >= sizeArray[sizeArray.length - 1]) {
        return;
    }
    for (let i = 0; i < sizeArray.length; i++) {
        if (_currentSize < sizeArray[i]) {
            return sizeArray[i];
        }
        if (_currentSize === sizeArray[i]) {
            return sizeArray[i + 1];
        }
    }
}

//减小字体
export function decreasedFontSize(currentSize) {
    const sizeArray = [
        8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 26, 28, 36, 48, 72,
    ];
    const _currentSize = parseInt(currentSize);
    if (_currentSize <= sizeArray[0]) {
        return;
    }
    for (var i = sizeArray.length - 1; i > 0; i--) {
        if (_currentSize > sizeArray[i]) {
            return sizeArray[i];
        }
        if (_currentSize === sizeArray[i]) {
            return sizeArray[i - 1];
        }
    }
}
