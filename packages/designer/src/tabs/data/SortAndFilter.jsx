import { useState } from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  HCard,
  VIconTitle,
} from '@components/nav/Index';
import AscIcon from '@icons/data/Asc';
import DescIcon from '@icons/data/Desc';
import FilterIcon from '@icons/data/filter';
import FilterOffIcon from '@icons/data/filterOff';
import SortIcon from '@icons/data/Sort';
import {
  HLayout,
  ItemList,
  VGroupItem,
} from '@toone/report-ui';
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
        <HCard title='排序与筛选'>
            {opened ? (
                <SortSetting
                    onConfirm={({ sortType, conditions }) => {
                        const sorts = conditions.map(
                            ({ index, sortBy, sort, color }) => {
                                const data = { index };
                                if (sortBy == 'foreColor') {
                                    data.fontColor = rgbStrToHex(color);
                                    data.order = sort;
                                } else if (sortBy == 'backColor') {
                                    data.backColor = rgbStrToHex(color);
                                    data.order = sort;
                                } else if (sortBy == 'value') {
                                    data.ascending = sort == 'asc';
                                }
                                return data;
                            }
                        );
                        sortSelection(spread, sortType == 'sortByCol', sorts);
                        setOpened(false);
                    }}
                    onCancel={() => setOpened(false)}
                ></SortSetting>
            ) : null}
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
                    <VIconTitle
                        title='排序'
                        desc='对所选单元格启用筛选'
                        icon={SortIcon}
                        onClick={() => {
                            setOpened(true);
                        }}
                    ></VIconTitle>
                </HLayout>
            </VGroupItem>
            <VGroupItem>
                <HLayout>
                    <VIconTitle
                        title='筛选'
                        desc='对所选单元格启用筛选'
                        icon={FilterIcon}
                        onClick={() => {
                            setRowFilter(spread);
                        }}
                    ></VIconTitle>
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
        </HCard>
    );
}
