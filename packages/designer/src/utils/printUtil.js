import {
  deepClone,
  isNullOrUndef,
} from './objectUtil';
import {
  getNamespace,
  withBatchCalcUpdate,
} from './spreadUtil';

function isTableSheet(sheet) {
    const GC = getNamespace();
    if (GC.Spread.Sheets.TableSheet && GC.Spread.Sheets.TableSheet.TableSheet) {
        return sheet instanceof GC.Spread.Sheets.TableSheet.TableSheet;
    }
    return false;
}

const getSheet = function (spread) {
    const sheet = spread.getActiveSheetTab();
    return isTableSheet(sheet)
        ? sheet.getActiveSheet() || sheet
        : spread.getActiveSheet();
};

export const setPrintArea = function (spread) {
    withBatchCalcUpdate(spread, (sheet) => {
        sheet = getSheet(spread);
        if (sheet) {
            const selections = sheet.getSelections();
            const { row, col, rowCount, colCount } = selections[0];
            const printInfo = sheet.printInfo();
            printInfo.rowStart(row);
            printInfo.rowEnd(row + rowCount - 1);
            printInfo.columnStart(col);
            printInfo.columnEnd(col + colCount - 1);
        }
    });
};

export const clearPrintArea = function (spread) {
    withBatchCalcUpdate(spread, (sheet) => {
        sheet = getSheet(spread);
        if (sheet) {
            const printInfo = sheet.printInfo();
            printInfo.rowStart(-1);
            printInfo.rowEnd(-1);
            printInfo.columnStart(-1);
            printInfo.columnEnd(-1);
        }
    });
};

export const insertPageSplit = function (spread) {
    withBatchCalcUpdate(spread, (sheet) => {
        const selections = sheet.getSelections();
        if (selections && selections.length > 0) {
            const { row, col } = selections[selections.length - 1];
            sheet.setRowPageBreak(row, true);
            sheet.setColumnPageBreak(col, true);
        }
    });
};

export const removePageSplit = function (spread) {
    withBatchCalcUpdate(spread, (sheet) => {
        const selections = sheet.getSelections();
        if (selections && selections.length > 0) {
            const { row, col } = selections[selections.length - 1];
            sheet.setRowPageBreak(row, false);
            sheet.setColumnPageBreak(col, false);
        }
    });
};

export const resetAllPageSplit = function (spread) {
    withBatchCalcUpdate(spread, (sheet) => {
        const colCount = sheet.getColumnCount();
        const rowCount = sheet.getRowCount();
        for (let i = 0; i < colCount; i++) {
            if (sheet.getColumnPageBreak(i)) {
                sheet.setColumnPageBreak(i, false);
            }
        }
        for (i = 0; i < rowCount; i++) {
            if (sheet.getRowPageBreak(i)) {
                sheet.setRowPageBreak(i, false);
            }
        }
    });
};

const setValue = function (val, fn) {
    if (typeof val !== 'undefined') {
        fn(val);
    }
};

