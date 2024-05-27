import { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { CheckBox } from '@components/form/Index';
import { VGroupItem } from '@components/group/Index';
import ItemList from '@components/group/ItemList';
import { HCard } from '@components/nav/Index';
import {
  bind,
  EVENTS,
} from '@event/EventManager';
import {
  resetView,
  setOptions as setStateOptions,
} from '@store/viewSlice/viewSlice';
import { setOptions as setSpreadOptions } from '@utils/spreadUtil';
import { setOptions as setSheetOptions } from '@utils/worksheetUtil';

const groupStyle = { padding: '4px 6px' };

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
    //初始化视图状态数据
    const initViewData = () => {
        dispatch(resetView());
    };
    useEffect(() => {
        initViewData();
        const unbind = bind({
            event: EVENTS.SheetChanged,
            handler: () => {
                //sheet页切换后，更新状态数据
                spread && initViewData();
            },
        });
        return () => {
            unbind();
        };
    }, []);

    //设置工作簿选项信息
    const setSpreadOptionDatas = (options) => {
        setSpreadOptions(spread, options);
        dispatch(setStateOptions(options));
    };
    //设置工作表选项信息
    const setSheetOptionDatas = (options, values) => {
        const sheet = spread.getActiveSheet();
        if (sheet) {
            setSheetOptions(sheet, options);
            dispatch(setStateOptions(values || options));
        }
    };
    return (
        <HCard title='显示/隐藏'>
            <VGroupItem>
                <ItemList style={groupStyle}>
                    <CheckBox
                        title='行标题'
                        desc='显示、隐藏行标题'
                        value={rowHeaderVisible}
                        onChange={(rowHeaderVisible) => {
                            setSheetOptionDatas({ rowHeaderVisible });
                        }}
                    ></CheckBox>
                </ItemList>
                <ItemList style={groupStyle}>
                    <CheckBox
                        title='列标题'
                        desc='显示、隐藏列标题'
                        value={colHeaderVisible}
                        onChange={(colHeaderVisible) => {
                            setSheetOptionDatas({ colHeaderVisible });
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
                        onChange={(showVerticalGridline) => {
                            setSheetOptionDatas(
                                {
                                    gridline: {
                                        showVerticalGridline,
                                    },
                                },
                                { showVerticalGridline }
                            );
                        }}
                    ></CheckBox>
                </ItemList>
                <ItemList style={groupStyle}>
                    <CheckBox
                        title='水平网格线'
                        desc='显示、隐藏水平网格线'
                        value={showHorizontalGridline}
                        onChange={(showHorizontalGridline) => {
                            setSheetOptionDatas(
                                {
                                    gridline: {
                                        showHorizontalGridline,
                                    },
                                },
                                { showHorizontalGridline }
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
                        onChange={(tabStripVisible) => {
                            setSpreadOptionDatas({ tabStripVisible });
                        }}
                    ></CheckBox>
                </ItemList>
                <ItemList style={groupStyle}>
                    <CheckBox
                        title='新建工作表'
                        desc='显示、隐藏新增工作表图标，使用此功能需显示工作选项卡'
                        value={newTabVisible}
                        disabled={!tabStripVisible}
                        onChange={(newTabVisible) => {
                            setSpreadOptionDatas({ newTabVisible });
                        }}
                    ></CheckBox>
                </ItemList>
            </VGroupItem>
        </HCard>
    );
}
