import {
  GroupItem,
  HLayout,
} from '@components/group/Index';

export default function (props) {
    const { title, children } = props;
    return (
        <GroupItem title={title}>
            <HLayout>{children}</HLayout>
        </GroupItem>
    );
}
