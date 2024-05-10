import {
  getCatalogFormulaMap,
  getCatalogs,
  getFormulaMetadata,
  getFormulaMetadatas,
  getFormulasByCatalog,
} from '../metadatas/formula';
import { getSelectedChart } from './chartUtil';
import { getSelectedShapes } from './shapeUtil';
import { getSelectedSlicers } from './slicerUtil';
import {
  getNamespace,
  getSelectionType,
  SelectionTypes,
  withBatchCalcUpdate,
} from './spreadUtil';
import { getActiveIndexBySheet } from './worksheetUtil';

const CATALOG_MAP_FORMULA_METADATA = {};

const getAllFormulaMetadatas = function () {
    const formulaMetadatas = [];
    const metadatas = getFormulaMetadatas();
    for (let [code, metadata] of Object.entries(metadatas)) {
        formulaMetadatas.push({
            ...metadata,
            code,
        });
    }
    return formulaMetadatas;
};

const getFormulaMetadatasWithCatalog = function (catalog) {
    const formulaMetadatas = [];
    const formlaCodes = getFormulasByCatalog(catalog);
    if (formlaCodes && formlaCodes.length > 0) {
        formlaCodes.forEach((code) => {
            const metadata = getFormulaMetadata(code);
            if (metadata) {
                formulaMetadatas.push({
                    ...metadata,
                    code,
                });
            }
        });
    }
    return formulaMetadatas;
};

export const getFormulaMetadatasByCatalog = function (catalog) {
    let cache = CATALOG_MAP_FORMULA_METADATA[catalog];
    if (!cache) {
        let formulaMetadatas = [];
        if (catalog == 'all') {
            formulaMetadatas = getAllFormulaMetadatas();
        } else if (catalog == 'recent') {
            formulaMetadatas = getRecentFormulaMetadatas();
        } else {
            formulaMetadatas = getFormulaMetadatasWithCatalog(catalog);
        }
        cache = formulaMetadatas;
        CATALOG_MAP_FORMULA_METADATA[catalog] = cache;
    }
    return cache;
};

const RECENT_FORMULA_STORAGE_KEY = 'TOONE_REPORT_RECENT_FORMULA_STORAGE_KEY';
const getFormulasFromStorage = function () {
    let formulas = localStorage.getItem(RECENT_FORMULA_STORAGE_KEY);
    try {
        formulas = formulas == null ? [] : JSON.parse(formulas);
    } catch (e) {
        formulas = [];
    }
    return formulas;
};

/**
 * 获取最近使用的函数
 */
export const getRecentFormulaMetadatas = function () {
    const formulas = getFormulasFromStorage();
    const formulaMetadatas = [];
    for (let index = 0; index < formulas.length; index++) {
        const code = formulas[index];
        const metadata = getFormulaMetadata(code);
        if (metadata) {
            formulaMetadatas.push({
                ...metadata,
                code,
            });
        }
        if (formulaMetadatas.length == 10) {
            break;
        }
    }
    return formulaMetadatas;
};

/**
 * 更新最新使用的函数
 * @param {*} code
 */
export const updateRecentFormula = function (code) {
    let formulas = getFormulasFromStorage();
    const index = formulas.indexOf(code);
    if (index != -1) {
        formulas.splice(index, 1);
    }
    formulas.splice(0, 0, code);
    localStorage.setItem(RECENT_FORMULA_STORAGE_KEY, JSON.stringify(formulas));
};

export const getCatalogByFormula = function (formula) {
    const metadata = getFormulaMetadata(formula);
    if (metadata) {
        return metadata.catalog;
    }
    return null;
};

const hasCatalog = function (catalog) {
    const catalogs = getCatalogs();
    for (let index = 0; index < catalogs.length; index++) {
        const item = catalogs[index];
        if (item.code == catalog) {
            return true;
        }
    }
    return false;
};

export const filterFormula = function (filter, skips = []) {
    const metadatas = getFormulaMetadatas();
    let formula = null,
        catalog = null;
    for (let [code, metadata] of Object.entries(metadatas)) {
        if (
            skips.indexOf(code) == -1 &&
            (code.indexOf(filter) != -1 || metadata.desc.indexOf(filter) != -1)
        ) {
            formula = code;
            break;
        }
    }
    if (formula != null) {
        const map = getCatalogFormulaMap(formula);
        for (let [catalog1, formlaCodes] of Object.entries(map)) {
            if (formlaCodes.indexOf(formula) != -1 && hasCatalog(catalog1)) {
                catalog = catalog1;
                break;
            }
        }
    }
    if (formula != null && catalog != null) {
        return { formula, catalog };
    }
    return null;
};

