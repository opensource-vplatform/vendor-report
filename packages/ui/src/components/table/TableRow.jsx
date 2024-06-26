import styled from 'styled-components';

const Wrap = styled.tr`
  color: inherit;
  display: table-row;
  vertical-align: middle;
  outline: 0px;
`;

export default function (props) {
  const { style = {}, children } = props;
  return <Wrap style={style}>{children}</Wrap>;
}
