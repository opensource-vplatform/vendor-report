import styled from 'styled-components';

import { Select } from '../../form/Index';
import { Title } from './Components';

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;
export default function (props) {
  const {
    label = '选择',
    labelWidth = 80,
    disabled = false,
    value,
    onChange,
    options = [],
  } = props;
  return (
    <Wrap>
      <Title width={labelWidth} title={label} height={30}></Title>
      <Select
        wrapStyle={{ flex: 1, borderRadius: 0, height: 30, width: '100%' }}
        style={{height: 30}}
        disabled={disabled}
        value={value}
        datas={options.map(({ value, label }) => {
          return { value, text: label };
        })}
        onChange={(val,text) => onChange && onChange(val, text)}
      ></Select>
    </Wrap>
  );
}
