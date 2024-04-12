import {
  Fragment,
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import { OperationDialog } from '@components/dialog/Index';
import {
  Button,
  CheckBox,
} from '@components/form/Index';
import { Range } from '@components/range/Index';
import {
  setEditorConfig,
  setEditorType,
  setRuleManagerVisible,
  setRuleType,
} from '@store/conditionStyleSlice';
import { genUUID } from '@utils/commonUtil';
import {
  getRuleTitle,
  RuleFormat,
} from '@utils/conditionRuleUtil';
import { getNamespace } from '@utils/spreadUtil';

import { setShowEditor } from '../../store/conditionStyleSlice';

const Buttons = styled.div`
    display: flex;
`;

const Wrap = styled.div`
    background-color: white;
    overflow: auto;
    border: 1px solid #aaa;
    display: flex;
    flex-direction: column;
`;

const HeaderWrap = styled.div`
    border-bottom: 1px solid #aaa;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 0px;
    box-sizing: border-box;
    background-color: #f0f0f0;
    & ~ div[data-type='header'] {
        border-left: solid 1px #aaa;
    }
`;

const Center = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RowWrap = styled.div`
    border-bottom: 1px solid #aaa;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    box-sizing: border-box;
    & ~ div[data-type='cell'] {
        border-left: solid 1px #aaa;
    }
`;

const HLayout = styled.div`
    display: flex;
    &[data-selected='true'] {
        background-color: #f0f0f0;
    }
    &[data-type='row']:hover {
        background-color: #f0f0f0;
    }
`;

const Label = styled.span`
    font-size: 12px;
    margin-right: 16px;
`;

const Color = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
`;

const Warn = styled.div`
    font-size: 14px;
    padding: 12px;
`;

const Header = function (props) {
    const { children, width, height } = props;
    return (
        <HeaderWrap data-type='header' style={{ width, height }}>
            {children}
        </HeaderWrap>
    );
};

const Row = function (props) {
    const { data, isCurrent, datas, columns, handleChange, onClick } = props;
    return (
        <HLayout data-type='row' data-selected={isCurrent} onClick={onClick}>
            {columns.map((column, index) => {
                return (
                    <RowWrap
                        data-type='cell'
                        key={index}
                        style={{ width: column.width }}
                    >
                        {column.render(data[column.code], data, datas, column)}
                    </RowWrap>
                );
            })}
        </HLayout>
    );
};

const Grid = function (props) {
    const { datas, columns, current = 0, onSelection } = props;
    return (
        <Wrap style={{ width: '100%', height: 200 }}>
            <HLayout>
                {columns.map(({ code, title, width }) => {
                    return (
                        <Header width={width} key={code}>
                            {title}
                        </Header>
                    );
                })}
            </HLayout>
            {datas.map((data, index) => {
                return (
                    <Row
                        isCurrent={current == index}
                        data={data}
                        datas={datas}
                        key={data.id}
                        columns={columns}
                        onClick={() => {
                            if (current !== index) {
                                onSelection(index);
                            }
                        }}
                    ></Row>
                );
            })}
        </Wrap>
    );
};

const getValidValue = function (val, datas) {
    const data = datas.find((data) => data.value == val);
    if (data) {
        return val;
    }
    return datas[0].value;
};

const updateCondition = function (id, key, val, conditions) {
    const condition = conditions.find((condition) => condition.id == id);
    if (condition && condition[key] != val) {
        condition[key] = val;
        return [...conditions];
    }
    return null;
};

const btnStyle = {
    padding: 4,
    marginTop: 8,
    marginBottom: 8,
    marginRight: 4,
};

export default function (props) {
    const { onCancel, onConfirm } = props;
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const dispatch = useDispatch();
    const [data, setData] = useState(() => {
        return {
            current: 0,
            domId: genUUID(),
            rules: [],
        };
    });
    const handleAdd = () => {
        dispatch(setEditorType('formatOnValue'));
        dispatch(setRuleType('twoScaleRule'));
        dispatch(
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
        dispatch(setShowEditor(true));
    };
    const handleEdit = ()=>{

    }
    const handleDel = () => {
        const rules = data.rules;
        let current = data.current;
        rules.splice(current, 1);
        current = current > 0 ? current - 1 : current;
        setData({
            ...data,
            current,
            rules: [...rules],
        });
    };
    const handleMoveUp = () => {
        const index = data.current;
        const rules = data.rules;
        if (index > 0 && rules.length > 0) {
            const preIndex = index - 1;
            const pre = rules[preIndex];
            rules[preIndex] = rules[index];
            rules[index] = pre;
            setData({
                ...data,
                current: preIndex,
                rules: [...rules],
            });
        }
    };
    const handleMoveDown = () => {
        const index = data.current;
        const rules = data.rules;
        if (index < rules.length - 1 && rules.length > 0) {
            const nextIndex = index + 1;
            const pre = rules[nextIndex];
            rules[nextIndex] = rules[index];
            rules[index] = pre;
            setData({
                ...data,
                current: nextIndex,
                rules: [...rules],
            });
        }
    };
    const handleCancel = ()=>{
        dispatch(setRuleManagerVisible(false));
    }
    useEffect(() => {
        if (spread) {
            const sheet = spread.getActiveSheet();
            if (!sheet) return;
            const conditionRules = sheet.conditionalFormats.getRules();
            const rules = [];
            conditionRules.forEach((rule) => {
                rules.push({ title: getRuleTitle(rule), rule });
            });
            setData({
                ...data,
                rules,
            });
        }
    }, []);
    return (
        <Fragment>
            <OperationDialog
                title='条件格式规则管理器'
                width='750px'
                height='330px'
                id={data.domId}
                onCancel={handleCancel}
                onConfirm={() =>
                    onConfirm({
                        sortType: data.sortType,
                        conditions: data.conditions,
                    })
                }
            >
                <Buttons>
                    <Button style={btnStyle} onClick={handleAdd}>
                        新建规则...
                    </Button>
                    <Button
                        style={btnStyle}
                        disabled={data.rules.length == 0}
                        onClick={handleEdit}
                    >
                        编辑规则...
                    </Button>
                    <Button
                        style={btnStyle}
                        disabled={data.rules.length == 0}
                        onClick={handleDel}
                    >
                        删除规则
                    </Button>
                    <Button
                        style={btnStyle}
                        disabled={
                            data.rules.length == 0 || data.current == 0
                        }
                        onClick={handleMoveUp}
                    >
                        上移
                    </Button>
                    <Button
                        style={btnStyle}
                        disabled={
                            data.rules.length == 0 ||
                            data.current == data.rules.length - 1
                        }
                        onClick={handleMoveDown}
                    >
                        下移
                    </Button>
                </Buttons>
                <Grid
                    datas={data.rules}
                    current={data.current}
                    onSelection={(index) =>
                        setData({ ...data, current: index })
                    }
                    columns={[
                        {
                            code: 'title',
                            title: '规则(按所示顺序应用)',
                            width: '35%',
                            render: function (value, row, datas, column) {
                                return <Label>{value}</Label>;
                            },
                        },
                        {
                            code: 'format',
                            title: '格式',
                            width: '25%',
                            render: (value, row, datas, column) => {
                                return <RuleFormat rule={row.rule}></RuleFormat>
                            },
                        },
                        {
                            code: 'apply',
                            title: '应用于',
                            width: '30%',
                            render: (value, row, datas, column) => {
                                return (
                                    <Range
                                        hostId={data.domId}
                                        style={{
                                            width: '100%',
                                            height: 26
                                        }}
                                        onStartSelect={() =>
                                            dispatch(
                                                setRuleManagerVisible(false)
                                            )
                                        }
                                        onEndSelect={() =>
                                            dispatch(
                                                setRuleManagerVisible(true)
                                            )
                                        }
                                    ></Range>
                                );
                            },
                        },
                        {
                            code: 'sortBy',
                            title: '如果为真则停止',
                            width: '110px',
                            render: (value, row, datas, column) => {
                                let disabled = false;
                                const rule = row.rule;
                                const GC = getNamespace();
                                const RuleType =
                                    GC.Spread.Sheets.ConditionalFormatting
                                        .RuleType;
                                switch (rule.ruleType()) {
                                    case RuleType.twoScaleRule:
                                    case RuleType.threeScaleRule:
                                    case RuleType.dataBarRule:
                                    case RuleType.iconSetRule:
                                        disabled = true;
                                }
                                return (
                                    <Center>
                                        <CheckBox
                                            iconStyle={{
                                                height: 22
                                            }}
                                            disabled={disabled}
                                        ></CheckBox>
                                    </Center>
                                );
                            },
                        },
                    ]}
                ></Grid>
            </OperationDialog>
            {data.showWran ? (
                <OperationDialog
                    title='消息提示'
                    width='248px'
                    height='150px'
                    onCancel={() => {
                        setData({
                            ...data,
                            showWran: false,
                            sortTypeTemp: null,
                        });
                    }}
                    onConfirm={() => {
                        setData({
                            ...data,
                            showWran: false,
                            sortType: data.sortTypeTemp,
                            sortTypeTemp: null,
                            conditions: [],
                        });
                    }}
                >
                    <Warn>更改选项将清除排序条件，确定清除吗？</Warn>
                </OperationDialog>
            ) : null}
        </Fragment>
    );
}
