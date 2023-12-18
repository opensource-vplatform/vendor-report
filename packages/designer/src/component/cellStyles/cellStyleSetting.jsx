import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GC from '@grapecity/spread-sheets';
import Index from '../dialog/Index';
import Tab from '../tabs/Tab';
import Tabs from '../tabs/Tabs';
import Integer from '../integer/Index';
import Button from '../button/Index';
import Select from '@components/Select/Index';
import {
    Categories,
    FormatNumber,
    AccountingSymbol,
    LocaleType,
    TimeFormats,
    DateFormats,
    CurrencyNegativeNumbers,
    FractionType,
    SpecialFormats,
    CustomFormats,
    IconType,
} from './constant';
import './CellStyleSetting.scss';
import List from '../list/List';
import Icon from './lineIcon';
import ColorEditor from '@components/color/Index';
import BackColor from '@icons/font/BackColor ';
import ArrowDown from '@icons/arrow/ArrowDown';
import BorderOutline from '@icons/border/BorderOutline';
import BorderNone from '@icons/border/BorderNone';
import BorderInside from '@icons/border/BorderInside';
import BorderBottom from '@icons/border/BorderBottom';
import BorderTop from '@icons/border/BorderTop';
import LineHorizontalInner from '@icons/border/LineHorizontalInner';
import DiagonalUpLine from '@icons/border/DiagonalUpLine';
import DiagonalDownLine from '@icons/border/DiagonalDownLine';
import BorderLeft from '@icons/border/BorderLeft';
import BorderRight from '@icons/border/BorderRight';
import LineVerticalInner from '@icons/border/LineVerticalInner';

