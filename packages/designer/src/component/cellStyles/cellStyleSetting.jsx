import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Index from '../dialog/Index';
import Tab from '../tabs/Tab';
import Tabs from '../tabs/Tabs';
import Integer from '../integer/Index';
import './CellStyleSetting.scss';
function CellStyleSetting(props) {
    const categories = {
        general: '常规',
        numbers: '数值',
        currency: '货币',
        accounting: '会计专用',
        date: '日期',
        time: '时间',
        percentage: '百分比',
        fraction: '分数',
        scientific: '科学记数',
        text: '文本',
        special: '特殊',
        custom: '自定义',
    };
    const formatNumber = {
        general: '常规单元格格式不包含任何特定的数字格式。',
        numbers:
            '数值格式用于一般数字的表示。货币和会计格式则提供货币值计算的专用格式。',
        currency:
            '货币格式用于表示一般货币数值。会计格式可以对一列数值进行小数点对齐。',
        accounting: '会计格式可对一列数值进行货币符号和小数点对齐。',
        date: '日期格式将日期和时间系列数值显示为日期值。',
        time: '时间格式将日期和时间系列数值显示为时间值。',
        percentage: '百分比格式将单元格中数值乘以100，并以百分数形式显示。',
        text: '在文本单元格格式中，数字作为文本处理。单元格显示的内容与输入的内容完全一致。',
        special: '特殊格式可用于跟踪数据列表及数据库的值。',
        custom: '以现有格式为基础，生成自定义的数字格式。',
    };
    const accountingSymbol = [
        ['无', null, null],
        ['$', '$', 'en-US'],
        ['¥(Chinese)', '¥', 'zh-cn'],
        ['¥(Japanese)', '¥', 'ja-jp'],
        ['₩(Korean)', '₩', 'ko-kr'],
    ];
    const localeType = {
        en_us: '英语(美国)',
        ja_jp: '日语',
    };
    const timeFormats = [
        '[$-F400]h:mm:ss AM/PM',
        'h:mm;@',
        '[$-409]h:mm AM/PM;@',
        'h:mm:ss;@',
        '[$-409]h:mm:ss AM/PM;@',
        'mm:ss.0;@',
        '[h]:mm:ss;@',
        '[$-409]m/d/yy h:mm AM/PM;@',
        'm/d/yy h:mm;@',
    ];
    const dateFormats = [
        'm/d/yyyy',
        '[$-F800]dddd, mmmm dd, yyyy',
        'm/d;@',
        'm/d/yy;@',
        'mm/dd/yy;@',
        '[$-409]d-mmm;@',
        '[$-409]d-mmm-yy;@',
        '[$-409]dd-mmm-yy;@',
        '[$-409]mmm-yy;@',
        '[$-409]mmmm-yy;@',
        '[$-409]mmmm d, yyyy;@',
        '[$-409]m/d/yy h:mm AM/PM;@',
        'm/d/yy h:mm;@',
        '[$-409]mmmmm;@',
        '[$-409]mmmmm-yy;@',
        'm/d/yyyy;@',
        '[$-409]d-mmm-yyyy;@',
    ];

    let firstCellValue = null;
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [decimalPlacesValue, setDecimalPlacesValue] = useState(2);
    const [selectedValue, setSelectedValue] = useState('general');
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

    useEffect(() => {
        if (!firstCellValue) return;
        // 当选择的是百分比，则初始化时示例值将百分号加到第一个值后面
        if (selectedValue === 'percentage') {
            const value = formatNumberDecimal(
                firstCellValue,
                decimalPlacesValue
            );
            setExampleValue(value.concat('', '%'));
            return;
        }
        const value = formatNumberDecimal(firstCellValue, decimalPlacesValue);
        setExampleValue(value);
    }, [firstCellValue]);

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

    /*  const Tabs = ({ children }) => {
        const [activeTab, setActiveTab] = useState(0);

        const handleClick = (index) => {
            setActiveTab(index);
        };

        return (
            <div className='tabBox'>
                <div className='header'>
                    {React.Children.map(children, (child, index) => (
                        <button
                            onClick={() => handleClick(index)}
                            className={
                                index === activeTab
                                    ? 'activeTab'
                                    : 'unActiveTab'
                            }
                        >
                            {child.props.label}
                        </button>
                    ))}
                </div>
                <div className='content'>
                    {React.Children.toArray(children)[activeTab]}
                </div>
            </div>
        );
    };

    const TabPane = ({ children }) => {
        return <>{children}</>;
    }; */

    const handleSelectChange = (event) => {
        const selectedOptionValue = event.target.value;
        setSelectedValue(selectedOptionValue);
    };

    // 处理千位分隔符
    const handleCheckboxChange = (event) => {
        setCheckboxOfThousandSeparator(event.target.checked);
        if (!exampleValue) {
            return;
        } else if (event.target.checked === false) {
            if (typeof exampleValue === 'number') {
                return;
            }
            const stringWithoutCommas = exampleValue.replace(/,/g, '');
            const numberValue = parseFloat(stringWithoutCommas);
            setExampleValue(numberValue);
        } else {
            const newValue = exampleValue
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            console.log('newValue :>> ', newValue);
            setExampleValue(newValue);
        }
    };

    // 处理小数位数
    function formatNumberDecimal(number, decimalPlaces) {
        // 将数字转换为字符串
        const numberString = number.toString();

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
        return newValue;
    }

    const handleDecimalValue = (decimalPlaces) => {
        setDecimalPlacesValue(decimalPlaces);
        if (!exampleValue) {
            return;
        }
        const newValue = formatNumberDecimal(firstCellValue, decimalPlaces);
        if (selectedValue === 'percentage') {
            setExampleValue(newValue.concat('', '%'));
            return;
        }
        setExampleValue(newValue);
    };

    return isOpen ? (
        <Index
            title='设置单元格格式'
            width='730px'
            height='630px'
            open={true}
            mask={true}
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
                                onChange={handleSelectChange}
                            >
                                <option value='general'>常规</option>
                                <option value='numbers'>数字</option>
                                <option value='currency'>货币</option>
                                <option value='accounting'>会计专用</option>
                                <option value='date'>日期</option>
                                <option value='time'>时间</option>
                                <option value='percentage'>百分比</option>
                                <option value='fraction'>分数</option>
                                <option value='scientific'>科学计数</option>
                                <option value='text'>文本</option>
                                <option value='special'>特殊</option>
                                <option value='custom'>自定义</option>
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
                                        // value={selectedValue}
                                    >
                                        <option value='general'>￥</option>
                                        <option value='numbers'>$</option>
                                        <option value='currency'>K</option>
                                        <option value='accounting'>
                                            会计专用
                                        </option>
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
                                        <option value='xxxx'>xxxx</option>
                                        <option value='xxx'>xxx</option>
                                        <option value='xx'>xx</option>
                                        <option value='x'>x</option>
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
                                    >
                                        <option value='xxxx'>xxxx</option>
                                        <option value='xxx'>xxx</option>
                                        <option value='xx'>xx</option>
                                        <option value='x'>x</option>
                                        <option value='xxxx'>xxxx</option>
                                        <option value='xxx'>xxx</option>
                                        <option value='xx'>xx</option>
                                        <option value='x'>x</option>
                                    </select>
                                </div>
                            )}
                            {(selectedValue === 'date' ||
                                selectedValue === 'time' ||
                                selectedValue === 'special') && (
                                <div>
                                    <span>区域设置（国家/地区）: </span>
                                    <select name='locale' id='locale' size={1}>
                                        <option value='xxx'>xxx</option>
                                        <option value='xx'>xx</option>
                                        <option value='x'>x</option>
                                    </select>
                                </div>
                            )}
                        </div>
                        <div className='bottomArea'>
                            <span>{formatNumber[selectedValue]}</span>
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
        </Index>
    ) : null;
}

export default CellStyleSetting;
