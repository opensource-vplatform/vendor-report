import { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  GroupItem,
  HLayout,
  ItemList,
  VGroupItem,
} from '@components/group/Index';
import LineSepatator from '@components/lineSeparator/lineSeparator';
import Menu from '@components/menu/Index';
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
  valueToEnum,
} from '@metadatas/direction';
import { getMergeTypes } from '@metadatas/merge';
import {
  setIsOpenCellSetting,
  setTabValueCellSetting,
} from '@store/borderSlice/borderSlice';
import {
  setHAlign,
  setTextOrientation,
  setVAlign,
  setWordWrap,
} from '@store/fontSlice/fontSlice.js';
import {
  mergeAcross,
  mergeCells,
  mergeCenter,
  setAlign,
  setIndent,
  unMergeCell,
} from '@utils/fontUtil.js';

const Label = styled.span`
    font-size: 12px;
`;

export default function FontAlign() {
    const dispatch = useDispatch();
    const fontStyle = useSelector(({ fontSlice }) => fontSlice);
    const {
        spread,
        vAlign,
        hAlign,
        wordWrap,
        textOrientation,
        isVerticalText,
    } = fontStyle;

    //顶端对齐
    const handleVTopAlign = function () {
        dispatch(setVAlign({ vAlign: 0 }));
    };

    //垂直居中
    const handleVCenterAlign = function () {
        dispatch(setVAlign({ vAlign: 1 }));
    };

    //底端对齐
    const handleVBottomAlign = function () {
        dispatch(setVAlign({ vAlign: 2 }));
    };

    //文本左对齐
    const handleHLeftAlign = function () {
        dispatch(setHAlign({ hAlign: 0 }));
    };

    //居中
    const handleHCenterAlign = function () {
        dispatch(setHAlign({ hAlign: 1 }));
    };

    //文本右对齐
    const handleHRightAlign = function () {
        dispatch(setHAlign({ hAlign: 2 }));
    };

    //增加缩进量
    const handleIncreaseIndent = function () {
        setIndent(spread, 1);
    };

    //减少缩进量
    const handleDecreaseIndent = function () {
        setIndent(spread, -1);
    };

    //自动换行
    const handleWordWrap = function () {
        dispatch(setWordWrap({ wordWrap: !wordWrap }));
    };

    const handleMerge = function (type) {
        if (type == 'mergeCenter') {
            mergeCenter(spread);
        } else if (type == 'mergeAcross') {
            mergeAcross(spread);
        } else if (type == 'mergeCells') {
            mergeCells(spread);
        } else {
            unMergeCell(spread);
        }
    };

    //合并居中
    const handleMergeCenter = () => {
        mergeCenter(spread);
    };
    //设置文字方向
    const handleTextOrientation = (value) => {
        if (value === 'directionSetting') {
            dispatch(setTabValueCellSetting('对齐'));
            dispatch(setIsOpenCellSetting(true));
            return;
        }
        const styles = directionToStyles(value);
        styles && dispatch(setTextOrientation(styles));
    };
    const wordDirections = getWordDirections();
    const mergeTypes = getMergeTypes();
    useEffect(() => {
        //store数据更新到spread中
        setAlign({
            spread,
            vAlign,
            hAlign,
            textOrientation,
            isVerticalText,
            wordWrap,
        });
    }, [vAlign, hAlign, textOrientation, isVerticalText, wordWrap]);
    return (
        <GroupItem
            title='对齐方式'
            onMore={() => {
                dispatch(setTabValueCellSetting('对齐'));
                dispatch(setIsOpenCellSetting(true));
            }}
        >
            <HLayout>
                <VGroupItem>
                    <ItemList>
                        <VAlignTop
                            tips='顶端对齐'
                            active={vAlign === 0}
                            onClick={handleVTopAlign}
                        ></VAlignTop>
                        <VAlignCenter
                            tips='垂直居中'
                            active={vAlign === 1}
                            onClick={handleVCenterAlign}
                        ></VAlignCenter>
                        <VAlignBottom
                            tips='底端对齐'
                            active={vAlign === 2}
                            onClick={handleVBottomAlign}
                        ></VAlignBottom>
                        <LineSepatator></LineSepatator>
                        <Menu
                            datas={wordDirections}
                            value={valueToEnum(fontStyle)}
                            lineIndexs={[4]}
                            cancelAble={true}
                            cancelValue='none'
                            onNodeClick={handleTextOrientation}
                        >
                            <DirectionSetting tips='方向'>
                                <ArrowDown tips='方向'></ArrowDown>
                            </DirectionSetting>
                        </Menu>
                    </ItemList>
                    <ItemList>
                        <AlignLeft
                            tips='左对齐'
                            active={hAlign === 0}
                            onClick={handleHLeftAlign}
                        ></AlignLeft>
                        <AlignCenter
                            tips='居中'
                            active={hAlign === 1}
                            onClick={handleHCenterAlign}
                        ></AlignCenter>
                        <AlignRight
                            tips='右对齐'
                            active={hAlign === 2}
                            onClick={handleHRightAlign}
                        ></AlignRight>
                        <LineSepatator></LineSepatator>
                        <DecreaseIndent
                            tips='减少缩进量'
                            onClick={handleDecreaseIndent}
                        ></DecreaseIndent>
                        <IncreaseIndent
                            tips='增加缩进量'
                            onClick={handleIncreaseIndent}
                        ></IncreaseIndent>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList>
                        <div onClick={handleWordWrap}>
                            <BreakLine tips='自动换行' active={wordWrap}>
                                <Label>自动换行</Label>
                            </BreakLine>
                        </div>
                    </ItemList>
                    <ItemList>
                        <MergeCenter
                            tips='合并后居中'
                            onClick={handleMergeCenter}
                        >
                            <Label>合并后居中</Label>
                        </MergeCenter>
                        <Menu
                            datas={mergeTypes}
                            onNodeClick={handleMerge}
                        >
                            <ArrowDown tips='合并后居中'></ArrowDown>
                        </Menu>
                    </ItemList>
                </VGroupItem>
            </HLayout>
        </GroupItem>
    );
}
