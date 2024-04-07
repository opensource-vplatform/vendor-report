import {
  addColorScaleAutoRule,
  addDataBarFormat,
  addIconSetAutoRule,
} from '@utils/formatterUtil';

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
  setShowEditor,
  setStyleType,
  setTextBetweenConfig,
  setTextBetweenVisible,
  setTextCompareConfig,
  setTextCompareVisible,
} from '../../store/conditionStyleSlice';

const dispatcher = {
    highlightCellsRulesGreaterThan: (spread, dispatcher) => {
        dispatcher(
            setTextCompareConfig({
                title: '大于',
                ruleType: 'cellValueRule',
                operator: 'greaterThan',
                desc: '为大于以下值的单元格设置格式',
                style:'lightRedFill_DarkRedText',
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
                style:'lightRedFill_DarkRedText',
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
                style:'lightRedFill_DarkRedText',
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
                style:'lightRedFill_DarkRedText',
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
                style:'lightRedFill_DarkRedText',
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
                style:'lightRedFill_DarkRedText',
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
                style:'lightRedFill_DarkRedText',
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
                style:'lightRedFill_DarkRedText',
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
                style:'lightRedFill_DarkRedText',
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
                style:'lightRedFill_DarkRedText',
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
                style:'lightRedFill_DarkRedText',
            })
        );
        dispatcher(setNumberApplyVisible(true));
    },
    gradientFillBlueDataBar: (spread, setData) => {
        const value = '(Automatic)';
        addDataBarFormat(
            spread,
            'automin',
            value,
            'automax',
            value,
            'blue',
            true
        );
    },
    gradientFillGreenDataBar: (spread, setData) => {
        const value = '(Automatic)';
        addDataBarFormat(
            spread,
            'automin',
            value,
            'automax',
            value,
            'green',
            true
        );
    },
    gradientFillRedDataBar: (spread, setData) => {
        const value = '(Automatic)';
        addDataBarFormat(
            spread,
            'automin',
            value,
            'automax',
            value,
            'red',
            true
        );
    },
    gradientFillOrangeDataBar: (spread, setData) => {
        const value = '(Automatic)';
        addDataBarFormat(
            spread,
            'automin',
            value,
            'automax',
            value,
            'orange',
            true
        );
    },
    gradientFillLightBlueDataBar: (spread, setData) => {
        const value = '(Automatic)';
        addDataBarFormat(
            spread,
            'automin',
            value,
            'automax',
            value,
            'lightblue',
            true
        );
    },
    gradientFillPurpleDataBar: (spread, setData) => {
        const value = '(Automatic)';
        addDataBarFormat(
            spread,
            'automin',
            value,
            'automax',
            value,
            'purple',
            true
        );
    },
    solidFillBlueDataBar: (spread, setData) => {
        const value = '(Automatic)';
        addDataBarFormat(
            spread,
            'automin',
            value,
            'automax',
            value,
            'blue',
            false
        );
    },
    solidFillGreenDataBar: (spread, setData) => {
        const value = '(Automatic)';
        addDataBarFormat(
            spread,
            'automin',
            value,
            'automax',
            value,
            'green',
            false
        );
    },
    solidFillRedDataBar: (spread, setData) => {
        const value = '(Automatic)';
        addDataBarFormat(
            spread,
            'automin',
            value,
            'automax',
            value,
            'red',
            false
        );
    },
    solidFillOrangeDataBar: (spread, setData) => {
        const value = '(Automatic)';
        addDataBarFormat(
            spread,
            'automin',
            value,
            'automax',
            value,
            'orange',
            false
        );
    },
    solidFillLightBlueDataBar: (spread, setData) => {
        const value = '(Automatic)';
        addDataBarFormat(
            spread,
            'automin',
            value,
            'automax',
            value,
            'lightblue',
            false
        );
    },
    solidFillPurpleDataBar: (spread, setData) => {
        const value = '(Automatic)';
        addDataBarFormat(
            spread,
            'automin',
            value,
            'automax',
            value,
            'purple',
            false
        );
    },
    colorScaleGyr: (spread, setData) => {
        addColorScaleAutoRule(
            spread,
            'threeScaleRule',
            'lowestValue',
            'red',
            'percentile',
            50,
            'yellow',
            'highestValue',
            'green'
        );
    },
    colorScaleRyg: (spread, setData) => {
        addColorScaleAutoRule(
            spread,
            'threeScaleRule',
            'lowestValue',
            'green',
            'percentile',
            50,
            'yellow',
            'highestValue',
            'red'
        );
    },
    colorScaleGwr: (spread, setData) => {
        addColorScaleAutoRule(
            spread,
            'threeScaleRule',
            'lowestValue',
            'red',
            'percentile',
            50,
            'white',
            'highestValue',
            'green'
        );
    },
    colorScaleRwg: (spread, setData) => {
        addColorScaleAutoRule(
            spread,
            'threeScaleRule',
            'lowestValue',
            'green',
            'percentile',
            50,
            'white',
            'highestValue',
            'red'
        );
    },
    colorScaleBwr: (spread, setData) => {
        addColorScaleAutoRule(
            spread,
            'threeScaleRule',
            'lowestValue',
            'red',
            'percentile',
            50,
            'white',
            'highestValue',
            'blue'
        );
    },
    colorScaleRwb: (spread, setData) => {
        addColorScaleAutoRule(
            spread,
            'threeScaleRule',
            'lowestValue',
            'blue',
            'percentile',
            50,
            'white',
            'highestValue',
            'red'
        );
    },
    colorScaleWr: (spread, setData) => {
        addColorScaleAutoRule(
            spread,
            'twoScaleRule',
            'lowestValue',
            'red',
            null,
            null,
            null,
            'highestValue',
            'white'
        );
    },
    colorScaleRw: (spread, setData) => {
        addColorScaleAutoRule(
            spread,
            'twoScaleRule',
            'lowestValue',
            'white',
            null,
            null,
            null,
            'highestValue',
            'red'
        );
    },
    colorScaleGw: (spread, setData) => {
        addColorScaleAutoRule(
            spread,
            'twoScaleRule',
            'lowestValue',
            'white',
            null,
            null,
            null,
            'highestValue',
            'green'
        );
    },
    colorScaleWg: (spread, setData) => {
        addColorScaleAutoRule(
            spread,
            'twoScaleRule',
            'lowestValue',
            'green',
            null,
            null,
            null,
            'highestValue',
            'white'
        );
    },
    colorScaleGy: (spread, setData) => {
        addColorScaleAutoRule(
            spread,
            'twoScaleRule',
            'lowestValue',
            'yellow',
            null,
            null,
            null,
            'highestValue',
            'green'
        );
    },
    colorScaleYg: (spread, setData) => {
        addColorScaleAutoRule(
            spread,
            'twoScaleRule',
            'lowestValue',
            'green',
            null,
            null,
            null,
            'highestValue',
            'yellow'
        );
    },
    iconSetThreeArrowsColored: (spread, setData) => {
        addIconSetAutoRule(spread, 'threeArrowsColored');
    },
    iconSetThreeArrowsGray: (spread, setData) => {
        addIconSetAutoRule(spread, 'threeArrowsGray');
    },
    iconSet3Triangles: (spread, setData) => {
        addIconSetAutoRule(spread, 'threeTriangles');
    },
    iconSetFourArrowsGray: (spread, setData) => {
        addIconSetAutoRule(spread, 'fourArrowsGray');
    },
    iconSetFourArrowsColored: (spread, setData) => {
        addIconSetAutoRule(spread, 'fourArrowsColored');
    },
    iconSetFiveArrowsGray: (spread, setData) => {
        addIconSetAutoRule(spread, 'fiveArrowsGray');
    },
    iconSetFiveArrowsColored: (spread, setData) => {
        addIconSetAutoRule(spread, 'fiveArrowsColored');
    },
    iconSetThreeTrafficLightsUnRimmed: (spread, setData) => {
        addIconSetAutoRule(spread, 'threeTrafficLightsUnrimmed');
    },
    iconSetThreeTrafficLightsRimmed: (spread, setData) => {
        addIconSetAutoRule(spread, 'threeTrafficLightsRimmed');
    },
    iconSetThreeSigns: (spread, setData) => {
        addIconSetAutoRule(spread, 'threeSigns');
    },
    iconSetFourTrafficLights: (spread, setData) => {
        addIconSetAutoRule(spread, 'fourTrafficLights');
    },
    iconSetFourRedToBlack: (spread, setData) => {
        addIconSetAutoRule(spread, 'fourRedToBlack');
    },
    iconSetThreeSymbolsCircled: (spread, setData) => {
        addIconSetAutoRule(spread, 'threeSymbolsCircled');
    },
    iconSetThreeSymbolsUnCircled: (spread, setData) => {
        addIconSetAutoRule(spread, 'threeSymbolsUncircled');
    },
    iconSetThreeFlags: (spread, setData) => {
        addIconSetAutoRule(spread, 'threeFlags');
    },
    iconSetThreeStars: (spread, setData) => {
        addIconSetAutoRule(spread, 'threeStars');
    },
    iconSetFourRatings: (spread, setData) => {
        addIconSetAutoRule(spread, 'fourRatings');
    },
    iconSetFiveQuarters: (spread, setData) => {
        addIconSetAutoRule(spread, 'fiveQuarters');
    },
    iconSetFiveRatings: (spread, setData) => {
        addIconSetAutoRule(spread, 'fiveRatings');
    },
    iconSetFiveBoxes: (spread, setData) => {
        addIconSetAutoRule(spread, 'fiveBoxes');
    },
    highlightCellsMoreRules: (spread, dispatcher) => {
        dispatcher(setEditorType("formatContain"));
        dispatcher(setShowEditor(true));
    },
    topBottomRulesMoreRules: (spread, dispatcher) => {
        dispatcher(setEditorType("formatRankedValue"));
        dispatcher(setShowEditor(true));
    },
    dataBarMoreRules:(spread, dispatcher) => {
        dispatcher(setEditorType("formatOnValue"));
        dispatcher(setStyleType("dataBar"));
        dispatcher(setShowEditor(true));
    },
    colorScalesListMoreRules:(spread, dispatcher) => {
        dispatcher(setEditorType("formatOnValue"));
        dispatcher(setStyleType("colorScale2"));
        dispatcher(setShowEditor(true));
    },
    iconSetListMoreRules:(spread, dispatcher) => {
        dispatcher(setEditorType("formatOnValue"));
        dispatcher(setStyleType("iconSets"));
        dispatcher(setShowEditor(true));
    },
    conditionFormatNewRule:(spread, dispatcher) => {
        dispatcher(setEditorType("formatOnValue"));
        dispatcher(setStyleType("colorScale2"));
        dispatcher(setShowEditor(true));
    },
};

export { dispatcher };
