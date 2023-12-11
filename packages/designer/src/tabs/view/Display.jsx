import { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  GroupItem,
  HLayout,
  VGroupItem,
} from '@components/group/Index';

import ItemList from '../../component/group/ItemList';
import {
  setColHeaderVisible,
  setNewTabVisible,
  setRowHeaderVisible,
  setShowHorizontalGridline,
  setShowVerticalGridline,
  setTabStripVisible,
} from '../../store/viewSlice/viewSlice';

const Label = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 4px;
    box-sizing: border-box;
    &:hover {
        background-color: #dadada;
    }
    &[data-disabled='true']{
        background-color: transparent !important;
        cursor:not-allowed;
    }
`;

const Input = styled.input`
    margin: 0px;
    padding: 0px;
`;

const Title = styled.span`
    margin-left: 12px;
    font-size: 12px;
`;

function Switch(props) {
    const { title, value, onChange,disabled } = props;
    return (
        <Label data-disabled={!!disabled}>
            <Input
                type='checkbox'
                checked={!!value}
                onChange={onChange}
                disabled={!!disabled}
            ></Input>
            <Title>{title}</Title>
        </Label>
    );
}

export default function () {
    const dispatch = useDispatch();
    const {
        spread,
        colHeaderVisible,
        rowHeaderVisible,
        showHorizontalGridline,
        showVerticalGridline,
        newTabVisible,
        tabStripVisible,
    } = useSelector(({ viewSlice }) => viewSlice);
    useEffect(() => {
        if (spread) {
            spread.suspendPaint();
            try {
                spread.options.newTabVisible = newTabVisible;
                spread.options.tabStripVisible = tabStripVisible;
                const sheet = spread.getActiveSheet();
                sheet.options.colHeaderVisible = colHeaderVisible;
                sheet.options.rowHeaderVisible = rowHeaderVisible;
                sheet.options.gridline.showHorizontalGridline = showHorizontalGridline;
                sheet.options.gridline.showVerticalGridline = showVerticalGridline;
            } finally {
                spread.resumePaint();
            }
        }
    }, [
        colHeaderVisible,
        rowHeaderVisible,
        showHorizontalGridline,
        showVerticalGridline,
        newTabVisible,
        tabStripVisible,
    ]);
    return (
        <GroupItem title='显示/隐藏'>
            <HLayout>
                <VGroupItem>
                    <ItemList>
                        <Switch
                            title='行标题'
                            value={rowHeaderVisible}
                            onChange={(evt) => {
                                dispatch(
                                    setRowHeaderVisible({
                                        visible: evt.target.checked,
                                    })
                                );
                            }}
                        ></Switch>
                    </ItemList>
                    <ItemList>
                        <Switch
                            title='列标题'
                            value={colHeaderVisible}
                            onChange={(evt) => {
                                dispatch(
                                    setColHeaderVisible({
                                        visible: evt.target.checked,
                                    })
                                );
                            }}
                        ></Switch>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList>
                        <Switch
                            title='垂直网格线'
                            value={showVerticalGridline}
                            onChange={(evt) => {
                                dispatch(
                                    setShowVerticalGridline({
                                        visible: evt.target.checked,
                                    })
                                );
                            }}
                        ></Switch>
                    </ItemList>
                    <ItemList>
                        <Switch
                            title='水平网格线'
                            value={showHorizontalGridline}
                            onChange={(evt) => {
                                dispatch(
                                    setShowHorizontalGridline({
                                        visible: evt.target.checked,
                                    })
                                );
                            }}
                        ></Switch>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList>
                        <Switch
                            title='工作表选项卡'
                            value={tabStripVisible}
                            onChange={(evt) => {
                                dispatch(
                                    setTabStripVisible({
                                        visible: evt.target.checked,
                                    })
                                );
                            }}
                        ></Switch>
                    </ItemList>
                    <ItemList>
                        <Switch
                            title='新建工作表'
                            value={newTabVisible}
                            disabled={!tabStripVisible}
                            onChange={(evt) => {
                                dispatch(
                                    setNewTabVisible({
                                        visible: evt.target.checked,
                                    })
                                );
                            }}
                        ></Switch>
                    </ItemList>
                </VGroupItem>
            </HLayout>
        </GroupItem>
    );
}
