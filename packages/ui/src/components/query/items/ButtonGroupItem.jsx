import styled from 'styled-components';

import { Button } from '../../form/Index';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Fill = styled.div`
  width: 100%;
`;

export default function (props) {
  const { buttons = [],align='right' } = props;
  return (
    <Wrap>
      {align=='right' ? <Fill></Fill>:null}
      {buttons.map(({label,...attrs}, index) => {
        return <Button key={index} {...attrs}>{label}</Button>;
      })}
    </Wrap>
  );
}
