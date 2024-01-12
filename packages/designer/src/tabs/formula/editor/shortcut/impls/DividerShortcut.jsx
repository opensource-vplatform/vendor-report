import styled from 'styled-components';

const DividerNode = styled.div`
  width: 13px;
  height: 26px;
  color: #ddd;
  background-size: cover;
  border-radius: 2px;
  margin: 4px 2px;
  text-align: center;
`;

const Divider = function () {
  return <DividerNode><span>|</span></DividerNode>;
};

export default Divider;
