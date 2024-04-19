import {
  bind,
  EVENTS,
} from '../../event/EventManager';
import {
  time,
  timeEnd,
} from '../../utils/profileUtil';

const Merge_Menu_Name = 'com.toone.merge';

const Merge_Row_Menu_Name = 'com.toone.mergeRow';

const Un_Merge_Row_Menu_Name = 'com.toone.unMergeRow';

const Merge_Column_Menu_Name = 'com.toone.mergeColumn';

const Un_Merge_Column_Menu_Name = 'com.toone.unMergeColumn';

const Merge_Row_Command = 'com.toone.contextMenu.mergeRow';

const Un_Merge_Row_Command = 'com.toone.ontextMenu.unMergeRow';

const Merge_Column_Command = 'com.toone.contextMenu.mergeColumn';

const Un_Merge_Column_Command = 'com.toone.contextMenu.unMergeColumn';

const getMergeInfo = function (spread) {
    let colMergeList = [],
        rowMergeList = [],
        colMergedList = [],
        rowMergedList = [];
    const sheet = spread.getActiveSheet();
    if (sheet) {
        const selections = sheet.getSelections();
        if (selections && selections.length > 0) {
            for (let i = 0; i < selections.length; i++) {
                const { row, col, rowCount, colCount } = selections[i];
                for (let j = 0; j < rowCount; j++) {
                    const rowIndex = row + j;
                    let bindingColCount = 0;
                    for (let k = 0; k < colCount; k++) {
                        const colIndex = col + k;
                        const bindingPath = sheet.getBindingPath(
                            rowIndex,
                            colIndex
                        );
                        if (bindingPath) {
                            colMergeList.push({
                                row:rowIndex,
                                col:colIndex,
                            });
                            bindingColCount++;
                        } else {
                            if (bindingColCount > 1) {
                                rowMergeList.push({
                                    
                                });
                                break;
                            }
                            bindingColCount = 0;
                        }
                    }
                }
            }
        }
    }
    return { colMergeList, rowMergeList, colMergedList, rowMergedList };
};

const getMenu = function (menus, name) {
    return menus ? menus.find((menu) => menu.name == name) : null;
};

const removeMenu = function (menus, name) {
    const menu = getMenu(menus, name);
    if (menu) {
        const index = menus.indexOf(menu);
        menus.splice(index, 1);
    }
};

const getMergeMenu = function (menuDatas) {
    return getMenu(menuDatas, Merge_Menu_Name);
};

const removeMergeMenu = function (menuDatas) {
    removeMenu(menuDatas, Merge_Menu_Name);
};

const addMergeMenu = function (menuDatas) {
    let menu = getMergeMenu(menuDatas);
    if (!menu) {
        menu = {
            text: '合并',
            name: Merge_Menu_Name,
            subMenu: [],
            iconClass: 'toone-row-merge',
            workArea: 'viewport',
        };
        menuDatas.push(menu);
    }
    return menu;
};

/**
 * 添加合并子菜单
 * @param {*} menuDatas
 * @param {*} options
 */
const addMergeSubMenu = function (menuDatas, options) {
    const mergeMenu = addMergeMenu(menuDatas);
    const subMenu = mergeMenu.subMenu;
    const { name } = options;
    const menu = getMenu(subMenu, name);
    if (!menu) {
        subMenu.push(options);
    }
};

const addRowMergeMenu = function (menuDatas) {
    addMergeSubMenu(menuDatas, {
        text: '行合并',
        name: Merge_Row_Menu_Name,
        command: Merge_Row_Command,
        iconClass: 'toone-row-merge',
    });
};

const addRowUnMergeMenu = function (menuDatas) {
    addMergeSubMenu(menuDatas, {
        text: '取消行合并',
        name: Un_Merge_Row_Menu_Name,
        command: Un_Merge_Row_Command,
        iconClass: 'toone-cell-unMerge',
    });
};

const addColumnMergeMenu = function (menuDatas) {
    const mergeMenu = addMergeMenu(menuDatas);
    const subMenu = mergeMenu.subMenu;
    subMenu.push({
        text: '列合并',
        name: Merge_Column_Menu_Name,
        command: Merge_Column_Command,
        iconClass: 'toone-row-merge',
    });
};

const addColumnUnMergeMenu = function (menuDatas) {
    const mergeMenu = addMergeMenu(menuDatas);
    const subMenu = mergeMenu.subMenu;
    subMenu.push({
        text: '取消列合并',
        name: Un_Merge_Column_Menu_Name,
        command: Un_Merge_Column_Command,
        iconClass: 'toone-cell-unMerge',
    });
};

const registerRowMergeCommand = function (commandManager) {
    commandManager.register(Merge_Row_Command, {
        canUndo: true,
        execute: function (context, options, isUndo) {
            debugger;
            alert('行合并实现');
        },
    });
};

const registerUnRowMergeCommand = function (commandManager) {
    commandManager.register(Un_Merge_Row_Command, {
        canUndo: true,
        execute: function (context, options, isUndo) {
            debugger;
            alert('取消行合并实现');
        },
    });
};

const registerColumnMergeCommand = function (commandManager) {
    commandManager.register(Merge_Column_Command, {
        canUndo: true,
        execute: function (context, options, isUndo) {
            debugger;
            alert('列合并实现');
        },
    });
};

const registerUnColumnMergeCommand = function (commandManager) {
    commandManager.register(Un_Merge_Column_Command, {
        canUndo: true,
        execute: function (context, options, isUndo) {
            debugger;
            alert('取消列合并实现');
        },
    });
};

/**
 * 注册行、列合并右键菜单
 * 1、如果当前选中的单元格中包含有绑定字段的单元格，则允许列合并
 * 2、如果当前选中的单元格中横向存在两个及以上的连续单元格绑定了字段，则允许行合并
 * @param {*} menuDatas
 * @param {*} spread
 */
export const registerContextMenu = function (menuDatas, spread) {
    const handler = () => {
        const profile = '设置行列合并右键菜单';
        time(profile);
        const {
            colMergeList,
            rowMergeList,
            colMergedList,
            rowMergedList,
        } = getMergeInfo(spread);
        //先清除合并菜单
        removeMergeMenu(menuDatas);
        colMergeList.length>0&&addColumnMergeMenu(menuDatas);
        rowMergeList.length>0&&addRowMergeMenu(menuDatas);
        colMergedList.length>0&&addColumnUnMergeMenu(menuDatas);
        rowMergedList.length>0&&addRowUnMergeMenu(menuDatas);
        timeEnd(profile);
    };
    bind({
        event: EVENTS.SelectionChanged,
        handler,
    });
};

/**
 * 注册命令
 * @param {*} spread
 */
export const registerCommand = function (spread) {
    const commandManager = spread.commandManager();
    registerRowMergeCommand(commandManager);
    registerUnRowMergeCommand(commandManager);
    registerColumnMergeCommand(commandManager);
    registerUnColumnMergeCommand(commandManager);
};
