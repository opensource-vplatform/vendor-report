import './fontAlign.scss';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { useFontAction } from '../../hooks/fontHooks.js';
import {
  toggleFont,
  updateFont,
} from '../../store/fontSlice/fontSlice.js';
import {
  mergeAcross,
  mergeCells,
  mergeCenter,
  setIndent,
  unMergeCell,
} from '../../utils/fontUtil.js';
import DropdownBox from '../dropdownBox/dropdownBox';
import FooterLabel from '../footerLabel/footerLabel';
import LineSepatator from '../lineSeparator/lineSeparator';
import UiIcon from '../uiIcon/uiIcon';

const mergeOptDatas = [
    { value: 'mergeCenter', text: '合并后居中', title: '合并后居中' },
    { value: 'mergeAcross', text: '跨越合并', title: '跨越合并' },
    { value: 'mergeCells', text: '合并单元格', title: '合并单元格' },
    {
        value: 'unMergeCell',
        text: '取消单元格合并',
        title: '取消单元格合并',
    },
];

function FontAlign(props) {
    const dispatch = useDispatch();
    const { spread, vAlign, hAlign, isVerticalText, isWordWrap, mergeType } =
        useSelector(({ fontSlice }) => fontSlice);

    const _setStyle = useFontAction();

    const _setIndent = function (value) {
        const sheet = spread?.getActiveSheet?.();
        spread.suspendPaint();
        try {
            setIndent({
                value,
                sheet,
            });
        } catch (e) {
        } finally {
            spread.resumePaint();
        }
        spread.focus(true);
    };

    const _AlignAction = function (type, value) {
        _setStyle({
            value,
            attribute: type,
            property: type,
            dispatchFun: updateFont,
            dispatchParams: {
                font: { [type]: value },
            },
        });
    };

    //顶端对齐
    const _topAlignClickHandler = function () {
        _AlignAction('vAlign', 0);
    };

    //垂直居中
    const _middleAlignClickHandler = function () {
        _AlignAction('vAlign', 1);
    };

    //底端对齐
    const _bottomAlignClickHandler = function () {
        _AlignAction('vAlign', 2);
    };

    //竖排文字
    const _verticalTextClickHandler = function () {
        const value = !isVerticalText;
        _setStyle({
            value,
            attribute: 'isVerticalText',
            property: 'isVerticalText',
            dispatchFun: updateFont,
            dispatchParams: {
                font: { isVerticalText: value },
            },
        });
    };

    //文本左对齐
    const _leftAlignClickHandler = function () {
        _AlignAction('hAlign', 0);
    };

    //居中
    const _centerAlignClickHandler = function () {
        _AlignAction('hAlign', 1);
    };

    //文本右对齐
    const _rightAlignClickHandler = function () {
        _AlignAction('hAlign', 2);
    };

    //增加缩进量
    const _increaseIndentClickHandler = function () {
        _setIndent(1);
    };
    //减少缩进量
    const _decreaseIndentClickHandler = function () {
        _setIndent(-1);
    };

    //自动换行
    const _wrapTextClickHandler = function () {
        _setStyle({
            value: !isWordWrap,
            attribute: 'wordWrap',
            property: 'wordWrap',
            dispatchFun: toggleFont,
            dispatchParams: 'isWordWrap',
        });
    };

    const _mergeHandler = function (params) {
        const { mergeType } = params;
        const sheet = spread?.getActiveSheet?.();
        spread.suspendPaint();
        try {
            switch (mergeType) {
                case 'mergeCenter':
                    mergeCenter({
                        sheet,
                    });
                    break;
                case 'mergeAcross':
                    mergeAcross({
                        sheet,
                    });
                    break;
                case 'mergeCells':
                    debugger;
                    mergeCells({
                        sheet,
                    });
                    break;
                default:
                    unMergeCell({
                        sheet,
                    });
                    break;
            }

            const params = {
                mergeType,
            };
            mergeType === 'mergeCenter' && hAlign !== 1 && (params.hAlign = 1);
            dispatch(updateFont({ font: params }));
        } catch (e) {
        } finally {
            spread.resumePaint();
        }
        spread.focus(true);
    };

    //合并后居中
    const _mergeCenterClickHandler = function () {
        let _mergeType = 'mergeCenter';
        if (mergeType && mergeType !== 'unMergeCell') {
            _mergeType = 'unMergeCell';
        }
        _mergeHandler({
            mergeType: _mergeType,
        });
    };

    const _mergeOptChangeHandler = function (data) {
        _mergeHandler({
            mergeType: data.value,
        });
    };

    return (
        <div className='fontAlignBox'>
            <div className='header'>
                <div className='headerLeft'>
                    <div>
                        <UiIcon
                            title='顶端对齐'
                            className={`topAlign ${
                                vAlign === 0 ? 'active' : ''
                            }`}
                            click={_topAlignClickHandler}
                        ></UiIcon>
                        <UiIcon
                            title='垂直居中'
                            className={`middleAlign ${
                                vAlign === 1 ? 'active' : ''
                            }`}
                            click={_middleAlignClickHandler}
                        ></UiIcon>
                        <UiIcon
                            title='底端对齐'
                            className={`bottomAlign ${
                                vAlign === 2 ? 'active' : ''
                            }`}
                            click={_bottomAlignClickHandler}
                        ></UiIcon>
                        <LineSepatator></LineSepatator>
                        <UiIcon
                            title='竖排文字'
                            className={`verticalText ${
                                isVerticalText ? 'active' : ''
                            }`}
                            click={_verticalTextClickHandler}
                        ></UiIcon>
                    </div>
                    <div>
                        <UiIcon
                            title='文本左对齐'
                            className={`leftAlgin ${
                                hAlign === 0 ? 'active' : ''
                            }`}
                            click={_leftAlignClickHandler}
                        ></UiIcon>
                        <UiIcon
                            title='居中'
                            className={`centerAlign ${
                                hAlign === 1 ? 'active' : ''
                            }`}
                            click={_centerAlignClickHandler}
                        ></UiIcon>
                        <UiIcon
                            title='文本右对齐'
                            className={`rightAlign ${
                                hAlign === 2 ? 'active' : ''
                            }`}
                            click={_rightAlignClickHandler}
                        ></UiIcon>
                        <LineSepatator></LineSepatator>
                        <UiIcon
                            title='增加缩进量'
                            className='increaseIndent'
                            click={_increaseIndentClickHandler}
                        ></UiIcon>
                        <UiIcon
                            title='减少缩进量'
                            className='decreaseIndent'
                            click={_decreaseIndentClickHandler}
                        ></UiIcon>
                    </div>
                </div>
                <LineSepatator></LineSepatator>
                <div className='headerRight'>
                    <div>
                        <UiIcon
                            title='自动换行'
                            text='自动换行'
                            className={`wrapText ${isWordWrap ? 'active' : ''}`}
                            click={_wrapTextClickHandler}
                        ></UiIcon>
                    </div>
                    <div className='headerRightBotton'>
                        <UiIcon
                            title='合并后居中'
                            text='合并后居中'
                            className={`mergeCenter ${
                                mergeType === 'mergeCenter' ? 'active' : ''
                            }`}
                            click={_mergeCenterClickHandler}
                        ></UiIcon>
                        <DropdownBox
                            isShowIcon={true}
                            isShowText={false}
                            isShowBorder={false}
                            release={true}
                            datas={mergeOptDatas}
                            className='mergeOpt'
                            onChange={_mergeOptChangeHandler}
                            style={{ width: '16px' }}
                        ></DropdownBox>
                    </div>
                </div>
            </div>
            <FooterLabel labelText='对齐方式' className=''></FooterLabel>
        </div>
    );
}

export default FontAlign;
