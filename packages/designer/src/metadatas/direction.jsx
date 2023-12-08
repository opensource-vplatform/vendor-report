import AntiClockWise from '@icons/direction/AntiClockWise';
import ClockWise from '@icons/direction/ClockWise';
import Column from '@icons/direction/Column';
import DirectionSetting from '@icons/direction/DirectionSetting';
import DownwardRotation from '@icons/direction/DownwardRotation';
import UpwardRotation from '@icons/direction/UpwardRotation';

export const getWordDirections = function () {
    return [
        {
            value: 'antiClockWise',
            title: '逆时针角度',
            text: '逆时针角度',
            icon: <AntiClockWise></AntiClockWise>,
        },
        {
            value: 'clockWise',
            title: '顺时针角度',
            text: '顺时针角度',
            icon: <ClockWise></ClockWise>,
        },
        {
            value: 'column',
            title: '竖排文字',
            text: '竖排文字',
            icon: <Column></Column>,
        },
        {
            value: 'upwardRotation',
            title: '向上旋转文字',
            text: '向上旋转文字',
            icon: <UpwardRotation></UpwardRotation>,
        },
        {
            value: 'downwardRotation',
            title: '向下旋转文字',
            text: '向下旋转文字',
            icon: <DownwardRotation></DownwardRotation>,
        },
        {
            value: 'directionSetting',
            title: '设置单元格对齐方式',
            text: '设置单元格对齐方式',
            icon: <DirectionSetting></DirectionSetting>,
        },
    ];
};

const DIRECTION_TO_STYLE_MAP = {
    antiClockWise: {
        textOrientation: 45,
        isVerticalText: false,
    },
    clockWise: {
        textOrientation: -45,
        isVerticalText: false,
    },
    column: {
        textOrientation: 0,
        isVerticalText: true,
    },
    upwardRotation: {
        textOrientation: 90,
        isVerticalText: false,
    },
    downwardRotation: {
        textOrientation: -90,
        isVerticalText: false,
    },
};

export const directionToStyles = function (direction) {
    return DIRECTION_TO_STYLE_MAP[direction];
};
