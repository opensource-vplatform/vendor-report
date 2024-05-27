import DefaultCell from './DefaultCell';

export const register = function (sheet) {
    const defaultStyle = sheet.getDefaultStyle();
    //new DefaultCell();
    defaultStyle.cellType = new DefaultCell();
    sheet.setDefaultStyle(defaultStyle);
};
