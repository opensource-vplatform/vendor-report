import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Button from '@components/button/Index';

import PreviewView from './PreviewView';
import { setMode } from './store/appSlice/appSlice';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
`;

const Toolbar = styled.div`
    border-bottom: solid 1px lightgray;
    background-color: white;
    margin: 0px;
    padding: 0px;
    display: flex;
    height: 35px;
    justify-content: flex-end;
    align-items: center;
`;

const ExcelWrap = styled.div`
    padding: 8px;
    width: 100%;
    height: 100%;
`;

export default function () {
    const dispatch = useDispatch();
    return (
        <Wrap>
            <Toolbar>
                <Button
                    style={{ marginRight: 8 }}
                    onClick={() => {
                        dispatch(setMode({ mode: 'edit' }));
                    }}
                >
                    编辑
                </Button>
            </Toolbar>
            <ExcelWrap>
                <PreviewView></PreviewView>
                {/*  <SpreadSheets tabEditable={false} newTabVisible={false} allowContextMenu={false}>
                    <Worksheet
                        name='本地预览'
                        autoGenerateColumns={false}
                        rowCount={20}
                        colCount={20}
                    ></Worksheet>
                </SpreadSheets> */}
            </ExcelWrap>
        </Wrap>
    );
}
