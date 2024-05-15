import DefaultCell from './DefaultCell';

export const enhanceSheet = function (sheet) {
    const defaultStyle = sheet.getDefaultStyle();
    defaultStyle.cellType = new DefaultCell();
    sheet.setDefaultStyle(defaultStyle);
};
