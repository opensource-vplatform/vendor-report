import React, { useRef, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import ColorEditor from '@components/color/Index';
import Select from '@components/Select/Index';
import ArrowDown from '@icons/arrow/ArrowDown';
import List from '../../list/List';
import { FontStyle, UnderlineStyle } from '.././constant';

import { setIsStrickoutLine } from '@store/fontSlice/fontSlice.js';
import { setSelectedFontColor } from '@store/cellSettingSlice/fontCellSettingSlice';
import { getFontFamilies, getFontSizes } from '@metadatas/font';

const FontTop = styled.div`
    height: 210px;
    width: 680px;
    margin: 10px;
    display: flex;
    flex-direction: row;
`;
const FontList = styled.div`
    height: 210px;
    width: 330px;
    font-size: 12px;
`;
const FontStyleSelect = styled.div`
    font-size: 12px;
    height: 210px;
    width: 170px;
`;
const FontSizeSelect = styled.div`
    font-size: 12px;
    height: 210px;
    width: 170px;
`;
const FontMiddle = styled.div`
    display: flex;
    flex-direction: row;
`;
const FontLeft = styled.div`
    height: 150px;
    width: 318px;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    span {
        display: block;
        height: 20px;
        font-size: 12px;
        padding-top: 0px;
        padding-bottom: 0px;
    }
`;
const EffectItem = styled.div`
    width: 318px;
    height: 100px;
`;
const Strikethrough = styled.div`
    display: flex;
    flex-direction: row;
    span {
        padding-left: 5px;
        padding-top: 2px;
    }
`;
const FontRight = styled.div`
    height: 150px;
    width: 330px;
    display: flex;
    flex-direction: column;
`;
const FontColor = styled.div`
    width: 330px;
    height: 50px;
    span {
        display: block;
        padding-left: 5px;
        width: 330px;
        height: 20px;
        font-size: 12px;
    }
`;
const ArrowDownIcon = styled.div`
    width: 20px;
    height: 23px;
    border-left: 1px solid lightgray;
`;
const FontColorSelector = styled.div`
    width: 325px;
    height: 24px;
    margin-left: 5px;
    display: flex;
    border: 1px solid lightgray;
    &:hover {
        border: 1px solid black;
    }
`;
const FontColorPreView = styled.div`
    height: 150px;
    border: 4px solid #fff;
    width: 300px;
    height: 16px;
`;

/*
 * 字体 格式面板
 */
const FontFormatPanel = (props) => {
    const dispatch = useDispatch();
    const fontFamilies = getFontFamilies();
    const fontSizes = getFontSizes();

    const {
        selectedFontFamily,
        setSelectedFontFamily,
        selectedFontSize,
        setSelectedFontSize,
        selectedFontStyle,
        setSelectedFontStyle,
        selectedUnderlineStyle,
        setSelectedUnderlineStyle,
    } = props;
    const fontStyles = useSelector(({ fontSlice }) => fontSlice);
    const borderStyle = useSelector(({ borderSlice }) => borderSlice);
    const fontCellSetting = useSelector(
        ({ fontCellSettingSlice }) => fontCellSettingSlice
    );
    const {
        
        fontFamily = '微软雅黑',
        fontWeight,
        fontStyle,
        fontSize = 11,
        textDecoration,
        isStrickoutLine,
    } = fontStyles;

    const { selectedFontColor } = fontCellSetting;
    const handleFontFamily = (value) => {
        setSelectedFontFamily(value);
    };
    const handleFontSize = (value) => {
        setSelectedFontSize(value);
    };
    const handleFontStyle = (value) => {
        const keys = Object.keys(FontStyle);
        const selectedOptionValue = keys.find((k) => FontStyle[k] === value);
        selectedOptionValue &&
            setSelectedFontStyle(selectedOptionValue.toString());
    };
    const handleUnderlineStyle = (value) => {
        setSelectedUnderlineStyle(value);
    };
    const handleColorEditorforFont = (color) => {
        dispatch(setSelectedFontColor({ selectedFontColor: color }));
    };
    const handleIsStrickout = (event) => {
        dispatch(setIsStrickoutLine({ isStrickoutLine: !isStrickoutLine }));
    };
    // 解析TextDecoration数值
    function parseTextDecoration(textDecoration) {
        if (textDecoration == 1 || textDecoration - 2 == 1) {
            return '单下划线';
        } else if (textDecoration == 8 || textDecoration - 2 == 8) {
            return '双下划线';
        } else {
            return '无';
        }
    }

    // 转换字形选择框对应的key
    function transformFontToselectedFontStyleKey() {
        let selectFontKey = '';
        if (fontWeight === 'bold' && fontStyle === 'italic') {
            selectFontKey = fontWeight + fontStyle;
        } else if (fontWeight !== 'bold' && fontStyle !== 'italic') {
            selectFontKey = 'normal';
        } else if (fontWeight === 'bold') {
            selectFontKey = 'bold';
        } else if (fontStyle === 'italic') {
            selectFontKey = 'italic';
        }

        return FontStyle[selectFontKey];
    }

    // 转成列表数据格式
    const fontFamiliesToListData = function (metadatas) {
        const result = [];
        metadatas.forEach((metadata) => {
            result.push(metadata.value);
        });
        return result;
    };

    return (
        <>
            <FontTop>
                <FontList>
                    <span>字体:</span>
                    <List
                        width='320px'
                        height='150px'
                        isHasInput={true}
                        values={fontFamiliesToListData(fontFamilies)}
                        selectedValue={fontFamily}
                        onChange={handleFontFamily}
                    />
                </FontList>
                <FontStyleSelect>
                    <span>字形:</span>
                    <List
                        width='160px'
                        height='150px'
                        isHasInput={true}
                        values={Object.values(FontStyle)}
                        selectedValue={transformFontToselectedFontStyleKey()}
                        onChange={handleFontStyle}
                    />
                </FontStyleSelect>
                <FontSizeSelect>
                    <span>字号:</span>
                    <List
                        width='160px'
                        height='150px'
                        isHasInput={true}
                        values={fontFamiliesToListData(fontSizes)}
                        selectedValue={fontSize}
                        onChange={handleFontSize}
                    />
                </FontSizeSelect>
            </FontTop>
            <FontMiddle>
                <FontLeft>
                    <div>
                        <span>下划线:</span>
                        <Select
                            datas={UnderlineStyle}
                            style={{
                                height: '25px',
                                width: '317px',
                            }}
                            optionStyle={{
                                width: '321px',
                            }}
                            onChange={handleUnderlineStyle}
                            value={parseTextDecoration(textDecoration)}
                        ></Select>
                    </div>
                    <EffectItem>
                        <fieldset
                            style={{
                                border: '1px solid lightgray',
                                fontSize: '12px',
                                width: 317,
                                height: 100,
                                padding: 0,
                                marginTop: 5,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <legend>特殊效果</legend>
                            <Strikethrough>
                                <input
                                    type='checkbox'
                                    checked={isStrickoutLine}
                                    onChange={handleIsStrickout}
                                ></input>
                                <span>删除线</span>
                            </Strikethrough>
                        </fieldset>
                    </EffectItem>
                </FontLeft>

                <FontRight>
                    <FontColor>
                        <span>颜色:</span>
                        <ColorEditor
                            style={{ width: '188px' }}
                            onChange={handleColorEditorforFont}
                            value={selectedFontColor}
                        >
                            <FontColorSelector>
                                <FontColorPreView
                                    style={{
                                        backgroundColor: selectedFontColor,
                                    }}
                                ></FontColorPreView>
                                <ArrowDownIcon>
                                    <ArrowDown
                                        style={{
                                            width: 20,
                                            height: 23,
                                            margin: 0,
                                        }}
                                    ></ArrowDown>
                                </ArrowDownIcon>
                            </FontColorSelector>
                        </ColorEditor>
                    </FontColor>
                    <div>
                        <fieldset
                            style={{
                                border: '1px solid lightgray',
                                fontSize: '12px',
                                height: 100,
                                width:325,
                                padding: 0,
                                marginTop: 6,
                                marginLeft: 5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <legend>预览</legend>
                            <div
                                style={{
                                    fontFamily: selectedFontFamily,
                                    fontWeight: selectedFontStyle.includes(
                                        'bold'
                                    )
                                        ? 'bold'
                                        : 'normal',
                                    fontSize: selectedFontSize + 'pt',
                                    color: selectedFontColor,
                                    fontStyle: selectedFontStyle.includes(
                                        'italic'
                                    )
                                        ? 'italic'
                                        : 'normal',
                                    textDecorationLine: `${
                                        isStrickoutLine ? 'line-through' : ''
                                    } ${
                                        selectedUnderlineStyle === '单下划线'
                                            ? 'underline'
                                            : ''
                                    }`,
                                    borderBottom:
                                        selectedUnderlineStyle === '双下划线'
                                            ? `3px double ${selectedFontColor}`
                                            : 'unset',
                                }}
                            >
                                AaBbCcYyZz
                            </div>
                        </fieldset>
                    </div>
                </FontRight>
            </FontMiddle>
        </>
    );
};
export default FontFormatPanel;
