import { Date } from '../../form/Index';
import { WithTitle } from './Components';

const Component = WithTitle(Date);

export default function (props) {
  const { label = '日期', onChange,onClear, ...others } = props;
  return (
    <Component
      {...others}
      label={label}
      onClear={onClear}
      onChange={(val) => onChange && onChange(val, val)}
    ></Component>
  );
}
