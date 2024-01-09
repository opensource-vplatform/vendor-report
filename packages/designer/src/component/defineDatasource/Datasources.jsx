import { useSelector } from 'react-redux';

import Tree from './Tree.jsx';

//数据源列表
export default function Index(props) {
    const {
        activeId,
        click,
        isShowAddSubDatasource = true,
        width,
        draggable,
    } = props;
    let { dsList, activeDs, finalDsList, activeSheetTablePath } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );
    if (draggable) {
        dsList = finalDsList;
    }
    if (!activeDs.id && dsList.length > 0) {
        activeDs = dsList[0];
    }
    const isCanBeSaved = activeDs.code && activeDs.name;
    const isNotAllow = !isCanBeSaved;
    return (
        <Tree
            width={width}
            datas={dsList}
            activeId={activeId}
            click={click}
            isNotAllow={isNotAllow}
            draggable={draggable}
            isShowAddSubDatasource={isShowAddSubDatasource}
            activeSheetTablePath={activeSheetTablePath}
        ></Tree>
    );
}
