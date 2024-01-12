/**
 * 获取命令空间
 */
export const getNamespace = function () {
    return window.GC;
};

export const withBatchCalcUpdate = function (spread, updateHandler) {
    if (spread) {
        spread.suspendPaint();
        spread.suspendCalcService();
        const sheet = spread.getActiveSheet();
        try {
            updateHandler(sheet);
        } finally {
            spread.resumeCalcService(false);
            spread.resumePaint();
        }
    }
};