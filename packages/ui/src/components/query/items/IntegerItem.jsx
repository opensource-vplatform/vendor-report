import styled from 'styled-components';

import { Integer } from '../../form/Index';
import { Title } from './Components';

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

export default function(props) {
  const {
    label = '整数',
    labelWidth = 80,
    disabled = false,
    value,
    onChange,
  } = props;
  return (
    <Wrap>
      <Title width={labelWidth} title={label} height={30}></Title>
      <Integer
        value={value}
        onChange={(val) => onChange && onChange(val, val)}
        style={{ flex: 1, borderRadius: 0, height: 30 }}
        disabled={disabled}
      ></Integer>
    </Wrap>
  );
}
