import { withBatchUpdate } from './spreadUtil';

export const insertRows = function (spread) {
    withBatchUpdate(spread, (sheet) => {
        const commandManager = spread.commandManager();
        commandManager.execute({
            cmd: 'gc.spread.contextMenu.insertRows',
            sheetName: sheet.name(),
            selections: sheet.getSelections(),
            activeRow: sheet && sheet.getActiveRowIndex(),
            activeCol: sheet && sheet.getActiveColumnIndex(),
        });
    });
};

export const insertColumns = function (spread) {
    withBatchUpdate(spread, (sheet) => {
        const commandManager = spread.commandManager();
        commandManager.execute({
            cmd: 'gc.spread.contextMenu.insertColumns',
            sheetName: sheet.name(),
            selections: sheet.getSelections(),
            activeRow: sheet && sheet.getActiveRowIndex(),
            activeCol: sheet && sheet.getActiveColumnIndex(),
        });
    });
};

export const deleteRows = function (spread) {
    withBatchUpdate(spread, (sheet) => {
        const commandManager = spread.commandManager();
        commandManager.execute({
            cmd: 'gc.spread.contextMenu.deleteRows',
            sheetName: sheet.name(),
            selections: sheet.getSelections(),
            activeRow: sheet && sheet.getActiveRowIndex(),
            activeCol: sheet && sheet.getActiveColumnIndex(),
        });
    });
};

export const deleteColumns = function (spread) {
    withBatchUpdate(spread, (sheet) => {
        const commandManager = spread.commandManager();
        commandManager.execute({
            cmd: 'gc.spread.contextMenu.deleteColumns',
            sheetName: sheet.name(),
            selections: sheet.getSelections(),
            activeRow: sheet && sheet.getActiveRowIndex(),
            activeCol: sheet && sheet.getActiveColumnIndex(),
        });
    });
};

export function getSortedColumnSelections(selections) {
    for (let i = 0; i < selections.length - 1; i++) {
        for (let j = i + 1; j < selections.length; j++) {
            if (selections[i].col < selections[j].col) {
                const selection = selections[i];
                selections[i] = selections[j];
                selections[j] = selection;
            }
        }
    }
    return selections;
}

export function getSortedRowSelections(selections) {
    for (let i = 0; i < selections.length - 1; i++) {
        for (let j = i + 1; j < selections.length; j++) {
            if (selections[i].row < selections[j].row) {
                const o = selections[i];
                selections[i] = selections[j];
                selections[j] = o;
            }
        }
    }
    return selections;
}
