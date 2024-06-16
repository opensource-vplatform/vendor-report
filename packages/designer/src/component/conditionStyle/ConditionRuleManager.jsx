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

import { Range } from '@components/range/Index';
import {
  setRuleManagerConfig,
  setRuleManagerVisible,
} from '@store/conditionStyleSlice';
import { ConditionRule } from '@toone/report-excel';
import {
  Button,
  CheckBox,
  OperationDialog,
} from '@toone/report-ui';
import { uuid } from '@toone/report-util';
import {
  getRuleTitle,
  RuleFormat,
  showAddConditionRule,
  showEditConditionRule,
} from '@utils/conditionRuleUtil';
import { getNamespace } from '@utils/spreadUtil';

import { Commands } from '../../command';
import { exeCommand } from '../../utils/spreadUtil';
import {
  jsonToRanges,
  rangesToJson,
  toJson,
} from './RuleToJson';

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
    const { ruleManagerConfig } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const dispatch = useDispatch();
    const [data] = useState(() => {
        return { domId: uuid(), id2Rule: {} };
    });
    const handleAdd = () => {
        showAddConditionRule(dispatch, {
            onConfirm: (config) => {
                const rules = ruleManagerConfig.rules;
                const sheet = spread.getActiveSheet();
                const selections = sheet.getSelections();
                dispatch(
                    setRuleManagerConfig({
                        ...ruleManagerConfig,
                        rules: [
                            ...rules,
                            {
                                id: uuid(),
                                config: {
                                    ...config,
                                    ranges: rangesToJson(selections),
                                },
                            },
                        ],
                    })
                );
                dispatch(setRuleManagerVisible(true));
            },
            onCancel: () => {
                dispatch(setRuleManagerVisible(true));
            },
        });
    };
    const handleEdit = () => {
        const { rules, currentIndex } = ruleManagerConfig;
        const { config } = rules[currentIndex];
        showEditConditionRule(dispatch, {
            onConfirm: (config) => {
                const { rules, currentIndex } = ruleManagerConfig;
                const ruleConfig = rules[currentIndex];
                const newConfig = { ...ruleConfig, config };
                const newRules = [...rules];
                newRules[currentIndex] = newConfig;
                dispatch(
                    setRuleManagerConfig({
                        ...ruleManagerConfig,
                        rules: newRules,
                    })
                );
                dispatch(setRuleManagerVisible(true));
            },
            onCancel: () => {
                dispatch(setRuleManagerVisible(true));
            },
            json: config,
        });
    };
    const handleDel = () => {
        let { rules, currentIndex } = ruleManagerConfig;
        let newRules = [...rules];
        newRules.splice(currentIndex, 1);
        currentIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
        dispatch(
            setRuleManagerConfig({
                ...ruleManagerConfig,
                current: currentIndex,
                rules: newRules,
            })
        );
    };
    const handleMoveUp = () => {
        const { currentIndex } = ruleManagerConfig;
        const rules = [...ruleManagerConfig.rules];
        if (currentIndex > 0 && rules.length > 0) {
            const preIndex = currentIndex - 1;
            const pre = rules[preIndex];
            rules[preIndex] = rules[currentIndex];
            rules[currentIndex] = pre;
            dispatch(
                setRuleManagerConfig({
                    ...ruleManagerConfig,
                    currentIndex: preIndex,
                    rules,
                })
            );
        }
    };
    const handleMoveDown = () => {
        const index = ruleManagerConfig.currentIndex;
        const rules = [...ruleManagerConfig.rules];
        if (index < rules.length - 1 && rules.length > 0) {
            const nextIndex = index + 1;
            const pre = rules[nextIndex];
            rules[nextIndex] = rules[index];
            rules[index] = pre;
            dispatch(
                setRuleManagerConfig({
                    ...ruleManagerConfig,
                    currentIndex: nextIndex,
                    rules,
                })
            );
        }
    };
    useEffect(() => {
        if (spread && ruleManagerConfig.rules.length == 0) {
            const sheet = spread.getActiveSheet();
            if (!sheet) return;
            const conditionRules = sheet.conditionalFormats.getRules();
            const rules = [];
            conditionRules.forEach((rule) => {
                const id = uuid();
                rules.push({ id, config: toJson(rule) });
            });
            dispatch(
                setRuleManagerConfig({
                    ...ruleManagerConfig,
                    rules,
                })
            );
        }
    }, []);
    const handleConfirm = () => {
        handleApply();
        handleCancel();
    };
    const handleCancel = () => {
        dispatch(
            setRuleManagerConfig({
                currentIndex: 0,
                rules: [],
            })
        );
        dispatch(setRuleManagerVisible(false));
    };
    const handleApply = () => {
        const rules = ruleManagerConfig.rules;
        const configs = [];
        if (rules && rules.length > 0) {
            rules.forEach(({ config }) => {
                const rule = new ConditionRule(config);
                const ranges = config.ranges;
                const selections = jsonToRanges(ranges);
                configs.push({
                    rule,
                    selections,
                });
            });
        }
        exeCommand(spread, Commands.ConditionStyle.Reset, { configs });
    };
    return (
        <Fragment>
            <OperationDialog
                title='条件格式规则管理器'
                width='750px'
                height='330px'
                id={data.domId}
                tools={<Button onClick={handleApply}>应用</Button>}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            >
                <Buttons>
                    <Button style={btnStyle} onClick={handleAdd}>
                        新建规则...
                    </Button>
                    <Button
                        style={btnStyle}
                        disabled={ruleManagerConfig.rules.length == 0}
                        onClick={handleEdit}
                    >
                        编辑规则...
                    </Button>
                    <Button
                        style={btnStyle}
                        disabled={ruleManagerConfig.rules.length == 0}
                        onClick={handleDel}
                    >
                        删除规则
                    </Button>
                    <Button
                        style={btnStyle}
                        disabled={
                            ruleManagerConfig.rules.length == 0 ||
                            ruleManagerConfig.currentIndex == 0
                        }
                        onClick={handleMoveUp}
                    >
                        上移
                    </Button>
                    <Button
                        style={btnStyle}
                        disabled={
                            ruleManagerConfig.rules.length == 0 ||
                            ruleManagerConfig.currentIndex ==
                                ruleManagerConfig.rules.length - 1
                        }
                        onClick={handleMoveDown}
                    >
                        下移
                    </Button>
                </Buttons>
                <Grid
                    datas={ruleManagerConfig.rules}
                    current={ruleManagerConfig.currentIndex}
                    onSelection={(index) =>
                        dispatch(
                            setRuleManagerConfig({
                                ...ruleManagerConfig,
                                currentIndex: index,
                            })
                        )
                    }
                    columns={[
                        {
                            code: 'title',
                            title: '规则(按所示顺序应用)',
                            width: '35%',
                            render: function (value, row, datas, column) {
                                const config = row.config;
                                return <Label>{getRuleTitle(config)}</Label>;
                            },
                        },
                        {
                            code: 'format',
                            title: '格式',
                            width: '25%',
                            render: (value, row, datas, column) => {
                                const json = row.config;
                                return <RuleFormat json={json}></RuleFormat>;
                            },
                        },
                        {
                            code: 'apply',
                            title: '应用于',
                            width: '30%',
                            render: (value, row, datas, column) => {
                                const config = row.config;
                                const ranges = config.ranges || [];
                                const GC = getNamespace();
                                const formula =
                                    '=' +
                                    GC.Spread.Sheets.CalcEngine.rangesToFormula(
                                        ranges
                                    );
                                return (
                                    <Range
                                        hostId={data.domId}
                                        style={{
                                            width: '100%',
                                            height: 26,
                                        }}
                                        value={formula}
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
                                        onChange={(val) => {
                                            let ranges = null;
                                            try {
                                                const result =
                                                    GC.Spread.Sheets.CalcEngine.formulaToRanges(
                                                        spread.getActiveSheet(),
                                                        val
                                                    );
                                                ranges = [];
                                                result.forEach((item) => {
                                                    ranges = ranges.concat(
                                                        item.ranges
                                                    );
                                                });
                                            } catch (e) {
                                                ranges = [];
                                            }

                                            ranges = rangesToJson(ranges);
                                            const newRules = [...datas];
                                            const index = datas.indexOf(row);
                                            newRules[index] = {
                                                ...row,
                                                config: {
                                                    ...row.config,
                                                    ranges,
                                                },
                                            };
                                            dispatch(
                                                setRuleManagerConfig({
                                                    ...ruleManagerConfig,
                                                    rules: newRules,
                                                })
                                            );
                                        }}
                                    ></Range>
                                );
                            },
                        },
                        {
                            code: 'stopIfTrue',
                            title: '如果为真则停止',
                            width: '110px',
                            render: (value, row, datas, column) => {
                                const config = row.config;
                                const disabled =
                                    [
                                        'twoScaleRule',
                                        'threeScaleRule',
                                        'dataBarRule',
                                        'iconSetRule',
                                    ].indexOf(config.ruleType) != -1;
                                return (
                                    <Center>
                                        <CheckBox
                                            iconStyle={{
                                                height: 22,
                                            }}
                                            value={config.stopIfTrue}
                                            disabled={disabled}
                                            onChange={(val) => {
                                                const newConfig = {
                                                    ...config,
                                                    stopIfTrue: val,
                                                };
                                                const index =
                                                    datas.indexOf(row);
                                                const rules = [...datas];
                                                rules[index] = {
                                                    ...row,
                                                    config: newConfig,
                                                };
                                                dispatch(
                                                    setRuleManagerConfig({
                                                        ...ruleManagerConfig,
                                                        rules,
                                                    })
                                                );
                                            }}
                                        ></CheckBox>
                                    </Center>
                                );
                            },
                        },
                    ]}
                ></Grid>
            </OperationDialog>
        </Fragment>
    );
}
