import Rule from './Rule';
import { getNamespace } from '../../utils/spreadUtil';

class IconSetRule extends Rule {
    constructor(iconSetType) {
        super();
        this.iconSetType = iconSetType;
    }

    apply(row, rowCount, col, colCount) {
        const GC = getNamespace();
        const range = new GC.Spread.Sheets.Range(row, rowCount, col, colCount);
        this.applySelections([range]);
    }
    applySelections(selections) {
        const rule = new GC.Spread.Sheets.ConditionalFormatting.IconSetRule(
            this.getIconSetType(this.iconSetType),
            selections
        );
        this.sheet.conditionalFormats.addRule(rule);
    }

    toJson() {
        return {
            _type: 'iconSetRule',
            iconSetType: this.iconSetType,
        };
    }
}

IconSetRule.fromJson = function (json) {
    return new IconSetRule(json.iconSetType);
};

export default IconSetRule;
