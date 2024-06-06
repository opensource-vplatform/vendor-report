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
    let sheetWidth = 30; //显示竖向滚动条，则添加竖向滚动条宽度
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

export const zoomToPage = function (spread, width, height, paper, setStyle) {
    const heightZoomFactor = (height - 16) / paper.height;
    const widthZoomFactor = (width - 16) / paper.width;
    let zoomFactor = heightZoomFactor;
    if (heightZoomFactor >= widthZoomFactor) {
        zoomFactor = widthZoomFactor;
    }

    let newWidth = paper.width * zoomFactor;
    let newHeight = paper.height * zoomFactor;

    setStyle({
        height: newHeight,
        width: newWidth,
        zoomFactor,
    });
    spread.sheets.forEach((sheet) => {
        const { sheetHeight, sheetWidth } = getSheetRect(sheet);
        let heightZoomFactor = 1;
        if (sheetHeight > 0) {
            heightZoomFactor = Math.floor((newHeight / sheetHeight) * 10) / 10;
        }
        let widthZoomFactor = 1;
        if (sheetWidth > 0) {
            widthZoomFactor = newWidth / sheetWidth;
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
    setTimeout(() => spread.refresh(), 0);
};

export const zoomToFit = function (spread, width, paper, setStyle) {
    const zoomFactor = (width - 30) / paper.width;

    let newWidth = paper.width * zoomFactor;
    let newHeight = paper.height * zoomFactor;
    setStyle({
        height: newHeight,
        width: newWidth,
        zoomFactor,
    });
    spread.sheets.forEach((sheet) => {
        let { sheetWidth } = getSheetRect(sheet, spread);
        if (sheetWidth > 0) {
            sheetWidth += 5; //添加偏差量，防止表格与容器太贴合
            let zoomFactor = newWidth / sheetWidth;
            if (zoomFactor >= 4) {
                zoomFactor = 4;
            }
            sheetZoom(sheet, zoomFactor);
        }
    });
    setTimeout(() => spread.refresh(), 0);
};

export const zoomToRecover = function (spread, setStyle) {
    let height = '100%';
    let width = '100%';
    spread.sheets.forEach((sheet) => {
        const { sheetHeight, sheetWidth } = getSheetRect(sheet);
        height = sheetHeight + 50;
        width = sheetWidth + 50;
        sheet.zoom(1);
    });
    setStyle({
        height,
        width,
        zoomFactor: 1,
    });
    setTimeout(() => spread.refresh(), 0);
};

const getSpreadCanvasRect = function (el) {
    /* const canvasEl = el?.current?.querySelector?.('#vp_vp');
    const height = Number(canvasEl.getAttribute('height'));
    const width = Number(canvasEl.getAttribute('width')); */
    const css = getComputedStyle(el.current);
    const height = css.height;
    const width = css.width;
    return {
        isRender: width.endsWith('px') ? true : false,
        height: height.slice(0, -2),
        width: width.slice(0, -2),
    };
};

const zoomByNumber = function ({ spread, value, setStyle, _width, paper }) {
    let newValue = value;
    if (newValue >= 4) {
        newValue = 4;
    }
    if (newValue <= 0.25) {
        newValue = 0.25;
    }
    let height = '100%';
    let width = '100%';
    spread.sheets.forEach((sheet) => {
        const { sheetHeight, sheetWidth } = getSheetRect(sheet);

        height = sheetHeight * newValue;
        width = sheetWidth * newValue;

        let heightZoomFactor = 1;
        if (sheetHeight > 0) {
            heightZoomFactor =
                Math.floor((height / (sheetHeight + 100)) * 1000) / 1000;
        }
        let widthZoomFactor = 1;
        if (sheetWidth > 0) {
            widthZoomFactor = Math.floor((width / sheetWidth) * 1000) / 1000;
        }
        let zoomFactor = heightZoomFactor;
        if (heightZoomFactor >= widthZoomFactor) {
            zoomFactor = widthZoomFactor;
        }

        if (zoomFactor >= 4) {
            zoomFactor = 4;
        }

        var usedRange = sheet.getUsedRange(
            window.GC.Spread.Sheets.UsedRangeType.all
        ); // 获取使用了的区域
        // 获取使用区域的最大列宽
        var cell = sheet.getCellRect(0, usedRange.col);
        var width1 = cell.x + cell.width; // 计算外部spread的容器的列宽
        var fa = width / width1; // 获取应该放大的系数

        sheet.zoom(zoomFactor);
    });

    let exceededWidth = _width < width ? true : false;
    setStyle({
        height,
        width,
        zoomFactor: newValue,
        exceededWidth,
    });
    setTimeout(() => spread.refresh(), 0);
};

export const zoom = function ({ el, value, spread, paper, setStyle }) {
    if (value === 'actualSize') {
        zoomToRecover(spread, setStyle);
        return;
    }
    const { height, width, isRender } = getSpreadCanvasRect(el);
    let newValue = Number(value);
    if (!Number.isNaN(newValue)) {
        zoomByNumber({ spread, value: newValue, setStyle, width, paper });
        return;
    }

    if (!isRender) {
        return;
    }
    if (value === 'suitableToPageWidth') {
        zoomToFit(spread, width, paper, setStyle);
        return;
    }

    if (value === 'suitableToPage') {
        zoomToPage(spread, width, height, paper, setStyle);
        return;
    }
};

export const zoomOut = function ({ spread, getStyle, setStyle, el, paper }) {
    let { zoomFactor } = getStyle();
    zoomFactor = Math.floor(zoomFactor * 10);
    if (zoomFactor === 12.5 || zoomFactor === 7.5 || zoomFactor === 2.5) {
        zoomFactor += 0.5;
    }

    let step = -1;
    if (zoomFactor >= 33) {
        step = -4;
    } else if (zoomFactor >= 21) {
        step = -3;
    } else if (zoomFactor >= 11) {
        step = -2;
    }
    zoomFactor = (zoomFactor + step) / 10;
    if (zoomFactor <= 0.25) {
        zoomFactor = 0.25;
    }

    const { width: _width } = getSpreadCanvasRect(el);
    zoomByNumber({ spread, value: zoomFactor, setStyle, width: _width, paper });
    return (zoomFactor * 100).toFixed(0);
};

export const zoomIn = function ({ spread, getStyle, setStyle, el, paper }) {
    let { zoomFactor } = getStyle();
    zoomFactor = Math.floor(zoomFactor * 10);
    if (zoomFactor === 12.5 || zoomFactor === 7.5 || zoomFactor === 2.5) {
        zoomFactor += 0.5;
    }

    let step = 1;
    if (zoomFactor >= 33) {
        step = 4;
    } else if (zoomFactor >= 21) {
        step = 3;
    } else if (zoomFactor >= 11) {
        step = 2;
    }
    zoomFactor = (zoomFactor + step) / 10;
    if (zoomFactor >= 4) {
        zoomFactor = 4;
    }

    const { width: _width } = getSpreadCanvasRect(el);
    zoomByNumber({ spread, value: zoomFactor, setStyle, width: _width, paper });
    return (zoomFactor * 100).toFixed(0);
};

const sheetZoom = function (sheet, value) {
    sheet.zoom(value / (window.devicePixelRatio || 1));
};
