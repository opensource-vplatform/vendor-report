import Dark1 from '@icons/table/style/Dark1';
import Dark10 from '@icons/table/style/Dark10';
import Dark11 from '@icons/table/style/Dark11';
import Dark2 from '@icons/table/style/Dark2';
import Dark3 from '@icons/table/style/Dark3';
import Dark4 from '@icons/table/style/Dark4';
import Dark5 from '@icons/table/style/Dark5';
import Dark6 from '@icons/table/style/Dark6';
import Dark7 from '@icons/table/style/Dark7';
import Dark8 from '@icons/table/style/Dark8';
import Dark9 from '@icons/table/style/Dark9';

import {
  Card,
  IconList,
  WithColorIcon,
} from './Components';

const DarkIcon1 = WithColorIcon(Dark1);
const DarkIcon2 = WithColorIcon(Dark2);
const DarkIcon3 = WithColorIcon(Dark3);
const DarkIcon4 = WithColorIcon(Dark4);
const DarkIcon5 = WithColorIcon(Dark5);
const DarkIcon6 = WithColorIcon(Dark6);
const DarkIcon7 = WithColorIcon(Dark7);
const DarkIcon8 = WithColorIcon(Dark8);
const DarkIcon9 = WithColorIcon(Dark9);
const DarkIcon10 = WithColorIcon(Dark10);
const DarkIcon11 = WithColorIcon(Dark11);

export default function (props) {
    const { onClick } = props;
    return (
        <Card title='深色'>
            <IconList>
                <DarkIcon1
                    tips='深灰色，表样式深色 1'
                    onClick={()=>onClick('Dark1')}
                ></DarkIcon1>
                <DarkIcon2
                    tips='深蓝色，表样式深色 2'
                    onClick={()=>onClick('Dark2')}
                ></DarkIcon2>
                <DarkIcon3
                    tips='褐色，表样式深色 3'
                    onClick={()=>onClick('Dark3')}
                ></DarkIcon3>
                <DarkIcon4
                    tips='深灰色，表样式深色 4'
                    onClick={()=>onClick('Dark4')}
                ></DarkIcon4>
                <DarkIcon5
                    tips='深黄色，表样式深色 5'
                    onClick={()=>onClick('Dark5')}
                ></DarkIcon5>
                <DarkIcon6
                    tips='深蓝色，表样式深色 6'
                    onClick={()=>onClick('Dark6')}
                ></DarkIcon6>
                <DarkIcon7
                    tips='深绿色，表样式深色 7'
                    onClick={()=>onClick('Dark7')}
                ></DarkIcon7>
            </IconList>
            <IconList>
                <DarkIcon8
                    tips='浅灰色，表样式深色 8'
                    onClick={()=>onClick('Dark8')}
                ></DarkIcon8>
                <DarkIcon9
                    tips='橙色，表样式深色 9'
                    onClick={()=>onClick('Dark9')}
                ></DarkIcon9>
                <DarkIcon10
                    tips='金色，表样式深色 10'
                    onClick={()=>onClick('Dark10')}
                ></DarkIcon10>
                <DarkIcon11
                    tips='绿色，表样式深色 11'
                    onClick={()=>onClick('Dark11')}
                ></DarkIcon11>
            </IconList>
        </Card>
    );
}
