import { Fragment } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Divider } from '@components/divider/Index';
import { Select } from '@components/form/Index';
import { Range } from '@components/range/Index';
import {
    setEditorConfig,
    setRuleType,
    setShowEditor,
} from '@store/conditionStyleSlice';
import { getNamespace } from '@utils/spreadUtil';

import { Border, HLayout, Item, Text, Title, VLayout } from '../../Components';
import { itemStyle } from '../../Utils';
import { CellPreview, FormatButton } from '../Components';

const Type_Options = [
    { value: 'cellValueRule', text: '单元格值' },
    { value: 'specificTextRule', text: '特定文本' },
    { value: 'dateOccurringRule', text: '发生日期' },
    { value: 'blanks', text: '空值' },
    { value: 'noBlanks', text: '无空值' },
    { value: 'errors', text: '错误' },
    { value: 'noErrors', text: '无错误' },
];

const Operator_Options_Map = {
    cellValueRule: [
        { value: 'between', text: '介于' },
        { value: 'notBetween', text: '未介于' },
        { value: 'equalTo', text: '等于' },
        { value: 'notEqualTo', text: '不等于' },
        { value: 'greaterThan', text: '大于' },
        { value: 'lessThan', text: '小于' },
        { value: 'greaterThanOrEqu', text: '大于或等于' },
        { value: 'lessThanOrEqu', text: '小于或等于' },
    ],
    specificTextRule: [
        { value: 'contains', text: '包含' },
        { value: 'doesNotContain', text: '不包含' },
        { value: 'beginsWith', text: '始于' },
        { value: 'endsWith', text: '止于' },
    ],
    dateOccurringRule: [
        { value: 'yesterday', text: '昨天' },
        { value: 'today', text: '今天' },
        { value: 'tomorrow', text: '明天' },
        { value: 'last7Days', text: '最近7天' },
        { value: 'lastWeek', text: '上周' },
        { value: 'thisWeek', text: '本周' },
        { value: 'nextWeek', text: '下周' },
        { value: 'lastMonth', text: '上个月' },
        { value: 'thisMonth', text: '本月' },
        { value: 'nextMonth', text: '下个月' },
    ],
};

const getOperatorOptions = function (type) {
    return Operator_Options_Map[type];
};

const enhanceRuleType = function (ruleType, editorConfig) {
    if (ruleType == 'formulaRule') {
        const formula = editorConfig.formula;
        if (formula.startsWith('=ISBLANK(')) {
            ruleType = 'blanks';
        } else if (formula.startsWith('=NOT(ISBLANK(')) {
            ruleType = 'noBlanks';
        } else if (formula.startsWith('=ISERROR(')) {
            ruleType = 'errors';
        } else if (formula.startsWith('=NOT(ISERROR(')) {
            ruleType = 'noErrors';
        }
    }
    return ruleType;
};

