import RadiusRect from '../../../../icons/illustration/shape/rect/RadiusRect';
import Rect from '../../../../icons/illustration/shape/rect/Rect';
import Round1Rect from '../../../../icons/illustration/shape/rect/Round1Rect';
import Round2DiagRect
  from '../../../../icons/illustration/shape/rect/Round2DiagRect';
import Round2SameRect
  from '../../../../icons/illustration/shape/rect/Round2SameRect';
import Snip2DiagRect
  from '../../../../icons/illustration/shape/rect/Snip2DiagRect';
import Snip2SameRect
  from '../../../../icons/illustration/shape/rect/Snip2SameRect';
import SnipRect from '../../../../icons/illustration/shape/rect/SnipRect';
import SnipRoundRect
  from '../../../../icons/illustration/shape/rect/SnipRoundRect';
import {
  Card,
  IconList,
  WithShapeIcon,
} from '../../Component';

const RectIcon = WithShapeIcon(Rect);
const RadiusRectIcon = WithShapeIcon(RadiusRect);
const SnipRectIcon = WithShapeIcon(SnipRect);
const Snip2SameRectIcon = WithShapeIcon(Snip2SameRect);
const Round1RectIcon = WithShapeIcon(Round1Rect);
const Round2DiagRectIcon = WithShapeIcon(Round2DiagRect);
const Round2SameRectIcon = WithShapeIcon(Round2SameRect);
const Snip2DiagRectIcon = WithShapeIcon(Snip2DiagRect);
const SnipRoundRectIcon = WithShapeIcon(SnipRoundRect);

export default function (props) {
    const { onClick } = props;
    return (
        <Card title='矩形'>
            <IconList>
                <RectIcon
                    tips='矩形'
                    data-type='rectangle'
                    onClick={onClick}
                ></RectIcon>
                <RadiusRectIcon
                    tips='矩形：圆角'
                    data-type='roundedRectangle'
                    onClick={onClick}
                ></RadiusRectIcon>
                <SnipRectIcon
                    tips='矩形：剪去单角'
                    data-type='snip1Rectangle'
                    onClick={onClick}
                ></SnipRectIcon>
                <Snip2SameRectIcon
                    tips='矩形：剪去顶角'
                    data-type='snip2SameRectangle'
                    onClick={onClick}
                ></Snip2SameRectIcon>
                <Snip2DiagRectIcon
                    tips='矩形：剪去对角'
                    data-type='snip2DiagRectangle'
                    onClick={onClick}
                ></Snip2DiagRectIcon>
                <SnipRoundRectIcon
                    tips='矩形：一个圆顶角，剪去另一个顶角'
                    data-type='snipRoundRectangle'
                    onClick={onClick}
                ></SnipRoundRectIcon>
                <Round1RectIcon
                    tips='矩形：单圆顶角'
                    data-type='round1Rectangle'
                    onClick={onClick}
                ></Round1RectIcon>
                <Round2SameRectIcon
                    tips='矩形：圆顶角'
                    data-type='round2SameRectangle'
                    onClick={onClick}
                ></Round2SameRectIcon>
                <Round2DiagRectIcon
                    tips='矩形：对角圆角'
                    data-type='round2DiagRectangle'
                    onClick={onClick}
                ></Round2DiagRectIcon>
            </IconList>
        </Card>
    );
}
