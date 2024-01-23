import {
  useEffect,
  useState,
} from 'react';

import { arrayMoveMutable } from 'array-move';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  addTable,
  getCellInfo,
  highlightBlock,
  removeHighlightOneBlock,
} from '@components/defineDatasource/utils/utils';
import { genPreviewDatas } from '@store/datasourceSlice/datasourceSlice';
import { toggleReportDesignWizard } from '@store/navSlice/navSlice';
import { clearGroups } from '@store/wizardSlice';
import { getNamespace } from '@utils/spreadUtil';

import {
  Button,
  ButtonText,
  FooterWrap,
} from '../Index';
import Left from './left';
import Right from './right';

const GC = getNamespace();
const spreadNS = GC.Spread.Sheets;

const Wrap = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    flex: 1;
    overflow: hidden;
    flex-direction: column;
`;

const HeaderWrap = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    flex: 1;
    overflow: hidden;
    border-bottom: 1px solid #ddd;
`;

function showHhighlight(spread = 0, row = 0, col, rowCount = 1, colCount = 1) {
    const range = new spreadNS.Range(row, col, rowCount, colCount);
    highlightBlock(spread, range);
}

function createTable(params) {
    const { field, exclude, spread, dispatch, value, groups = [] } = params;
    //构造表格字段
    const tableColumns = field.filter(({ code }) => !exclude.includes(code));
    const colCount = tableColumns.length;
    if (colCount <= 0) {
        return;
    }
    showHhighlight(spread, 0, 0, 1, colCount);

    function mousemoveHandler(event) {
        const { cell, row, col } = getCellInfo({ event, spread }) || {};
        cell && showHhighlight(spread, row, col, 1, colCount);
    }

    function mousedownHandler(event) {
        if (event.button === 0) {
            const { row, col } = getCellInfo({ event, spread }) || {};
            if (row === undefined || col === undefined) {
                mousedownHandlerAfter();
                return;
            }
            spread.suspendPaint();
            const sheet = spread.getActiveSheet();
            addTable({
                columnsTemp: tableColumns,
                sheet,
                spreadNS,
                dispatch,
                row,
                col,
                dataPath: value,
                filterButtonVisible: false,
                addingMode: 'wizard',
                groups,
            });
            spread.resumePaint();
            mousedownHandlerAfter();
        }
    }

    function mousedownHandlerAfter() {
        removeHighlightOneBlock();
        //清除事件
        document.removeEventListener('mousemove', mousemoveHandler);
        document.removeEventListener('mousedown', mousedownHandler);
    }

    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mousedown', mousedownHandler);
}

//根据数据源获取类型为实体的数据源
function genDatas(datas, activeSheetTablePath) {
    return datas.reduce(
        function (result, item) {
            const { type, children, name, code } = item;
            if (
                type === 'table' &&
                Array.isArray(children) &&
                children.length > 0 &&
                !activeSheetTablePath[code]
            ) {
                result.selectDatas.push({ value: code, text: name });
                result.fields[code] = [...children];
            }
            result.ds[code] = item;
            return result;
        },
        { selectDatas: [], fields: {}, ds: {} }
    );
}

export default function Index(props) {
    const { onChange = () => {} } = props;
    const { finalDsList, activeSheetTablePath } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );

    const { spread } = useSelector(({ fontSlice }) => fontSlice);
    let { groups } = useSelector(({ wizardSlice }) => wizardSlice);
    const dispatch = useDispatch();

    const [tableCode, setTablleCode] = useState('');
    const [exclude, setExclude] = useState([]);

    let value = tableCode;

    const { selectDatas, fields } = genDatas(finalDsList, activeSheetTablePath);

    if (selectDatas.length > 0 && !tableCode) {
        value = selectDatas[0].value;
    }

    //let field = fields[value] || [];
    const [field, setField] = useState(fields[value] || []);

    useEffect(
        function () {
            setField(fields[value] || []);
        },
        [value]
    );

    useEffect(function () {
        dispatch(genPreviewDatas());
    }, []);

    const backHandler = function () {
        onChange('none');
    };

    const confirmHandler = function () {
        dispatch(toggleReportDesignWizard());
        createTable({
            spread,
            field,
            exclude,
            dispatch,
            value,
            groups,
        });
    };

    const cancleHandler = function () {
        dispatch(toggleReportDesignWizard());
    };

    return (
        <Wrap>
            <HeaderWrap>
                <Left
                    dataSource={finalDsList}
                    selectOnChange={function (value) {
                        setTablleCode(value.tableCode);
                        dispatch(clearGroups());
                    }}
                    onChange={function (datas) {
                        setExclude(datas);
                    }}
                    field={field}
                    value={value}
                    selectDatas={selectDatas}
                    fields={fields}
                    onSortEnd={function ({ oldIndex, newIndex }) {
                        const newDatas = [...field];
                        arrayMoveMutable(newDatas, oldIndex, newIndex);
                        setField(newDatas);
                    }}
                ></Left>
                <Right value={value} field={field} exclude={exclude}></Right>
            </HeaderWrap>
            <FooterWrap>
                <Button type='button' onClick={backHandler}>
                    <ButtonText>返回</ButtonText>
                </Button>
                <Button
                    type='button'
                    onClick={confirmHandler}
                    disabled={selectDatas.length <= 0}
                >
                    <ButtonText>确定</ButtonText>
                </Button>
                <Button type='button' onClick={cancleHandler}>
                    <ButtonText>取消</ButtonText>
                </Button>
            </FooterWrap>
        </Wrap>
    );
}
