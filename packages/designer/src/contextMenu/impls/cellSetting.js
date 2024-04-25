import { genCellSettingVisibleHandler } from '../../utils/styleUtil';

const Cell_Setting_Command = 'com.toone.contextMenu.cellSetting';

/**
 * 注册单元格格式设置
 * @param {*} menuDatas 
 * @param {*} spread 
 */
export const registerContextMenu = function (menuDatas, spread) {
    menuDatas.push({
        command: Cell_Setting_Command,
        name: 'com.toone.cellSetting',
        text: '设置单元格格式',
        iconClass: 'toone-cell-setting',
        workArea: 'viewport',
    });
}

/**
 * 注册命令
 * @param {*} spread
 */
export const registerCommand = function (spread,dispatch) {
    const commandManager = spread.commandManager();
    const showCellSettingHandler = genCellSettingVisibleHandler(spread,dispatch,'number');
    commandManager.register(Cell_Setting_Command, {
        canUndo: false,
        execute: function (context, options, isUndo) {
            showCellSettingHandler();
        },
    });
};