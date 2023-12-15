import Light1 from '@icons/table/style/Light1';
import Light10 from '@icons/table/style/Light10';
import Light11 from '@icons/table/style/Light11';
import Light12 from '@icons/table/style/Light12';
import Light13 from '@icons/table/style/Light13';
import Light14 from '@icons/table/style/Light14';
import Light15 from '@icons/table/style/Light15';
import Light16 from '@icons/table/style/Light16';
import Light17 from '@icons/table/style/Light17';
import Light18 from '@icons/table/style/Light18';
import Light19 from '@icons/table/style/Light19';
import Light2 from '@icons/table/style/Light2';
import Light20 from '@icons/table/style/Light20';
import Light21 from '@icons/table/style/Light21';
import Light22 from '@icons/table/style/Light22';
import Light3 from '@icons/table/style/Light3';
import Light4 from '@icons/table/style/Light4';
import Light5 from '@icons/table/style/Light5';
import Light6 from '@icons/table/style/Light6';
import Light7 from '@icons/table/style/Light7';
import Light8 from '@icons/table/style/Light8';
import Light9 from '@icons/table/style/Light9';

import {
  Card,
  IconList,
  WithColorIcon,
} from './Components';

const LightIcon1 = WithColorIcon(Light1);
const LightIcon2 = WithColorIcon(Light2);
const LightIcon3 = WithColorIcon(Light3);
const LightIcon4 = WithColorIcon(Light4);
const LightIcon5 = WithColorIcon(Light5);
const LightIcon6 = WithColorIcon(Light6);
const LightIcon7 = WithColorIcon(Light7);
const LightIcon8 = WithColorIcon(Light8);
const LightIcon9 = WithColorIcon(Light9);
const LightIcon10 = WithColorIcon(Light10);
const LightIcon11 = WithColorIcon(Light11);
const LightIcon12 = WithColorIcon(Light12);
const LightIcon13 = WithColorIcon(Light13);
const LightIcon14 = WithColorIcon(Light14);
const LightIcon15 = WithColorIcon(Light15);
const LightIcon16 = WithColorIcon(Light16);
const LightIcon17 = WithColorIcon(Light17);
const LightIcon18 = WithColorIcon(Light18);
const LightIcon19 = WithColorIcon(Light19);
const LightIcon20 = WithColorIcon(Light20);
const LightIcon21 = WithColorIcon(Light21);
const LightIcon22 = WithColorIcon(Light22);

export default function (props) {
    const { onClick } = props;
    return (
        <Card title='浅色'>
            <IconList>
                <LightIcon1 tips='无' onClick={()=>onClick('None')}></LightIcon1>
                <LightIcon2
                    tips='白色，表样式浅色1'
                    onClick={()=>onClick('Light1')}
                ></LightIcon2>
                <LightIcon3
                    tips='浅蓝，表样式浅色2'
                    onClick={()=>onClick('Light2')}
                ></LightIcon3>
                <LightIcon4
                    tips='浅橙色，表样式浅色3'
                    onClick={()=>onClick('Light3')}
                ></LightIcon4>
                <LightIcon5
                    tips='白色，表样式浅色4'
                    onClick={()=>onClick('Light4')}
                ></LightIcon5>
                <LightIcon6
                    tips='浅黄，表样式浅色5'
                    onClick={()=>onClick('Light5')}
                ></LightIcon6>
                <LightIcon7
                    tips='浅蓝，表样式浅色6'
                    onClick={()=>onClick('Light6')}
                ></LightIcon7>
            </IconList>
            <IconList>
                <LightIcon8
                    tips='浅绿，表样式浅色7'
                    onClick={()=>onClick('Light7')}
                ></LightIcon8>
                <LightIcon9
                    tips='白色，表样式浅色8'
                    onClick={()=>onClick('Light8')}
                ></LightIcon9>
                <LightIcon10
                    tips='蓝色，表样式浅色9'
                    onClick={()=>onClick('Light9')}
                ></LightIcon10>
                <LightIcon11
                    tips='橙色，表样式浅色10'
                    onClick={()=>onClick('Light10')}
                ></LightIcon11>
                <LightIcon12
                    tips='白色，表样式浅色11'
                    onClick={()=>onClick('Light11')}
                ></LightIcon12>
                <LightIcon13
                    tips='黄色，表样式浅色12'
                    onClick={()=>onClick('Light12')}
                ></LightIcon13>
                <LightIcon14
                    tips='蓝色，表样式浅色13'
                    onClick={()=>onClick('Light13')}
                ></LightIcon14>
            </IconList>
            <IconList>
                <LightIcon15
                    tips='绿色，表样式浅色14'
                    onClick={()=>onClick('Light14')}
                ></LightIcon15>
                <LightIcon16
                    tips='白色，表样式浅色15'
                    onClick={()=>onClick('Light15')}
                ></LightIcon16>
                <LightIcon17
                    tips='浅蓝，表样式浅色16'
                    onClick={()=>onClick('Light16')}
                ></LightIcon17>
                <LightIcon18
                    tips='浅橙色，表样式浅色17'
                    onClick={()=>onClick('Light17')}
                ></LightIcon18>
                <LightIcon19
                    tips='白色，表样式浅色18'
                    onClick={()=>onClick('Light18')}
                ></LightIcon19>
                <LightIcon20
                    tips='浅黄，表样式浅色19'
                    onClick={()=>onClick('Light19')}
                ></LightIcon20>
                <LightIcon21
                    tips='浅蓝，表样式浅色20'
                    onClick={()=>onClick('Light20')}
                ></LightIcon21>
            </IconList>
            <IconList>
                <LightIcon22
                    tips='浅绿，表样式浅色21'
                    onClick={()=>onClick('Light21')}
                ></LightIcon22>
            </IconList>
        </Card>
    );
}
