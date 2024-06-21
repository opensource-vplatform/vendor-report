import styled from 'styled-components';

import { CheckBox } from '../../form/Index';
import { Title } from './Components';

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;
export default function (props) {
  const {
    label = '布尔',
    labelWidth = 80,
    disabled = false,
    value,
    onChange,
  } = props;
  return (
    <Wrap>
      <Title width={labelWidth} title={label} height={30}></Title>
      <CheckBox
        disabled={disabled}
        value={value}
        onChange={(val)=>onChange&&onChange(val,val ? '是':'否')}
      ></CheckBox>
    </Wrap>
  );
}
