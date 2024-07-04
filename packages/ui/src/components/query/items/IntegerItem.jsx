import { Integer } from '../../form/Index';
import { WithTitle } from './Components';

const Component = WithTitle(Integer);

export default function (props) {
  const { label = '整数', onChange, ...others } = props;
  return (
    <Component
      {...others}
      label={label}
      onChange={(val) => onChange && onChange(val, val)}
    ></Component>
  );
}
