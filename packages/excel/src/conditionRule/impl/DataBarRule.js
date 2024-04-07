import Rule from './Rule';

class DataBarRule extends Rule {
    constructor(minType, minValue, maxType, maxValue, color) {
        this.minType = minType;
        this.minValue = minValue;
        this.maxType = maxType;
        this.maxValue = maxValue;
        this.color = color;
    }

    apply(row, rowCount, col, colCount) {
        const GC = getNamespace();
        const ranges = new GC.Spread.Sheets.Range(row, rowCount, col, colCount);
    }

    toJson() {
        return {
            _type: 'dataBarRule',
            minType: this.minType,
            minValue: this.minValue,
            maxType: this.maxType,
            maxValue: this.maxValue,
            color: this.color,
        };
    }
}

DataBarRule.fromJson = function (json) {
    const { minType, minValue, maxType, maxValue, color } = json;
    return new DataBarRule(minType, minValue, maxType, maxValue, color);
};

export default DataBarRule;
