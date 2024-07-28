import Context from './Context';
import Band from './impls/Band';
import ColumnFooter from './impls/ColumnFooter';
import ColumnHeader from './impls/ColumnHeader';
import Detail from './impls/Detail';
import Group from './impls/Group';
import GroupFooter from './impls/GroupFooter';
import GroupHeader from './impls/GroupHeader';
import JasperReport from './impls/JasperReport';
import PageFooter from './impls/PageFooter';
import PageHeader from './impls/PageHeader';
import StaticText from './impls/StaticText';
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
  StaticText,
  Group,
  GroupFooter,
  GroupHeader,
];

export const createChildren = function (parentElement) {
  const children = [];
  const elements = parentElement.elements;
  if (elements) {
    elements.forEach((element) => {
      if (element.type == 'element') {
        const child = createByNode(element);
        if (child) {
          children.push(child);
        }
      }
    });
  }
  return children;
};

export const createByNode = function (node) {
  const nodeName = node.name;
  const Constructor = Components.find((con) => con.nodeName == nodeName);
  if (Constructor) {
    return new Constructor(node, new Context());
  }
  return null;
};
