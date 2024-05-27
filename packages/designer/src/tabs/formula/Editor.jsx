import {
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Dialog } from '@components/dialog/Index';
import { ItemList } from '@components/group/Index';
import { VCard } from '@components/nav/Index';
import EditorIcon from '@icons/formula/Editor';
import ShowIcon from '@icons/formula/Show';
import { setShowFormulas } from '@utils/worksheetUtil';

import Editor from './editor/Index';

const Label = styled.span`
    font-size: 12px;
    margin-left: 4px;
    color: black;
    margin-right: 4px;
`;

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const style = { color: '#666' };
    const [showFormula, setShowFormula] = useState(() => {
        const sheet = spread.getActiveSheet();
        if (sheet) {
            return sheet.options.showFormulas;
        }
        return false;
    });
    const handleShowFormula = () => {
        setShowFormula((isShow) => {
            setShowFormulas(spread, !isShow);
            return !isShow;
        });
    };
    const [showEditor, setShowEditor] = useState(false);
    return (
        <Fragment>
            {showEditor ? (
                <Dialog
                    title='公式编辑器'
                    anchor={true}
                    onClose={() => setShowEditor(false)}
                >
                    <Editor onClose={() => setShowEditor(false)}></Editor>
                </Dialog>
            ) : null}
            <VCard title='公式编辑'>
                <ItemList>
                    <ShowIcon
                        tips='显示公式'
                        style={style}
                        active={showFormula}
                        onClick={handleShowFormula}
                    >
                        <Label>显示公式</Label>
                    </ShowIcon>
                </ItemList>
                <ItemList>
                    <EditorIcon
                        tips='显示公式编辑器'
                        style={style}
                        onClick={() => setShowEditor(true)}
                    >
                        <Label>显示公式编辑器</Label>
                    </EditorIcon>
                </ItemList>
            </VCard>
        </Fragment>
    );
}