export const setPageLayout = function (spread, layout) {
    const GC = getNamespace();
    withBatchCalcUpdate(spread, (sheet) => {
        const printInfo = sheet.printInfo();
        const {
            scaleType,
            showHeader,
            orientation,
            paperSize,
            printQuality,
            firstPageNumber,
            margin,
            centering,
            differentOddEven,
            differentFirst,
            pageHeaderFooter,
        } = layout;
        setValue(showHeader, (val) => {
            const showHeader = val
                ? GC.Spread.Sheets.Print.PrintVisibilityType.show
                : GC.Spread.Sheets.Print.PrintVisibilityType.hide;
            printInfo.showRowHeader(showHeader);
            printInfo.showColumnHeader(showHeader);
        });
        setValue(orientation, (val) => {
            printInfo.orientation(val);
        });
        setValue(paperSize, (val) => {
            printInfo.paperSize(val);
        });
        setValue(printQuality, (val) => {
            printInfo.qualityFactor(val);
        });
        setValue(firstPageNumber, (val) => {
            printInfo.firstPageNumber(val);
        });
        setValue(margin, (val) => {
            printInfo.margin(val);
        });
        setValue(centering, (val) => {
            printInfo.centering(val);
        });
        setValue(differentOddEven, (val) => {
            printInfo.differentOddAndEvenPages(val);
        });
        setValue(differentFirst, (val) => {
            printInfo.differentFirstPage(val);
        });
        setValue(pageHeaderFooter, (val) => {
            printInfo.pageHeaderFooter(val);
        });
        setValue(scaleType, (val) => {
            if (val === u.fitPage) {
                printInfo.zoomFactor(1);
                printInfo.fitPagesWide(t.fitPagesWide);
                printInfo.fitPagesTall(t.fitPagesTall);
            } else if (val === u.zoomFactor) {
                printInfo.zoomFactor(t.zoomFactor);
                printInfo.fitPagesTall(-1);
                printInfo.fitPagesWide(-1);
            }
        });

        var i = rowStart,
            l = rowEnd,
            s = columnStart,
            c = columnEnd;
        return (
            i !== t.printArea.startX && printInfo.rowStart(t.printArea.startY),
            l !== t.printArea.endY && printInfo.rowEnd(t.printArea.endY),
            s !== t.printArea.startX &&
                printInfo.columnStart(t.printArea.startX),
            c !== t.printArea.endX && printInfo.columnEnd(t.printArea.endX),
            printInfo.repeatRowStart(t.repeatRow.start),
            printInfo.repeatRowEnd(t.repeatRow.end),
            printInfo.repeatColumnStart(t.repeatColumn.start),
            printInfo.repeatColumnEnd(t.repeatColumn.end),
            printInfo.showGridLine(t.showGridLine),
            printInfo.blackAndWhite(t.blackAndWhite),
            printInfo.pageOrder(t.pageOrder),
            true
        );
    });
};

function toHeaderFooter(e) {
    return {
        left: (e = e || {}).left || '',
        leftImage: e.leftImage || '',
        center: e.center || '',
        centerImage: e.centerImage || '',
        right: e.right || '',
        rightImage: e.rightImage || '',
    };
}

const ScaleType = {
    0: 'fitPage',
    1: 'zoomFactor',
    fitPage: 0,
    zoomFactor: 1,
};

const handleMargin = function (margin, handler) {
    (margin.left = handler(margin.left)),
        (margin.right = handler(margin.right)),
        (margin.top = handler(margin.top)),
        (margin.bottom = handler(margin.bottom)),
        (margin.header = handler(margin.header)),
        (margin.footer = handler(margin.footer));
};

const px2inch = function (px) {
    return px / 100;
};

const defaultHeaderOrFooter = [
    {
        left: '',
        center: '第 &P 页',
        right: '',
        leftImage: '',
        centerImage: '',
        rightImage: '',
    },
    {
        left: '',
        center: '第&P页，共&N页',
        right: '',
        leftImage: '',
        centerImage: '',
        rightImage: '',
    },
    {
        left: '',
        center: '&A',
        right: '',
        leftImage: '',
        centerImage: '',
        rightImage: '',
    },
    {
        left: '机密',
        center: '&D',
        right: '第&P页',
        leftImage: '',
        centerImage: '',
        rightImage: '',
    },
    {
        left: '',
        center: '&F',
        right: '',
        leftImage: '',
        centerImage: '',
        rightImage: '',
    },
    {
        left: '',
        center: '&A',
        right: '第&P页',
        leftImage: '',
        centerImage: '',
        rightImage: '',
    },
    {
        left: '&A',
        center: '机密',
        right: '第&P页',
        leftImage: '',
        centerImage: '',
        rightImage: '',
    },
    {
        left: '',
        center: '&F',
        right: '第&P页',
        leftImage: '',
        centerImage: '',
        rightImage: '',
    },
    {
        left: '',
        center: '第&P页',
        right: '&A',
        leftImage: '',
        centerImage: '',
        rightImage: '',
    },
    {
        left: '',
        center: '第&P页',
        right: '&D',
        leftImage: '',
        centerImage: '',
        rightImage: '',
    },
    {
        left: '',
        center: '制作人：&D',
        right: '第&P页',
        leftImage: '',
        centerImage: '',
        rightImage: '',
    },
];

const NUM_REG = /&[0-9]+/;
const WORD_REG = /&K[0-9A-Fa-f]{6}/;
const WIDE_REG = /&".+?"/;

