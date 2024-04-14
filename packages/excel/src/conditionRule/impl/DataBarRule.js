import Rule from './Rule';

class DataBarRule extends Rule {
    constructor(
        minType,
        minValue,
        maxType,
        maxValue,
        color,
        gradient,
        borderColor,
        showBarOnly,
        showBorder,
        dataBarDirection,
        useNegativeFillColor,
        negativeFillColor,
        useNegativeBorderColor,
        negativeBorderColor,
        axisColor,
        axisPosition,
        stopIfTrue
    ) {
        super();
        this.minType = minType;
        this.minValue = minValue;
        this.maxType = maxType;
        this.maxValue = maxValue;
        this.color = color;
        this.gradient = gradient;
        this.borderColor = borderColor;
        this.showBarOnly = showBarOnly;
        this.showBorder = showBorder;
        this.dataBarDirection = dataBarDirection;
        this.useNegativeFillColor = useNegativeFillColor;
        this.negativeFillColor = negativeFillColor;
        this.useNegativeBorderColor = useNegativeBorderColor;
        this.negativeBorderColor = negativeBorderColor;
        this.axisColor = axisColor;
        this.axisPosition = axisPosition;
        this.stopIfTrue = stopIfTrue;
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
        rule.showBarOnly(this.showBarOnly);
        rule.showBorder(this.showBorder);
        rule.dataBarDirection(this.getBarDirection(this.dataBarDirection));
        rule.useNegativeFillColor(this.useNegativeFillColor);
        rule.negativeFillColor(this.negativeFillColor);
        rule.useNegativeBorderColor(this.useNegativeBorderColor);
        rule.negativeBorderColor(this.negativeBorderColor);
        rule.axisColor(this.axisColor);
        rule.axisPosition(this.getDataBarAxisPosition(this.axisPosition));
        rule.stopIfTrue(this.stopIfTrue);
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
            borderColor: this.borderColor,
            showBarOnly: this.showBarOnly,
            showBorder: this.showBorder,
            dataBarDirection: this.dataBarDirection,
            useNegativeFillColor: this.useNegativeFillColor,
            negativeFillColor: this.negativeFillColor,
            useNegativeBorderColor: this.useNegativeBorderColor,
            negativeBorderColor: this.negativeBorderColor,
            axisColor: this.axisColor,
            axisPosition: this.axisPosition,
            stopIfTrue: this.stopIfTrue,
        };
    }
}

DataBarRule.fromJson = function (json) {
    const {
        minType,
        minValue,
        maxType,
        maxValue,
        color,
        gradient,
        borderColor,
        showBarOnly,
        showBorder,
        dataBarDirection,
        useNegativeFillColor,
        negativeFillColor,
        useNegativeBorderColor,
        negativeBorderColor,
        axisColor,
        axisPosition,
        stopIfTrue,
    } = json;
    return new DataBarRule(
        minType,
        minValue,
        maxType,
        maxValue,
        color,
        gradient,
        borderColor,
        showBarOnly,
        showBorder,
        dataBarDirection,
        useNegativeFillColor,
        negativeFillColor,
        useNegativeBorderColor,
        negativeBorderColor,
        axisColor,
        axisPosition,
        stopIfTrue
    );
};

export default DataBarRule;
