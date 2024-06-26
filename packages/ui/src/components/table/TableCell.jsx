import styled from 'styled-components';

import { Context } from './Context';

const TD = styled.td`
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  display: table-cell;
  vertical-align: inherit;
  border-bottom: 1px solid #dadada;
  text-align: right;
  padding: 6px 16px;
`;

const TH = styled.th`
  font-weight: 700;
  line-height: 1.5rem;
  letter-spacing: 0.01071em;
  display: table-cell;
  vertical-align: inherit;
  border-bottom: 1px solid rgb(81, 81, 81);
  text-align: left;
  padding: 6px 16px;
`;

export default function (props) {
  const { align = 'center', style = {}, children } = props;
  return (
    <Context.Consumer>
      {(ctx) => {
        if (ctx == 'header') {
          return <TH style={{ ...style, textAlign: align }}>{children}</TH>;
        } else {
          return <TD style={{ ...style, textAlign: align }}>{children}</TD>;
        }
      }}
    </Context.Consumer>
  );
}
