import { Group } from '@components/group/Index';

import Calculation from './Calculation';
import Library from './Library';

function Index() {
    return (
        <Group>
            <Library></Library>
            <Calculation></Calculation>
        </Group>
    );
}
export default Index;
