import { Fragment } from 'react';

import styled from 'styled-components';

import LineSepatator from '../lineSeparator/lineSeparator';

const MenuItemWrap = styled.li`
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0.2em 0.8em;
    cursor: pointer;
    &:hover{
        background-color: lightgray;
    }
    &[data-selected='true']{
        background-color: lightgray;
    }
`;

const IconWrap = styled.div`
    margin-right: 8px;
`;

const WithMenuItem = function (Component) {
    return function (props) {
        const { active, value, title, onClick, ...othters } = props;
        return (
            <MenuItemWrap
                data-value={value}
                data-selected={active == value}
                title={title}
                onClick={() => {
                    onClick(value);
                }}
            >
                <Component {...othters}></Component>
            </MenuItemWrap>
        );
    };
};

export const MenuItem = WithMenuItem(function (props) {
    const {text,icon} = props;
    return (<Fragment>{icon ? <IconWrap>{icon}</IconWrap>:null}<span>{text}</span></Fragment>);
});

export const DividerMenuItem = function(){
    return (<li>
        <LineSepatator type='horizontal'></LineSepatator>
    </li>)
}
