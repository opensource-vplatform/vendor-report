import styled from 'styled-components';

import { Context } from './Context';

const Wrap = styled.thead`
  display: table-header-group;
`;

export default function (props) {
  const { style = {}, children } = props;
  return (
    <Context.Provider value={'header'}>
      <Wrap style={style}>{children}</Wrap>
    </Context.Provider>
  );
}
