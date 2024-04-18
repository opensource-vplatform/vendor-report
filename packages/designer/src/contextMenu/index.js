import { registerContextMenu as registerLinkContextMenu } from './impls/link';
import {
  registerCommand as registerMergeCommand,
  registerContextMenu as registerMergeContextMenu,
} from './impls/merge';
import { registerContextMenu as registerTableContextMenu } from './impls/table';

/**
 * 注册右键菜单
 * @param {*} menuDatas
 * @param {*} spread
 */
const registerContextMenu = function (menuDatas, spread) {
    registerTableContextMenu(menuDatas, spread);
    registerLinkContextMenu(menuDatas, spread);
    registerMergeContextMenu(menuDatas, spread);
};

/**
 * 注册命令实现（一般为右键菜单实现）
 * @param {*} spread
 */
const registerCommand = function (spread) {
    registerMergeCommand(spread);
};

export const enhance = function (spread) {
    const menuDatas = spread.contextMenu.menuData;
    registerContextMenu(menuDatas, spread);
    registerCommand(spread);
};
