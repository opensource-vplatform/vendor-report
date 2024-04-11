import { getNamespace } from '../../utils/spreadUtil';
import Rule from './Rule';

class StateRule extends Rule {
    constructor(ruleType, state, style) {
        super();
        this.ruleType = ruleType;
        this.state = state;
        this.style = style;
    }

    apply(row, rowCount, col, colCount) {
        const GC = getNamespace();
        const range = new GC.Spread.Sheets.Range(row, rowCount, col, colCount);
        this.applySelections([range]);
    }

    applySelections(selections) {
        const rule = new GC.Spread.Sheets.ConditionalFormatting.StateRule(
            this.getRuleType(this.ruleType),
            this.getRowColumnState(this.state),
            this.getStyle(this.style),
            selections
        );
        this.sheet.conditionalFormats.addRule(rule);
    }

    toJson() {
        return {
            _type: 'stateRule',
            ruleType: this.ruleType,
            state: this.state,
            style: this.style,
        };
    }
}

StateRule.fromJson = function (json) {
    const { ruleType, state, style } = json;
    return new StateRule(ruleType, state, style);
};

export default StateRule;
