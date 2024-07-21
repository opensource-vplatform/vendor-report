import { getNamespace } from './sheetUtil';

let _Sheet = null;

const getSheet = function () {
  if (_Sheet == null) {
    const GC = getNamespace();
    const spread = new GC.Spread.Sheets.Workbook();
    spread.addSheet(0);
    _Sheet = spread.getSheet(0);
  }
  return _Sheet;
};

export const evaluateFormula = function (
  formula,
  baseRow,
  baseColumn,
  useR1C1
) {
  const GC = getNamespace();
  return GC.Spread.Sheets.CalcEngine.evaluateFormula(
    getSheet(),
    formula,
    baseRow,
    baseColumn,
    useR1C1
  );
};

export const hasRange = function (formula) {
  const GC = getNamespace();
  const res = GC.Spread.Sheets.CalcEngine.formulaToRanges(getSheet(), formula);
  return res.length > 0;
};
