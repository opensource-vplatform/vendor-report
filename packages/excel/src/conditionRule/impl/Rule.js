import { isNullOrUndef } from '../../utils/objectUtils';
import { getNamespace } from '../../utils/spreadUtil';
import { getStyle } from '../utils';

class Rule {
    bind(sheet) {
        this.sheet = sheet;
    }

    apply(row, rowCount, col, colCount) {}

    applySelections(selections) {}

    getBarDirection(direction){
        const GC = getNamespace();
        return GC.Spread.Sheets.ConditionalFormatting.BarDirection[direction];
    }

    getDataBarAxisPosition(position){
        const GC = getNamespace();
        return GC.Spread.Sheets.ConditionalFormatting.DataBarAxisPosition[position];
    }

    getRuleType(ruleType) {
        const GC = getNamespace();
        return GC.Spread.Sheets.ConditionalFormatting.RuleType[ruleType];
    }

    getScaleValueType(type) {
        if (isNullOrUndef(type)) {
            return undefined;
        }
        const GC = getNamespace();
        return GC.Spread.Sheets.ConditionalFormatting.ScaleValueType[type];
    }

    getIconSetType(type) {
        const GC = getNamespace();
        return GC.Spread.Sheets.ConditionalFormatting.IconSetType[type];
    }

    getTop10Type(type) {
        const GC = getNamespace();
        return GC.Spread.Sheets.ConditionalFormatting.Top10ConditionType[type];
    }

    getAverageType(type) {
        const GC = getNamespace();
        return GC.Spread.Sheets.ConditionalFormatting.AverageConditionType[
            type
        ];
    }

    getDateOccurringType(type) {
        const GC = getNamespace();
        return GC.Spread.Sheets.ConditionalFormatting.DateOccurringType[type];
    }

    getDateOccurringType(type) {
        const GC = getNamespace();
        return GC.Spread.Sheets.ConditionalFormatting.DateOccurringType[type];
    }

    isTextComparison(type) {
        return ['contains'].indexOf(type) != -1;
    }

    getOperator(type) {
        if (isNullOrUndef(type)) {
            return undefined;
        }
        const GC = getNamespace();
        if (this.isTextComparison(type)) {
            return GC.Spread.Sheets.ConditionalFormatting
                .TextComparisonOperators[type];
        }
        return GC.Spread.Sheets.ConditionalFormatting.ComparisonOperators[type];
    }

    getStyle(style) {
        return getStyle(style);
    }

    getType(type) {
        if (isNullOrUndef(type)) {
            return undefined;
        }
        let res = this.getTop10Type(type);
        if (isNullOrUndef(res)) {
            res = this.getAverageType(type);
        }
        if (isNullOrUndef(res)) {
            res = this.getDateOccurringType(type);
        }
        return res;
    }

    toJson() {
        return {};
    }
}

export default Rule;
