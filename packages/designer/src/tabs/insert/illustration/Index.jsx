import {
  GroupItem,
  HLayout,
} from '@toone/report-ui';

import Chart from './chart/Index';
import Control from './control/Index';
//import Img from './img/Index';
import Shape from './shape/Index';

export default function () {
    return (
        <GroupItem title='插图'>
            <HLayout>
                {/*<Img></Img>*/}
                <Shape></Shape>
                <Control></Control>
                <Chart></Chart>
            </HLayout>
        </GroupItem>
    );
}
