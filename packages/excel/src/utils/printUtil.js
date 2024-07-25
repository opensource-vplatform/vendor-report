import { isNullOrUndef } from '@toone/report-util';

import { getNamespace } from './spreadUtil';

export const setPrintInfo = function (sheet, printInfo = {}) {
    let {
        orientation,
        printQuality,
        scaleType,
        fitPagesTall,
        fitPagesWide,
        zoomFactor,
        firstPageNumber,
        paperKind,
        margin,
        headerAndFooter,
        showGridLine,
        showHeader,
        blackAndWhite,
        pageOrder,
        showBorder,
        rowStart,
        rowEnd,
        columnStart,
        columnEnd,
    } = printInfo;
    const print = sheet.printInfo();
    const setValue = (value, handlerName) => {
        if (!isNullOrUndef(value)) {
            typeof handlerName === 'string'
                ? print[handlerName](value)
                : handlerName(value);
        }
    };
    setValue(orientation, 'orientation');
    setValue(printQuality, 'qualityFactor');
    if (!isNullOrUndef(scaleType)) {
        if (scaleType == 1) {
            fitPagesTall = -1;
            fitPagesWide = -1;
            zoomFactor = zoomFactor / 100;
        } else if (scaleType == 0) {
            zoomFactor = 1;
        } else if (scaleType == 2) {
            zoomFactor = 1;
            fitPagesTall = -1;
            fitPagesWide = -1;
        }
        print.zoomFactor(zoomFactor);
        print.fitPagesWide(fitPagesWide);
        print.fitPagesTall(fitPagesTall);
    }
    setValue(firstPageNumber, 'firstPageNumber');
    setValue(paperKind, () => {
        const GC = getNamespace();
        const size = new GC.Spread.Sheets.Print.PaperSize(parseInt(paperKind));
        print.paperSize(size);
    });
    setValue(margin, () => {
        let { left, right, top, bottom, header, footer, centering } = margin;
        print.margin({
            left: left * 100,
            right: right * 100,
            top: top * 100,
            bottom: bottom * 100,
            header: header * 100,
            footer: footer * 100,
        });
        let centerType = null;
        const GC = getNamespace();
        if (centering?.horizontally) {
            centerType = centering?.vertically
                ? GC.Spread.Sheets.Print.PrintCentering.both
                : GC.Spread.Sheets.Print.PrintCentering.horizontal;
        } else if (centering?.vertically) {
            centerType = GC.Spread.Sheets.Print.PrintCentering.vertical;
        } else {
            centerType = GC.Spread.Sheets.Print.PrintCentering.none;
        }
        print.centering(centerType);
    });
    setValue(headerAndFooter?.pageHeaderFooter, 'pageHeaderFooter');
    setValue(showGridLine, 'showGridLine');
    setValue(showHeader, () => {
        const GC = getNamespace();
        const visibleType = showHeader
            ? GC.Spread.Sheets.Print.PrintVisibilityType.show
            : GC.Spread.Sheets.Print.PrintVisibilityType.hide;
        print.showRowHeader(visibleType);
        print.showColumnHeader(visibleType);
    });
    setValue(blackAndWhite, 'blackAndWhite');
    setValue(pageOrder, 'pageOrder');
    setValue(showBorder, 'showBorder');
    rowStart = rowStart == -1 || isNullOrUndef(rowStart) ? 0 : rowStart;
    print.rowStart(rowStart);
    rowEnd =
        rowEnd == -1 || isNullOrUndef(rowEnd) ? sheet.getRowCount() : rowEnd;
    print.rowEnd(rowEnd);
    columnStart =
        columnStart == -1 || isNullOrUndef(columnStart) ? 0 : columnStart;
    print.columnStart(columnStart);
    columnEnd =
        columnEnd == -1 || isNullOrUndef(columnEnd)
            ? sheet.getColumnCount()
            : columnEnd;
    print.columnEnd(columnEnd);
    print.repeatRowStart(-1);
    print.repeatRowEnd(-1);
    print.repeatColumnStart(-1);
    print.repeatColumnEnd(-1);
    sheet.printInfo(print);
};
