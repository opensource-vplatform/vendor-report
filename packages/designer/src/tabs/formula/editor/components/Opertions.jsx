import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Button from '@components/button/Index';
import { setError } from '@store/formulaEditorSlice/formulaEditorSlice';
import { getActiveIndexBySheet } from '@utils/worksheetUtil';

import {
  setErrorDetailVisible,
} from '../../../../store/formulaEditorSlice/formulaEditorSlice';

const Operations = function (props) {
    const { onClose } = props;
    const { formula } = useSelector(
        ({ formulaEditorSlice }) => formulaEditorSlice
    );
    const dispatch = useDispatch();
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const handleConfirm = () => {
        if (formula != '') {
            const sheet = spread?.getActiveSheet();
            try {
                const { row, col } = getActiveIndexBySheet(sheet);
                sheet?.setFormula(row, col, formula);
            } catch (e) {
                dispatch(
                    setError({ message: typeof e == 'string' ? e : e.message })
                );
                return dispatch(setErrorDetailVisible({ visible: true }));
            }
        }
        onClose();
    };
    return (
        <div style={{ margin: '10px 0px', textAlign: 'right' }}>
            <Button style={{ marginRight: '8px' }} onClick={handleConfirm}>
                确定
            </Button>
            <Button style={{ marginRight: '16px' }} onClick={onClose}>
                取消
            </Button>
        </div>
    );
};

export default Operations;
