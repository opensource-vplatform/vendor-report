import { execute as getExecute } from './impls/Get';
import { execute as pageCountExecute } from './impls/PageCount';
import { execute as pageIndexExecute } from './impls/PageIndex';

export const exeFormula = function(ast,tool){
    const {functionName} = ast;
    switch(functionName){
        case "TOONE.GET":
            return getExecute(ast,tool);
        case "TOONE.PAGECOUNT":
            return pageCountExecute(ast,tool);
        case "TOONE.PAGEINDEX":
            return pageIndexExecute(ast,tool);
    }
    return null;
}