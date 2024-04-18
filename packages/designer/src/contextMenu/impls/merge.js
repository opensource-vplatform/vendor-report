import {
  bind,
  EVENTS,
} from '../../event/EventManager';

const Merge_Menu_Name = 'com.toone.merge';

const Merge_Row_Menu_Name = 'com.toone.mergeRow';

const Merge_Column_Menu_Name = 'com.toone.mergeColumn';

const Merge_Row_Command = 'com.toone.contextMenu.mergeRow';

const Merge_Column_Command = 'com.toone.contextMenu.mergeColumn';

const getMergeInfo = function (spread) {
    let allowColMerge = false,
        allowRowMerge = false;
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
                            allowColMerge = true;
                            bindingColCount++;
                        } else {
                            bindingColCount = 0;
                        }
                        if (bindingColCount > 1) {
                            allowRowMerge = true;
                            break;
                        }
                    }
                }
            }
        }
    }
    return { allowColMerge, allowRowMerge };
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
            iconClass:'toone-row-merge',
            workArea: 'viewport',
        };
        menuDatas.push(menu);
    }
    return menu;
};

const addRowMergeMenu = function (menuDatas) {
    const mergeMenu = addMergeMenu(menuDatas);
    const subMenu = mergeMenu.subMenu;
    const menu = getMenu(subMenu, Merge_Row_Menu_Name);
    if (!menu) {
        subMenu.push({
            text: '行合并',
            name: Merge_Row_Menu_Name,
            command: Merge_Row_Command,
            iconClass:'toone-row-merge',
        });
    }
};

const removeRowMergeMenu = function (menuDatas) {
    const menu = getMergeMenu(menuDatas);
    if (menu) {
        const subMenu = menu.subMenu;
        removeMenu(subMenu, Merge_Row_Menu_Name);
    }
};

const addColumnMergeMenu = function (menuDatas) {
    const mergeMenu = addMergeMenu(menuDatas);
    const subMenu = mergeMenu.subMenu;
    const menu = getMenu(subMenu, Merge_Row_Menu_Name);
    if (!menu) {
        subMenu.push({
            text: '列合并',
            name: Merge_Column_Menu_Name,
            command: Merge_Column_Command,
            iconClass:'toone-row-merge',
        });
    }
};

const removeColumnMergeMenu = function (menuDatas) {
    const menu = getMergeMenu(menuDatas);
    if (menu) {
        const subMenu = menu.subMenu;
        removeMenu(subMenu, Merge_Column_Menu_Name);
    }
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
        const { allowColMerge, allowRowMerge } = getMergeInfo(spread);
        if (allowColMerge || allowRowMerge) {
            if (allowColMerge) {
                addColumnMergeMenu(menuDatas);
            } else {
                removeColumnMergeMenu(menuDatas);
            }
            if (allowRowMerge) {
                addRowMergeMenu(menuDatas);
            } else {
                removeRowMergeMenu(menuDatas);
            }
        } else {
            removeMergeMenu(menuDatas);
        }
    };
    bind({
        event: EVENTS.SelectionChanged,
        handler,
    });
};

const registerRowMergeCommand = function(commandManager){
    commandManager.register(Merge_Row_Command,{
        canUndo: true,
        execute: function (context, options, isUndo) {
            alert("行合并实现");
        },
    });
}

const registerColumnMergeCommand = function (commandManager) {
    commandManager.register(Merge_Column_Command,{
        canUndo: true,
        execute: function (context, options, isUndo) {
            alert("列合并实现");
        },
    });
};

/**
 * 注册命令
 * @param {*} spread
 */
export const registerCommand = function (spread) {
    const commandManager = spread.commandManager();
    registerRowMergeCommand(commandManager);
    registerColumnMergeCommand(commandManager);
};
