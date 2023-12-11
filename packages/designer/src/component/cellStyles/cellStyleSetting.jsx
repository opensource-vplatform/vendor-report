import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GC from '@grapecity/spread-sheets';
import {} from '@grapecity/spread-sheets';
import Index from '../dialog/Index';
import Tab from '../tabs/Tab';
import Tabs from '../tabs/Tabs';
import Integer from '../integer/Index';
import Button from '../button/Index';
import DropdownBox from '../dropdownBox/dropdownBox';
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
} from './constant';
import './CellStyleSetting.scss';
function CellStyleSetting(props) {
    let firstCellValue = null;
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [decimalPlacesValue, setDecimalPlacesValue] = useState(2);
    const [selectedValue, setSelectedCategoriesValue] = useState('general');
    const [selectedSymbol, setSelectedSymbol] = useState('');
    const [selectedTimeFormat, setSelectedTimeFormat] = useState('1:30:00 PM');
    const [exampleValue, setExampleValue] = useState(
        firstCellValue ? firstCellValue : '12345'
    );
    const [checkboxOfThousandSeparator, setCheckboxOfThousandSeparator] =
        useState(false);

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

    // 获取并初始化单元格值
    // useEffect(() => {
    //     if (!firstCellValue) return;
    //     setExampleValue(firstCellValue);
    // }, [firstCellValue, selectedValue]);

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
            //设置所选的单元格格式
            // let style = new GC.Spread.Sheets.Style();
            // style.name = 'style1';
            // style.backColor = 'red';
            // 获取所选的单元格
            // let sheet = spread.getActiveSheet();
            // sheet.suspendPaint();
            // let selections = sheet.getSelections();
            // let selectionIndex = 0,
            //     selectionCount = selections.length;
            // for (; selectionIndex < selectionCount; selectionIndex++) {
            //     let selection = selections[selectionIndex];
            //     for (
            //         let i = selection.row;
            //         i < selection.row + selection.rowCount;
            //         i++
            //     ) {
            //         for (
            //             let j = selection.col;
            //             j < selection.col + selection.colCount;
            //             j++
            //         ) {
            //             sheet.setStyle(
            //                 i,
            //                 j,
            //                 style,
            //                 GC.Spread.Sheets.SheetArea.viewport
            //             );
            //         }
            //     }
            // }
            // sheet.resumePaint();
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

    const handleSelectCategoriesChange = (event) => {
        const selectedOptionValue = event.target.value;
        setSelectedCategoriesValue(selectedOptionValue);
    };
    const handleSelectSymbolChange = (event) => {
        const selectedSymbolValue = event.target.value;
        setSelectedSymbol(selectedSymbolValue);
    };

    // 处理千位分隔符
    const handleCheckboxChange = (event) => {
        setCheckboxOfThousandSeparator(event.target.checked);
    };

    const handleTimeFonmatChange = (event) => {
        const selectedTimeFormat = event.target.value;
        setSelectedTimeFormat(selectedTimeFormat);
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
            currencyFormat = '¥#,##0';
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

    // 格式化时间方法
    function formatData(formatString) {
        // 获取所选的单元格
        let sheet = spread.getActiveSheet();
        sheet.suspendPaint();
        let selections = sheet.getSelections();
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
        // 返回第一个作为示例值
        return sheet.getText(selections[0].row, selections[0].col);
    }

    const handleOK = () => {
        setIsOpen(false);
        setSelectedCategoriesValue('general');
    };
    const handleCancel = () => {
        setIsOpen(false);
        setSelectedCategoriesValue('general');
    };
    const handleClose = () => {
        setIsOpen(false);
        setSelectedCategoriesValue('general');
    };

    useEffect(() => {
        let tempValue = firstCellValue ? firstCellValue : '12345';
        if (selectedValue === 'numbers') {
            tempValue = formatThousandSeparator(
                tempValue,
                checkboxOfThousandSeparator
            );
        }

        // 处理小数
        if (
            selectedValue === 'currency' ||
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
        if (selectedValue === 'currency' || selectedValue === 'accounting') {
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
                <Tabs value='数字'>
                    {/* 可以抽成组件 <numberFormat>*/}
                    <Tab code='数字' title='数字'>
                        <p>分类：</p>
                        <div className='leftArea'>
                            <select
                                name='categoryList'
                                id='categoryList'
                                size={16}
                                value={selectedValue}
                                onChange={handleSelectCategoriesChange}
                            >
                                {Object.keys(Categories).map((key) => (
                                    <option key={key} value={key}>
                                        {Categories[key]}
                                    </option>
                                ))}
                            </select>
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
                                    ></Integer>
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
                                    <select
                                        name='currencySelect'
                                        id='currencySelect'
                                        size={1}
                                        value={selectedSymbol}
                                        onChange={handleSelectSymbolChange}
                                    >
                                        {AccountingSymbol.map((item, index) => (
                                            <option
                                                key={`currency${index}`}
                                                value={item[1]}
                                            >
                                                {item[0]}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            {(selectedValue === 'numbers' ||
                                selectedValue === 'currency') && (
                                <div>
                                    <span>负数：</span>
                                    <select
                                        name='negative-number-list'
                                        id='negative-number-list'
                                        size={6}
                                    >
                                        {Object.keys(
                                            CurrencyNegativeNumbers
                                        ).map((key) => {
                                            let negative =
                                                formatNumberDecimal();
                                            const symbol = selectedSymbol
                                                ? selectedSymbol.split('')[0]
                                                : '';

                                            return (
                                                <option
                                                    key={key}
                                                    className={
                                                        key.includes('red')
                                                            ? 'redNumer'
                                                            : null
                                                    }
                                                    value={key}
                                                >
                                                    {`${symbol}${negative}`}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            )}
                            {(selectedValue === 'date' ||
                                selectedValue === 'time' ||
                                selectedValue === 'fractionType' ||
                                selectedValue === 'special' ||
                                selectedValue === 'custom') && (
                                <div>
                                    <span>类型：</span>
                                    <select
                                        name='negative-number-list'
                                        id='negative-number-list'
                                        size={4}
                                        value={selectedTimeFormat}
                                        onChange={handleTimeFonmatChange}
                                    >
                                        {selectedValue === 'time' &&
                                            Object.keys(TimeFormats).map(
                                                (key) => (
                                                    <option
                                                        key={key}
                                                        value={key}
                                                    >
                                                        {key.toLocaleString()}
                                                    </option>
                                                )
                                            )}
                                        {selectedValue === 'date' &&
                                            Object.values(DateFormats).map(
                                                (value) => (
                                                    <option
                                                        key={value}
                                                        value={value}
                                                    >
                                                        {value.toLocaleString()}
                                                    </option>
                                                )
                                            )}
                                        {selectedValue === 'fractionType' &&
                                            Object.values(FractionType).map(
                                                (value) => (
                                                    <option
                                                        key={value}
                                                        value={value}
                                                    >
                                                        {value.toLocaleString()}
                                                    </option>
                                                )
                                            )}
                                        {selectedValue === 'special' &&
                                            Object.values(SpecialFormats).map(
                                                (value) => (
                                                    <option
                                                        key={value}
                                                        value={value}
                                                    >
                                                        {value.toLocaleString()}
                                                    </option>
                                                )
                                            )}
                                        {selectedValue === 'custom' &&
                                            Object.values(CustomFormats).map(
                                                (value) => (
                                                    <option
                                                        key={value}
                                                        value={value}
                                                    >
                                                        {value.toLocaleString()}
                                                    </option>
                                                )
                                            )}
                                    </select>
                                </div>
                            )}
                            {(selectedValue === 'date' ||
                                selectedValue === 'time' ||
                                selectedValue === 'special') && (
                                <div>
                                    <span>区域设置（国家/地区）: </span>
                                    <select name='locale' id='locale' size={1}>
                                        {/* {Object.keys(LocaleType).map((key) => (
                                            <option key={key} value={key}>
                                                {LocaleType[key]}
                                            </option>
                                            
                                        ))} */}
                                        <option key={1} value={1}>
                                            {'英语(美国)'}
                                        </option>
                                    </select>
                                </div>
                            )}
                        </div>
                        <div className='bottomArea'>
                            <span>{FormatNumber[selectedValue]}</span>
                        </div>
                    </Tab>
                    <Tab code='对齐' title='对齐'>
                        <p>Content for Sheet 2</p>
                    </Tab>
                    <Tab code='字体' title='字体'>
                        <p>Content for Sheet 3</p>
                    </Tab>
                    <Tab code='边框' title='边框'>
                        <p>Content for 边框</p>
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
