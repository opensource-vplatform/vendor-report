import { VItem } from '@components/group/Index';
import Menu from '@components/menu/Index';
import ArrowDownIcon from '@icons/arrow/ArrowDown';

/**
 * 图标
 * 标题
 * 下拉选择菜单
 * 图标和下拉菜单一起
 */

const itemStyle = {
    marginLeft: 4,
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 4,
};

const iconStyle = {
    width: 28,
    height: 28,
};

export default function (props) {
    const { icon: Icon, title, desc = '', menus, onNodeClick, value } = props;
    return (
        <Menu value={value} datas={menus} onNodeClick={onNodeClick}>
            <VItem
                title={title}
                desc={desc}
                style={itemStyle}
                icon={<Icon iconStyle={iconStyle}></Icon>}
            >
                <ArrowDownIcon
                    style={{
                        width: 16,
                        height: 16,
                    }}
                ></ArrowDownIcon>
            </VItem>
        </Menu>
    );
}
