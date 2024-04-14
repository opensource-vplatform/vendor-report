import {
    hideTab,
    setBindRange,
    setCallbackId,
    setSetting,
    setVisible,
    setActive,
} from '@store/cellSettingSlice';

import { genUUID } from './commonUtil';
import { diff, isNullOrUndef } from './objectUtil';
import { getNamespace } from './spreadUtil';

const HANDLER_CONTIANER = {};

export const show = function (dispatch, options) {
    const {
        onConfirm = function () {},
        onCancel = function () {},
        hideCodes = [],
        setting = {},
        bindRange = true,
        active = 'number',
    } = options;
    const callbackId = genUUID();
    HANDLER_CONTIANER[callbackId] = {
        onConfirm,
        onCancel,
    };
    hideCodes.forEach((code) => {
        dispatch(hideTab(code));
    });
    dispatch(setActive(active));
    dispatch(setCallbackId(callbackId));
    dispatch(setBindRange(bindRange));
    dispatch(setSetting(setting));
    dispatch(setVisible(true));
};

const handleCallback = function (callbackId, type, ...args) {
    const callback = HANDLER_CONTIANER[callbackId];
    if (callback) {
        const handler = callback[type];
        if (handler) {
            handler(...args);
        }
        HANDLER_CONTIANER[type] = null;
        delete HANDLER_CONTIANER[type];
    }
};

export const onConfirm = function (callbackId, ...args) {
    handleCallback(callbackId, 'onConfirm', ...args);
};

export const onCancel = function (callbackId, ...args) {
    handleCallback(callbackId, 'onCancel', ...args);
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
        const except = getDisabledKeys(setting?.font);
        const diffRes = diff(Border_Setting, borderSetting, [
            'lineBorder',
            ...except,
        ]);
        if (diffRes !== null) {
            result = result ? result : {};
            result.borderSetting = diffRes;
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
    const { fontSetting, alignSetting, borderSetting, numberSetting } =
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
    return style;
};
