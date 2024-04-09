import React from 'react';

import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ColorPicker } from '@components/form/Index';
import BorderBottom from '@icons/border/BorderBottom';
import BorderInside from '@icons/border/BorderInside';
import BorderLeft from '@icons/border/BorderLeft';
import BorderNone from '@icons/border/BorderNone';
import BorderOutline from '@icons/border/BorderOutline';
import BorderRight from '@icons/border/BorderRight';
import BorderTop from '@icons/border/BorderTop';
import DiagonalDownLine from '@icons/border/DiagonalDownLine';
import DiagonalUpLine from '@icons/border/DiagonalUpLine';
import LineHorizontalInner from '@icons/border/LineHorizontalInner';
import LineVerticalInner from '@icons/border/LineVerticalInner';
import { setBorderColor } from '@store/borderSlice/borderSlice';

import CanvasBorderArea from '../components/canvasBorderArea';
import { IconType } from '../constant';
import Icon from '../lineIcon';

const BorderTabPanel = styled.div`
    margin: 10px;
    display: flex;
    width: 500px;
    height: 300px;
`;
const LineArea = styled.div`
    width: 150px;
    height: 300px;
    font-size: 12px;
    display: flex;
    span {
        border: none;
        display: block;
        height: 16px;
        margin: 5px;
    }
`;
const LineStyle = styled.div`
    display: flex;
    width: 130px;
    height: 150px;
    margin: 5px;
    border: none;
`;
const LineStyleLeft = styled.div`
    margin: 2px;
    width: 60px;
    height: 112px;
    border: none;
    background: transparent;
`;

const LineStyleRight = styled.div`
    margin: 2px;
    width: 60px;
    height: 112px;
    background: transparent;
`;

const PreArea = styled.div`
    width: 350px;
    height: 300px;
`;

const PresetAreaItem = styled.div`
    width: 100px;
    height: 68px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const PreShowArea = styled.div`
    height: 130px;
    width: 310px;
    display: flex;
`;
const PreShowAreaLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 50px;
    height: 120px;
`;

const PreShowAreaRight = styled.div`
    width: 250px;
    height: 120px;
    display: flex;
    justify-content: center;
`;
const PreShowAreaBottom = styled.div`
    width: 250px;
    height: 35px;
    position: relative;
`;

const BottomAreaofBorderTab = styled.div`
    font-size: 14px;
    padding-left: 12px;
    width: 550px;
    height: 35px;
    position: relative;
`;
const PresetArea = styled.div`
    width: 300px;
    height: 68px;
    display: flex;
`;
/*
 * 边框 格式化面板
 */
