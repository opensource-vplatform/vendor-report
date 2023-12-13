import { getCellTag } from './worksheetUtil';

/**
 * 是否绑定了表格
 * @param {*} sheet 
 */
export function isBindingTable(sheet){
    const row = sheet.getActiveRowIndex();
    const col = sheet.getActiveColumnIndex();
    const value = getCellTag(sheet,row,col,"bindType");
    return value=="table";
}