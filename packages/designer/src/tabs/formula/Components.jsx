import styled from 'styled-components';

import Button from '@components/button/Index';
import { VItem } from '@components/group/Index';
import Menu from '@components/menu/Index';
import ArrowDownIcon from '@icons/arrow/ArrowDown';

export const ButtonWrap = styled.div`
    width: 100%;
    padding: 8px 0px 0px 0px;
    margin: 0px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row-reverse;
`;

export const FormulaDesc = styled.div`
    margin-top: 4px;
    margin-left: 8px;
    font-size: 12px;
    min-height: 65px;
    max-width:395px;
`;

export const FormulaButton = function (props) {
    const { style = {}, children, ...others } = props;
    const btnStyle = { width: 80, height: 32 };
    return (
        <Button style={{ ...btnStyle, ...style }} {...others}>
            {children}
        </Button>
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
