import { useSelector } from 'react-redux';

import { VItem } from '@components/group/Index';
import Popper from '@components/popper/Index';
import ArrowDownIcon from '@icons/arrow/ArrowDown';
import ShapeIcon from '@icons/illustration/Shape';
import { insertShape } from '@utils/shapeUtil';

import { ContentWrap } from '../../Component';
import ArrowCard from './ArrowCard';
import BaseCard from './BaseCard';
import CommentCard from './CommentCard';
import FlowCard from './FlowCard';
import FormulaCard from './FormulaCard';
import LineCard from './LineCard';
import RectCard from './RectCard';
import StartCard from './StarCard';

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const style = {
        marginLeft: 8,
        paddingLeft: 4,
        paddingRight: 4,
        paddingBottom: 4,
    };
    const iconStyle = {
        width: 28,
        height: 28,
    };
    const arrowStyle = {
        width: 16,
        height: 16,
    };
    const handleClick = (evt) => {
        const shapeType = evt.currentTarget.dataset.type;
        insertShape(spread, shapeType);
    };
    return (
        <Popper
            content={
                <ContentWrap>
                    <LineCard onClick={handleClick}></LineCard>
                    <RectCard onClick={handleClick}></RectCard>
                    <BaseCard onClick={handleClick}></BaseCard>
                    <ArrowCard onClick={handleClick}></ArrowCard>
                    <FormulaCard onClick={handleClick}></FormulaCard>
                    <FlowCard onClick={handleClick}></FlowCard>
                    <StartCard onClick={handleClick}></StartCard>
                    <CommentCard onClick={handleClick}></CommentCard>
                </ContentWrap>
            }
            contentStyle={{ overflowX: 'hidden' }}
        >
            <VItem
                title='形状'
                style={style}
                icon={<ShapeIcon iconStyle={iconStyle}></ShapeIcon>}
                onClick={() => {}}
            >
                <ArrowDownIcon style={arrowStyle}></ArrowDownIcon>
            </VItem>
        </Popper>
    );
}
