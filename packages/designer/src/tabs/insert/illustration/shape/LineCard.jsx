import Elbow from '@icons/illustration/shape/line/Elbow';
import ElbowWithEndArrow
  from '@icons/illustration/shape/line/ElbowWithEndArrow';
import ElbowWithStartEndArrow
  from '@icons/illustration/shape/line/ElbowWithStartEndArrow';
import Slash from '@icons/illustration/shape/line/Slash';
import SlashWithEndArrow
  from '@icons/illustration/shape/line/SlashWithEndArrow';
import SlashWithStartEndArrow
  from '@icons/illustration/shape/line/SlashWithStartEndArrow';

import {
  Card,
  IconList,
  WithShapeIcon,
} from '../../Component';

const SlashIcon = WithShapeIcon(Slash);
const SlashWithEndArrowIcon = WithShapeIcon(SlashWithEndArrow);
const SlashWithStartEndArrowIcon = WithShapeIcon(SlashWithStartEndArrow);
const ElbowIcon = WithShapeIcon(Elbow);
const ElbowWithEndArrowIcon = WithShapeIcon(ElbowWithEndArrow);
const ElbowWithStartEndArrowIcon = WithShapeIcon(ElbowWithStartEndArrow);

export default function (props) {
    const { onClick } = props;
    return (
        <Card title='线条'>
            <IconList>
                <SlashIcon
                    tips='直线'
                    data-type='slash'
                    onClick={onClick}
                ></SlashIcon>
                <SlashWithEndArrowIcon
                    tips='直线箭头'
                    data-type='slashWithEndArrow'
                    onClick={onClick}
                ></SlashWithEndArrowIcon>
                <SlashWithStartEndArrowIcon
                    tips='双箭头直线'
                    data-type='slashWithStartEndArrow'
                    onClick={onClick}
                ></SlashWithStartEndArrowIcon>
                <ElbowIcon
                    tips='连接符：肘形'
                    data-type='elbow'
                    onClick={onClick}
                ></ElbowIcon>
                <ElbowWithEndArrowIcon
                    tips='连接符：肘形箭头'
                    data-type='elbowWithEndArrow'
                    onClick={onClick}
                ></ElbowWithEndArrowIcon>
                <ElbowWithStartEndArrowIcon
                    tips='连接符：肘形双箭头'
                    data-type='elbowWithStartEndArrow'
                    onClick={onClick}
                ></ElbowWithStartEndArrowIcon>
            </IconList>
        </Card>
    );
}