const generateHeaderFooterContents = function (format) {
    const result = [];
    if (format) {
        for (
            var n = '&'.length,
                i = '',
                l = false,
                s = 0,
                c = false,
                u = false,
                d = false,
                p = 'black',
                m = '';
            format;

        ) {
            var h = i,
                f = l,
                b = s,
                g = d,
                y = c,
                v = u,
                C = p,
                S = format.indexOf('&');
            S < 0 && (S = format.length), (m += format.substr(0, S));
            var x = S + 1 < format.length ? format.substr(S + 1, 1) : '';
            x = x.toUpperCase();
            var w = -1,
                L = false,
                T = undefined,
                P = undefined;
            (format =
                (w =
                    -1 < '1234567890'.indexOf(x)
                        ? (T = NUM_REG.exec(format.substr(S))) && 0 < T.length
                            ? ((P = T[0]),
                              (b = parseFloat(P.substr(1))),
                              (L = true),
                              S + P.length)
                            : S + n
                        : 'K' === x
                          ? (T = WORD_REG.exec(format.substr(S))) &&
                            0 < T.length
                              ? ((C =
                                    '#' +
                                    (P = T[0]).substr(2, 2) +
                                    P.substr(4, 2) +
                                    P.substr(6, 2)),
                                (L = true),
                                S + P.length)
                              : S + n
                          : 'S' === x
                            ? ((f = !f), (L = true), S + n + 'S'.length)
                            : 'U' === x
                              ? ((g = !g), (L = true), S + n + 'U'.length)
                              : '"' === x
                                ? (T = WIDE_REG.exec(format.substr(S))) &&
                                  0 < T.length
                                    ? ((h = (P = T[0]).substr(2, P.length - 3)),
                                      (L = true),
                                      S + P.length)
                                    : S + n
                                : 'B' === x
                                  ? ((y = !y), (L = true), S + n + 'B'.length)
                                  : 'I' === x
                                    ? ((v = !v), (L = true), S + n + 'I'.length)
                                    : '&' === x
                                      ? ((m += '&&'), (L = true), S + n + n)
                                      : 'D' === x
                                        ? ((m += '&D'),
                                          (L = true),
                                          S + n + 'D'.length)
                                        : 'T' === x
                                          ? ((m += '&T'),
                                            (L = true),
                                            S + n + 'T'.length)
                                          : 'P' === x
                                            ? ((m += '&P'),
                                              (L = true),
                                              S + n + 'P'.length)
                                            : 'N' === x
                                              ? ((m += '&N'),
                                                (L = true),
                                                S + n + 'N'.length)
                                              : 'G' === x
                                                ? ((m += '&G'),
                                                  S + n + 'G'.length)
                                                : 'F' === x
                                                  ? ((m += '&F'),
                                                    (L = true),
                                                    S + n + 'F'.length)
                                                  : 'A' === x
                                                    ? ((m += '&A'),
                                                      (L = true),
                                                      S + n + 'A'.length)
                                                    : S + n) >= format.length
                    ? ''
                    : (w < 0 && (w = S + n), format.substr(w))),
                !m ||
                    (!L && format) ||
                    (result.push({
                        text: m,
                        underline: d,
                        strikethrough: l,
                        fontFamily: i,
                        fontSize: 0 < s ? s + 'px' : '',
                        fontWeight: c ? 'bold' : '',
                        fontStyle: u ? 'italic' : '',
                        color: p,
                    }),
                    (m = '')),
                (i = h),
                (l = f),
                (s = b),
                (d = g),
                (c = y),
                (u = v),
                (p = C);
        }
    }
    return result;
};

const STYLE_ENUM = {
    bold: 'B',
    command: '&',
    date: 'D',
    fontFamily: '"',
    image: 'G',
    italic: 'I',
    pageCount: 'N',
    pageNumber: 'P',
    strikethrough: 'S',
    time: 'T',
    underline: 'U',
    workbookName: 'F',
    worksheetName: 'A',
};

