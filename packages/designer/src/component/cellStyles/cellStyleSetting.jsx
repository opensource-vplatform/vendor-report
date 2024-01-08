

import React, { useEffect, useState, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import ColorEditor from '@components/color/Index';
import Select from '@components/Select/Index';
import ArrowDown from '@icons/arrow/ArrowDown';
import BorderBottom from '@icons/border/BorderBottom';
import BorderInside from '@icons/border/BorderInside';
import BorderLeft from '@icons/border/BorderLeft';
import BorderNone from '@icons/border/BorderNone';
import BorderOutline from '@icons/border/BorderOutline';
import BorderRight from '@icons/border/BorderRight';
import BorderTop from '@icons/border/BorderTop';
import DiagonalDownLine from '@icons/border/DiagonalDownLine';
import DiagonalUpLine from '@icons/border/DiagonalUpLine';
import LineHorizontalInner from '@icons/border/LineHorizontalInner';
import LineVerticalInner from '@icons/border/LineVerticalInner';
import CanvasBorderArea from './canvasBorderArea';
import Button from '../button/Index';
import Index from '../dialog/Index';
import Integer from '../integer/Index';
import List from '../list/List';
import Tab from '../tabs/Tab';
import Tabs from '../tabs/Tabs';
import {
    AccountingSymbol,
    Categories,
    CurrencyNegativeNumbers,
    CustomFormats,
    DateFormats,
    DateFormatsChina,
    FormatNumber,
    FractionType,
    IconType,
    LocaleType,
    SpecialFormats,
    TimeFormats,
    TextAlignmentHorizontal,
    TextAlignmentVertical,
    FontStyle,
    UnderlineStyle,
} from './constant';
import Icon from './lineIcon';
import {
    setBorderByType,
    mergeCells,
    unMergeCell,
    setAlign,
    setIndentByCounter,
    toUnderline,
    toDoubleUnderline,
    toLineThrough,
    isUnderline,
    isDoubleUnderline,
    isLineThrough,
} from '@utils/fontUtil.js';
import {
    setBorderColor,
    setTabValueCellSetting,
    setIsOpenCellSetting,
} from '@store/borderSlice/borderSlice';
import {
    setHAlign,
    setTextOrientation,
    setVAlign,
    setWordWrap,
} from '@store/fontSlice/fontSlice.js';
import {
    setFontFamily,
    setFontSize,
    setFontStyle,
    setFontWeight,
    setForeColor,
    setTextDecoration,
    setIsStrickoutLine,
} from '@store/fontSlice/fontSlice.js';
import { setSelectedFontColor } from '@store/cellSettingSlice/fontCellSettingSlice';

import { setShowEllipsis, setShrinkToFit } from '@utils/borderUtil.js';

import { getFontFamilies, getFontSizes } from '@metadatas/font';

import styled from 'styled-components';

const TabPanel = styled.div`
    margin: 10px 13px;
    background: #fff;
    width: 700px;
    height: 530px;
    border-bottom: 1px solid #d3d3d3;
    border-left: 1px solid #d3d3d3;
    border-right: 1px solid #d3d3d3;
    P {
        margin: 5px 0 0 5px;
    }
`;
const CategoriesArea = styled.div`
float: left;
width: 150px;
height: 423px;
margin: 0px 5px 5px 5px;
`;

const SimpleArea = styled.div`
    float: left;
    width: 70%;
    height: 61px;
    margin: 0 5px;
    font-size: 11px;
    fieldset {
        padding: 0;
        height: 100%;
        border: 1px solid lightgray;
        label {
            height: 100%;
            display: flex;
            align-items: center;
            padding-left: 5px;
        }
    }
`;
const RightAreaOfNumberTab = styled.div`
    float: left;
    width: 510px;
    height: 220px;
    margin: 5px;
    span {
        font-size:14px;
    }
`;
const BottomAreaOfNumberTab =styled.div`
font-size:14px;
    float: left;
    width: 670px;
    height: 21px;
    margin: 2px;
    padding-left: 5px;
    padding-top: 10px;
`;
const DecimalPlaces = styled.div`
    width: 100%;
    height: 26px;
    margin-top: 10px;
    display: flex;
    align-items: center;
`;
const ThousandSeparator = styled.div`
    height: 25px;
    margin: 5px 0;
    display: flex;
    align-items: center;
`;
const BorderTabPanel = styled.div`
    margin: 10px;
    display: flex;
    width: 500px;
    height: 300px;
`;
const LineArea = styled.div`
    width: 150px;
    height: 300px;
    font-size: 12px;
    display: flex;
    span {
        border: none;
        display: block;
        height: 16px;
        margin: 5px;
    }
`;
const LineStyle = styled.div`
    display: flex;
    width: 130px;
    height: 150px;
    margin: 5px;
    border: none;
`;
const LineStyleLeft = styled.div`
margin: 2px;
width: 60px;
height: 112px;
border: none;
background: transparent;
`;

const LineStyleRight = styled.div`
margin: 2px;
width: 60px;
height: 112px;
background: transparent;

`;
const LineColor = styled.div`
width: 126px;
height: 24px;
margin: 5px;
display: flex;
border: 1px solid lightgray;
&:hover {
    border: 1px solid black;
}
`;
const ColorPreView = styled.div`
border: 4px solid #fff;
width: 100px;
height: 16px;
`;
const ArrowDownIcon = styled.div`
width: 20px;
height: 23px;
border-left: 1px solid lightgray;

`;

const PreArea = styled.div`
width: 350px;
height: 300px;
`;


const PresetAreaItem = styled.div`
width: 100px;
height: 68px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
const PreShowArea = styled.div`
height: 130px;
width: 310px;
display: flex;
`;
const PreShowAreaLeft = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
width: 50px;
height: 120px;
`;



const PreShowAreaRight = styled.div`
width: 250px;
height: 120px;
display: flex;
justify-content: center;
`;
const PreShowAreaBottom = styled.div`
width: 250px;
height: 35px;
position: relative;
`;


const BottomAreaofBorderTab = styled.div`
font-size: 14px;
padding-left: 12px;
width: 550px;
height: 35px;
position: relative;
`;
const PresetArea = styled.div`
width: 300px;
height: 68px;
display: flex;
`;

const AlignmentTabPanel = styled.div`
height: 245px;
width: 680px;
margin: 10px;
display: flex;
flex-direction: row;
`;
const LeftAlignment = styled.div`
width: 460px;
height: 90px;
display: flex;
flex-direction: column;
`;

const LeftAlignmentItems = styled.div`
display: flex;
flex-direction: row;
`;

const TextItemLeft = styled.div`
width: 260px;
height: 58px;
display: flex;
flex-direction: column;
`;
const TextItem = styled.div`
margin: 5px;
display: flex;
flex-direction: row;
width: 260px;
height: 24px;
span {
    margin-top: 3px;
    padding-left: 30px;
    width: 100px;
    height: 24px;
    font-size: 12px;
}
`;
const TextItemDIV = styled.div`
margin-top: 24px;
margin-left: 24px;
display: flex;
flex-direction: row;
width: 200px;
height: 58px;
pointer-events: ${(props) => (props.textHAlignValue === 4  ? 'none' : 'unset')};
opacity: ${(props) => (props.textHAlignValue === 4  ? 0.6 : 1)};
span {
    font-size:14px;
    margin-top: 2px;
}
`;
const TextItemRight = styled.div`
margin-top: 24px;
margin-left: 24px;
display: flex;
flex-direction: row;
width: 200px;
height: 58px;
span {
    margin-top: 2px;
}
`;
const DisabledIndent = styled.div`
margin-top: 24px;
margin-left: 24px;
display: flex;
flex-direction: row;
width: 200px;
height: 58px;
span {
    margin-top: 2px;
}
pointer-events: none; 
opacity: 0.6;
`;

const TextControl = styled.div`
width: 460px;
height: 120px;
`;

const ControlItem = styled.div`
width: 430px;
height: 20px;
margin: 10px 0 0 30px;

span {
    font-size: 12px;
    margin-left: 3px;
}
input {
    margin-top: 2px;
}
`;

const ControlledItem = styled.div`
width: 430px;
height: 20px;
margin: 10px 0 0 30px;
pointer-events: ${(props) => (props.isWrapText ? 'none' : 'unset')};
opacity: ${(props) => (props.isWrapText ? 0.6 : 1)};
span {
    font-size: 12px;
    margin-left: 3px;
}
input {
    margin-top: 2px;
}
`;
const Orientation = styled.div`
width: 140px;
height: 220px;
display: flex;
margin-left: 22px;
pointer-events: ${(props) => ( props.textHAlignValue === 4 ? 'none' : 'unset')};
opacity: ${(props) => ( props.textHAlignValue === 4 ? 0.6 : 1)};
`;

const OrientationTopItem = styled.div`
display: flex;
flex-direction: row;
width: 130px;
height: 150px;
`;
const OrientationText = styled.div`
height: 140px;
width: 30px;
border: 1px solid lightgray;
span {
    width: 10px;
    height: 100%;
    padding-left: 8px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
`;
const Pointer = styled.div`
height: 140px;
width: 90px;
margin-left: 10px;
border: 1px solid lightgrey;
`;

const PointsWrap = styled.div`
position: relative;
height: 140px;
width: 100px;
transform: translate(-50%, -50%);
display: flex;
justify-content: center;
align-items: center;
left: 10px;
top: 70px;
`;
const PointsBottom = styled.div`
display: flex;
flex-direction: row;
width: 150px;
height: 50px;
span {
    font-size: 14px;
    padding-top: 3px;
    padding-left: 16px;
}
`;
const FontTop = styled.div`
height: 210px;
width: 680px;
margin: 10px;
display: flex;
flex-direction: row;
`;
const FontList = styled.div`
height: 210px;
width: 330px;
font-size: 12px;
`;
const FontStyleSelect = styled.div`
font-size: 12px;
height: 210px;
width: 170px;
`;
const FontSizeSelect = styled.div`
font-size: 12px;
height: 210px;
width: 170px;
`;
const FontMiddle = styled.div`
display: flex;
flex-direction: row;
`;
const FontLeft = styled.div`
height: 150px;
width: 318px;
margin: 0 10px;
display: flex;
flex-direction: column;
span {
    display: block;
    height: 20px;
    font-size: 12px;
}
`;

const EffectItem = styled.div`
width: 318px;
height: 100px;
`;
const Strikethrough = styled.div`
display: flex;
flex-direction: row;
span {
    padding-left: 5px;
    padding-top: 2px;
}
`;
const FontRight = styled.div`
height: 150px;
width: 330px;
display: flex;
flex-direction: column;
`;

const FontColor = styled.div`
width: 330px;
height: 50px;
span {
    display: block;
    padding-left: 5px;
    width: 330px;
    height: 20px;
    font-size: 12px;
}
`;
const FontColorSelector = styled.div`
width: 325px;
height: 24px;
margin-left: 5px;
display: flex;
border: 1px solid lightgray;
&:hover {
    border: 1px solid black;
}
`;

const FontColorPreView = styled.div`
height: 150px;
border: 4px solid #fff;
width: 300px;
height: 16px;
`;
const TabBottomButtons = styled.div`
width: 100%;
height: 40px;
display: flex;
justify-content: flex-end;
Button {
    width: 80px;
    height: 30px;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
};
`;



function CellStyleSetting(props) {
    let firstCellValue = null;
    const dispatch = useDispatch();
    const [isMoreCell, setIsMoreCell] = useState(false);

    const [decimalPlacesValue, setDecimalPlacesValue] = useState(2);
    const [selectedValue, setSelectedCategoriesValue] = useState('general');
    const [selectedSymbol, setSelectedSymbol] = useState('');
    const [selectedTimeFormat, setSelectedTimeFormat] = useState('');
    const [exampleValue, setExampleValue] = useState(
        firstCellValue ? firstCellValue : '12345'
    );
    const [checkboxOfThousandSeparator, setCheckboxOfThousandSeparator] =
        useState(false);

    const [locale, setLocale] = useState('zh_cn');

    const [lineColor, setLineColor] = useState('black');
    const [borderTop, setBorderTop] = useState(false);
    const [borderLeft, setBorderLeft] = useState(false);
    const [borderRight, setBorderRight] = useState(false);
    const [borderBottom, setBorderBottom] = useState(false);
    const [diagonalUpLine, setDiagonalUpLine] = useState(false);
    const [diagonalDownLine, setDiagonalDownLine] = useState(false);
    const [lineHorizontalInner, setLineHorizontalInner] = useState(false);
    const [lineVerticalInner, setLineVerticalInner] = useState(false);
    const [lineType, setLineType] = useState(1);

    const [isWrapText, setIsWrapText] = useState(false);
    const [isShrinkToFit, setIsShrinkToFit] = useState(false);
    const [isMergeCells, setIsMergeCells] = useState(false);
    const [isShowEllipsis, setIsShowEllipsis] = useState(false);
    const [indentValue, setIndentValue] = useState(0);
    const [textHAlignValue, setTextHAlignValue] = useState(3);
    const [textVAlignValue, setTextVAlignValue] = useState(0);
    const directions = [
        -90, -75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75, 90,
    ];
    const [rotatable, setRotatable] = useState(false);
    const [startDeg, setStartDeg] = useState(0);

    // 字体面板
    const [selectedFontFamily, setSelectedFontFamily] = useState('微软雅黑');
    const [selectedFontSize, setSelectedFontSize] = useState(11);
    const [selectedFontStyle, setSelectedFontStyle] = useState('常规');
    const [selectedUnderlineStyle, setSelectedUnderlineStyle] = useState('无');
    const [fontColor, setFontColor] = useState('black');

    const fontFamilies = getFontFamilies();
    const fontSizes = getFontSizes();

    const fontStyles = useSelector(({ fontSlice }) => fontSlice);
    const borderStyle = useSelector(({ borderSlice }) => borderSlice);
    const fontCellSetting = useSelector(
        ({ fontCellSettingSlice }) => fontCellSettingSlice
    );
    const {
        spread,
        hAlign,
        vAlign,
        wordWrap,
        textOrientation,
        isVerticalText,
        fontFamily = '微软雅黑',
        fontWeight,
        fontStyle,
        fontSize = 11,
        textDecoration,
        foreColor = 'black',
        isStrickoutLine,
    } = fontStyles;

    const { color, tabValueCellSetting, isOpenCellSetting } = borderStyle;
    const { selectedFontColor } = fontCellSetting;
    const fontFamiliesToListData = function (metadatas) {
        const result = [];
        metadatas.forEach((metadata) => {
            result.push(metadata.value);
        });
        return result;
    };

    // 获取第一个选择区域的第一个单元格的值
    useEffect(() => {
        const activeSheet = spread?.getActiveSheet();
        const selections = activeSheet?.getSelections();

        if (selections?.length > 0) {
            const selection = selections[0];
            const startRow = selection.row;
            const startColumn = selection.col;
            firstCellValue = activeSheet.getValue(startRow, startColumn);
        }
    }, [spread]);

    let commandManager = spread?.commandManager();

    spread?.contextMenu.menuData.forEach(function (item, index) {
        if (item && item.name === 'formatCells') {
            spread?.contextMenu.menuData.splice(index, 1);
        }
    });
    // 设定菜单项
    let formatCells = {
        text: '设置单元格格式',
        name: 'formatCells',
        command: 'formatCells',
        workArea: 'viewport',
    };
    // 纳入菜单项中
    spread?.contextMenu.menuData.push(formatCells);
    // 单元格格式执行命令
    let formatCellsCommand = {
        canUndo: false,
        execute: function () {
            dispatch(setIsOpenCellSetting(!isOpenCellSetting));
            // 判断所取单元格是否多个
            const activeSheet = spread?.getActiveSheet();
            const selections = activeSheet?.getSelections();
            const { colCount, rowCount } = selections[0];
            if (colCount === 1 && rowCount === 1) {
                setIsMoreCell(false);
            } else {
                setIsMoreCell(true);
            }
        },
    };

    // 注入命令管理器
    commandManager?.register(
        'formatCells',
        formatCellsCommand,
        null,
        false,
        false,
        false,
        false
    );
    const handleTabChange = (tabValue) => {
        //
    };

    const handleSelectCategoriesChange = (value) => {
        const keys = Object.keys(Categories);
        const selectedOptionValue = keys.find((k) => Categories[k] === value);
        selectedOptionValue &&
            setSelectedCategoriesValue(selectedOptionValue.toString());
    };
    const handleNegativeNumbers = (value) => {
        setSelectedTimeFormat(value);
    };
    const handleSelectSymbolChange = (value) => {
        const selectedSymbolValue = value;
        setSelectedSymbol(selectedSymbolValue);
    };

    // 处理千位分隔符
    const handleCheckboxChange = (event) => {
        setCheckboxOfThousandSeparator(event.target.checked);
    };

    const handleTimeFormatChange = (value) => {
        setSelectedTimeFormat(value);
    };

    const handleLocaleType = (value) => {
        setLocale(value);
    };
    // 格式化千位分割符
    function formatThousandSeparator(number, isCheck) {
        let format = '#,##0';
        let tempValue;
        if (isCheck) {
            if (decimalPlacesValue === 0) {
                format = '#,##0';
            } else {
                format = `${format}.${'0'.repeat(decimalPlacesValue)}`;
            }
            tempValue = formatData(format);
            return tempValue;
        } else {
            return number;
        }
    }

    //格式化货币字符
    function formatCurrencySymbol(number, symbol) {
        if (!number) return number;
        let tempValue;
        let currencyFormat;
        if (decimalPlacesValue === 0) {
            currencyFormat = symbol;
        } else {
            currencyFormat = `${symbol}.${'0'.repeat(decimalPlacesValue)}`;
        }

        tempValue = formatData(currencyFormat);
        return tempValue;
    }

    // 格式化小数位数
    function formatNumberDecimal() {
        let format = '';
        let decimalPart = '';
        let tempValue;
        if (decimalPlacesValue > 0) {
            for (var i = 0; i < decimalPlacesValue; i++) {
                decimalPart += '0';
            }
            format = '0.' + decimalPart;
        } else {
            format = '0';
        }
        tempValue = formatData(format);
        return tempValue;
    }
    // 处理小数位数
    const handleDecimalValue = (decimalPlaces) => {
        setDecimalPlacesValue(decimalPlaces);
    };

    // 格式化接口
    function formatData(formatString) {
        // 获取所选的单元格
        let sheet = spread.getActiveSheet();
        sheet.suspendPaint();

        let selections = sheet.getSelections();

        var currentValue = sheet.getValue(selections[0].row, selections[0].col);
        sheet.setFormatter(selections[0].row, selections[0].col, formatString);
        sheet.setValue(selections[0].row, selections[0].col, currentValue);

        let selectionIndex = 0,
            selectionCount = selections.length;
        for (; selectionIndex < selectionCount; selectionIndex++) {
            let selection = selections[selectionIndex];
            for (
                let row = selection.row;
                row < selection.row + selection.rowCount;
                row++
            ) {
                for (
                    let col = selection.col;
                    col < selection.col + selection.colCount;
                    col++
                ) {
                    var currentValue = sheet.getValue(row, col);
                    sheet.setFormatter(row, col, formatString);
                    sheet.setValue(row, col, currentValue);
                }
            }
        }

        sheet.resumePaint();
        // 返回第一个格式过的数值作为示例值
        return sheet.getText(selections[0].row, selections[0].col);
    }

    // 计算TextDecoration数值
    function calculatesTheTextDecorationNumber() {
        let textDecorationNumber = 0;
        switch (selectedUnderlineStyle) {
            case '单下划线':
                textDecorationNumber += toUnderline();
                break;
            case '双下划线':
                textDecorationNumber += toDoubleUnderline();
                break;
            case '无':
                break;
            default:
                break;
        }
        if (isStrickoutLine) {
            textDecorationNumber += toLineThrough();
        }
        return textDecorationNumber;
    }

    // 解析TextDecoration数值
    function parseTextDecoration(textDecoration) {
        if (textDecoration == 1 || textDecoration - 2 == 1) {
            return '单下划线';
        } else if (textDecoration == 8 || textDecoration - 2 == 8) {
            return '双下划线';
        } else {
            return '无';
        }
    }

    // 转换字形选择框对应的key
    function transformFontToselectedFontStyleKey() {
        let selectFontKey = '';
        if (fontWeight === 'bold' && fontStyle === 'italic') {
            selectFontKey = fontWeight + fontStyle;
        } else if (fontWeight !== 'bold' && fontStyle !== 'italic') {
            selectFontKey = 'normal';
        } else if (fontWeight === 'bold') {
            selectFontKey = 'bold';
        } else if (fontStyle === 'italic') {
            selectFontKey = 'italic';
        }

        return FontStyle[selectFontKey];
    }

    const handleOK = () => {
        dispatch(setIsOpenCellSetting(false));
        dispatch(setTabValueCellSetting('数字'));

        setSelectedCategoriesValue('general');

        borderTop && setBorderByType(spread, 'topBorder', lineColor, lineType);
        borderBottom &&
            setBorderByType(spread, 'bottomBorder', lineColor, lineType);
        borderLeft &&
            setBorderByType(spread, 'leftBorder', lineColor, lineType);
        borderRight &&
            setBorderByType(spread, 'rightBorder', lineColor, lineType);
        lineHorizontalInner &&
            setBorderByType(spread, 'lineHorizontalInner', lineColor, lineType);
        lineVerticalInner &&
            setBorderByType(spread, 'lineVerticalInner', lineColor, lineType);
        diagonalDownLine &&
            setBorderByType(spread, 'diagonalDownLine', lineColor, lineType);
        diagonalUpLine &&
            setBorderByType(spread, 'diagonalUpLine', lineColor, lineType);

        dispatch(setWordWrap({ wordWrap: isWrapText }));

        if (isMergeCells) {
            mergeCells(spread);
        } else {
            unMergeCell(spread);
        }
        setShowEllipsis(spread, isShowEllipsis);

        !isWrapText && setShrinkToFit(spread, isShrinkToFit);

        textHAlignValue !== 4 && setIndentByCounter(spread, indentValue);

        textHAlignValue !== 4 &&
            dispatch(
                setTextOrientation({
                    textOrientation: startDeg,
                    isVerticalText: false,
                })
            );
        dispatch(setHAlign({ hAlign: textHAlignValue }));
        dispatch(setVAlign({ vAlign: textVAlignValue }));

        // 字体
        dispatch(setFontFamily({ fontFamily: selectedFontFamily }));
        dispatch(setForeColor({ foreColor: selectedFontColor }));
        dispatch(setFontSize({ fontSize: selectedFontSize }));

        dispatch(
            setFontWeight({
                fontWeight: selectedFontStyle.includes('bold')
                    ? 'bold'
                    : 'normal',
            })
        );
        dispatch(
            setFontStyle({
                fontStyle: selectedFontStyle.includes('italic')
                    ? 'italic'
                    : 'normal',
            })
        );
        dispatch(
            setTextDecoration({
                textDecoration: calculatesTheTextDecorationNumber(),
            })
        );

        // 初始化
        setBorderBottom(false);
        setBorderTop(false);
        setBorderLeft(false);
        setBorderRight(false);
        setLineHorizontalInner(false);
        setLineVerticalInner(false);
        setDiagonalDownLine(false);
        setDiagonalUpLine(false);
        setLineColor('black');
    };
    const handleCancel = () => {
        dispatch(setIsOpenCellSetting(false));
        dispatch(setTabValueCellSetting('数字'));
        setDecimalPlacesValue(2);
        setSelectedSymbol('');
        setSelectedTimeFormat('');

        // 还原单元格值 以及清空单元格式
        // sheet.setValue(selections[0].row, selections[0].col, firstCellValue);

        // 初始化
        setBorderBottom(false);
        setBorderTop(false);
        setBorderLeft(false);
        setBorderRight(false);
        setLineHorizontalInner(false);
        setLineVerticalInner(false);
        setDiagonalDownLine(false);
        setDiagonalUpLine(false);
        setLineColor('black');
    };
    const handleClose = () => {
        dispatch(setIsOpenCellSetting(false));
        dispatch(setTabValueCellSetting('数字'));
        setDecimalPlacesValue(2);
        setSelectedSymbol('');
        setSelectedTimeFormat('');

        // 初始化
        setBorderBottom(false);
        setBorderTop(false);
        setBorderLeft(false);
        setBorderRight(false);
        setLineHorizontalInner(false);
        setLineVerticalInner(false);
        setDiagonalDownLine(false);
        setDiagonalUpLine(false);
        setLineColor('black');
    };

    const handleColorEditorforBorder = (color) => {
        setLineColor(color);
        dispatch(setBorderColor({ color: color }));
    };

    const handlePreBorderNone = () => {
        setBorderBottom(false);
        setBorderTop(false);
        setBorderLeft(false);
        setBorderRight(false);
        setLineHorizontalInner(false);
        setLineVerticalInner(false);
        setDiagonalDownLine(false);
        setDiagonalUpLine(false);
    };
    const handlePreBorderInside = () => {
        if (!isMoreCell) {
            setLineHorizontalInner(false);
            setLineVerticalInner(false);
        } else {
            setLineHorizontalInner(true);
            setLineVerticalInner(true);
        }
    };
    const handleBorderOutline = () => {
        setBorderBottom(true);
        setBorderTop(true);
        setBorderLeft(true);
        setBorderRight(true);
    };

    // 自动换行
    const handleWrapText = (event) => {
        setIsWrapText(event.target.checked);
    };
    // 缩小填充
    const handleShrinkToFit = (event) => {
        setIsShrinkToFit(event.target.checked);
    };
    // 合并单元格
    const handleMergeCells = (event) => {
        setIsMergeCells(event.target.checked);
    };
    // 显示省略号
    const handleShowEllipsis = (event) => {
        setIsShowEllipsis(event.target.checked);
    };

    const handleSelectTextHAlign = (value) => {
        setTextHAlignValue(value);
    };
    const handleSelectTextVAlign = (value) => {
        setTextVAlignValue(value);
    };

    // 处理缩减位数
    const handleIndent = (value) => {
        setIndentValue(value);
    };
    // 处理旋转角度
    const handleDegChange = (value) => {
        setStartDeg(value);
    };

    const handleMouseDown = (e) => {
        setRotatable(true);
    };
    const handleMouseLeave = () => {
        setRotatable(false);
    };
    const handleMouseMove = (e) => {
        if (!rotatable) return;
        e.stopPropagation();
        // 计算旋转角度
        // 获取相对容器坐标 解决鼠标获取div变化导致指针横跳
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // 使用 Math.atan2 计算角度
        const deltaX = x - centerX;
        const deltaY = centerY - y;

        const radian = Math.atan2(deltaY, deltaX);
        let degree = radian * (180 / Math.PI);

        // 将角度限制在指定范围内
        if (degree < -90) {
            degree += 360; // 将负角度转换为正角度
        }

        // 设置最小和最大角度，可以根据实际需要进行调整
        const minDegree = 90;
        const maxDegree = -90;

        if (degree >= maxDegree && degree <= minDegree) {
            degree = Math.round(degree);
            setStartDeg(degree);
        }
    };
    const handlePointerClick = (e) => {
        e.stopPropagation();
        // 计算旋转角度
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // 使用 Math.atan2 计算角度
        const deltaX = x - centerX;
        const deltaY = centerY - y;

        const radian = Math.atan2(deltaY, deltaX);
        let degree = radian * (180 / Math.PI);

        // 将角度限制在指定范围内
        if (degree < -90) {
            degree += 360; // 将负角度转换为正角度
        }

        // 设置最小和最大角度，可以根据实际需要进行调整
        const minDegree = 90;
        const maxDegree = -90;

        if (degree >= maxDegree && degree <= minDegree) {
            degree = Math.round(degree);
            setStartDeg(degree);
        }
    };

    const handleMouseUp = () => {
        setRotatable(false);
    };

    // 字体面板
    const handleFontFamily = (value) => {
        setSelectedFontFamily(value);
    };
    const handleFontSize = (value) => {
        setSelectedFontSize(value);
    };
    const handleFontStyle = (value) => {
        const keys = Object.keys(FontStyle);
        const selectedOptionValue = keys.find((k) => FontStyle[k] === value);
        selectedOptionValue &&
            setSelectedFontStyle(selectedOptionValue.toString());
    };
    const handleUnderlineStyle = (value) => {
        setSelectedUnderlineStyle(value);
    };
    const handleColorEditorforFont = (color) => {
        dispatch(setSelectedFontColor({ selectedFontColor: color }));
    };
    const handleIsStrickout = (event) => {
        dispatch(setIsStrickoutLine({ isStrickoutLine: !isStrickoutLine }));
        // setIsStrickout(event.target.checked);
    };

    useEffect(() => {
        let tempValue = firstCellValue ? firstCellValue : '12345';
        if (selectedValue === 'numbers' || selectedValue === 'currency') {
            let formatString, decimals, currency, thousandsSep;
            currency = selectedSymbol;
            thousandsSep = checkboxOfThousandSeparator ? '#,##' : '';

            if (decimalPlacesValue > 0) {
                decimals = '0.' + '0'.repeat(decimalPlacesValue);
            } else {
                decimals = '0';
            }

            switch (selectedTimeFormat) {
                case 'number1':
                    formatString = `${currency}${thousandsSep}${decimals}_);-${currency}${thousandsSep}${decimals}`;
                    break;
                case 'rednumber2':
                    formatString = `${currency}${thousandsSep}${decimals};[Red]${currency}${thousandsSep}${decimals}`;
                    break;
                case 'number3':
                    formatString = `${currency}${thousandsSep}${decimals};(${currency}${thousandsSep}${decimals})`;
                    break;
                case 'rednumber4':
                    formatString = `${currency}${thousandsSep}${decimals};([Red]${currency}${thousandsSep}${decimals})`;
                    break;

                default:
                    formatString = `${currency}${thousandsSep}${decimals}`;
                    break;
            }
            tempValue = formatData(formatString);
        }

        // 处理小数
        if (
            selectedValue === 'accounting' ||
            selectedValue === 'percentage' ||
            selectedValue === 'scientific'
        ) {
            tempValue = formatNumberDecimal();
        }

        if (selectedValue === 'percentage') {
            let decimalPart = '';
            let format = '';
            if (decimalPlacesValue > 0) {
                for (var i = 0; i < decimalPlacesValue; i++) {
                    decimalPart += '0';
                }
                format = '0.' + decimalPart + '%';
            } else {
                format = '0%';
            }
            tempValue = formatData(format);
        }

        // 处理货币
        if (selectedValue === 'accounting') {
            tempValue = formatCurrencySymbol(tempValue, selectedSymbol);
        }

        // 处理时间格式;
        if (selectedValue === 'time') {
            tempValue = formatData(TimeFormats[selectedTimeFormat]);
        }
        // 处理日期格式;
        if (selectedValue === 'date') {
            tempValue = formatData(selectedTimeFormat);
        }
        // 处理日期格式;
        if (selectedValue === 'fractionType') {
            tempValue = formatData(selectedTimeFormat);
        }
        // 处理特殊格式;
        if (selectedValue === 'special') {
            tempValue = formatData(selectedTimeFormat);
        }

        // 处理自定义格式;
        if (selectedValue === 'custom') {
            tempValue = formatData(selectedTimeFormat);
        }

        // 处理自定义格式;
        if (selectedValue === 'scientific') {
            let decimalPart = '';
            let format = '';
            if (decimalPlacesValue > 0) {
                for (var i = 0; i < decimalPlacesValue; i++) {
                    decimalPart += '0';
                }
                format = '0.' + decimalPart + 'E+00';
            } else {
                format = '0E+00';
            }
            tempValue = formatData(format);
        }

        setExampleValue(tempValue);
    }, [
        decimalPlacesValue,
        checkboxOfThousandSeparator,
        selectedValue,
        selectedSymbol,
        selectedTimeFormat,
    ]);

    return isOpenCellSetting ? (
        <Index
            title='设置单元格格式'
            width='730px'
            height='630px'
            open={isOpenCellSetting}
            mask={true}
            onClose={handleClose}
        >
            <TabPanel>
                <Tabs value={tabValueCellSetting} onChange={handleTabChange}>
                    {/* 可以抽成组件 <numberFormat>*/}
                    <Tab code='数字' title='数字'>
                        <p>分类：</p>
                        <CategoriesArea>
                            <List
                                height='423px'
                                values={Object.values(Categories)}
                                selectedValue={Categories[
                                    selectedValue
                                ].toString()}
                                onChange={handleSelectCategoriesChange}
                            />
                        </CategoriesArea>
                        <SimpleArea>
                            <fieldset>
                                <legend>示例</legend>
                                <label>
                                    {selectedValue === 'general'
                                        ? 12345
                                        : exampleValue}
                                </label>
                            </fieldset>
                        </SimpleArea>
                        <RightAreaOfNumberTab>
                            {(selectedValue === 'numbers' ||
                                selectedValue === 'currency' ||
                                selectedValue === 'accounting' ||
                                selectedValue === 'scientific' ||
                                selectedValue === 'percentage') && (
                                <DecimalPlaces>
                                    <span>小数位数：</span>
                                    <Integer
                                        value={decimalPlacesValue}
                                        style={{ width: '50%', height: 23 }}
                                        max={255}
                                        min={0}
                                        onChange={(decimalPlacesValue) =>
                                            handleDecimalValue(
                                                decimalPlacesValue
                                            )
                                        }
                                    />
                                </DecimalPlaces>
                            )}

                            {selectedValue === 'numbers' && (
                                <ThousandSeparator>
                                    <input
                                        type='checkbox'
                                        checked={checkboxOfThousandSeparator}
                                        onChange={handleCheckboxChange}
                                    ></input>
                                    <span>使用千位分隔符(,)</span>
                                </ThousandSeparator>
                            )}
                            {(selectedValue === 'currency' ||
                                selectedValue === 'accounting') && (
                                <DecimalPlaces>
                                    <span>货币符号： </span>
                                    <Select
                                        datas={AccountingSymbol}
                                        style={{
                                            width: '253px',
                                            height: '25px',
                                        }}
                                        optionStyle={{
                                            width: '99%',
                                        }}
                                        onChange={handleSelectSymbolChange}
                                        value={selectedSymbol}
                                    />
                                </DecimalPlaces>
                            )}
                            {(selectedValue === 'numbers' ||
                                selectedValue === 'currency') && (
                                <div>
                                    <span>负数：</span>
                                    <List
                                        width='480px'
                                        height='130px'
                                        objDatas={CurrencyNegativeNumbers}
                                        selectedValue={selectedTimeFormat}
                                        onChange={handleNegativeNumbers}
                                    />
                                </div>
                            )}

                            {(selectedValue === 'date' ||
                                selectedValue === 'time' ||
                                selectedValue === 'fractionType' ||
                                selectedValue === 'special' ||
                                selectedValue === 'custom') && (
                                <div>
                                    <span>类型：</span>

                                    {selectedValue === 'time' && (
                                        <List
                                            width='480px'
                                            height='130px'
                                            values={Object.keys(TimeFormats)}
                                            selectedValue={[selectedTimeFormat]}
                                            onChange={handleTimeFormatChange}
                                        />
                                    )}
                                    {selectedValue === 'date' && (
                                        <List
                                            width='480px'
                                            height='130px'
                                            values={
                                                locale === 'en_us'
                                                    ? Object.values(DateFormats)
                                                    : Object.values(
                                                          DateFormatsChina
                                                      )
                                            }
                                            selectedValue={selectedTimeFormat}
                                            onChange={handleTimeFormatChange}
                                        />
                                    )}
                                    {selectedValue === 'fractionType' && (
                                        <List
                                            width='480px'
                                            height='130px'
                                            values={Object.values(FractionType)}
                                            selectedValue={selectedTimeFormat}
                                            onChange={handleTimeFormatChange}
                                        />
                                    )}

                                    {selectedValue === 'special' && (
                                        <List
                                            width='480px'
                                            height='120px'
                                            values={Object.values(
                                                SpecialFormats
                                            )}
                                            selectedValue={selectedTimeFormat}
                                            onChange={handleTimeFormatChange}
                                        />
                                    )}
                                    {selectedValue === 'custom' && (
                                        <List
                                            width='480px'
                                            height='130px'
                                            values={Object.values(
                                                CustomFormats
                                            )}
                                            isHasInput={true}
                                            selectedValue={selectedTimeFormat}
                                            onChange={handleTimeFormatChange}
                                        />
                                    )}
                                </div>
                            )}
                            {(selectedValue === 'date' ||
                                selectedValue === 'time' ||
                                selectedValue === 'special') && (
                                <div>
                                    <span>区域设置（国家/地区）:</span>
                                    <Select
                                        datas={LocaleType}
                                        style={{
                                            width: '50%',
                                            height: '25px',
                                            margin: '5px 0px',
                                        }}
                                        optionStyle={{
                                            width: '50%',
                                        }}
                                        onChange={handleLocaleType}
                                        value={locale}
                                    />
                                </div>
                            )}
                        </RightAreaOfNumberTab>
                        <BottomAreaOfNumberTab>
                            <span>
                                {FormatNumber[selectedValue].toString()}
                            </span>
                        </BottomAreaOfNumberTab>
                    </Tab>
                    <Tab code='对齐' title='对齐'>
                        <AlignmentTabPanel>
                            <LeftAlignment>
                               
                                    <fieldset
                                        style={{
                                            borderTop: '1px solid lightgray',
                                            borderLeft: 0,
                                            borderRight: 0,
                                            borderBottom: 0,
                                            fontSize: '12px',
                                        }}
                                    >
                                        <legend>文本对齐方式</legend>
                                    </fieldset>
                                    <LeftAlignmentItems>
                                        <TextItemLeft>
                                            <TextItem>
                                                <span> 水平对齐: </span>
                                                <Select
                                                    datas={
                                                        TextAlignmentHorizontal
                                                    }
                                                    style={{
                                                        width: '160px',
                                                        height: '24px',
                                                    }}
                                                    optionStyle={{
                                                        width: '99%',
                                                    }}
                                                    onChange={
                                                        handleSelectTextHAlign
                                                    }
                                                    value={hAlign}
                                                />
                                            </TextItem>
                                            <TextItem>
                                                <span> 垂直对齐: </span>
                                                <Select
                                                    datas={
                                                        TextAlignmentVertical
                                                    }
                                                    style={{
                                                        width: '160px',
                                                        height: '24px',
                                                    }}
                                                    optionStyle={{
                                                        width: '99%',
                                                    }}
                                                    onChange={
                                                        handleSelectTextVAlign
                                                    }
                                                    value={vAlign}
                                                />
                                            </TextItem>
                                        </TextItemLeft>
                                        <TextItemDIV
                                         textHAlignValue={textHAlignValue}
                                        >
                                            <span> 缩减：</span>
                                            <Integer
                                                style={{
                                                    width: '120px',
                                                    height: '24px',
                                                }}
                                                max={255}
                                                min={0}
                                                value={indentValue}
                                                onChange={(indentValue) =>
                                                    handleIndent(indentValue)
                                                }
                                            ></Integer>
                                        </TextItemDIV>
                                    </LeftAlignmentItems>
                              
                                <TextControl>
                                    <fieldset
                                        style={{
                                            borderTop: '1px solid lightgray',
                                            borderLeft: 0,
                                            borderRight: 0,
                                            borderBottom: 0,
                                            fontSize: '12px',
                                        }}
                                    >
                                        <legend>文本控制</legend>
                                    </fieldset>
                                    <ControlItem>
                                        <input
                                            type='checkbox'
                                            checked={isWrapText}
                                            onChange={handleWrapText}
                                        ></input>
                                        <span>自动换行</span>
                                    </ControlItem>
                                    <ControlledItem
                                        isWrapText={isWrapText}
                                        style={{
                                            pointerEvents: isWrapText
                                                ? 'none'
                                                : 'unset',
                                            opacity: isWrapText ? 0.6 : 1,
                                        }}
                                    >
                                        <input
                                            type='checkbox'
                                            checked={isShrinkToFit}
                                            onChange={handleShrinkToFit}
                                        ></input>
                                        <span>缩小字体填充</span>
                                    </ControlledItem>
                                    <ControlItem>
                                        <input
                                            type='checkbox'
                                            checked={isMergeCells}
                                            onChange={handleMergeCells}
                                        ></input>
                                        <span>合并单元格</span>
                                    </ControlItem>
                                    <ControlItem>
                                        <input
                                            type='checkbox'
                                            checked={isShowEllipsis}
                                            onChange={handleShowEllipsis}
                                        ></input>
                                        <span>显示省略号</span>
                                    </ControlItem>
                                </TextControl>
                            </LeftAlignment>
                            <Orientation
                            textHAlignValue={textHAlignValue} 
                            >
                                <fieldset
                                    style={{
                                        border: '1px solid lightgray',
                                        fontSize: '12px',
                                        width: 160,
                                    }}
                                >
                                    <legend>方向</legend>
                                    <OrientationTopItem>
                                        <OrientationText>
                                            <span>文本</span>
                                        </OrientationText>
                                        <Pointer>
                                            <PointsWrap
                                                onMouseDown={handleMouseDown}
                                                onMouseUp={handleMouseUp}
                                                onMouseMove={handleMouseMove}
                                                onClick={handlePointerClick}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <div
                                                    draggable={false}
                                                    style={{
                                                        fontSize: '12px',
                                                        marginLeft: '45px',
                                                        marginBottom: '3px',
                                                        userSelect: 'none',
                                                        transform: `rotate(${-startDeg}deg)`,
                                                        transformOrigin:
                                                            'left center',
                                                    }}
                                                >
                                                    文本——
                                                </div>
                                                {directions.map((deg) => (
                                                    <div
                                                        key={deg}
                                                        style={{
                                                            width: '5px',
                                                            height:' 5px',
                                                            background: 'black',
                                                            position: 'absolute',
                                                            transform: `rotate(${deg}deg)translateX(${
                                                                130 / 2
                                                            }px)`,
                                                            background:
                                                                startDeg ===
                                                                -deg
                                                                    ? 'red'
                                                                    : 'black',
                                                        }}
                                                    ></div>
                                                ))}
                                            </PointsWrap>
                                        </Pointer>
                                    </OrientationTopItem>
                                    <PointsBottom>
                                        <Integer
                                            style={{
                                                width: '80px',
                                                height: '20px',
                                            }}
                                            max={90}
                                            min={-90}
                                            value={startDeg}
                                            onChange={handleDegChange}
                                        ></Integer>
                                        <span>度</span>
                                    </PointsBottom>
                                </fieldset>
                            </Orientation>
                        </AlignmentTabPanel>
                    </Tab>
                    <Tab code='字体' title='字体'>
                        <FontTop>
                            <FontList>
                                <span>字体:</span>
                                <List
                                    width='320px'
                                    height='150px'
                                    isHasInput={true}
                                    values={fontFamiliesToListData(
                                        fontFamilies
                                    )}
                                    selectedValue={fontFamily}
                                    onChange={handleFontFamily}
                                />
                            </FontList>
                            <FontStyleSelect>
                                <span>字形:</span>
                                <List
                                    width='160px'
                                    height='150px'
                                    isHasInput={true}
                                    values={Object.values(FontStyle)}
                                    selectedValue={transformFontToselectedFontStyleKey()}
                                    onChange={handleFontStyle}
                                />
                            </FontStyleSelect>
                            <FontSizeSelect>
                                <span>字号:</span>
                                <List
                                    width='160px'
                                    height='150px'
                                    isHasInput={true}
                                    values={fontFamiliesToListData(fontSizes)}
                                    selectedValue={fontSize}
                                    onChange={handleFontSize}
                                />
                            </FontSizeSelect>
                        </FontTop>
                        <FontMiddle>
                            <FontLeft>
                                <div>
                                    <span>下划线:</span>
                                    <Select
                                        datas={UnderlineStyle}
                                        style={{
                                            height: '25px',
                                            width: ' 318px',
                                        }}
                                        optionStyle={{
                                            width: '100%',
                                        }}
                                        onChange={handleUnderlineStyle}
                                        value={parseTextDecoration(
                                            textDecoration
                                        )}
                                    ></Select>
                                </div>
                                <EffectItem>
                                    <fieldset
                                        style={{
                                            border: '1px solid lightgray',
                                            fontSize: '12px',
                                            width: 318,
                                            height: 100,
                                            padding: 0,
                                            marginTop: 5,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <legend>特殊效果</legend>
                                        <Strikethrough>
                                            <input
                                                type='checkbox'
                                                checked={isStrickoutLine}
                                                onChange={handleIsStrickout}
                                            ></input>
                                            <span>删除线</span>
                                        </Strikethrough>
                                    </fieldset>
                                </EffectItem>
                            </FontLeft>

                            <FontRight>
                                <FontColor>
                                    <span>颜色:</span>
                                    <ColorEditor
                                        style={{ width: '188px' }}
                                        onChange={handleColorEditorforFont}
                                        value={selectedFontColor}
                                    >
                                        <FontColorSelector>
                                            <FontColorPreView
                                                style={{
                                                    backgroundColor:
                                                        selectedFontColor,
                                                }}
                                            ></FontColorPreView>
                                            <ArrowDownIcon>
                                                <ArrowDown
                                                    style={{
                                                        width: 20,
                                                        height: 23,
                                                        margin: 0,
                                                    }}
                                                ></ArrowDown>
                                            </ArrowDownIcon>
                                        </FontColorSelector>
                                    </ColorEditor>
                                </FontColor>
                                <div>
                                    <fieldset
                                        style={{
                                            border: '1px solid lightgray',
                                            fontSize: '12px',
                                            height: 100,
                                            padding: 0,
                                            marginTop: 6,
                                            marginLeft:5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <legend>预览</legend>
                                        <div
                                            style={{
                                                fontFamily: selectedFontFamily,
                                                fontWeight:
                                                    selectedFontStyle.includes(
                                                        'bold'
                                                    )
                                                        ? 'bold'
                                                        : 'normal',
                                                fontSize:
                                                    selectedFontSize + 'pt',
                                                color: selectedFontColor,
                                                fontStyle:
                                                    selectedFontStyle.includes(
                                                        'italic'
                                                    )
                                                        ? 'italic'
                                                        : 'normal',
                                                textDecorationLine: `${
                                                    isStrickoutLine
                                                        ? 'line-through'
                                                        : ''
                                                } ${
                                                    selectedUnderlineStyle ===
                                                    '单下划线'
                                                        ? 'underline'
                                                        : ''
                                                }`,
                                                borderBottom:
                                                    selectedUnderlineStyle ===
                                                    '双下划线'
                                                        ? `3px double ${selectedFontColor}`
                                                        : 'unset',
                                            }}
                                        >
                                            AaBbCcYyZz
                                        </div>
                                    </fieldset>
                                </div>
                            </FontRight>
                        </FontMiddle>
                    </Tab>
                    <Tab code='边框' title='边框'>
                        <BorderTabPanel>
                            <LineArea>
                                <fieldset
                                    style={{
                                        border: '1px solid lightgray',
                                        padding: 0,
                                    }}
                                >
                                    <legend>线条</legend>
                                    <span>样式：</span>

                                    <LineStyle>
                                        <LineStyleLeft>
                                            <div
                                                style={{ textAlign: 'center' }}
                                                onClick={() =>
                                                    setLineType(IconType.None)
                                                }
                                            >
                                                <Icon
                                                    lineType={lineType}
                                                    type={IconType.None}
                                                    color={lineColor}
                                                />
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setLineType(IconType.Hair);
                                                }}
                                            >
                                                <Icon
                                                    lineType={lineType}
                                                    type={IconType.Hair}
                                                    color={lineColor}
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setLineType(IconType.Dotted)
                                                }
                                            >
                                                <Icon
                                                    lineType={lineType}
                                                    type={IconType.Dotted}
                                                    color={lineColor}
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setLineType(
                                                        IconType.DashDotDot
                                                    )
                                                }
                                            >
                                                <Icon
                                                    lineType={lineType}
                                                    type={IconType.DashDotDot}
                                                    color={lineColor}
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setLineType(
                                                        IconType.DashDot
                                                    )
                                                }
                                            >
                                                <Icon
                                                    lineType={lineType}
                                                    type={IconType.DashDot}
                                                    color={lineColor}
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setLineType(IconType.Dashed)
                                                }
                                            >
                                                <Icon
                                                    lineType={lineType}
                                                    type={IconType.Dashed}
                                                    color={lineColor}
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setLineType(IconType.Thin)
                                                }
                                            >
                                                <Icon
                                                    lineType={lineType}
                                                    type={IconType.Thin}
                                                    color={lineColor}
                                                />
                                            </div>
                                        </LineStyleLeft>
                                        <LineStyleRight>
                                            <div
                                                onClick={() =>
                                                    setLineType(
                                                        IconType.MediumDashDotDot
                                                    )
                                                }
                                            >
                                                <Icon
                                                    lineType={lineType}
                                                    type={
                                                        IconType.MediumDashDotDot
                                                    }
                                                    color={lineColor}
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setLineType(
                                                        IconType.SlantedDashDot
                                                    )
                                                }
                                            >
                                                <Icon
                                                    lineType={lineType}
                                                    type={
                                                        IconType.SlantedDashDot
                                                    }
                                                    color={lineColor}
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setLineType(
                                                        IconType.MediumDashDot
                                                    )
                                                }
                                            >
                                                <Icon
                                                    lineType={lineType}
                                                    type={
                                                        IconType.MediumDashDot
                                                    }
                                                    color={lineColor}
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setLineType(
                                                        IconType.MediumDashed
                                                    )
                                                }
                                            >
                                                <Icon
                                                    lineType={lineType}
                                                    type={IconType.MediumDashed}
                                                    color={lineColor}
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setLineType(IconType.Medium)
                                                }
                                            >
                                                <Icon
                                                    lineType={lineType}
                                                    type={IconType.Medium}
                                                    color={lineColor}
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setLineType(IconType.Thick)
                                                }
                                            >
                                                <Icon
                                                    lineType={lineType}
                                                    type={IconType.Thick}
                                                    color={lineColor}
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setLineType(IconType.Double)
                                                }
                                            >
                                                <Icon
                                                    lineType={lineType}
                                                    type={IconType.Double}
                                                    color={lineColor}
                                                />
                                            </div>
                                        </LineStyleRight>
                                    </LineStyle>
                                    <span>颜色：</span>
                                    <div>
                                        <ColorEditor
                                            style={{ width: '188px' }}
                                            onChange={
                                                handleColorEditorforBorder
                                            }
                                            value={lineColor}
                                        >
                                            <LineColor>
                                                <ColorPreView
                                                    style={{
                                                        backgroundColor:
                                                            lineColor,
                                                    }}
                                                ></ColorPreView>
                                                <ArrowDownIcon>
                                                    <ArrowDown
                                                        style={{
                                                            width: 20,
                                                            height: 23,
                                                            margin: 0,
                                                        }}
                                                    ></ArrowDown>
                                                </ArrowDownIcon>
                                            </LineColor>
                                        </ColorEditor>
                                    </div>
                                </fieldset>
                            </LineArea>
                            <PreArea>
                                <fieldset
                                    style={{
                                        borderTop: '1px solid lightgray',
                                        borderLeft: 0,
                                        borderRight: 0,
                                        borderBottom: 0,
                                        fontSize: '12px',
                                    }}
                                >
                                    <legend>预置</legend>
                                </fieldset>
                                <PresetArea>
                                    <PresetAreaItem>
                                        <BorderNone
                                            onClick={handlePreBorderNone}
                                            iconStyle={{
                                                width: '35px',
                                                height: '35px',
                                                backgroundColor: 'lightgray',
                                            }}
                                            icon='url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU2LjIgKDgxNjcyKSAtIGh0dHBzOi8vc2tldGNoLmNvbSAtLT4KICAgIDx0aXRsZT5Ob25lPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9Ik5vbmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLnvJbnu4QtMTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuMDAwMDAwLCAzLjAwMDAwMCkiPgogICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiBmaWxsPSIjRkZGRkZGIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjciIGhlaWdodD0iMjciPjwvcmVjdD4KICAgICAgICAgICAgPHBhdGggZD0iTTI3LDI2IEwyNywyNyBMMjQsMjcgTDI0LDI2IEwyNiwyNiBMMjYsMjQgTDI3LDI0IEwyNywyNiBaIE0yNiwxIEwyNCwxIEwyNCwwIEwyNiwwIEwyNyw5LjE4NDg1MDk5ZS0xNyBMMjcsMyBMMjYsMyBMMjYsMSBaIE0xLDEzIEwzLDEzIEwzLDE0IEwxLDE0IEwxLDE1IEwtMS4xMzkwODg4MmUtMTMsMTUgTC0xLjEzNDY0NzkzZS0xMywxMiBMMSwxMiBMMSwxMyBaIE0xMywyNiBMMTMsMjQgTDE0LDI0IEwxNCwyNiBMMTUsMjYgTDE1LDI3IEwxMiwyNyBMMTIsMjYgTDEzLDI2IFogTS0xLjEzOTA4ODgyZS0xMywyNiBMLTEuMTM0NjQ3OTNlLTEzLDI0IEwxLDI0IEwxLDI2IEwzLDI2IEwzLDI3IEwtMS4xMzY4NjgzOGUtMTMsMjcgTC0xLjEzNjg2ODM4ZS0xMywyNiBaIE0xNCwxMyBMMTUsMTMgTDE1LDE0IEwxNCwxNCBMMTQsMTUgTDEzLDE1IEwxMywxNCBMMTIsMTQgTDEyLDEzIEwxMywxMyBMMTMsMTIgTDE0LDEyIEwxNCwxMyBaIE0yNiwxNCBMMjQsMTQgTDI0LDEzIEwyNiwxMyBMMjYsMTIgTDI3LDEyIEwyNywxNSBMMjYsMTUgTDI2LDE0IFogTTE0LDEgTDE0LDMgTDEzLDMgTDEzLDEgTDEyLDEgTDEyLDAgTDE1LDAgTDE1LDEgTDE0LDEgWiBNMSwxIEwxLDMgTC0xLjEzOTA4ODgyZS0xMywzIEwtMS4xMzYxMjgyM2UtMTMsMSBMLTEuMTM2ODY4MzhlLTEzLDAgTDMsMCBMMywxIEwxLDEgWiBNNCwwIEw3LDAgTDcsMSBMNCwxIEw0LDAgWiBNNCwyNiBMNywyNiBMNywyNyBMNCwyNyBMNCwyNiBaIE04LDAgTDExLDAgTDExLDEgTDgsMSBMOCwwIFogTTgsMjYgTDExLDI2IEwxMSwyNyBMOCwyNyBMOCwyNiBaIE0xNiwwIEwxOSwwIEwxOSwxIEwxNiwxIEwxNiwwIFogTTE2LDI2IEwxOSwyNiBMMTksMjcgTDE2LDI3IEwxNiwyNiBaIE0yMCwwIEwyMywwIEwyMywxIEwyMCwxIEwyMCwwIFogTTIwLDI2IEwyMywyNiBMMjMsMjcgTDIwLDI3IEwyMCwyNiBaIE0yNyw0IEwyNyw3IEwyNiw3IEwyNiw0IEwyNyw0IFogTTEsNCBMMSw3IEwtMS4xMzkwODg4MmUtMTMsNyBMLTEuMTM0NjQ3OTNlLTEzLDQgTDEsNCBaIE0xNCw0IEwxNCw3IEwxMyw3IEwxMyw0IEwxNCw0IFogTTIzLDE0IEwyMCwxNCBMMjAsMTMgTDIzLDEzIEwyMywxNCBaIE0yNyw4IEwyNywxMSBMMjYsMTEgTDI2LDggTDI3LDggWiBNMSw4IEwxLDExIEwtMS4xMzkwODg4MmUtMTMsMTEgTC0xLjEzNDY0NzkzZS0xMyw4IEwxLDggWiBNMTQsOCBMMTQsMTEgTDEzLDExIEwxMyw4IEwxNCw4IFogTTE5LDE0IEwxNiwxNCBMMTYsMTMgTDE5LDEzIEwxOSwxNCBaIE0yNywxNiBMMjcsMTkgTDI2LDE5IEwyNiwxNiBMMjcsMTYgWiBNMSwxNiBMMSwxOSBMLTEuMTM5MDg4ODJlLTEzLDE5IEwtMS4xMzQ2NDc5M2UtMTMsMTYgTDEsMTYgWiBNMTQsMTYgTDE0LDE5IEwxMywxOSBMMTMsMTYgTDE0LDE2IFogTTExLDE0IEw4LDE0IEw4LDEzIEwxMSwxMyBMMTEsMTQgWiBNMjcsMjAgTDI3LDIzIEwyNiwyMyBMMjYsMjAgTDI3LDIwIFogTTEsMjAgTDEsMjMgTC0xLjEzOTA4ODgyZS0xMywyMyBMLTEuMTM0NjQ3OTNlLTEzLDIwIEwxLDIwIFogTTE0LDIwIEwxNCwyMyBMMTMsMjMgTDEzLDIwIEwxNCwyMCBaIE03LDE0IEw0LDE0IEw0LDEzIEw3LDEzIEw3LDE0IFoiIGlkPSLlvaLnirbnu5PlkIgiIGZpbGw9IiNBOEE4QTgiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)'
                                        ></BorderNone>
                                        <span>无</span>
                                    </PresetAreaItem>
                                    <PresetAreaItem>
                                        <BorderOutline
                                            onClick={handleBorderOutline}
                                            iconStyle={{
                                                width: '35px',
                                                height: '35px',
                                                backgroundColor: 'lightgray',
                                            }}
                                            icon='url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU2LjIgKDgxNjcyKSAtIGh0dHBzOi8vc2tldGNoLmNvbSAtLT4KICAgIDx0aXRsZT5PdXRsaW5lPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9Ik91dGxpbmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLnvJbnu4QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuMDAwMDAwLCAzLjAwMDAwMCkiPgogICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiBmaWxsPSIjRkZGRkZGIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjciIGhlaWdodD0iMjciPjwvcmVjdD4KICAgICAgICAgICAgPHBhdGggZD0iTTI3LDI2IEwyNywyNyBMMjQsMjcgTDI0LDI2IEwyNiwyNiBMMjYsMjQgTDI3LDI0IEwyNywyNiBaIE0yNiwxIEwyNCwxIEwyNCwwIEwyNiwwIEwyNyw5LjE4NDg1MDk5ZS0xNyBMMjcsMyBMMjYsMyBMMjYsMSBaIE0xLDEzIEwzLDEzIEwzLDE0IEwxLDE0IEwxLDE1IEwtMi4yMjA0NDYwNWUtMTYsMTUgTDIuMjIwNDQ2MDVlLTE2LDEyIEwxLDEyIEwxLDEzIFogTTEzLDI2IEwxMywyNCBMMTQsMjQgTDE0LDI2IEwxNSwyNiBMMTUsMjcgTDEyLDI3IEwxMiwyNiBMMTMsMjYgWiBNLTIuMjIwNDQ2MDVlLTE2LDI2IEwyLjIyMDQ0NjA1ZS0xNiwyNCBMMSwyNCBMMSwyNiBMMywyNiBMMywyNyBMMCwyNyBMMCwyNiBaIE0xNCwxMyBMMTUsMTMgTDE1LDE0IEwxNCwxNCBMMTQsMTUgTDEzLDE1IEwxMywxNCBMMTIsMTQgTDEyLDEzIEwxMywxMyBMMTMsMTIgTDE0LDEyIEwxNCwxMyBaIE0yNiwxNCBMMjQsMTQgTDI0LDEzIEwyNiwxMyBMMjYsMTIgTDI3LDEyIEwyNywxNSBMMjYsMTUgTDI2LDE0IFogTTE0LDEgTDE0LDMgTDEzLDMgTDEzLDEgTDEyLDEgTDEyLDAgTDE1LDAgTDE1LDEgTDE0LDEgWiBNMSwxIEwxLDMgTC0yLjIyMDQ0NjA1ZS0xNiwzIEw3LjQwMTQ4NjgzZS0xNywxIEwwLDAgTDMsMCBMMywxIEwxLDEgWiBNNCwwIEw3LDAgTDcsMSBMNCwxIEw0LDAgWiBNNCwyNiBMNywyNiBMNywyNyBMNCwyNyBMNCwyNiBaIE04LDAgTDExLDAgTDExLDEgTDgsMSBMOCwwIFogTTgsMjYgTDExLDI2IEwxMSwyNyBMOCwyNyBMOCwyNiBaIE0xNiwwIEwxOSwwIEwxOSwxIEwxNiwxIEwxNiwwIFogTTE2LDI2IEwxOSwyNiBMMTksMjcgTDE2LDI3IEwxNiwyNiBaIE0yMCwwIEwyMywwIEwyMywxIEwyMCwxIEwyMCwwIFogTTIwLDI2IEwyMywyNiBMMjMsMjcgTDIwLDI3IEwyMCwyNiBaIE0yNyw0IEwyNyw3IEwyNiw3IEwyNiw0IEwyNyw0IFogTTEsNCBMMSw3IEwtMi4yMjA0NDYwNWUtMTYsNyBMMi4yMjA0NDYwNWUtMTYsNCBMMSw0IFogTTE0LDQgTDE0LDcgTDEzLDcgTDEzLDQgTDE0LDQgWiBNMjMsMTQgTDIwLDE0IEwyMCwxMyBMMjMsMTMgTDIzLDE0IFogTTI3LDggTDI3LDExIEwyNiwxMSBMMjYsOCBMMjcsOCBaIE0xLDggTDEsMTEgTC0yLjIyMDQ0NjA1ZS0xNiwxMSBMMi4yMjA0NDYwNWUtMTYsOCBMMSw4IFogTTE0LDggTDE0LDExIEwxMywxMSBMMTMsOCBMMTQsOCBaIE0xOSwxNCBMMTYsMTQgTDE2LDEzIEwxOSwxMyBMMTksMTQgWiBNMjcsMTYgTDI3LDE5IEwyNiwxOSBMMjYsMTYgTDI3LDE2IFogTTEsMTYgTDEsMTkgTC0yLjIyMDQ0NjA1ZS0xNiwxOSBMMi4yMjA0NDYwNWUtMTYsMTYgTDEsMTYgWiBNMTQsMTYgTDE0LDE5IEwxMywxOSBMMTMsMTYgTDE0LDE2IFogTTExLDE0IEw4LDE0IEw4LDEzIEwxMSwxMyBMMTEsMTQgWiBNMjcsMjAgTDI3LDIzIEwyNiwyMyBMMjYsMjAgTDI3LDIwIFogTTEsMjAgTDEsMjMgTC0yLjIyMDQ0NjA1ZS0xNiwyMyBMMi4yMjA0NDYwNWUtMTYsMjAgTDEsMjAgWiBNMTQsMjAgTDE0LDIzIEwxMywyMyBMMTMsMjAgTDE0LDIwIFogTTcsMTQgTDQsMTQgTDQsMTMgTDcsMTMgTDcsMTQgWiIgaWQ9IuW9oueKtue7k+WQiOWkh+S7vS0zIiBmaWxsPSIjQThBOEE4Ij48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDAgTDI3LDAgTDI3LDI3IEwwLDI3IEwwLDAgWiBNMSwxIEwxLDI2IEwyNiwyNiBMMjYsMSBMMSwxIFoiIGlkPSLlvaLnirbnu5PlkIgiIGZpbGw9IiMzNjdGQzkiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)'
                                        ></BorderOutline>
                                        <span>外边框</span>
                                    </PresetAreaItem>
                                    <PresetAreaItem>
                                        <BorderInside
                                            onClick={handlePreBorderInside}
                                            iconStyle={{
                                                width: '35px',
                                                height: '35px',
                                                backgroundColor: 'lightgray',
                                            }}
                                        ></BorderInside>
                                        <span>内边框</span>
                                    </PresetAreaItem>
                                </PresetArea>
                                <fieldset
                                    style={{
                                        borderTop: '1px solid lightgray',
                                        borderLeft: 0,
                                        borderRight: 0,
                                        borderBottom: 0,
                                        fontSize: '12px',
                                    }}
                                >
                                    <legend>边框</legend>
                                </fieldset>
                                <PreShowArea>
                                    <PreShowAreaLeft>
                                        <div
                                            style={{
                                                width: 32,
                                                height: 32,
                                                border: '1px solid lightgray',
                                                margin: 0,
                                                backgroundColor: borderTop
                                                    ? 'lightGrey'
                                                    : 'white',
                                            }}
                                        >
                                            <BorderTop
                                                onClick={() =>
                                                    setBorderTop(!borderTop)
                                                }
                                                style={{ margin: 0 }}
                                                iconStyle={{
                                                    padding: '2px',
                                                    margin: '5px',
                                                    width: '18px',
                                                    height: '18px',
                                                    backgroundColor: 'white',
                                                }}
                                            ></BorderTop>
                                        </div>
                                        <div
                                            style={{
                                                width: 32,
                                                height: 32,
                                                border: '1px solid lightgray',
                                                margin: 0,
                                                backgroundColor:
                                                    lineHorizontalInner
                                                        ? 'lightGrey'
                                                        : 'white',
                                            }}
                                        >
                                            <LineHorizontalInner
                                                onClick={() =>
                                                    setLineHorizontalInner(
                                                        !lineHorizontalInner
                                                    )
                                                }
                                                style={{ margin: 0 }}
                                                iconStyle={{
                                                    padding: '2px',
                                                    margin: '5px',
                                                    width: '18px',
                                                    height: '18px',
                                                    backgroundColor: 'white',
                                                }}
                                            ></LineHorizontalInner>
                                        </div>
                                        <div
                                            style={{
                                                width: 32,
                                                height: 32,
                                                border: '1px solid lightgray',
                                                margin: 0,
                                                backgroundColor: borderBottom
                                                    ? 'lightGrey'
                                                    : 'white',
                                            }}
                                        >
                                            <BorderBottom
                                                onClick={() =>
                                                    setBorderBottom(
                                                        !borderBottom
                                                    )
                                                }
                                                style={{ margin: 0 }}
                                                iconStyle={{
                                                    padding: '2px',
                                                    margin: '5px',
                                                    width: '18px',
                                                    height: '18px',
                                                    backgroundColor: 'white',
                                                }}
                                            ></BorderBottom>
                                        </div>
                                    </PreShowAreaLeft>
                                    <PreShowAreaRight>
                                        <div
                                            style={{
                                                width: 180,
                                                height: 100,
                                                border: '1px solid black',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    position: 'relative',
                                                    width: 150,
                                                    height: 80,
                                                    borderLeft: borderLeft
                                                        ? `1px solid ${lineColor}`
                                                        : 0,
                                                    borderRight: borderRight
                                                        ? `1px solid ${lineColor}`
                                                        : 0,
                                                    borderTop: borderTop
                                                        ? `1px solid ${lineColor}`
                                                        : 0,
                                                    borderBottom: borderBottom
                                                        ? `1px solid ${lineColor}`
                                                        : 0,
                                                }}
                                            >
                                                <CanvasBorderArea
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                    }}
                                                    diagonalDownLine={
                                                        diagonalDownLine
                                                    }
                                                    diagonalUpLine={
                                                        diagonalUpLine
                                                    }
                                                    lineHorizontalInner={
                                                        lineHorizontalInner
                                                    }
                                                    lineVerticalInner={
                                                        lineVerticalInner
                                                    }
                                                    isMoreCell={isMoreCell}
                                                    lineColor={lineColor}
                                                ></CanvasBorderArea>
                                            </div>
                                        </div>
                                    </PreShowAreaRight>
                                </PreShowArea>
                                <PreShowAreaBottom>
                                    <div
                                        style={{
                                            width: 32,
                                            height: 32,
                                            border: '1px solid lightgray',
                                            margin: 0,
                                            position: 'absolute',
                                            left: 8,
                                            backgroundColor: diagonalUpLine
                                                ? 'lightGrey'
                                                : 'white',
                                        }}
                                    >
                                        <DiagonalUpLine
                                            onClick={() =>
                                                setDiagonalUpLine(
                                                    !diagonalUpLine
                                                )
                                            }
                                            style={{ margin: 0 }}
                                            iconStyle={{
                                                padding: '2px',
                                                margin: '5px',
                                                width: '18px',
                                                height: '18px',
                                                backgroundColor: 'white',
                                            }}
                                        ></DiagonalUpLine>
                                    </div>
                                    <div
                                        style={{
                                            width: 32,
                                            height: 32,
                                            border: '1px solid lightgray',
                                            margin: 0,
                                            position: 'absolute',
                                            left: 60,
                                            backgroundColor: borderLeft
                                                ? 'lightGrey'
                                                : 'white',
                                        }}
                                    >
                                        <BorderLeft
                                            onClick={() =>
                                                setBorderLeft(!borderLeft)
                                            }
                                            style={{ margin: 0 }}
                                            iconStyle={{
                                                padding: '2px',
                                                margin: '5px',
                                                width: '18px',
                                                height: '18px',
                                                backgroundColor: 'white',
                                            }}
                                        ></BorderLeft>
                                    </div>
                                    <div
                                        style={{
                                            width: 32,
                                            height: 32,
                                            border: '1px solid lightgray',
                                            margin: 0,
                                            position: 'absolute',
                                            left: 150,
                                            backgroundColor: lineVerticalInner
                                                ? 'lightGrey'
                                                : 'white',
                                        }}
                                    >
                                        <LineVerticalInner
                                            onClick={() =>
                                                setLineVerticalInner(
                                                    !lineVerticalInner
                                                )
                                            }
                                            style={{ margin: 0 }}
                                            iconStyle={{
                                                padding: '2px',
                                                margin: '5px',
                                                width: '18px',
                                                height: '18px',
                                                backgroundColor: 'white',
                                            }}
                                        ></LineVerticalInner>
                                    </div>
                                    <div
                                        style={{
                                            width: 32,
                                            height: 32,
                                            border: '1px solid lightgray',
                                            margin: 0,
                                            position: 'absolute',
                                            left: 230,
                                            backgroundColor: borderRight
                                                ? 'lightGrey'
                                                : 'white',
                                        }}
                                    >
                                        <BorderRight
                                            onClick={() =>
                                                setBorderRight(!borderRight)
                                            }
                                            style={{ margin: 0 }}
                                            iconStyle={{
                                                padding: '2px',
                                                margin: '5px',
                                                width: '18px',
                                                height: '18px',
                                                backgroundColor: 'white',
                                            }}
                                        ></BorderRight>
                                    </div>
                                    <div
                                        style={{
                                            width: 32,
                                            height: 32,
                                            border: '1px solid lightgray',
                                            margin: 0,
                                            position: 'absolute',
                                            left: 280,
                                            backgroundColor: diagonalDownLine
                                                ? 'lightGrey'
                                                : 'white',
                                        }}
                                    >
                                        <DiagonalDownLine
                                            onClick={() =>
                                                setDiagonalDownLine(
                                                    !diagonalDownLine
                                                )
                                            }
                                            style={{ margin: 0 }}
                                            iconStyle={{
                                                padding: '2px',
                                                margin: '5px',
                                                width: '18px',
                                                height: '18px',
                                                backgroundColor: 'white',
                                            }}
                                        ></DiagonalDownLine>
                                    </div>
                                </PreShowAreaBottom>
                            </PreArea>
                        </BorderTabPanel>
                        <BottomAreaofBorderTab>
                            单击预置选项、预览草图及上面的按钮可以添加边框样式
                        </BottomAreaofBorderTab>
                    </Tab>
                    <Tab code='保护' title='保护'>
                        <p>Content for 保护 </p>
                    </Tab>
                </Tabs>
            </TabPanel>

            <TabBottomButtons>
                <Button title={'确定'} onClick={handleOK}>
                    确定
                </Button>
                <Button title={'取消'} onClick={handleCancel}>
                    取消
                </Button>
            </TabBottomButtons>
        </Index>
    ) : null;
}

export default CellStyleSetting;
