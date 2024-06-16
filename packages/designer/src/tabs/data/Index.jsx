import { Group } from '@toone/report-ui';

import Datasource from './Datasource';
import SortAndFilter from './SortAndFilter';

export default function () {
    return (
        <Group>
            <Datasource></Datasource>
            <SortAndFilter></SortAndFilter>
        </Group>
    );
}
