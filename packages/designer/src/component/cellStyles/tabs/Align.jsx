import React, { useState } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  CheckBox,
  Integer,
} from '@components/form/Index';
import Select from '@components/Select/Index';
import { setAlignSetting } from '@store/cellSettingSlice';

import {
  TextAlignmentHorizontal,
  TextAlignmentVertical,
} from '../constant';

const AlignmentTabPanel = styled.div`
    height: 245px;
    width: 680px;
    margin: 10px;
    display: flex;
    flex-direction: row;
`;
const LeftAlignment = styled.div`
    width: 460px;
    height: 90px;
    display: flex;
    flex-direction: column;
`;

const LeftAlignmentItems = styled.div`
    display: flex;
    flex-direction: row;
`;

const TextItemLeft = styled.div`
    width: 260px;
    height: 58px;
    display: flex;
    flex-direction: column;
`;
const TextItem = styled.div`
    margin: 5px;
    display: flex;
    flex-direction: row;
    width: 260px;
    height: 24px;
    span {
        margin-top: 3px;
        padding-left: 30px;
        width: 100px;
        height: 24px;
        font-size: 12px;
        padding-top: 0px;
        padding-bottom: 0px;
    }
`;
const TextItemDIV = styled.div`
    margin-top: 24px;
    margin-left: 24px;
    display: flex;
    flex-direction: row;
    width: 200px;
    height: 58px;
    pointer-events: ${(props) =>
        props.textHAlignValue === 4 ? 'none' : 'unset'};
    opacity: ${(props) => (props.textHAlignValue === 4 ? 0.6 : 1)};
    span {
        font-size: 14px;
        margin-top: 2px;
    }
`;

const TextControl = styled.div`
    width: 460px;
    height: 120px;
`;

const ControlItem = styled.div`
    width: 430px;
    height: 20px;
    margin: 10px 0 0 30px;

    span {
        font-size: 12px;
        margin-left: 3px;
    }
    input {
        margin-top: 2px;
    }
`;

const ControlledItem = styled.div`
    width: 430px;
    height: 20px;
    margin: 10px 0 0 30px;
    pointer-events: ${(props) => (props.isWrapText ? 'none' : 'unset')};
    opacity: ${(props) => (props.isWrapText ? 0.6 : 1)};
    span {
        font-size: 12px;
        margin-left: 3px;
    }
    input {
        margin-top: 2px;
    }
`;
const Orientation = styled.div`
    width: 140px;
    height: 220px;
    display: flex;
    margin-left: 22px;
    pointer-events: ${(props) =>
        props.textHAlignValue === 4 ? 'none' : 'unset'};
    opacity: ${(props) => (props.textHAlignValue === 4 ? 0.6 : 1)};
`;

const OrientationTopItem = styled.div`
    display: flex;
    flex-direction: row;
    width: 130px;
    height: 150px;
`;
const OrientationText = styled.div`
    height: 140px;
    width: 30px;
    border: 1px solid lightgray;
    span {
        width: 10px;
        height: 100%;
        padding-left: 8px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
`;
const Pointer = styled.div`
    height: 140px;
    width: 90px;
    margin-left: 10px;
    border: 1px solid lightgrey;
`;

const PointsWrap = styled.div`
    position: relative;
    height: 140px;
    width: 100px;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    left: 10px;
    top: 70px;
`;
const PointsBottom = styled.div`
    display: flex;
    flex-direction: row;
    width: 150px;
    height: 50px;
    span {
        font-size: 14px;
        padding-top: 3px;
        padding-left: 16px;
    }
`;
/*
 * 对齐 格式化面板
 */
