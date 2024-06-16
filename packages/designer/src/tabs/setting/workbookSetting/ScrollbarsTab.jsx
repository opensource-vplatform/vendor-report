import React from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  setScrollbarAppearance,
  setScrollbarMaxAlign,
  setScrollbarShowMax,
  setShowHorizontalScrollbar,
  setShowVerticalScrollbar,
} from '@store/settingSlice/workbookSettingSlice';
import { CheckBox } from '@toone/report-ui';

import {
  HLayout,
  ItemList,
  VGroupItem,
  Wrapper,
} from '../Components';

function Index() {
    const dispatch = useDispatch();
    const {
        showVerticalScrollbar,
        showHorizontalScrollbar,
        scrollbarShowMax,
        scrollbarMaxAlign,
        scrollbarAppearance,
    } = useSelector(({ workbookSettingSlice }) => workbookSettingSlice);
    const checkboxStyle = {width:'max-content'};
    return (
        <Wrapper>
            <HLayout>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            style={checkboxStyle}
                            title='垂直滚动条'
                            value={showVerticalScrollbar}
                            onChange={(checked) => {
                                dispatch(setShowVerticalScrollbar(checked));
                            }}
                        ></CheckBox>
                        <CheckBox
                            style={checkboxStyle}
                            title='滚动条最大显示'
                            value={scrollbarShowMax}
                            onChange={(checked) => {
                                dispatch(setScrollbarShowMax(checked));
                            }}
                        ></CheckBox>
                        <CheckBox
                            style={checkboxStyle}
                            title='使用移动滚动条'
                            value={scrollbarAppearance}
                            onChange={(checked) => {
                                dispatch(setScrollbarAppearance(checked));
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            style={checkboxStyle}
                            title='水平滚动条'
                            value={showHorizontalScrollbar}
                            onChange={(checked) => {
                                dispatch(setShowHorizontalScrollbar(checked));
                            }}
                        ></CheckBox>
                        <CheckBox
                            style={checkboxStyle}
                            title='滚动条最大对齐'
                            value={scrollbarMaxAlign}
                            onChange={(checked) => {
                                dispatch(setScrollbarMaxAlign(checked));
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
            </HLayout>
        </Wrapper>
    );
}

export default Index;
