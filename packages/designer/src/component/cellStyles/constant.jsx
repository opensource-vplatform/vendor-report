export const Categories = {
    general: '常规',
    numbers: '数值',
    currency: '货币',
    accounting: '会计专用',
    date: '日期',
    time: '时间',
    percentage: '百分比',
    fractionType: '分数',
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
    fractionType: '分数格式将数值以分数形式显示。',
    scientific: '科学记数格式将数值以科学记数法显示。',
    text: '在文本单元格格式中，数字作为文本处理。单元格显示的内容与输入的内容完全一致。',
    special: '特殊格式可用于跟踪数据列表及数据库的值。',
    custom: '以现有格式为基础，生成自定义的数字格式。',
};

export const AccountingSymbol = [
    { value: '', title: '无', text: '无' },
    { value: '$', title: '$', text: '$' },
    { value: '¥', title: '¥(Chinese)', text: '¥(Chinese)' },
    { value: '₩', title: '₩(Korean)', text: '₩(Korean)' },
];

export const LocaleType = [
    { value: 'en_us', title: '英语(美国)', text: '英语(美国)' },
    { value: 'zh_cn', title: '中文(中国)', text: '中文(中国)' },
];

export const CurrencyNegativeNumbers = {
    number1: '-1,234.10',
    rednumber2: '1,234.10',
    number3: '(1,234.10)',
    rednumber4: '(1,234.10)',
};
export const NegativeNumbersFormatStrings = {
    number1: '$#,##0.00_);($#,##0.00)',
    rednumber2: '[Red]$#,##0.00',
    number3: '($#,##0.00)',
    rednumber4: '([Red]$#,##0.00)',
};
export const TimeFormats = {
    '1:30:00 PM': 'h:mm:ss tt',
    '13:30': 'HH:mm',
    '1:30 PM': 'h:mm tt',
    '13:30:00': 'HH:mm:ss',
    '30:00.0': 'mm:ss.f',
    '887149:30:00': 'H:mm:ss',
    '3/14/01 1:30 PM': 'M/d/yy h:mm tt',
    '3/14/01 13:30': 'M/d/yy HH:mm',
};

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
export const DateFormatsChina = [
    'yyyy/M/d',
    'yyyy年M月d日',
    'yyyy-M-d',
    'yy/M/d',
    'yy-M-d',
    'yyyy/MM/dd',
    'yyyy年MM月dd日',
    'yyyy-MM-dd',
    'yy/MM/dd',
    'yy-MM-dd',
    'yyyy年MM月',
    'yyyy年MM月dd日',
    'yyyy年MM月dd日 HH:mm',
    'yyyy/MM/dd HH:mm',
    'yyyy-MM-dd HH:mm',
    'yy/MM/dd HH:mm',
    'yy-MM-dd HH:mm',
    'yyyy年MM月dd日 HH:mm:ss',
    'yyyy/MM/dd HH:mm:ss',
    'yyyy-MM-dd HH:mm:ss',
    'yy/MM/dd HH:mm:ss',
    'yy-MM-dd HH:mm:ss',
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

export const SpecialFormats = [
    '00000',
    '00000-0000',
    '[<=9999999]###-####;(###) ###-####',
    '000-00-0000',
];

export const CustomFormats = [
    'General',
    '0',
    '0.00',
    '#,##0',
    '#,##0.00',
    '#,##0;(#,##0)',
    '#,##0;[Red](#,##0)',
    '#,##0.00;(#,##0.00)',
    '#,##0.00;[Red](#,##0.00)',
    '$#,##0;($#,##0)',
    '$#,##0;[Red]($#,##0)',
    '$#,##0.00;($#,##0.00)',
    '$#,##0.00;[Red]($#,##0.00)',
    '0%',
    '0.00%',
    '0.00E+00',
    '##0.0E+0',
    '# ?/?',
    '# ??/??',
    'm/d/yyyy',
    'd-mmm-yy',
    'd-mmm',
    'mmm-yy',
    'h:mm AM/PM',
    'h:mm:ss AM/PM',
    'hh:mm',
    'hh:mm:ss',
    'm/d/yyyy hh:mm',
    'mm:ss',
    'mm:ss.0',
    '@',
    '[h]:mm:ss',
    '$ #,##0;$ (#,##0);$ "-";@',
    ' #,##0; (#,##0); "-";@',
    '$ #,##0.00;$ (#,##0.00);$ "-"??;@',
    ' #,##0.00; (#,##0.00); "-"??;@',
    '00000',
    '# ???/???',
    '000-00-0000',
    '[$-4]dddd, mmmm dd, yyyy',
    'm/d;@',
    '[<=9999999]###-####;(###) ###-####',
    '# ?/8',
];

export const TextAlignmentHorizontal = [
    { value: 3, title: '常规', text: '常规' },
    { value: 0, title: '靠左', text: '靠左' },
    { value: 1, title: '居中', text: '居中' },
    { value: 2, title: '靠右', text: '靠右' },
    { value: 4, title: '跨列居中', text: '跨列居中' },
    // { value: 5, title: '分散对齐', text: '分散对齐' },
];
export const TextAlignmentVertical = [
    { value: 0, title: '靠上', text: '靠上' },
    { value: 1, title: '居中', text: '居中' },
    { value: 2, title: '靠下', text: '靠下' },
];

export const IconType = {
    None: 0,
    Hair: 7,
    Dotted: 4,
    DashDotDot: 11,
    DashDot: 9,
    Dashed: 3,
    Thin: 1,
    MediumDashDotDot: 12,
    SlantedDashDot: 10,
    MediumDashDot: 13,
    MediumDashed: 8,
    Medium: 2,
    Thick: 5,
    Double: 6,
};

export const FontStyle = {
    normal: '常规',
    italic: '倾斜',
    bold: '加粗',
    bolditalic: '加粗 倾斜',
};

export const UnderlineStyle = [
    { value: 0, title: '无', text: '无' },
    { value: 1, title: '单下划线', text: '单下划线' },
    { value: 8, title: '双下划线', text: '双下划线' },
];
