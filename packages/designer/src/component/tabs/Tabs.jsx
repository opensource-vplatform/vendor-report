import {
  Fragment,
  useState,
} from 'react';

import styled from 'styled-components';

import Context from './Context';

const Headers = styled.ul`
    border: solid 1px lightgray;
    background-color: white;
    margin: 0px;
    padding: 0px;
`;

const Header = styled.li`
    border-bottom: none;
    bottom: -1px;
    cursor: pointer;
    display: inline-block;
    list-style: none;
    font-size: 12px;
    position: relative;
    &[data-active='true'] {
        padding-bottom: 1px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border: solid 1px lightgray;
        border-bottom: none;
        background-color: white;
        cursor: pointer;
    }
`;

const TitleWrap = styled.a`
    padding: 6px 12px 6px 12px;
    display: block;
    color: #333;
    cursor: pointer;
    &[data-active='true'] {
        cursor: text;
    }
`;

function Tabs(props) {
    let { value, children } = props;
    const tabs = Array.isArray(children) ? children : [children];
    const [active, setActive] = useState(() => {
        return typeof value == 'undefined' ? tabs[0].props.code : value;
    });
    const headers = (
        <Headers>
            {children.map((child) => {
                const childProps = child.props;
                const childCode = childProps.code;
                const onClick = childProps.onClick;
                const actived = childCode == active;
                let children = childProps.title;
                children =
                    typeof children == 'string' ? (
                        <TitleWrap data-active={actived}>{children}</TitleWrap>
                    ) : (
                        children
                    );
                const clickHandler =
                    typeof onClick == 'function' ? onClick : setActive;
                return (
                    <Fragment key={childCode}>
                        <Header
                            data-active={actived}
                            onClick={() => {
                                clickHandler(childCode);
                            }}
                        >
                            {children}
                        </Header>
                    </Fragment>
                );
            })}
        </Headers>
    );
    return (
        <Fragment>
            <Context.Provider value={active}>
                <div>
                    {headers}
                    {children}
                </div>
            </Context.Provider>
        </Fragment>
    );
}

export default Tabs;
