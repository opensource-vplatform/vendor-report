import styled from 'styled-components';

import {
  Radio,
  RadioGroup,
} from '../../form/Index';
import { Title } from './Components';

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;
export default function (props) {
  const {
    label = '单选组',
    labelWidth = 80,
    disabled = false,
    value,
    onChange,
    options = [],
  } = props;
  return (
    <Wrap>
      <Title width={labelWidth} title={label} height={30}></Title>
      <RadioGroup
        style={{ flex: 1, borderRadius: 0, height: 30, width: '100%' }}
        disabled={disabled}
        value={value}
        onChange={(val, text) => onChange && onChange(val, text)}
      >
        {options.map(({ label, value }) => (
          <Radio key={value} label={label} value={value}></Radio>
        ))}
      </RadioGroup>
    </Wrap>
  );
}
