import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GC from '@grapecity/spread-sheets';
import {} from '@grapecity/spread-sheets';
import Index from '../dialog/Index';
import Tab from '../tabs/Tab';
import Tabs from '../tabs/Tabs';
import Integer from '../integer/Index';
import Button from '../button/Index';
import {
    Categories,
    FormatNumber,
    AccountingSymbol,
    LocaleType,
    TimeFormats,
    DateFormats,
    CurrencyNegativeNumbers,
    SpecialFormats,
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
            let style = new GC.Spread.Sheets.Style();
            style.name = 'style1';
            style.backColor = 'red';
            // 获取所选的单元格
            let sheet = spread.getActiveSheet();
            sheet.suspendPaint();
            let selections = sheet.getSelections();
            let selectionIndex = 0,
                selectionCount = selections.length;
            for (; selectionIndex < selectionCount; selectionIndex++) {
                let selection = selections[selectionIndex];
                for (
                    let i = selection.row;
                    i < selection.row + selection.rowCount;
                    i++
                ) {
                    for (
                        let j = selection.col;
                        j < selection.col + selection.colCount;
                        j++
                    ) {
                        sheet.setStyle(
                            i,
                            j,
                            style,
                            GC.Spread.Sheets.SheetArea.viewport
                        );
                    }
                }
            }
            sheet.resumePaint();
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
        if (!number) {
            return number;
        }
        number = number.toString();
        if (isCheck === false) {
            const stringWithoutCommas = number.replace(/,/g, '');
            return parseFloat(stringWithoutCommas);
        } else {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    }

    //格式化货币字符
    function formatCurrencySymbol(number, symbol) {
        if (!number) return;
        let numberString = number.toString();
        if (symbol === '') {
            if (
                numberString.includes('$') ||
                numberString.includes('¥') ||
                numberString.includes('₩')
            ) {
                numberString = numberString.replace(/[$¥₩]/g, '');
                return numberString;
            } else {
                return numberString;
            }
        } else {
            if (
                numberString.includes('$') ||
                numberString.includes('¥') ||
                numberString.includes('₩')
            ) {
                return numberString;
            } else {
                let value = symbol.split('')[0].concat('', numberString);
                return value;
            }
        }
    }

    // 格式化小数位数
    function formatNumberDecimal(number, decimalPlaces) {
        // if (isNaN(number)) {
        //     return number;
        // }
        if (!number) return;
        // 将数字转换为字符串
        let numberString = number.toString();
        // 兼容带括号字符串处理
        let isIncludedBracket = numberString.includes('(');
        if (isIncludedBracket) {
            numberString = numberString.replace(/\(|\)/g, '');
        }
        // 检查是否存在小数点
        const hasDecimal = numberString.includes('.');

        // 如果不存在小数点，或者整数部分为空，则直接加上指定小数位数的小数点和零
        if (!hasDecimal || numberString.split('.')[0] === '') {
            // 如果小数部分为空，则直接返回整数部分
            if (decimalPlaces === 0) {
                return numberString.split('.')[0];
            }
            const newValue = numberString + '.' + '0'.repeat(decimalPlaces);
            return newValue;
        }

        // 如果存在小数点，进行切割
        const [integerPart, decimalPart] = numberString.split('.');

        // 补零到指定小数位数
        const paddedDecimalPart = decimalPart.padEnd(decimalPlaces, '0');

        // 如果小数部分的位数超过指定的小数位数，则截取小数部分
        const truncatedDecimalPart = paddedDecimalPart.slice(0, decimalPlaces);

        const newValue = integerPart + '.' + truncatedDecimalPart;
        if (decimalPlaces === 0) {
            return numberString.split('.')[0];
        }
        if (isIncludedBracket) {
            return `(${newValue})`;
        }
        return newValue;
    }
    // 处理小数位数
    const handleDecimalValue = (decimalPlaces) => {
        setDecimalPlacesValue(decimalPlaces);
    };

    // 格式化时间方法
    function formatTime(timeStr, formatKey) {
        // 创建Globalize实例
        let globalize = new Globalize();

        // 设置时间格式
        globalize.dateTimeFormat = TimeFormats[formatKey];

        // let culture = new GC.Spread.Common.CultureInfo();

        //     culture.DateTimeFormat = TimeFormats[formatKey];

        //     let formattedTime = culture.format(new Date(timeStr));
        //     console.log('formattedTime :>> ', formattedTime);
        return globalize.format(timeStr);
    }

    const handleApply = () => {
        setIsOpen(false);
    };
    const handleCancel = () => {
        setIsOpen(false);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        let tempValue = firstCellValue;
        tempValue = formatThousandSeparator(
            tempValue,
            checkboxOfThousandSeparator
        );

        //处理小数
        tempValue = formatNumberDecimal(tempValue, decimalPlacesValue);

        if (selectedValue === 'percentage') {
            tempValue = tempValue.concat('', '%');
            if (decimalPlacesValue === 0)
                tempValue = tempValue.slice(0, tempValue.length - 1);
        }

        //处理货币
        if (selectedValue === 'currency' || 'accounting') {
            tempValue = formatCurrencySymbol(tempValue, selectedSymbol);
        }

        // 处理时间格式
        if (selectedValue === 'time') {
            if (tempValue !== '') {
                tempValue = formatTime(tempValue, selectedTimeFormat);
            }
        }

        setExampleValue(tempValue);
    }, [
        decimalPlacesValue,
        checkboxOfThousandSeparator,
        selectedValue,
        selectedSymbol,
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
                                                value={item[0]}
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
                                            let negative = formatNumberDecimal(
                                                CurrencyNegativeNumbers[key],
                                                decimalPlacesValue
                                            );
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
                                selectedValue === 'fraction' ||
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
                                                        {TimeFormats[key]}
                                                    </option>
                                                )
                                            )}
                                        {selectedValue === 'date' &&
                                            Object.keys(DateFormats).map(
                                                (key) => (
                                                    <option
                                                        key={key}
                                                        value={key}
                                                    >
                                                        {DateFormats[key]}
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
                                        {Object.keys(LocaleType).map((key) => (
                                            <option key={key} value={key}>
                                                {LocaleType[key]}
                                            </option>
                                        ))}
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
                </Tabs>{' '}
            </div>

            <div className='bottomButtons'>
                <Button title={'确定'} onClick={handleApply}>
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
