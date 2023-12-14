import { inTableArea } from './worksheetUtil';

/**
 * 是否绑定了表格
 * @param {*} sheet 
 */
export function isBindingTable(sheet){
    const row = sheet.getActiveRowIndex();
    const col = sheet.getActiveColumnIndex();
    return inTableArea(sheet,row,col);
}