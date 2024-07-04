import { Float } from '../../form/Index';
import { WithTitle } from './Components';

const Component = WithTitle(Float);

export default function (props) {
  const { label = '小数', onChange, ...others } = props;
  return (
    <Component
      {...others}
      label={label}
      onChange={(val) => onChange && onChange(val, val)}
    ></Component>
  );
}