export default function (props) {
    const { hostId } = props;
    const { editorConfig, ruleType } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const operatorOptions = getOperatorOptions(ruleType);
    const dispatcher = useDispatch();
    const { operator } = editorConfig;
    const needOperator = !!operatorOptions;
    const needVal = needOperator && ruleType != 'dateOccurringRule';
    const isSingleVal =
        needVal &&
        (ruleType == 'specificTextRule' || ruleType == 'cellValueRule');
    const isTwoVal =
        needVal &&
        ruleType == 'cellValueRule' &&
        ['between', 'notBetween'].indexOf(operator) != -1;
    return (
        <Fragment>
            <Title>编辑规则说明：</Title>
            <Border>
                <VLayout style={{ gap: 4 }}>
                    <Text>只为满足以下条件的单元格设置格式：</Text>
                    <HLayout style={itemStyle}>
                        <Item>
                            <Select
                                datas={Type_Options}
                                value={enhanceRuleType(ruleType, editorConfig)}
                                onChange={(val) => {
                                    const config = {
                                        ...editorConfig,
                                    };
                                    if (val == 'cellValueRule') {
                                        config.operator = 'between';
                                    } else if (val == 'specificTextRule') {
                                        config.operator = 'contains';
                                        config.value1 = undefined;
                                        config.value2 = undefined;
                                    } else if (val == 'dateOccurringRule') {
                                        config.type = 'yesterday';
                                        config.operator = undefined;
                                        config.value1 = undefined;
                                        config.value2 = undefined;
                                    } else {
                                        config.operator = undefined;
                                        config.value1 = undefined;
                                        config.value2 = undefined;
                                        let formulaArg = '';
                                        if (spread) {
                                            const sheet =
                                                spread.getActiveSheet();
                                            if (sheet) {
                                                const selections =
                                                    sheet.getSelections();
                                                const selection = selections[0];
                                                const GC = getNamespace();
                                                formulaArg +=
                                                    GC.Spread.Sheets.CalcEngine.rangeToFormula(
                                                        selection,
                                                        0,
                                                        0,
                                                        GC.Spread.Sheets
                                                            .CalcEngine
                                                            .RangeReferenceRelative
                                                            .allAbsolute
                                                    );
                                            } else {
                                                formulaArg += '@';
                                            }
                                        }
                                        let formula;
                                        switch (val) {
                                            case 'blanks':
                                                formula =
                                                    '=ISBLANK(' +
                                                    formulaArg +
                                                    ')';
                                                break;
                                            case 'noBlanks':
                                                formula =
                                                    '=NOT(ISBLANK(' +
                                                    formulaArg +
                                                    '))';
                                                break;
                                            case 'errors':
                                                formula =
                                                    '=ISERROR(' +
                                                    formulaArg +
                                                    ')';
                                                break;
                                            case 'noErrors':
                                                formula =
                                                    '=NOT(ISERROR(' +
                                                    formulaArg +
                                                    '))';
                                        }
                                        config.formula = formula;
                                        val = 'formulaRule';
                                    }
                                    dispatcher(setEditorConfig(config));
                                    dispatcher(setRuleType(val));
                                }}
                            ></Select>
                        </Item>
                        <Item>
                            {needOperator ? (
                                <Select
                                    datas={operatorOptions}
                                    value={
                                        ruleType == 'dateOccurringRule'
                                            ? editorConfig.type
                                            : editorConfig.operator
                                    }
                                    onChange={(val) =>
                                        dispatcher(
                                            setEditorConfig({
                                                ...editorConfig,
                                                operator:
                                                    ruleType ==
                                                    'dateOccurringRule'
                                                        ? undefined
                                                        : val,
                                                type:
                                                    ruleType ==
                                                    'dateOccurringRule'
                                                        ? val
                                                        : undefined,
                                            })
                                        )
                                    }
                                ></Select>
                            ) : null}
                        </Item>
                        <Item>
                            {isSingleVal ? (
                                <Range
                                    hostId={hostId}
                                    style={{ width: '100%', height: 26 }}
                                    value={editorConfig.value1}
                                    onStartSelect={() =>
                                        dispatcher(setShowEditor(false))
                                    }
                                    onEndSelect={() =>
                                        dispatcher(setShowEditor(true))
                                    }
                                    onChange={(val) =>
                                        dispatcher(
                                            setEditorConfig({
                                                ...editorConfig,
                                                value1:
                                                    ruleType ==
                                                    'specificTextRule'
                                                        ? undefined
                                                        : val,
                                                text:
                                                    ruleType ==
                                                    'specificTextRule'
                                                        ? val
                                                        : undefined,
                                            })
                                        )
                                    }
                                ></Range>
                            ) : null}
                        </Item>
                        {isTwoVal ? <Text>与</Text> : null}
                        <Item>
                            {isTwoVal ? (
                                <Range
                                    hostId={hostId}
                                    value={editorConfig.value2}
                                    onStartSelect={() =>
                                        dispatcher(setShowEditor(false))
                                    }
                                    onEndSelect={() =>
                                        dispatcher(setShowEditor(true))
                                    }
                                    onChange={(val) =>
                                        dispatcher(
                                            setEditorConfig({
                                                ...editorConfig,
                                                value2: val,
                                            })
                                        )
                                    }
                                    style={{ width: '100%', height: 26 }}
                                ></Range>
                            ) : null}
                        </Item>
                    </HLayout>
                    <HLayout style={{ ...itemStyle, height: 30 }}>
                        <Divider type='horizontal'></Divider>
                    </HLayout>
                    <HLayout style={{ ...itemStyle, marginBottom: 16 }}>
                        <Text>预览：</Text>
                        <CellPreview></CellPreview>
                        <FormatButton>格式...</FormatButton>
                    </HLayout>
                </VLayout>
            </Border>
        </Fragment>
    );
}
