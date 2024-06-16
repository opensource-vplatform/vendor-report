import { isNullOrUndef } from '@toone/report-util';

import {
  getNamespace,
  withBatchCalcUpdate,
} from './spreadUtil';
import { getActiveIndexBySheet } from './worksheetUtil';

class FormulaTextBox {
    spread = null;

    btnStatusRefresh = null;

    hostSheet = null;

    instance = null;

    hostCol = null;

    hostRow = null;

    constructor(el, spread, btnStatusRefresh) {
        this.spread = spread;
        this.hostSheet = this.spread.getActiveSheet();
        this.btnStatusRefresh = btnStatusRefresh;
        const GC = getNamespace();
        this.instance = new GC.Spread.Sheets.FormulaTextBox.FormulaTextBox(el);
        this.instance.workbook(spread);
        this._bindEvents();
    }

    _bindEvents() {
        const activeSheet = this.spread.getActiveSheet();
        activeSheet.bind(
            GC.Spread.Sheets.Events.EditStarting,
            (sender, { row, col, sheet }) => {
                this.hostCol = col;
                this.hostRow = row;
                let text = '';
                const info = sheet.getFormulaInformation(row, col);
                const cell = sheet.getCell(row, col);
                if (info && info.hasFormula) {
                    text = '=' + info.formula;
                } else {
                    const value = cell.value();
                    if (value != null) {
                        text = value + '';
                    }
                }
                this.preText = text;
                this.preFormula = cell.formula();
                this.hostSheet = sheet.name();
            }
        );
    }

    _getCurrentText() {
        return this.instance.text();
    }

    updateButtonStatus() {
        this.btnStatusRefresh();
    }

    getPreText() {
        return this.preText;
    }

    getCurrentEditingText() {
        return this.instance.text();
    }

    cancel() {
        withBatchCalcUpdate(this.spread, () => {
            const sheet = isNullOrUndef(this.hostSheet)
                ? this.spread.getActiveSheet()
                : this.spread.getSheetFromName(this.hostSheet);
            if (sheet) {
                const cell = sheet.getCell(this.hostRow, this.hostCol);
                const preText = this.getPreText();
                const current = this.getCurrentEditingText();
                if (cell) {
                    if (current === preText) {
                        this.updateButtonStatus(sheet);
                        this.spread.focus(true);
                        return;
                    }
                    cell.value(this.preText);
                    cell.formula(this.preFormula);
                    const cellType = sheet.getCellType(this.hostRow, this.hostCol);
                    if (cellType && cellType.setEditorValue) {
                        cellType.setEditorValue(
                            cellType.getEditingElement(),
                            preText
                        );
                    }
                    if (
                        this.spread.getActiveSheet().name() !== this._sheetName
                    ) {
                        sheet.endEdit();
                        this.spread.setActiveSheet(this._sheetName);
                    }
                    this.updateButtonStatus(sheet);
                } else {
                    this.updateButtonStatus(sheet);
                }
            }
            this.spread.focus(true);
        });
    }

    commit() {
        withBatchCalcUpdate(this.spread, () => {
            let sheet = isNullOrUndef(this.hostSheet)
                ? this.spread.getActiveSheet()
                : this.spread.getSheetFromName(this.hostSheet);
            if (sheet) {
                let row = undefined;
                let col = undefined;
                if (isNullOrUndef(this.hostRow) || isNullOrUndef(this.hostCol)) {
                    const index = getActiveIndexBySheet(sheet);
                    row = index.row;
                    col = index.col;
                } else {
                    row = this.hostRow;
                    col = this.hostCol;
                }
                const cell = sheet.getCell(row, col);
                if (cell == null) {
                    this.spread.focus(true);
                    return;
                }
                const preText = this.getPreText();
                const current = this.getCurrentEditingText();
                if (current !== preText) {
                    if (current && current !== '') {
                        if (current.startsWith('=')) {
                            const options = {
                                cmd: 'editCell',
                                sheetName: cell.sheet.name(),
                                row: cell.row,
                                col: cell.col,
                                newValue: current,
                                autoFormat: true,
                            };
                            this.spread.commandManager().execute(options);
                        }
                        if (this._hasError) {
                            this._hasError = false;
                            this.spread.focus(true);
                            return;
                        }
                    } else {
                        cell.value('');
                        const options = {
                            cmd: 'editCell',
                            sheetName: cell.sheet.name(),
                            row: cell.row,
                            col: cell.col,
                            newValue: '',
                            autoFormat: true,
                        };
                        this.spread.commandManager().execute(options);
                    }
                }
                this.updateButtonStatus(sheet);
                this.preText = cell.value();
                this.preFormula = cell.formula();
                if (this.hostSheet !== this.spread.getActiveSheet().name()) {
                    this.spread.setActiveSheet(this.hostSheet);
                }
            }
            this.spread.focus(true);
        });
    }

    refresh() {
        if (this.instance) {
            withBatchCalcUpdate(this.spread, () => {
                const sheet = this.spread.getSheetFromName(this.hostSheet);
                this.instance.refresh();
                this.spread.focus(false);
            });
        }
    }

    destroy() {
        this.instance.destroy();
    }
}

export default FormulaTextBox;
