import React, { useContext, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    setAllowUserDragDrop,
    setAllowUserDragFill,
    setAllowUndo,
    setAllowUserDragMerge,
    setAllowAutoCreateHyperlink,
    setAllowAutoExtendFilterRange,
    setAllowUserEditFormula,
    setAllowUserZoom,
    setAllowDynamicArray,
    setAllowInvalidFormula,
    setEnableAccessibility,
    setScrollByPixel,
    setRowResizeMode,
    setColumnResizeMode,
    setMaxUndoStack,
    setScrollPixel,
    setFormulaFormatHint,
} from '@store/settingSlice/workbookSettingSlice';

import { CheckBox } from '@components/form/Index';
import Select from '@components/Select/Index';
import Integer from '@components/integer/Index';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 10px;
`;

const Label = styled.span`
    font-size: 12px;
    margin: 4px;
`;
const Divider = styled.div`
    border-top: 1px solid lightgray;
    margin-left: 4px;
`;
const HLayout = styled.div`
    display: flex;
`;

const VGroupItem = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;
const ItemList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 8px 6px;
`;
const Selector = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const SelectTittle = styled.span`
    font-size: 12px;
    margin-left: 8px;
    flex: 1;
`;
const SelectWrapper = styled.span`
    flex: 1.5;
`;
const Counter = styled.div`
    display: flex;
    margin: 4px 4px;
`;
const RowResizeMode = [
    { value: false, title: '普通模式', text: '普通模式' },
    { value: true, title: '分离模式', text: '分离模式' },
];
const ColumnResizeMode = [
    { value: false, title: '普通模式', text: '普通模式' },
    { value: true, title: '分离模式', text: '分离模式' },
];

function Index(props) {
    const {
        active,
        // 允许拖拽
        allowUserDragDrop,
        // 允许拖放填充
        allowUserDragFill,
        // 允许撤销
        allowUndo,
        // 允许拖拽合并单元格
        allowUserDragMerge,
        // 允许自动生成超链接
        allowAutoCreateHyperlink,
        // 允许自动拓展筛选范围
        allowAutoExtendFilterRange,

        rowResizeMode,
        columnResizeMode,
        maxUndoStack,

        // 允许输入公式
        allowUserEditFormula,
        // 允许缩放
        allowUserZoom,
        // 允许动态数组
        allowDynamicArray,
        // 允许无效公式
        allowInvalidFormula,
        // 允许无障碍
        enableAccessibility,
        // 像素滚动
        scrollByPixel,
        scrollPixel,
        formulaFormatHint,
    } = useSelector(({ workbookSettingSlice }) => workbookSettingSlice);

    const dispatch = useDispatch();

    const handleRowResizeMode = (value) => {
        dispatch(setRowResizeMode(value));
    };
    const handleColumnResizeMode = (value) => {
        dispatch(setColumnResizeMode(value));
    };

    return (
        <Wrapper>
            <Label>设置</Label>
            <Divider></Divider>
            <HLayout>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            title='允许拖拽'
                            value={allowUserDragDrop}
                            onChange={(checked) => {
                                dispatch(setAllowUserDragDrop(checked));
                            }}
                        ></CheckBox>
                        <CheckBox
                            title='允许拖动和填充'
                            value={allowUserDragFill}
                            onChange={(checked) => {
                                dispatch(setAllowUserDragFill(checked));
                            }}
                        ></CheckBox>
                        <CheckBox
                            title='允许撤销'
                            value={allowUndo}
                            onChange={(checked) => {
                                dispatch(setAllowUndo(checked));
                            }}
                        ></CheckBox>
                        <CheckBox
                            title='允许拖拽合并单元格'
                            value={allowUserDragMerge}
                            onChange={(checked) => {
                                dispatch(setAllowUserDragMerge(checked));
                            }}
                        ></CheckBox>
                        <CheckBox
                            title='允许自动生成超链接'
                            value={allowAutoCreateHyperlink}
                            onChange={(checked) => {
                                dispatch(setAllowAutoCreateHyperlink(checked));
                            }}
                        ></CheckBox>
                        <CheckBox
                            title='允许自动扩展筛选范围'
                            value={allowAutoExtendFilterRange}
                            onChange={(checked) => {
                                dispatch(
                                    setAllowAutoExtendFilterRange(checked)
                                );
                            }}
                        ></CheckBox>

                        <Selector>
                            <SelectTittle>行调整模式</SelectTittle>
                            <SelectWrapper>
                                <Select
                                    datas={RowResizeMode}
                                    value={rowResizeMode}
                                    onChange={handleRowResizeMode}
                                    style={{
                                        width: '100px',
                                        height: '25px',
                                        margin: '5px 0px',
                                    }}
                                    optionStyle={{ width: '100px' }}
                                ></Select>
                            </SelectWrapper>
                        </Selector>
                        <Selector>
                            <SelectTittle>列调整模式</SelectTittle>
                            <SelectWrapper>
                                <Select
                                    datas={ColumnResizeMode}
                                    value={columnResizeMode}
                                    onChange={handleColumnResizeMode}
                                    style={{
                                        width: '100px',
                                        height: '25px',
                                        margin: '5px 0px',
                                    }}
                                    optionStyle={{ width: '100px' }}
                                ></Select>
                            </SelectWrapper>
                        </Selector>
                        <Selector>
                            <SelectTittle>撤销/恢复栈最大长度</SelectTittle>
                            <SelectWrapper>
                                <Integer
                                    value={maxUndoStack}
                                    style={{ width: '102px', height: 27 }}
                                    max={Number.MAX_SAFE_INTEGER}
                                    min={1}
                                    onChange={(countNumber) =>
                                        dispatch(setMaxUndoStack(countNumber))
                                    }
                                />
                            </SelectWrapper>
                        </Selector>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            title='允许用户输入公式'
                            value={allowUserEditFormula}
                            onChange={(checked) => {
                                dispatch(setAllowUserEditFormula(checked));
                            }}
                        ></CheckBox>
                        <CheckBox
                            title='允许缩放'
                            value={allowUserZoom}
                            onChange={(checked) => {
                                dispatch(setAllowUserZoom(checked));
                            }}
                        ></CheckBox>
                        <CheckBox
                            title='允许动态数组'
                            value={allowDynamicArray}
                            onChange={(checked) => {
                                dispatch(setAllowDynamicArray(checked));
                            }}
                        ></CheckBox>
                        <CheckBox
                            title='允许无效公式'
                            value={allowInvalidFormula}
                            onChange={(checked) => {
                                dispatch(setAllowInvalidFormula(checked));
                            }}
                        ></CheckBox>
                        <CheckBox
                            title='允许无障碍'
                            value={enableAccessibility}
                            onChange={(checked) => {
                                dispatch(setEnableAccessibility(checked));
                            }}
                        ></CheckBox>
                        <CheckBox
                            title='像素滚动'
                            value={scrollByPixel}
                            onChange={(checked) => {
                                dispatch(setScrollByPixel(checked));
                            }}
                        ></CheckBox>
                        <Counter>
                            <Integer
                                value={scrollPixel}
                                style={{ width: '102px', height: 27 }}
                                max={100000000}
                                min={1}
                                onChange={(counterNumber) =>
                                    dispatch(setScrollPixel(counterNumber))
                                }
                            />
                            <Label>{'滚动单位<像素>'}</Label>
                        </Counter>
                        <CheckBox
                            title='公式自动格式化'
                            value={formulaFormatHint}
                            onChange={(checked) => {
                                dispatch(setFormulaFormatHint(checked));
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
            </HLayout>
        </Wrapper>
    );
}

export default Index;
