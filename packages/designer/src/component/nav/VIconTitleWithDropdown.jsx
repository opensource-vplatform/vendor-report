import ArrowDownIcon from '@icons/arrow/ArrowDown';
import {
  Menu,
  VItem,
} from '@toone/report-ui';

/**
 * 图标
 * 标题
 * 下拉选择菜单
 * 图标和下拉菜单一起
 */

const itemStyle = {
  marginLeft: 4,
  paddingLeft: 4,
  paddingRight: 4,
  paddingBottom: 4,
};

const iconStyle = {
  width: 28,
  height: 28,
};

export default function (props) {
  const {
    icon: Icon,
    title,
    desc = '',
    menus,
    onVisibleChange,
    onNodeClick,
    value,
    cancelAble = false,
  } = props;
  return (
    <Menu
      value={value}
      datas={menus}
      cancelAble={cancelAble}
      onNodeClick={onNodeClick}
      onVisibleChange={onVisibleChange}
    >
      <VItem
        title={title}
        desc={desc}
        style={itemStyle}
        icon={<Icon iconStyle={iconStyle}></Icon>}
      >
        <ArrowDownIcon
          style={{
            width: 16,
            height: 16,
          }}
        ></ArrowDownIcon>
      </VItem>
    </Menu>
  );
}
