import {
  Fragment,
  useState,
} from 'react';

import styled from 'styled-components';

import {
  Button,
  CheckBox,
  Integer,
  OperationDialog,
  Select,
  TextInput,
} from '@toone/report-ui';
import { uuid } from '@toone/report-util';

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

const MENU_DATAS = [
    { value: 'sortByCol', text: '按列排序' },
    { value: 'sortByRow', text: '按行排序' },
];

const OPERATOR_DATAS = [
    {
        value: '<',
        text: '小于',
    },
    {
        value: '<=',
        text: '小于或等于',
    },
    {
        value: '=',
        text: '等于',
    },
    {
        value: '>',
        text: '大于',
    },
    {
        value: '>=',
        text: '大于或等于',
    },
];

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

const updateCondition = function (id, key, val, conditions) {
    const condition = conditions.find((condition) => condition.id == id);
    if (condition && condition[key] != val) {
        condition[key] = val;
        return [...conditions];
    }
    return null;
};

export default function (props) {
    const {
        onCancel = () => {},
        onConfirm = () => {},
        tableFields = [],
        conditions = [],
    } = props;

    const [data, setData] = useState({
        current: 0,
        conditions: JSON.parse(JSON.stringify(conditions)),
    });
    const btnStyle = {
        padding: 4,
        marginTop: 8,
        marginBottom: 8,
        marginRight: 4,
    };

    const handleAddCondition = () => {
        const conditions = [...data.conditions];
        conditions.push({
            id: uuid(),
            field: '',
            operator: '=',
            value: '',
            fillQuantity: 15,
            isStopWhileTrue: false,
        });
        setData({
            ...data,
            current: conditions.length - 1,
            conditions,
        });
    };
    const handleDelCondition = () => {
        const conditions = data.conditions;
        let current = data.current;
        conditions.splice(current, 1);
        current = current > 0 ? current - 1 : current;
        setData({
            ...data,
            current,
            conditions: [...conditions],
        });
    };
    const handleCopyCondition = () => {
        const conditions = data.conditions;
        const condition = conditions[data.current];
        if (condition) {
            const newCondition = { ...condition };
            newCondition.id = uuid();
            const newConditions = [...conditions, newCondition];
            setData({
                ...data,
                current: newConditions.length - 1,
                conditions: newConditions,
            });
        }
    };
    const handleConditionMoveUp = () => {
        const index = data.current;
        const conditions = data.conditions;
        if (index > 0 && conditions.length > 0) {
            const preIndex = index - 1;
            const pre = conditions[preIndex];
            conditions[preIndex] = conditions[index];
            conditions[index] = pre;
            setData({
                ...data,
                current: preIndex,
                conditions: [...conditions],
            });
        }
    };
    const handleConditionMoveDown = () => {
        const index = data.current;
        const conditions = data.conditions;
        if (index < conditions.length - 1 && conditions.length > 0) {
            const nextIndex = index + 1;
            const pre = conditions[nextIndex];
            conditions[nextIndex] = conditions[index];
            conditions[index] = pre;
            setData({
                ...data,
                current: nextIndex,
                conditions: [...conditions],
            });
        }
    };
    const columns = [
        {
            code: 'field',
            title: '字段',
            width: '40%',
            render: function (value, row, datas, column) {
                return (
                    <Fragment>
                        <Select
                            wrapStyle={{
                                width: '100%',
                                paddingRight: 2,
                                backgroundColor: '#fff',
                            }}
                            value={value}
                            optionStyle={{ width: 194 }}
                            datas={tableFields.map((item) => {
                                return {
                                    value: item.code,
                                    text: item.name,
                                };
                            })}
                            onChange={(val) => {
                                const conditions = updateCondition(
                                    row.id,
                                    'field',
                                    val,
                                    data.conditions
                                );
                                conditions &&
                                    setData({
                                        ...data,
                                        conditions,
                                    });
                            }}
                        ></Select>
                    </Fragment>
                );
            },
        },
        {
            code: 'operator',
            title: '操作符',
            width: '20%',
            render: (value, row, datas, column) => {
                const handleValueChange = (val) => {
                    const conditions = updateCondition(
                        row.id,
                        'operator',
                        val,
                        data.conditions
                    );
                    conditions && setData({ ...data, conditions });
                };
                return (
                    <Select
                        value={value}
                        style={{ width: 'auto' }}
                        wrapStyle={{
                            width: '100%',
                            backgroundColor: '#fff',
                        }}
                        optionStyle={{ width: '133px' }}
                        datas={OPERATOR_DATAS}
                        onChange={handleValueChange}
                    ></Select>
                );
            },
        },
        {
            code: 'value',
            title: '值',
            width: '20%',
            render: (value, row, datas, column) => {
                return (
                    <TextInput
                        style={{ padding: '0' }}
                        value={value}
                        onChange={function (e) {
                            const conditions = updateCondition(
                                row.id,
                                'value',
                                e.target.value,
                                data.conditions
                            );
                            conditions && setData({ ...data, conditions });
                        }}
                    ></TextInput>
                );
            },
        },
        {
            code: 'fillQuantity',
            title: '填充数量',
            width: '20%',
            render: (value, row, datas, column) => {
                return (
                    <Integer
                        min={0}
                        value={value}
                        onChange={function (val) {
                            const conditions = updateCondition(
                                row.id,
                                'fillQuantity',
                                val,
                                data.conditions
                            );
                            conditions && setData({ ...data, conditions });
                        }}
                    ></Integer>
                );
            },
        },
        {
            code: 'isStopWhileTrue',
            title: '如果为真则停止',
            width: '20%',
            render: (value, row, datas, column) => {
                return (
                    <CheckBox
                        style={{ padding: 0 }}
                        value={value}
                        onChange={function (val) {
                            const conditions = updateCondition(
                                row.id,
                                'isStopWhileTrue',
                                val,
                                data.conditions
                            );
                            conditions && setData({ ...data, conditions });
                        }}
                    ></CheckBox>
                );
            },
        },
    ];

    return (
        <Fragment>
            <OperationDialog
                title='条件设置'
                width='730px'
                height='330px'
                onCancel={onCancel}
                onConfirm={() =>
                    onConfirm({
                        conditions: data.conditions,
                    })
                }
            >
                <Buttons>
                    <Button style={btnStyle} onClick={handleAddCondition}>
                        添加条件
                    </Button>
                    <Button
                        style={btnStyle}
                        disabled={data.conditions.length == 0}
                        onClick={handleDelCondition}
                    >
                        删除条件
                    </Button>
                    <Button
                        style={btnStyle}
                        disabled={data.conditions.length == 0}
                        onClick={handleCopyCondition}
                    >
                        复制条件
                    </Button>
                    <Button
                        style={btnStyle}
                        disabled={
                            data.conditions.length == 0 || data.current == 0
                        }
                        onClick={handleConditionMoveUp}
                    >
                        上移
                    </Button>
                    <Button
                        style={btnStyle}
                        disabled={
                            data.conditions.length == 0 ||
                            data.current == data.conditions.length - 1
                        }
                        onClick={handleConditionMoveDown}
                    >
                        下移
                    </Button>
                </Buttons>
                <Grid
                    datas={data.conditions}
                    current={data.current}
                    onSelection={(index) =>
                        setData({ ...data, current: index })
                    }
                    columns={columns}
                ></Grid>
            </OperationDialog>
        </Fragment>
    );
}