function CellStyleSetting(props) {
    let firstCellValue = null;
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const [decimalPlacesValue, setDecimalPlacesValue] = useState(2);
    const [selectedValue, setSelectedCategoriesValue] = useState('general');
    const [selectedSymbol, setSelectedSymbol] = useState('');
    const [selectedTimeFormat, setSelectedTimeFormat] = useState('');
    const [exampleValue, setExampleValue] = useState(
        firstCellValue ? firstCellValue : '12345'
    );
    const [checkboxOfThousandSeparator, setCheckboxOfThousandSeparator] =
        useState(false);
    const [locale, setLocale] = useState('en_us');

    const [lineColor, setLineColor] = useState('black');

    const { spread } = useSelector(({ fontSlice }) => fontSlice);

    // 获取第一个选择区域的第一个单元格的值
    const activeSheet = spread?.getActiveSheet();
    const selections = activeSheet?.getSelections();
    if (selections?.length > 0) {
        const selection = selections[0];
        const startRow = selection.row;
        const startColumn = selection.col;
        firstCellValue = activeSheet.getValue(startRow, startColumn);
    }

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
            setIsOpen(!isOpen);
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

    const handleSelectCategoriesChange = (value) => {
        const keys = Object.keys(Categories);
        const selectedOptionValue = keys.find((k) => Categories[k] === value);
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

    const handleOK = () => {
        setIsOpen(false);
        setSelectedCategoriesValue('general');
    };
    const handleCancel = () => {
        setIsOpen(false);
        setDecimalPlacesValue(2);
        setSelectedSymbol('');
        setSelectedTimeFormat('');

        // 还原单元格值 以及清空单元格式
        // sheet.setValue(selections[0].row, selections[0].col, firstCellValue);
    };
    const handleClose = () => {
        setIsOpen(false);
        setDecimalPlacesValue(2);
        setSelectedSymbol('');
        setSelectedTimeFormat('');
    };

    const handleColorEditor = (color) => {
        setLineColor(color);
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
    console.log('1 :>> ', 1);

    return isOpen ? (
        <Index
            title='设置单元格格式'
            width='730px'
            height='630px'
            open={true}
            mask={true}
            onClose={handleClose}
        >
            <div className='tabBox'>
                <Tabs>
                    {/* 可以抽成组件 <numberFormat>*/}
                    <Tab code='数字' title='数字'>
                        <p>分类：</p>
                        <div className='leftArea'>
                            <List
                                height='423px'
                                values={Object.values(Categories)}
                                selectedValue={Categories[
                                    selectedValue
                                ].toString()}
                                onChange={handleSelectCategoriesChange}
                            />
                        </div>
                        <div className='simpleArea'>
                            <fieldset>
                                <legend>示例</legend>
                                <label>
                                    {selectedValue === 'general'
                                        ? 12345
                                        : exampleValue}
                                </label>
                            </fieldset>
                        </div>
                        <div className='rightArea'>
                            {(selectedValue === 'numbers' ||
                                selectedValue === 'currency' ||
                                selectedValue === 'accounting' ||
                                selectedValue === 'scientific' ||
                                selectedValue === 'percentage') && (
                                <div className='decimalPlaces'>
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
                                </div>
                            )}

                            {selectedValue === 'numbers' && (
                                <div id='thousand-separator'>
                                    <input
                                        type='checkbox'
                                        checked={checkboxOfThousandSeparator}
                                        onChange={handleCheckboxChange}
                                    ></input>
                                    <span>使用千位分隔符(,)</span>
                                </div>
                            )}
                            {(selectedValue === 'currency' ||
                                selectedValue === 'accounting') && (
                                <div className='decimalPlaces'>
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
                                </div>
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
                                            values={Object.values(DateFormats)}
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
                        </div>
                        <div className='bottomArea'>
                            <span>
                                {FormatNumber[selectedValue].toString()}
                            </span>
                        </div>
                    </Tab>
                    <Tab code='对齐' title='对齐'>
                        <p>Content for 对齐</p>
                    </Tab>
                    <Tab code='字体' title='字体'>
                        <p>Content for Sheet 3</p>
                    </Tab>
                    <Tab code='边框' title='边框'>
                        <div className='borderArea'>
                            <div className='lineArea'>
                                <fieldset
                                    style={{
                                        border: '1px solid lightgray',
                                        padding: 0,
                                    }}
                                >
                                    <legend>线条</legend>
                                    <span>样式：</span>

                                    <div className='lineStyle'>
                                        <div className='lineStyleLeft'>
                                            <Icon type={IconType.Hair} />
                                            <Icon type={IconType.Dotted} />
                                            <Icon type={IconType.DashDotDot} />
                                            <Icon type={IconType.DashDot} />
                                            <Icon type={IconType.Dashed} />
                                            <Icon type={IconType.Thin} />
                                            <Icon type={IconType.Thin} />
                                        </div>
                                        <div className='lineStyleRight'>
                                            <Icon
                                                type={IconType.MediumDashDotDot}
                                            />
                                            <Icon
                                                type={IconType.SlantedDashDot}
                                            />
                                            <Icon
                                                type={IconType.MediumDashDot}
                                            />
                                            <Icon
                                                type={IconType.MediumDashed}
                                            />
                                            <Icon type={IconType.Medium} />
                                            <Icon type={IconType.Thick} />
                                            <Icon type={IconType.Double} />
                                        </div>
                                    </div>
                                    <span>颜色：</span>
                                    <div>
                                        <ColorEditor
                                            onChange={handleColorEditor}
                                            value={lineColor}
                                        >
                                            <div className='lineColor'>
                                                <div
                                                    className='colorPreView'
                                                    style={{
                                                        backgroundColor:
                                                            lineColor,
                                                    }}
                                                ></div>
                                                <div className='arrowDownIcon'>
                                                    <ArrowDown
                                                        style={{
                                                            width: 20,
                                                            height: 23,
                                                            margin: 0,
                                                        }}
                                                    ></ArrowDown>
                                                </div>
                                            </div>
                                        </ColorEditor>
                                    </div>
                                </fieldset>
                            </div>
                            <div className='preArea'>
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
                                <div className='presetArea'>
                                    <div className='item'>
                                        <BorderNone
                                            iconStyle={{
                                                width: '35px',
                                                height: '35px',
                                                backgroundColor: 'lightgray',
                                            }}
                                            icon='url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU2LjIgKDgxNjcyKSAtIGh0dHBzOi8vc2tldGNoLmNvbSAtLT4KICAgIDx0aXRsZT5Ob25lPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9Ik5vbmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLnvJbnu4QtMTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuMDAwMDAwLCAzLjAwMDAwMCkiPgogICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiBmaWxsPSIjRkZGRkZGIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjciIGhlaWdodD0iMjciPjwvcmVjdD4KICAgICAgICAgICAgPHBhdGggZD0iTTI3LDI2IEwyNywyNyBMMjQsMjcgTDI0LDI2IEwyNiwyNiBMMjYsMjQgTDI3LDI0IEwyNywyNiBaIE0yNiwxIEwyNCwxIEwyNCwwIEwyNiwwIEwyNyw5LjE4NDg1MDk5ZS0xNyBMMjcsMyBMMjYsMyBMMjYsMSBaIE0xLDEzIEwzLDEzIEwzLDE0IEwxLDE0IEwxLDE1IEwtMS4xMzkwODg4MmUtMTMsMTUgTC0xLjEzNDY0NzkzZS0xMywxMiBMMSwxMiBMMSwxMyBaIE0xMywyNiBMMTMsMjQgTDE0LDI0IEwxNCwyNiBMMTUsMjYgTDE1LDI3IEwxMiwyNyBMMTIsMjYgTDEzLDI2IFogTS0xLjEzOTA4ODgyZS0xMywyNiBMLTEuMTM0NjQ3OTNlLTEzLDI0IEwxLDI0IEwxLDI2IEwzLDI2IEwzLDI3IEwtMS4xMzY4NjgzOGUtMTMsMjcgTC0xLjEzNjg2ODM4ZS0xMywyNiBaIE0xNCwxMyBMMTUsMTMgTDE1LDE0IEwxNCwxNCBMMTQsMTUgTDEzLDE1IEwxMywxNCBMMTIsMTQgTDEyLDEzIEwxMywxMyBMMTMsMTIgTDE0LDEyIEwxNCwxMyBaIE0yNiwxNCBMMjQsMTQgTDI0LDEzIEwyNiwxMyBMMjYsMTIgTDI3LDEyIEwyNywxNSBMMjYsMTUgTDI2LDE0IFogTTE0LDEgTDE0LDMgTDEzLDMgTDEzLDEgTDEyLDEgTDEyLDAgTDE1LDAgTDE1LDEgTDE0LDEgWiBNMSwxIEwxLDMgTC0xLjEzOTA4ODgyZS0xMywzIEwtMS4xMzYxMjgyM2UtMTMsMSBMLTEuMTM2ODY4MzhlLTEzLDAgTDMsMCBMMywxIEwxLDEgWiBNNCwwIEw3LDAgTDcsMSBMNCwxIEw0LDAgWiBNNCwyNiBMNywyNiBMNywyNyBMNCwyNyBMNCwyNiBaIE04LDAgTDExLDAgTDExLDEgTDgsMSBMOCwwIFogTTgsMjYgTDExLDI2IEwxMSwyNyBMOCwyNyBMOCwyNiBaIE0xNiwwIEwxOSwwIEwxOSwxIEwxNiwxIEwxNiwwIFogTTE2LDI2IEwxOSwyNiBMMTksMjcgTDE2LDI3IEwxNiwyNiBaIE0yMCwwIEwyMywwIEwyMywxIEwyMCwxIEwyMCwwIFogTTIwLDI2IEwyMywyNiBMMjMsMjcgTDIwLDI3IEwyMCwyNiBaIE0yNyw0IEwyNyw3IEwyNiw3IEwyNiw0IEwyNyw0IFogTTEsNCBMMSw3IEwtMS4xMzkwODg4MmUtMTMsNyBMLTEuMTM0NjQ3OTNlLTEzLDQgTDEsNCBaIE0xNCw0IEwxNCw3IEwxMyw3IEwxMyw0IEwxNCw0IFogTTIzLDE0IEwyMCwxNCBMMjAsMTMgTDIzLDEzIEwyMywxNCBaIE0yNyw4IEwyNywxMSBMMjYsMTEgTDI2LDggTDI3LDggWiBNMSw4IEwxLDExIEwtMS4xMzkwODg4MmUtMTMsMTEgTC0xLjEzNDY0NzkzZS0xMyw4IEwxLDggWiBNMTQsOCBMMTQsMTEgTDEzLDExIEwxMyw4IEwxNCw4IFogTTE5LDE0IEwxNiwxNCBMMTYsMTMgTDE5LDEzIEwxOSwxNCBaIE0yNywxNiBMMjcsMTkgTDI2LDE5IEwyNiwxNiBMMjcsMTYgWiBNMSwxNiBMMSwxOSBMLTEuMTM5MDg4ODJlLTEzLDE5IEwtMS4xMzQ2NDc5M2UtMTMsMTYgTDEsMTYgWiBNMTQsMTYgTDE0LDE5IEwxMywxOSBMMTMsMTYgTDE0LDE2IFogTTExLDE0IEw4LDE0IEw4LDEzIEwxMSwxMyBMMTEsMTQgWiBNMjcsMjAgTDI3LDIzIEwyNiwyMyBMMjYsMjAgTDI3LDIwIFogTTEsMjAgTDEsMjMgTC0xLjEzOTA4ODgyZS0xMywyMyBMLTEuMTM0NjQ3OTNlLTEzLDIwIEwxLDIwIFogTTE0LDIwIEwxNCwyMyBMMTMsMjMgTDEzLDIwIEwxNCwyMCBaIE03LDE0IEw0LDE0IEw0LDEzIEw3LDEzIEw3LDE0IFoiIGlkPSLlvaLnirbnu5PlkIgiIGZpbGw9IiNBOEE4QTgiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)'
                                        ></BorderNone>
                                        <span>无</span>
                                    </div>
                                    <div className='item'>
                                        <BorderOutline
                                            iconStyle={{
                                                width: '35px',
                                                height: '35px',
                                                backgroundColor: 'lightgray',
                                            }}
                                            icon='url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU2LjIgKDgxNjcyKSAtIGh0dHBzOi8vc2tldGNoLmNvbSAtLT4KICAgIDx0aXRsZT5PdXRsaW5lPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9Ik91dGxpbmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLnvJbnu4QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuMDAwMDAwLCAzLjAwMDAwMCkiPgogICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiBmaWxsPSIjRkZGRkZGIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjciIGhlaWdodD0iMjciPjwvcmVjdD4KICAgICAgICAgICAgPHBhdGggZD0iTTI3LDI2IEwyNywyNyBMMjQsMjcgTDI0LDI2IEwyNiwyNiBMMjYsMjQgTDI3LDI0IEwyNywyNiBaIE0yNiwxIEwyNCwxIEwyNCwwIEwyNiwwIEwyNyw5LjE4NDg1MDk5ZS0xNyBMMjcsMyBMMjYsMyBMMjYsMSBaIE0xLDEzIEwzLDEzIEwzLDE0IEwxLDE0IEwxLDE1IEwtMi4yMjA0NDYwNWUtMTYsMTUgTDIuMjIwNDQ2MDVlLTE2LDEyIEwxLDEyIEwxLDEzIFogTTEzLDI2IEwxMywyNCBMMTQsMjQgTDE0LDI2IEwxNSwyNiBMMTUsMjcgTDEyLDI3IEwxMiwyNiBMMTMsMjYgWiBNLTIuMjIwNDQ2MDVlLTE2LDI2IEwyLjIyMDQ0NjA1ZS0xNiwyNCBMMSwyNCBMMSwyNiBMMywyNiBMMywyNyBMMCwyNyBMMCwyNiBaIE0xNCwxMyBMMTUsMTMgTDE1LDE0IEwxNCwxNCBMMTQsMTUgTDEzLDE1IEwxMywxNCBMMTIsMTQgTDEyLDEzIEwxMywxMyBMMTMsMTIgTDE0LDEyIEwxNCwxMyBaIE0yNiwxNCBMMjQsMTQgTDI0LDEzIEwyNiwxMyBMMjYsMTIgTDI3LDEyIEwyNywxNSBMMjYsMTUgTDI2LDE0IFogTTE0LDEgTDE0LDMgTDEzLDMgTDEzLDEgTDEyLDEgTDEyLDAgTDE1LDAgTDE1LDEgTDE0LDEgWiBNMSwxIEwxLDMgTC0yLjIyMDQ0NjA1ZS0xNiwzIEw3LjQwMTQ4NjgzZS0xNywxIEwwLDAgTDMsMCBMMywxIEwxLDEgWiBNNCwwIEw3LDAgTDcsMSBMNCwxIEw0LDAgWiBNNCwyNiBMNywyNiBMNywyNyBMNCwyNyBMNCwyNiBaIE04LDAgTDExLDAgTDExLDEgTDgsMSBMOCwwIFogTTgsMjYgTDExLDI2IEwxMSwyNyBMOCwyNyBMOCwyNiBaIE0xNiwwIEwxOSwwIEwxOSwxIEwxNiwxIEwxNiwwIFogTTE2LDI2IEwxOSwyNiBMMTksMjcgTDE2LDI3IEwxNiwyNiBaIE0yMCwwIEwyMywwIEwyMywxIEwyMCwxIEwyMCwwIFogTTIwLDI2IEwyMywyNiBMMjMsMjcgTDIwLDI3IEwyMCwyNiBaIE0yNyw0IEwyNyw3IEwyNiw3IEwyNiw0IEwyNyw0IFogTTEsNCBMMSw3IEwtMi4yMjA0NDYwNWUtMTYsNyBMMi4yMjA0NDYwNWUtMTYsNCBMMSw0IFogTTE0LDQgTDE0LDcgTDEzLDcgTDEzLDQgTDE0LDQgWiBNMjMsMTQgTDIwLDE0IEwyMCwxMyBMMjMsMTMgTDIzLDE0IFogTTI3LDggTDI3LDExIEwyNiwxMSBMMjYsOCBMMjcsOCBaIE0xLDggTDEsMTEgTC0yLjIyMDQ0NjA1ZS0xNiwxMSBMMi4yMjA0NDYwNWUtMTYsOCBMMSw4IFogTTE0LDggTDE0LDExIEwxMywxMSBMMTMsOCBMMTQsOCBaIE0xOSwxNCBMMTYsMTQgTDE2LDEzIEwxOSwxMyBMMTksMTQgWiBNMjcsMTYgTDI3LDE5IEwyNiwxOSBMMjYsMTYgTDI3LDE2IFogTTEsMTYgTDEsMTkgTC0yLjIyMDQ0NjA1ZS0xNiwxOSBMMi4yMjA0NDYwNWUtMTYsMTYgTDEsMTYgWiBNMTQsMTYgTDE0LDE5IEwxMywxOSBMMTMsMTYgTDE0LDE2IFogTTExLDE0IEw4LDE0IEw4LDEzIEwxMSwxMyBMMTEsMTQgWiBNMjcsMjAgTDI3LDIzIEwyNiwyMyBMMjYsMjAgTDI3LDIwIFogTTEsMjAgTDEsMjMgTC0yLjIyMDQ0NjA1ZS0xNiwyMyBMMi4yMjA0NDYwNWUtMTYsMjAgTDEsMjAgWiBNMTQsMjAgTDE0LDIzIEwxMywyMyBMMTMsMjAgTDE0LDIwIFogTTcsMTQgTDQsMTQgTDQsMTMgTDcsMTMgTDcsMTQgWiIgaWQ9IuW9oueKtue7k+WQiOWkh+S7vS0zIiBmaWxsPSIjQThBOEE4Ij48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDAgTDI3LDAgTDI3LDI3IEwwLDI3IEwwLDAgWiBNMSwxIEwxLDI2IEwyNiwyNiBMMjYsMSBMMSwxIFoiIGlkPSLlvaLnirbnu5PlkIgiIGZpbGw9IiMzNjdGQzkiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)'
                                        ></BorderOutline>
                                        <span>外边框</span>
                                    </div>
                                    <div className='item'>
                                        <BorderInside
                                            iconStyle={{
                                                width: '35px',
                                                height: '35px',
                                                backgroundColor: 'lightgray',
                                            }}
                                        ></BorderInside>
                                        <span>内边框</span>
                                    </div>
                                </div>
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
                                <div className='preShowArea'>
                                    <div className='preShowAreaLeft'>
                                        <div
                                            style={{
                                                width: 32,
                                                height: 32,
                                                border: '1px solid lightgray',
                                                margin: 0,
                                            }}
                                        >
                                            <BorderTop
                                                style={{ margin: 0 }}
                                                iconStyle={{
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
                                            }}
                                        >
                                            <LineHorizontalInner
                                                style={{ margin: 0 }}
                                                iconStyle={{
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
                                            }}
                                        >
                                            <BorderBottom
                                                style={{ margin: 0 }}
                                                iconStyle={{
                                                    width: '18px',
                                                    height: '18px',
                                                    backgroundColor: 'white',
                                                }}
                                            ></BorderBottom>
                                        </div>
                                    </div>
                                    <div className='preShowAreaRight'>
                                        <div
                                            style={{
                                                width: 180,
                                                height: 100,
                                                border: '1px solid black',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                // borderLeft: 0,
                                                // borderRight:0,
                                                // borderTop:0,
                                                // borderBottom:0,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: 150,
                                                    height: 80,
                                                    border: '1px solid black',
                                                    // borderLeft: 0,
                                                    // borderRight:0,
                                                    // borderTop:0,
                                                    // borderBottom:0,
                                                }}
                                            >
                                                <span>文本</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='preShowAreaBottom'>
                                    <div
                                        style={{
                                            width: 32,
                                            height: 32,
                                            border: '1px solid lightgray',
                                            margin: 0,
                                            position: 'absolute',
                                            left: 8,
                                        }}
                                    >
                                        <DiagonalUpLine
                                            style={{ margin: 0 }}
                                            iconStyle={{
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
                                        }}
                                    >
                                        <BorderLeft
                                            style={{ margin: 0 }}
                                            iconStyle={{
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
                                        }}
                                    >
                                        <LineVerticalInner
                                            style={{ margin: 0 }}
                                            iconStyle={{
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
                                        }}
                                    >
                                        <BorderRight
                                            style={{ margin: 0 }}
                                            iconStyle={{
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
                                        }}
                                    >
                                        <DiagonalDownLine
                                            style={{ margin: 0 }}
                                            iconStyle={{
                                                width: '18px',
                                                height: '18px',
                                                backgroundColor: 'white',
                                            }}
                                        ></DiagonalDownLine>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bottomArea'>
                            单击预置选项、预览草图及上面的按钮可以添加边框样式
                        </div>
                    </Tab>
                    <Tab code='保护' title='保护'>
                        <p>Content for 保护 </p>
                    </Tab>
                </Tabs>
            </div>

            <div className='bottomButtons'>
                <Button title={'确定'} onClick={handleOK}>
                    确定
                </Button>
                <Button title={'取消'} onClick={handleCancel}>
                    取消
                </Button>
            </div>
        </Index>
    ) : null;
}

export default CellStyleSetting;
