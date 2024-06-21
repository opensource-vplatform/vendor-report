import TextInput from '../../form/TextInput';
import {
  Label,
  Wrap,
} from '../ui';

export function IntegerItem(props) {
  const { labelText = '', labelWidth = 80, disabled = false } = props;
  const labelStyles = {
    width: labelWidth,
  };
  return (
    <Wrap>
      {labelText && <Label style={labelStyles}>{labelText}</Label>}
      <TextInput
        style={{ flex: 1, borderRadius: 0 }}
        disabled={disabled}
      ></TextInput>
    </Wrap>
  );
}
