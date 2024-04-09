import React from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  CheckBox,
  ColorPicker,
} from '@components/form/Index';
import Select from '@components/Select/Index';
import {
  getFontFamilies,
  getFontSizes,
} from '@metadatas/font';

import List from '../../list/List';
import {
  FontStyle,
  UnderlineStyle,
} from '../constant';

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

// 转成列表数据格式
const fontFamiliesToListData = function (metadatas) {
    const result = [];
    metadatas.forEach((metadata) => {
        result.push(metadata.value);
    });
    return result;
};

// 转换字形选择框对应的key
function transformFontToselectedFontStyleKey(fontWeight, fontStyle) {
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

/*
 * 字体 格式面板
 */
export default function (props) {
    const dispatcher = useDispatch();
    const fontFamilies = getFontFamilies();
    const fontSizes = getFontSizes();
    const {
        selectedFontFamily,
        selectedFontSize,
        selectedFontStyle = [],
        setSelectedFontStyle,
        selectedUnderlineStyle,
    } = props;
    const { fontSetting } = useSelector(
        ({ cellSettingSlice }) => cellSettingSlice
    );

    const handleFontStyle = (value) => {
        const keys = Object.keys(FontStyle);
        const selectedOptionValue = keys.find((k) => FontStyle[k] === value);
        selectedOptionValue &&
            setSelectedFontStyle(selectedOptionValue.toString());
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

    const changeHandler = (val, attrName) => {
        dispatcher(
            setNumberSetting({
                ...numberSetting,
                [attrName]: val,
            })
        );
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
                        selectedValue={fontSetting.fontFamily}
                        onChange={(val) => changeHandler(val, 'fontFamily')}
                    />
                </FontList>
                <FontStyleSelect>
                    <span>字形:</span>
                    <List
                        width='160px'
                        height='150px'
                        isHasInput={true}
                        values={Object.values(FontStyle)}
                        selectedValue={transformFontToselectedFontStyleKey(
                            fontSetting.fontWeight,
                            fontSetting.fontStyle
                        )}
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
                        selectedValue={fontSetting.fontSize}
                        onChange={(val) => changeHandler(val, 'fontSizes')}
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
                            onChange={(val) =>
                                changeHandler(val, 'textDecoration')
                            }
                            value={parseTextDecoration(
                                fontSetting.textDecoration
                            )}
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
                                <CheckBox
                                    value={fontSetting.isStrickoutLine}
                                    onChange={(val) =>
                                        changeHandler(val, 'isStrickoutLine')
                                    }
                                ></CheckBox>
                            </Strikethrough>
                        </fieldset>
                    </EffectItem>
                </FontLeft>

                <FontRight>
                    <FontColor>
                        <span>颜色:</span>
                        <ColorPicker
                            style={{ marginLeft: 5 }}
                            panelStyle={{ width: '188px', marginLeft: 5 }}
                            onChange={(val)=>changeHandler(val,'fontColor')}
                            value={fontSetting.fontColor}
                        ></ColorPicker>
                    </FontColor>
                    <div>
                        <fieldset
                            style={{
                                border: '1px solid lightgray',
                                fontSize: '12px',
                                height: 100,
                                width: 325,
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
                                    fontFamily: fontSetting.fontFamily,
                                    fontWeight: fontSetting.fontStyle.includes(
                                        'bold'
                                    )
                                        ? 'bold'
                                        : 'normal',
                                    fontSize: fontSetting.fontSize + 'pt',
                                    color: fontSetting.fontColor,
                                    fontStyle: fontSetting.fontStyle.includes(
                                        'italic'
                                    )
                                        ? 'italic'
                                        : 'normal',
                                    textDecorationLine: `${
                                        fontSetting.isStrickoutLine ? 'line-through' : ''
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
}
