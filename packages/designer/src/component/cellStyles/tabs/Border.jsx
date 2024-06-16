import React from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import { Preview } from '@components/preview/Index';
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
import { setBorderSetting } from '@store/cellSettingSlice';
import { ColorPicker } from '@toone/report-ui';

import BorderStyle from '../components/BorderStyle';

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

const BorderPreviewWrap = styled.div`
      width: 180px;
      height: 100px;
      border: 1px solid black;
      display: flex;
      align-items: center;
      justify-content: center;
  `;

/*
 * 边框 格式化面板
 */
export default function (props) {
    const dispatch = useDispatch();
    const { borderSetting,fontSetting, isSingleCell,numberSetting,fillSetting } = useSelector(
        ({ cellSettingSlice }) => cellSettingSlice
    );
    const { lineBorder } = borderSetting;
    const clearHandler = () => {
        dispatch(
            setBorderSetting({
                ...borderSetting,
                borderLeft: null,
                borderTop: null,
                borderBottom: null,
                borderRight: null,
                innerHorizontal: null,
                innerVertical: null,
                diagonalDown: null,
                diagonalUp: null,
            })
        );
    };
    const outlineSetHandler = () => {
        dispatch(
            setBorderSetting({
                ...borderSetting,
                borderLeft: {...lineBorder},
                borderTop: {...lineBorder},
                borderBottom: {...lineBorder},
                borderRight: {...lineBorder},
            })
        );
    };
    const insideSetHandler = () => {
        dispatch(
            setBorderSetting({
                ...borderSetting,
                innerHorizontal: {...lineBorder},
                innerVertical: {...lineBorder},
            })
        );
    };
    const changeHandler = (borderType) => {
        dispatch(
            setBorderSetting({
                ...borderSetting,
                [borderType]: {...lineBorder},
            })
        );
    };
    const toggleHandler = (borderType) => {
        const border = borderSetting[borderType];
        if (border) {
            dispatch(
                setBorderSetting({
                    ...borderSetting,
                    [borderType]: null,
                })
            );
        } else {
            changeHandler(borderType);
        }
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
                        <BorderStyle
                            value={lineBorder.style}
                            color={lineBorder.color}
                            onChange={(val) =>
                                dispatch(
                                    setBorderSetting({
                                        ...borderSetting,
                                        lineBorder: {
                                            ...lineBorder,
                                            style: val,
                                        },
                                    })
                                )
                            }
                        ></BorderStyle>
                        <span>颜色：</span>
                        <div>
                            <ColorPicker
                                style={{ width: 126, marginLeft: 5 }}
                                panelStyle={{ width: '100%', marginLeft: 5 }}
                                onChange={(val) =>
                                    dispatch(
                                        setBorderSetting({
                                            ...borderSetting,
                                            lineBorder: {
                                                ...lineBorder,
                                                color: val,
                                            },
                                        })
                                    )
                                }
                                value={lineBorder.color}
                            ></ColorPicker>
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
                                onClick={clearHandler}
                                iconStyle={{
                                    width: '35px',
                                    height: '35px',
                                }}
                            ></BorderNone>
                            <span>无</span>
                        </PresetAreaItem>
                        <PresetAreaItem>
                            <BorderOutline
                                onClick={outlineSetHandler}
                                iconStyle={{
                                    width: '35px',
                                    height: '35px',
                                }}
                            ></BorderOutline>
                            <span>外边框</span>
                        </PresetAreaItem>
                        <PresetAreaItem>
                            <BorderInside
                                onClick={insideSetHandler}
                                disabled={isSingleCell}
                                iconStyle={{
                                    width: '35px',
                                    height: '35px',
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
                                    backgroundColor: borderSetting.borderTop
                                        ? 'lightGrey'
                                        : 'white',
                                }}
                            >
                                <BorderTop
                                    onClick={() => toggleHandler('borderTop')}
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
                                    backgroundColor: borderSetting.innerHorizontal
                                        ? 'lightGrey'
                                        : 'white',
                                }}
                            >
                                <LineHorizontalInner
                                    onClick={() =>
                                        toggleHandler('innerHorizontal')
                                    }
                                    style={{ margin: 0 }}
                                    disabled={isSingleCell}
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
                                    backgroundColor: borderSetting.borderBottom
                                        ? 'lightGrey'
                                        : 'white',
                                }}
                            >
                                <BorderBottom
                                    onClick={() =>
                                        toggleHandler('borderBottom')
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
                            <BorderPreviewWrap>
                                <Preview
                                    style={{
                                        width: 150,
                                        height: 80,
                                    }}
                                    isSingleCell={isSingleCell}
                                    format={numberSetting.formatSetting}
                                    borderLeft={borderSetting.borderLeft}
                                    borderRight={borderSetting.borderRight}
                                    borderTop={borderSetting.borderTop}
                                    borderBottom={borderSetting.borderBottom}
                                    innerHorizontal={borderSetting.innerHorizontal}
                                    innerVertical={borderSetting.innerVertical}
                                    diagonalDown={borderSetting.diagonalDown}
                                    diagonalUp={borderSetting.diagonalUp}
                                    fontFamily={fontSetting.fontFamily}
                                    textDecoration={fontSetting.textDecoration}
                                    fontWeight={fontSetting.fontWeight}
                                    fontStyle={fontSetting.fontStyle}
                                    fontSize={fontSetting.fontSize}
                                    foreColor={fontSetting.foreColor}
                                    backColor={fillSetting}
                                    text="文本"
                                ></Preview>
                            </BorderPreviewWrap>
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
                                backgroundColor: borderSetting.diagonalUp
                                    ? 'lightGrey'
                                    : 'white',
                            }}
                        >
                            <DiagonalUpLine
                                onClick={() => toggleHandler('diagonalUp')}
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
                                backgroundColor: borderSetting.borderLeft
                                    ? 'lightGrey'
                                    : 'white',
                            }}
                        >
                            <BorderLeft
                                onClick={() => toggleHandler('borderLeft')}
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
                                backgroundColor: borderSetting.innerVertical
                                    ? 'lightGrey'
                                    : 'white',
                            }}
                        >
                            <LineVerticalInner
                                onClick={() => toggleHandler('innerVertical')}
                                style={{ margin: 0 }}
                                disabled={isSingleCell}
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
                                backgroundColor: borderSetting.borderRight
                                    ? 'lightGrey'
                                    : 'white',
                            }}
                        >
                            <BorderRight
                                onClick={() => toggleHandler('borderRight')}
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
                                backgroundColor: borderSetting.diagonalDown
                                    ? 'lightGrey'
                                    : 'white',
                            }}
                        >
                            <DiagonalDownLine
                                onClick={() => toggleHandler('diagonalDown')}
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
}