const parseFormatString = function (format, spread) {
    var t = generateHeaderFooterContents(format).reduce(function (e, t) {
        return e + t.text;
    }, '');
    if (!t) return '';
    for (
        var n = [], sheet = spread.getActiveSheet(), i = new Date(), l = 0;
        l < t.length;
        l++
    ) {
        var s = t[l];
        if ('&' === s && l < t.length - 1)
            switch ((s = t[++l])) {
                case STYLE_ENUM.pageNumber:
                    n.push('1');
                    break;
                case STYLE_ENUM.pageCount:
                    n.push('?');
                    break;
                case STYLE_ENUM.workbookName:
                    n.push(
                        spread && spread.name
                            ? spread.name
                            : "工作簿"
                    );
                    break;
                case STYLE_ENUM.worksheetName:
                    var c = '';
                    (c = sheet
                        ? sheet.name()
                        : "工作表"),
                        n.push(c);
                    break;
                case STYLE_ENUM.date:
                    n.push(
                        ''
                            .concat(i.getFullYear(), '/')
                            .concat(i.getMonth() + 1, '/')
                            .concat(i.getDate())
                    );
                    break;
                case STYLE_ENUM.time:
                    n.push(
                        ''
                            .concat(i.getHours(), ':')
                            .concat(i.getMinutes(), ':')
                            .concat(i.getSeconds())
                    );
                    break;
                case STYLE_ENUM.command:
                    n.push('&');
                    break;
                default:
                    n.push('&'), n.push(s);
            }
        else n.push(s);
    }
    return n.join('');
};

function toStr(setting) {
    let result = setting.left;
    if (setting.center) {
        if (setting.left) {
            result += ',';
        }
        result += setting.center;
    }
    if (setting.right) {
        if (setting.center) {
            result += ',';
        }
        result += setting.right;
    }
    return result;
}

const getHeadersOrFootersArray = function (selectedValue, spread) {
    var t,
        n =
            ((t = defaultHeaderOrFooter.map((e) => {
                return (
                    (e.leftImage = ''),
                    (e.centerImage = ''),
                    (e.rightImage = ''),
                    {
                        text: parseFormatString(toStr(e), spread),
                        value: JSON.stringify(e),
                    }
                );
            })).unshift({
                text: '(无)',
                value: JSON.stringify({
                    left: '',
                    center: '',
                    right: '',
                    leftImage: '',
                    centerImage: '',
                    rightImage: '',
                }),
            }),
            t);
    if (
        -1 !==
        n
            .map(function (e) {
                return e.value;
            })
            .indexOf(selectedValue)
    ) {
        return n;
    }
    var o = n,
        r = toStr(JSON.parse(selectedValue));
    return (o = o.concat({
        text: parseFormatString(r, spread),
        value: selectedValue,
    }));
};