export default function(props){
    const {
        isMoreCell,
        lineColor,
        setLineColor,
        borderTop,
        setBorderTop,
        borderLeft,
        setBorderLeft,
        borderRight,
        setBorderRight,
        borderBottom,
        setBorderBottom,
        diagonalUpLine,
        setDiagonalUpLine,
        diagonalDownLine,
        setDiagonalDownLine,
        lineHorizontalInner,
        setLineHorizontalInner,
        lineVerticalInner,
        setLineVerticalInner,
        lineType,
        setLineType,
    } = props;

    const dispatch = useDispatch();

    const handleColorEditorforBorder = (color) => {
        setLineColor(color);
        dispatch(setBorderColor({ color: color }));
    };

    const handlePreBorderNone = () => {
        setBorderBottom(false);
        setBorderTop(false);
        setBorderLeft(false);
        setBorderRight(false);
        setLineHorizontalInner(false);
        setLineVerticalInner(false);
        setDiagonalDownLine(false);
        setDiagonalUpLine(false);
    };
    const handlePreBorderInside = () => {
        if (!isMoreCell) {
            setLineHorizontalInner(false);
            setLineVerticalInner(false);
        } else {
            setLineHorizontalInner(true);
            setLineVerticalInner(true);
        }
    };
    const handleBorderOutline = () => {
        setBorderBottom(true);
        setBorderTop(true);
        setBorderLeft(true);
        setBorderRight(true);
    };
    return (
        <>
            <BorderTabPanel>
                <LineArea>
                    <fieldset
                        style={{
                            border: '1px solid lightgray',
                            padding: 0,
                        }}
                    >
                        <legend>线条</legend>
                        <span>样式：</span>

                        <LineStyle>
                            <LineStyleLeft>
                                <div
                                    style={{ textAlign: 'center' }}
                                    onClick={() => setLineType(IconType.None)}
                                >
                                    <Icon
                                        lineType={lineType}
                                        type={IconType.None}
                                        color={lineColor}
                                    />
                                </div>
                                <div
                                    onClick={() => {
                                        setLineType(IconType.Hair);
                                    }}
                                >
                                    <Icon
                                        lineType={lineType}
                                        type={IconType.Hair}
                                        color={lineColor}
                                    />
                                </div>
                                <div
                                    onClick={() => setLineType(IconType.Dotted)}
                                >
                                    <Icon
                                        lineType={lineType}
                                        type={IconType.Dotted}
                                        color={lineColor}
                                    />
                                </div>
                                <div
                                    onClick={() =>
                                        setLineType(IconType.DashDotDot)
                                    }
                                >
                                    <Icon
                                        lineType={lineType}
                                        type={IconType.DashDotDot}
                                        color={lineColor}
                                    />
                                </div>
                                <div
                                    onClick={() =>
                                        setLineType(IconType.DashDot)
                                    }
                                >
                                    <Icon
                                        lineType={lineType}
                                        type={IconType.DashDot}
                                        color={lineColor}
                                    />
                                </div>
                                <div
                                    onClick={() => setLineType(IconType.Dashed)}
                                >
                                    <Icon
                                        lineType={lineType}
                                        type={IconType.Dashed}
                                        color={lineColor}
                                    />
                                </div>
                                <div onClick={() => setLineType(IconType.Thin)}>
                                    <Icon
                                        lineType={lineType}
                                        type={IconType.Thin}
                                        color={lineColor}
                                    />
                                </div>
                            </LineStyleLeft>
                            <LineStyleRight>
                                <div
                                    onClick={() =>
                                        setLineType(IconType.MediumDashDotDot)
                                    }
                                >
                                    <Icon
                                        lineType={lineType}
                                        type={IconType.MediumDashDotDot}
                                        color={lineColor}
                                    />
                                </div>
                                <div
                                    onClick={() =>
                                        setLineType(IconType.SlantedDashDot)
                                    }
                                >
                                    <Icon
                                        lineType={lineType}
                                        type={IconType.SlantedDashDot}
                                        color={lineColor}
                                    />
                                </div>
                                <div
                                    onClick={() =>
                                        setLineType(IconType.MediumDashDot)
                                    }
                                >
                                    <Icon
                                        lineType={lineType}
                                        type={IconType.MediumDashDot}
                                        color={lineColor}
                                    />
                                </div>
                                <div
                                    onClick={() =>
                                        setLineType(IconType.MediumDashed)
                                    }
                                >
                                    <Icon
                                        lineType={lineType}
                                        type={IconType.MediumDashed}
                                        color={lineColor}
                                    />
                                </div>
                                <div
                                    onClick={() => setLineType(IconType.Medium)}
                                >
                                    <Icon
                                        lineType={lineType}
                                        type={IconType.Medium}
                                        color={lineColor}
                                    />
                                </div>
                                <div
                                    onClick={() => setLineType(IconType.Thick)}
                                >
                                    <Icon
                                        lineType={lineType}
                                        type={IconType.Thick}
                                        color={lineColor}
                                    />
                                </div>
                                <div
                                    onClick={() => setLineType(IconType.Double)}
                                >
                                    <Icon
                                        lineType={lineType}
                                        type={IconType.Double}
                                        color={lineColor}
                                    />
                                </div>
                            </LineStyleRight>
                        </LineStyle>
                        <span>颜色：</span>
                        <div>
                            <ColorPicker
                                style={{width: 126,marginLeft:5}}
                                panelStyle={{ width: '188px',marginLeft:5 }}
                                onChange={handleColorEditorforBorder}
                                value={lineColor}
                            >
                            </ColorPicker>
                        </div>
                    </fieldset>
                </LineArea>
                <PreArea>
                    <fieldset
                        style={{
                            borderTop: '1px solid lightgray',
                            borderLeft: 0,
                            borderRight: 0,
                            borderBottom: 0,
                            fontSize: '12px',
                        }}
                    >
                        <legend>预置</legend>
                    </fieldset>
                    <PresetArea>
                        <PresetAreaItem>
                            <BorderNone
                                onClick={handlePreBorderNone}
                                iconStyle={{
                                    width: '35px',
                                    height: '35px',
                                    backgroundColor: 'lightgray',
                                }}
                                icon='url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU2LjIgKDgxNjcyKSAtIGh0dHBzOi8vc2tldGNoLmNvbSAtLT4KICAgIDx0aXRsZT5Ob25lPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9Ik5vbmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLnvJbnu4QtMTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuMDAwMDAwLCAzLjAwMDAwMCkiPgogICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiBmaWxsPSIjRkZGRkZGIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjciIGhlaWdodD0iMjciPjwvcmVjdD4KICAgICAgICAgICAgPHBhdGggZD0iTTI3LDI2IEwyNywyNyBMMjQsMjcgTDI0LDI2IEwyNiwyNiBMMjYsMjQgTDI3LDI0IEwyNywyNiBaIE0yNiwxIEwyNCwxIEwyNCwwIEwyNiwwIEwyNyw5LjE4NDg1MDk5ZS0xNyBMMjcsMyBMMjYsMyBMMjYsMSBaIE0xLDEzIEwzLDEzIEwzLDE0IEwxLDE0IEwxLDE1IEwtMS4xMzkwODg4MmUtMTMsMTUgTC0xLjEzNDY0NzkzZS0xMywxMiBMMSwxMiBMMSwxMyBaIE0xMywyNiBMMTMsMjQgTDE0LDI0IEwxNCwyNiBMMTUsMjYgTDE1LDI3IEwxMiwyNyBMMTIsMjYgTDEzLDI2IFogTS0xLjEzOTA4ODgyZS0xMywyNiBMLTEuMTM0NjQ3OTNlLTEzLDI0IEwxLDI0IEwxLDI2IEwzLDI2IEwzLDI3IEwtMS4xMzY4NjgzOGUtMTMsMjcgTC0xLjEzNjg2ODM4ZS0xMywyNiBaIE0xNCwxMyBMMTUsMTMgTDE1LDE0IEwxNCwxNCBMMTQsMTUgTDEzLDE1IEwxMywxNCBMMTIsMTQgTDEyLDEzIEwxMywxMyBMMTMsMTIgTDE0LDEyIEwxNCwxMyBaIE0yNiwxNCBMMjQsMTQgTDI0LDEzIEwyNiwxMyBMMjYsMTIgTDI3LDEyIEwyNywxNSBMMjYsMTUgTDI2LDE0IFogTTE0LDEgTDE0LDMgTDEzLDMgTDEzLDEgTDEyLDEgTDEyLDAgTDE1LDAgTDE1LDEgTDE0LDEgWiBNMSwxIEwxLDMgTC0xLjEzOTA4ODgyZS0xMywzIEwtMS4xMzYxMjgyM2UtMTMsMSBMLTEuMTM2ODY4MzhlLTEzLDAgTDMsMCBMMywxIEwxLDEgWiBNNCwwIEw3LDAgTDcsMSBMNCwxIEw0LDAgWiBNNCwyNiBMNywyNiBMNywyNyBMNCwyNyBMNCwyNiBaIE04LDAgTDExLDAgTDExLDEgTDgsMSBMOCwwIFogTTgsMjYgTDExLDI2IEwxMSwyNyBMOCwyNyBMOCwyNiBaIE0xNiwwIEwxOSwwIEwxOSwxIEwxNiwxIEwxNiwwIFogTTE2LDI2IEwxOSwyNiBMMTksMjcgTDE2LDI3IEwxNiwyNiBaIE0yMCwwIEwyMywwIEwyMywxIEwyMCwxIEwyMCwwIFogTTIwLDI2IEwyMywyNiBMMjMsMjcgTDIwLDI3IEwyMCwyNiBaIE0yNyw0IEwyNyw3IEwyNiw3IEwyNiw0IEwyNyw0IFogTTEsNCBMMSw3IEwtMS4xMzkwODg4MmUtMTMsNyBMLTEuMTM0NjQ3OTNlLTEzLDQgTDEsNCBaIE0xNCw0IEwxNCw3IEwxMyw3IEwxMyw0IEwxNCw0IFogTTIzLDE0IEwyMCwxNCBMMjAsMTMgTDIzLDEzIEwyMywxNCBaIE0yNyw4IEwyNywxMSBMMjYsMTEgTDI2LDggTDI3LDggWiBNMSw4IEwxLDExIEwtMS4xMzkwODg4MmUtMTMsMTEgTC0xLjEzNDY0NzkzZS0xMyw4IEwxLDggWiBNMTQsOCBMMTQsMTEgTDEzLDExIEwxMyw4IEwxNCw4IFogTTE5LDE0IEwxNiwxNCBMMTYsMTMgTDE5LDEzIEwxOSwxNCBaIE0yNywxNiBMMjcsMTkgTDI2LDE5IEwyNiwxNiBMMjcsMTYgWiBNMSwxNiBMMSwxOSBMLTEuMTM5MDg4ODJlLTEzLDE5IEwtMS4xMzQ2NDc5M2UtMTMsMTYgTDEsMTYgWiBNMTQsMTYgTDE0LDE5IEwxMywxOSBMMTMsMTYgTDE0LDE2IFogTTExLDE0IEw4LDE0IEw4LDEzIEwxMSwxMyBMMTEsMTQgWiBNMjcsMjAgTDI3LDIzIEwyNiwyMyBMMjYsMjAgTDI3LDIwIFogTTEsMjAgTDEsMjMgTC0xLjEzOTA4ODgyZS0xMywyMyBMLTEuMTM0NjQ3OTNlLTEzLDIwIEwxLDIwIFogTTE0LDIwIEwxNCwyMyBMMTMsMjMgTDEzLDIwIEwxNCwyMCBaIE03LDE0IEw0LDE0IEw0LDEzIEw3LDEzIEw3LDE0IFoiIGlkPSLlvaLnirbnu5PlkIgiIGZpbGw9IiNBOEE4QTgiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)'
                            ></BorderNone>
                            <span>无</span>
                        </PresetAreaItem>
                        <PresetAreaItem>
                            <BorderOutline
                                onClick={handleBorderOutline}
                                iconStyle={{
                                    width: '35px',
                                    height: '35px',
                                    backgroundColor: 'lightgray',
                                }}
                                icon='url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU2LjIgKDgxNjcyKSAtIGh0dHBzOi8vc2tldGNoLmNvbSAtLT4KICAgIDx0aXRsZT5PdXRsaW5lPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9Ik91dGxpbmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLnvJbnu4QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuMDAwMDAwLCAzLjAwMDAwMCkiPgogICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiBmaWxsPSIjRkZGRkZGIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjciIGhlaWdodD0iMjciPjwvcmVjdD4KICAgICAgICAgICAgPHBhdGggZD0iTTI3LDI2IEwyNywyNyBMMjQsMjcgTDI0LDI2IEwyNiwyNiBMMjYsMjQgTDI3LDI0IEwyNywyNiBaIE0yNiwxIEwyNCwxIEwyNCwwIEwyNiwwIEwyNyw5LjE4NDg1MDk5ZS0xNyBMMjcsMyBMMjYsMyBMMjYsMSBaIE0xLDEzIEwzLDEzIEwzLDE0IEwxLDE0IEwxLDE1IEwtMi4yMjA0NDYwNWUtMTYsMTUgTDIuMjIwNDQ2MDVlLTE2LDEyIEwxLDEyIEwxLDEzIFogTTEzLDI2IEwxMywyNCBMMTQsMjQgTDE0LDI2IEwxNSwyNiBMMTUsMjcgTDEyLDI3IEwxMiwyNiBMMTMsMjYgWiBNLTIuMjIwNDQ2MDVlLTE2LDI2IEwyLjIyMDQ0NjA1ZS0xNiwyNCBMMSwyNCBMMSwyNiBMMywyNiBMMywyNyBMMCwyNyBMMCwyNiBaIE0xNCwxMyBMMTUsMTMgTDE1LDE0IEwxNCwxNCBMMTQsMTUgTDEzLDE1IEwxMywxNCBMMTIsMTQgTDEyLDEzIEwxMywxMyBMMTMsMTIgTDE0LDEyIEwxNCwxMyBaIE0yNiwxNCBMMjQsMTQgTDI0LDEzIEwyNiwxMyBMMjYsMTIgTDI3LDEyIEwyNywxNSBMMjYsMTUgTDI2LDE0IFogTTE0LDEgTDE0LDMgTDEzLDMgTDEzLDEgTDEyLDEgTDEyLDAgTDE1LDAgTDE1LDEgTDE0LDEgWiBNMSwxIEwxLDMgTC0yLjIyMDQ0NjA1ZS0xNiwzIEw3LjQwMTQ4NjgzZS0xNywxIEwwLDAgTDMsMCBMMywxIEwxLDEgWiBNNCwwIEw3LDAgTDcsMSBMNCwxIEw0LDAgWiBNNCwyNiBMNywyNiBMNywyNyBMNCwyNyBMNCwyNiBaIE04LDAgTDExLDAgTDExLDEgTDgsMSBMOCwwIFogTTgsMjYgTDExLDI2IEwxMSwyNyBMOCwyNyBMOCwyNiBaIE0xNiwwIEwxOSwwIEwxOSwxIEwxNiwxIEwxNiwwIFogTTE2LDI2IEwxOSwyNiBMMTksMjcgTDE2LDI3IEwxNiwyNiBaIE0yMCwwIEwyMywwIEwyMywxIEwyMCwxIEwyMCwwIFogTTIwLDI2IEwyMywyNiBMMjMsMjcgTDIwLDI3IEwyMCwyNiBaIE0yNyw0IEwyNyw3IEwyNiw3IEwyNiw0IEwyNyw0IFogTTEsNCBMMSw3IEwtMi4yMjA0NDYwNWUtMTYsNyBMMi4yMjA0NDYwNWUtMTYsNCBMMSw0IFogTTE0LDQgTDE0LDcgTDEzLDcgTDEzLDQgTDE0LDQgWiBNMjMsMTQgTDIwLDE0IEwyMCwxMyBMMjMsMTMgTDIzLDE0IFogTTI3LDggTDI3LDExIEwyNiwxMSBMMjYsOCBMMjcsOCBaIE0xLDggTDEsMTEgTC0yLjIyMDQ0NjA1ZS0xNiwxMSBMMi4yMjA0NDYwNWUtMTYsOCBMMSw4IFogTTE0LDggTDE0LDExIEwxMywxMSBMMTMsOCBMMTQsOCBaIE0xOSwxNCBMMTYsMTQgTDE2LDEzIEwxOSwxMyBMMTksMTQgWiBNMjcsMTYgTDI3LDE5IEwyNiwxOSBMMjYsMTYgTDI3LDE2IFogTTEsMTYgTDEsMTkgTC0yLjIyMDQ0NjA1ZS0xNiwxOSBMMi4yMjA0NDYwNWUtMTYsMTYgTDEsMTYgWiBNMTQsMTYgTDE0LDE5IEwxMywxOSBMMTMsMTYgTDE0LDE2IFogTTExLDE0IEw4LDE0IEw4LDEzIEwxMSwxMyBMMTEsMTQgWiBNMjcsMjAgTDI3LDIzIEwyNiwyMyBMMjYsMjAgTDI3LDIwIFogTTEsMjAgTDEsMjMgTC0yLjIyMDQ0NjA1ZS0xNiwyMyBMMi4yMjA0NDYwNWUtMTYsMjAgTDEsMjAgWiBNMTQsMjAgTDE0LDIzIEwxMywyMyBMMTMsMjAgTDE0LDIwIFogTTcsMTQgTDQsMTQgTDQsMTMgTDcsMTMgTDcsMTQgWiIgaWQ9IuW9oueKtue7k+WQiOWkh+S7vS0zIiBmaWxsPSIjQThBOEE4Ij48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDAgTDI3LDAgTDI3LDI3IEwwLDI3IEwwLDAgWiBNMSwxIEwxLDI2IEwyNiwyNiBMMjYsMSBMMSwxIFoiIGlkPSLlvaLnirbnu5PlkIgiIGZpbGw9IiMzNjdGQzkiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)'
                            ></BorderOutline>
                            <span>外边框</span>
                        </PresetAreaItem>
                        <PresetAreaItem>
                            <BorderInside
                                onClick={handlePreBorderInside}
                                iconStyle={{
                                    width: '35px',
                                    height: '35px',
                                    backgroundColor: 'lightgray',
                                }}
                            ></BorderInside>
                            <span>内边框</span>
                        </PresetAreaItem>
                    </PresetArea>
                    <fieldset
                        style={{
                            borderTop: '1px solid lightgray',
                            borderLeft: 0,
                            borderRight: 0,
                            borderBottom: 0,
                            fontSize: '12px',
                        }}
                    >
                        <legend>边框</legend>
                    </fieldset>
                    <PreShowArea>
                        <PreShowAreaLeft>
                            <div
                                style={{
                                    width: 32,
                                    height: 32,
                                    border: '1px solid lightgray',
                                    margin: 0,
                                    backgroundColor: borderTop
                                        ? 'lightGrey'
                                        : 'white',
                                }}
                            >
                                <BorderTop
                                    onClick={() => setBorderTop(!borderTop)}
                                    style={{ margin: 0 }}
                                    iconStyle={{
                                        padding: '2px',
                                        margin: '5px',
                                        width: '18px',
                                        height: '18px',
                                        backgroundColor: 'white',
                                    }}
                                ></BorderTop>
                            </div>
                            <div
                                style={{
                                    width: 32,
                                    height: 32,
                                    border: '1px solid lightgray',
                                    margin: 0,
                                    backgroundColor: lineHorizontalInner
                                        ? 'lightGrey'
                                        : 'white',
                                }}
                            >
                                <LineHorizontalInner
                                    onClick={() =>
                                        setLineHorizontalInner(
                                            !lineHorizontalInner
                                        )
                                    }
                                    style={{ margin: 0 }}
                                    iconStyle={{
                                        padding: '2px',
                                        margin: '5px',
                                        width: '18px',
                                        height: '18px',
                                        backgroundColor: 'white',
                                    }}
                                ></LineHorizontalInner>
                            </div>
                            <div
                                style={{
                                    width: 32,
                                    height: 32,
                                    border: '1px solid lightgray',
                                    margin: 0,
                                    backgroundColor: borderBottom
                                        ? 'lightGrey'
                                        : 'white',
                                }}
                            >
                                <BorderBottom
                                    onClick={() =>
                                        setBorderBottom(!borderBottom)
                                    }
                                    style={{ margin: 0 }}
                                    iconStyle={{
                                        padding: '2px',
                                        margin: '5px',
                                        width: '18px',
                                        height: '18px',
                                        backgroundColor: 'white',
                                    }}
                                ></BorderBottom>
                            </div>
                        </PreShowAreaLeft>
                        <PreShowAreaRight>
                            <div
                                style={{
                                    width: 180,
                                    height: 100,
                                    border: '1px solid black',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        width: 150,
                                        height: 80,
                                        borderLeft: borderLeft
                                            ? `1px solid ${lineColor}`
                                            : 0,
                                        borderRight: borderRight
                                            ? `1px solid ${lineColor}`
                                            : 0,
                                        borderTop: borderTop
                                            ? `1px solid ${lineColor}`
                                            : 0,
                                        borderBottom: borderBottom
                                            ? `1px solid ${lineColor}`
                                            : 0,
                                    }}
                                >
                                    <CanvasBorderArea
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        diagonalDownLine={diagonalDownLine}
                                        diagonalUpLine={diagonalUpLine}
                                        lineHorizontalInner={
                                            lineHorizontalInner
                                        }
                                        lineVerticalInner={lineVerticalInner}
                                        isMoreCell={isMoreCell}
                                        lineColor={lineColor}
                                    ></CanvasBorderArea>
                                </div>
                            </div>
                        </PreShowAreaRight>
                    </PreShowArea>
                    <PreShowAreaBottom>
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                border: '1px solid lightgray',
                                margin: 0,
                                position: 'absolute',
                                left: 8,
                                backgroundColor: diagonalUpLine
                                    ? 'lightGrey'
                                    : 'white',
                            }}
                        >
                            <DiagonalUpLine
                                onClick={() =>
                                    setDiagonalUpLine(!diagonalUpLine)
                                }
                                style={{ margin: 0 }}
                                iconStyle={{
                                    padding: '2px',
                                    margin: '5px',
                                    width: '18px',
                                    height: '18px',
                                    backgroundColor: 'white',
                                }}
                            ></DiagonalUpLine>
                        </div>
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                border: '1px solid lightgray',
                                margin: 0,
                                position: 'absolute',
                                left: 60,
                                backgroundColor: borderLeft
                                    ? 'lightGrey'
                                    : 'white',
                            }}
                        >
                            <BorderLeft
                                onClick={() => setBorderLeft(!borderLeft)}
                                style={{ margin: 0 }}
                                iconStyle={{
                                    padding: '2px',
                                    margin: '5px',
                                    width: '18px',
                                    height: '18px',
                                    backgroundColor: 'white',
                                }}
                            ></BorderLeft>
                        </div>
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                border: '1px solid lightgray',
                                margin: 0,
                                position: 'absolute',
                                left: 150,
                                backgroundColor: lineVerticalInner
                                    ? 'lightGrey'
                                    : 'white',
                            }}
                        >
                            <LineVerticalInner
                                onClick={() =>
                                    setLineVerticalInner(!lineVerticalInner)
                                }
                                style={{ margin: 0 }}
                                iconStyle={{
                                    padding: '2px',
                                    margin: '5px',
                                    width: '18px',
                                    height: '18px',
                                    backgroundColor: 'white',
                                }}
                            ></LineVerticalInner>
                        </div>
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                border: '1px solid lightgray',
                                margin: 0,
                                position: 'absolute',
                                left: 230,
                                backgroundColor: borderRight
                                    ? 'lightGrey'
                                    : 'white',
                            }}
                        >
                            <BorderRight
                                onClick={() => setBorderRight(!borderRight)}
                                style={{ margin: 0 }}
                                iconStyle={{
                                    padding: '2px',
                                    margin: '5px',
                                    width: '18px',
                                    height: '18px',
                                    backgroundColor: 'white',
                                }}
                            ></BorderRight>
                        </div>
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                border: '1px solid lightgray',
                                margin: 0,
                                position: 'absolute',
                                left: 280,
                                backgroundColor: diagonalDownLine
                                    ? 'lightGrey'
                                    : 'white',
                            }}
                        >
                            <DiagonalDownLine
                                onClick={() =>
                                    setDiagonalDownLine(!diagonalDownLine)
                                }
                                style={{ margin: 0 }}
                                iconStyle={{
                                    padding: '2px',
                                    margin: '5px',
                                    width: '18px',
                                    height: '18px',
                                    backgroundColor: 'white',
                                }}
                            ></DiagonalDownLine>
                        </div>
                    </PreShowAreaBottom>
                </PreArea>
            </BorderTabPanel>
            <BottomAreaofBorderTab>
                单击预置选项、预览草图及上面的按钮可以添加边框样式
            </BottomAreaofBorderTab>
        </>
    );
};
