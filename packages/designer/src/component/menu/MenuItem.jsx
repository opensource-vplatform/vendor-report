import {
  Fragment,
  useState,
} from 'react';

import styled from 'styled-components';

import ArrowDownIcon from '@icons/arrow/ArrowDown';

import LineSepatator from '../lineSeparator/lineSeparator';
import ItemsPanel from './ItemsPanel';

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
`;

const Title = styled.span`
    padding: 8px 10px;
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
            onClick,
            optionMaxSize,
            datas,
            ...others
        } = props;
        const [data, setData] = useState({ show: false, left: 0, top: 0 });
        const handleMouseEnter = (evt) => {
            const target = evt.target;
            const itemWrap = target.closest('.menuItemWrap');
            const itemsWrap = target.closest('.menuItemsWrap');
            const itemWrapRect = itemWrap.getBoundingClientRect();
            const itemsWrapRect = itemsWrap.getBoundingClientRect();
            setData({
                show: true,
                left: itemsWrapRect.width-3,
                top: itemWrapRect.top - itemsWrapRect.top,
            });
        };

        const handleMouseLeave = (evt) => {
            setData({ show: false });
        };
        return (
            <MenuItemWrap
                data-value={value}
                className='menuItemWrap'
                data-selected={active == value}
                title={title}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                    onClick(value);
                }}
            >
                <Component datas={datas} {...others}></Component>
                {hasChildren(datas) && data.show ? (
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
    };
};

const hasChildren = function (children) {
    return children && children.length > 0;
};

export const MenuItem = WithMenuItem(function (props) {
    const { text, icon, datas } = props;
    return (
        <Fragment>
            {icon ? <IconWrap>{icon}</IconWrap> : null}
            <Title>{text}</Title>
            {hasChildren(datas) ? (
                <ArrowDownIcon
                    style={{ transform: 'rotate(270deg)' }}
                ></ArrowDownIcon>
            ) : null}
        </Fragment>
    );
});

export const DividerMenuItem = function () {
    return (
        <div style={{ marginTop: 2, marginBottom: 2 }}>
            <LineSepatator type='horizontal'></LineSepatator>
        </div>
    );
};
