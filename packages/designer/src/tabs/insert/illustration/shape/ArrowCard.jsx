import BentArrow from '@icons/illustration/shape/arrow/BentArrow';
import BentUpArrow from '@icons/illustration/shape/arrow/BentUpArrow';
import Chevron from '@icons/illustration/shape/arrow/Chevron';
import CircularArrow from '@icons/illustration/shape/arrow/CircularArrow';
import CurvedDownArrow from '@icons/illustration/shape/arrow/CurvedDownArrow';
import CurvedLeftArrow from '@icons/illustration/shape/arrow/CurvedLeftArrow';
import CurvedRightArrow from '@icons/illustration/shape/arrow/CurvedRightArrow';
import CurvedUpArrow from '@icons/illustration/shape/arrow/CurvedUpArrow';
import DownArrow from '@icons/illustration/shape/arrow/DownArrow';
import DownArrowCallout from '@icons/illustration/shape/arrow/DownArrowCallout';
import LeftArrow from '@icons/illustration/shape/arrow/LeftArrow';
import LeftArrowCallout from '@icons/illustration/shape/arrow/LeftArrowCallout';
import LeftRightArrow from '@icons/illustration/shape/arrow/LeftRightArrow';
import LeftRightArrowCallout
  from '@icons/illustration/shape/arrow/LeftRightArrowCallout';
import LeftRightUpArrow from '@icons/illustration/shape/arrow/LeftRightUpArrow';
import LeftUpArrow from '@icons/illustration/shape/arrow/LeftUpArrow';
import NotchedRightArrow
  from '@icons/illustration/shape/arrow/NotchedRightArrow';
import Pentagon from '@icons/illustration/shape/arrow/Pentagon';
import QuadArrow from '@icons/illustration/shape/arrow/QuadArrow';
import QuadArrowCallout from '@icons/illustration/shape/arrow/QuadArrowCallout';
import RightArrow from '@icons/illustration/shape/arrow/RightArrow';
import RightArrowCallout
  from '@icons/illustration/shape/arrow/RightArrowCallout';
import StripedRightArrow
  from '@icons/illustration/shape/arrow/StripedRightArrow';
import UpArrow from '@icons/illustration/shape/arrow/UpArrow';
import UpArrowCallout from '@icons/illustration/shape/arrow/UpArrowCallout';
import UpDownArrow from '@icons/illustration/shape/arrow/UpDownArrow';
import UTurnArrow from '@icons/illustration/shape/arrow/UTurnArrow';

import {
  Card,
  IconList,
  WithShapeIcon,
} from '../../Component';

const RightArrowIcon = WithShapeIcon(RightArrow);
const LeftArrowIcon = WithShapeIcon(LeftArrow);
const UpArrowIcon = WithShapeIcon(UpArrow);
const DownArrowIcon = WithShapeIcon(DownArrow);
const LeftRightArrowIcon = WithShapeIcon(LeftRightArrow);
const UpDownArrowIcon = WithShapeIcon(UpDownArrow);
const QuadArrowIcon = WithShapeIcon(QuadArrow);
const LeftRightUpArrowIcon = WithShapeIcon(LeftRightUpArrow);
const BentArrowIcon = WithShapeIcon(BentArrow);
const UTurnArrowIcon = WithShapeIcon(UTurnArrow);
const LeftUpArrowIcon = WithShapeIcon(LeftUpArrow);
const BentUpArrowIcon = WithShapeIcon(BentUpArrow);
const CurvedRightArrowIcon = WithShapeIcon(CurvedRightArrow);
const CurvedLeftArrowIcon = WithShapeIcon(CurvedLeftArrow);
const CurvedUpArrowIcon = WithShapeIcon(CurvedUpArrow);
const CurvedDownArrowIcon = WithShapeIcon(CurvedDownArrow);
const StripedRightArrowIcon = WithShapeIcon(StripedRightArrow);
const NotchedRightArrowIcon = WithShapeIcon(NotchedRightArrow);
const PentagonIcon = WithShapeIcon(Pentagon);
const ChevronIcon = WithShapeIcon(Chevron);
const RightArrowCalloutIcon = WithShapeIcon(RightArrowCallout);
const DownArrowCalloutIcon = WithShapeIcon(DownArrowCallout);
const LeftArrowCalloutIcon = WithShapeIcon(LeftArrowCallout);
const UpArrowCalloutIcon = WithShapeIcon(UpArrowCallout);
const LeftRightArrowCalloutIcon = WithShapeIcon(LeftRightArrowCallout);
const QuadArrowCalloutIcon = WithShapeIcon(QuadArrowCallout);
const CircularArrowIcon = WithShapeIcon(CircularArrow);

