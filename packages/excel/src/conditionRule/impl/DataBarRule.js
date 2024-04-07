import Rule from './Rule';

class DataBarRule extends Rule {
    constructor(minType, minValue, maxType, maxValue, color, gradient) {
        super();
        this.minType = minType;
        this.minValue = minValue;
        this.maxType = maxType;
        this.maxValue = maxValue;
        this.color = color;
        this.gradient = gradient;
    }

    apply(row, rowCount, col, colCount) {
        const GC = getNamespace();
        const range = new GC.Spread.Sheets.Range(row, rowCount, col, colCount);
        this.applySelections([range]);
    }

    applySelections(selections) {
        const rule = new GC.Spread.Sheets.ConditionalFormatting.DataBarRule(
            this.getScaleValueType(this.minType),
            minValue,
            this.getScaleValueType(this.maxType),
            maxValue,
            style,
            selections
        );
        rule.gradient(gradient);
        this.sheet.conditionalFormats.addRule(rule);
    }

    toJson() {
        return {
            _type: 'dataBarRule',
            minType: this.minType,
            minValue: this.minValue,
            maxType: this.maxType,
            maxValue: this.maxValue,
            color: this.color,
            gradient: this.gradient,
        };
    }
}

DataBarRule.fromJson = function (json) {
    const { minType, minValue, maxType, maxValue, color } = json;
    return new DataBarRule(minType, minValue, maxType, maxValue, color);
};

export default DataBarRule;
