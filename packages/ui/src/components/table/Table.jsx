import styled from 'styled-components';

const Wrap = styled.table`
  display: table;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0px;
`;

export default function (props) {
  const { style = {}, children } = props;
  return <Wrap style={style}>{children}</Wrap>;
}
