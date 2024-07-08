import {
  GroupItem,
  HLayout,
} from '@toone/report-ui';

import Chart from './chart/Index';

export default function () {
    return (
        <GroupItem title='插图'>
            <HLayout>
                {/*<Img></Img>
                <Shape></Shape>
                <Control></Control>*/}
                <Chart></Chart>
            </HLayout>
        </GroupItem>
    );
}