export const parsePrintInfo = function (spread) {
    const sheet = getSheet(spread);
    const printInfo = sheet.printInfo();
    const GC = getNamespace();
    const rowStart = printInfo.rowStart();
    const columnStart = printInfo.columnStart();
    const rowEnd = printInfo.rowEnd();
    const columnEnd = printInfo.columnEnd();
    const repeatRowStart = printInfo.repeatRowStart();
    const repeatColumnStart = printInfo.repeatColumnStart();
    const repeatRowEnd = printInfo.repeatRowEnd();
    const repeatColumnEnd = printInfo.repeatColumnEnd();
    let formula = '',
        formula1 = '',
        formula2 = '';
    if (rowStart !== -1 || columnStart !== -1 || columnEnd !== -1) {
        const range = new GC.Spread.Sheets.Range(
            rowStart,
            columnStart,
            rowEnd - rowStart + 1,
            columnEnd - columnStart + 1
        );
        if (rowEnd !== -1 && rowStart === -1) {
            range.row = 0;
            range.rowCount = rowEnd - rowStart + 1;
        }
        if (columnEnd !== -1 && columnStart === -1) {
            range.col = 0;
            range.colCount = columnEnd - columnStart + 1;
        }
        formula = GC.Spread.Sheets.CalcEngine.rangeToFormula(range);
    }
    if (repeatRowStart !== -1 || repeatRowEnd !== -1) {
        const range = new GC.Spread.Sheets.Range(
            repeatRowStart,
            -1,
            repeatRowEnd - repeatRowStart + 1,
            -1
        );
        formula1 = GC.Spread.Sheets.CalcEngine.rangeToFormula(range);
    }
    if (repeatColumnStart !== -1 || repeatColumnEnd !== -1) {
        const range = new GC.Spread.Sheets.Range(
            -1,
            repeatColumnStart,
            -1,
            repeatColumnEnd - repeatColumnStart + 1
        );
        formula2 = GC.Spread.Sheets.CalcEngine.rangeToFormula(range);
    }
    const headerFooter = deepClone(printInfo.pageHeaderFooter());
    const setting = headerFooter.normal || headerFooter.odd;
    let normal = null;
    if (isNullOrUndef(setting)) {
        const def = {
            left: '',
            leftImage: '',
            center: '',
            centerImage: '',
            right: '',
            rightImage: '',
        };
        normal = {
            header: toHeaderFooter(def),
            footer: toHeaderFooter(def),
        };
    } else {
        normal = {
            header: toHeaderFooter(setting.header),
            footer: toHeaderFooter(setting.footer),
        };
    }
    headerFooter.normal = normal;
    const result = {
        scaleType: ScaleType.fitPage,
        showFileMenu: false,
        printButtonGroup: {
            showFileMenu: false,
        },
        orientation: printInfo.orientation(),
        zoomFactor: Math.round(100 * printInfo.zoomFactor()),
        fitPagesWide: printInfo.fitPagesWide(),
        fitPagesTall: printInfo.fitPagesTall(),
        paperKind: printInfo.paperSize().kind(),
        printQuality: printInfo.qualityFactor(),
        firstPageNumber: printInfo.firstPageNumber(),
        margin: deepClone(printInfo.margin()),
        headerAndFooter: {
            headerFormat: {
                selectedValue: JSON.stringify({
                    left: normal.header.left,
                    center: normal.header.center,
                    right: normal.header.right,
                    leftImage: normal.header.leftImage,
                    centerImage: normal.header.centerImage,
                    rightImage: normal.header.rightImage,
                }),
            },
            footerFormat: {
                selectedValue: JSON.stringify({
                    left: normal.footer.left,
                    center: normal.footer.center,
                    right: normal.footer.right,
                    leftImage: normal.footer.leftImage,
                    centerImage: normal.footer.centerImage,
                    rightImage: normal.footer.rightImage,
                }),
            },
            differentOddEven: printInfo.differentOddAndEvenPages(),
            differentFirst: printInfo.differentFirstPage(),
            pageHeaderFooter: headerFooter,
        },
        showGridLine: printInfo.showGridLine(),
        blackAndWhite: printInfo.blackAndWhite(),
        pageOrder: printInfo.pageOrder(),
        sheetArea: formula,
        repeatAtLeft: formula2,
        repeatAtTop: formula1,
    };
    handleMargin(result.margin, px2inch);
    if (printInfo.fitPagesTall() === -1 && printInfo.fitPagesWide() === -1) {
        result.scaleType = ScaleType.zoomFactor;
    }
    result.margin.centering = {
        vertically: 1 < printInfo.centering(),
        horizontally:
            1 === printInfo.centering() || 3 === printInfo.centering(),
    };
    result.headerAndFooter.headerFormat.items = getHeadersOrFootersArray(
        result.headerAndFooter.headerFormat.selectedValue,
        spread
    );
    result.headerAndFooter.footerFormat.items = getHeadersOrFootersArray(
        result.headerAndFooter.footerFormat.selectedValue,
        spread
    );
    const rowHeaderVisible =
        printInfo.showRowHeader() >=
            GC.Spread.Sheets.Print.PrintVisibilityType.show ||
        (printInfo.showRowHeader() ===
            GC.Spread.Sheets.Print.PrintVisibilityType.inherit &&
            (null == sheet ? undefined : sheet.options).rowHeaderVisible);
    const colHeaderVisible =
        printInfo.showColumnHeader() >=
            GC.Spread.Sheets.Print.PrintVisibilityType.show ||
        (printInfo.showColumnHeader() ===
            GC.Spread.Sheets.Print.PrintVisibilityType.inherit &&
            (null == sheet ? undefined : sheet.options).colHeaderVisible);
    result.showHeader = !!rowHeaderVisible || !!colHeaderVisible;
    result.pageOrder =
        printInfo.pageOrder() >
        GC.Spread.Sheets.Print.PrintPageOrder.downThenOver
            ? GC.Spread.Sheets.Print.PrintPageOrder.overThenDown
            : GC.Spread.Sheets.Print.PrintPageOrder.downThenOver;
    (result.showFileMenu = undefined),
        (result.printButtonGroup.showFileMenu = undefined);
    var f = repeatRowStart;
    printInfo.repeatRowStart(-2);
    result.repeatRowAvailable = false;
    return result;
};
