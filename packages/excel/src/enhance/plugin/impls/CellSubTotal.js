import {
  div,
  max,
  sum,
} from '../../../utils/mathUtil';
import { getNamespace } from '../../../utils/spreadUtil';
import Plugin from '../Plugin';

class CellSubTotal extends Plugin {
    /**
     * 分组汇总
     * @param {*} value
     * @param {*} tool
     */
    groupSubTotal(value, tool) {
        const config = this.getConfig();
        const { functionNum, tableCode, fieldCode } = config;
        const unionDatasource = tool.getUnionDatasource();
        const values = this._isTreeSumField(value, tool)
            ? unionDatasource.getLeafFieldValues(tableCode, fieldCode)
            : unionDatasource.getFieldValues(tableCode, fieldCode);
        const filter = () => {
            const result = [];
            values.forEach((value) => {
                if (!isNaN(value)) {
                    result.push(parseFloat(value));
                }
            });
            return result;
        };
        let value = null;
        switch (functionNum) {
            case 101:
                //平均值
                value = div(sum(filter()), values.length);
                break;
            case 103:
                //计数
                value = values.length;
                break;
            case 102:
                //数值计数
                value = filter().length;
                break;
            case 104:
                //最大值
                value = max(filter());
                break;
            case 105:
                //最小值
                value = min(filter());
                break;
            case 109:
                //求和
                value = sum(filter());
        }
        return { type: 'text', value };
    }

    /**
     * 是否为属性汇总字段
     */
    _isTreeSumField(value, tool) {
        const config = this.getConfig();
        const { tableCode, fieldCode } = config;
        const unionDatasource = tool.getUnionDatasource();
        return unionDatasource.isTreeSumField(tableCode, fieldCode);
    }

    /**
     * 范围转换成公式参数
     * @param {*} ranges
     * @returns
     */
    _rangesToFormulaArgs(ranges) {
        const GC = getNamespace();
        const Sheets = GC.Spread.Sheets;
        const CalcEngine = Sheets.CalcEngine;
        const allRelative = CalcEngine.RangeReferenceRelative.allRelative;
        const rangesToFormula = CalcEngine.rangesToFormula;
        return rangesToFormula(ranges, 0, 0, allRelative, false);
    }

    /**
     * 获取汇总范围
     * @param {*} value
     * @param {*} tool
     * @returns
     */
    _getSubTotalRanges(value, tool) {
        const ranges = [];
        const unionDatasource = tool.getUnionDatasource();
        const config = this.getConfig();
        const { tableCode, fieldCode } = config;
        const count = tool.getDataCount(tableCode);
        const { row, col } = tool.getFieldIndex(tableCode, fieldCode);
        const GC = getNamespace();
        const Range = GC.Spread.Sheets.Range;
        if (this._isTreeSumField(value, tool)) {
            const index = tool.getDataIndex(tableCode, fieldCode);
            const indexs = unionDatasource.getLeafRanges(
                tableCode,
                index,
                index + count
            );
            indexs.forEach((ind) => {
                ranges.push(new Range(row + (ind - index), col, 1, 1));
            });
        } else {
            ranges.push(new Range(row, col, count, 1));
        }
        return ranges;
    }

    /**
     * 汇总
     * @param {*} value
     * @param {*} tool
     */
    subTotal(value, tool) {
        const ranges = this._getSubTotalRanges(value, tool);
        const config = this.getConfig();
        const { functionNum } = config;
        return {
            type: 'formula',
            value: `SUBTOTAL(${functionNum},${this._rangesToFormulaArgs(
                ranges
            )})`,
        };
    }

    execute(value, tool) {
        return tool.isInGroupSumArea()
            ? this.groupSubTotal(value, tool)
            : this.subTotal(value, tool);
    }
}

export default CellSubTotal;
