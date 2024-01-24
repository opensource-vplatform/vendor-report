import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import Select from '@components/Select/Index';
import {
  setIsOpenCellSetting,
  setTabValueCellSetting,
} from '@store/borderSlice/borderSlice';
import {
  setFontFamily,
  setFontSize,
  setFontStyle,
  setFontWeight,
  setForeColor,
  setHAlign,
  setTextDecoration,
  setTextOrientation,
  setVAlign,
  setWordWrap,
} from '@store/fontSlice/fontSlice.js';
import {
  setShowEllipsis,
  setShrinkToFit,
} from '@utils/borderUtil.js';
import {
  mergeCells,
  setBorderByType,
  setIndentByCounter,
  toDoubleUnderline,
  toLineThrough,
  toUnderline,
  unMergeCell,
} from '@utils/fontUtil.js';

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
  LocaleType,
  SpecialFormats,
  TimeFormats,
} from './constant';
import AlignFormatPanel from './subPanel/AlignFormatPanel';
import BorderFormatPanel from './subPanel/BorderFormatPanel';
import FontFormatPanel from './subPanel/FontFormatPanel';

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
        font-size: 14px;
    }
`;
const BottomAreaOfNumberTab = styled.div`
    font-size: 14px;
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
    span {
        padding-top: 0px;
        padding-bottom: 0px;
    }
`;
const ThousandSeparator = styled.div`
    height: 25px;
    margin: 5px 0;
    display: flex;
    align-items: center;
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
    }
`;
const LocaleDiv = styled.div`
    span {
        padding-top: 0px;
        padding-bottom: 0px;
    }
`;

function CellStyleSetting(props) {
    let firstCellValue = null;
    const dispatch = useDispatch();

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

    const [isMoreCell, setIsMoreCell] = useState(false);
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

    const [startDeg, setStartDeg] = useState(0);

    // 字体面板
    const [selectedFontFamily, setSelectedFontFamily] = useState('微软雅黑');
    const [selectedFontSize, setSelectedFontSize] = useState(11);
    const [selectedFontStyle, setSelectedFontStyle] = useState('常规');
    const [selectedUnderlineStyle, setSelectedUnderlineStyle] = useState('无');

    const fontStyles = useSelector(({ fontSlice }) => fontSlice);
    const borderStyle = useSelector(({ borderSlice }) => borderSlice);
    const fontCellSetting = useSelector(
        ({ fontCellSettingSlice }) => fontCellSettingSlice
    );
    const { spread, isStrickoutLine } = fontStyles;

    const { tabValueCellSetting, isOpenCellSetting } = borderStyle;
    const { selectedFontColor } = fontCellSetting;

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
            console.log('object :>> ');
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
                                <LocaleDiv>
                                    <span>区域设置（国家/地区）:</span>
                                    <Select
                                        datas={LocaleType}
                                        style={{
                                            width: '300px',
                                            height: '25px',
                                            margin: '5px 0px',
                                        }}
                                        optionStyle={{ width: '304px' }}
                                        onChange={handleLocaleType}
                                        value={locale}
                                    />
                                </LocaleDiv>
                            )}
                        </RightAreaOfNumberTab>
                        <BottomAreaOfNumberTab>
                            <span>
                                {FormatNumber[selectedValue].toString()}
                            </span>
                        </BottomAreaOfNumberTab>
                    </Tab>
                    <Tab code='对齐' title='对齐'>
                        <AlignFormatPanel
                            isWrapText={isWrapText}
                            setIsWrapText={setIsWrapText}
                            isShrinkToFit={isShrinkToFit}
                            setIsShrinkToFit={setIsShrinkToFit}
                            isMergeCells={isMergeCells}
                            setIsMergeCells={setIsMergeCells}
                            isShowEllipsis={isShowEllipsis}
                            setIsShowEllipsis={setIsShowEllipsis}
                            indentValue={indentValue}
                            setIndentValue={setIndentValue}
                            textHAlignValue={textHAlignValue}
                            setTextHAlignValue={setTextHAlignValue}
                            textVAlignValue={textVAlignValue}
                            setTextVAlignValue={setTextVAlignValue}
                            startDeg={startDeg}
                            setStartDeg={setStartDeg}
                        />
                    </Tab>
                    <Tab code='字体' title='字体'>
                        <FontFormatPanel
                            selectedFontFamily={selectedFontFamily}
                            setSelectedFontFamily={setSelectedFontFamily}
                            selectedFontSize={selectedFontSize}
                            setSelectedFontSize={setSelectedFontSize}
                            selectedFontStyle={selectedFontStyle}
                            setSelectedFontStyle={setSelectedFontStyle}
                            selectedUnderlineStyle={selectedUnderlineStyle}
                            setSelectedUnderlineStyle={
                                setSelectedUnderlineStyle
                            }
                        />
                    </Tab>
                    <Tab code='边框' title='边框'>
                        <BorderFormatPanel
                            isMoreCell={isMoreCell}
                            lineColor={lineColor}
                            setLineColor={setLineColor}
                            borderTop={borderTop}
                            setBorderTop={setBorderTop}
                            borderLeft={borderLeft}
                            setBorderLeft={setBorderLeft}
                            borderRight={borderRight}
                            setBorderRight={setBorderRight}
                            borderBottom={borderBottom}
                            setBorderBottom={setBorderBottom}
                            diagonalUpLine={diagonalUpLine}
                            setDiagonalUpLine={setDiagonalUpLine}
                            diagonalDownLine={diagonalDownLine}
                            setDiagonalDownLine={setDiagonalDownLine}
                            lineHorizontalInner={lineHorizontalInner}
                            setLineHorizontalInner={setLineHorizontalInner}
                            lineVerticalInner={lineVerticalInner}
                            setLineVerticalInner={setLineVerticalInner}
                            lineType={lineType}
                            setLineType={setLineType}
                        />
                    </Tab>
                    {/* <Tab code='保护' title='保护'>
                        <p>Content for 保护 </p>
                    </Tab> */}
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
