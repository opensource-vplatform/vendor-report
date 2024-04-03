import styled from 'styled-components';

import { DividerMenuItem } from './MenuItem';
import { createMenuItem } from './Utils';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    border: solid 1px lightgray;
    background-color:white;
`;

const ScrollWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: max-content;
    overflow-x: hidden;
    overflow-y: auto;
`;

//菜单项高度
const MENU_ITEM_HEIGHT = 34;

const createScrollableMenuItems = function (key,notFrozenItems, optionMaxSize,notFrozenDatas) {
    let maxHeight = 'unset';
    if(notFrozenDatas.length>optionMaxSize){
        maxHeight = 0;
        let index = 0;
        while(index<optionMaxSize){
            const item = notFrozenDatas[index];
            let height = 0;
            if(typeof item== 'string'){
                height = 4;
            }else{
                height = item.height;
                height = height==undefined ? MENU_ITEM_HEIGHT:height;
            }
            maxHeight += height;
            index++;
        }
    }
    return (
        <ScrollWrap key={key} style={{ maxHeight }}>
            {notFrozenItems}
        </ScrollWrap>
    );
};

const ItemsPanel = function (props) {
    const { value,items, optionMaxSize, onNodeClick,style={} } = props;
    const itemComponents = [];
    let notFrozenItems = [];
    let notFrozenDatas = [];
    const keys = [];
    items.forEach((item,index) => {
        if (item == 'divider') {
            keys.push(item);
            notFrozenItems.push(<DividerMenuItem key={index}></DividerMenuItem>);
            notFrozenDatas.push(item);
        } else if (item.frozen) {
            //菜单项冻结
            if (notFrozenItems.length > 0) {
                itemComponents.push(
                    createScrollableMenuItems(keys.join("_$_"),notFrozenItems, optionMaxSize,notFrozenDatas)
                );
                notFrozenItems = [];
                notFrozenDatas = [];
            }
            itemComponents.push(createMenuItem(value,item, onNodeClick,optionMaxSize));
        } else {
            keys.push(item.value);
            notFrozenItems.push(createMenuItem(value,item, onNodeClick,optionMaxSize));
            notFrozenDatas.push(item);
        }
    });
    if (notFrozenItems.length > 0) {
        itemComponents.push(
            createScrollableMenuItems(keys.join("_$_"),notFrozenItems, optionMaxSize,notFrozenDatas)
        );
    }
    notFrozenItems = undefined;
    notFrozenDatas = undefined;
    return <Wrap style={style} className='menuItemsWrap'>{itemComponents}</Wrap>;
}

export default ItemsPanel;
