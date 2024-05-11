import { enhance as enhanceGet } from './impls/Get';
import { enhance as enhancePageCount } from './impls/PageCount';
import { enhance as enhancePageIndex } from './impls/PageIndex';

const Formula_Enhances = [
    enhanceGet,
    enhancePageCount,
    enhancePageIndex,
];

export const enhance = function(formula,tools){
    Formula_Enhances.forEach(enhance=>{
        formula = enhance(formula,tools);
    });
    return formula
}