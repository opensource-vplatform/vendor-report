import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import ColorEditor from '@components/color/Index';
import { GroupItem, ItemList } from '@components/group/Index';
import LineSepatator from '@components/lineSeparator/lineSeparator';
import Menu from '@components/menu/Menu.jsx';
import Select from '@components/select/Index';
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
import { getFontFamilies, getFontSizes } from '@metadatas/font';
import {
    setIsOpenCellSetting,
    setTabValueCellSetting,
} from '@store/borderSlice/borderSlice';
import {
    setBackColor,
    setFontFamily,
    setFontSize,
    setFontStyle,
    setFontWeight,
    setForeColor,
    setTextDecoration,
} from '@store/fontSlice/fontSlice.js';
import {
    decreasedFontSize,
    increasedFontSize,
    isDoubleUnderline,
    isUnderline,
    setBorderByType,
    setFont,
    toDoubleUnderline,
    toUnderline,
} from '@utils/fontUtil.js';

export default function () {
    const dispatch = useDispatch();
    const {
        spread,
        fontFamily,
        fontWeight,
        fontStyle,
        fontSize = 14,
        textDecoration,
        backColor,
        foreColor,
    } = useSelector(({ fontSlice }) => fontSlice);

    //设置字体
    const handleFontFamily = function (value) {
        dispatch(setFontFamily({ fontFamily: value }));
    };

    //设置字体大小
    const handleFontSize = function (value) {
        dispatch(setFontSize({ fontSize: value }));
    };

    //增大字体大小
    const handleIncreaseFontSize = function () {
        const value = increasedFontSize(fontSize);
        value && dispatch(setFontSize({ fontSize: value }));
    };

    //减小字体大小
    const handleDecreaseFontSize = function () {
        const value = decreasedFontSize(fontSize);
        value && dispatch(setFontSize({ fontSize: value }));
    };

    //是否粗体
    const handleFontWeight = function () {
        dispatch(
            setFontWeight({
                fontWeight: fontWeight === 'normal' ? 'bold' : 'normal',
            })
        );
    };

    //是否倾斜
    const handleFontItalic = function () {
        dispatch(
            setFontStyle({
                fontStyle: fontStyle === 'normal' ? 'italic' : 'normal',
            })
        );
    };

    //是否设置下划线
    const handleUnderline = function () {
        dispatch(
            setTextDecoration({
                textDecoration: isUnderline(textDecoration) ? 0 : toUnderline(),
            })
        );
    };

    //是否设置双下划线
    const handleDoubleUnderline = function () {
        dispatch(
            setTextDecoration({
                textDecoration: isDoubleUnderline(textDecoration)
                    ? 0
                    : toDoubleUnderline(),
            })
        );
    };

    const handleBorder = function (type) {
        if (type === 'moreBorders') {
            dispatch(setTabValueCellSetting('边框'));
            dispatch(setIsOpenCellSetting(true));
            return;
        }
        setBorderByType(spread, type);
    };

    const handleBackColor = function (color) {
        dispatch(setBackColor({ backColor: color }));
    };

    const handleForeColor = function (color) {
        dispatch(setForeColor({ foreColor: color }));
    };
    const fontFamilies = getFontFamilies();
    const fontSizes = getFontSizes();
    const borders = getBorderEnums();
    useEffect(() => {
        setFont({
            spread,
            fontFamily,
            fontWeight,
            fontStyle,
            fontSize,
            textDecoration,
            backColor,
            foreColor,
        });
    }, [
        fontFamily,
        fontWeight,
        fontStyle,
        fontSize,
        textDecoration,
        backColor,
        foreColor,
    ]);
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
                    optionStyle={{ width: '52px' }}
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
                <Menu
                    datas={borders}
                    optionStyle={{ left: -24 }}
                    onNodeClick={handleBorder}
                >
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
