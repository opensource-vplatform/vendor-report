import Rule from './Rule';

class NormalConditionRule extends Rule {
    constructor(
        ruleType,
        style,
        operator,
        value1,
        value2,
        text,
        formula,
        type,
        rank
    ) {
        super();
        this.ruleType = ruleType;
        this.style = style;
        this.operator = operator;
        this.value1 = value1;
        this.value2 = value2;
        this.text = text;
        this.formula = formula;
        this.type = type;
        this.rank = rank;
    }

    apply(row, rowCount, col, colCount) {
        const GC = getNamespace();
        const range = new GC.Spread.Sheets.Range(row, rowCount, col, colCount);
        this.apply([range]);
    }

    applySelections(selections) {
        const rule =
            new GC.Spread.Sheets.ConditionalFormatting.NormalConditionRule(
                this.getRuleType(this.ruleType),
                selections,
                this.getStyle(this.style),
                this.getOperator(this.operator),
                this.value1,
                this.value2,
                this.text,
                this.formula,
                this.getType(this.type),
                this.rank
            );
        this.sheet.conditionalFormats.addRule(rule);
    }

    toJson() {
        return {
            _type: 'normalConditionRule',
            ruleType: this.ruleType,
            style: this.style,
            operator: this.operator,
            value1: this.value1,
            value2: this.value2,
            text: this.text,
            formula: this.formula,
            type: this.type,
            rank: this.rank,
        };
    }
}

NormalConditionRule.fromJson = function (json) {
    const {
        ruleType,
        style,
        operator,
        value1,
        value2,
        text,
        formula,
        type,
        rank,
    } = json;
    return new NormalConditionRule(
        ruleType,
        style,
        operator,
        value1,
        value2,
        text,
        formula,
        type,
        rank
    );
};

export default NormalConditionRule;
