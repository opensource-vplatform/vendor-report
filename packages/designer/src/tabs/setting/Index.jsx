import { useContext } from 'react';

import { useDispatch } from 'react-redux';

import { Group, GroupItem, VItem } from '@components/group/Index';

import WorkbookSettings from './WorkbookSettings';
import WorksheetSettings from './WorksheetSettings';

export default function () {
    const dispatch = useDispatch();

    return (
        <Group>
            <WorkbookSettings />
            <WorksheetSettings />
        </Group>
    );
}
