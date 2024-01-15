import { useSelector } from 'react-redux';

import Tree from './Tree.jsx';

//数据源列表
export default function Index(props) {
    const { draggable } = props;
    let { dsList, activeDs, finalDsList, activeSheetTablePath } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );
    draggable && (dsList = finalDsList);
    if (!activeDs.id && dsList.length > 0) {
        activeDs = dsList[0];
    }
    const isNotAllow = !(activeDs.code && activeDs.name);
    return (
        <Tree
            {...props}
            datas={dsList}
            isNotAllow={isNotAllow}
            activeSheetTablePath={activeSheetTablePath}
        ></Tree>
    );
}
