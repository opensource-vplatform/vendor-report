import { getNamespace } from '../../../utils/spreadUtil';
import Plugin from '../Plugin';

class CellSubTotal extends Plugin {
    execute(value, tool) {
        debugger;
        const config = this.getConfig();
        const { functionNum, tableCode, fieldCode } = config;
        const unionDatasource = tool.getUnionDatasource();
        const isTreeSum = unionDatasource.isTreeSumField(tableCode,fieldCode);
        const count = tool.getDataCount(tableCode);
        const { row, col } = tool.getFieldIndex(tableCode, fieldCode);
        const GC = getNamespace();
        const Sheets = GC.Spread.Sheets;
        const Range = Sheets.Range;
        const CalcEngine = Sheets.CalcEngine;
        let ranges = [];
        if(isTreeSum){
            const index = tool.getDataIndex(tableCode,fieldCode);
            const indexs = unionDatasource.getLeafRanges(tableCode,index,index+count);
            indexs.forEach(ind=>{
                ranges.push(new Range(row+(ind-index), col, 1, 1));
            });
        }else{
            ranges.push(new Range(row, col, count, 1));
        }
        const allRelative =
            CalcEngine.RangeReferenceRelative.allRelative;
        const rangesToFormula = CalcEngine.rangesToFormula;
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
