import { Fragment } from 'react';

import {
  GroupItem,
  HLayout,
} from '@components/group/Index';

import Delete from './delete/Index';
import Insert from './insert/Index';
import Setting from './setting/Index';

export default function () {
    return (
        <Fragment>
            <GroupItem title='单元格'>
                <HLayout>
                    <Insert></Insert>
                    <Delete></Delete>
                    <Setting></Setting>
                </HLayout>
            </GroupItem>
        </Fragment>
    );
}
