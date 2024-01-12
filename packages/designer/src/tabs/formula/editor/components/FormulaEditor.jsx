import {
  createRef,
  useContext,
  useEffect,
} from 'react';

import styled from 'styled-components';

import context from '../Context';
import Error from './Error';

const Editor = styled.textarea`
    text-indent: 12px;
    height: 100%;
    width: 100%;
    outline: none;
    background-color: #f0f0f0;
    border:none;
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
    const editorContainer = createRef();
    const ctx = useContext(context);
    const { data, setData } = ctx;
    const { formula, selectionStart, selectionEnd } = data;
    useState(data.formula);
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
                    setData({
                        ...data,
                        selectionStart: ele.selectionStart,
                        selectionEnd: ele.selectionEnd,
                    });
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
    return (
        <Wrap>
            <EditorWrap>
                <Flag>=</Flag>
                <Editor
                    suppressContentEditableWarning
                    onselectstart={(e) => {
                        debugger;
                    }}
                    contentEditable='true'
                    ref={editorContainer}
                    value={formula}
                >
                </Editor>
            </EditorWrap>
            <Error></Error>
        </Wrap>
    );
}
