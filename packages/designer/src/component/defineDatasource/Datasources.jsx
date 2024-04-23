import { useState } from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Search } from '@components/form/Index';

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
    const { draggable, isEditData = true, isCanAdd = true } = props;
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
                datas={dsList}
                isNotAllow={!isCanAdd}
                activeSheetTablePath={activeSheetTablePath}
                searchKey={searchKey.dsSearchKey}
            ></Tree>
        </Wrap>
    );
}
