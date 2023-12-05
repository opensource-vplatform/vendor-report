import './fontGroup.scss';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  GroupItem,
  ItemList,
} from '@components/group/Index';
import ArrowDown from '@icons/ArrowDown';
import Bold from '@icons/Bold';
import BorderAll from '@icons/BorderAll.jsx';
import BorderBottom from '@icons/BorderBottom';
import BorderDoubleBottom from '@icons/BorderDoubleBottom.jsx';
import BorderLeft from '@icons/BorderLeft.jsx';
import BorderNone from '@icons/BorderNone.jsx';
import BorderOther from '@icons/BorderOther.jsx';
import BorderOutline from '@icons/BorderOutline.jsx';
import BorderRight from '@icons/BorderRight.jsx';
import BorderThickBottom from '@icons/BorderThickBottom.jsx';
import BorderThickBox from '@icons/BorderThickBox.jsx';
import BorderTop from '@icons/BorderTop.jsx';
import BorderTopBottom from '@icons/BorderTopBottom.jsx';
import BorderTopDoubleBottom from '@icons/BorderTopDoubleBottom.jsx';
import BorderTopThickBottom from '@icons/BorderTopThickBottom.jsx';
import DoubleUnderline from '@icons/DoubleUnderline ';
import FillColor from '@icons/FillColor ';
import FontSizeDown from '@icons/FontSizeDown';
import FontSizeUp from '@icons/FontSizeUp';
import ForceColor from '@icons/ForceColor';
import Italic from '@icons/Italic';
import Underline from '@icons/Underline.jsx';

import { useFontAction } from '../../hooks/fontHooks.js';
import {
  toggleFont,
  toggleFontStyle,
  toggleFontWeight,
  updateFont,
} from '../../store/fontSlice/fontSlice.js';
import {
  decreasedFontSize,
  increasedFontSize,
  setBorder,
} from '../../utils/fontUtil.js';
import DropdownBox from '../dropdownBox/dropdownBox.jsx';
import LineSepatator from '../lineSeparator/lineSeparator.jsx';

