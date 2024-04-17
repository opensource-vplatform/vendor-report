import CellImage from './impls/CellImage';
import CellSubTotal from './impls/CellSubTotal';

export const create = function(plugin){
    const {type} = plugin;
    switch(type){
        case "cellImage":
            return new CellImage(plugin);
        case 'cellSubTotal':
            return new CellSubTotal(plugin);
        default:
            throw Error('未识别插件类型【'+type+'】，请检查！');
    }
}