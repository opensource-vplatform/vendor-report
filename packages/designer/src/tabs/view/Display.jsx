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
        withBatchUpdate(spread,()=>{
            spread.options.newTabVisible = newTabVisible;
            spread.options.tabStripVisible = tabStripVisible;
            const sheet = spread.getActiveSheet();
            sheet.options.colHeaderVisible = colHeaderVisible;
            sheet.options.rowHeaderVisible = rowHeaderVisible;
            sheet.options.gridline.showHorizontalGridline = showHorizontalGridline;
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
    return (
        <GroupItem title='显示/隐藏'>
            <HLayout>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            title='行标题'
                            value={rowHeaderVisible}
                            onChange={(evt) => {
                                dispatch(
                                    setRowHeaderVisible({
                                        visible: evt.target.checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                    <ItemList>
                        <CheckBox
                            title='列标题'
                            value={colHeaderVisible}
                            onChange={(evt) => {
                                dispatch(
                                    setColHeaderVisible({
                                        visible: evt.target.checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            title='垂直网格线'
                            value={showVerticalGridline}
                            onChange={(evt) => {
                                dispatch(
                                    setShowVerticalGridline({
                                        visible: evt.target.checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                    <ItemList>
                        <CheckBox
                            title='水平网格线'
                            value={showHorizontalGridline}
                            onChange={(evt) => {
                                dispatch(
                                    setShowHorizontalGridline({
                                        visible: evt.target.checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            title='工作表选项卡'
                            value={tabStripVisible}
                            onChange={(evt) => {
                                dispatch(
                                    setTabStripVisible({
                                        visible: evt.target.checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                    <ItemList>
                        <CheckBox
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
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
            </HLayout>
        </GroupItem>
    );
}
