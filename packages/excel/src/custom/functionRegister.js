import Get from './funcs/Get';
import GroupName from './funcs/GroupName';
import Image from './funcs/Image';
import PageCount from './funcs/PageCount';
import PageIndex from './funcs/PageIndex';
import Seq from './funcs/Seq';

export const register = function (spread) {
  const get = new Get();
  spread.addCustomFunction(get);
  const pageCount = new PageCount();
  spread.addCustomFunction(pageCount);
  const pageIndex = new PageIndex();
  spread.addCustomFunction(pageIndex);
  const groupName = new GroupName();
  spread.addCustomFunction(groupName);
  const image = new Image();
  spread.addCustomFunction(image);
  const seq = new Seq();
  spread.addCustomFunction(seq);
};
