import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import { Commands } from '@commands/index';
import { VCard } from '@components/nav/Index';
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
  ColorEditor,
  Divider,
  ItemList,
  Menu,
  Select,
} from '@toone/report-ui';
import {
  isDoubleUnderline,
  isUnderline,
  toDoubleUnderline,
  toUnderline,
} from '@utils/fontUtil';
import { exeCommand } from '@utils/spreadUtil';
import {
  decreasedFontSize,
  genCellSettingVisibleHandler,
  handleStyle,
  increasedFontSize,
} from '@utils/styleUtil';

const FontItem = styled.span`
    font-family: ${(props) => props.fontFamily};
    overflow: hidden;
    white-space: nowrap;
    padding: 8px 10px;
`;

const toFontFamilyDatas = function () {
    const fontFamilies = getFontFamilies();
    return fontFamilies.map(({ value, text, title, fontSize = 12 }) => {
        return {
            value,
            title,
            text: (
                <FontItem fontFamily={value} style={{ fontSize }}>
                    {text}
                </FontItem>
            ),
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

    //设置字体
    const handleFontFamily = function (value) {
        handleStyle(spread, { fontFamily: value });
    };

    //设置字体大小
    const handleFontSize = function (value) {
        handleStyle(spread, { fontSize: value });
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
        handleStyle(spread, {
            fontWeight: fontWeight === 'normal' ? 'bold' : 'normal',
        });
    };

    //是否倾斜
    const handleFontItalic = function () {
        handleStyle(spread, {
            fontStyle: fontStyle === 'normal' ? 'italic' : 'normal',
        });
    };

    //是否设置下划线
    const handleUnderline = function () {
        handleStyle(spread, {
            textDecoration: isUnderline(textDecoration) ? 0 : toUnderline(),
        });
    };

    //是否设置双下划线
    const handleDoubleUnderline = function () {
        handleStyle(spread, {
            textDecoration: isDoubleUnderline(textDecoration)
                ? 0
                : toDoubleUnderline(),
        });
    };

    const handleBorder = function (type) {
        if (type === 'moreBorders') {
            genCellSettingVisibleHandler(spread, dispatch, 'border')();
            return;
        }
        exeCommand(spread, Commands.Style.Border, { type });
    };

    const handleBackColor = function (color) {
        handleStyle(spread, { backColor: color });
    };

    const handleForeColor = function (color) {
        handleStyle(spread, { foreColor: color });
    };
    const fontFamilies = toFontFamilyDatas();
    const fontSizes = getFontSizes();
    const borders = getBorderEnums();
    return (
        <VCard
            title='字体'
            onMore={genCellSettingVisibleHandler(spread, dispatch, 'font')}
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
                    style={{ width: '50px' }}
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
                <Divider></Divider>
                <BorderBottom
                    tips='边框'
                    onClick={() => {
                        handleBorder('bottomBorder');
                    }}
                ></BorderBottom>
                <Menu datas={borders} onNodeClick={handleBorder}>
                    <ArrowDown tips='边框'></ArrowDown>
                </Menu>
                <Divider></Divider>
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
        </VCard>
    );
}
