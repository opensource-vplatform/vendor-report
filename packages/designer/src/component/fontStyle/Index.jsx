import {
  useDispatch,
  useSelector,
} from 'react-redux';

import ColorEditor from '@components/color/Index';
import {
  GroupItem,
  ItemList,
} from '@components/group/Index';
import ArrowDown from '@icons/arrow/ArrowDown';
import BorderBottom from '@icons/border/BorderBottom';
import Bold from '@icons/font/Bold';
import DoubleUnderline from '@icons/font/DoubleUnderline ';
import FillColor from '@icons/font/FillColor ';
import FontSizeDown from '@icons/font/FontSizeDown';
import FontSizeUp from '@icons/font/FontSizeUp';
import ForceColor from '@icons/font/ForceColor';
import Italic from '@icons/font/Italic';
import Underline from '@icons/font/Underline';
import {
  getBorderEnums,
  toBorders,
} from '@metadatas/border';
import {
  getFontFamilies,
  getFontSizes,
} from '@metadatas/font';

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
import DropdownBox from '../dropdownBox/dropdownBox';
import LineSepatator from '../lineSeparator/lineSeparator';

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
        const type = data.value;
        const values = toBorders(type);
        const sheet = spread?.getActiveSheet?.();
        spread.suspendPaint();
        try {
            values.forEach((value) => {
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
    const fontFamilies = getFontFamilies();
    const fontSizes = getFontSizes();
    const borders = getBorderEnums();
    return (
        <GroupItem title='字体' onMore={() => {}}>
            <ItemList>
                <DropdownBox
                    datas={fontFamilies}
                    className='fontFamily'
                    style={{ width: '100px' }}
                    onChange={_fontFamilyClickHandler}
                ></DropdownBox>
                <DropdownBox
                    datas={fontSizes}
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
                    active={fontWeight !== 'normal'}
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
                    datas={borders}
                    lineIndexs={[3, 7, 12]}
                    isShowIcon={true}
                    isShowText={false}
                    isShowBorder={false}
                    className='borderOpt'
                    optionStyle={{ left: -24 }}
                    onChange={_borderOptChangeHandler}
                >
                    <ArrowDown tips='边框'></ArrowDown>
                </DropdownBox>
                <LineSepatator></LineSepatator>
                <ColorEditor>
                    <FillColor tips='填充颜色'></FillColor>
                </ColorEditor>
                <ColorEditor>
                    <ForceColor tips='字体颜色'></ForceColor>
                </ColorEditor>
            </ItemList>
        </GroupItem>
    );
}
