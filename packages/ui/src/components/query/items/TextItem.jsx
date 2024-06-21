import styled from 'styled-components';

import { TextInput } from '../../form/Index';
import { Title } from './Components';

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;
export default function (props) {
  const {
    label = '文本',
    labelWidth = 80,
    disabled = false,
    value,
    onChange,
  } = props;
  return (
    <Wrap>
      <Title width={labelWidth} title={label} height={30}></Title>
      <TextInput
        style={{ flex: 1, borderRadius: 0, height: 30 }}
        disabled={disabled}
        value={value==null ? '':value}
        maxLength={99999}
        onChange={(val)=>onChange&&onChange(val,val)}
      ></TextInput>
    </Wrap>
  );
}
