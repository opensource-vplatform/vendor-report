import {
  createRef,
  useEffect,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  setFormula,
  setSelection,
} from '../../../../store/formulaSlice/formulaSlice';
import Error from './Error';

const Editor = styled.textarea`
    text-indent: 12px;
    height: 100%;
    width: 100%;
    outline: none;
    background-color: #f0f0f0;
    border: none;
`;

const Wrap = styled.div`
    flex-grow: 1;
    position: relative;
`;

const EditorWrap = styled.div`
    height: 100%;
    color: #515a6e;
    padding: 16px;
    box-sizing: border-box;
`;

const Flag = styled.span`
    position: absolute;
`;

export default function (props) {
    const { formula, selectionStart, selectionEnd } = useSelector(
        ({ formulaSlice }) => formulaSlice
    );
    const dispatch = useDispatch();
    const editorContainer = createRef();
    useEffect(() => {
        const ele = editorContainer.current;
        if (ele) {
            ele.selectionStart = selectionStart;
            ele.selectionEnd = selectionEnd;
            ele.focus();
            const handleSelectionChange = (evt) => {
                if (
                    document.activeElement === ele &&
                    (selectionStart != ele.selectionStart ||
                        selectionEnd != ele.selectionEnd)
                ) {
                    dispatch(
                        setSelection({
                            start: ele.selectionStart,
                            end: ele.selectionEnd,
                        })
                    );
                }
            };
            document.addEventListener('selectionchange', handleSelectionChange);
            return () => {
                document.removeEventListener(
                    'selectionchange',
                    handleSelectionChange
                );
            };
        }
    }, [formula, selectionStart, selectionEnd]);
    const handleInput = (evt) => {
        const nativeEvent = evt.nativeEvent;
        const ele = nativeEvent.target;
        dispatch(setFormula({formula:ele.value}));
        dispatch(setSelection({start:ele.selectionStart,end:ele.selectionEnd}));
    };
    return (
        <Wrap>
            <EditorWrap>
                <Flag>=</Flag>
                <Editor
                    suppressContentEditableWarning
                    contentEditable='true'
                    ref={editorContainer}
                    onInput={handleInput}
                    value={formula}
                ></Editor>
            </EditorWrap>
            <Error></Error>
        </Wrap>
    );
}
