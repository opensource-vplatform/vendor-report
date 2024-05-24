import DefaultCell from './DefaultCell.';

export const register = function(spread){
    const sheets = spread.sheets;
    if(sheets&&sheets.length>0){
        sheets.forEach(sheet=>{
            const defaultStyle = sheet.getDefaultStyle();
            const cellType = defaultStyle.cellType;
            if(!cellType|| cellType.provider != 'toone'){
                defaultStyle.cellType = new DefaultCell();
                sheet.setDefaultStyle(defaultStyle);
            }
        });
    }
}