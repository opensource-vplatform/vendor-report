import { GroupItem } from '@toone/report-ui';

export default function (props) {
    const { title, children,onMore } = props;
    return <GroupItem title={title} onMore={onMore}>{children}</GroupItem>;
}
