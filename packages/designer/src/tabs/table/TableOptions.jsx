import { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  CheckBox,
  GroupItem,
  HLayout,
  ItemList,
  VGroupItem,
} from '@toone/report-ui';
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
    const itemListStyle={
        paddingTop: '5px',
        paddingBottom: '5px'
    }
    return (
        <GroupItem title='表格选项'>
            <HLayout>
                <VGroupItem>
                    <ItemList style={itemListStyle}>
                        <CheckBox
                            title='标题行'
                            value={showHeader}
                            desc='显示/隐藏标题'
                            onChange={(checked) => {
                                dispatch(
                                    setShowHeader({
                                        showHeader: checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                    <ItemList style={itemListStyle}>
                        <CheckBox
                            title='汇总行'
                            desc='显示/隐藏汇总行。汇总行中可以对数据进行求和、平均值、最大值、最小值等计算'
                            value={showFooter}
                            onChange={(checked) => {
                                dispatch(
                                    setShowFooter({
                                        showFooter: checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList style={itemListStyle}>
                        <CheckBox
                            title='镶边行'
                            value={bandRow}
                            desc='显示/隐藏镶边行。显示镶边行时，数据行间将出现斑马纹'
                            onChange={(checked) => {
                                dispatch(
                                    setBandRow({
                                        bandRow: checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                    <ItemList style={itemListStyle}>
                        <CheckBox
                            title='镶边列'
                            value={bandColumn}
                            desc='显示/隐藏镶边列。显示镶边列时，数据列间将出现斑马纹'
                            onChange={(checked) => {
                                dispatch(
                                    setBandColumn({
                                        bandColumn: checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList style={itemListStyle}>
                        <CheckBox
                            title='第一列'
                            value={highlightFirstColumn}
                            desc='突出显示第一列数据'
                            onChange={(checked) => {
                                dispatch(
                                    setHighlightFirstColumn({
                                        highlightFirstColumn: checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                    <ItemList style={itemListStyle}>
                        <CheckBox
                            title='最后一列'
                            value={highlightLastColumn}
                            desc='突出显示最后一列数据'
                            onChange={(checked) => {
                                dispatch(
                                    setHighlightLastColumn({
                                        highlightLastColumn: checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList style={itemListStyle}>
                        <CheckBox
                            title='筛选按钮'
                            value={filterButtonVisible}
                            onChange={(checked) => {
                                dispatch(
                                    setFilterButtonVisible({
                                        filterButtonVisible: checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                    <ItemList style={itemListStyle}>
                        <CheckBox
                            title='汇总工具箱'
                            desc='勾选此项，汇总行将提供下拉选择工具，方便进行求和、平均值、最大值、最小值等汇总设置，使用此选项需启用汇总行。'
                            value={footerDropDownList}
                            disabled={!showFooter}
                            onChange={(checked) => {
                                dispatch(
                                    setFooterDropDownList({
                                        footerDropDownList: checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList style={itemListStyle}>
                        <CheckBox
                            title='行合并'
                            desc='勾选此项，同行数据存在连续相同时，将合并成一个单元格'
                            value={rowMerge}
                            onChange={(checked) => {
                                dispatch(
                                    setRowMerge({
                                        rowMerge: checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                    <ItemList style={itemListStyle}>
                        <CheckBox
                            title='列合并'
                            desc='勾选此项，同列数据存在连续相同时，将合并成一个单元格'
                            value={columnMerge}
                            onChange={(checked) => {
                                dispatch(
                                    setColumnMerge({
                                        columnMerge: checked,
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
