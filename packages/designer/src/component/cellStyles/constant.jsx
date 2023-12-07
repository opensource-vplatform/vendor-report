export const Categories = {
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
export const FormatNumber = {
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

export const AccountingSymbol = [
    ['无', null, null],
    ['$', '$', 'en-US'],
    ['¥(Chinese)', '¥', 'zh-cn'],
    ['¥(Japanese)', '¥', 'ja-jp'],
    ['₩(Korean)', '₩', 'ko-kr'],
];
export const LocaleType = {
    en_us: '英语(美国)',
    ja_jp: '日语',
};
export const TimeFormats = [
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
export const DateFormats = [
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

export const FractionType = [
    '分母为一位数(1/4)',
    '分母为两位数(21/25)',
    '分母为三位数(312/943)',
    '以2为分母(1/2)',
    '以4为分母(2/4)',
    '以8为分母(4/8)',
    '以16为分母(8/16)',
    '以10为分母(3/10)',
    '百分之几(30/100)',
];
// 有待验证
export const currencyNegativeNumbers = {
    number1: '-1,234.10',
    'red:number2': '1,234.10',
    number3: '-1,234.10',
    'red:number4': '-1,234.10',
};

export const specialFormats = [
    '00000',
    '00000-0000',
    '[<=9999999]###-####;(###) ###-####',
    '000-00-0000',
];
