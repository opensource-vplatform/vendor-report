import { isChild } from '../util/XmlUtil';
import Context from './Context';
import Band from './impls/Band';
import ColumnFooter from './impls/ColumnFooter';
import ColumnHeader from './impls/ColumnHeader';
import Detail from './impls/Detail';
import JasperReport from './impls/JasperReport';
import PageFooter from './impls/PageFooter';
import PageHeader from './impls/PageHeader';
import TextField from './impls/TextField';
import Title from './impls/Title';

const Components = [
  Band,
  ColumnFooter,
  ColumnHeader,
  JasperReport,
  PageFooter,
  PageHeader,
  TextField,
  Title,
  Detail,
];

export const createChildren = function (parentElement) {
  let children = [];
  for (let [key, val] of Object.entries(parentElement)) {
    children = children.concat(createByNode(key, val));
  }
  return children;
};

export const createByNode = function (nodeName, nodeVal) {
  const children = [];
  if (isChild(nodeName)) {
    const Constructor = Components.find((con) => con.nodeName == nodeName);
    if (Constructor) {
      nodeVal = Array.isArray(nodeVal) ? nodeVal : [nodeVal];
      nodeVal.forEach((item) => {
        const inst = new Constructor(item, new Context());
        children.push(inst);
      });
    }
  }
  return children;
};
