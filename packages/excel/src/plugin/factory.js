import CellImagePlugin from './impls/CellImage';

export const create = function(plugin){
    const {type,config} = plugin;
    switch(type){
        case "cellImage":
            return new CellImagePlugin(plugin);
        case 'cellSum':
            return new CellSum(plugin);
    }
}