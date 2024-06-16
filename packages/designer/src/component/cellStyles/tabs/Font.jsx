import React from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import { Preview } from '@components/preview/Index';
import {
  getFontFamilies,
  getFontSizes,
} from '@metadatas/font';
import { setFontSetting } from '@store/cellSettingSlice';
import {
  CheckBox,
  ColorPicker,
  List,
  Select,
} from '@toone/report-ui';

import {
  isLineThrough,
  withLineThrough,
  withoutLineThrough,
} from '../../../utils/textDecorationUtil';
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

const Font_Family_Options = getFontFamilies().map(({value,text})=>{
    return {value,text}
});

const Font_Style_Options = Object.entries(FontStyle).map(([key, val]) => {
    return {
        value: key,
        text: val,
    };
});

const Font_Size_Options = getFontSizes().map(({ value, text }) => {
    return {
        value,
        text,
    };
});

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

    return selectFontKey;
}

/*
 * 字体 格式面板
 */
export default function (props) {
    const dispatcher = useDispatch();
    const { borderSetting,fontSetting,setting,numberSetting,fillSetting } = useSelector(
        ({ cellSettingSlice }) => cellSettingSlice
    );
    const { fontFamily, fontSize, fontWeight, fontStyle, textDecoration } =
        fontSetting;
    const changeHandler = (val, attrName) => {
        dispatcher(
            setFontSetting({
                ...fontSetting,
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
                        datas={Font_Family_Options}
                        selectedValue={fontFamily}
                        disabled={setting?.font?.fontFamily === false}
                        onChange={(val) => changeHandler(val, 'fontFamily')}
                    />
                </FontList>
                <FontStyleSelect>
                    <span>字形:</span>
                    <List
                        width='160px'
                        height='150px'
                        isHasInput={true}
                        datas={Font_Style_Options}
                        disabled={setting?.font?.fontStyle === false}
                        selectedValue={transformFontToselectedFontStyleKey(
                            fontWeight,
                            fontStyle
                        )}
                        onChange={(val) => {
                            let fontWeight = null,
                                fontStyle = null;
                            if (val == 'italic') {
                                fontStyle = 'italic';
                            } else if (val == 'bold') {
                                fontWeight = 'bold';
                            } else if (val == 'bolditalic') {
                                fontStyle = 'italic';
                                fontWeight = 'bold';
                            }
                            dispatcher(
                                setFontSetting({
                                    ...fontSetting,
                                    fontWeight,
                                    fontStyle,
                                })
                            );
                        }}
                    />
                </FontStyleSelect>
                <FontSizeSelect>
                    <span>字号:</span>
                    <List
                        width='160px'
                        height='150px'
                        isHasInput={true}
                        datas={Font_Size_Options}
                        selectedValue={fontSize}
                        disabled={setting?.font?.fontSize === false}
                        onChange={(val) => changeHandler(val, 'fontSize')}
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
                            disabled={setting?.font?.underlineStyle === false}
                            onChange={(val) => {
                                val = isLineThrough(textDecoration)
                                    ? withLineThrough(val)
                                    : val;
                                changeHandler(val, 'textDecoration');
                            }}
                            value={
                                isLineThrough(textDecoration)
                                    ? withoutLineThrough(textDecoration)
                                    : textDecoration
                            }
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
                            <legend style={{ marginLeft: 8 }}>特殊效果</legend>
                            <Strikethrough>
                                <CheckBox
                                    value={isLineThrough(
                                        fontSetting.textDecoration
                                    )}
                                    title='删除线'
                                    style={{ marginLeft: 8 }}
                                    disabled={setting?.font?.lineThrough === false}
                                    onChange={(val) => {
                                        changeHandler(
                                            val
                                                ? withLineThrough(
                                                      fontSetting.textDecoration
                                                  )
                                                : withoutLineThrough(
                                                      fontSetting.textDecoration
                                                  ),
                                            'textDecoration'
                                        );
                                    }}
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
                            onChange={(val) => changeHandler(val, 'foreColor')}
                            value={fontSetting.foreColor}
                            disabled={setting?.font?.foreColor === false}
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
                            <legend style={{ marginLeft: 8 }}>预览</legend>
                            <Preview
                                style={{
                                    width: 260,
                                    height: 60,
                                }}
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
                            ></Preview>
                        </fieldset>
                    </div>
                </FontRight>
            </FontMiddle>
        </>
    );
}