const isNumber = function (val) {
    return 'number' == typeof val;
};

const calculateRange = function (flag, selection, sheet) {
    let row,
        col,
        flag1 = false;
    if (false === flag) {
        for (let i = selection.row - 1; 0 <= i; i--) {
            const value = sheet.getValue(i, selection.col);
            if (isNumber(value)) {
                flag1 = true;
                if (0 === i) {
                    row = 0;
                }
            } else if (flag1 && !isNumber(value)) {
                row = i + 1;
                break;
            }
        }
    }
    if (!flag1)
        for (let i = selection.col - 1; 0 <= i; i--) {
            const value = sheet.getValue(selection.row, i);
            if (isNumber(value)) {
                flag1 = true;
                if (i === 0) {
                    col = 0;
                }
            } else if (flag1 && !isNumber(value)) {
                col = i + 1;
                break;
            }
        }
    return {
        row,
        col,
        rowCount: 1,
        colCount: 1,
    };
};

const cellRangeInflate = function (spans, rang) {
    for (let index = 0, len = spans && spans.length; index < len; index++) {
        const span = spans[index];
        if (rang.intersect(span.row, span.col, span.rowCount, span.colCount)) {
            spans.splice(index, 1);
            return cellRangeInflate(spans, rang.union(span));
        }
    }
    return rang;
};

const calculateValidRange = function (row, col, rowCount, colCount, sheet) {
    let row1 = row,
        col1 = col,
        rowCount1 = rowCount,
        colCount1 = colCount;
    if (-1 !== row1 && -1 !== col1) {
        const spans = sheet.getSpans();
        if (spans && spans.length > 0) {
            const GC = getNamespace();
            const rang = cellRangeInflate(
                spans,
                new GC.Spread.Sheets.Range(row, col, rowCount, colCount)
            );
            row1 = rang.row;
            col1 = rang.col;
            rowCount1 = rang.rowCount;
            colCount1 = rang.colCount;
        }
    }
    return {
        row: row1,
        col: col1,
        rowCount: rowCount1,
        colCount: colCount1,
    };
};

const getStartRangeDirection = function (selection, sheet, value, value1) {
    const { row, col } = selection;
    let flag = false;
    for (let index = col - 1; 0 <= index; index--) {
        var s = sheet.getValue(row, index);
        if (sheet.getFormula(row, index)) break;
        if (isNumber(s)) {
            flag = !0;
            break;
        }
    }
    let flag1 = false;
    for (let index = row - 1; 0 <= index; index--) {
        s = sheet.getValue(index, col);
        if (sheet.getFormula(index, col)) {
            flag1 = !0;
            break;
        }
        if (isNumber(s)) break;
    }
    let result = false;
    if ((isNumber(value) && !isNumber(value1)) || (flag && flag1)) {
        result = true;
    }
    return result;
};

/**
 * 获取公式范围
 * @param {*} selection
 */
const getFormulaRange = function (selection, sheet) {
    const { row, col } = selection;
    const value = sheet.getValue(row, col - 1);
    const value1 = sheet.getValue(row - 1, col);
    const direction = getStartRangeDirection(selection, sheet, value, value1);
    const rang = calculateRange(direction, selection, sheet);
    const rangRow = rang.row;
    const rangCol = rang.col;
    if (undefined === rangCol || undefined === rangRow) {
        if (undefined === rangCol && undefined === rangRow) {
            return selection;
        }
        if (undefined !== rangCol) {
            return calculateValidRange(
                row,
                rangCol,
                rang.rowCount,
                col - rangCol,
                sheet
            );
        }
        return calculateValidRange(
            rangRow,
            col,
            row - rangRow,
            rang.colCount,
            sheet
        );
    }
};

