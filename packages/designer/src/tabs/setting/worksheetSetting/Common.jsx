import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  CheckBox,
  Group,
  Integer,
  Radio,
  RadioGroup,
} from '@components/form/Index';
import {
  setAllowCellOverflow,
  setColCount,
  setFrozenColumnCount,
  setFrozenLeftColumn,
  setFrozenRowCount,
  setFrozenTopRow,
  setFrozenTrailingColumnCount,
  setFrozenTrailingColumnStickToEdge,
  setFrozenTrailingRowCount,
  setFrozenTrailingRowStickToEdge,
  setRowCount,
  setSelectionPolicy,
  setShowZeros,
} from '@store/settingSlice/worksheetSettingSlice';

import {
  HLayout,
  InputWrap,
  ItemList,
  Title,
  VGroupItem,
  WithTitleItem,
  Wrapper,
} from '../Components';

export default function () {
    const inputStyle = { width: 150 };
    const wrapStyle = { margin: '4px 0px', justifyContent: 'space-between' };
    const inputWrapStyle = { flex: 'none' };
    const checkboxStyle = { width: 'max-content' };
    const identStyle = { marginLeft: 18 };
    const dispatch = useDispatch();
    const {
        colCount,
        rowCount,
        frozenColumnCount,
        frozenRowCount,
        frozenLeftColumn,
        frozenTopRow,
        frozenTrailingColumnCount,
        frozenTrailingColumnStickToEdge,
        frozenTrailingRowCount,
        frozenTrailingRowStickToEdge,
        selectionPolicy,
        allowCellOverflow,
        showZeros,
    } = useSelector(({ worksheetSettingSlice }) => worksheetSettingSlice);
    return (
        <Wrapper>
            <HLayout>
                <VGroupItem>
                    <ItemList>
                        <WithTitleItem style={wrapStyle}>
                            <Title>列数</Title>
                            <InputWrap style={inputWrapStyle}>
                                <Integer
                                    value={colCount}
                                    style={inputStyle}
                                    min={0}
                                    onChange={(val) => {
                                        dispatch(setColCount(val));
                                    }}
                                ></Integer>
                            </InputWrap>
                        </WithTitleItem>
                        <WithTitleItem style={wrapStyle}>
                            <Title>行数</Title>
                            <InputWrap style={inputWrapStyle}>
                                <Integer
                                    value={rowCount}
                                    style={inputStyle}
                                    min={0}
                                    onChange={(val) => {
                                        dispatch(setRowCount(val));
                                    }}
                                ></Integer>
                            </InputWrap>
                        </WithTitleItem>
                        <WithTitleItem style={wrapStyle}>
                            <Title>冻结列数</Title>
                            <InputWrap style={inputWrapStyle}>
                                <Integer
                                    value={frozenColumnCount}
                                    style={inputStyle}
                                    min={0}
                                    onChange={(val) => {
                                        dispatch(setFrozenColumnCount(val));
                                    }}
                                ></Integer>
                            </InputWrap>
                        </WithTitleItem>
                        <WithTitleItem style={{ ...wrapStyle, ...identStyle }}>
                            <Title data-disabled={frozenColumnCount == 0}>
                                可见区最左列
                            </Title>
                            <InputWrap style={inputWrapStyle}>
                                <Integer
                                    disabled={frozenColumnCount == 0}
                                    style={inputStyle}
                                    value={frozenLeftColumn}
                                    min={0}
                                    max={
                                        frozenColumnCount == 0
                                            ? 0
                                            : frozenColumnCount - 1
                                    }
                                    onChange={(val) => {
                                        dispatch(setFrozenLeftColumn(val));
                                    }}
                                ></Integer>
                            </InputWrap>
                        </WithTitleItem>
                        <WithTitleItem style={wrapStyle}>
                            <Title>冻结行数</Title>
                            <InputWrap style={inputWrapStyle}>
                                <Integer
                                    value={frozenRowCount}
                                    style={inputStyle}
                                    min={0}
                                    onChange={(val) => {
                                        dispatch(setFrozenRowCount(val));
                                    }}
                                ></Integer>
                            </InputWrap>
                        </WithTitleItem>
                        <WithTitleItem style={{ ...wrapStyle, ...identStyle }}>
                            <Title data-disabled={frozenRowCount == 0}>
                                可见区最上行
                            </Title>
                            <InputWrap style={inputWrapStyle}>
                                <Integer
                                    value={frozenTopRow}
                                    disabled={frozenRowCount == 0}
                                    style={inputStyle}
                                    min={0}
                                    max={
                                        frozenRowCount == 0
                                            ? 0
                                            : frozenRowCount - 1
                                    }
                                    onChange={(val) => {
                                        dispatch(setFrozenTopRow(val));
                                    }}
                                ></Integer>
                            </InputWrap>
                        </WithTitleItem>
                        <WithTitleItem style={wrapStyle}>
                            <Title>最后面冻结列数</Title>
                            <InputWrap style={inputWrapStyle}>
                                <Integer
                                    value={frozenTrailingColumnCount}
                                    style={inputStyle}
                                    min={0}
                                    onChange={(val) => {
                                        dispatch(
                                            setFrozenTrailingColumnCount(val)
                                        );
                                    }}
                                ></Integer>
                            </InputWrap>
                        </WithTitleItem>
                        <CheckBox
                            disabled={frozenTrailingColumnCount == 0}
                            style={{ ...checkboxStyle, ...identStyle }}
                            title='固定到边缘'
                            value={frozenTrailingColumnStickToEdge}
                            onChange={(checked) => {
                                dispatch(
                                    setFrozenTrailingColumnStickToEdge(checked)
                                );
                            }}
                        ></CheckBox>
                        <WithTitleItem style={wrapStyle}>
                            <Title>最后面冻结行数</Title>
                            <InputWrap style={inputWrapStyle}>
                                <Integer
                                    value={frozenTrailingRowCount}
                                    style={inputStyle}
                                    min={0}
                                    onChange={(val) => {
                                        dispatch(
                                            setFrozenTrailingRowCount(val)
                                        );
                                    }}
                                ></Integer>
                            </InputWrap>
                        </WithTitleItem>
                        <CheckBox
                            disabled={frozenTrailingRowCount == 0}
                            style={{ ...checkboxStyle, ...identStyle }}
                            title='固定到边缘'
                            value={frozenTrailingRowStickToEdge}
                            onChange={(checked) => {
                                dispatch(
                                    setFrozenTrailingRowStickToEdge(checked)
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <Group title='选择策略' style={{ marginTop: 10 }}>
                        <Wrapper>
                            <RadioGroup
                                value={selectionPolicy}
                                onChange={(val) => {
                                    dispatch(setSelectionPolicy(val));
                                }}
                            >
                                <Radio label='单选' value={0}></Radio>
                                <Radio label='区域选择' value={1}></Radio>
                                <Radio label='多区域选择' value={2}></Radio>
                            </RadioGroup>
                        </Wrapper>
                    </Group>
                    <CheckBox
                        style={{ ...checkboxStyle, marginTop: 8 }}
                        title='允许溢出'
                        value={allowCellOverflow}
                        onChange={(checked) => {
                            dispatch(setAllowCellOverflow(checked));
                        }}
                    ></CheckBox>
                    <CheckBox
                        style={checkboxStyle}
                        title='显示零值单元格'
                        value={showZeros}
                        onChange={(checked) => {
                            dispatch(setShowZeros(checked));
                        }}
                    ></CheckBox>
                </VGroupItem>
            </HLayout>
        </Wrapper>
    );
}
