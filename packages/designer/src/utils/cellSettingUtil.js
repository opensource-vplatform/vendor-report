import {
  hideTab,
  setActive,
  setAlignSetting,
  setBindRange,
  setBorderSetting,
  setCallbackId,
  setFillSetting,
  setFontSetting,
  setSetting,
  setSingleCell,
  setVisible,
} from '@store/cellSettingSlice';

import {
  addCallback,
  handleCancel,
  handleConfirm,
} from './callbackUtil';
import {
  diff,
  isNullOrUndef,
  isObject,
} from './objectUtil';
import { getNamespace } from './spreadUtil';

export const show = function (dispatch, options) {
    const {
        onConfirm = function () {},
        onCancel = function () {},
        hideCodes = [],
        setting = {},
        bindRange = true,
        cellSetting = {},
        active = 'number',
    } = options;
    const callbackId = addCallback(onConfirm,onCancel);
    hideCodes.forEach((code) => {
        dispatch(hideTab(code));
    });
    dispatch(setActive(active));
    dispatch(setCallbackId(callbackId));
    dispatch(setBindRange(bindRange));
    if(!bindRange){
        dispatch(setSingleCell(true));
    }
    dispatch(setSetting(setting));
    if(isObject(cellSetting.alignSetting)){
        dispatch(setAlignSetting(cellSetting.alignSetting));
    }
    if(isObject(cellSetting.fontSetting)){
        dispatch(setFontSetting(cellSetting.fontSetting));
    }
    if(isObject(cellSetting.borderSetting)){
        dispatch(setBorderSetting(cellSetting.borderSetting));
    }
    if(!isNullOrUndef(cellSetting.fillSetting)){
        dispatch(setFillSetting(cellSetting.fillSetting));
    }
    dispatch(setVisible(true));
};

export const onConfirm = function (callbackId, ...args) {
    handleConfirm(callbackId,...args);
};

export const onCancel = function (callbackId, ...args) {
    handleCancel(callbackId,...args);
};

const Number_Setting = {
    category: 'general',
    //小数位数
    decimalPlacesValue: 2,
    //是否使用千分符
    useThousandSeparator: false,
    //货币符号
    currencySymbol: '',
    //格式
    format: 'number1',
    //区域
    locale: 'zh_cn',
    //格式设置
    formatter: null,
};

export const getNumberSetting = function () {
    return Number_Setting;
};

export const numberSettingToFormat = function (numberSetting) {
    const {
        category,
        format,
        useThousandSeparator,
        decimalPlacesValue,
        currencySymbol,
    } = numberSetting;
    let formatStr = format;
    if (category === 'numbers' || category === 'currency') {
        const decimals =
            decimalPlacesValue > 0
                ? '0.' + '0'.repeat(numberSetting.decimalPlacesValue)
                : '0';
        const thousandsSep = useThousandSeparator ? '#,##' : '';
        switch (format) {
            case 'number1':
                formatStr = `${currencySymbol}${thousandsSep}${decimals}_);-${currencySymbol}${thousandsSep}${decimals}`;
                break;
            case 'rednumber2':
                formatStr = `${currencySymbol}${thousandsSep}${decimals};[Red]${currencySymbol}${thousandsSep}${decimals}`;
                break;
            case 'number3':
                formatStr = `${currencySymbol}${thousandsSep}${decimals};(${currencySymbol}${thousandsSep}${decimals})`;
                break;
            case 'rednumber4':
                formatStr = `${currencySymbol}${thousandsSep}${decimals};([Red]${currencySymbol}${thousandsSep}${decimals})`;
                break;

            default:
                formatStr = `${currencySymbol}${thousandsSep}${decimals}`;
                break;
        }
    } else if (category === 'percentage') {
        //处理百分比
        formatStr =
            decimalPlacesValue > 0
                ? `0.${'0'.repeat(decimalPlacesValue)}%`
                : '0%';
    } else if (category === 'accounting') {
        // 处理货币
        formatStr =
            decimalPlacesValue > 0
                ? `${currencySymbol}.${'0'.repeat(decimalPlacesValue)}`
                : currencySymbol;
    } else if (category === 'scientific') {
        // 处理科学计数
        formatStr =
            decimalPlacesValue > 0
                ? `0.${'0'.repeat(decimalPlacesValue)}E+00`
                : '0E+00';
    }
    return formatStr;
};

const Align_Setting = {
    hAlign: 3, //水平对齐：常规
    vAlign: 0, //垂直对齐：靠上
    textIndent: 0, //缩进
    wordWrap: false, //自动换行
    shrinkToFit: false, //缩小字体填充
    isMergeCells: false, //合并单元格
    showEllipsis: false, //显示省略号
    textOrientation: 0, //度
};

