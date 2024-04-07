import { getNamespace } from '../../utils/spreadUtil';

class Rule {
    bind(sheet) {
        this.sheet = sheet;
    }

    apply(row, rowCount, col, colCount) {}

    applySelections(selections){}

    getRuleType(ruleType) {
        const GC = getNamespace();
        return GC.Spread.Sheets.ConditionalFormatting.RuleType[ruleType];
    }

    getScaleValueType(type) {
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

    getDateOccurringType(type) {
        const GC = getNamespace();
        return GC.Spread.Sheets.ConditionalFormatting.DateOccurringType[type];
    }

    isTextComparison(type) {
        return ['contains'].indexOf(type) != -1;
    }

    getOperator(type) {
        const GC = getNamespace();
        if (this.isTextComparison(type)) {
            return GC.Spread.Sheets.ConditionalFormatting
                .TextComparisonOperators[type];
        }
        return GC.Spread.Sheets.ConditionalFormatting.ComparisonOperators[type];
    }

    toJson() {
        return {};
    }
}

export default Rule;
