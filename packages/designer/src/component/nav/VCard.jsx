import { GroupItem } from '@components/group/Index';

export default function (props) {
    const { title, children,onMore } = props;
    return <GroupItem title={title} onMore={onMore}>{children}</GroupItem>;
}