export const getAlignSetting = function () {
    return Align_Setting;
};

const Font_Setting = {
    fontFamily: 'Calibri', //字体
    fontWeight: null,
    fontStyle: null,
    fontSize: 11,
    textDecoration: 0,
    foreColor: 'rgb(0,0,0)',
};

export const getFontSetting = function () {
    return Font_Setting;
};

const Border_Setting = {
    lineBorder: {
        color: 'rgb(0,0,0)',
        style: 1,
    },
    borderLeft: null,
    borderTop: null,
    borderBottom: null,
    borderRight: null,
    innerHorizontal: null,
    innerVertical: null,
    //对角线\
    diagonalDown: null,
    //对角线/
    diagonalUp: null,
};

export const getBorderSetting = function () {
    return Border_Setting;
};

const Fill_Setting = {
    //背景色
    backgroundColor: null,
    //图案颜色
    patternColor: null,
    //图案样式
    type: null
}

export const getFillSetting = function(){
    return Fill_Setting;
}

const getDisabledKeys = function (setting) {
    const result = [];
    if (setting) {
        Object.keys(setting).forEach((key) => {
            if (setting[key] === false) {
                result.push(key);
            }
        });
    }
    return result;
};

export const getSetting = function (cellSettingSlice) {
    const {
        numberSetting,
        alignSetting,
        fontSetting,
        borderSetting,
        fillSetting,
        hideCodes,
        setting,
    } = cellSettingSlice;
    let result = null;
    if (hideCodes.indexOf('number') == -1) {
        if (numberSetting.formatter !== null) {
            result = result ? result : {};
            result.numberSetting = { formatter: numberSetting.formatter };
        }
    }
    if (hideCodes.indexOf('align') == -1) {
        const except = getDisabledKeys(setting?.align);
        const diffRes = diff(Align_Setting, alignSetting, except);
        if (diffRes !== null) {
            result = result ? result : {};
            result.alignSetting = diffRes;
        }
    }
    if (hideCodes.indexOf('font') == -1) {
        const except = getDisabledKeys(setting?.font);
        const diffRes = diff(Font_Setting, fontSetting, except);
        if (diffRes !== null) {
            result = result ? result : {};
            result.fontSetting = diffRes;
        }
    }
    if (hideCodes.indexOf('border') == -1) {
        const except = getDisabledKeys(setting?.border);
        const diffRes = diff(Border_Setting, borderSetting, [
            'lineBorder',
            ...except,
        ]);
        if (diffRes !== null) {
            result = result ? result : {};
            result.borderSetting = diffRes;
        }
    }
    if(hideCodes.indexOf('fill') == -1){
        const except = getDisabledKeys(setting?.fill)
        const diffRes = diff(Fill_Setting, fillSetting, except);
        if (diffRes !== null) {
            result = result ? result : {};
            result.fillSetting = diffRes;
        }
    }
    return result;
};

export const format = function (format, value) {
    if (isNullOrUndef(format)) {
        return value;
    }
    const GC = getNamespace();
    const formatter = new GC.Spread.Formatter.GeneralFormatter(format);
    return formatter.format(value);
};

export const cellSettingSliceToConditionStyle = function (cellSettingSlice) {
    const { fontSetting, alignSetting, borderSetting, numberSetting, fillSetting } =
        cellSettingSlice;
    let style = null;
    if (fontSetting) {
        style = { ...fontSetting };
    }
    if (numberSetting && numberSetting.formatter) {
        style = style ? style : {};
        style = { ...style, formatter: numberSetting.formatter };
    }
    if (alignSetting) {
        style = style ? style : {};
        style = { ...alignSetting, ...style };
    }
    if (borderSetting) {
        style = style ? style : {};
        style = { ...borderSetting, ...style };
    }
    if(fillSetting&&fillSetting.backgroundColor){
        style = style ? style : {};
        style.backColor = fillSetting.backgroundColor;//{...fillSetting}
    }
    return style;
};

const fill = function(style,defaultSetting){
    const result = {};
    for(let [key,val] of Object.entries(defaultSetting)){
        const newVal = style[key];
        result[key] = isNullOrUndef(newVal) ? val:newVal;
    }
    return result;
}

export const jsonStyleToCellSetting = function(style={}){
    const cellSetting = {};
    cellSetting.alignSetting = fill(style,Align_Setting);
    cellSetting.fontSetting = fill(style,Font_Setting);
    cellSetting.borderSetting = fill(style,Border_Setting);
    const backColor = style.backColor;
    cellSetting.fillSetting = backColor;
    return cellSetting;
}
