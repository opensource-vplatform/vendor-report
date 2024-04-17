import { create } from './factory';

export const execute = function(plugins,tool){
    let value = {type:'formula'|'text',value:''};
    plugins.forEach(plugin=>{
        const inst = create(plugin);
        value = inst.execute(value);
    })
    return value;
}