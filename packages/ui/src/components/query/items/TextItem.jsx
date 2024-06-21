import TextInput from '../../form/TextInput';
import {
  Label,
  Wrap,
} from '../ui';

export function TextItem(props) {
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
      <TextInput
        style={{ flex: 1, borderRadius: 0 }}
        disabled={disabled}
        value={value}
        onChange={() => {}}
      ></TextInput>
    </Wrap>
  );
}
