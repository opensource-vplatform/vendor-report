import { useState } from 'react';

import styled from 'styled-components';

import {
  Pane,
  Resizer,
  SplitPane,
} from '@components/splitpane/Index';

import Context from './Context';
import LeftPane from './panes/LeftPane';
import RightPane from './panes/RightPane';

const Wrap = styled.div`
    backgroundcolor: #fff;
    width: 900px;
    height: 500px;
    color: #515a6e;
    border-top: 1px solid #aaa;
`;

export default function () {
    const [data, setData] = useState(() => {
        return {
            formula: '',
            history: [],
            currentIndex: -1,
            selectionStart: 0,
            selectionEnd: 0,
        };
    });
    const canGoForward = () => {
        return (
            (data.currentIndex === -1 && data.history.length > 0) ||
            (data.currentIndex !== -1 &&
                data.currentIndex < data.history.length - 1)
        );
    };
    const canGoBack = () => {
        return data.currentIndex >= 0;
    };
    const set = (params) => {
        const temp = { ...data };
        if (data.formula !== params.formula) {
            temp.formula = params.formula;
            temp.history.push(params.formula);
            temp.currentIndex = temp.history.length - 1;
        }
        setData({...temp,...params});
    };
    const ctx = {
        data,
        canGoBack,
        canGoForward,
        setData,
        insert:(txt,offset=0)=>{
            const {formula,selectionStart,selectionEnd} = data;
            const newFormula = formula.substring(0,selectionStart)+txt+formula.substring(selectionEnd);
            const index = selectionStart+txt.length+offset;
            set({formula:newFormula,selectionStart:index,selectionEnd:index});
        },
        clear: () => {
            setData({ formula: '', history: [], currentIndex: -1 });
        },
        forward: () => {
            if (canGoForward()) {
                const newData = { ...data };
                newData.currentIndex += 1;
                newData.formula = newData.history[newData.currentIndex];
                setData(newData);
            }
        },
        back: () => {
            if (canGoBack()) {
                const newData = { ...data };
                newData.currentIndex -= 1;
                newData.expression =
                    newData.currentIndex == -1
                        ? ''
                        : newData.history[newData.currentIndex];
                setData(newData);
            }
        },
    };
    return (
        <Context.Provider value={ctx}>
            <Wrap>
                <SplitPane style={{ width: '100%', height: '100%' }}>
                    <Pane
                        style={{
                            width: 220,
                            borderRight: '1px solid #aaa',
                            height: '100%',
                        }}
                    >
                        <LeftPane></LeftPane>
                    </Pane>
                    <Resizer width={8}></Resizer>
                    <Pane style={{ width: '100%', flex: 1 }}>
                        <RightPane></RightPane>
                    </Pane>
                </SplitPane>
            </Wrap>
        </Context.Provider>
    );
}
