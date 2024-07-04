import {
  Radio,
  RadioGroup,
} from '../../form/Index';
import { WithTitle } from './Components';

const Component = WithTitle(RadioGroup);

export default function (props) {
  const { label = '单选组', onChange, options = [], ...others } = props;
  return (
    <Component
      {...others}
      label={label}
      onChange={(val, text) => onChange && onChange(val, text)}
    >
      {options.map(({ label, value }) => (
        <Radio key={value} label={label} value={value}></Radio>
      ))}
    </Component>
  );
}
