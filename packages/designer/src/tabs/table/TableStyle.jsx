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
  setFilterButtonVisible,
  setShowFooter,
  setShowHeader,
} from '../../store/tableDesignSlice/tableDesignSlice';

export default function () {
    const dispatch = useDispatch();
    const { spread,showHeader,showFooter,filterButtonVisible } = useSelector(
        ({ tableDesignSlice }) => tableDesignSlice
    );
    useEffect(()=>{
        setTableStyles({
            spread,
            showHeader,
            showFooter,
            filterButtonVisible
        });
    },[showHeader,showFooter,filterButtonVisible]);
    return (
        <GroupItem title='表样式选项'>
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
                            desc='显示/隐藏汇总行，汇总行中可以对数据进行求和、平均值、最大值、最小值等计算'
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
                            value={false}
                            desc='显示/隐藏镶边行，显示镶边行时，数据行间将出现斑马纹'
                            onChange={(evt) => {}}
                        ></CheckBox>
                    </ItemList>
                    <ItemList>
                        <CheckBox
                            title='镶边列'
                            value={false}
                            desc='显示/隐藏镶边列，显示镶边列时，数据列间将出现斑马纹'
                            onChange={(evt) => {}}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            title='第一列'
                            value={false}
                            onChange={(evt) => {}}
                        ></CheckBox>
                    </ItemList>
                    <ItemList>
                        <CheckBox
                            title='最后一列'
                            value={false}
                            disabled={false}
                            onChange={(evt) => {}}
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
                            title='汇总行列表'
                            value={false}
                            disabled={false}
                            onChange={(evt) => {}}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
            </HLayout>
        </GroupItem>
    );
}
