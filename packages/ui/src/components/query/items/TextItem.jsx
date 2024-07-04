import { TextInput } from '../../form/Index';
import { WithTitle } from './Components';

const Component = WithTitle(TextInput, { maxLength: 99999 });

export default function (props) {
  const { label = '文本', onChange, value, ...others } = props;
  return (
    <Component
      {...others}
      label={label}
      value={value == null ? '' : value}
      onChange={(val) => onChange && onChange(val, val)}
    ></Component>
  );
}
