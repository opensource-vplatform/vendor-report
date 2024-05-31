import { getBaseUrl } from './environmentUtil';

/**
 * 获取命令空间
 */
export const getNamespace = function () {
    return window.GC;
};

export const withBatchCalcUpdate = function (spread, updateHandler) {
    if (spread) {
        spread.suspendPaint();
        spread.suspendEvent();
        spread.suspendCalcService();
        const sheet = spread.getActiveSheet();
        try {
            updateHandler(sheet);
        } finally {
            spread.resumePaint();
            spread.resumeEvent();
            spread.resumeCalcService();
        }
    }
};

const PLUGIN_SRCS = {
    print: ['print.min.js'],
    pdf: ['print.min.js', 'pdf.min.js'],
    excel: ['excelio.min.js'],
};

export const getPluginSrc = function (type) {
    return PLUGIN_SRCS[type].map((src) => toExcelPluginUrl(src));
};

/**
 * 将样式应用到选择的单元格
 * @returns
 */
export const applyToRange = function (cellRange, sheet, func) {
    const { col, row, rowCount, colCount } = cellRange;
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            func(sheet, row + i, col + j);
        }
    }
};

export function getExcelVersion() {
    const GC = getNamespace();
    return GC.Spread.Sheets.productInfo.productVersion;
}

export const getExcelBaseUrl = function () {
    const version = getExcelVersion();
    return `${getBaseUrl()}/vendor/excel/${version}`;
};

export const toExcelPluginUrl = function (filename) {
    return `${getExcelBaseUrl()}/plugins/${filename}`;
};

const getSheetRect = function (sheet) {
    const sheetJSON = sheet.toJSON();

    const {
        rows = [],
        rowCount = 200,
        colHeaderVisible = true,
        colHeaderRowInfos = [],
        columns = [],
        columnCount = 20,
        rowHeaderVisible = true,
        rowHeaderColInfos = [],
    } = sheetJSON;

    //内容高度
    let sheetHeight = 20;
    if (colHeaderVisible) {
        if (colHeaderRowInfos.length > 0) {
            colHeaderRowInfos.forEach((info) => {
                sheetHeight += info?.size || 20;
            });
        } else {
            sheetHeight += 20;
        }
    }

    for (let i = 0; i < rowCount; i++) {
        sheetHeight += rows[i]?.size || 20;
    }

    //内容宽度
    let sheetWidth = 0;
    if (rowHeaderVisible) {
        if (rowHeaderColInfos.length > 0) {
            rowHeaderColInfos.forEach((info) => {
                sheetWidth += info?.size || 40;
            });
        } else {
            sheetWidth += 40;
        }
    }
    for (let i = 0; i < columnCount; i++) {
        sheetWidth += columns[i]?.size || 62;
    }

    return {
        sheetHeight,
        sheetWidth,
    };
};

export const zoomToPage = function (spread, width, height) {
    spread.sheets.forEach((sheet) => {
        const { sheetHeight, sheetWidth } = getSheetRect(sheet);
        let heightZoomFactor = 1;
        if (sheetHeight > 0) {
            heightZoomFactor = height / sheetHeight;
        }
        let widthZoomFactor = 1;
        if (sheetWidth > 0) {
            widthZoomFactor = width / sheetWidth;
        }
        let zoomFactor = heightZoomFactor;
        if (heightZoomFactor >= widthZoomFactor) {
            zoomFactor = widthZoomFactor;
        }

        if (zoomFactor >= 4) {
            zoomFactor = 4;
        }

        sheet.zoom(zoomFactor);
    });
};

export const zoomToFit = function (spread, width) {
    spread.sheets.forEach((sheet) => {
        const { sheetWidth } = getSheetRect(sheet);
        if (sheetWidth > 0) {
            let zoomFactor = width / sheetWidth;
            if (zoomFactor >= 4) {
                zoomFactor = 4;
            }
            sheet.zoom(zoomFactor);
        }
    });
};

export const zoomToRecover = function (spread) {
    spread.sheets.forEach((sheet) => {
        sheet.zoom(1);
    });
};

const getSpreadCanvasRect = function (el) {
    const canvasEl = el?.current?.querySelector?.('#vp_vp');
    const height = Number(canvasEl.getAttribute('height'));
    const width = Number(canvasEl.getAttribute('width'));
    return {
        height,
        width,
    };
};

const zoomByNumber = function (spread, value) {
    let newValue = value;
    if (newValue >= 4) {
        newValue = 4;
    }
    if (newValue <= 0.25) {
        newValue = 0.25;
    }

    spread.sheets.forEach((sheet) => {
        sheet.zoom(newValue);
    });
};

export const zoom = function ({ el, value, spread }) {
    if (value === 'actualSize') {
        zoomToRecover(spread);
        return;
    }

    let newValue = Number(value);
    if (!Number.isNaN(newValue)) {
        zoomByNumber(spread, newValue);
        return;
    }

    const { height, width } = getSpreadCanvasRect(el);
    if (value === 'suitableToPageWidth') {
        zoomToFit(spread, width);
        return;
    }

    if (value === 'suitableToPage') {
        zoomToPage(spread, width, height);
        return;
    }
};
