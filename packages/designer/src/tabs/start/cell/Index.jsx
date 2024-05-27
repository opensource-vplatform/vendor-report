import { HCard } from '@components/nav/Index';

import Delete from './delete/Index';
import Insert from './insert/Index';
import Setting from './setting/Index';

export default function () {
    return (
        <HCard title='单元格'>
            <Insert></Insert>
            <Delete></Delete>
            <Setting></Setting>
        </HCard>
    );
}
