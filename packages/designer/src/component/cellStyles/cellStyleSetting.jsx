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
} from './constant';
import './CellStyleSetting.scss';
import List from '../list/List';
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
        setDecimalPlacesValue(0);
        setSelectedSymbol('');
        setSelectedTimeFormat('');
    };
    const handleClose = () => {
        setIsOpen(false);

        setDecimalPlacesValue(0);
        setSelectedSymbol('');
        setSelectedTimeFormat('');
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
                    formatString = `[Red]${currency}${thousandsSep}${decimals};[Red]${currency}${thousandsSep}${decimals}`;
                    break;
                case 'number3':
                    formatString = `(${currency}${thousandsSep}${decimals});(${currency}${thousandsSep}${decimals})`;
                    break;
                case 'rednumber4':
                    formatString = `([Red]${currency}${thousandsSep}${decimals});([Red]${currency}${thousandsSep}${decimals})`;
                    break;

                default:
                    formatString = `${thousandsSep}${decimals}`;
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
                                            margin: '5px 0px',
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
                                        onChange={handleTimeFormatChange}
                                        value={selectedTimeFormat}
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
