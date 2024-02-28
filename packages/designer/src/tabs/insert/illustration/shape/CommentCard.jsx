import CloudCallout from '@icons/illustration/shape/comment/CloudCallout';
import LineCallout2 from '@icons/illustration/shape/comment/LineCallout2';
import LineCallout2AccentBar
  from '@icons/illustration/shape/comment/LineCallout2AccentBar';
import LineCallout2BorderandAccentBar
  from '@icons/illustration/shape/comment/LineCallout2BorderandAccentBar';
import LineCallout2NoBorder
  from '@icons/illustration/shape/comment/LineCallout2NoBorder';
import LineCallout3 from '@icons/illustration/shape/comment/LineCallout3';
import LineCallout3AccentBar
  from '@icons/illustration/shape/comment/LineCallout3AccentBar';
import LineCallout3BorderandAccentBar
  from '@icons/illustration/shape/comment/LineCallout3BorderandAccentBar';
import LineCallout3NoBorder
  from '@icons/illustration/shape/comment/LineCallout3NoBorder';
import LineCallout4 from '@icons/illustration/shape/comment/LineCallout4';
import LineCallout4AccentBar
  from '@icons/illustration/shape/comment/LineCallout4AccentBar';
import LineCallout4BorderandAccentBar
  from '@icons/illustration/shape/comment/LineCallout4BorderandAccentBar';
import LineCallout4NoBorder
  from '@icons/illustration/shape/comment/LineCallout4NoBorder';
import OvalCallout from '@icons/illustration/shape/comment/OvalCallout';
import RectangularCallout
  from '@icons/illustration/shape/comment/RectangularCallout';
import RoundedRectangularCallout
  from '@icons/illustration/shape/comment/RoundedRectangularCallout';

import {
  Card,
  IconList,
  WithShapeIcon,
} from '../../Component';

const RectangularCalloutIcon = WithShapeIcon(RectangularCallout);
const RoundedRectangularCalloutIcon = WithShapeIcon(RoundedRectangularCallout);
const OvalCalloutIcon = WithShapeIcon(OvalCallout);
const CloudCalloutIcon = WithShapeIcon(CloudCallout);
const LineCallout2Icon = WithShapeIcon(LineCallout2);
const LineCallout3Icon = WithShapeIcon(LineCallout3);
const LineCallout4Icon = WithShapeIcon(LineCallout4);
const LineCallout2AccentBarIcon = WithShapeIcon(LineCallout2AccentBar);
const LineCallout3AccentBarIcon = WithShapeIcon(LineCallout3AccentBar);
const LineCallout4AccentBarIcon = WithShapeIcon(LineCallout4AccentBar);
const LineCallout2NoBorderIcon = WithShapeIcon(LineCallout2NoBorder);
const LineCallout3NoBorderIcon = WithShapeIcon(LineCallout3NoBorder);
const LineCallout4NoBorderIcon = WithShapeIcon(LineCallout4NoBorder);
const LineCallout2BorderandAccentBarIcon = WithShapeIcon(
    LineCallout2BorderandAccentBar
);
const LineCallout3BorderandAccentBarIcon = WithShapeIcon(
    LineCallout3BorderandAccentBar
);
const LineCallout4BorderandAccentBarIcon = WithShapeIcon(
    LineCallout4BorderandAccentBar
);

export default function (props) {
    const { onClick } = props;
    return (
        <Card title='标注'>
            <IconList>
                <RectangularCalloutIcon
                    tips='对话气泡:矩形'
                    data-type='rectangularCallout'
                    onClick={onClick}
                ></RectangularCalloutIcon>
                <RoundedRectangularCalloutIcon
                    tips='对话气泡:圆角矩形'
                    data-type='roundedRectangularCallout'
                    onClick={onClick}
                ></RoundedRectangularCalloutIcon>
                <OvalCalloutIcon
                    tips='对话气泡:圆形'
                    data-type='ovalCallout'
                    onClick={onClick}
                ></OvalCalloutIcon>
                <CloudCalloutIcon
                    tips='思想气泡:云'
                    data-type='cloudCallout'
                    onClick={onClick}
                ></CloudCalloutIcon>
                <LineCallout2Icon
                    tips='标注:线形'
                    data-type='lineCallout2'
                    onClick={onClick}
                ></LineCallout2Icon>
                <LineCallout3Icon
                    tips='标注:弯曲线形'
                    data-type='lineCallout3'
                    onClick={onClick}
                ></LineCallout3Icon>
                <LineCallout4Icon
                    tips='标注:双弯曲线形'
                    data-type='lineCallout4'
                    onClick={onClick}
                ></LineCallout4Icon>
                <LineCallout2AccentBarIcon
                    tips='标注:线形(带强调线)'
                    data-type='lineCallout2AccentBar'
                    onClick={onClick}
                ></LineCallout2AccentBarIcon>
                <LineCallout3AccentBarIcon
                    tips='标注:弯曲线形(带强调线)'
                    data-type='lineCallout3AccentBar'
                    onClick={onClick}
                ></LineCallout3AccentBarIcon>
                <LineCallout4AccentBarIcon
                    tips='标注:双弯曲线形(带强调线)'
                    data-type='lineCallout4AccentBar'
                    onClick={onClick}
                ></LineCallout4AccentBarIcon>
                <LineCallout2NoBorderIcon
                    tips='标注:线形(无边框)'
                    data-type='lineCallout2NoBorder'
                    onClick={onClick}
                ></LineCallout2NoBorderIcon>
                <LineCallout3NoBorderIcon
                    tips='标注:弯曲线形(无边框)'
                    data-type='lineCallout3NoBorder'
                    onClick={onClick}
                ></LineCallout3NoBorderIcon>
                <LineCallout4NoBorderIcon
                    tips='标注:双弯曲线形(无边框)'
                    data-type='lineCallout4NoBorder'
                    onClick={onClick}
                ></LineCallout4NoBorderIcon>
                <LineCallout2BorderandAccentBarIcon
                    tips='标注:线形(带边框和强调线)'
                    data-type='lineCallout2BorderandAccentBar'
                    onClick={onClick}
                ></LineCallout2BorderandAccentBarIcon>
                <LineCallout3BorderandAccentBarIcon
                    tips='标注:弯曲线形(带边框和强调线)'
                    data-type='lineCallout3BorderandAccentBar'
                    onClick={onClick}
                ></LineCallout3BorderandAccentBarIcon>
                <LineCallout4BorderandAccentBarIcon
                    tips='标注:双弯曲线形(带边框和强调线)'
                    data-type='lineCallout4BorderandAccentBar'
                    onClick={onClick}
                ></LineCallout4BorderandAccentBarIcon>
            </IconList>
        </Card>
    );
}
