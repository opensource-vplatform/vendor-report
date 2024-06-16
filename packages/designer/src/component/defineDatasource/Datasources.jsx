import { useState } from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Search } from '@toone/report-ui';
import { isArray } from '@toone/report-util';

import Tree from './Tree.jsx';

const Wrap = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 2px;
`;

//数据源列表
export default function Index(props) {
    const {
        draggable,
        isEditData = true,
        isCanAdd = true,
        onDoubleClick,
    } = props;
    let { dsList, activeDs, finalDsList, activeSheetTablePath } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );
    (draggable || !isEditData) && (dsList = finalDsList);
    if (!activeDs.id && dsList.length > 0) {
        activeDs = dsList[0];
    }

    const [searchKey, setSearchKey] = useState({
        dsSearchKey: '',
    });

    const datas = JSON.parse(JSON.stringify(dsList));

    datas.forEach(function (item) {
        if (isArray(item.children)) {
            item.children.sort(function (cur, next) {
                return cur.name.localeCompare(next.name, 'zh');
            });
        }
    });
    datas.sort(function (cur, next) {
        return cur.name.localeCompare(next.name, 'zh');
    });

    return (
        <Wrap>
            <Search
                onClear={function () {
                    setSearchKey({
                        ...searchKey,
                        dsSearchKey: '',
                    });
                }}
                onInput={function (value) {
                    setSearchKey({
                        ...searchKey,
                        dsSearchKey: value,
                    });
                }}
                value={searchKey.dsSearchKey}
            ></Search>
            <Tree
                {...props}
                datas={datas}
                isNotAllow={!isCanAdd}
                onDoubleClick={onDoubleClick}
                activeSheetTablePath={activeSheetTablePath}
                searchKey={searchKey.dsSearchKey}
            ></Tree>
        </Wrap>
    );
}
