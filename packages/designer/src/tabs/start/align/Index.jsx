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
import { fireCellEnter } from '@utils/eventUtil';
import { exeCommand } from '@utils/spreadUtil';
import {
  exeStyleCommand,
  genCellSettingVisibleHandler,
  handleStyle,
} from '@utils/styleUtil';

import { Commands } from '../../../command';

const Label = styled.span`
    font-size: 12px;
`;

export default function FontAlign() {
    const dispatch = useDispatch();
    const { vAlign, hAlign, wordWrap, textOrientation, isVerticalText } =
        useSelector(({ styleSlice }) => styleSlice);
    const { spread } = useSelector(({ appSlice }) => appSlice);

    //顶端对齐
    const handleVTopAlign = function () {
        handleStyle(spread, { vAlign: 0 });
    };

    //垂直居中
    const handleVCenterAlign = function () {
        handleStyle(spread, { vAlign: 1 });
    };

    //底端对齐
    const handleVBottomAlign = function () {
        handleStyle(spread, { vAlign: 2 });
    };

    //文本左对齐
    const handleHLeftAlign = function () {
        handleStyle(spread, { hAlign: 0 });
    };

    //居中
    const handleHCenterAlign = function () {
        handleStyle(spread, { hAlign: 1 });
    };

    //文本右对齐
    const handleHRightAlign = function () {
        handleStyle(spread, { hAlign: 2 });
    };

    //增加缩进量
    const handleIncreaseIndent = function () {
        exeStyleCommand(spread, { textIndentDelta: 1 });
    };

    //减少缩进量
    const handleDecreaseIndent = function () {
        exeStyleCommand(spread, { textIndentDelta: -1 });
    };

    //自动换行
    const handleWordWrap = function () {
        handleStyle(spread, { wordWrap: !wordWrap });
    };

    const handleMerge = function (type) {
        exeCommand(spread, Commands.Style.Merge, { type });
        fireCellEnter(spread);
    };

    //合并居中
    const handleMergeCenter = () => {
        handleMerge('mergeCenter');
    };

    const showCellSetting = genCellSettingVisibleHandler(spread, dispatch, 'align');

    //设置文字方向
    const handleTextOrientation = (value) => {
        if (value === 'directionSetting') {
            showCellSetting();
            return;
        }
        const style = directionToStyles(value);
        if (style) {
            handleStyle(spread, style);
        }
    };
    const wordDirections = getWordDirections();
    const mergeTypes = getMergeTypes();
    return (
        <GroupItem
            title='对齐方式'
            onMore={showCellSetting}
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
                            value={valueToEnum(textOrientation, isVerticalText)}
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
                        <Menu datas={mergeTypes} onNodeClick={handleMerge}>
                            <ArrowDown tips='合并后居中'></ArrowDown>
                        </Menu>
                    </ItemList>
                </VGroupItem>
            </HLayout>
        </GroupItem>
    );
}
