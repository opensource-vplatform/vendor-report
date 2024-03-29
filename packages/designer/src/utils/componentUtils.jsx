import { VItem } from '@components/group/Index';
import Menu from '@components/menu/Index';
import ArrowDownIcon from '@icons/arrow/ArrowDown';

export const IconMenu = function (props) {
    const { title, datas, icon, ...others } = props;
    const Icon = icon;
    return (
        <Menu
            datas={datas}
            frozien={-1}
            {...others}
        >
            <VItem
                title={title}
                style={{
                    paddingLeft: 4,
                    paddingRight: 4,
                }}
                icon={<Icon iconStyle={{ width: 28, height: 28 }}></Icon>}
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
};

export const WithIconMenu = function (title, Icon, datas) {
    return (props) => {
        const menuDatas = typeof datas == 'function' ? datas() : datas;
        return menuDatas.length == 0 ? null : (
            <IconMenu
                title={title}
                icon={Icon}
                datas={menuDatas}
                {...props}
            ></IconMenu>
        );
    };
};