import Get from './funcs/Get';

export const register = function(spread){
    const get = new Get();
    spread.addCustomFunction(get);
}