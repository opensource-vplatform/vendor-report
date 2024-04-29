import { Group } from '@components/group/Index';

import PagingSettings from './PagingSettings';
import Template from './Template';
import Wizard from './Wizard';

export default function Index(props) {
    return (
        <Group>
            <Wizard></Wizard>
            <Template></Template>
            <PagingSettings></PagingSettings>
        </Group>
    );
}
