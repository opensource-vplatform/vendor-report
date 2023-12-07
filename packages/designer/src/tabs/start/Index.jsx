import './index.scss';

import FontAlign from '@components/fontAlign/fontAlign';
import FontStyle from '@components/fontStyle/Index';
import { Group } from '@components/group/Index';

function Index() {
    return (
        <Group>
            <FontStyle></FontStyle>
            <FontAlign></FontAlign>
        </Group>
    );
}
export default Index;
