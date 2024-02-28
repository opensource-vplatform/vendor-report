import CurvedDownRibbon from '@icons/illustration/shape/star/CurvedDownRibbon';
import CurvedUpRibbon from '@icons/illustration/shape/star/CurvedUpRibbon';
import DoubleWave from '@icons/illustration/shape/star/DoubleWave';
import DownRibbon from '@icons/illustration/shape/star/DownRibbon';
import Explosion1 from '@icons/illustration/shape/star/Explosion1';
import Explosion2 from '@icons/illustration/shape/star/Explosion2';
import HorizontalScroll from '@icons/illustration/shape/star/HorizontalScroll';
import Shape16pointStar from '@icons/illustration/shape/star/Shape16pointStar';
import Shape24pointStar from '@icons/illustration/shape/star/Shape24pointStar';
import Shape32pointStar from '@icons/illustration/shape/star/Shape32pointStar';
import Shape4pointStar from '@icons/illustration/shape/star/Shape4pointStar';
import Shape5pointStar from '@icons/illustration/shape/star/Shape5pointStar';
import Shape8pointStar from '@icons/illustration/shape/star/Shape8pointStar';
import Star10Point from '@icons/illustration/shape/star/Star10Point';
import Star12Point from '@icons/illustration/shape/star/Star12Point';
import Star6Point from '@icons/illustration/shape/star/Star6Point';
import Star7Point from '@icons/illustration/shape/star/Star7Point';
import UpRibbon from '@icons/illustration/shape/star/UpRibbon';
import VerticalScroll from '@icons/illustration/shape/star/VerticalScroll';
import Wave from '@icons/illustration/shape/star/Wave';

import {
  Card,
  IconList,
  WithShapeIcon,
} from '../../Component';

const Explosion1Icon = WithShapeIcon(Explosion1);
const Explosion2Icon = WithShapeIcon(Explosion2);
const Shape4pointStarIcon = WithShapeIcon(Shape4pointStar);
const Shape5pointStarIcon = WithShapeIcon(Shape5pointStar);
const Star6PointIcon = WithShapeIcon(Star6Point);
const Star7PointIcon = WithShapeIcon(Star7Point);
const Shape8pointStarIcon = WithShapeIcon(Shape8pointStar);
const Star10PointIcon = WithShapeIcon(Star10Point);
const Star12PointIcon = WithShapeIcon(Star12Point);
const Shape16pointStarIcon = WithShapeIcon(Shape16pointStar);
const Shape24pointStarIcon = WithShapeIcon(Shape24pointStar);
const Shape32pointStarIcon = WithShapeIcon(Shape32pointStar);
const UpRibbonIcon = WithShapeIcon(UpRibbon);
const DownRibbonIcon = WithShapeIcon(DownRibbon);
const CurvedUpRibbonIcon = WithShapeIcon(CurvedUpRibbon);
const CurvedDownRibbonIcon = WithShapeIcon(CurvedDownRibbon);
const VerticalScrollIcon = WithShapeIcon(VerticalScroll);
const HorizontalScrollIcon = WithShapeIcon(HorizontalScroll);
const WaveIcon = WithShapeIcon(Wave);
const DoubleWaveIcon = WithShapeIcon(DoubleWave);
export default function (props) {
    const { onClick } = props;
    return (
        <Card title='星与旗帜'>
            <IconList>
                <Explosion1Icon
                    tips='爆炸形:8pt'
                    data-type='explosion1'
                    onClick={onClick}
                ></Explosion1Icon>
                <Explosion2Icon
                    tips='爆炸形:14pt'
                    data-type='explosion2'
                    onClick={onClick}
                ></Explosion2Icon>
                <Shape4pointStarIcon
                    tips='星形:四角'
                    data-type='shape4pointStar'
                    onClick={onClick}
                ></Shape4pointStarIcon>
                <Shape5pointStarIcon
                    tips='星形:五角'
                    data-type='shape5pointStar'
                    onClick={onClick}
                ></Shape5pointStarIcon>
                <Star6PointIcon
                    tips='星形:六角'
                    data-type='star6Point'
                    onClick={onClick}
                ></Star6PointIcon>
                <Star7PointIcon
                    tips='星形:七角'
                    data-type='star7Point'
                    onClick={onClick}
                ></Star7PointIcon>
                <Shape8pointStarIcon
                    tips='星形:八角'
                    data-type='shape8pointStar'
                    onClick={onClick}
                ></Shape8pointStarIcon>
                <Star10PointIcon
                    tips='星形:十角'
                    data-type='star10Point'
                    onClick={onClick}
                ></Star10PointIcon>
                <Star12PointIcon
                    tips='星形:十二角'
                    data-type='star12Point'
                    onClick={onClick}
                ></Star12PointIcon>
                <Shape16pointStarIcon
                    tips='星形:十六角'
                    data-type='shape16pointStar'
                    onClick={onClick}
                ></Shape16pointStarIcon>
                <Shape24pointStarIcon
                    tips='星形:二十四角'
                    data-type='shape24pointStar'
                    onClick={onClick}
                ></Shape24pointStarIcon>
                <Shape32pointStarIcon
                    tips='星形:三十二角'
                    data-type='shape32pointStar'
                    onClick={onClick}
                ></Shape32pointStarIcon>
                <UpRibbonIcon
                    tips='带形:上凸'
                    data-type='upRibbon'
                    onClick={onClick}
                ></UpRibbonIcon>
                <DownRibbonIcon
                    tips='带形:前凸'
                    data-type='downRibbon'
                    onClick={onClick}
                ></DownRibbonIcon>
                <CurvedUpRibbonIcon
                    tips='带形:上凸弯'
                    data-type='curvedUpRibbon'
                    onClick={onClick}
                ></CurvedUpRibbonIcon>
                <CurvedDownRibbonIcon
                    tips='带形:前凸弯'
                    data-type='curvedDownRibbon'
                    onClick={onClick}
                ></CurvedDownRibbonIcon>
                <VerticalScrollIcon
                    tips='卷形:垂直'
                    data-type='verticalScroll'
                    onClick={onClick}
                ></VerticalScrollIcon>
                <HorizontalScrollIcon
                    tips='卷形:水平'
                    data-type='horizontalScroll'
                    onClick={onClick}
                ></HorizontalScrollIcon>
                <WaveIcon
                    tips='波形'
                    data-type='wave'
                    onClick={onClick}
                ></WaveIcon>
                <DoubleWaveIcon
                    tips='双波形'
                    data-type='doubleWave'
                    onClick={onClick}
                ></DoubleWaveIcon>
            </IconList>
        </Card>
    );
}
