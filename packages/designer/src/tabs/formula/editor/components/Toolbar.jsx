import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import BackIcon from '@icons/arrow/ArrowBack';
import ForwardIcon from '@icons/arrow/ArrowForward';
import CancelIcon from '@icons/shape/Cancel';
import {
  back,
  forward,
  setErrorDetailVisible,
} from '@store/formulaEditorSlice/formulaEditorSlice';

const Wrap = styled.div`
    height: 32px;
    border-top: #d2d0d0 1px solid;
    border-bottom: #d2d0d0 1px solid;
    background-color: #f7f7f7;
    font-size: 17px;
    line-height: 32px;
    padding-left: 15px;
    display: flex;
    align-items: center;
    z-index: 1;
`;

const ErrorIconWrap = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 22px;
    border-radius: 2px;
    padding-left: 9px;
    padding-right: 9px;
    &:hover {
        background-color: #e6e7e8;
    }
`;

const ErrorIcon = function () {
    const { errorList, showErrorDetail } = useSelector(
        ({ formulaEditorSlice }) => formulaEditorSlice
    );
    const dispatch = useDispatch();
    return errorList.length > 0 ? (
        <ErrorIconWrap
            onClick={() => {
                dispatch(setErrorDetailVisible({ visible: !showErrorDetail }));
            }}
        >
            <CancelIcon style={{ color: 'red', fontSize: '18px' }} hoverable={false}></CancelIcon>
            <span
                style={{
                    color: '#515a6e',
                    fontSize: '12px',
                    marginLeft: '8px',
                }}
            >
                {'错误：' + errorList.length}
            </span>
        </ErrorIconWrap>
    ) : null;
};

export default function () {
    const { canGoBack, canGoForward } = useSelector(
        ({ formulaEditorSlice }) => formulaEditorSlice
    );
    const dispatch = useDispatch();
    return (
        <Wrap>
            <BackIcon
                fontSize='small'
                tips='后退'
                color='disabled'
                disabled={!canGoBack}
                onClick={() => dispatch(back())}
            ></BackIcon>
            <ForwardIcon
                fontSize='small'
                tips='前进'
                disabled={!canGoForward}
                onClick={() => dispatch(forward())}
            ></ForwardIcon>
            <ErrorIcon></ErrorIcon>
        </Wrap>
    );
}
