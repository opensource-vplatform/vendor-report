import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import { Range } from '@components/range/Index';
import {
  setArea,
  setBlackAndWhite,
  setEditorVisible,
  setPageOrder,
  setShowBorder,
  setShowGridLine,
  setShowHeader,
} from '@store/layoutSlice/layoutSlice';
import {
  CheckBox,
  Radio,
  RadioGroup,
} from '@toone/report-ui';
import { getBaseUrl } from '@utils/environmentUtil';
import { rangeToFormula } from '@utils/printUtil';
import { getNamespace } from '@utils/spreadUtil';

import {
  Divider,
  HLayout,
  Padding,
  Title,
  VGroupItem,
  Wrapper,
} from '../../Component';

const checkboxStyle = { width: 'max-content' };

const ColumnToRow = styled.div`
    width: 74px;
    height: 74px;
`;

const RowToColumn = styled.div`
    width: 74px;
    height: 74px;
`;

export default function (props) {
    const { hostId } = props;
    const {
        showHeader,
        showGridLine,
        blackAndWhite,
        pageOrder,
        showBorder,
        rowStart,
        rowEnd,
        columnStart,
        columnEnd,
    } = useSelector(({ layoutSlice }) => layoutSlice);
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const dispatch = useDispatch();
    return (
        <Wrapper>
            <VGroupItem>
                <HLayout
                    style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Title>打印区域：</Title>
                    <Range
                        value={rangeToFormula(
                            rowStart,
                            columnStart,
                            rowEnd,
                            columnEnd
                        )}
                        hostId={hostId}
                        onStartSelect={() => {
                            dispatch(setEditorVisible(false));
                        }}
                        onEndSelect={() => {
                            dispatch(setEditorVisible(true));
                        }}
                        onChange={(expression) => {
                            let rowStart = -1,
                                columnStart = -1,
                                rowEnd = -1,
                                columnEnd = -1;
                            if (expression && expression.trim() && spread) {
                                const GC = getNamespace();
                                const sheet = spread.getActiveSheet();
                                const range =
                                    GC.Spread.Sheets.CalcEngine.formulaToRange(
                                        sheet,
                                        expression
                                    );
                                if (range) {
                                    const { row, col, rowCount, colCount } =
                                        range;
                                    rowStart = row;
                                    columnStart = col;
                                    rowEnd =
                                        row == -1
                                            ? rowCount - 1
                                            : row + rowCount - 1;
                                    columnEnd =
                                        col == -1
                                            ? colCount - 1
                                            : col + colCount - 1;
                                    rowEnd = rowEnd < -1 ? -1 : rowEnd;
                                    columnEnd = columnEnd < -1 ? -1 : columnEnd;
                                }
                            }
                            dispatch(
                                setArea({
                                    rowStart,
                                    columnStart,
                                    rowEnd,
                                    columnEnd,
                                })
                            );
                        }}
                    ></Range>
                </HLayout>
            </VGroupItem>
            {/*<Divider title='打印标题'></Divider>
            <Padding>
                <VGroupItem>
                    <HLayout>
                        <Title>顶端标题行：</Title>
                    </HLayout>
                    <HLayout>
                        <Title>从左端重复的列数：</Title>
                    </HLayout>
                </VGroupItem>
    </Padding>*/}
            <Divider title='打印'></Divider>
            <Padding>
                <VGroupItem>
                    <CheckBox
                        title='网格线'
                        style={checkboxStyle}
                        value={showGridLine}
                        onChange={(val) => dispatch(setShowGridLine(val))}
                    ></CheckBox>
                    <CheckBox
                        title='单色打印'
                        style={checkboxStyle}
                        value={blackAndWhite}
                        onChange={(val) => dispatch(setBlackAndWhite(val))}
                    ></CheckBox>
                    <CheckBox
                        title='行和列标题'
                        style={checkboxStyle}
                        value={showHeader}
                        onChange={(val) => dispatch(setShowHeader(val))}
                    ></CheckBox>
                    <CheckBox
                        title='边框'
                        style={checkboxStyle}
                        value={showBorder}
                        onChange={(val) => dispatch(setShowBorder(val))}
                    ></CheckBox>
                </VGroupItem>
            </Padding>
            <Divider title='打印顺序'></Divider>
            <Padding>
                <HLayout>
                    <VGroupItem style={{ width: 120, flex: 'unset' }}>
                        <RadioGroup
                            value={pageOrder}
                            onChange={(val) => dispatch(setPageOrder(val))}
                        >
                            <Radio label='先列后行' value={1}></Radio>
                            <Radio label='先行后列' value={2}></Radio>
                        </RadioGroup>
                    </VGroupItem>
                    <VGroupItem>
                        {pageOrder == 1 ? (
                            <ColumnToRow
                                style={{
                                    backgroundImage: `url(${getBaseUrl()}/css/icons/layout/page/editor/colToRow.png)`,
                                }}
                            ></ColumnToRow>
                        ) : pageOrder == 2 ? (
                            <RowToColumn
                                style={{
                                    backgroundImage: `url(${getBaseUrl()}/css/icons/layout/page/editor/rowToCol.png)`,
                                }}
                            ></RowToColumn>
                        ) : null}
                    </VGroupItem>
                </HLayout>
            </Padding>
        </Wrapper>
    );
}
