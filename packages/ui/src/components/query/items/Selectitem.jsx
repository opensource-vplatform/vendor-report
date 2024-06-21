import styled from 'styled-components';

import Select from '../../form/Select';

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
  console.log(labelText);
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
