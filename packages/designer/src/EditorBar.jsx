import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import FormulaIcon from '@icons/formula/Formula';
import CheckIcon from '@icons/shape/Check';
import CancelIcon from '@icons/shape/Close';

import Formula from './component/formula/Index';
import {
  Resizer,
  SplitPane,
} from './component/splitpane/Index';
import {
  bind,
  EVENTS,
  unbind,
} from './event/EventManager';
import { genUUID } from './utils/commonUtil';
import FormulaTextBox from './utils/FormulaTextBox';
import { getNamespace } from './utils/spreadUtil';

const Wrap = styled.div`
    display: flex;
    width: 100%;
    margin-top: 6px;
    margin-left: 4px;
    flex-shrink: 0;
`;

export default function () {
    const rangeBoxRef = useRef(null);
    const formulaBoxRef = useRef(null);
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [data, setData] = useState({
        cancelBtnDisabled: true,
        checkBtnDisabled: true,
        formulaBtnDisabled: false,
        formulaTextBox: null,
        nameRangeBox: null,
    });
    const [showEditor,setEditorVisible] = useState(false);
    const refreshBtnStatus = () => {
        const sheet = spread?.getActiveSheet();
        if (sheet) {
            const GC = getNamespace();
            const status = sheet.editorStatus();
            const isReady = status == GC.Spread.Sheets.EditorStatus.ready;
            const isEdit = status == GC.Spread.Sheets.EditorStatus.edit;
            setData({
                ...data,
                cancelBtnDisabled: isReady,
                checkBtnDisabled: isReady,
                formulaBtnDisabled: isEdit
                    ? data.formulaTextBox
                          ?.getCurrentEditingText()
                          .startsWith('=')
                        ? true
                        : false
                    : sheet.options.isProtected &&
                      sheet
                          .getCell(
                              sheet.getActiveRowIndex(),
                              sheet.getActiveColumnIndex()
                          )
                          .locked(),
            });
        }
    };
    useEffect(() => {
        const id = genUUID();
        bind({
            id,
            event: EVENTS.Inited,
            handler: (spread) => {
                if (rangeBoxRef.current) {
                    const GC = getNamespace();
                    data.nameRangeBox = new GC.Spread.Sheets.NameBox.NameBox(
                        rangeBoxRef.current,
                        spread
                    );
                }
                if (formulaBoxRef.current) {
                    data.formulaTextBox = new FormulaTextBox(
                        formulaBoxRef.current,
                        spread,
                        refreshBtnStatus
                    );
                }
            },
        });
        return () => {
            if (data.nameRangeBox != null) {
                data.nameRangeBox.dispose();
            }
            if (data.formulaTextBox != null) {
                data.formulaTextBox.destroy();
            }
            unbind({
                id,
                event: EVENTS.Inited,
            });
        };
    }, []);
    useEffect(() => {
        const id = genUUID();
        bind({
            id,
            event: EVENTS.EditorStatusChanged,
            handler: refreshBtnStatus,
        });
        return () => {
            unbind({
                id,
                event: EVENTS.EditorStatusChanged,
            });
        };
    }, [spread]);
    return (
        <Wrap>
            <SplitPane style={{ width: '100%', height: '100%', minHeight: 26 }}>
                <div
                    ref={rangeBoxRef}
                    style={{ minWidth: 150, height: 24, flexShrink: 0 }}
                ></div>
                <Resizer
                    collapsable={false}
                    minSize={150}
                    style={{ borderRight: 'unset', height: 26, marginLeft: 2 }}
                ></Resizer>
                <div
                    style={{
                        border: '1px solid #ababab',
                        boxSizing: 'border-box',
                        display: 'flex',
                        height: 'max-content',
                    }}
                >
                    <CancelIcon
                        disabled={data.cancelBtnDisabled}
                        iconStyle={{
                            color: data.cancelBtnDisabled ? '#333' : 'black',
                        }}
                        onClick={() => data.formulaTextBox.cancel()}
                    ></CancelIcon>
                    <CheckIcon
                        disabled={data.checkBtnDisabled}
                        onClick={() => data.formulaTextBox.commit()}
                    ></CheckIcon>
                    <FormulaIcon
                        disabled={data.formulaBtnDisabled}
                        onClick={() => setEditorVisible(true)}
                    ></FormulaIcon>
                </div>
                <div
                    contentEditable={true}
                    ref={formulaBoxRef}
                    style={{
                        marginLeft: 8,
                        marginRight: 8,
                        boxSizing: 'border-box',
                        border: '1px solid #ababab',
                        height: '100%',
                        width: '100%',
                        outline: 'none',
                        lineHeight: '22px',
                        fontSize: 12,
                        padding: 2,
                    }}
                ></div>
            </SplitPane>
            {showEditor ? (
                <Formula
                    onClose={() => setEditorVisible(false)}
                ></Formula>
            ) : null}
        </Wrap>
    );
}
