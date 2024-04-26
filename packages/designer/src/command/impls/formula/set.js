import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.formula.set',
    function (sheet, options) {
        const {formula,row,col} = options;
        sheet.setFormula(row,col,formula);
    }
);
