import {
  getNamespace,
  withBatchUpdate,
} from './spreadUtil';

const GC = getNamespace();

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

export class BindingPathCellType extends GC.Spread.Sheets.CellTypes.Text {
    constructor() {
        super();
    }

    paint(ctx, value, x, y, w, h, style, context) {
        if (value === null || value === undefined) {
            let sheet = context.sheet,
                row = context.row,
                col = context.col;
            if (sheet && (row === 0 || !!row) && (col === 0 || !!col)) {
                let bindingPath = sheet.getBindingPath(
                    context.row,
                    context.col
                );
                if (bindingPath) {
                    value = '[' + bindingPath + ']';
                }
            }
        }
        super.paint(ctx, value, x, y, w, h, style, context);
    }
}

export function formatBindingPathCellType(sheet) {
    const dataTable = sheet.toJSON().data.dataTable;
    if (!dataTable) {
        return;
    }
    sheet.suspendPaint();
    const bindingPathCellType = new BindingPathCellType();
    Object.entries(dataTable).forEach(([rowStr, colValue]) => {
        const row = Number(rowStr);
        Object.entries(colValue).forEach(([colStr, { bindingPath }]) => {
            if (bindingPath) {
                const col = Number(colStr);
                sheet.getCell(row, col).cellType(bindingPathCellType);
            }
        });
    });
    sheet.resumePaint();
}
