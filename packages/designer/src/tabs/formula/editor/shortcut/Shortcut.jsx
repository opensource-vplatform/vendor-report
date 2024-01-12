import Divider from './impls/DividerShortcut';
import IconShortcut from './impls/IconShortcut';
import TextShortcut from './impls/TextShortcut';

export default function (props) {
  const { shortcut } = props;
  const type = shortcut.type;
  if(type === "icon"){
    return <IconShortcut {...shortcut}></IconShortcut>
  }else if(type === "divider"){
    return <Divider></Divider>
  }else if(type === "text"){
    return <TextShortcut {...shortcut}></TextShortcut>
  }
};
