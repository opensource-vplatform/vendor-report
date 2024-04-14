import { Fragment } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Menu from '@components/menu/Index';
import EmptyIcon from '@icons/base/Empty';
import ClearRulesIcon from '@icons/style/ClearRules';
import ColorScalesListIcon from '@icons/style/ColorScalesList';
import ConditionFormatManageRuleIcon from '@icons/style/ConditionFormatManageRule';
import ConditionFormatNewRuleIcon from '@icons/style/ConditionFormatNewRule';
import DataBarIcon from '@icons/style/DataBar';
import HighlightCellsRulesIcon from '@icons/style/HighlightCellsRules';
import IconSetListIcon from '@icons/style/IconSetList';
import TopBottomRulesIcon from '@icons/style/TopBottomRules';
import {
    setDateCompareVisible,
    setDuplicateCompareVisible,
    setNumberApplyVisible,
    setNumberCompareVisible,
    setRuleManagerVisible,
    setShowEditor,
    setTextBetweenVisible,
    setTextCompareVisible,
} from '@store/conditionStyleSlice';
import { ConditionRule } from '@toone/report-excel';
import { clearSelectedRules, clearSheetRules } from '@utils/formatterUtil';
import { isArray, isFunction } from '@utils/objectUtil';

import { reset } from '../../store/cellSettingSlice';
import { withBatchUpdate } from '../../utils/spreadUtil';
import ConditionRuleManager from './ConditionRuleManager';
import DateCompareDialog from './DateCompareDialog';
import { dispatcher } from './dispatcher';
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
    toConditionMenuType,
    toNormalMenu,
} from './Utils';

const withHandler = function (menus) {
    const handler = (menu) => {
        const value = menu.value;
        const handler = dispatcher[value];
        if (isFunction(handler)) {
            menu.handler = handler;
        }
        const children = menu.children;
        if (isArray(children)) {
            withHandler(children);
        }
    };
    if (isArray(menus)) {
        menus.forEach((menu) => handler(menu));
    } else {
        handler(menus);
    }
    return menus;
};

const Condition_Menu_Datas = [
    toConditionMenuType(
        'highlightCellsRules',
        '突出显示单元格规则',
        HighlightCellsRulesIcon,
        [
            ...withHandler(getHighlightCellsRulesMenu()),
            'divider',
            withHandler({
                value: 'highlightCellsMoreRules',
                title: '其他规则...',
                text: '其他规则...',
            }),
        ]
    ),
    toConditionMenuType('topBottomRules', '项目选取规则', TopBottomRulesIcon, [
        ...withHandler(getTopBottomRulesMenu()),
        'divider',
        withHandler({
            value: 'topBottomRulesMoreRules',
            title: '其他规则...',
            text: '其他规则...',
        }),
    ]),
    'divider',
    toConditionMenuType('dataBar', '数据条', DataBarIcon, [
        ...withHandler(getDataBarMenu()),
        'divider',
        withHandler({
            value: 'dataBarMoreRules',
            title: '其他规则...',
            text: '其他规则...',
            icon: <EmptyIcon></EmptyIcon>,
        }),
    ]),
    toConditionMenuType('colorScalesList', '色阶', ColorScalesListIcon, [
        ...withHandler(getColorScalesMenu()),
        'divider',
        withHandler({
            value: 'colorScalesListMoreRules',
            title: '其他规则...',
            text: '其他规则...',
            icon: <EmptyIcon></EmptyIcon>,
        }),
    ]),
    toConditionMenuType('iconSetList', '图标集', IconSetListIcon, [
        ...withHandler(getIconSetMenu()),
        'divider',
        withHandler({
            value: 'iconSetListMoreRules',
            text: '其他规则...',
            title: '其他规则...',
            icon: <EmptyIcon></EmptyIcon>,
        }),
    ]),
    'divider',
    withHandler(
        toNormalMenu(
            'conditionFormatNewRule',
            '新建规则...',
            ConditionFormatNewRuleIcon
        )
    ),
    toNormalMenu('clearRules', '清除规则', ClearRulesIcon, [
        toNormalMenu(
            'clearSeletedRules',
            '清除所选单元格的规则',
            null,
            (spread, dispatcher) => {
                clearSelectedRules(spread);
            }
        ),
        toNormalMenu(
            'clearAllRules',
            '清除整个工作表的规则',
            null,
            (spread, dispatcher) => {
                clearSheetRules(spread);
            }
        ),
    ]),
    toNormalMenu(
        'conditionFormatManageRule',
        '管理规则...',
        ConditionFormatManageRuleIcon,
        (spread, dispatcher) => {
            dispatcher(setRuleManagerVisible(true));
        }
    ),
];