const setWholeRowFormula = function (
    flag,
    rowEnd,
    selection,
    formula,
    sheet,
    spread
) {
    const { row, rowCount, col, colCount } = selection;
    const rowIndex = flag ? rowEnd : rowEnd + 1;
    const GC = getNamespace();
    const r1c1Style =
        GC.Spread.Sheets.ReferenceStyle.r1c1 === spread.options.referenceStyle;
    const allRelative =
        GC.Spread.Sheets.CalcEngine.RangeReferenceRelative.allRelative;
    const rangeToFormula = GC.Spread.Sheets.CalcEngine.rangeToFormula;
    for (let index = col, end = col + colCount; index < end; index++) {
        const rang = {
            col: index,
            colCount: 1,
            row: row,
            rowCount: rowCount + (flag ? -1 : 0),
        };
        const formulaArgs = rangeToFormula(
            rang,
            rowIndex,
            index,
            allRelative,
            r1c1Style
        );
        const formulaText = '=' + formula + '(' + formulaArgs + ')';
        sheet.setFormula(rowIndex, index, formulaText);
    }
};

const setWholeColFormula = function (
    colEnd,
    selection,
    formula,
    sheet,
    spread
) {
    const { row, rowCount, col, colCount } = selection;
    const GC = getNamespace();
    const r1c1Style =
        GC.Spread.Sheets.ReferenceStyle.r1c1 === spread.options.referenceStyle;
    const allRelative =
        GC.Spread.Sheets.CalcEngine.RangeReferenceRelative.allRelative;
    const rangeToFormula = GC.Spread.Sheets.CalcEngine.rangeToFormula;
    for (let index = row, end = row + rowCount; index < end; index++) {
        const rang = {
            col,
            colCount: colCount - 1,
            row: index,
            rowCount: 1,
        };
        const formulaArgs = rangeToFormula(
            rang,
            index,
            colEnd - 1,
            allRelative,
            r1c1Style
        );
        const formulaText = '=' + formula + '(' + formulaArgs + ')';
        sheet.setFormula(index, colEnd, formulaText);
    }
};

const setMultiRowColRangeFormula = function (
    selection,
    formula,
    sheet,
    spread
) {
    const { row, rowCount, col, colCount } = selection;
    const rowEnd = row + rowCount - 1;
    const colEnd = col + colCount - 1;
    let flag = true,
        flag1 = true;
    for (let index = col, end = col + colCount; index < end; index++) {
        if (sheet.getValue(rowEnd, index)) {
            flag = false;
            break;
        }
    }
    for (let index = row, end = row + rowCount; index < end; index++) {
        if (sheet.getValue(index, colEnd)) {
            flag1 = false;
            break;
        }
    }
    if (flag1) {
        if (flag || !flag1) {
            setWholeRowFormula(flag, rowEnd, selection, formula, sheet, spread);
        }
        setWholeColFormula(colEnd, selection, formula, sheet, spread);
    } else {
        setWholeRowFormula(flag, rowEnd, selection, formula, sheet, spread);
    }
};

/**
 * 根据选择区域设置公式
 * @param {*} selection
 * @param {*} formula
 * @param {*} sheet
 * @param {*} spread
 */
const setFormulaBySelection = function (selection, formula, sheet, spread) {
    const { row, rowCount, col, colCount } = selection;
    const span = sheet.getSpan(row, col);
    const isSpan = span && span.equals(selection);
    const GC = getNamespace();
    const rangeToFormula = GC.Spread.Sheets.CalcEngine.rangeToFormula;
    const allRelative =
        GC.Spread.Sheets.CalcEngine.RangeReferenceRelative.allRelative;
    const r1c1Style =
        GC.Spread.Sheets.ReferenceStyle.r1c1 === spread.options.referenceStyle;
    if ((1 === colCount && 1 === rowCount) || isSpan) {
        let formulaArgs = '';
        let flag = true;
        const rang = getFormulaRange(selection, sheet);
        if (rang) {
            if (
                1 === rang.rowCount &&
                1 === rang.colCount &&
                rang.row === row &&
                rang.col === col
            ) {
                flag = false;
            } else {
                formulaArgs = rangeToFormula(
                    rang,
                    row,
                    col,
                    allRelative,
                    r1c1Style
                );
            }
        }
        const formulaText = '=' + formula + '(' + formulaArgs + ')';
        sheet.inputFormulaAndSelectFormulaRange(row, col, flag, formulaText);
    } else if (1 === colCount) {
        const rowEnd = row + rowCount - 1;
        if (sheet.getText(rowEnd, col)) {
            if (rowEnd + 1 < sheet.getRowCount()) {
                const formulaText =
                    '=' +
                    formula +
                    '(' +
                    rangeToFormula(
                        selection,
                        rowEnd + 1,
                        col,
                        allRelative,
                        r1c1Style
                    ) +
                    ')';
                sheet.setFormula(rowEnd + 1, col, formulaText);
            }
        } else {
            const rang = {
                row,
                col,
                colCount,
                rowCount: rowCount - 1,
            };
            const formulaText =
                '=' +
                formula +
                '(' +
                rangeToFormula(rang, rowEnd, col, allRelative, r1c1Style) +
                ')';
            sheet.setFormula(rowEnd, col, formulaText);
        }
    } else if (1 === rowCount) {
        const colEnd = col + colCount - 1;
        if (sheet.getText(row, colEnd)) {
            if (colEnd + 1 < sheet.getColumnCount()) {
                const formulaText =
                    '=' +
                    formula +
                    '(' +
                    rangeToFormula(
                        selection,
                        row,
                        colEnd + 1,
                        allRelative,
                        r1c1Style
                    ) +
                    ')';
                sheet.setFormula(row, colEnd + 1, formulaText);
            }
        } else {
            const rang = {
                row,
                col,
                colCount: colCount - 1,
                rowCount,
            };
            const formulaText =
                '=' +
                formula +
                '(' +
                rangeToFormula(rang, row, colEnd, allRelative, r1c1Style) +
                ')';
            sheet.setFormula(row, colEnd, formulaText);
        }
    } else {
        setMultiRowColRangeFormula(selection, formula, sheet, spread);
    }
};

