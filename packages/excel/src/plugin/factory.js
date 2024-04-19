import CellImage from './impls/CellImage';
import CellPage from './impls/CellPage';
import CellSubTotal from './impls/CellSubTotal';
import CellTotalPages from './impls/CellTotalPages';

export const create = function (plugin) {
    const { type } = plugin;
    switch (type) {
        case 'cellImage':
            return new CellImage(plugin);
        case 'cellSubTotal':
            return new CellSubTotal(plugin);
        case 'pageCellType':
            return new CellPage(plugin);
        case 'totalPagesCellType':
            return new CellTotalPages(plugin);
        default:
            throw Error('未识别插件类型【' + type + '】，请检查！');
    }
};
