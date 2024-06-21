import styled from 'styled-components';

import {
  Radio,
  RadioGroup,
} from '../../form/RadioGroup';
import {
  Label,
  Wrap,
} from '../ui';

const RadioGroupWrap = styled.div`
  display: flex;
`;

export function RadioGroupItem(props) {
  const {
    datas = [],
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
      <RadioGroupWrap>
        <RadioGroup>
          {datas.map(({ text, value }) => {
            return <Radio label={text} value={value} key={value}></Radio>;
          })}
        </RadioGroup>
      </RadioGroupWrap>
    </Wrap>
  );
}
