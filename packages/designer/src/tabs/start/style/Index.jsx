import { HCard } from '@components/nav/Index';

import Condition from './condition/Index';
import Editor from './editor/Index';

export default function () {
    return (
        <HCard title='样式'>
            <Condition></Condition>
            <Editor></Editor>
        </HCard>
    );
}
