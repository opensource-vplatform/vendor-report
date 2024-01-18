import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  CheckBox,
  Group,
  Radio,
  RadioGroup,
} from '@components/form/Index';

import Integer from '../../../component/form/Integer';
import {
  setColHeaderAutoText,
  setColHeaderAutoTextIndex,
  setColHeaderDefRowHeight,
  setColHeaderRowCount,
  setColHeaderVisible,
  setRowHeaderAutoText,
  setRowHeaderAutoTextIndex,
  setRowHeaderColCount,
  setRowHeaderDefColWidth,
  setRowHeaderVisible,
} from '../../../store/settingSlice/worksheetSettingSlice';
import {
  InputWrap,
  ItemList,
  Title,
  VGroupItem,
  WithTitleItem,
  Wrapper,
} from '../Components';

export default function () {
    const wrapStyle = { margin: '4px 0px', justifyContent: 'space-between' };
    const checkboxStyle = { width: 'max-content' };
    const dispatch = useDispatch();
    const {
        colHeaderRowCount,
        colHeaderAutoText,
        colHeaderAutoTextIndex,
        colHeaderDefRowHeight,
        colHeaderVisible,
        rowHeaderColCount,
        rowHeaderAutoText,
        rowHeaderAutoTextIndex,
        rowHeaderDefColWidth,
        rowHeaderVisible,
    } = useSelector(({ worksheetSettingSlice }) => worksheetSettingSlice);

    return (
        <Wrapper>
            <VGroupItem>
                <Group title='列标题'>
                    <ItemList>
                        <WithTitleItem style={wrapStyle}>
                            <Title>列标题行数</Title>
                            <InputWrap>
                                <Integer
                                    value={colHeaderRowCount}
                                    min={0}
                                    onChange={(val) => {
                                        dispatch(setColHeaderRowCount(val));
                                    }}
                                ></Integer>
                            </InputWrap>
                        </WithTitleItem>
                        <WithTitleItem style={wrapStyle}>
                            <Title>列标题自动生成文本</Title>
                            <InputWrap style={{ display: 'flex' }}>
                                <RadioGroup
                                    value={colHeaderAutoText}
                                    onChange={(val) => {
                                        dispatch(setColHeaderAutoText(val));
                                    }}
                                >
                                    <Radio label='空白' value={0}></Radio>
                                    <Radio label='数字' value={1}></Radio>
                                    <Radio label='字母' value={2}></Radio>
                                </RadioGroup>
                            </InputWrap>
                        </WithTitleItem>
                        <WithTitleItem style={wrapStyle}>
                            <Title>列标题自动索引</Title>
                            <InputWrap>
                                <Integer
                                    value={colHeaderAutoTextIndex}
                                    min={-1}
                                    onChange={(val) => {
                                        dispatch(
                                            setColHeaderAutoTextIndex(val)
                                        );
                                    }}
                                ></Integer>
                            </InputWrap>
                        </WithTitleItem>
                        <WithTitleItem style={wrapStyle}>
                            <Title>默认列标题高度</Title>
                            <InputWrap>
                                <Integer
                                    value={colHeaderDefRowHeight}
                                    min={0}
                                    onChange={(val) => {
                                        dispatch(setColHeaderDefRowHeight(val));
                                    }}
                                ></Integer>
                            </InputWrap>
                        </WithTitleItem>
                        <CheckBox
                            style={checkboxStyle}
                            title='列标题可见'
                            value={colHeaderVisible}
                            onChange={(checked) => {
                                dispatch(setColHeaderVisible(checked));
                            }}
                        ></CheckBox>
                    </ItemList>
                </Group>
                <Group title='行标题' style={{ marginTop: 16 }}>
                    <ItemList>
                        <WithTitleItem style={wrapStyle}>
                            <Title>行标题行数</Title>
                            <InputWrap>
                                <Integer
                                    value={rowHeaderColCount}
                                    min={0}
                                    onChange={(val) => {
                                        dispatch(setRowHeaderColCount(val));
                                    }}
                                ></Integer>
                            </InputWrap>
                        </WithTitleItem>
                        <WithTitleItem style={wrapStyle}>
                            <Title>行标题自动生成文本</Title>
                            <InputWrap style={{ display: 'flex' }}>
                                <RadioGroup
                                    value={rowHeaderAutoText}
                                    onChange={(val) => {
                                        dispatch(setRowHeaderAutoText(val));
                                    }}
                                >
                                    <Radio label='空白' value={0}></Radio>
                                    <Radio label='数字' value={1}></Radio>
                                    <Radio label='字母' value={2}></Radio>
                                </RadioGroup>
                            </InputWrap>
                        </WithTitleItem>
                        <WithTitleItem style={wrapStyle}>
                            <Title>行标题自动索引</Title>
                            <InputWrap>
                                <Integer
                                    value={rowHeaderAutoTextIndex}
                                    min={-1}
                                    onChange={(val) => {
                                        dispatch(
                                            setRowHeaderAutoTextIndex(val)
                                        );
                                    }}
                                ></Integer>
                            </InputWrap>
                        </WithTitleItem>
                        <WithTitleItem style={wrapStyle}>
                            <Title>默认行标题高度</Title>
                            <InputWrap>
                                <Integer
                                    value={rowHeaderDefColWidth}
                                    min={0}
                                    onChange={(val) => {
                                        dispatch(setRowHeaderDefColWidth(val));
                                    }}
                                ></Integer>
                            </InputWrap>
                        </WithTitleItem>
                        <CheckBox
                            style={checkboxStyle}
                            title='行标题可见'
                            value={rowHeaderVisible}
                            onChange={(checked) => {
                                dispatch(setRowHeaderVisible(checked));
                            }}
                        ></CheckBox>
                    </ItemList>
                </Group>
            </VGroupItem>
        </Wrapper>
    );
}
