import { Fragment, useState } from 'react';

import { useSelector } from 'react-redux';

import EmptyIcon from '@icons/base/Empty';
import ClearRulesIcon from '@icons/style/ClearRules';

import ColorScalesListIcon from '@icons/style/ColorScalesList';
import ConditionFormatIcon from '@icons/style/conditionFormat';
import ConditionFormatManageRuleIcon from '@icons/style/ConditionFormatManageRule';
import ConditionFormatNewRuleIcon from '@icons/style/ConditionFormatNewRule';
import DataBarIcon from '@icons/style/DataBar';

import HighlightCellsRulesIcon from '@icons/style/HighlightCellsRules';

import IconSetListIcon from '@icons/style/IconSetList';
import TopBottomRulesIcon from '@icons/style/TopBottomRules';

import { WithIconMenu } from '@utils/componentUtils';

import {
    addColorScaleAutoRule,
    addDataBarFormat,
    addIconSetAutoRule,
    clearSelectedRules,
    clearSheetRules,
} from '@utils/formatterUtil';
import { isFunction } from '@utils/objectUtil';
import DateCompareDialog from './DateCompareDialog';
import DuplicateCompareDialog from './DuplicateCompareDialog';
import RuleEditor from './editor/Index';
import NumberApplyDialog from './NumberApplyDialog';
import NumberCompareDialog from './NumberCompareDialog';
import TextBetweenDialog from './TextBetweenDialog';
import TextCompareDialog from './TextCompareDialog';
import {
    getColorScalesMenu,
    getDataBarMenu,
    getHighlightCellsRulesMenu,
    getIconSetMenu,
    getTopBottomRulesMenu,
} from './Utils';
import { isArray } from '@utils/objectUtil';
import { toConditionMenuType, toNormalMenu } from './Utils';

const dispatcher = {
    highlightCellsRulesGreaterThan: (spread, setData) => {
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
    },
    highlightCellsRulesLessThan: (spread, setData) => {
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
    },
    highlightCellsRulesBetween: (spread, setData) => {
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
    },
    highlightCellsRulesEqualTo: (spread, setData) => {
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
    },
    highlightCellsRulesContains: (spread, setData) => {
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
    },
    highlightCellsRulesDateOccurring: (spread, setData) => {
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
    },
    highlightCellsRulesDuplicateValues: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                title: '重复值',
                desc: '为包含以下类型值的单元格设置格式',
                showDuplicateCompareDialog: true,
            };
        });
    },
    topBottomRulesTop10: (spread, setData) => {
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
    },
    topBottomRulesBottom10: (spread, setData) => {
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
    },
    topBottomRulesAboveAverage: (spread, setData) => {
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
    },
    topBottomRulesBelowAverage: (spread, setData) => {
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
};

const withHandler = function (menus) {
    menus.forEach((menu) => {
        const value = menu.value;
        const handler = dispatcher[value];
        if (isFunction(handler)) {
            menu.handler = handler;
        }
        const children = menu.children;
        if (isArray(children)) {
            withHandler(children);
        }
    });
    return menus;
};

const ConditionFormatIconMenu = WithIconMenu('条件格式', ConditionFormatIcon, [
    toConditionMenuType(
        'highlightCellsRules',
        '突出显示单元格规则',
        HighlightCellsRulesIcon,
        [
            ...withHandler(getHighlightCellsRulesMenu()),
            'divider',
            {
                value: 'highlightCellsMoreRules',
                title: '其他规则...',
                text: '其他规则...',
            },
        ]
    ),
    toConditionMenuType('topBottomRules', '项目选取规则', TopBottomRulesIcon, [
        ...withHandler(getTopBottomRulesMenu()),
        'divider',
        {
            value: 'topBottomRulesMoreRules',
            title: '其他规则...',
            text: '其他规则...',
        },
    ]),
    'divider',
    toConditionMenuType('dataBar', '数据条', DataBarIcon, [
        ...withHandler(getDataBarMenu()),
        'divider',
        {
            value: 'others',
            title: '其他规则...',
            text: '其他规则...',
            icon: <EmptyIcon></EmptyIcon>,
        },
    ]),
    toConditionMenuType('colorScalesList', '色阶', ColorScalesListIcon, [
        ...withHandler(getColorScalesMenu()),
        'divider',
        {
            value: 'others',
            title: '其他规则...',
            text: '其他规则...',
            icon: <EmptyIcon></EmptyIcon>,
        },
    ]),
    toConditionMenuType('iconSetList', '图标集', IconSetListIcon, [
        ...withHandler(getIconSetMenu()),
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
        function (spread, setData) {
            setData((data) => {
                return { ...data, showRuleEditor: true };
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
        showRuleEditor: false,
    });
    const handleNodeClick = (val, item) => {
        if (isFunction(item.handler)) {
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
            {data.showRuleEditor ? <RuleEditor></RuleEditor> : null}
        </Fragment>
    );
}
