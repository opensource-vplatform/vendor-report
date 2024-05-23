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
    pdf:['print.min.js','pdf.min.js'],
    excel:['excelio.min.js']
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

export function getExcelVersion(){
    const GC = getNamespace();
    return GC.Spread.Sheets.productInfo.productVersion;
}

export const getExcelBaseUrl = function(){
    const version = getExcelVersion();
    return `${getBaseUrl()}/vendor/excel/${version}`;
}

export const toExcelPluginUrl = function(filename){
    return `${getExcelBaseUrl()}/plugins/${filename}`;
}
