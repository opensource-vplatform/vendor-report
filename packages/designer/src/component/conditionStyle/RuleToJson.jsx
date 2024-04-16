import { getNamespace } from '@utils/spreadUtil';

import {
  dataBarDirectionToName,
  iconSetTypeToName,
  iconValueTypeToName,
  operatorToName,
  rowColumnStateToName,
  ruleTypeToName,
  scaleValueToName,
  typeToName,
} from './metadata';

const styleToJson = function (style) {
    return style.toJSON();
};

export const rangesToJson = function (ranges) {
    const result = [];
    if (ranges && ranges.length > 0) {
        ranges.forEach((range) => {
            const { row, col, rowCount, colCount } = range;
            result.push({
                row,
                col,
                rowCount,
                colCount,
            });
        });
    }
    return result;
};

export const jsonToRanges = function (json) {
    const ranges = [];
    if (json && json.length > 0) {
        const GC = getNamespace();
        const Range = GC.Spread.Sheets.Range;
        json.forEach(({ row, col, rowCount, colCount }) => {
            ranges.push(new Range(row, col, rowCount, colCount));
        });
    }
    return ranges;
};

const normalConditionRuleToJson = function (rule) {
    const ruleType = rule.ruleType();
    return {
        _type: 'normalConditionRule',
        ruleType: ruleTypeToName(ruleType),
        operator: operatorToName(ruleType, rule.operator()),
        style: styleToJson(rule.style()),
        value1: rule.value1(),
        value2: rule.value2(),
        text: rule.text(),
        formula: rule.formula(),
        type: typeToName(ruleType, rule.type()),
        rank: rule.rank(),
        stopIfTrue: rule.stopIfTrue(),
        ranges: rangesToJson(rule.ranges()),
    };
};

const dataBarRuleToJson = function (rule) {
    const ruleType = rule.ruleType();
    return {
        _type: 'dataBarRule',
        ruleType: ruleTypeToName(ruleType),
        minType: scaleValueToName(rule.minType()),
        minValue: rule.minValue(),
        maxType: scaleValueToName(rule.maxType()),
        maxValue: rule.maxValue(),
        color: rule.color(),
        gradient: rule.gradient(),
        borderColor: rule.borderColor(),
        showBarOnly: rule.showBarOnly(),
        showBorder: rule.showBorder(),
        dataBarDirection: dataBarDirectionToName(rule.dataBarDirection()),
        useNegativeFillColor: rule.useNegativeFillColor(),
        negativeFillColor: rule.negativeFillColor(),
        useNegativeBorderColor: rule.useNegativeBorderColor(),
        negativeBorderColor: rule.negativeBorderColor(),
        axisColor: rule.axisColor(),
        axisPosition: rule.axisPosition(),
        ranges: rangesToJson(rule.ranges()),
    };
};

const iconCriteriaToJson = function (iconCriteria) {
    const result = [];
    if (iconCriteria && iconCriteria.length > 0) {
        iconCriteria.forEach(
            ({ isGreaterThanOrEqualTo, iconValueType, iconValue }) => {
                const {} = result.push({
                    isGreaterThanOrEqualTo,
                    iconValue,
                    iconValueType: iconValueTypeToName(iconValueType),
                });
            }
        );
    }
    return result;
};

const iconsToJson = function (icons) {
    const result = [];
    if (icons && icons.length > 0) {
        icons.forEach(({ iconIndex, iconSetType }) => {
            result.push({
                iconIndex,
                iconSetType: iconSetTypeToName(iconSetType),
            });
        });
    }
    return result;
};

const iconSetRuleToJson = function (rule) {
    const ruleType = rule.ruleType();
    return {
        _type: 'iconSetRule',
        ruleType: ruleTypeToName(ruleType),
        iconSetType: iconSetTypeToName(rule.iconSetType()),
        showIconOnly: rule.showIconOnly(),
        reverseIconOrder: rule.reverseIconOrder(),
        iconCriteria: iconCriteriaToJson(rule.iconCriteria()),
        icons: iconsToJson(rule.icons()),
        ranges: rangesToJson(rule.ranges()),
    };
};

const scaleRuleToJson = function (rule) {
    const ruleType = rule.ruleType();
    return {
        _type: 'scaleRule',
        ruleType: ruleTypeToName(rule.ruleType()),
        minType: scaleValueToName(rule.minType()),
        minValue: rule.minValue(),
        minColor: rule.minColor(),
        midType: scaleValueToName(rule.midType()),
        midValue: rule.midValue(),
        midColor: rule.midColor(),
        maxType: scaleValueToName(rule.maxType()),
        maxValue: rule.maxValue(),
        maxColor: rule.maxColor(),
        ranges: rangesToJson(rule.ranges()),
    };
};

const stateRuleToJson = function (rule) {
    const ruleType = rule.ruleType();
    return {
        _type: 'stateRule',
        ruleType: ruleTypeToName(ruleType),
        state: rowColumnStateToName(rule.state()),
        style: styleToJson(rule.style()),
        ranges: rangesToJson(rule.ranges()),
        stopIfTrue: rule.stopIfTrue(),
    };
};

export const toJson = function (rule) {
    const ruleType = rule.ruleType();
    const GC = getNamespace();
    const RuleType = GC.Spread.Sheets.ConditionalFormatting.RuleType;
    switch (ruleType) {
        case RuleType.averageRule:
        case RuleType.cellValueRule:
            return normalConditionRuleToJson(rule);
        case RuleType.dataBarRule:
            return dataBarRuleToJson(rule);
        case RuleType.iconSetRule:
            return iconSetRuleToJson(rule);
        case RuleType.threeScaleRule:
            return scaleRuleToJson(rule);
        case RuleType.twoScaleRule:
            return scaleRuleToJson(rule);
        case RuleType.rowStateRule:
        case RuleType.columnStateRule:
            return stateRuleToJson(rule);
        default:
            throw Error('未识别规则！');
    }
};
