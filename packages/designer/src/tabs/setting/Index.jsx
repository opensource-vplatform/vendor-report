import { Group } from '@components/group/Index';

import WorkbookSettings from './WorkbookSettings';
import WorksheetSettings from './WorksheetSettings';

export default function () {
    return (
        <Group>
            <WorkbookSettings />
            <WorksheetSettings />
        </Group>
    );
}
