import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import { setConfirmMsg } from '../../store/appSlice/appSlice';
import {
  handleCancel,
  handleConfirm,
} from '../../utils/callbackUtil';
import { OperationDialog } from '../dialog/Index';

const Text = styled.div`
    margin: 16px;
    width: max-content;
    min-width: 200px;
`;

export default function () {
    const dispatch = useDispatch();
    const { confirmMsg, confirmTitle, confirmCallbackId } = useSelector(
        ({ appSlice }) => appSlice
    );

    const close = () => {
        dispatch(
            setConfirmMsg({
                message: null,
                title: null,
                callbackId: null,
            })
        );
    };

    const confirmHandler = () => {
        close();
        handleConfirm(confirmCallbackId, true);
    };
    const cancelHandler = () => {
        close();
        handleCancel(confirmCallbackId, false);
    };
    return confirmMsg != null ? (
        <OperationDialog
            title={confirmTitle}
            onConfirm={confirmHandler}
            onCancel={cancelHandler}
        >
            <Text>{confirmMsg}</Text>
        </OperationDialog>
    ) : null;
}
