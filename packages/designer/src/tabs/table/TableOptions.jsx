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
import { setTableStyles } from '@utils/tableUtil';

import {
  setBandColumn,
  setBandRow,
  setColumnMerge,
  setFilterButtonVisible,
  setFooterDropDownList,
  setHighlightFirstColumn,
  setHighlightLastColumn,
  setRowMerge,
  setShowFooter,
  setShowHeader,
} from '../../store/tableDesignSlice/tableDesignSlice';

export default function () {
    const dispatch = useDispatch();
    const {
        spread,
        showHeader,
        showFooter,
        bandRow,
        bandColumn,
        highlightFirstColumn,
        highlightLastColumn,
        filterButtonVisible,
        footerDropDownList,
        rowMerge,
        columnMerge,
    } = useSelector(({ tableDesignSlice }) => tableDesignSlice);
    useEffect(() => {
        setTableStyles({
            spread,
            showHeader,
            showFooter,
            bandRow,
            bandColumn,
            highlightFirstColumn,
            highlightLastColumn,
            filterButtonVisible,
            footerDropDownList,
        });
    }, [
        showHeader,
        showFooter,
        bandRow,
        bandColumn,
        highlightFirstColumn,
        highlightLastColumn,
        filterButtonVisible,
        footerDropDownList,
    ]);
    return (
        <GroupItem title='表格选项'>
            <HLayout>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            title='标题行'
                            value={showHeader}
                            desc='显示/隐藏标题'
                            onChange={(evt) => {
                                dispatch(
                                    setShowHeader({
                                        showHeader: evt.target.checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                    <ItemList>
                        <CheckBox
                            title='汇总行'
                            desc='显示/隐藏汇总行。汇总行中可以对数据进行求和、平均值、最大值、最小值等计算'
                            value={showFooter}
                            onChange={(evt) => {
                                dispatch(
                                    setShowFooter({
                                        showFooter: evt.target.checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            title='镶边行'
                            value={bandRow}
                            desc='显示/隐藏镶边行。显示镶边行时，数据行间将出现斑马纹'
                            onChange={(evt) => {
                                dispatch(
                                    setBandRow({
                                        bandRow: evt.target.checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                    <ItemList>
                        <CheckBox
                            title='镶边列'
                            value={bandColumn}
                            desc='显示/隐藏镶边列。显示镶边列时，数据列间将出现斑马纹'
                            onChange={(evt) => {
                                dispatch(
                                    setBandColumn({
                                        bandColumn: evt.target.checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            title='第一列'
                            value={highlightFirstColumn}
                            desc='突出显示第一列数据'
                            onChange={(evt) => {
                                dispatch(
                                    setHighlightFirstColumn({
                                        highlightFirstColumn:
                                            evt.target.checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                    <ItemList>
                        <CheckBox
                            title='最后一列'
                            value={highlightLastColumn}
                            desc='突出显示最后一列数据'
                            onChange={(evt) => {
                                dispatch(
                                    setHighlightLastColumn({
                                        highlightLastColumn: evt.target.checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            title='筛选按钮'
                            value={filterButtonVisible}
                            onChange={(evt) => {
                                dispatch(
                                    setFilterButtonVisible({
                                        filterButtonVisible: evt.target.checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                    <ItemList>
                        <CheckBox
                            title='汇总工具箱'
                            desc='勾选此项，汇总行将提供下拉选择工具，方便进行求和、平均值、最大值、最小值等汇总设置'
                            value={footerDropDownList}
                            disabled={!showFooter}
                            onChange={(evt) => {
                                dispatch(
                                    setFooterDropDownList({
                                        footerDropDownList: evt.target.checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            title='行合并'
                            desc='勾选此项，同行数据存在连续相同时，将合并成一个单元格'
                            value={rowMerge}
                            onChange={(evt) => {
                                dispatch(
                                    setRowMerge({
                                        rowMerge: evt.target.checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                    <ItemList>
                        <CheckBox
                            title='列合并'
                            desc='勾选此项，同列数据存在连续相同时，将合并成一个单元格'
                            value={columnMerge}
                            onChange={(evt) => {
                                dispatch(
                                    setColumnMerge({
                                        columnMerge: evt.target.checked,
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
