import { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { CheckBox } from '@components/form/Index';
import {
  GroupItem,
  HLayout,
  VGroupItem,
} from '@components/group/Index';
import ItemList from '@components/group/ItemList';
import {
  init,
  setColHeaderVisible,
  setNewTabVisible,
  setRowHeaderVisible,
  setShowHorizontalGridline,
  setShowVerticalGridline,
  setTabStripVisible,
} from '@store/viewSlice/viewSlice';
import { withBatchUpdate } from '@utils/spreadUtil';

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
        const sheet = spread.getActiveSheet();
        if (sheet) {
            const { colHeaderVisible, rowHeaderVisible } = sheet.options;
            const { showHorizontalGridline, showVerticalGridline } =
                sheet.options.gridline;
            dispatch(
                init({
                    colHeaderVisible,
                    rowHeaderVisible,
                    showHorizontalGridline,
                    showVerticalGridline,
                })
            );
        }
    }, []);
    useEffect(() => {
        withBatchUpdate(spread, () => {
            spread.options.newTabVisible = newTabVisible;
            spread.options.tabStripVisible = tabStripVisible;
            const sheet = spread.getActiveSheet();
            sheet.options.colHeaderVisible = colHeaderVisible;
            sheet.options.rowHeaderVisible = rowHeaderVisible;
            sheet.options.gridline.showHorizontalGridline =
                showHorizontalGridline;
            sheet.options.gridline.showVerticalGridline = showVerticalGridline;
        });
    }, [
        colHeaderVisible,
        rowHeaderVisible,
        showHorizontalGridline,
        showVerticalGridline,
        newTabVisible,
        tabStripVisible,
    ]);
    const groupStyle = { padding: '4px 6px' };
    return (
        <GroupItem title='显示/隐藏'>
            <HLayout>
                <VGroupItem>
                    <ItemList style={groupStyle}>
                        <CheckBox
                            title='行标题'
                            desc='显示、隐藏行标题'
                            value={rowHeaderVisible}
                            onChange={(checked) => {
                                dispatch(
                                    setRowHeaderVisible({
                                        visible: checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                    <ItemList style={groupStyle}>
                        <CheckBox
                            title='列标题'
                            desc='显示、隐藏列标题'
                            value={colHeaderVisible}
                            onChange={(checked) => {
                                dispatch(
                                    setColHeaderVisible({
                                        visible: checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList style={groupStyle}>
                        <CheckBox
                            title='垂直网格线'
                            desc='显示、隐藏垂直网格线'
                            value={showVerticalGridline}
                            onChange={(checked) => {
                                dispatch(
                                    setShowVerticalGridline({
                                        visible: checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                    <ItemList style={groupStyle}>
                        <CheckBox
                            title='水平网格线'
                            desc='显示、隐藏水平网格线'
                            value={showHorizontalGridline}
                            onChange={(checked) => {
                                dispatch(
                                    setShowHorizontalGridline({
                                        visible: checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList style={groupStyle}>
                        <CheckBox
                            title='工作表选项卡'
                            desc='显示、隐藏工作表选项卡'
                            value={tabStripVisible}
                            onChange={(checked) => {
                                dispatch(
                                    setTabStripVisible({
                                        visible: checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                    <ItemList style={groupStyle}>
                        <CheckBox
                            title='新建工作表'
                            desc='显示、隐藏新增工作表图标，使用此功能需显示工作选项卡'
                            value={newTabVisible}
                            disabled={!tabStripVisible}
                            onChange={(checked) => {
                                dispatch(
                                    setNewTabVisible({
                                        visible: checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
            </HLayout>
        </GroupItem>
    );
}
