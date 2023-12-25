import BorderAll from '@icons/border/BorderAll';
import BorderBottom from '@icons/border/BorderBottom';
import BorderDoubleBottom from '@icons/border/BorderDoubleBottom';
import BorderLeft from '@icons/border/BorderLeft';
import BorderNone from '@icons/border/BorderNone';
import BorderOther from '@icons/border/BorderOther';
import BorderOutline from '@icons/border/BorderOutline';
import BorderRight from '@icons/border/BorderRight';
import BorderThickBottom from '@icons/border/BorderThickBottom';
import BorderThickBox from '@icons/border/BorderThickBox';
import BorderTop from '@icons/border/BorderTop';
import BorderTopBottom from '@icons/border/BorderTopBottom';
import BorderTopDoubleBottom from '@icons/border/BorderTopDoubleBottom';
import BorderTopThickBottom from '@icons/border/BorderTopThickBottom';
import { useSelector } from 'react-redux';
export const getBorderEnums = function () {
    return [
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
};

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
                bottom: true,
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
        },
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
        },
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
    diagonalDownLine: [
        {
            lineborder: {
                color: 'black',
                level: undefined,
                style: 1,
            },
            options: {
                diagonalDown: true,
            },
        },
    ],
    diagonalUpLine: [
        {
            lineborder: {
                color: 'black',
                level: undefined,
                style: 1,
            },
            options: {
                diagonalUp: true,
            },
        },
    ],
    lineHorizontalInner: [
        {
            lineborder: {
                color: 'black',
                level: undefined,
                style: 1,
            },
            options: {
                innerHorizontal: true,
            },
        },
    ],
    lineVerticalInner: [
        {
            lineborder: {
                color: 'black',
                level: undefined,
                style: 1,
            },
            options: {
                innerVertical: true,
            },
        },
    ],
    moreBorders: [],
};
export const toBorders = function (type, color, lineType) {
    // 不指定边框颜色 则默认黑色
    if (color === undefined) color = 'black';
    if (lineType === undefined) lineType = 1;
    return borderOptionMap[type].map((option) => ({
        ...option,
        lineborder: {
            ...option.lineborder,
            color,
            style: lineType,
        },
    }));
};
