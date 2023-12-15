import { Group } from '@components/group/Index';

import TableStyle from './style/TableStyle';
import TableOptions from './TableOptions';

export default function() {
    return (
        <Group>
            <TableOptions></TableOptions>
            <TableStyle></TableStyle>
        </Group>
    );
}