/**
 * 设置自动计算公式到选中单元格
 * @param {*} spread
 * @param {*} formula
 */
export const setAutoFormula = function (spread, formula) {
    withBatchCalcUpdate(spread, (sheet) => {
        const selections = sheet.getSelections();
        if (getSelectionType(selections) === SelectionTypes.OnlyCells) {
            const sheetRowCount = sheet.getRowCount();
            let firstSelectRow, firstSelectCol;
            for (let i = 0, len = selections.length; i < len; i++) {
                const selection = selections[i];
                const { row, rowCount, col, colCount } = selection;
                if (i === 0) {
                    firstSelectCol = col;
                    firstSelectRow = row;
                }
                if (!(row + rowCount > sheetRowCount)) {
                    const table = sheet.tables.find(
                        firstSelectRow,
                        firstSelectCol
                    );
                    if (table) {
                        const range = table.dataRange();
                        row === range.row &&
                            rowCount === range.rowCount &&
                            col + colCount <= range.col + range.colCount &&
                            (table.showFooter() || table.showFooter(true));
                    }
                    try {
                        setFormulaBySelection(
                            selection,
                            formula,
                            sheet,
                            spread
                        );
                    } catch (e) {}
                }
            }
        }
    });
};

export const parseFormulaSparkline = function (spread, sheet, row, col, formula) {
    if (!sheet) {
        return null;
    }
    formula = formula || sheet.getFormula(row, col);
    if (!formula) {
        return null;
    }
    const service = sheet.getCalcService();
    const GC = getNamespace();
    try {
        const res = service.parse(null, formula, row, col);
        if (res.type === GC.Spread.CalcEngine.ExpressionType.function) {
            const funcName = res.functionName;
            if (funcName && spread.getSparklineEx(funcName)) {
                return res;
            }
        }
    } catch (e) {}
    return null;
};

export const isFormulaSparklineSelected = function (spread, sheet) {
    let result = false;
    if (sheet) {
        const slicer = getSelectedSlicers(sheet)[0];
        const chart = getSelectedChart(sheet);
        const shape = getSelectedShapes(sheet)[0];
        const plugin = slicer || chart || shape;
        const {row,col} = getActiveIndexBySheet(sheet);
        //const selections = sheet.getSelections();
        //if (selections && selections.length >= 1) {
        let flag = false;
        const res = parseFormulaSparkline(spread, sheet, row, col);
        if (
            res &&
            [
                'BC_QRCODE',
                'BC_EAN13',
                'BC_EAN8',
                'BC_CODABAR',
                'BC_CODE39',
                'BC_CODE93',
                'BC_CODE128',
                'BC_GS1_128',
                'BC_CODE49',
                'BC_PDF417',
                'BC_DATAMATRIX',
            ].indexOf(res.functionName) === -1
        ) {
            flag = true;
        }
        result = flag && !plugin;
        //}
        return result;
    }
    return result;
};
