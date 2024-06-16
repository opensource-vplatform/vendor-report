import {
  Fragment,
  useEffect,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  Button,
  Menu,
  OperationDialog,
  Select,
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

const ORDER_BY_DATAS = [
    {
        value: 'value',
        text: '数值',
    },
    {
        value: 'backColor',
        text: '单元格颜色',
    },
    {
        value: 'foreColor',
        text: '字体颜色',
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

export default function (props) {
    const { onCancel, onConfirm } = props;
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [data, setData] = useState({
        sortType: 'sortByCol',
        showWran: false,
        current: 0,
        conditions: [],
        rowTexts: [],
        columnTexts: [],
        row: 0,
        col: 0,
        rowCount: 0,
        colCount: 0,
    });
    const btnStyle = {
        padding: 4,
        marginTop: 8,
        marginBottom: 8,
        marginRight: 4,
    };
    const handleSortTypeChange = (sortType) => {
        if (sortType != data.sortType) {
            if (data.conditions.length > 0) {
                data.sortTypeTemp = sortType;
                setData({
                    ...data,
                    showWran: true,
                });
            } else {
                setData({ ...data, sortType });
            }
        }
    };
    const handleAddCondition = () => {
        const conditions = [...data.conditions];
        conditions.push({
            id: uuid(),
            index: data.sortType == 'sortByCol' ? data.col : data.row,
            sortBy: 'value',
            sort: 'asc',
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
    useEffect(() => {
        let newData = { ...data };
        if (spread) {
            const sheet = spread.getActiveSheet();
            if (!sheet) return;
            const selections = sheet.getSelections();
            if (selections && selections.length > 0) {
                const selection = selections[0];
                let { row, rowCount, col, colCount } = selection;
                const rowTexts = [],
                    columnTexts = [];
                row = -1 === row ? 0 : row;
                for (let index = 0; index < rowCount; index++) {
                    rowTexts[index] =
                        '行 ' +
                        sheet
                            .getCell(
                                row + index,
                                sheet.getColumnCount(2) - 1,
                                2
                            )
                            .text();
                }
                col = -1 === col ? 0 : col;
                for (let index = 0; index < colCount; index++) {
                    columnTexts[index] =
                        '列 ' +
                        sheet
                            .getCell(sheet.getRowCount(1) - 1, col + index, 1)
                            .text();
                }
                newData.row = row;
                newData.rowCount = rowCount;
                newData.col = col;
                newData.colCount = colCount;
                newData.rowTexts = rowTexts;
                newData.columnTexts = columnTexts;
            }
        }
        setData({
            ...newData,
            conditions: [
                {
                    id: uuid(),
                    index: newData.sortType == 'sortByCol' ? newData.col : newData.row,
                    sortBy: 'value',
                    sort: 'asc',
                },
            ],
        });
    }, []);
    return (
        <Fragment>
            <OperationDialog
                title='排序'
                width='730px'
                height='330px'
                onCancel={onCancel}
                onConfirm={() =>
                    onConfirm({
                        sortType: data.sortType,
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
                    <Menu
                        value={data.sortType}
                        datas={MENU_DATAS}
                        optionStyle={{width: 80 }}
                        onNodeClick={handleSortTypeChange}
                    >
                        <Button style={btnStyle}>选项...</Button>
                    </Menu>
                </Buttons>
                <Grid
                    datas={data.conditions}
                    current={data.current}
                    onSelection={(index) =>
                        setData({ ...data, current: index })
                    }
                    columns={[
                        {
                            code: 'index',
                            title: data.sortType == 'sortByCol' ? '列' : '行',
                            width: '40%',
                            render: function (value, row, datas, column) {
                                const isFirst = datas.indexOf(row) == 0;
                                const label = isFirst
                                    ? '主要关键字'
                                    : '次要关键字';
                                return (
                                    <Fragment>
                                        <Label>{label}</Label>
                                        <Select
                                            wrapStyle={{
                                                width: 192,
                                                paddingRight: 2,
                                                backgroundColor: '#fff',
                                            }}
                                            value={value}
                                            optionStyle={{ width: 194 }}
                                            datas={
                                                data.sortType == 'sortByCol'
                                                    ? data.columnTexts.map(
                                                          (colText, index) => {
                                                              return {
                                                                  value:
                                                                      index +
                                                                      data.col,
                                                                  text: colText,
                                                              };
                                                          }
                                                      )
                                                    : data.rowTexts.map(
                                                          (rowText, index) => {
                                                              return {
                                                                  value:
                                                                      index +
                                                                      data.col,
                                                                  text: rowText,
                                                              };
                                                          }
                                                      )
                                            }
                                            onChange={(val) => {
                                                const conditions =
                                                    updateCondition(
                                                        row.id,
                                                        'index',
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
                            code: 'sortBy',
                            title: '排序依据',
                            width: '20%',
                            render: (value, row, datas, column) => {
                                const val = getValidValue(
                                    value,
                                    ORDER_BY_DATAS
                                );
                                const handleValueChange = (val) => {
                                    const conditions = updateCondition(
                                        row.id,
                                        'sortBy',
                                        val,
                                        data.conditions
                                    );
                                    conditions &&
                                        setData({ ...data, conditions });
                                };
                                if (val == value) {
                                    return (
                                        <Select
                                            value={value}
                                            style={{ width: 'auto' }}
                                            wrapStyle={{
                                                width: '100%',
                                                backgroundColor: '#fff',
                                            }}
                                            optionStyle={{ width: '133px' }}
                                            datas={ORDER_BY_DATAS}
                                            onChange={handleValueChange}
                                        ></Select>
                                    );
                                } else {
                                    handleValueChange(val);
                                }
                            },
                        },
                        {
                            code: 'sort',
                            title: '次序',
                            width: '40%',
                            render: function (value, row, datas, column) {
                                const sortType = data.sortType;
                                const sortBy = row.sortBy;
                                if (sortBy == 'value') {
                                    const datas = [
                                        {
                                            value: 'asc',
                                            text: '升序',
                                        },
                                        {
                                            value: 'desc',
                                            text: '降序',
                                        },
                                    ];
                                    const val = getValidValue(value, datas);
                                    const handleValueChange = (val) => {
                                        const conditions = updateCondition(
                                            row.id,
                                            'sort',
                                            val,
                                            data.conditions
                                        );
                                        conditions &&
                                            setData({ ...data, conditions });
                                    };
                                    if (val == value) {
                                        return (
                                            <Select
                                                value={value}
                                                style={{ width: 'auto' }}
                                                wrapStyle={{
                                                    width: '100%',
                                                    backgroundColor: '#fff',
                                                }}
                                                optionStyle={{ width: '276px' }}
                                                datas={datas}
                                                onChange={handleValueChange}
                                            ></Select>
                                        );
                                    } else {
                                        handleValueChange(val);
                                    }
                                } else {
                                    const colors = [];
                                    const sheet = spread.getActiveSheet();
                                    if (sortType == 'sortByCol') {
                                        //列排序
                                        for (
                                            let index = 0;
                                            index < data.rowCount;
                                            index++
                                        ) {
                                            const style = sheet.getStyle(
                                                data.row + index,
                                                row.index
                                            );
                                            const {
                                                backColor = null,
                                                foreColor = '#000000',
                                            } = style
                                                ? style
                                                : {
                                                      backColor: null,
                                                      foreColor: '#000000',
                                                  };
                                            const color =
                                                sortBy == 'backColor'
                                                    ? backColor
                                                    : foreColor;
                                            if (colors.indexOf(color) == -1) {
                                                colors.push(color);
                                            }
                                        }
                                    } else {
                                        //行排序
                                        for (
                                            let index = 0;
                                            index < data.colCount;
                                            index++
                                        ) {
                                            const style = sheet.getStyle(
                                                row.index,
                                                data.col + index
                                            );
                                            const {
                                                backColor = null,
                                                foreColor = '#000000',
                                            } = style
                                                ? style
                                                : {
                                                      backColor: null,
                                                      foreColor: '#000000',
                                                  };
                                            const color =
                                                sortBy == 'backColor'
                                                    ? backColor
                                                    : foreColor;
                                            if (colors.indexOf(color) == -1) {
                                                colors.push(color);
                                            }
                                        }
                                    }
                                    const colorDatas = colors.map((color) => {
                                        return {
                                            value: color,
                                            text: (
                                                <Color
                                                    style={{
                                                        backgroundColor: color,
                                                    }}
                                                >
                                                    {color == null
                                                        ? '无单元格颜色'
                                                        : null}
                                                </Color>
                                            ),
                                        };
                                    });
                                    const color = getValidValue(
                                        row.color,
                                        colorDatas
                                    );
                                    const sortDatas = [
                                        {
                                            value:
                                                sortType == 'sortByCol'
                                                    ? 'top'
                                                    : 'left',
                                            text:
                                                sortType == 'sortByCol'
                                                    ? '最顶端'
                                                    : '最左端',
                                        },
                                        {
                                            value:
                                                sortType == 'sortByCol'
                                                    ? 'bottom'
                                                    : 'right',
                                            text:
                                                sortType == 'sortByCol'
                                                    ? '最底端'
                                                    : '最右端',
                                        },
                                    ];
                                    const sort = getValidValue(
                                        value,
                                        sortDatas
                                    );
                                    const handleValueChange = (key, val) => {
                                        const conditions = updateCondition(
                                            row.id,
                                            key,
                                            val,
                                            data.conditions
                                        );
                                        conditions &&
                                            setData({ ...data, conditions });
                                    };
                                    if (
                                        row.color == color &&
                                        row.sort == sort
                                    ) {
                                        return (
                                            <Fragment>
                                                <Select
                                                    value={color}
                                                    wrapStyle={{
                                                        flex: 1,
                                                        paddingRight: 2,
                                                        backgroundColor: '#fff',
                                                    }}
                                                    optionStyle={{ width: 136 }}
                                                    datas={colorDatas}
                                                    onChange={(val) =>
                                                        handleValueChange(
                                                            'color',
                                                            val
                                                        )
                                                    }
                                                ></Select>
                                                <Select
                                                    value={sort}
                                                    wrapStyle={{
                                                        flex: 1,
                                                        marginLeft: 4,
                                                        paddingRight: 2,
                                                        backgroundColor: '#fff',
                                                    }}
                                                    onChange={(val) =>
                                                        handleValueChange(
                                                            'sort',
                                                            val
                                                        )
                                                    }
                                                    optionStyle={{ width: 136 }}
                                                    datas={sortDatas}
                                                ></Select>
                                            </Fragment>
                                        );
                                    } else {
                                        const condition = data.conditions.find(
                                            (condition) =>
                                                condition.id == row.id
                                        );
                                        condition.color = color;
                                        condition.sort = sort;
                                        setData({
                                            ...data,
                                            conditions: [...data.conditions],
                                        });
                                    }
                                }
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
