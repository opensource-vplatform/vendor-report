import { Fragment } from 'react';

import styled from 'styled-components';

import {
  DividerMenuItem,
  MenuItem,
} from './MenuItem';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    border: solid 1px lightgray;
    background-color:white;
`;

const ScrollWrap = styled.div`
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
`;

//菜单项高度
const MENU_ITEM_HEIGHT = 34;

const createMenuItem = function (value,item, onNodeClick,optionMaxSize) {
    const { id,  title, icon, text, children } = item;
    const itemVal = item.value;
    const key = id || itemVal;
    return (
        <Fragment key={key}>
            <MenuItem
                active={value}
                value={itemVal}
                title={title}
                icon={icon}
                text={text}
                disabled={item.disabled}
                optionMaxSize={optionMaxSize}
                datas={children}
                onClick={onNodeClick}
            ></MenuItem>
        </Fragment>
    );
};

const createScrollableMenuItems = function (key,notFrozenItems, optionMaxSize) {
    return (
        <ScrollWrap key={key} style={{ maxHeight: optionMaxSize * MENU_ITEM_HEIGHT }}>
            {notFrozenItems}
        </ScrollWrap>
    );
};

const ItemsPanel = function (props) {
    const { value,items, optionMaxSize, onNodeClick,style={} } = props;
    const itemComponents = [];
    let notFrozenItems = [];
    const keys = [];
    items.forEach((item,index) => {
        if (item == 'divider') {
            keys.push(item);
            notFrozenItems.push(<DividerMenuItem key={index}></DividerMenuItem>);
        } else if (item.frozen) {
            //菜单项冻结
            if (notFrozenItems.length > 0) {
                itemComponents.push(
                    createScrollableMenuItems(keys.join("_$_"),notFrozenItems, optionMaxSize)
                );
                notFrozenItems = [];
            }
            itemComponents.push(createMenuItem(value,item, onNodeClick,optionMaxSize));
        } else {
            keys.push(item.value);
            notFrozenItems.push(createMenuItem(value,item, onNodeClick,optionMaxSize));
        }
    });
    if (notFrozenItems.length > 0) {
        itemComponents.push(
            createScrollableMenuItems(keys.join("_$_"),notFrozenItems, optionMaxSize)
        );
    }
    notFrozenItems = undefined;
    return <Wrap style={style} className='menuItemsWrap'>{itemComponents}</Wrap>;
}

export default ItemsPanel;
