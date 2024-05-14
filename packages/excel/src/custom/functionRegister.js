import Get from './funcs/Get';
import GroupName from './funcs/GroupName';
import PageCount from './funcs/PageCount';
import PageIndex from './funcs/PageIndex';

export const register = function (spread) {
    const get = new Get();
    spread.addCustomFunction(get);
    const pageCount = new PageCount();
    spread.addCustomFunction(pageCount);
    const pageIndex = new PageIndex();
    spread.addCustomFunction(pageIndex);
    const groupName = new GroupName();
    spread.addCustomFunction(groupName);
};
