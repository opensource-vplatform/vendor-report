import { getNamespace } from '../../utils/spreadUtil';
import Plugin from '../Plugin';

class CellSubTotal extends Plugin {
    execute(value, tool) {
        debugger;
        const config = this.getConfig();
        const { functionNum, tableCode, fieldCode } = config;
        const { row, col } = tool.getFieldIndex(tableCode, fieldCode);
        const count = tool.getDataCount(tableCode);
        const GC = getNamespace();
        /*const r1c1Style =
            GC.Spread.Sheets.ReferenceStyle.r1c1 ===
            spread.options.referenceStyle;*/
        const allRelative =
            GC.Spread.Sheets.CalcEngine.RangeReferenceRelative.allRelative;
        const rangesToFormula = GC.Spread.Sheets.CalcEngine.rangesToFormula;
        const ranges = [new GC.Spread.Sheets.Range(row, col, count, 1)];
        return {
            type: 'formula',
            value: `SUBTOTAL(${functionNum},${rangesToFormula(
                ranges,
                0,
                0,
                allRelative,
                false
            )})`,
        };
    }
}

export default CellSubTotal;
