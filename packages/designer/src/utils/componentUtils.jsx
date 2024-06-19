import { useDispatch } from 'react-redux';

import { VIconTitleWithDropdown } from '@components/nav/Index';
import ArrowDownIcon from '@icons/arrow/ArrowDown';
import {
  Menu,
  Popper,
  Tab,
  VItem,
} from '@toone/report-ui';

export const Icon = function (props) {
  const { title, icon: Icon } = props;
  return (
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
  );
};

export const IconMenu = function (props) {
  const { title, datas, icon, ...others } = props;
  return (
    <Menu datas={datas} frozien={-1} {...others}>
      <Icon title={title} icon={icon}></Icon>
    </Menu>
  );
};

export const WithIconMenu = function (title, Icon, datas, options = {}) {
  return (props) => {
    const menuDatas = typeof datas == 'function' ? datas() : datas;
    return menuDatas.length == 0 ? null : (
      <VIconTitleWithDropdown
        title={title}
        icon={Icon}
        menus={menuDatas}
        {...{ ...props, ...options }}
      ></VIconTitleWithDropdown>
    );
  };
};

export const WithIconPopper = function (title, icon, options = {}) {
  return (props) => {
    return (
      <Popper {...{ ...props, ...options }}>
        <Icon title={title} icon={icon}></Icon>
      </Popper>
    );
  };
};

export const WithTabItem = function (Component, clickHandler) {
  return function (props) {
    const dispatch = useDispatch();
    const { code, title, tabProps = {} } = props;
    return (
      <Tab
        code={code}
        title={title}
        onClick={() => {
          dispatch(clickHandler({ code }));
        }}
      >
        <Component {...tabProps}></Component>
      </Tab>
    );
  };
};
