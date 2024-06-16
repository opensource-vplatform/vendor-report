import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { setIsShowDatasource } from '@store/datasourceSlice/datasourceSlice';
import { Dialog } from '@toone/report-ui';

import DatasourcesEdit from './DatasourcesEdit';

export default function Index(props) {
    const { isShowDatasource } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );
    const dispatch = useDispatch();
    if (!isShowDatasource) {
        return null;
    }
    return (
        <Dialog
            open={true}
            width='100%'
            height='100%'
            style={{ border: 'none' }}
            onClose={function () {
                dispatch(setIsShowDatasource());
            }}
        >
            <DatasourcesEdit></DatasourcesEdit>
        </Dialog>
    );
}
