import Divide from '@icons/illustration/shape/formula/Divide';
import Equal from '@icons/illustration/shape/formula/Equal';
import Minus from '@icons/illustration/shape/formula/Minus';
import Multiply from '@icons/illustration/shape/formula/Multiply';
import NotEqual from '@icons/illustration/shape/formula/NotEqual';
import Plus from '@icons/illustration/shape/formula/Plus';

import {
  Card,
  IconList,
  WithShapeIcon,
} from '../../Component';

const PlusIcon = WithShapeIcon(Plus);
const MinusIcon = WithShapeIcon(Minus);
const MultiplyIcon = WithShapeIcon(Multiply);
const DivideIcon = WithShapeIcon(Divide);
const EqualIcon = WithShapeIcon(Equal);
const NotEqualIcon = WithShapeIcon(NotEqual);

export default function (props) {
    const { onClick } = props;
    return (
        <Card title='公式形状'>
            <IconList>
                <PlusIcon
                    tips='加号'
                    data-type='mathPlus'
                    onClick={onClick}
                ></PlusIcon>
                <MinusIcon
                    tips='减号'
                    data-type='mathMinus'
                    onClick={onClick}
                ></MinusIcon>
                <MultiplyIcon
                    tips='乘号'
                    data-type='mathMultiply'
                    onClick={onClick}
                ></MultiplyIcon>
                <DivideIcon
                    tips='除号'
                    data-type='mathDivide'
                    onClick={onClick}
                ></DivideIcon>
                <EqualIcon
                    tips='等号'
                    data-type='mathEqual'
                    onClick={onClick}
                ></EqualIcon>
                <NotEqualIcon
                    tips='不等号'
                    data-type='mathNotEqual'
                    onClick={onClick}
                ></NotEqualIcon>
            </IconList>
        </Card>
    );
}
