import { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  setActive,
  setAlignSetting,
  setCallbackId,
  setFontSetting,
  setSingleCell,
  setVisible,
} from '@store/cellSettingSlice';
import {
  OperationDialog,
  Tabs,
} from '@toone/report-ui';
import {
  getSetting,
  onCancel,
  onConfirm,
} from '@utils/cellSettingUtil';
import { WithTabItem } from '@utils/componentUtils';
import { parseStyle } from '@utils/styleUtil';

import Align from './tabs/Align';
import Border from './tabs/Border';
import Fill from './tabs/Fill';
import Font from './tabs/Font';
import Number from './tabs/Number';

const TabPanel = styled.div`
    background: #fff;
    width: 700px;
    height: 530px;
    border-bottom: 1px solid #d3d3d3;
    border-left: 1px solid #d3d3d3;
    border-right: 1px solid #d3d3d3;
    P {
        margin: 5px 0 0 5px;
        font-size: 12px;
    }
`;

const NumberTab = WithTabItem(Number, setActive);
const AlignTab = WithTabItem(Align, setActive);
const FontTab = WithTabItem(Font, setActive);
const BorderTab = WithTabItem(Border, setActive);
const FillTab = WithTabItem(Fill,setActive);

export default function () {
    const cellSettingSlice = useSelector(
        ({ cellSettingSlice }) => cellSettingSlice
    );
    const { callbackId, active, bindRange,hideCodes } = cellSettingSlice;
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const dispatch = useDispatch();
    useEffect(() => {
        if (bindRange) {
            const sheet = spread.getActiveSheet();
            const selections = sheet.getSelections();
            let spans = sheet.getSpans();
            spans = spans ? spans : [];
            let isSingleCell = true,
                isMergeCells = true;
            if (!spans || spans.length == 0) {
                //不存在合并
                isMergeCells = false;
                if (selections.length > 1) {
                    //选择多个，则不是单个选择情况
                    isSingleCell = false;
                } else {
                    const { rowCount, colCount } = selections[0];
                    //单个选择且选择区域只有一个单元格
                    isSingleCell = rowCount == 1 && colCount == 1;
                }
            } else {
                //存在单元格合并
                for (let index = 0; index < selections.length; index++) {
                    const selection = selections[index];
                    const span = spans.find((span) => span.equals(selection));
                    if (!span) {
                        //选择区域与合并区域存在不重叠地方
                        isSingleCell = false;
                        isMergeCells = false;
                        break;
                    }
                }
            }
            dispatch(setSingleCell(isSingleCell));
            const {
                fontStyle,
                fontVariant,
                fontWeight,
                fontSize,
                lineHeight,
                fontFamily,
                hAlign,
                vAlign,
                showEllipsis,
                shrinkToFit,
                backColor,
                foreColor = 'rgb(0,0,0)',
                wordWrap,
                textIndent,
                textOrientation,
                textDecoration,
                isVerticalText,
            } = parseStyle(sheet);
            dispatch(setAlignSetting({
                hAlign,
                vAlign,
                textIndent,
                wordWrap,
                showEllipsis,
                shrinkToFit,
                textOrientation,
                isMergeCells,
            }));
            dispatch(setFontSetting({
                fontFamily,
                fontWeight,
                fontStyle,
                fontSize,
                textDecoration,
                foreColor,
            }));
        }
    }, []);
    const handleConfirm = () => {
        const setting = getSetting(cellSettingSlice);
        dispatch(setCallbackId(null));
        dispatch(setVisible(false));
        //dispatch(reset());
        onConfirm(callbackId,setting);
    };
    const handleCancel = () => {
        dispatch(setCallbackId(null));
        dispatch(setVisible(false));
        //dispatch(reset());
        onCancel(callbackId);
    };
    return (
        <OperationDialog
            title='设置单元格格式'
            height='630px'
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        >
            <TabPanel>
                <Tabs
                    value={active}
                    onChange={(code) => dispatch(setActive(code))}
                    hideCodes={hideCodes}
                >
                    <NumberTab code='number' title='数字'></NumberTab>
                    <AlignTab code='align' title='对齐'></AlignTab>
                    <FontTab code='font' title='字体'></FontTab>
                    <BorderTab code='border' title='边框'></BorderTab>
                    <FillTab code='fill' title='填充'></FillTab>
                </Tabs>
            </TabPanel>
        </OperationDialog>
    );
}
