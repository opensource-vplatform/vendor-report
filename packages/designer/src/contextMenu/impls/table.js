
/**
 * 注册表操作右键菜单
 * @param {*} menuDatas 
 * @param {*} spread 
 */
export const registerContextMenu = function (menuDatas, spread) {
    for (let i = 0, l = menuDatas.length; i < l; i++) {
        const menu = menuDatas[i];
        if (menu.name == 'gc.spread.tableDelete' && menu.workArea == 'table') {
            menu.subMenu.push({
                command: 'tableDeleteAllForContextMenu',
                iconClass: 'gc-spread-deleteComment',
                name: 'gc.spread.tableDeleteAll',
                text: '整表',
            });
            menuDatas.push({
                command: 'tableMoveForContextMenu',
                name: 'gc.spread.tableMove',
                text: '移动',
                workArea: 'table',
            });
            break;
        }
    }
}