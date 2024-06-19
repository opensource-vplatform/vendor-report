import {
  GroupItem,
  HLayout,
} from '@toone/report-ui';

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
            </HLayout>
        </GroupItem>
    );
}
