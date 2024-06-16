import {
  GroupItem,
  HLayout,
} from '@toone/report-ui';

export default function (props) {
    const { title, children } = props;
    return (
        <GroupItem title={title}>
            <HLayout>{children}</HLayout>
        </GroupItem>
    );
}
