import {
  Fragment,
  useState,
} from 'react';

import styled from 'styled-components';

import { isReactNode } from '@toone/report-util';

import ArrowDownIcon from '../../icons/ArrowDown';
import { Card } from '../card/Card';
import { Divider } from '../divider/Index';
import ItemsPanel from './ItemsPanel';
import { createMenuItem } from './Utils';

const MenuItemWrap = styled.div`
    height: 30px;
    display: flex;
    align-items: center;
    margin: 2px 2px;
    cursor: pointer;
    &:hover {
        background-color: #dadada;
    }
    &[data-selected='true'] {
        background-color: #dadada;
    }
    &[data-disabled='true'] {
        background-color: transparent !important;
        opacity: 0.5;
    }
    &[data-type='custom'] {
        height: auto;
    }
`;

const Title = styled.span`
    padding: 8px 10px;
    width: 100%;
`;

const IconWrap = styled.div`
    margin-right: 0px;
`;

const WithMenuItem = function (Component) {
    return function (props) {
        const {
            active,
            value,
            title,
            disabled = false,
            onClick,
            optionMaxSize,
            text,
            item,
            datas,
            type,
            style = {},
            height,
            ...others
        } = props;
        let children = null;
        const isFolder = hasChildren(datas);
        const [data, setData] = useState({ show: false, left: 0, top: 0 });
        if (type == 'group') {
            let childrenComp = [];
            if (isFolder) {
                childrenComp = datas.map((item) => {
                    return createMenuItem(value, item, onClick, optionMaxSize);
                });
            }
            children = (
                <Card
                    title={text}
                    contentStyle={{ flexDirection: 'row', ...style }}
                >
                    {childrenComp}
                </Card>
            );
        } else {
            const handleMouseEnter = (evt) => {
                if (disabled||!isFolder) return;
                const target = evt.target;
                const itemWrap = target.closest('.menuItemWrap');
                const itemsWrap = target.closest('.menuItemsWrap');
                const itemWrapRect = itemWrap.getBoundingClientRect();
                const itemsWrapRect = itemsWrap.getBoundingClientRect();
                const panelWidth = itemsWrapRect.width;
                const itemWidth = itemWrapRect.width;
                let left = itemsWrapRect.width - 3;
                if(panelWidth-itemWidth>3){
                    //菜单项面板出现滚动条
                    left = itemWidth + 1;
                }
                setData({
                    show: true,
                    left,
                    top: itemWrapRect.top - itemsWrapRect.top,
                });
            };

            const handleMouseLeave = (evt) => {
                if (disabled||!isFolder) return;
                setData({ show: false });
            };
            children = (
                <MenuItemWrap
                    data-value={value}
                    className='menuItemWrap'
                    data-selected={active.indexOf(value) !== -1}
                    data-disabled={disabled}
                    style={{ height }}
                    data-type={isReactNode(text) ? 'custom' : 'text'}
                    title={title}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => {
                        !disabled && onClick(value, item);
                    }}
                >
                    <Component
                        datas={datas}
                        disabled={disabled}
                        text={text}
                        {...others}
                    ></Component>
                    {!disabled && hasChildren(datas) && data.show ? (
                        <ItemsPanel
                            value={active}
                            items={datas}
                            optionMaxSize={optionMaxSize}
                            onNodeClick={onClick}
                            style={{
                                position: 'absolute',
                                left: data.left,
                                top: data.top,
                            }}
                        ></ItemsPanel>
                    ) : null}
                </MenuItemWrap>
            );
        }
        return children;
    };
};

const hasChildren = function (children) {
    return children && children.length > 0;
};

export const MenuItem = WithMenuItem(function (props) {
    const { text, icon, disabled = false, datas } = props;
    return (
        <Fragment>
            {icon ? <IconWrap title={text}>{icon}</IconWrap> : null}
            {isReactNode(text) ? text : <Title>{text}</Title>}
            {!disabled && hasChildren(datas) ? (
                <ArrowDownIcon
                    style={{ transform: 'rotate(270deg)' }}
                    size="small"
                ></ArrowDownIcon>
            ) : null}
        </Fragment>
    );
});

export const DividerMenuItem = function () {
    return (
        <div
            style={{
                marginTop: 2,
                marginBottom: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Divider type='horizontal'></Divider>
        </div>
    );
};