export default function (props) {
    const {
        isWrapText,
        textHAlignValue,
        startDeg,
    } = props;
    const { alignSetting } = useSelector(
        ({ cellSettingSlice }) => cellSettingSlice
    );
    const dispatcher = useDispatch();
    const directions = [
        -90, -75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75, 90,
    ];
    const [rotatable, setRotatable] = useState(false);
    const handleMouseDown = (e) => {
        setRotatable(true);
    };
    const handleMouseLeave = () => {
        setRotatable(false);
    };
    const handleMouseMove = (e) => {
        if (!rotatable) return;
        e.stopPropagation();
        // 计算旋转角度
        // 获取相对容器坐标 解决鼠标获取div变化导致指针横跳
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // 使用 Math.atan2 计算角度
        const deltaX = x - centerX;
        const deltaY = centerY - y;

        const radian = Math.atan2(deltaY, deltaX);
        let degree = radian * (180 / Math.PI);

        // 将角度限制在指定范围内
        if (degree < -90) {
            degree += 360; // 将负角度转换为正角度
        }

        // 设置最小和最大角度，可以根据实际需要进行调整
        const minDegree = 90;
        const maxDegree = -90;

        if (degree >= maxDegree && degree <= minDegree) {
            degree = Math.round(degree);
            changeHandler(degree,'startDeg');
        }
    };
    const handlePointerClick = (e) => {
        e.stopPropagation();
        // 计算旋转角度
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // 使用 Math.atan2 计算角度
        const deltaX = x - centerX;
        const deltaY = centerY - y;

        const radian = Math.atan2(deltaY, deltaX);
        let degree = radian * (180 / Math.PI);

        // 将角度限制在指定范围内
        if (degree < -90) {
            degree += 360; // 将负角度转换为正角度
        }

        // 设置最小和最大角度，可以根据实际需要进行调整
        const minDegree = 90;
        const maxDegree = -90;

        if (degree >= maxDegree && degree <= minDegree) {
            degree = Math.round(degree);
            changeHandler(degree,'startDeg');
        }
    };

    const handleMouseUp = () => {
        setRotatable(false);
    };
    const changeHandler = (val, attrName) => {
        dispatcher(
            setAlignSetting({
                ...alignSetting,
                [attrName]: val,
            })
        );
    };
    return (
        <AlignmentTabPanel>
            <LeftAlignment>
                <fieldset
                    style={{
                        borderTop: '1px solid lightgray',
                        borderLeft: 0,
                        borderRight: 0,
                        borderBottom: 0,
                        fontSize: '12px',
                    }}
                >
                    <legend>文本对齐方式</legend>
                </fieldset>
                <LeftAlignmentItems>
                    <TextItemLeft>
                        <TextItem>
                            <span> 水平对齐: </span>
                            <Select
                                datas={TextAlignmentHorizontal}
                                style={{
                                    width: '160px',
                                    height: '24px',
                                }}
                                onChange={(val) => changeHandler(val, 'hAlign')}
                                value={alignSetting.hAlign}
                            />
                        </TextItem>
                        <TextItem>
                            <span> 垂直对齐: </span>
                            <Select
                                datas={TextAlignmentVertical}
                                style={{
                                    width: '160px',
                                    height: '24px',
                                }}
                                onChange={(val) => changeHandler(val, 'vAlign')}
                                value={alignSetting.vAlign}
                            />
                        </TextItem>
                    </TextItemLeft>
                    <TextItemDIV data-texthalignvalue={textHAlignValue}>
                        <span> 缩减：</span>
                        <Integer
                            style={{
                                width: '120px',
                                height: '24px',
                            }}
                            max={255}
                            min={0}
                            value={alignSetting.indentValue}
                            onChange={(val) =>
                                changeHandler(val, 'indentValue')
                            }
                        ></Integer>
                    </TextItemDIV>
                </LeftAlignmentItems>

                <TextControl>
                    <fieldset
                        style={{
                            borderTop: '1px solid lightgray',
                            borderLeft: 0,
                            borderRight: 0,
                            borderBottom: 0,
                            fontSize: '12px',
                        }}
                    >
                        <legend>文本控制</legend>
                    </fieldset>
                    <ControlItem>
                        <CheckBox
                            title='自动换行'
                            value={alignSetting.isWrapText}
                            onChange={(val) => changeHandler(val, 'isWrapText')}
                        ></CheckBox>
                    </ControlItem>
                    <ControlledItem data-iswraptext={isWrapText}>
                        <CheckBox
                            title='缩小字体填充'
                            value={alignSetting.isShrinkToFit}
                            disabled={alignSetting.isWrapText}
                            onChange={(val) =>
                                changeHandler(val, 'isShrinkToFit')
                            }
                        ></CheckBox>
                    </ControlledItem>
                    <ControlItem>
                        <CheckBox
                            title='合并单元格'
                            value={alignSetting.isMergeCells}
                            onChange={(val) =>
                                changeHandler(val, 'isMergeCells')
                            }
                        ></CheckBox>
                    </ControlItem>
                    <ControlItem>
                        <CheckBox
                            title='显示省略号'
                            value={alignSetting.isShowEllipsis}
                            onChange={(val) =>
                                changeHandler(val, 'isShowEllipsis')
                            }
                        ></CheckBox>
                    </ControlItem>
                </TextControl>
            </LeftAlignment>
            <Orientation data-texthalignvalue={textHAlignValue}>
                <fieldset
                    style={{
                        border: '1px solid lightgray',
                        fontSize: '12px',
                        width: 160,
                    }}
                >
                    <legend>方向</legend>
                    <OrientationTopItem>
                        <OrientationText>
                            <span>文本</span>
                        </OrientationText>
                        <Pointer>
                            <PointsWrap
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                                onMouseMove={handleMouseMove}
                                onClick={handlePointerClick}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div
                                    draggable={false}
                                    style={{
                                        fontSize: '12px',
                                        marginLeft: '45px',
                                        marginBottom: '3px',
                                        userSelect: 'none',
                                        transform: `rotate(${-alignSetting.startDeg}deg)`,
                                        transformOrigin: 'left center',
                                    }}
                                >
                                    文本——
                                </div>
                                {directions.map((deg) => (
                                    <div
                                        key={deg}
                                        style={{
                                            width: '5px',
                                            height: ' 5px',
                                            position: 'absolute',
                                            transform: `rotate(${deg}deg)translateX(${
                                                130 / 2
                                            }px)`,
                                            background:
                                                alignSetting.startDeg === -deg
                                                    ? 'red'
                                                    : 'black',
                                        }}
                                    ></div>
                                ))}
                            </PointsWrap>
                        </Pointer>
                    </OrientationTopItem>
                    <PointsBottom>
                        <Integer
                            style={{
                                width: '80px',
                                height: '20px',
                            }}
                            max={90}
                            min={-90}
                            value={alignSetting.startDeg}
                            onChange={(val) => changeHandler(val, 'startDeg')}
                        ></Integer>
                        <span>度</span>
                    </PointsBottom>
                </fieldset>
            </Orientation>
        </AlignmentTabPanel>
    );
}