export default function (props) {
    const { children } = props;
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const dispatcher = useDispatch();
    const conditionStyle = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const handleNodeClick = (val, item) => {
        if (isFunction(item.handler)) {
            item.handler(spread, dispatcher, applyRule);
        }
    };

    const clearCellSetting = () => {
        dispatcher(reset());
    };

    const closeTextCompareDialog = () => {
        dispatcher(setTextCompareVisible(false));
    };
    const closeTextBetweenDialog = () => {
        dispatcher(setTextBetweenVisible(false));
    };
    const closeDateCompareDialog = () => {
        dispatcher(setDateCompareVisible(false));
    };
    const closeDuplicateCompareDialog = () => {
        dispatcher(setDuplicateCompareVisible(false));
    };
    const closeNumberCompareDialog = () => {
        dispatcher(setNumberCompareVisible(false));
    };
    const closeNumberApplyDialog = () => {
        dispatcher(setNumberApplyVisible(false));
    };
    const closeRuleEditor = () => {
        clearCellSetting();
        dispatcher(setShowEditor(false));
    };

    const applyNewRule = () => {
        const config = {
            ...conditionStyle.editorConfig,
            ruleType: conditionStyle.ruleType,
        };
        const rule = new ConditionRule(config);
        applyRule(rule);
        closeRuleEditor();
    };

    const applyRule = (rule) => {
        withBatchUpdate(spread, (sheet) => {
            const selections = sheet.getSelections();
            rule.bind(sheet);
            rule.applySelections(selections);
        });
    };

    const applyTextCompareSetting = (rule) => {
        applyRule(rule);
        closeTextCompareDialog();
    };

    const applyTextBetweenSetting = (rule) => {
        applyRule(rule);
        closeTextBetweenDialog();
    };

    const applyDateCompareSetting = (rule) => {
        applyRule(rule);
        closeDateCompareDialog();
    };

    const applyDuplicateCompareSetting = (rule) => {
        applyRule(rule);
        closeDuplicateCompareDialog();
    };

    const applyNumberCompareSetting = (rule) => {
        applyRule(rule);
        closeNumberCompareDialog();
    };

    const applyNumberApplySetting = (rule) => {
        applyRule(rule);
        closeNumberApplyDialog();
    };
    return (
        <Fragment>
            <Menu datas={Condition_Menu_Datas} onNodeClick={handleNodeClick}>
                {children}
            </Menu>
            {conditionStyle.textCompareVisible ? (
                <TextCompareDialog
                    onCancel={closeTextCompareDialog}
                    onConfirm={applyTextCompareSetting}
                ></TextCompareDialog>
            ) : null}
            {conditionStyle.textBetweenVisible ? (
                <TextBetweenDialog
                    onCancel={closeTextBetweenDialog}
                    onConfirm={applyTextBetweenSetting}
                ></TextBetweenDialog>
            ) : null}
            {conditionStyle.dateCompareVisible ? (
                <DateCompareDialog
                    onCancel={closeDateCompareDialog}
                    onConfirm={applyDateCompareSetting}
                ></DateCompareDialog>
            ) : null}
            {conditionStyle.duplicateCompareVisible ? (
                <DuplicateCompareDialog
                    onCancel={closeDuplicateCompareDialog}
                    onConfirm={applyDuplicateCompareSetting}
                ></DuplicateCompareDialog>
            ) : null}
            {conditionStyle.numberCompareVisible ? (
                <NumberCompareDialog
                    onCancel={closeNumberCompareDialog}
                    onConfirm={applyNumberCompareSetting}
                ></NumberCompareDialog>
            ) : null}
            {conditionStyle.numberApplyVisible ? (
                <NumberApplyDialog
                    onCancel={closeNumberApplyDialog}
                    onConfirm={applyNumberApplySetting}
                ></NumberApplyDialog>
            ) : null}
            {conditionStyle.showEditor ? (
                <RuleEditor
                    onCancel={closeRuleEditor}
                    onConfirm={applyNewRule}
                ></RuleEditor>
            ) : null}
            {conditionStyle.ruleManagerVisible ? (
                <ConditionRuleManager></ConditionRuleManager>
            ) : null}
        </Fragment>
    );
}