const fontFamilyDatas = [
    { value: '宋体', title: '宋体', text: '宋体' },
    { value: '楷体', title: '楷体', text: '楷体' },
    { value: '仿宋', title: '仿宋', text: '仿宋' },
    { value: '黑体', title: '黑体', text: '黑体' },
    { value: '新宋体', title: '新宋体', text: '新宋体' },
    { value: 'SimSun', title: 'SimSun', text: 'SimSun' },
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
    { value: 'Comic Sans MS', title: 'Comic Sans MS', text: 'Comic Sans MS' },
    { value: 'Garamond', title: 'Garamond', text: 'Garamond' },
    { value: 'Georgia', title: 'Georgia', text: 'Georgia' },
    { value: 'Malgun Gothic', title: 'Malgun Gothic', text: 'Malgun Gothic' },
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

const fontSizeDatas = [
    { value: '8', title: '8', text: '8' },
    { value: '9', title: '9', text: '9' },
    { value: '10', title: '10', text: '10' },
    { value: '11', title: '11', text: '11' },
    { value: '12', title: '12', text: '12' },
    { value: '14', title: '14', text: '14' },
    { value: '16', title: '16', text: '16' },
    { value: '18', title: '18', text: '18' },
    { value: '20', title: '20', text: '20' },
    { value: '24', title: '24', text: '24' },
    { value: '26', title: '26', text: '26' },
    { value: '28', title: '28', text: '28' },
    { value: '36', title: '36', text: '36' },
    { value: '48', title: '48', text: '48' },
    { value: '72', title: '72', text: '72' },
];

const borderDatas = [
    {
        value: 'bottomBorder',
        title: '下边框',
        text: '下边框',
        icon: <BorderBottom></BorderBottom>,
    },
    {
        value: 'topBorder',
        title: '上边框',
        text: '上边框',
        icon: <BorderTop></BorderTop>,
    },
    {
        value: 'leftBorder',
        title: '左边框',
        text: '左边框',
        icon: <BorderLeft></BorderLeft>,
    },
    {
        value: 'rightBorder',
        title: '右边框',
        text: '右边框',
        icon: <BorderRight></BorderRight>,
    },
    {
        value: 'noBorder',
        title: '无框线',
        text: '无框线',
        icon: <BorderNone></BorderNone>,
    },
    {
        value: 'allBorder',
        title: '所有框线',
        text: '所有框线',
        icon: <BorderAll></BorderAll>,
    },
    {
        value: 'outsideBorder',
        title: '外侧框线',
        text: '外侧框线',
        icon: <BorderOutline></BorderOutline>,
    },
    {
        value: 'thickBoxBorder',
        title: '粗匣框线',
        text: '粗匣框线',
        icon: <BorderThickBox></BorderThickBox>,
    },
    {
        value: 'bottomDoubleBorder',
        title: '双底框线',
        text: '双底框线',
        icon: <BorderDoubleBottom></BorderDoubleBottom>,
    },
    {
        value: 'thickBottomBorder',
        title: '粗底框线',
        text: '粗底框线',
        icon: <BorderThickBottom></BorderThickBottom>,
    },
    {
        value: 'topBottomBorder',
        title: '上下框线',
        text: '上下框线',
        icon: <BorderTopBottom></BorderTopBottom>,
    },
    {
        value: 'topThickBottomBorder',
        title: '上框线和粗下框线',
        text: '上框线和粗下框线',
        icon: <BorderTopThickBottom></BorderTopThickBottom>,
    },
    {
        value: 'topDoubleBottomBorder',
        title: '上框线和双下框线',
        text: '上框线和双下框线',
        icon: <BorderTopDoubleBottom></BorderTopDoubleBottom>,
    },
    {
        value: 'moreBorders',
        title: '其他边框...',
        text: '其他边框...',
        icon: <BorderOther></BorderOther>,
    },
];

const borderOptionMap = {
    bottomBorder: [
        {
            lineborder: {
                color: 'black',
                level: undefined,
                style: 1,
            },
            options: {
                bottom: true,
            },
        },
    ],
    topBorder: [
        {
            lineborder: {
                color: 'black',
                level: undefined,
                style: 1,
            },
            options: {
                top: true,
            },
        },
    ],
    leftBorder: [
        {
            lineborder: {
                color: 'black',
                level: undefined,
                style: 1,
            },
            options: {
                left: true,
            },
        },
    ],
    rightBorder: [
        {
            lineborder: {
                color: 'black',
                level: undefined,
                style: 1,
            },
            options: {
                right: true,
            },
        },
    ],
    noBorder: [
        {
            lineborder: null,
            options: {
                all: true,
            },
        },
    ],
    allBorder: [
        {
            lineborder: {
                color: 'black',
                level: undefined,
                style: 1,
            },
            options: {
                all: true,
            },
        },
    ],
    outsideBorder: [
        {
            lineborder: {
                color: 'black',
                level: undefined,
                style: 1,
            },
            options: {
                outline: true,
            },
        },
    ],
    thickBoxBorder: [
        {
            lineborder: {
                color: 'black',
                level: undefined,
                style: 5,
            },
            options: {
                outline: true,
            },
        },
    ],
    bottomDoubleBorder: [
        {
            lineborder: {
                color: 'black',
                level: undefined,
                style: 6,
            },
            options: {
                bottom: true,
            },
        },
    ],
    thickBottomBorder: [
        {
            lineborder: {
                color: 'black',
                level: undefined,
                style: 5,
            },
            options: {
                bottom: true,
            },
        },
    ],
    topBottomBorder: [
        {
            lineborder: {
                color: 'black',
                level: undefined,
                style: 1,
            },
            options: {
                top: true,
                bottom:true,
            },
        },
    ],
    topThickBottomBorder: [
        {
            lineborder: {
                color: 'black',
                level: undefined,
                style: 1,
            },
            options: {
                top: true,
            },
        },{
            lineborder: {
                color: 'black',
                level: undefined,
                style: 5,
            },
            options: {
                bottom: true,
            },
        },
    ],
    topDoubleBottomBorder: [
        {
            lineborder: {
                color: 'black',
                level: undefined,
                style: 1,
            },
            options: {
                top: true,
            },
        },{
            lineborder: {
                color: 'black',
                level: undefined,
                style: 6,
            },
            options: {
                bottom: true,
            },
        },
    ],
    moreBorders: [],
};

export default function (props) {
    const dispatch = useDispatch();
    const {
        spread,
        fontWeight,
        fontStyle,
        fontSize = 14,
        isUnderline = false,
        isDoubleUnderline = false,
    } = useSelector(({ fontSlice }) => fontSlice);

    const _setFontAction = useFontAction();

    //设置字体
    const _fontFamilyClickHandler = function (data) {
        _setFontAction({
            value: data.value,
            attribute: 'font-family',
            dispatchFun: updateFont,
            dispatchParams: {
                font: { fontFamily: data.value },
            },
        });
    };

    //设置字体大小
    const _fontSizeClickHandler = function (data) {
        _setFontAction({
            value: data.value + 'pt',
            attribute: 'font-size',
            dispatchFun: updateFont,
            dispatchParams: {
                font: { fontSize: data.value },
            },
        });
    };

    //增大字体大小
    const _increaseFontSizeClickHandler = function () {
        const value = increasedFontSize(fontSize);
        value && _fontSizeClickHandler({ value });
    };

    //减小字体大小
    const _decreaseFontSizeClickHandler = function () {
        const value = decreasedFontSize(fontSize);
        value && _fontSizeClickHandler({ value });
    };

    //是否粗体
    const _fontWeightClickHandler = function () {
        _setFontAction({
            value: fontWeight === 'normal' ? 'bold' : 'normal',
            attribute: 'font-weight',
            dispatchFun: toggleFontWeight,
        });
    };

    //是否倾斜
    const _fontItalicClickHandler = function () {
        _setFontAction({
            value: fontStyle === 'normal' ? 'italic' : 'normal',
            attribute: 'font-style',
            dispatchFun: toggleFontStyle,
        });
    };

    //是否设置下划线
    const _fontUnderlineClickHandler = function () {
        _setFontAction({
            value: isUnderline ? 0 : 1,
            attribute: 'textDecoration',
            property: 'textDecoration',
            dispatchFun: toggleFont,
            dispatchParams: 'isUnderline',
        });
        debugger;
        isDoubleUnderline && dispatch(toggleFont('isDoubleUnderline'));
    };

    //是否设置双下划线
    const _fontDoubleUnderlineClickHandler = function () {
        _setFontAction({
            value: isDoubleUnderline ? 0 : 8,
            attribute: 'textDecoration',
            property: 'textDecoration',
            dispatchFun: toggleFont,
            dispatchParams: 'isDoubleUnderline',
        });
        isUnderline && dispatch(toggleFont('isUnderline'));
    };

    const _borderOptChangeHandler = function (data) {
        const _value = data.value;
        const values = borderOptionMap[_value];
        const sheet = spread?.getActiveSheet?.();
        spread.suspendPaint();
        try {
            values.forEach(value=>{
                setBorder({
                    value,
                    sheet,
                });
            });
        } catch (e) {
        } finally {
            spread.resumePaint();
        }
        spread.focus(true);
    };

    return (
        <GroupItem title='字体' onMore={() => {}}>
            <ItemList>
                <DropdownBox
                    datas={fontFamilyDatas}
                    className='fontFamily'
                    style={{ width: '100px' }}
                    onChange={_fontFamilyClickHandler}
                ></DropdownBox>
                <DropdownBox
                    datas={fontSizeDatas}
                    className='fontSize'
                    style={{ width: '50px' }}
                    optionStyle={{ width: '50px' }}
                    onChange={_fontSizeClickHandler}
                ></DropdownBox>
                <FontSizeUp
                    tips='增大字号'
                    onClick={_increaseFontSizeClickHandler}
                ></FontSizeUp>
                <FontSizeDown
                    tips='减小字号'
                    onClick={_decreaseFontSizeClickHandler}
                ></FontSizeDown>
            </ItemList>
            <ItemList>
                <Bold
                    tips='加粗'
                    active={fontWeight == 'bold'}
                    onClick={_fontWeightClickHandler}
                ></Bold>
                <Italic
                    tips='倾斜'
                    active={fontStyle == 'italic'}
                    onClick={_fontItalicClickHandler}
                ></Italic>
                <Underline
                    tips='下划线'
                    active={isUnderline}
                    onClick={_fontUnderlineClickHandler}
                ></Underline>
                <DoubleUnderline
                    tips='双下划线'
                    active={isDoubleUnderline}
                    onClick={_fontDoubleUnderlineClickHandler}
                ></DoubleUnderline>
                <LineSepatator></LineSepatator>
                <BorderBottom tips='边框'></BorderBottom>
                <DropdownBox
                    datas={borderDatas}
                    lineIndexs={[3, 7, 12]}
                    isShowIcon={true}
                    isShowText={false}
                    isShowBorder={false}
                    className='borderOpt'
                    onChange={_borderOptChangeHandler}
                >
                    <ArrowDown tips='边框'></ArrowDown>
                </DropdownBox>
                <LineSepatator></LineSepatator>
                <FillColor tips='填充颜色'></FillColor>
                <ForceColor tips='字体颜色'></ForceColor>
            </ItemList>
        </GroupItem>
    );
}
