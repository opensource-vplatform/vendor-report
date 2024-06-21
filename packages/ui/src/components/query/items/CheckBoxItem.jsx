import CheckBox from '../../form/CheckBox';
import {
  Label,
  Wrap,
} from '../ui';

export function CheckBoxItem(props) {
  const {
    labelText = '',
    labelWidth = 80,
    disabled = false,
    value = '',
  } = props;
  const labelStyles = {
    width: labelWidth,
  };
  console.log(labelText);
  return (
    <Wrap>
      {labelText && <Label style={labelStyles}>{labelText}</Label>}
      <CheckBox disabled={disabled}></CheckBox>
    </Wrap>
  );
}
