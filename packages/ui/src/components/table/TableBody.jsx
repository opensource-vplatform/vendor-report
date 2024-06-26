import styled from 'styled-components';

const Wrap = styled.tbody`
  display: table-row-group;
`;

export default function (props) {
  const { style = {}, children } = props;
  return <Wrap style={style}>{children}</Wrap>;
}
