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
            this.minValue,
            this.getScaleValueType(this.maxType),
            this.maxValue,
            this.color,
            selections
        );
        rule.gradient(this.gradient);
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
    const { minType, minValue, maxType, maxValue, color, gradient } = json;
    return new DataBarRule(
        minType,
        minValue,
        maxType,
        maxValue,
        color,
        gradient
    );
};

export default DataBarRule;
