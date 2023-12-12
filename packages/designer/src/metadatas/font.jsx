const FONT_FAMILIES = [
    {
        value: '微软雅黑',
        title: '微软雅黑',
        text: (
            <span style={{ fontFamily: '微软雅黑', fontSize: 14 }}>
                微软雅黑
            </span>
        ),
    },
    {
        value: '黑体',
        title: '黑体',
        text: <span style={{ fontFamily: '黑体', fontSize: 14 }}>黑体</span>,
    },
    {
        value: '新宋体',
        title: '新宋体',
        text: (
            <span style={{ fontFamily: '新宋体', fontSize: 14 }}>新宋体</span>
        ),
    },
    {
        value: '仿宋',
        title: '仿宋',
        text: <span style={{ fontFamily: '仿宋', fontSize: 14 }}>仿宋</span>,
    },
    {
        value: '隶书',
        title: '隶书',
        text: <span style={{ fontFamily: '隶书', fontSize: 14 }}>隶书</span>,
    },
    {
        value: '楷体',
        title: '楷体',
        text: <span style={{ fontFamily: '楷体', fontSize: 14 }}>楷体</span>,
    },
    {
        value: 'SimSun',
        title: 'SimSun',
        text: (
            <span style={{ fontFamily: 'SimSun', fontSize: 14 }}>SimSun</span>
        ),
    },
    { value: 'KaiTi', title: 'KaiTi', text: 'KaiTi' },
    { value: 'FangSong', title: 'FangSong', text: 'FangSong' },
    { value: 'SimHei', title: 'SimHei', text: 'SimHei' },
    { value: 'NSimSun', title: 'NSimSun', text: 'NSimSun' },
    { value: 'Arial', title: 'Arial', text: 'Arial' },
    { value: 'Arial Black', title: 'Arial Black', text: 'Arial Black' },
    { value: 'Calibri', title: 'Calibri', text: 'Calibri' },
    { value: 'Cambria', title: 'Cambria', text: 'Cambria' },
    { value: 'Candara', title: 'Candara', text: 'Candara' },
    { value: 'Century', title: 'Century', text: 'Century' },
    { value: 'Courier New', title: 'Courier New', text: 'Courier New' },
    {
        value: 'Comic Sans MS',
        title: 'Comic Sans MS',
        text: 'Comic Sans MS',
    },
    { value: 'Garamond', title: 'Garamond', text: 'Garamond' },
    { value: 'Georgia', title: 'Georgia', text: 'Georgia' },
    {
        value: 'Malgun Gothic',
        title: 'Malgun Gothic',
        text: 'Malgun Gothic',
    },
    { value: 'Mangal', title: 'Mangal', text: 'Mangal' },
    { value: 'Meiryo', title: 'Meiryo', text: 'Meiryo' },
    { value: 'MS Gothic', title: 'MS Gothic', text: 'MS Gothic' },
    { value: 'MS Mincho', title: 'MS Mincho', text: 'MS Mincho' },
    { value: 'MS PGothic', title: 'MS PGothic', text: 'MS PGothic' },
    { value: 'MS PMincho', title: 'MS PMincho', text: 'MS PMincho' },
    { value: 'Tahoma', title: 'Tahoma', text: 'Tahoma' },
    { value: 'Times', title: 'Times', text: 'Times' },
    {
        value: 'Times New Roman',
        title: 'Times New Roman',
        text: 'Times New Roman',
    },
    { value: 'Trebuchet MS', title: 'Trebuchet MS', text: 'Trebuchet MS' },
    { value: 'Verdana', title: 'Verdana', text: 'Verdana' },
    { value: 'Wingdings', title: 'Wingdings', text: 'Wingdings' },
];

const FONT_SIZES = [
    { value: 8, title: '8', text: '8' },
    { value: 9, title: '9', text: '9' },
    { value: 10, title: '10', text: '10' },
    { value: 11, title: '11', text: '11' },
    { value: 12, title: '12', text: '12' },
    { value: 14, title: '14', text: '14' },
    { value: 16, title: '16', text: '16' },
    { value: 18, title: '18', text: '18' },
    { value: 20, title: '20', text: '20' },
    { value: 24, title: '24', text: '24' },
    { value: 26, title: '26', text: '26' },
    { value: 28, title: '28', text: '28' },
    { value: 36, title: '36', text: '36' },
    { value: 48, title: '48', text: '48' },
    { value: 72, title: '72', text: '72' },
];

let FONT_SIZE_VALUES = null;

export const getFontFamilies = function () {
    return FONT_FAMILIES;
};

export const getFontSizes = function () {
    return FONT_SIZES;
};

export const getFontSizeValues = function () {
    if (FONT_SIZE_VALUES == null) {
        const fontSizes = getFontSizes();
        FONT_SIZE_VALUES = fontSizes.map((size) => parseInt(size.value));
    }
    return FONT_SIZE_VALUES;
};
