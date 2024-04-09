import {
  setDateCompareConfig,
  setDateCompareVisible,
  setDuplicateCompareConfig,
  setDuplicateCompareVisible,
  setEditorType,
  setNumberApplyConfig,
  setNumberApplyVisible,
  setNumberCompareConfig,
  setNumberCompareVisible,
  setRuleType,
  setShowEditor,
  setTextBetweenConfig,
  setTextBetweenVisible,
  setTextCompareConfig,
  setTextCompareVisible,
} from '@store/conditionStyleSlice';
import { ConditionRule } from '@toone/report-excel';

import { setEditorConfig } from '../../store/conditionStyleSlice';

const dispatcher = {
    highlightCellsRulesGreaterThan: (spread, dispatcher) => {
        dispatcher(
            setTextCompareConfig({
                title: '大于',
                ruleType: 'cellValueRule',
                operator: 'greaterThan',
                desc: '为大于以下值的单元格设置格式',
                style: 'lightRedFill_DarkRedText',
            })
        );
        dispatcher(setTextCompareVisible(true));
    },
    highlightCellsRulesLessThan: (spread, dispatcher) => {
        dispatcher(
            setTextCompareConfig({
                title: '小于',
                ruleType: 'cellValueRule',
                operator: 'lessThan',
                desc: '为小于以下值的单元格设置格式',
                style: 'lightRedFill_DarkRedText',
            })
        );
        dispatcher(setTextCompareVisible(true));
    },
    highlightCellsRulesBetween: (spread, dispatcher) => {
        dispatcher(
            setTextBetweenConfig({
                title: '介于',
                ruleType: 'cellValueRule',
                operator: 'between',
                desc: '为介于以下值之间的单元格设置格式',
                style: 'lightRedFill_DarkRedText',
            })
        );
        dispatcher(setTextBetweenVisible(true));
    },
    highlightCellsRulesEqualTo: (spread, dispatcher) => {
        dispatcher(
            setTextCompareConfig({
                title: '等于',
                ruleType: 'cellValueRule',
                operator: 'equalsTo',
                desc: '为等于以下值的单元格设置格式',
                style: 'lightRedFill_DarkRedText',
            })
        );
        dispatcher(setTextCompareVisible(true));
    },
    highlightCellsRulesContains: (spread, dispatcher) => {
        dispatcher(
            setTextCompareConfig({
                title: '文本中包含',
                ruleType: 'specificTextRule',
                operator: 'contains',
                desc: '为包含以下文本的单元格设置格式',
                style: 'lightRedFill_DarkRedText',
            })
        );
        dispatcher(setTextCompareVisible(true));
    },
    highlightCellsRulesDateOccurring: (spread, dispatcher) => {
        dispatcher(
            setDateCompareConfig({
                title: '发生日期',
                ruleType: 'dateOccurringRule',
                operator: 'contains',
                desc: '为包含以下日期的单元格设置格式',
                style: 'lightRedFill_DarkRedText',
                date: 'yesterday',
            })
        );
        dispatcher(setDateCompareVisible(true));
    },
    highlightCellsRulesDuplicateValues: (spread, dispatcher) => {
        dispatcher(
            setDuplicateCompareConfig({
                title: '重复值',
                desc: '为包含以下类型值的单元格设置格式',
                style: 'lightRedFill_DarkRedText',
                type: 'duplicateRule',
            })
        );
        dispatcher(setDuplicateCompareVisible(true));
    },
    topBottomRulesTop10: (spread, dispatcher) => {
        dispatcher(
            setNumberCompareConfig({
                title: '前10项',
                ruleType: 'top10Rule',
                operator: 'top',
                desc: '为值最大的那些单元格设置格式',
                range: 10,
                style: 'lightRedFill_DarkRedText',
            })
        );
        dispatcher(setNumberCompareVisible(true));
    },
    topBottomRulesBottom10: (spread, dispatcher) => {
        dispatcher(
            setNumberCompareConfig({
                title: '最后10项',
                ruleType: 'top10Rule',
                operator: 'bottom',
                desc: '为值最小的那些单元格设置格式',
                range: 10,
                style: 'lightRedFill_DarkRedText',
            })
        );
        dispatcher(setNumberCompareVisible(true));
    },
    topBottomRulesAboveAverage: (spread, dispatcher) => {
        dispatcher(
            setNumberApplyConfig({
                title: '高于平均值',
                ruleType: 'averageRule',
                operator: 'above',
                desc: '为高于平均值的单元格设置格式',
                secondary: '针对选定区域，设置为',
                style: 'lightRedFill_DarkRedText',
            })
        );
        dispatcher(setNumberApplyVisible(true));
    },
    topBottomRulesBelowAverage: (spread, dispatcher) => {
        dispatcher(
            setNumberApplyConfig({
                title: '低于平均值',
                ruleType: 'averageRule',
                operator: 'below',
                desc: '为低于平均值的单元格设置格式',
                secondary: '针对选定区域，设置为',
                style: 'lightRedFill_DarkRedText',
            })
        );
        dispatcher(setNumberApplyVisible(true));
    },
    gradientFillBlueDataBar: (spread, dispatcher, applyRule) => {
        const value = '(Automatic)';
        const rule = new ConditionRule({
            _type: 'dataBarRule',
            minType: 'automin',
            minValue: value,
            maxType: 'automax',
            maxValue: value,
            color: 'blue',
            gradient: true,
        });
        applyRule(rule);
    },
    gradientFillGreenDataBar: (spread, dispatcher, applyRule) => {
        const value = '(Automatic)';
        const rule = new ConditionRule({
            _type: 'dataBarRule',
            minType: 'automin',
            minValue: value,
            maxType: 'automax',
            maxValue: value,
            color: 'green',
            gradient: true,
        });
        applyRule(rule);
    },
    gradientFillRedDataBar: (spread, dispatcher, applyRule) => {
        const value = '(Automatic)';
        const rule = new ConditionRule({
            _type: 'dataBarRule',
            minType: 'automin',
            minValue: value,
            maxType: 'automax',
            maxValue: value,
            color: 'red',
            gradient: true,
        });
        applyRule(rule);
    },
    gradientFillOrangeDataBar: (spread, dispatcher, applyRule) => {
        const value = '(Automatic)';
        const rule = new ConditionRule({
            _type: 'dataBarRule',
            minType: 'automin',
            minValue: value,
            maxType: 'automax',
            maxValue: value,
            color: 'orange',
            gradient: true,
        });
        applyRule(rule);
    },
    gradientFillLightBlueDataBar: (spread, dispatcher, applyRule) => {
        const value = '(Automatic)';
        const rule = new ConditionRule({
            _type: 'dataBarRule',
            minType: 'automin',
            minValue: value,
            maxType: 'automax',
            maxValue: value,
            color: 'lightblue',
            gradient: true,
        });
        applyRule(rule);
    },
    gradientFillPurpleDataBar: (spread, dispatcher, applyRule) => {
        const value = '(Automatic)';
        const rule = new ConditionRule({
            _type: 'dataBarRule',
            minType: 'automin',
            minValue: value,
            maxType: 'automax',
            maxValue: value,
            color: 'purple',
            gradient: true,
        });
        applyRule(rule);
    },
    solidFillBlueDataBar: (spread, dispatcher, applyRule) => {
        const value = '(Automatic)';
        const rule = new ConditionRule({
            _type: 'dataBarRule',
            minType: 'automin',
            minValue: value,
            maxType: 'automax',
            maxValue: value,
            color: 'blue',
            gradient: false,
        });
        applyRule(rule);
    },
    solidFillGreenDataBar: (spread, dispatcher, applyRule) => {
        const value = '(Automatic)';
        const rule = new ConditionRule({
            _type: 'dataBarRule',
            minType: 'automin',
            minValue: value,
            maxType: 'automax',
            maxValue: value,
            color: 'green',
            gradient: false,
        });
        applyRule(rule);
    },
    solidFillRedDataBar: (spread, dispatcher, applyRule) => {
        const value = '(Automatic)';
        const rule = new ConditionRule({
            _type: 'dataBarRule',
            minType: 'automin',
            minValue: value,
            maxType: 'automax',
            maxValue: value,
            color: 'red',
            gradient: false,
        });
        applyRule(rule);
    },
    solidFillOrangeDataBar: (spread, dispatcher, applyRule) => {
        const value = '(Automatic)';
        const rule = new ConditionRule({
            _type: 'dataBarRule',
            minType: 'automin',
            minValue: value,
            maxType: 'automax',
            maxValue: value,
            color: 'orange',
            gradient: false,
        });
        applyRule(rule);
    },
    solidFillLightBlueDataBar: (spread, dispatcher, applyRule) => {
        const value = '(Automatic)';
        const rule = new ConditionRule({
            _type: 'dataBarRule',
            minType: 'automin',
            minValue: value,
            maxType: 'automax',
            maxValue: value,
            color: 'lightblue',
            gradient: false,
        });
        applyRule(rule);
    },
    solidFillPurpleDataBar: (spread, dispatcher, applyRule) => {
        const value = '(Automatic)';
        const rule = new ConditionRule({
            _type: 'dataBarRule',
            minType: 'automin',
            minValue: value,
            maxType: 'automax',
            maxValue: value,
            color: 'purple',
            gradient: false,
        });
        applyRule(rule);
    },
    colorScaleGyr: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'scaleRule',
            ruleType: 'threeScaleRule',
            minType: 'lowestValue',
            minColor: 'red',
            midType: 'percentile',
            midValue: 50,
            midColor: 'yellow',
            maxType: 'highestValue',
            maxColor: 'green',
        });
        applyRule(rule);
    },
    colorScaleRyg: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'scaleRule',
            ruleType: 'threeScaleRule',
            minType: 'lowestValue',
            minColor: 'green',
            midType: 'percentile',
            midValue: 50,
            midColor: 'yellow',
            maxType: 'highestValue',
            maxColor: 'red',
        });
        applyRule(rule);
    },
    colorScaleGwr: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'scaleRule',
            ruleType: 'threeScaleRule',
            minType: 'lowestValue',
            minColor: 'red',
            midType: 'percentile',
            midValue: 50,
            midColor: 'white',
            maxType: 'highestValue',
            maxColor: 'green',
        });
        applyRule(rule);
    },
    colorScaleRwg: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'scaleRule',
            ruleType: 'threeScaleRule',
            minType: 'lowestValue',
            minColor: 'green',
            midType: 'percentile',
            midValue: 50,
            midColor: 'white',
            maxType: 'highestValue',
            maxColor: 'red',
        });
        applyRule(rule);
    },
    colorScaleBwr: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'scaleRule',
            ruleType: 'threeScaleRule',
            minType: 'lowestValue',
            minColor: 'red',
            midType: 'percentile',
            midValue: 50,
            midColor: 'white',
            maxType: 'highestValue',
            maxColor: 'blue',
        });
        applyRule(rule);
    },
    colorScaleRwb: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'scaleRule',
            ruleType: 'threeScaleRule',
            minType: 'lowestValue',
            minColor: 'blue',
            midType: 'percentile',
            midValue: 50,
            midColor: 'white',
            maxType: 'highestValue',
            maxColor: 'red',
        });
        applyRule(rule);
    },
    colorScaleWr: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'scaleRule',
            ruleType: 'twoScaleRule',
            minType: 'lowestValue',
            minColor: 'red',
            midType: null,
            midValue: null,
            midColor: null,
            maxType: 'highestValue',
            maxColor: 'white',
        });
        applyRule(rule);
    },
    colorScaleRw: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'scaleRule',
            ruleType: 'twoScaleRule',
            minType: 'lowestValue',
            minColor: 'white',
            midType: null,
            midValue: null,
            midColor: null,
            maxType: 'highestValue',
            maxColor: 'red',
        });
        applyRule(rule);
    },
    colorScaleGw: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'scaleRule',
            ruleType: 'twoScaleRule',
            minType: 'lowestValue',
            minColor: 'white',
            midType: null,
            midValue: null,
            midColor: null,
            maxType: 'highestValue',
            maxColor: 'green',
        });
        applyRule(rule);
    },
    colorScaleWg: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'scaleRule',
            ruleType: 'twoScaleRule',
            minType: 'lowestValue',
            minColor: 'green',
            midType: null,
            midValue: null,
            midColor: null,
            maxType: 'highestValue',
            maxColor: 'white',
        });
        applyRule(rule);
    },
    colorScaleGy: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'scaleRule',
            ruleType: 'twoScaleRule',
            minType: 'lowestValue',
            minColor: 'yellow',
            midType: null,
            midValue: null,
            midColor: null,
            maxType: 'highestValue',
            maxColor: 'green',
        });
        applyRule(rule);
    },
    colorScaleYg: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'scaleRule',
            ruleType: 'twoScaleRule',
            minType: 'lowestValue',
            minColor: 'green',
            midType: null,
            midValue: null,
            midColor: null,
            maxType: 'highestValue',
            maxColor: 'yellow',
        });
        applyRule(rule);
    },
    iconSetThreeArrowsColored: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'threeArrowsColored',
        });
        applyRule(rule);
    },
    iconSetThreeArrowsGray: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'threeArrowsGray',
        });
        applyRule(rule);
    },
    iconSet3Triangles: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'threeTriangles',
        });
        applyRule(rule);
    },
    iconSetFourArrowsGray: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'fourArrowsGray',
        });
        applyRule(rule);
    },
    iconSetFourArrowsColored: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'fourArrowsColored',
        });
        applyRule(rule);
    },
    iconSetFiveArrowsGray: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'fiveArrowsGray',
        });
        applyRule(rule);
    },
    iconSetFiveArrowsColored: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'fiveArrowsColored',
        });
        applyRule(rule);
    },
    iconSetThreeTrafficLightsUnRimmed: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'threeTrafficLightsUnrimmed',
        });
        applyRule(rule);
    },
    iconSetThreeTrafficLightsRimmed: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'threeTrafficLightsRimmed',
        });
        applyRule(rule);
    },
    iconSetThreeSigns: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'threeSigns',
        });
        applyRule(rule);
    },
    iconSetFourTrafficLights: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'fourTrafficLights',
        });
        applyRule(rule);
    },
    iconSetFourRedToBlack: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'fourRedToBlack',
        });
        applyRule(rule);
    },
    iconSetThreeSymbolsCircled: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'threeSymbolsCircled',
        });
        applyRule(rule);
    },
    iconSetThreeSymbolsUnCircled: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'threeSymbolsUncircled',
        });
        applyRule(rule);
    },
    iconSetThreeFlags: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'threeFlags',
        });
        applyRule(rule);
    },
    iconSetThreeStars: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'threeStars',
        });
        applyRule(rule);
    },
    iconSetFourRatings: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'fourRatings',
        });
        applyRule(rule);
    },
    iconSetFiveQuarters: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'fiveQuarters',
        });
        applyRule(rule);
    },
    iconSetFiveRatings: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'fiveRatings',
        });
        applyRule(rule);
    },
    iconSetFiveBoxes: (spread, dispatcher, applyRule) => {
        const rule = new ConditionRule({
            _type: 'iconSetRule',
            iconSetType: 'fiveBoxes',
        });
        applyRule(rule);
    },
    highlightCellsMoreRules: (spread, dispatcher) => {
        dispatcher(setEditorType('formatContain'));
        dispatcher(setShowEditor(true));
    },
    topBottomRulesMoreRules: (spread, dispatcher) => {
        dispatcher(setEditorType('formatRankedValue'));
        dispatcher(setShowEditor(true));
    },
    dataBarMoreRules: (spread, dispatcher) => {
        dispatcher(setEditorType('formatOnValue'));
        dispatcher(setRuleType('dataBarRule'));
        dispatcher(
            setEditorConfig({
                _type: 'dataBarRule',
                minType: 'automin',
                minValue: null,
                maxType: 'automax',
                maxValue: null,
                color: 'rgb(99, 142, 198)',
                borderColor: 'rgb(0,0,0)',
                gradient: false,
                showBarOnly: false,
                showBorder: false,
                dataBarDirection: 'leftToRight',
                useNegativeFillColor: false,
                negativeFillColor: 'rgb(255,0,0)',
                useNegativeBorderColor: false,
                negativeBorderColor: 'rgb(0,0,0)',
                axisColor: 'rgb(0,0,0)',
                axisPosition: 'automatic',
            })
        );
        dispatcher(setShowEditor(true));
    },
    colorScalesListMoreRules: (spread, dispatcher) => {
        dispatcher(setEditorType('formatOnValue'));
        dispatcher(setRuleType('twoScaleRule'));
        dispatcher(
            setEditorConfig({
                _type: 'scaleRule',
                ruleType: 'twoScaleRule',
                minType: 'lowestValue',
                minValue: null,
                minColor: 'rgb(255,0,0)',
                midType: null,
                midValue: null,
                midColor: null,
                maxType: 'highestValue',
                maxValue: null,
                maxColor: 'rgb(0,136,0)',
            })
        );
        dispatcher(setShowEditor(true));
    },
    iconSetListMoreRules: (spread, dispatcher) => {
        dispatcher(setEditorType('formatOnValue'));
        dispatcher(setRuleType('iconSetRule'));
        dispatcher(
            setEditorConfig({
                _type: 'iconSetRule',
                showIconOnly: false,
                iconSetType: 'threeArrowsColored',
                reverseIconOrder: false,
                iconCriteria: [
                    {
                        isGreaterThanOrEqualTo: true,
                        iconValueType: 'percent',
                        iconValue: 67,
                    },
                    {
                        isGreaterThanOrEqualTo: true,
                        iconValueType: 'percent',
                        iconValue: 33,
                    },
                ],
                icons: [
                    { iconSetType: 'threeArrowsColored', iconIndex: 0 },
                    { iconSetType: 'threeArrowsColored', iconIndex: 1 },
                    { iconSetType: 'threeArrowsColored', iconIndex: 2 },
                ],
            })
        );
        dispatcher(setShowEditor(true));
    },
    conditionFormatNewRule: (spread, dispatcher) => {
        dispatcher(setEditorType('formatOnValue'));
        dispatcher(setRuleType('twoScaleRule'));
        dispatcher(
            setEditorConfig({
                _type: 'scaleRule',
                ruleType: 'twoScaleRule',
                minType: 'lowestValue',
                minValue: null,
                minColor: 'rgb(255,0,0)',
                midType: null,
                midValue: null,
                midColor: null,
                maxType: 'highestValue',
                maxValue: null,
                maxColor: 'rgb(0,136,0)',
            })
        );
        dispatcher(setShowEditor(true));
    },
};

export { dispatcher };
