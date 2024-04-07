import Rule from './Rule';
import { getNamespace } from '../../utils/spreadUtil';

class ScaleRule extends Rule {
    constructor(
        ruleType,
        minType,
        minValue,
        minColor,
        midType,
        midValue,
        midColor,
        maxType,
        maxValue,
        maxColor
    ) {
        super();
        this.ruleType = ruleType;
        this.minType = minType;
        this.minValue = minValue;
        this.minColor = minColor;
        this.midType = midType;
        this.midValue = midValue;
        this.midColor = midColor;
        this.maxType = maxType;
        this.maxValue = maxValue;
        this.maxColor = maxColor;
    }

    apply(row, rowCount, col, colCount) {
        const GC = getNamespace();
        const range = new GC.Spread.Sheets.Range(row, rowCount, col, colCount);
        this.applySelections([range]);
    }

    applySelections(selections) {
        const rule = new GC.Spread.Sheets.ConditionalFormatting.ScaleRule(
            this.getRuleType(this.ruleType),
            this.getScaleValueType(this.minType),
            this.minValue,
            this.minColor,
            this.getScaleValueType(this.midType),
            this.midValue,
            this.midColor,
            this.getScaleValueType(this.maxType),
            this.maxValue,
            this.maxColor,
            selections
        );
        this.sheet.conditionalFormats.addRule(rule);
    }

    toJson() {
        return {
            _type: 'scaleRule',
            ruleType: this.ruleType,
            minType: this.minType,
            minValue: this.minValue,
            minColor: this.minColor,
            midType: this.midType,
            midValue: this.midValue,
            midColor: this.midColor,
            maxType: this.maxType,
            maxValue: this.maxValue,
            maxColor: this.maxColor,
        };
    }
}

ScaleRule.fromJson = function (json) {
    const {
        ruleType,
        minType,
        minValue,
        minColor,
        midType,
        midValue,
        midColor,
        maxType,
        maxValue,
        maxColor,
    } = json;
    return new ScaleRule(
        ruleType,
        minType,
        minValue,
        minColor,
        midType,
        midValue,
        midColor,
        maxType,
        maxValue,
        maxColor
    1);
};

export default ScaleRule;
