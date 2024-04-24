import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import ColorEditor from '@components/color/Index';
import { Select } from '@components/form/Index';
import {
  GroupItem,
  ItemList,
} from '@components/group/Index';
import LineSepatator from '@components/lineSeparator/lineSeparator';
import Menu from '@components/menu/Menu.jsx';
import ArrowDown from '@icons/arrow/ArrowDown';
import BorderBottom from '@icons/border/BorderBottom';
import BackColor from '@icons/font/BackColor';
import Bold from '@icons/font/Bold';
import DoubleUnderline from '@icons/font/DoubleUnderline';
import FontSizeDown from '@icons/font/FontSizeDown';
import FontSizeUp from '@icons/font/FontSizeUp';
import ForeColor from '@icons/font/ForeColor';
import Italic from '@icons/font/Italic';
import Underline from '@icons/font/Underline';
import { getBorderEnums } from '@metadatas/border';
import {
  getFontFamilies,
  getFontSizes,
} from '@metadatas/font';
import {
  setIsOpenCellSetting,
  setTabValueCellSetting,
} from '@store/borderSlice/borderSlice';
import { fireCellEnter } from '@utils/eventUtil';
import {
  isDoubleUnderline,
  isUnderline,
  toDoubleUnderline,
  toUnderline,
} from '@utils/fontUtil.js';
import { exeCommand } from '@utils/spreadUtil';
import {
  decreasedFontSize,
  increasedFontSize,
} from '@utils/styleUtil';

import { Commands } from '../../../command';

const FontItem = styled.span`
    font-family: ${(props) => props.fontFamily};
    padding: 8px 10px;
`;

const toFontFamilyDatas = function () {
    const fontFamilies = getFontFamilies();
    return fontFamilies.map(({ value, text, title }) => {
        return {
            value,
            title,
            text: <FontItem fontFamily={value}>{text}</FontItem>,
        };
    });
};

export default function () {
    const dispatch = useDispatch();
    const {
        fontFamily,
        fontWeight,
        fontStyle,
        fontSize = 14,
        textDecoration,
        backColor,
        foreColor,
    } = useSelector(({ styleSlice }) => styleSlice);
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const exeStyleCommand = (style) => {
        exeCommand(spread, Commands.Style.Style, style);
    };

    const handleStyle = (style) => {
        exeStyleCommand(style);
        fireCellEnter(spread);
    };

    //设置字体
    const handleFontFamily = function (value) {
        handleStyle({ fontFamily: value });
    };

    //设置字体大小
    const handleFontSize = function (value) {
        handleStyle({ fontSize: value });
    };

    //增大字体大小
    const handleIncreaseFontSize = function () {
        const value = increasedFontSize(fontSize);
        value && handleFontSize(value);
    };

    //减小字体大小
    const handleDecreaseFontSize = function () {
        const value = decreasedFontSize(fontSize);
        value && handleFontSize(value);
    };

    //是否粗体
    const handleFontWeight = function () {
        handleStyle({
            fontWeight: fontWeight === 'normal' ? 'bold' : 'normal',
        });
    };

    //是否倾斜
    const handleFontItalic = function () {
        handleStyle({
            fontStyle: fontStyle === 'normal' ? 'italic' : 'normal',
        });
    };

    //是否设置下划线
    const handleUnderline = function () {
        handleStyle({
            textDecoration: isUnderline(textDecoration) ? 0 : toUnderline(),
        });
    };

    //是否设置双下划线
    const handleDoubleUnderline = function () {
        handleStyle({
            textDecoration: isDoubleUnderline(textDecoration)
                ? 0
                : toDoubleUnderline(),
        });
    };

    const handleBorder = function (type) {
        if (type === 'moreBorders') {
            dispatch(setTabValueCellSetting('边框'));
            dispatch(setIsOpenCellSetting(true));
            return;
        }
        exeCommand(spread,Commands.Style.Border,{type});
    };

    const handleBackColor = function (color) {
        handleStyle({ backColor: color });
    };

    const handleForeColor = function (color) {
        handleStyle({ foreColor: color });
    };
    const fontFamilies = toFontFamilyDatas();
    const fontSizes = getFontSizes();
    const borders = getBorderEnums();
    return (
        <GroupItem
            title='字体'
            onMore={() => {
                dispatch(setTabValueCellSetting('字体'));
                dispatch(setIsOpenCellSetting(true));
            }}
        >
            <ItemList>
                <Select
                    datas={fontFamilies}
                    style={{ width: '100px' }}
                    onChange={handleFontFamily}
                    value={fontFamily}
                ></Select>
                <Select
                    datas={fontSizes}
                    style={{ width: '50px', borderLeft: 'none' }}
                    optionStyle={{ width: '52px', fontSize: 12 }}
                    value={fontSize}
                    onChange={handleFontSize}
                ></Select>
                <FontSizeUp
                    tips='增大字号'
                    onClick={handleIncreaseFontSize}
                ></FontSizeUp>
                <FontSizeDown
                    tips='减小字号'
                    onClick={handleDecreaseFontSize}
                ></FontSizeDown>
            </ItemList>
            <ItemList>
                <Bold
                    tips='加粗'
                    active={fontWeight !== 'normal'}
                    onClick={handleFontWeight}
                ></Bold>
                <Italic
                    tips='倾斜'
                    active={fontStyle == 'italic'}
                    onClick={handleFontItalic}
                ></Italic>
                <Underline
                    tips='下划线'
                    active={isUnderline(textDecoration)}
                    onClick={handleUnderline}
                ></Underline>
                <DoubleUnderline
                    tips='双下划线'
                    active={isDoubleUnderline(textDecoration)}
                    onClick={handleDoubleUnderline}
                ></DoubleUnderline>
                <LineSepatator></LineSepatator>
                <BorderBottom
                    tips='边框'
                    onClick={() => {
                        handleBorder('bottomBorder');
                    }}
                ></BorderBottom>
                <Menu datas={borders} onNodeClick={handleBorder}>
                    <ArrowDown tips='边框'></ArrowDown>
                </Menu>
                <LineSepatator></LineSepatator>
                <ColorEditor onChange={handleBackColor} value={backColor}>
                    <BackColor tips='填充颜色'></BackColor>
                </ColorEditor>
                <ColorEditor
                    nonable={false}
                    onChange={handleForeColor}
                    value={foreColor}
                >
                    <ForeColor tips='字体颜色'></ForeColor>
                </ColorEditor>
            </ItemList>
        </GroupItem>
    );
}
