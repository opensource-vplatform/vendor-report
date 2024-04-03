import { getNamespace } from '@utils/spreadUtil';

export const getStyleDatas = function () {
    return [
        {
            value: 'lightRedFill_DarkRedText',
            text: '浅红填充色深红色文本',
        },
        {
            value: 'yellowFill_DarkYellowText',
            text: '黄填充色深黄色文本',
        },
        {
            value: 'greenFill_DarkGreenText',
            text: '绿填充色深绿色文本',
        },
        { value: 'lightRedFill', text: '浅红色填充' },
        { value: 'redText', text: '红色文本' },
        { value: 'redBorder', text: '红色边框' },
        { value: 'customFormat', text: '自定义格式...' },
    ];
};

const STYLES = {
    lightRedFill_DarkRedText: function () {
        const GC = getNamespace();
        const style = new GC.Spread.Sheets.Style();
        style.backColor = '#FFB6C1';
        style.foreColor = '#8B0000';
        return style;
    },
    yellowFill_DarkYellowText: function () {
        const GC = getNamespace();
        const style = new GC.Spread.Sheets.Style();
        style.backColor = '#F0E68C';
        style.foreColor = '#BDB76B';
        return style;
    },
    greenFill_DarkGreenText: function () {
        const GC = getNamespace();
        const style = new GC.Spread.Sheets.Style();
        style.backColor = '#90EE90';
        style.foreColor = '#006400';
        return style;
    },
    lightRedFill: function () {
        const GC = getNamespace();
        const style = new GC.Spread.Sheets.Style();
        style.backColor = '#FFB6C1';
        return style;
    },
    redText: function () {
        const GC = getNamespace();
        const style = new GC.Spread.Sheets.Style();
        style.foreColor = '#8B0000';
        return style;
    },
    redBorder: function () {
        const GC = getNamespace();
        const style = new GC.Spread.Sheets.Style();
        style.borderLeft = new GC.Spread.Sheets.LineBorder(
            '#8B0000',
            GC.Spread.Sheets.LineStyle.thin
        );
        style.borderRight = new GC.Spread.Sheets.LineBorder(
            '#8B0000',
            GC.Spread.Sheets.LineStyle.thin
        );
        style.borderBottom = new GC.Spread.Sheets.LineBorder(
            '#8B0000',
            GC.Spread.Sheets.LineStyle.thin
        );
        style.borderTop = new GC.Spread.Sheets.LineBorder(
            '#8B0000',
            GC.Spread.Sheets.LineStyle.thin
        );
        return style;
    },
};

export const getStyle = function (key) {
    return STYLES[key]();
};

export const getDuplicateOptions = function () {
    return [
        {
            value: 'duplicateRule',
            text: '重复',
        },
        {
            value: 'uniqueRule',
            text: '唯一',
        },
    ];
};

export const getDateOptions = function () {
    return [
        { value: 'yesterday', text: '昨天' },
        { value: 'today', text: '今天' },
        { value: 'tomorrow', text: '明天' },
        { value: 'last7days', text: '最近7天' },
        { value: 'lastweek', text: '上周' },
        { value: 'thisweek', text: '本周' },
        { value: 'nextweek', text: '下周' },
        { value: 'lastmonth', text: '上个月' },
        { value: 'thismonth', text: '本月' },
        { value: 'nextmonth', text: '下个月' },
    ];
};

export const getFormatTypes = function () {
    return [
        { value: 'formatOnValue', text: '►基于各自值设置所有单元格的格式' },
        { value: 'formatContain', text: '►只为包含以下内容的单元格设置格式' },
        { value: 'formatRankedValue', text: '►仅对排名靠前或靠后的数值设置格式' },
        { value: 'formatAbove', text: '►仅对高于或低于平均值的数值设置格式' },
        { value: 'formatUnique', text: '►仅对唯一值或重复值设置格式' },
        { value: 'useFormula', text: '►使用公式确定要设置格式的单元格' },
        { value: 'useRowColumnStates', text: '►使用状态确定要设置格式的行或者列' },
    ];
};
