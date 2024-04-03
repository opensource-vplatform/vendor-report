import {
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import EmptyIcon from '@icons/base/Empty';
import ClearRulesIcon from '@icons/style/ClearRules';
import ColorScaleBwrIcon from '@icons/style/colorgradation/ColorScaleBwr';
import ColorScaleGwIcon from '@icons/style/colorgradation/ColorScaleGw';
import ColorScaleGwrIcon from '@icons/style/colorgradation/ColorScaleGwr';
import ColorScaleGyIcon from '@icons/style/colorgradation/ColorScaleGy';
import ColorScaleGyrIcon from '@icons/style/colorgradation/ColorScaleGyr';
import ColorScaleRwIcon from '@icons/style/colorgradation/ColorScaleRw';
import ColorScaleRwbIcon from '@icons/style/colorgradation/ColorScaleRwb';
import ColorScaleRwgIcon from '@icons/style/colorgradation/ColorScaleRwg';
import ColorScaleRygIcon from '@icons/style/colorgradation/ColorScaleRyg';
import ColorScaleWgIcon from '@icons/style/colorgradation/ColorScaleWg';
import ColorScaleWrIcon from '@icons/style/colorgradation/ColorScaleWr';
import ColorScaleYgIcon from '@icons/style/colorgradation/ColorScaleYg';
import ColorScalesListIcon from '@icons/style/ColorScalesList';
import ConditionFormatIcon from '@icons/style/conditionFormat';
import ConditionFormatManageRuleIcon
  from '@icons/style/ConditionFormatManageRule';
import ConditionFormatNewRuleIcon from '@icons/style/ConditionFormatNewRule';
import DataBarIcon from '@icons/style/DataBar';
import GradientFillBlueDataBarIcon
  from '@icons/style/databar/GradientFillBlueDataBar';
import GradientFillGreenDataBarIcon
  from '@icons/style/databar/GradientFillGreenDataBar';
import GradientFillLightBlueDataBarIcon
  from '@icons/style/databar/GradientFillLightBlueDataBar';
import GradientFillOrangeDataBarIcon
  from '@icons/style/databar/GradientFillOrangeDataBar';
import GradientFillPurpleDataBarIcon
  from '@icons/style/databar/GradientFillPurpleDataBar';
import GradientFillRedDataBarIcon
  from '@icons/style/databar/GradientFillRedDataBar';
import SolidFillBlueDataBarIcon
  from '@icons/style/databar/SolidFillBlueDataBar';
import SolidFillGreenDataBarIcon
  from '@icons/style/databar/SolidFillGreenDataBar';
import SolidFillLightBlueDataBarIcon
  from '@icons/style/databar/SolidFillLightBlueDataBar';
import SolidFillOrangeDataBarIcon
  from '@icons/style/databar/SolidFillOrangeDataBar';
import SolidFillPurpleDataBarIcon
  from '@icons/style/databar/SolidFillPurpleDataBar';
import SolidFillRedDataBarIcon from '@icons/style/databar/SolidFillRedDataBar';
import HighlightCellsRulesIcon from '@icons/style/HighlightCellsRules';
import HighlightCellsRulesBetweenIcon
  from '@icons/style/HighlightCellsRulesBetween';
import HighlightCellsRulesContainsIcon
  from '@icons/style/HighlightCellsRulesContains';
import HighlightCellsRulesDateOccurringIcon
  from '@icons/style/HighlightCellsRulesDateOccurring';
import HighlightCellsRulesDuplicateValuesIcon
  from '@icons/style/HighlightCellsRulesDuplicateValues';
import HighlightCellsRulesEqualToIcon
  from '@icons/style/HighlightCellsRulesEqualTo';
import HighlightCellsRulesGreaterThanIcon
  from '@icons/style/HighlightCellsRulesGreaterThan';
import HighlightCellsRulesLessThanIcon
  from '@icons/style/HighlightCellsRulesLessThan';
import IconSet3TrianglesIcon from '@icons/style/icons/IconSet3Triangles';
import IconSetFiveArrowsColoredIcon
  from '@icons/style/icons/IconSetFiveArrowsColored';
import IconSetFiveArrowsGrayIcon
  from '@icons/style/icons/IconSetFiveArrowsGray';
import IconSetFiveBoxesIcon from '@icons/style/icons/IconSetFiveBoxes';
import IconSetFiveQuartersIcon from '@icons/style/icons/IconSetFiveQuarters';
import IconSetFiveRatingsIcon from '@icons/style/icons/IconSetFiveRatings';
import IconSetFourArrowsColoredIcon
  from '@icons/style/icons/IconSetFourArrowsColored';
import IconSetFourArrowsGrayIcon
  from '@icons/style/icons/IconSetFourArrowsGray';
import IconSetFourRatingsIcon from '@icons/style/icons/IconSetFourRatings';
import IconSetFourRedToBlackIcon
  from '@icons/style/icons/IconSetFourRedToBlack';
import IconSetFourTrafficLightsIcon
  from '@icons/style/icons/IconSetFourTrafficLights';
import IconSetThreeArrowsColoredIcon
  from '@icons/style/icons/IconSetThreeArrowsColored';
import IconSetThreeArrowsGrayIcon
  from '@icons/style/icons/IconSetThreeArrowsGray';
import IconSetThreeFlagsIcon from '@icons/style/icons/IconSetThreeFlags';
import IconSetThreeSignsIcon from '@icons/style/icons/IconSetThreeSigns';
import IconSetThreeStarsIcon from '@icons/style/icons/IconSetThreeStars';
import IconSetThreeSymbolsCircledIcon
  from '@icons/style/icons/IconSetThreeSymbolsCircled';
import IconSetThreeSymbolsUnCircledIcon
  from '@icons/style/icons/IconSetThreeSymbolsUnCircled';
import IconSetThreeTrafficLightsRimmedIcon
  from '@icons/style/icons/IconSetThreeTrafficLightsRimmed';
import IconSetThreeTrafficLightsUnRimmedIcon
  from '@icons/style/icons/IconSetThreeTrafficLightsUnRimmed';
import IconSetListIcon from '@icons/style/IconSetList';
import TopBottomRulesIcon from '@icons/style/TopBottomRules';
import TopBottomRulesAboveAverageIcon
  from '@icons/style/TopBottomRulesAboveAverage';
import TopBottomRulesBelowAverageIcon
  from '@icons/style/TopBottomRulesBelowAverage';
import TopBottomRulesBottom10Icon from '@icons/style/TopBottomRulesBottom10';
import TopBottomRulesTop10Icon from '@icons/style/TopBottomRulesTop10';
import { WithIconMenu } from '@utils/componentUtils';

import {
  addColorScaleAutoRule,
  addDataBarFormat,
  addIconSetAutoRule,
  clearSelectedRules,
  clearSheetRules,
} from '../../../../utils/formatterUtil';
import { isFunction } from '../../../../utils/objectUtil';
import DateCompareDialog from './DateCompareDialog';
import DuplicateCompareDialog from './DuplicateCompareDialog';
import RuleEditor from './editor/Index';
import NumberApplyDialog from './NumberApplyDialog';
import NumberCompareDialog from './NumberCompareDialog';
import TextBetweenDialog from './TextBetweenDialog';
import TextCompareDialog from './TextCompareDialog';

const iconStyles = {
    style: { margin: 4 },
    iconStyle: { width: 26, height: 26 },
};

const menuIconStyle = {
    width: 20,
    height: 20,
};

const groupItemStyle = {
    flexWrap: 'wrap',
    width: 134,
};

const toIconMenuItem = function (value, title, Icon, handler) {
    return {
        value: value,
        title,
        text: title,
        type: 'icon',
        height: 40,
        handler,
        icon: <Icon iconStyle={menuIconStyle}></Icon>,
    };
};

const toBarIconMenuItem = function (value, title, Icon, handler) {
    return {
        value,
        title,
        text: title,
        type: 'icon',
        height: 30,
        handler,
        icon: <Icon iconStyle={{ width: 100, height: 8 }}></Icon>,
    };
};

const barIconGroupStyle = { ...groupItemStyle, width: 250 };

const toConditionMenuType = function (value, title, Icon, children, handler) {
    if (typeof children == 'function') {
        handler = children;
        children = null;
    }
    return {
        value,
        title,
        text: title,
        height: 50,
        handler,
        icon: <Icon {...iconStyles}></Icon>,
        children,
    };
};

const toNormalMenu = function (value, title, Icon, children, handler) {
    if (isFunction(children)) {
        handler = children;
        children = null;
    }
    return {
        value,
        title,
        text: title,
        icon: Icon ? <Icon></Icon> : null,
        handler,
        children,
    };
};

const ConditionFormatIconMenu = WithIconMenu('条件格式', ConditionFormatIcon, [
    toConditionMenuType(
        'highlightCellsRules',
        '突出显示单元格规则',
        HighlightCellsRulesIcon,
        [
            toConditionMenuType(
                'highlightCellsRulesGreaterThan',
                '大于...',
                HighlightCellsRulesGreaterThanIcon,
                (spread, setData) => {
                    setData((data) => {
                        return {
                            ...data,
                            title: '大于',
                            ruleType: 'cellValueRule',
                            operator: 'greaterThan',
                            desc: '为大于以下值的单元格设置格式',
                            showTextCompareDialog: true,
                        };
                    });
                }
            ),
            toConditionMenuType(
                'highlightCellsRulesLessThan',
                '小于...',
                HighlightCellsRulesLessThanIcon,
                (spread, setData) => {
                    setData((data) => {
                        return {
                            ...data,
                            title: '小于',
                            ruleType: 'cellValueRule',
                            operator: 'lessThan',
                            desc: '为小于以下值的单元格设置格式',
                            showTextCompareDialog: true,
                        };
                    });
                }
            ),
            toConditionMenuType(
                'highlightCellsRulesBetween',
                '介于...',
                HighlightCellsRulesBetweenIcon,
                (spread, setData) => {
                    setData((data) => {
                        return {
                            ...data,
                            title: '介于',
                            ruleType: 'cellValueRule',
                            operator: 'between',
                            desc: '为介于以下值之间的单元格设置格式',
                            showTextBetweenDialog: true,
                        };
                    });
                }
            ),
            toConditionMenuType(
                'highlightCellsRulesEqualTo',
                '等于...',
                HighlightCellsRulesEqualToIcon,
                (spread, setData) => {
                    setData((data) => {
                        return {
                            ...data,
                            title: '等于',
                            ruleType: 'cellValueRule',
                            operator: 'equalsTo',
                            desc: '为等于以下值的单元格设置格式',
                            showTextCompareDialog: true,
                        };
                    });
                }
            ),
            toConditionMenuType(
                'highlightCellsRulesContains',
                '文本包含...',
                HighlightCellsRulesContainsIcon,
                (spread, setData) => {
                    setData((data) => {
                        return {
                            ...data,
                            title: '文本中包含',
                            ruleType: 'specificTextRule',
                            operator: 'contains',
                            desc: '为包含以下文本的单元格设置格式',
                            showTextCompareDialog: true,
                        };
                    });
                }
            ),
            toConditionMenuType(
                'highlightCellsRulesDateOccurring',
                '发生日期...',
                HighlightCellsRulesDateOccurringIcon,
                (spread, setData) => {
                    setData((data) => {
                        return {
                            ...data,
                            title: '发生日期',
                            ruleType: 'dateOccurringRule',
                            operator: 'contains',
                            desc: '为包含以下日期的单元格设置格式',
                            showDateCompareDialog: true,
                        };
                    });
                }
            ),
            toConditionMenuType(
                'highlightCellsRulesDuplicateValues',
                '重复值...',
                HighlightCellsRulesDuplicateValuesIcon,
                (spread, setData) => {
                    setData((data) => {
                        return {
                            ...data,
                            title: '重复值',
                            desc: '为包含以下类型值的单元格设置格式',
                            showDuplicateCompareDialog: true,
                        };
                    });
                }
            ),
            'divider',
            {
                value: 'highlightCellsMoreRules',
                title: '其他规则...',
                text: '其他规则...',
            },
        ]
    ),
    toConditionMenuType('topBottomRules', '项目选取规则', TopBottomRulesIcon, [
        toConditionMenuType(
            'topBottomRulesTop10',
            '值最大的10项...',
            TopBottomRulesTop10Icon,
            (spread, setData) => {
                setData((data) => {
                    return {
                        ...data,
                        title: '前10项',
                        ruleType: 'top10Rule',
                        operator: 'top',
                        desc: '为值最大的那些单元格设置格式',
                        showNumberCompareDialog: true,
                    };
                });
            }
        ),
        toConditionMenuType(
            'topBottomRulesBottom10',
            '值最小的10项...',
            TopBottomRulesBottom10Icon,
            (spread, setData) => {
                setData((data) => {
                    return {
                        ...data,
                        title: '最后10项',
                        ruleType: 'top10Rule',
                        operator: 'bottom',
                        desc: '为值最大的那些单元格设置格式',
                        showNumberCompareDialog: true,
                    };
                });
            }
        ),
        toConditionMenuType(
            'topBottomRulesAboveAverage',
            '高于平均值...',
            TopBottomRulesAboveAverageIcon,
            (spread, setData) => {
                setData((data) => {
                    return {
                        ...data,
                        title: '高于平均值',
                        ruleType: 'averageRule',
                        operator: 'above',
                        desc: '为高于平均值的单元格设置格式',
                        secondary: '针对选定区域，设置为',
                        showNumberApplyDiloag: true,
                    };
                });
            }
        ),
        toConditionMenuType(
            'topBottomRulesBelowAverage',
            '低于平均值...',
            TopBottomRulesBelowAverageIcon,
            (spread, setData) => {
                setData((data) => {
                    return {
                        ...data,
                        title: '低于平均值',
                        ruleType: 'averageRule',
                        operator: 'below',
                        desc: '为低于平均值的单元格设置格式',
                        secondary: '针对选定区域，设置为',
                        showNumberApplyDiloag: true,
                    };
                });
            }
        ),
        'divider',
        {
            value: 'topBottomRulesMoreRules',
            title: '其他规则...',
            text: '其他规则...',
        },
    ]),
    'divider',
    toConditionMenuType('dataBar', '数据条', DataBarIcon, [
        {
            value: '渐变填充',
            title: '渐变填充',
            text: '渐变填充',
            type: 'group',
            style: groupItemStyle,
            children: [
                toIconMenuItem(
                    'gradientFillBlueDataBar',
                    '蓝色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
                    GradientFillBlueDataBarIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'gradientFillGreenDataBar',
                    '绿色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
                    GradientFillGreenDataBarIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'gradientFillRedDataBar',
                    '红色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
                    GradientFillRedDataBarIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'gradientFillOrangeDataBar',
                    '橙色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
                    GradientFillOrangeDataBarIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'gradientFillLightBlueDataBar',
                    '浅蓝色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
                    GradientFillLightBlueDataBarIcon,
                    (spread, setData) => {
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
                    }
                ),
                ,
                toIconMenuItem(
                    'gradientFillPurpleDataBar',
                    '紫色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
                    GradientFillPurpleDataBarIcon,
                    (spread, setData) => {
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
                    }
                ),
            ],
        },
        {
            value: '实心填充',
            title: '实心填充',
            text: '实心填充',
            type: 'group',
            style: groupItemStyle,
            children: [
                toIconMenuItem(
                    'solidFillBlueDataBar',
                    '蓝色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
                    SolidFillBlueDataBarIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'solidFillGreenDataBar',
                    '绿色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
                    SolidFillGreenDataBarIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'solidFillRedDataBar',
                    '红色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
                    SolidFillRedDataBarIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'solidFillOrangeDataBar',
                    '橙色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
                    SolidFillOrangeDataBarIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'solidFillLightBlueDataBar',
                    '浅蓝色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
                    SolidFillLightBlueDataBarIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'solidFillPurpleDataBar',
                    '紫色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
                    SolidFillPurpleDataBarIcon,
                    (spread, setData) => {
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
                    }
                ),
            ],
        },
        'divider',
        {
            value: 'others',
            title: '其他规则...',
            text: '其他规则...',
            icon: <EmptyIcon></EmptyIcon>,
        },
    ]),
    toConditionMenuType('colorScalesList', '色阶', ColorScalesListIcon, [
        {
            value: '色阶',
            title: '色阶',
            text: '色阶',
            type: 'group',
            style: { ...groupItemStyle, width: 178 },
            children: [
                toIconMenuItem(
                    'colorScaleGyr',
                    '绿-黄-红色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
                    ColorScaleGyrIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'colorScaleRyg',
                    '红-黄-绿色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
                    ColorScaleRygIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'colorScaleGwr',
                    '绿-白-红色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
                    ColorScaleGwrIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'colorScaleRwg',
                    '红-白-绿色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
                    ColorScaleRwgIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'colorScaleBwr',
                    '蓝-白-红色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
                    ColorScaleBwrIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'colorScaleRwb',
                    '红-白-蓝色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
                    ColorScaleRwbIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'colorScaleWr',
                    '白-红色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
                    ColorScaleWrIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'colorScaleRw',
                    '红-白色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
                    ColorScaleRwIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'colorScaleGw',
                    '绿-白色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
                    ColorScaleGwIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'colorScaleWg',
                    '白-绿色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
                    ColorScaleWgIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'colorScaleGy',
                    '绿-黄色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
                    ColorScaleGyIcon,
                    (spread, setData) => {
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
                    }
                ),
                toIconMenuItem(
                    'colorScaleYg',
                    '黄-绿色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
                    ColorScaleYgIcon,
                    (spread, setData) => {
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
                    }
                ),
            ],
        },
        'divider',
        {
            value: 'others',
            title: '其他规则...',
            text: '其他规则...',
            icon: <EmptyIcon></EmptyIcon>,
        },
    ]),
    toConditionMenuType('iconSetList', '图标集', IconSetListIcon, [
        {
            value: '方向',
            text: '方向',
            type: 'group',
            style: barIconGroupStyle,
            children: [
                toBarIconMenuItem(
                    'iconSetThreeArrowsColored',
                    '三向箭头（彩色）：选一组图标以代表所选单元格内的值。',
                    IconSetThreeArrowsColoredIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'threeArrowsColored');
                    }
                ),
                toBarIconMenuItem(
                    'iconSetThreeArrowsGray',
                    '三向箭头（灰色）：选一组图标以代表所选单元格内的值。',
                    IconSetThreeArrowsGrayIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'threeArrowsGray');
                    }
                ),
                toBarIconMenuItem(
                    'iconSet3Triangles',
                    '3个三角形：选一组图标以代表所选单元格内的值。',
                    IconSet3TrianglesIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'threeTriangles');
                    }
                ),
                toBarIconMenuItem(
                    'iconSetFourArrowsGray',
                    '四向箭头（灰色）：选一组图标以代表所选单元格内的值。',
                    IconSetFourArrowsGrayIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'fourArrowsGray');
                    }
                ),
                toBarIconMenuItem(
                    'iconSetFourArrowsColored',
                    '四向箭头（彩色）：选一组图标以代表所选单元格内的值。',
                    IconSetFourArrowsColoredIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'fourArrowsColored');
                    }
                ),
                toBarIconMenuItem(
                    'iconSetFiveArrowsGray',
                    '五向箭头（灰色）：选一组图标以代表所选单元格内的值。',
                    IconSetFiveArrowsGrayIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'fiveArrowsGray');
                    }
                ),
                toBarIconMenuItem(
                    'iconSetFiveArrowsColored',
                    '五向箭头（彩色）：选一组图标以代表所选单元格内的值。',
                    IconSetFiveArrowsColoredIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'fiveArrowsColored');
                    }
                ),
            ],
        },
        {
            value: '形状',
            text: '形状',
            type: 'group',
            style: barIconGroupStyle,
            children: [
                toBarIconMenuItem(
                    'iconSetThreeTrafficLightsUnRimmed',
                    '三色交通灯（无边框）：选一组图标以代表所选单元格内的值。',
                    IconSetThreeTrafficLightsUnRimmedIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(
                            spread,
                            'threeTrafficLightsUnrimmed'
                        );
                    }
                ),
                toBarIconMenuItem(
                    'iconSetThreeTrafficLightsRimmed',
                    '三色交通灯（有边框）：选一组图标以代表所选单元格内的值。',
                    IconSetThreeTrafficLightsRimmedIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'threeTrafficLightsRimmed');
                    }
                ),
                toBarIconMenuItem(
                    'iconSetThreeSigns',
                    '三标志：选一组图标以代表所选单元格内的值。',
                    IconSetThreeSignsIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'threeSigns');
                    }
                ),
                toBarIconMenuItem(
                    'iconSetFourTrafficLights',
                    '四色交通灯：选一组图标以代表所选单元格内的值。',
                    IconSetFourTrafficLightsIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'fourTrafficLights');
                    }
                ),
                toBarIconMenuItem(
                    'iconSetFourRedToBlack',
                    '红-黑渐变：选一组图标以代表所选单元格内的值。',
                    IconSetFourRedToBlackIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'fourRedToBlack');
                    }
                ),
            ],
        },
        {
            value: '标记',
            text: '标记',
            type: 'group',
            style: barIconGroupStyle,
            children: [
                toBarIconMenuItem(
                    'iconSetThreeSymbolsCircled',
                    '三个符号（有圆圈）：选一组图标以代表所选单元格内的值。',
                    IconSetThreeSymbolsCircledIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'threeSymbolsCircled');
                    }
                ),
                toBarIconMenuItem(
                    'iconSetThreeSymbolsUnCircled',
                    '三个符号（无圆圈）：选一组图标以代表所选单元格内的值。',
                    IconSetThreeSymbolsUnCircledIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'threeSymbolsUncircled');
                    }
                ),
                toBarIconMenuItem(
                    'iconSetThreeFlags',
                    '三色旗：选一组图标以代表所选单元格内的值。',
                    IconSetThreeFlagsIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'threeFlags');
                    }
                ),
            ],
        },
        {
            value: '等级',
            text: '等级',
            type: 'group',
            style: barIconGroupStyle,
            children: [
                toBarIconMenuItem(
                    'iconSetThreeStars',
                    '3个星形：选一组图标以代表所选单元格内的值。',
                    IconSetThreeStarsIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'threeStars');
                    }
                ),
                toBarIconMenuItem(
                    'iconSetFourRatings',
                    '四等级：选一组图标以代表所选单元格内的值。',
                    IconSetFourRatingsIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'fourRatings');
                    }
                ),
                toBarIconMenuItem(
                    'iconSetFiveQuarters',
                    '五象限图：选一组图标以代表所选单元格内的值。',
                    IconSetFiveQuartersIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'fiveQuarters');
                    }
                ),
                toBarIconMenuItem(
                    'iconSetFiveRatings',
                    '五等级：选一组图标以代表所选单元格内的值。',
                    IconSetFiveRatingsIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'fiveRatings');
                    }
                ),
                toBarIconMenuItem(
                    'iconSetFiveBoxes',
                    '5个框：选一组图标以代表所选单元格内的值。',
                    IconSetFiveBoxesIcon,
                    (spread, setData) => {
                        addIconSetAutoRule(spread, 'fiveBoxes');
                    }
                ),
            ],
        },
        'divider',
        {
            value: 'others',
            text: '其他规则...',
            title: '其他规则...',
            icon: <EmptyIcon></EmptyIcon>,
        },
    ]),
    'divider',
    toNormalMenu(
        'conditionFormatNewRule',
        '新建规则...',
        ConditionFormatNewRuleIcon,
        function(spread,setData){
            setData((data)=>{
                return {...data,showRuleEditor:true};
            });
        }
    ),
    toNormalMenu('clearRules', '清除规则', ClearRulesIcon, [
        toNormalMenu(
            'clearSeletedRules',
            '清除所选单元格的规则',
            null,
            (spread, setData) => {
                clearSelectedRules(spread);
            }
        ),
        toNormalMenu(
            'clearAllRules',
            '清除整个工作表的规则',
            null,
            (spread, setData) => {
                clearSheetRules(spread);
            }
        ),
    ]),
    toNormalMenu(
        'conditionFormatManageRule',
        '管理规则...',
        ConditionFormatManageRuleIcon
    ),
]);

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [data, setData] = useState({
        title: '',
        desc: '',
        operator: '',
        secondary: '',
        showTextCompareDialog: false,
        showDateCompareDialog: false,
        showDuplicateCompareDialog: false,
        showTextBetweenDialog: false,
        showNumberCompareDialog: false,
        showNumberApplyDiloag: false,
        showRuleEditor:false,
    });
    const handleNodeClick = (val, item) => {
        if (item.handler) {
            item.handler(spread, setData);
        }
    };
    const closeTextCompareDialog = () => {
        setData((data) => {
            return { ...data, showTextCompareDialog: false };
        });
    };
    const closeTextBetweenDialog = () => {
        setData((data) => {
            return { ...data, showTextBetweenDialog: false };
        });
    };
    const closeDateCompareDialog = () => {
        setData((data) => {
            return { ...data, showDateCompareDialog: false };
        });
    };
    const closeDuplicateCompareDialog = () => {
        setData((data) => {
            return { ...data, showDuplicateCompareDialog: false };
        });
    };
    const closeNumberCompareDialog = () => {
        setData((data) => {
            return { ...data, showNumberCompareDialog: false };
        });
    };
    const closeNumberApplyDialog = () => {
        setData((data) => {
            return { ...data, showNumberApplyDiloag: false };
        });
    };
    return (
        <Fragment>
            <ConditionFormatIconMenu
                onNodeClick={handleNodeClick}
            ></ConditionFormatIconMenu>
            {data.showTextCompareDialog ? (
                <TextCompareDialog
                    title={data.title}
                    desc={data.desc}
                    ruleType={data.ruleType}
                    operator={data.operator}
                    onCancel={closeTextCompareDialog}
                    onConfirm={closeTextCompareDialog}
                ></TextCompareDialog>
            ) : null}
            {data.showTextBetweenDialog ? (
                <TextBetweenDialog
                    title={data.title}
                    desc={data.desc}
                    ruleType={data.ruleType}
                    operator={data.operator}
                    onCancel={closeTextBetweenDialog}
                    onConfirm={closeTextBetweenDialog}
                ></TextBetweenDialog>
            ) : null}
            {data.showDateCompareDialog ? (
                <DateCompareDialog
                    title={data.title}
                    desc={data.desc}
                    ruleType={data.ruleType}
                    operator={data.operator}
                    onCancel={closeDateCompareDialog}
                    onConfirm={closeDateCompareDialog}
                ></DateCompareDialog>
            ) : null}
            {data.showDuplicateCompareDialog ? (
                <DuplicateCompareDialog
                    title={data.title}
                    desc={data.desc}
                    ruleType={data.ruleType}
                    operator={data.operator}
                    onCancel={closeDuplicateCompareDialog}
                    onConfirm={closeDuplicateCompareDialog}
                ></DuplicateCompareDialog>
            ) : null}
            {data.showNumberCompareDialog ? (
                <NumberCompareDialog
                    title={data.title}
                    desc={data.desc}
                    ruleType={data.ruleType}
                    operator={data.operator}
                    onCancel={closeNumberCompareDialog}
                    onConfirm={closeNumberCompareDialog}
                ></NumberCompareDialog>
            ) : null}
            {data.showNumberApplyDiloag ? (
                <NumberApplyDialog
                    title={data.title}
                    desc={data.desc}
                    ruleType={data.ruleType}
                    operator={data.operator}
                    secondary={data.secondary}
                    onCancel={closeNumberApplyDialog}
                    onConfirm={closeNumberApplyDialog}
                ></NumberApplyDialog>
            ) : null}
            {data.showRuleEditor ? <RuleEditor></RuleEditor>:null}
        </Fragment>
    );
}
