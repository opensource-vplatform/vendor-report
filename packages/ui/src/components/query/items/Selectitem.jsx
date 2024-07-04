import styled from 'styled-components';

import { Select } from '../../form/Index';
import { WithTitle } from './Components';

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

const Component = WithTitle(Select, {
  wrapStyle: { flex: 1, borderRadius: 0, height: 30, width: '100%' },
});

export default function (props) {
  const { label = '选择', options = [], onChange, ...others } = props;
  return (
    <Component
      {...others}
      label={label}
      onChange={(val, text) => onChange && onChange(val, text)}
      datas={options.map(({ value, label }) => {
        return { value, text: label };
      })}
    ></Component>
  );
}
