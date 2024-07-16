import { Fragment, useContext, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import { isArray } from '@toone/report-util';

import { ThemeContext } from '../../theme/Index';
import Context from './Context';

const Headers = styled.div`
  border-bottom: solid 1px lightgray;
  background-color: white;
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &[data-appearance='toolbar'] {
    position: relative;
  }
`;

const HeaderWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
`;

const ToolWrap = styled.div`
  display: flex;
  width: max-content;
`;

const Header = styled.div`
  border-bottom: none;
  bottom: -1px;
  cursor: pointer;
  display: inline-block;
  list-style: none;
  font-size: 12px;
  position: relative;
  margin-top: 4px;
  &[data-type='line'] {
    text-align: center;
    margin-top: 0;
    margin-bottom: 5px;
    margin-left: 24px;
    &:first-child{
    margin-left : 0;
    }
  }   
  &[data-active='true'][data-type='card'] {
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
  cursor: pointer;
  &[data-active='true'] {
    cursor: text;
  }
  &[data-type='card'] {
    color: #333;
  }
  &[data-type='line'] {
    padding-left:0;
    padding-right:0;
  }
  &[data-active='true'][data-type='line'] {
    color: #2d8cf0;
  }
`;

const ActiveLine = styled.div`
   height: 2px;
   background: #2d8cf0;
   position: absolute;
   transition: left 0.3s, width 0.3s;
   bottom: 0;
}
`;

const isValidChild = function (child) {
  return child && child.props;
};

const isVisible = function (child) {
  return child.props.visible || typeof child.props.visible == 'undefined';
};

const isAutoSelect = function (child) {
  return child.props.autoSelect || typeof child.props.autoSelect == 'undefined';
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
      (child) => isValidChild(child) && isVisible(child) && isAutoSelect(child)
    );
    return child ? child.props.code : null;
  }
};

const getValidTabIndex = function (code, children) {
  return children.findIndex(
    (child) =>
      isValidChild(child) && isVisible(child) && child.props.code == code
  );
};

const hasParent = function (ele, parent, parents) {
  parents = parents || [];
  const parentNode = ele.parentNode;
  if (parentNode === parent) {
    return true;
  } else if (parentNode) {
    if (parents.indexOf(parentNode) != -1) {
      return false;
    } else {
      return hasParent(parentNode, parent, parents);
    }
  } else {
    return false;
  }
};

function Tabs(props) {
  let {
    value,
    onChange,
    type = 'card',
    appearance = 'normal',
    hideCodes = [],
    headerStyle = {},
    style = {},
    children,
    tool,
  } = props;
  const tabs = isArray(children) ? children : [children];

  const [activeLineStyle, setActiveLineStyle] = useState({
    wdith: 0,
    left: 0,
  });
  const tabsRef = useRef([]);

  const [active, setActive] = useState(() => {
    const activeCode =
      appearance == 'normal' ? getValidTabCode(value, tabs) : value;
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
  const ref = useRef(null);
  useEffect(() => {
    handleActive(appearance == 'normal' ? getValidTabCode(value, tabs) : value);
  }, [value]);

  useEffect(() => {
    if (type == 'line') {
      const index = getValidTabIndex(active, tabs);
      index !== -1 &&
        setActiveLineStyle({
          width: tabsRef.current[index].clientWidth,
          left: tabsRef.current[index].offsetLeft,
        });
    }
  }, [active]);
  
  useEffect(() => {
    let handler = null;
    if (appearance == 'toolbar') {
      handler = (evt) => {
        if (ref.current) {
          const target = evt.target;
          if (!hasParent(target, ref.current)) {
            onChange && onChange(null);
          }
        }
      };
      document.addEventListener('click', handler);
    }
    return () => {
      if (handler != null) {
        document.removeEventListener('click', handler);
      }
    };
  }, [appearance]);

  const themeContext = useContext(ThemeContext);
  Object.entries(themeContext.nav.navItemStyles).forEach(function ([
    key,
    value,
  ]) {
    headerStyle[key] = value;
  });

  const headers = (
    <Headers
      data-appearance={appearance}
      style={{
        backgroundColor: themeContext.nav.backgroundColor,
        height: themeContext.nav.height,
      }}
    >
      <HeaderWrap>
        {children.map((child, index) => {
          if (!child) return null;
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
          const TitleWrapStyles = {};
          if (themeContext.type !== 'default') {
            TitleWrapStyles.padding = '0 8px';
            TitleWrapStyles.height = '100%';
            TitleWrapStyles.display = 'flex';
            TitleWrapStyles.alignItems = 'center';
            TitleWrapStyles.backgroundColor = 'transparent';
            TitleWrapStyles.color = actived
              ? themeContext.nav.activeTextColor
              : themeContext.nav.textColor;
          }

          children =
            typeof children == 'string' ? (
              <TitleWrap
                data-active={actived}
                data-type={type}
                style={TitleWrapStyles}
              >
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
                data-type={type}
                style={headerStyle}
                ref={(el) => (tabsRef.current[index] = el)}
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
        {type == 'line' && (
          <ActiveLine
            style={{ width: activeLineStyle.width, left: activeLineStyle.left }}
          />
        )}
      </HeaderWrap>
      {tool ? <ToolWrap>{tool}</ToolWrap> : null}
    </Headers>
  );
  const ctx = { active, appearance };
  return (
    <Fragment>
      <Context.Provider value={ctx}>
        <div style={style} ref={ref}>
          {headers}
          {children}
        </div>
      </Context.Provider>
    </Fragment>
  );
}

export default Tabs;
