import { register as registerCellType } from './celltype/index';
import { register as registerFuncs } from './functionRegister';

export const register = function(spread){
    registerFuncs(spread);
    registerCellType(spread);
}