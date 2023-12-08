import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  GroupItem,
  ItemList,
} from '@components/group/Index';
import AlignCenter from '@icons/align/AlignCenter';
import AlignLeft from '@icons/align/AlignLeft';
import AlignRight from '@icons/align/AlignRight';
import VAlignBottom from '@icons/align/VAlignBottom';
import VAlignCenter from '@icons/align/VAlignCenter';
import VAlignTop from '@icons/align/VAlignTop';
import ArrowDown from '@icons/arrow/ArrowDown';
import DirectionSetting from '@icons/direction/DirectionSetting';
import BreakLine from '@icons/font/BreakLine';
import DecreaseIndent from '@icons/indent/DecreaseIndent.jsx';
import IncreaseIndent from '@icons/indent/IncreaseIndent.jsx';
import MergeCenter from '@icons/merge/MergeCenter';
import {
  directionToStyles,
  getWordDirections,
} from '@metadatas/direction';
import { getMergeTypes } from '@metadatas/merge';

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
import LineSepatator from '../lineSeparator/lineSeparator';

const Label = styled.span`
    font-size: 12px;
`;

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
    const handleTextOrientation = (item)=>{
       const {value} = item;
       const styles = directionToStyles(value);
       if(styles){
           spread.suspendPaint();
            try{
                for(let attr in styles){
                    if(styles.hasOwnProperty(attr)){
                        _setStyle({
                            value: styles[attr],
                            property: attr
                        });
                    }
                }
            } finally{
                spread.resumePaint();
            }
       }
    }
    const wordDirections = getWordDirections();
    const mergeTypes = getMergeTypes();
    return (
        <GroupItem title='对齐方式' onMore={() => {}}>
            <div style={{ display: 'flex' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRight: 'solid 1px lightgray',
                    }}
                >
                    <ItemList>
                        <VAlignTop
                            tips='顶端对齐'
                            active={vAlign === 0}
                            onClick={_topAlignClickHandler}
                        ></VAlignTop>
                        <VAlignCenter
                            tips='垂直居中'
                            active={vAlign === 1}
                            onClick={_middleAlignClickHandler}
                        ></VAlignCenter>
                        <VAlignBottom
                            tips='底端对齐'
                            active={vAlign === 2}
                            onClick={_bottomAlignClickHandler}
                        ></VAlignBottom>
                        <LineSepatator></LineSepatator>
                        <DropdownBox
                            datas={wordDirections}
                            lineIndexs={[4]}
                            isShowIcon={true}
                            isShowText={false}
                            isShowBorder={false}
                            className='borderOpt'
                            optionStyle={{ left: -24 }}
                            onChange={handleTextOrientation}
                        >
                            <DirectionSetting tips='方向'><ArrowDown tips='方向'></ArrowDown></DirectionSetting>
                        </DropdownBox>
                    </ItemList>
                    <ItemList>
                        <AlignLeft
                            tips='左对齐'
                            active={hAlign === 0}
                            onClick={_leftAlignClickHandler}
                        ></AlignLeft>
                        <AlignCenter
                            tips='居中'
                            active={hAlign === 1}
                            onClick={_centerAlignClickHandler}
                        ></AlignCenter>
                        <AlignRight
                            tips='右对齐'
                            active={hAlign === 2}
                            onClick={_rightAlignClickHandler}
                        ></AlignRight>
                        <LineSepatator></LineSepatator>
                        <DecreaseIndent
                            tips='减少缩进量'
                            onClick={_decreaseIndentClickHandler}
                        ></DecreaseIndent>
                        <IncreaseIndent
                            tips='增加缩进量'
                            onClick={_increaseIndentClickHandler}
                        ></IncreaseIndent>
                    </ItemList>
                </div>
                <div>
                    <ItemList>
                        <div onClick={_wrapTextClickHandler}>
                            <BreakLine tips='自动换行'><Label>自动换行</Label></BreakLine>
                        </div>
                    </ItemList>
                    <ItemList>
                    <MergeCenter tips='合并后居中'  onClick={_mergeCenterClickHandler}><Label>合并后居中</Label></MergeCenter>
                    <DropdownBox
                            datas={mergeTypes}
                            isShowIcon={true}
                            isShowText={false}
                            isShowBorder={false}
                            className='borderOpt'
                            optionStyle={{ left: -24 }}
                            onChange={_mergeOptChangeHandler}
                        >
                            <ArrowDown tips='合并后居中'></ArrowDown>
                        </DropdownBox>
                    </ItemList>
                </div>
            </div>
        </GroupItem>
    );
}

export default FontAlign;
