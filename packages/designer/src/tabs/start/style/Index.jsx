import {
  GroupItem,
  HLayout,
} from '@components/group/Index';

import Condition from './condition/Index';
import Editor from './editor/Index';
import Style from './style/Index';

export default function () {
    return (
        <GroupItem title='样式'>
            <HLayout>
                <Condition></Condition>
                <Style></Style>
                <Editor></Editor>
            </HLayout>
        </GroupItem>
    );
}
