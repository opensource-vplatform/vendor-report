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

const getSheetRect = function (sheet, spread) {
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
    let sheetHeight = 0;
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
    let sheetWidth = 0; //显示竖向滚动条，则添加竖向滚动条宽度
    if (rowHeaderVisible) {
        const rowHeaderWidth = sheetJSON.defaults?.rowHeaderColWidth || 40; //默认行标题宽度
        if (rowHeaderColInfos.length > 0) {
            rowHeaderColInfos.forEach((info) => {
                sheetWidth += info?.size || rowHeaderWidth;
            });
        } else {
            sheetWidth += rowHeaderWidth;
        }
    }
    const defColWidth = sheetJSON.defaults?.colWidth || 62; //默认列宽
    for (let i = 0; i < columnCount; i++) {
        sheetWidth += columns[i]?.size || defColWidth;
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
            heightZoomFactor = Math.floor((height / sheetHeight) * 10) / 10;
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

        sheetZoom(sheet, zoomFactor);
    });
};

export const zoomToFit = function (spread, width) {
    spread.sheets.forEach((sheet) => {
        let { sheetWidth } = getSheetRect(sheet, spread);
        if (sheetWidth > 0) {
            sheetWidth += 5; //添加偏差量，防止表格与容器太贴合
            let zoomFactor = width / sheetWidth;
            if (zoomFactor >= 4) {
                zoomFactor = 4;
            }
            sheetZoom(sheet, zoomFactor);
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

export const zoomOut = function (spread) {
    let result = 25;
    spread.sheets.forEach((sheet) => {
        let value = sheet.zoom();
        if (value <= 0.25) {
            return;
        }

        if (value === 1.25 || value === 0.75 || value === 0.25) {
            value += 0.05;
        }
        value = Math.floor(value * 10);
        let step = -1;
        if (value >= 31) {
            step = -4;
        } else if (value >= 21) {
            step = -3;
        } else if (value >= 11) {
            step = -2;
        }
        value = (value + step) / 10;
        if (value <= 0.25) {
            value = 0.25;
        }
        sheet.zoom(value);
        result = value * 100;
    });
    return result.toFixed(0);
};

export const zoomIn = function (spread) {
    let result = 400;
    spread.sheets.forEach((sheet) => {
        let value = sheet.zoom();
        if (value >= 4) {
            return;
        }

        if (value === 1.25 || value === 0.75 || value === 0.25) {
            value += 0.05;
        }
        value = Math.floor(value * 10);
        let step = 1;
        if (value >= 33) {
            step = 4;
        } else if (value >= 21) {
            step = 3;
        } else if (value >= 11) {
            step = 2;
        }
        value = (value + step) / 10;
        if (value >= 4) {
            value = 4;
        }
        sheet.zoom(value);
        result = value * 100;
    });
    return result.toFixed(0);
};

const sheetZoom = function (sheet, value) {
    sheet.zoom(value / (window.devicePixelRatio || 1));
};
