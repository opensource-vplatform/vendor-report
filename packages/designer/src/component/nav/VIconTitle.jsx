import { VItem } from '@components/group/Index';

/**
 * 图标
 * 标题
 */

const itemStyle = {
    marginLeft: 8,
    marginRight: 4,
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 4
};

const iconStyle = {
    width: 28,
    height: 28,
};

export default function (props) {
    const { icon: Icon, title, desc, onClick } = props;
    return (
        <VItem
            title={title}
            desc={desc}
            style={itemStyle}
            icon={<Icon iconStyle={iconStyle}></Icon>}
            onClick={onClick}
        ></VItem>
    );
}
