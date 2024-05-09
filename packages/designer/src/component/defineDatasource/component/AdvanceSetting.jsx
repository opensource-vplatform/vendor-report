import {
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import FieldAdvanceSetting from './FieldAdvanceSetting';
import TableAdvanceSetting from './TableAdvanceSetting';

const Wrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    max-width: 500px;
`;

const Link = styled.a`
    color: #0075ff;
    cursor: pointer;
    text-decoration: underline;
`;

const isTable = function (datasource) {
    return datasource && datasource.type == 'table';
};

const isTreeStructTable = function (tableCode, setting) {
    return setting?.treeStruct?.[tableCode]?.enable;
};

const isAdvanceField = function (datasource, datasources, setting) {
    const { parentId, type } = datasource;
    if (parentId && (type == 'decimals' || type == 'integer')) {
        const table = datasources.find((ds) => ds.id == parentId);
        if (table) {
            return isTreeStructTable(table.code, setting);
        }
    }
    return false;
};

const isShowAdvance = function (datasource, datasources, setting) {
    return (
        isTable(datasource) || isAdvanceField(datasource, datasources, setting)
    );
};

export default function (props) {
    const { finalDsList, setting } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );
    const { datasource } = props;
    const isVisible =
        datasource && isShowAdvance(datasource, finalDsList, setting);
    const [visible, setVisible] = useState(false);
    return (
        isVisible && (
            <Fragment>
                <Wrap>
                    <Link onClick={() => setVisible(true)}>
                        高级设置&gt;&gt;
                    </Link>
                </Wrap>
                {visible &&
                    (isTable(datasource) ? (
                        <TableAdvanceSetting
                            datasource={datasource}
                            onClose={() => setVisible(false)}
                        ></TableAdvanceSetting>
                    ) : (
                        <FieldAdvanceSetting
                            datasource={datasource}
                            onClose={() => setVisible(false)}
                        ></FieldAdvanceSetting>
                    ))}
            </Fragment>
        )
    );
}
