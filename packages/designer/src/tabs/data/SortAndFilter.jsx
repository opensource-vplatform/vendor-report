import { useState } from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  GroupItem,
  HLayout,
  ItemList,
  VGroupItem,
  VItem,
} from '@components/group/Index';
import AscIcon from '@icons/data/Asc';
import DescIcon from '@icons/data/Desc';
import FilterIcon from '@icons/data/filter';
import FilterOffIcon from '@icons/data/filterOff';
import SortIcon from '@icons/data/Sort';
import { rgbStrToHex } from '@utils/colorUtil';
import {
  clearRowFilter,
  setRowFilter,
  sortRange,
  sortSelection,
} from '@utils/worksheetUtil';

import SortSetting from './SortSetting';

const Label = styled.span`
    font-size: 12px;
    margin-left: 4px;
    color: black;
    margin-right: 4px;
`;

export default function () {
    const style = { color: '#666' };
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [opened, setOpened] = useState(false);
    return (
        <GroupItem title='排序与筛选'>
            {opened ? (
                <SortSetting
                    onConfirm={({ sortType, conditions }) => {
                        const sorts = conditions.map(({index,sortBy,sort,color}) => {
                            debugger;
                            const data = {index};
                            if(sortBy=='foreColor'){
                                data.fontColor = rgbStrToHex(color);
                                data.order = sort;
                            }else if(sortBy=='backColor'){
                                data.backColor = rgbStrToHex(color);
                                data.order = sort;
                            }else if(sortBy=='value'){
                                data.ascending = sort=='asc';
                            }
                            return data;
                        });
                        sortSelection(spread, sortType == 'sortByCol', sorts);
                        setOpened(false);
                    }}
                    onCancel={() => setOpened(false)}
                ></SortSetting>
            ) : null}
            <HLayout>
                <VGroupItem>
                    <HLayout>
                        <VGroupItem>
                            <ItemList>
                                <AscIcon
                                    tips='升序：由最低到最高'
                                    style={style}
                                    onClick={() => sortRange(spread, true)}
                                ></AscIcon>
                            </ItemList>
                            <ItemList>
                                <DescIcon
                                    tips='降序：由最高到最低'
                                    style={style}
                                    onClick={() => sortRange(spread, false)}
                                ></DescIcon>
                            </ItemList>
                        </VGroupItem>
                        <VItem
                            title='排序'
                            desc='对所选单元格启用筛选'
                            style={{
                                marginLeft: 4,
                                marginRight: 4,
                                paddingLeft: 4,
                                paddingRight: 4,
                                paddingBottom: 4,
                            }}
                            icon={
                                <SortIcon
                                    iconStyle={{
                                        width: 36,
                                        height: 36,
                                    }}
                                ></SortIcon>
                            }
                            onClick={() => {
                                setOpened(true);
                            }}
                        ></VItem>
                    </HLayout>
                </VGroupItem>
                <VGroupItem>
                    <HLayout>
                        <VItem
                            title='筛选'
                            desc='对所选单元格启用筛选'
                            style={{
                                marginLeft: 4,
                                marginRight: 4,
                                paddingLeft: 4,
                                paddingRight: 4,
                                paddingBottom: 4,
                            }}
                            icon={
                                <FilterIcon
                                    iconStyle={{
                                        width: 44,
                                        height: 44,
                                    }}
                                    pathAttrs={{
                                        fill: '#666',
                                    }}
                                ></FilterIcon>
                            }
                            onClick={() => {
                                setRowFilter(spread);
                            }}
                        ></VItem>
                        <VGroupItem>
                            <ItemList>
                                <FilterOffIcon
                                    tips='清除当前数据范围的筛选和排序状态'
                                    style={style}
                                    onClick={() => clearRowFilter(spread)}
                                >
                                    <Label>清除</Label>
                                </FilterOffIcon>
                            </ItemList>
                            <ItemList>
                                <FilterIcon
                                    tips='对当前区域重新应用筛选和排序'
                                    style={style}
                                    onClick={() => setRowFilter(spread)}
                                >
                                    <Label>重新应用</Label>
                                </FilterIcon>
                            </ItemList>
                        </VGroupItem>
                    </HLayout>
                </VGroupItem>
            </HLayout>
        </GroupItem>
    );
}
