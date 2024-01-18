import React from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  CheckBox,
  Integer,
  Select,
} from '@components/form/Index';
import {
  setAllSheetsListVisible,
  setNewTabVisible,
  setTabEditable,
  setTabStripPosition,
  setTabStripRatio,
  setTabStripVisible,
  setTabStripWidth,
} from '@store/settingSlice/workbookSettingSlice';

import {
  HLayout,
  InputWrap,
  ItemList,
  Title,
  VGroupItem,
  WithTitleItem,
  Wrapper,
} from '../Components';

const TabStripPositions = [
    {
        value: 0,
        text: '靠下',
        title: '靠下',
    },
    {
        value: 1,
        text: '靠上',
        title: '靠上',
    },
    {
        value: 2,
        text: '靠左',
        title: '靠左',
    },
    {
        value: 3,
        text: '靠右',
        title: '靠右',
    },
];

const AllSheetsListVisibleEnums = [
    {
        value: 2,
        text: '自动',
        title: '自动',
    },
    {
        value: 1,
        text: '显示',
        title: '显示',
    },
    {
        value: 0,
        text: '隐藏',
        title: '隐藏',
    },
];

function Index() {
    const dispatch = useDispatch();
    const {
        tabStripVisible,
        newTabVisible,
        tabStripRatio,
        tabEditable,
        tabStripWidth,
        tabStripPosition,
        allSheetsListVisible,
    } = useSelector(({ workbookSettingSlice }) => workbookSettingSlice);
    const checkboxStyle = { width: 'max-content' };
    const titleStyle={width:150,flex:'none'};
    const inputStyle={
        width: '100px',
        height: '25px',
        margin: '5px 0px',
    }
    const inputWrapStyle = {flex:'none',width:'max-content'};
    return (
        <Wrapper>
            <HLayout>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            style={checkboxStyle}
                            title='工作表标签可见'
                            value={tabStripVisible}
                            onChange={(checked) => {
                                dispatch(setTabStripVisible(checked));
                            }}
                        ></CheckBox>
                        <CheckBox
                            style={checkboxStyle}
                            title='新建工作表可见'
                            value={newTabVisible}
                            onChange={(checked) => {
                                dispatch(setNewTabVisible(checked));
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            style={checkboxStyle}
                            title='工作表标签可编辑'
                            value={tabEditable}
                            onChange={(checked) => {
                                dispatch(setTabEditable(checked));
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
            </HLayout>
            <HLayout>
                <VGroupItem>
                    <ItemList>
                        <WithTitleItem>
                            <Title style={titleStyle}>工作表标签比例(百分比)</Title>
                            <InputWrap style={inputWrapStyle}>
                                <Integer
                                    style={inputStyle}
                                    value={tabStripRatio * 100}
                                    min={1}
                                    max={100}
                                    onChange={(val) =>
                                        dispatch(setTabStripRatio(val / 100))
                                    }
                                ></Integer>
                            </InputWrap>
                            %
                        </WithTitleItem>
                        <WithTitleItem>
                            <Title style={titleStyle}>工作表标签宽度</Title>
                            <InputWrap style={inputWrapStyle}>
                                <Integer
                                    style={inputStyle}
                                    value={tabStripWidth}
                                    min={80}
                                    onChange={(val) =>
                                        dispatch(setTabStripWidth(val))
                                    }
                                ></Integer>
                            </InputWrap>
                        </WithTitleItem>
                        <WithTitleItem>
                            <Title style={titleStyle}>工作表标签位置</Title>
                            <InputWrap style={inputWrapStyle}>
                                <Select
                                    style={inputStyle}
                                    datas={TabStripPositions}
                                    value={tabStripPosition}
                                    onChange={(val) => {
                                        dispatch(setTabStripPosition(val));
                                    }}
                                    optionStyle={{ width: '100px' }}
                                ></Select>
                            </InputWrap>
                        </WithTitleItem>
                        <WithTitleItem>
                            <Title style={titleStyle}>工作表列表按钮可见</Title>
                            <InputWrap style={inputWrapStyle}>
                                <Select
                                    style={inputStyle}
                                    datas={AllSheetsListVisibleEnums}
                                    value={allSheetsListVisible}
                                    onChange={(val) => {
                                        dispatch(setAllSheetsListVisible(val));
                                    }}
                                    optionStyle={{ width: '100px' }}
                                ></Select>
                            </InputWrap>
                        </WithTitleItem>
                    </ItemList>
                </VGroupItem>
            </HLayout>
        </Wrapper>
    );
}

export default Index;
