import { Group } from '@toone/report-ui';

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
