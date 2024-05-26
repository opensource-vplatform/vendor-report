import DefaultCell from './DefaultCell';

export const register = function (sheet) {
    const defaultStyle = sheet.getDefaultStyle();
    const cellType = defaultStyle.cellType;
    //if (!cellType || cellType.provider != 'toone') {
    defaultStyle.cellType = new DefaultCell();
    sheet.setDefaultStyle(defaultStyle);
    //}
};
