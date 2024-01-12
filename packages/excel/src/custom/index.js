import { register as registerFuncs } from './functionRegister';

export const register = function(spread){
    registerFuncs(spread);
}