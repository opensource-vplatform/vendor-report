import { Group } from '@toone/report-ui';

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
