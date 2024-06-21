import Select from '../../form/Select';
import {
  Label,
  Wrap,
} from '../ui';

export function Selectitem(props) {
  const {
    labelText = '',
    labelWidth = 80,
    disabled = false,
    value = '',
  } = props;
  const labelStyles = {
    width: labelWidth,
  };
  return (
    <Wrap>
      {labelText && <Label style={labelStyles}>{labelText}</Label>}
      <Select
        disabled={disabled}
        wrapStyle={{ flex: 1, height: '35px' }}
        style={{ height: '35px' }}
      ></Select>
    </Wrap>
  );
}
