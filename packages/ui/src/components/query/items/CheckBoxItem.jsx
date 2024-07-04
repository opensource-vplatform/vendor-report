import { CheckBox } from '../../form/Index';
import { WithTitle } from './Components';

const Component = WithTitle(CheckBox);
export default function (props) {
  const {
    label = '布尔',
    onChange,
    ...others
  } = props;
  return (
    <Component
      {...others}
      label={label}
      onChange={(val) => onChange && onChange(val, val ? '是' : '否')}
    ></Component>
  );
}
