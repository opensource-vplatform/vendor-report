import { Group } from '@components/group/Index';

import Datasource from './Datasource';
import Other from './Other';
import SortAndFilter from './SortAndFilter';

export default function () {
    return (
        <Group>
            <Datasource></Datasource>
            <SortAndFilter></SortAndFilter>
            <Other></Other>
        </Group>
    );
}
