import {
  useDispatch,
  useSelector,
} from 'react-redux';

import CancelIcon from '@icons/shape/Cancel';
import CloseIcon from '@icons/shape/Close';
import {
  setErrorDetailVisible,
} from '@store/formulaEditorSlice/formulaEditorSlice';

export default function (props) {
    const { errorList, showErrorDetail } = useSelector(
        ({ formulaEditorSlice }) => formulaEditorSlice
    );
    const dispatch = useDispatch();
    return errorList.length > 0 && showErrorDetail ? (
        <div
            style={{
                position: 'absolute',
                width: '100%',
                maxHeight: 150,
                padding: 16,
                paddingRight: 0,
                bottom: 0,
                margin: 0,
                border: '1px solid #eee',
                boxShadow: '0px 0px 10px 5px #eee',
                color: '#515a6e',
                fontSize: '14px',
                lineHeight: 1.5,
                boxSizing: 'border-box',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <span>错误：{errorList.length}&nbsp;个</span>
                <CloseIcon
                    sx={{
                        cursor: 'pointer',
                        fontSize: '18px',
                        marginRight: '16px',
                        '&:hover': { color: '#1976d2' },
                    }}
                    onClick={() => {
                        dispatch(setErrorDetailVisible({ visible: false }));
                    }}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                    maxHeight: 120,
                }}
            >
                {errorList.map((detail, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                height: 'auto',
                                marginTop: 8,
                                marginBottom: 8,
                            }}
                        >
                            <CancelIcon
                                hoverable={false}
                                style={{ color: 'red', fontSize: '18px' }}
                            />
                            <p
                                style={{
                                    display: 'inline-block',
                                    margin: 0,
                                    padding: 0,
                                    marginLeft: '8px',
                                }}
                            >
                                <span>语法错误：</span>
                                <span style={{ marginLeft: '8px' }}>
                                    {detail.message}
                                </span>
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    ) : null;
}
