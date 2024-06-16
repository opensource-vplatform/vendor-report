import { isNullOrUndef } from '@toone/report-util';

import { getNamespace } from '../../utils/spreadUtil';
import Rule from './Rule';

class IconSetRule extends Rule {
    constructor(
        iconSetType,
        showIconOnly,
        reverseIconOrder,
        iconCriteria,
        icons,
        stopIfTrue
    ) {
        super();
        this.iconSetType = iconSetType;
        this.showIconOnly = showIconOnly;
        this.reverseIconOrder = reverseIconOrder;
        this.iconCriteria = iconCriteria;
        this.icons = icons;
        this.stopIfTrue = stopIfTrue;
    }

    apply(row, rowCount, col, colCount) {
        const GC = getNamespace();
        const range = new GC.Spread.Sheets.Range(row, rowCount, col, colCount);
        this.applySelections([range]);
    }
    applySelections(selections) {
        const GC = getNamespace();
        const rule = new GC.Spread.Sheets.ConditionalFormatting.IconSetRule(
            this.getIconSetType(this.iconSetType),
            selections
        );
        if (!isNullOrUndef(this.showIconOnly)) {
            rule.showIconOnly(this.showIconOnly);
        }
        if (!isNullOrUndef(this.reverseIconOrder)) {
            rule.reverseIconOrder(this.reverseIconOrder);
        }
        if (!isNullOrUndef(this.iconCriteria)) {
            const criterias = rule.iconCriteria();
            const iconCriteria = [...this.iconCriteria].reverse();
            iconCriteria.map(
                (
                    { isGreaterThanOrEqualTo, iconValueType, iconValue },
                    index
                ) => {
                    criterias[index] =
                        new GC.Spread.Sheets.ConditionalFormatting.IconCriterion(
                            isGreaterThanOrEqualTo,
                            this.getIconValueType(iconValueType),
                            iconValue
                        );
                }
            );
        }
        if (!isNullOrUndef(this.icons)) {
            const icons = this.icons.map(({ iconSetType, iconIndex }) => {
                return {
                    iconSetType: this.getIconSetType(iconSetType),
                    iconIndex,
                };
            });
            rule.icons(icons);
        }
        rule.stopIfTrue(this.stopIfTrue);
        this.sheet.conditionalFormats.addRule(rule);
    }

    toJson() {
        return {
            _type: 'iconSetRule',
            iconSetType: this.iconSetType,
            showIconOnly: this.showIconOnly,
            reverseIconOrder: this.reverseIconOrder,
            iconCriteria: this.iconCriteria,
            icons: this.icons,
            stopIfTrue: this.stopIfTrue,
        };
    }
}

IconSetRule.fromJson = function (json) {
    const {
        iconSetType,
        showIconOnly,
        reverseIconOrder,
        iconCriteria,
        icons,
        stopIfTrue,
    } = json;
    return new IconSetRule(
        iconSetType,
        showIconOnly,
        reverseIconOrder,
        iconCriteria,
        icons,
        stopIfTrue
    );
};

export default IconSetRule;
