import {
  EVENTS,
  fire,
} from '@event/EventManager';

export const fireCellEnter = function (spread) {
    const sheet = spread.getActiveSheet();
    if (sheet) {
        const col = sheet.getActiveColumnIndex();
        const row = sheet.getActiveRowIndex();
        const sheetName = sheet.name();
        const arg = { row, col, sheet, sheetName };
        fire({
            event: EVENTS.EnterCell,
            args: [arg],
        });
    }
};
