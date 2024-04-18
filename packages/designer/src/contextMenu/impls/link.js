/**
 * 注册超链接右键菜单
 * @param {*} menuDatas 
 * @param {*} spread 
 */
export const registerContextMenu = function (menuDatas, spread) {
    menuDatas.push({
        command: 'toggleHyperlink',
        name: 'gc.spread.toggleHyperlink',
        text: '超链接',
        workArea: 'viewport',
    });
}