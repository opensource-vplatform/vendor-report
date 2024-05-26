import { registerCellType, registerFuncs } from './custom';
import { EVENTS, bind } from './event/EventManager';

export const init = function () {
    bind({
        event: EVENTS.OnSpreadInited,
        handler: function (spread) {
            //注册自定义函数
            registerFuncs(spread);
        },
    });
    bind({
        event: EVENTS.OnSpreadJsonParsed,
        handler: function (spread) {
            //必须每次都注册，否则spread填充json后，自定义函数注册被清空
            registerFuncs(spread);
            //重新进行公式计算
            const sheets = spread.sheets;
            if (sheets && sheets.length > 0) {
                sheets.forEach((sheet) => {
                    sheet.recalcAll(true);
                });
            }
        },
    });
    bind({
        event: EVENTS.OnSheetInited,
        handler: function (sheet) {
            sheet.options.sheetAreaOffset = {
                left: 1,
                top: 1,
            };
            registerCellType(sheet);
        },
    });
};
