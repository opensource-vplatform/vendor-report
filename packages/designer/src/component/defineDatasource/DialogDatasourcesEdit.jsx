import { useSelector } from 'react-redux';

import Dialog from '@components/dialog/Index.jsx';
import { setIsShowDatasource } from '@store/datasourceSlice/datasourceSlice';

import DatasourcesEdit from './DatasourcesEdit.jsx';

export default function Index(props) {
    const { isShowDatasource } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );
    if (!isShowDatasource) {
        return null;
    }
    return (
        <Dialog
            open={true}
            width='100%'
            height='100%'
            onClose={function () {
                dispatch(setIsShowDatasource());
            }}
        >
            <DatasourcesEdit></DatasourcesEdit>
        </Dialog>
    );
}