export default function (props) {
    const { onClick } = props;
    return (
        <Card title='箭头总汇'>
            <IconList>
                <RightArrowIcon
                    tips='箭头:右'
                    data-type='rightArrow'
                    onClick={onClick}
                ></RightArrowIcon>
                <LeftArrowIcon
                    tips='箭头:左'
                    data-type='leftArrow'
                    onClick={onClick}
                ></LeftArrowIcon>
                <UpArrowIcon
                    tips='箭头:上'
                    data-type='upArrow'
                    onClick={onClick}
                ></UpArrowIcon>
                <DownArrowIcon
                    tips='箭头:下'
                    data-type='downArrow'
                    onClick={onClick}
                ></DownArrowIcon>
                <LeftRightArrowIcon
                    tips='箭头:左右'
                    data-type='leftRightArrow'
                    onClick={onClick}
                ></LeftRightArrowIcon>
                <UpDownArrowIcon
                    tips='箭头:上下'
                    data-type='upDownArrow'
                    onClick={onClick}
                ></UpDownArrowIcon>
                <QuadArrowIcon
                    tips='箭头:十字'
                    data-type='quadArrow'
                    onClick={onClick}
                ></QuadArrowIcon>
                <LeftRightUpArrowIcon
                    tips='箭头:丁字'
                    data-type='leftRightUpArrow'
                    onClick={onClick}
                ></LeftRightUpArrowIcon>
                <BentArrowIcon
                    tips='箭头:圆角右'
                    data-type='bentArrow'
                    onClick={onClick}
                ></BentArrowIcon>
                <UTurnArrowIcon
                    tips='箭头:手杖形'
                    data-type='uTurnArrow'
                    onClick={onClick}
                ></UTurnArrowIcon>
                <LeftUpArrowIcon
                    tips='箭头:直角双向'
                    data-type='leftUpArrow'
                    onClick={onClick}
                ></LeftUpArrowIcon>
                <BentUpArrowIcon
                    tips='箭头:直角上'
                    data-type='bentUpArrow'
                    onClick={onClick}
                ></BentUpArrowIcon>
                <CurvedRightArrowIcon
                    tips='箭头:右弧形'
                    data-type='curvedRightArrow'
                    onClick={onClick}
                ></CurvedRightArrowIcon>
                <CurvedLeftArrowIcon
                    tips='箭头:左弧形'
                    data-type='curvedLeftArrow'
                    onClick={onClick}
                ></CurvedLeftArrowIcon>
                <CurvedUpArrowIcon
                    tips='箭头:下弧形'
                    data-type='curvedUpArrow'
                    onClick={onClick}
                ></CurvedUpArrowIcon>
                <CurvedDownArrowIcon
                    tips='箭头:上弧形'
                    data-type='curvedDownArrow'
                    onClick={onClick}
                ></CurvedDownArrowIcon>
                <StripedRightArrowIcon
                    tips='箭头:虚尾'
                    data-type='stripedRightArrow'
                    onClick={onClick}
                ></StripedRightArrowIcon>
                <NotchedRightArrowIcon
                    tips='箭头:燕尾形'
                    data-type='notchedRightArrow'
                    onClick={onClick}
                ></NotchedRightArrowIcon>
                <PentagonIcon
                    tips='五边形'
                    data-type='pentagon'
                    onClick={onClick}
                ></PentagonIcon>
                <ChevronIcon
                    tips='箭头:V型'
                    data-type='chevron'
                    onClick={onClick}
                ></ChevronIcon>
                <RightArrowCalloutIcon
                    tips='标注:右箭头'
                    data-type='rightArrowCallout'
                    onClick={onClick}
                ></RightArrowCalloutIcon>
                <DownArrowCalloutIcon
                    tips='标注:下箭头'
                    data-type='downArrowCallout'
                    onClick={onClick}
                ></DownArrowCalloutIcon>
                <LeftArrowCalloutIcon
                    tips='标注:左箭头'
                    data-type='leftArrowCallout'
                    onClick={onClick}
                ></LeftArrowCalloutIcon>
                <UpArrowCalloutIcon
                    tips='标注:上箭头'
                    data-type='upArrowCallout'
                    onClick={onClick}
                ></UpArrowCalloutIcon>
                <LeftRightArrowCalloutIcon
                    tips='标注:左右箭头'
                    data-type='leftRightArrowCallout'
                    onClick={onClick}
                ></LeftRightArrowCalloutIcon>
                <QuadArrowCalloutIcon
                    tips='标注:十字箭头'
                    data-type='quadArrowCallout'
                    onClick={onClick}
                ></QuadArrowCalloutIcon>
                <CircularArrowIcon
                    tips='箭头:环形'
                    data-type='circularArrow'
                    onClick={onClick}
                ></CircularArrowIcon>
            </IconList>
        </Card>
    );
}
