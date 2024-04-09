import { Fragment } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { Divider } from '@components/divider/Index';
import {
  Button,
  Select,
} from '@components/form/Index';
import { Range } from '@components/range/Index';
import { setVisible } from '@store/cellSettingSlice';

import {
  setEditorConfig,
  setRuleType,
  setShowEditor,
} from '../../../../store/conditionStyleSlice';
import {
  Border,
  FontPreview,
  HLayout,
  Item,
  Text,
  Title,
  VLayout,
} from '../../Components';
import { itemStyle } from '../../Utils';

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
        { value: 'containing', text: '包含' },
        { value: 'notContaining', text: '不包含' },
        { value: 'beginningWith', text: '始于' },
        { value: 'endingWith', text: '止于' },
    ],
    dateOccurringRule: [
        { value: 'yesterday', text: '昨天' },
        { value: 'today', text: '今天' },
        { value: 'tomorrow', text: '明天' },
        { value: 'last7days', text: '最近7天' },
        { value: 'lastweek', text: '上周' },
        { value: 'thisweek', text: '本周' },
        { value: 'nextweek', text: '下周' },
        { value: 'lastmonth', text: '上个月' },
        { value: 'thismonth', text: '本月' },
        { value: 'nextmonth', text: '下个月' },
    ],
};

const getOperatorOptions = function (type) {
    return Operator_Options_Map[type];
};

export default function (props) {
    const { hostId } = props;
    const { editorConfig, ruleType } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const operatorOptions = getOperatorOptions(ruleType);
    const dispatcher = useDispatch();
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
                                value={ruleType}
                                onChange={(val) => {
                                    let operator = null;
                                    if (val == 'cellValueRule') {
                                        operator = 'between';
                                    } else if (val == 'specificTextRule') {
                                        operator = 'containing';
                                    } else if (val == 'dateOccurringRule') {
                                        operator = 'yesterday';
                                    }
                                    dispatcher(
                                        setEditorConfig({
                                            ...editorConfig,
                                            operator,
                                        })
                                    );
                                    dispatcher(setRuleType(val));
                                }}
                            ></Select>
                        </Item>
                        <Item>
                            {operatorOptions ? (
                                <Select
                                    datas={operatorOptions}
                                    value={editorConfig.operator}
                                    onChange={(val) =>
                                        dispatcher(
                                            setEditorConfig({
                                                ...editorConfig,
                                                operator: val,
                                            })
                                        )
                                    }
                                ></Select>
                            ) : null}
                        </Item>
                        <Item>
                            {operatorOptions ? (
                                <Range
                                    hostId={hostId}
                                    style={{ width: '100%', height: 26 }}
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
                                                value1: val,
                                            })
                                        )
                                    }
                                ></Range>
                            ) : null}
                        </Item>
                        {operatorOptions ? <Text>与</Text> : null}
                        <Item>
                            {operatorOptions ? (
                                <Range
                                    hostId={hostId}
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
                        <FontPreview></FontPreview>
                        <Button
                            style={{ height: 30 }}
                            onClick={() => dispatcher(setVisible(true))}
                        >
                            格式...
                        </Button>
                    </HLayout>
                </VLayout>
            </Border>
        </Fragment>
    );
}
