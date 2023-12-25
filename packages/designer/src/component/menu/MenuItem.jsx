import { Fragment } from 'react';

import styled from 'styled-components';

import LineSepatator from '../lineSeparator/lineSeparator';

const MenuItemWrap = styled.div`
    height: 30px;
    display: flex;
    align-items: center;
    margin: 2px 2px;
    cursor: pointer;
    &:hover{
        background-color: #dadada;
    }
    &[data-selected='true']{
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
    return (<Fragment>{icon ? <IconWrap>{icon}</IconWrap>:null}<Title>{text}</Title></Fragment>);
});

export const DividerMenuItem = function(){
    return (<div style={{marginTop:2,marginBottom:2}}>
        <LineSepatator type='horizontal'></LineSepatator>
    </div>)
}
