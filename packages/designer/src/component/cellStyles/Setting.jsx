import { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import { OperationDialog } from '@components/dialog/Index';
import { Tabs } from '@components/tabs/Index';
import {
  setActive,
  setAlignSetting,
  setCallbackId,
  setFontSetting,
  setSingleCell,
  setVisible,
} from '@store/cellSettingSlice';
import {
  getSetting,
  onCancel,
  onConfirm,
} from '@utils/cellSettingUtil';
import { WithTabItem } from '@utils/componentUtils';
import { parseFont } from '@utils/fontUtil';

import Align from './tabs/Align';
import Border from './tabs/Border';
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
            } = parseFont(sheet);
            const alignSetting = {
                hAlign,
                vAlign,
                textIndent,
                wordWrap,
                showEllipsis,
                shrinkToFit,
                textOrientation,
                isMergeCells,
            };
            dispatch(setAlignSetting(alignSetting));
            const fontSetting = {
                fontFamily,
                fontWeight,
                fontStyle,
                fontSize,
                textDecoration,
                foreColor,
            };
            dispatch(setFontSetting(fontSetting));
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
                </Tabs>
            </TabPanel>
        </OperationDialog>
    );
}
