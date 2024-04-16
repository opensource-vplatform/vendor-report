import {
  GroupItem,
  HLayout,
} from '@components/group/Index';

import Condition from './condition/Index';
import Editor from './editor/Index';

export default function () {
    return (
        <GroupItem title='样式'>
            <HLayout>
                <Condition></Condition>
                <Editor></Editor>
            </HLayout>
        </GroupItem>
    );
}
