import {
  Fragment,
  useEffect,
  useState,
} from 'react';

import styled from 'styled-components';

import Context from './Context';

const Headers = styled.div`
    border-bottom: solid 1px lightgray;
    background-color: white;
    margin: 0px;
    padding: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HeaderWrap = styled.div``;

const ToolWrap = styled.div``;

const Header = styled.div`
    border-bottom: none;
    bottom: -1px;
    cursor: pointer;
    display: inline-block;
    list-style: none;
    font-size: 12px;
    position: relative;
    margin-top: 4px;
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

const isValidChild = function (child) {
    return child && child.props;
};

const isVisible = function (child) {
    return child.props.visible || typeof child.props.visible == 'undefined';
};

const isAutoSelect = function (child) {
    return (
        child.props.autoSelect || typeof child.props.autoSelect == 'undefined'
    );
};

const getValidTabCode = function (code, children) {
    let child = children.find(
        (child) =>
            isValidChild(child) && isVisible(child) && child.props.code == code
    );
    if (child) {
        return code;
    } else {
        child = children.find(
            (child) =>
                isValidChild(child) && isVisible(child) && isAutoSelect(child)
        );
        return child ? child.props.code : null;
    }
};

function Tabs(props) {
    let { value, onChange, hideCodes = [], children, tool } = props;
    const tabs = Array.isArray(children) ? children : [children];
    const [active, setActive] = useState(() => {
        const activeCode = getValidTabCode(value, tabs);
        if (activeCode != value) {
            onChange && onChange(activeCode);
        }
        return activeCode;
    });
    const handleActive = (code) => {
        if (code !== active) {
            setActive(code);
            onChange && onChange(code);
        }
    };
    useEffect(() => {
        handleActive(getValidTabCode(value, tabs));
    }, [value]);
    const headers = (
        <Headers>
            <HeaderWrap>
                {children.map((child) => {
                    const childProps = child.props;
                    //隐藏导航
                    const hidden = childProps?.tabProps?.hidden;
                    if (hidden) {
                        return null;
                    }

                    const childCode = childProps.code;
                    if (hideCodes.indexOf(childCode) != -1) return null;
                    const onClick = childProps.onClick;
                    const actived = childCode == active;
                    let children = childProps.title;
                    children =
                        typeof children == 'string' ? (
                            <TitleWrap data-active={actived}>
                                {children}
                            </TitleWrap>
                        ) : (
                            children
                        );
                    const clickHandler =
                        typeof onClick == 'function' ? onClick : handleActive;
                    return (
                        <Fragment key={childCode}>
                            <Header
                                data-active={actived}
                                onClick={
                                    actived
                                        ? null
                                        : () => {
                                              clickHandler(childCode);
                                          }
                                }
                            >
                                {children}
                            </Header>
                        </Fragment>
                    );
                })}
            </HeaderWrap>
            {tool ? <ToolWrap>{tool}</ToolWrap> : null}
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
