import styled from 'styled-components';

import CheckBox from '../../form/CheckBox';

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  height: 35px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  padding-left: 10px;
`;
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
