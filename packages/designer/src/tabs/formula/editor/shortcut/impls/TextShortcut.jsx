import styled from 'styled-components';

const WrapComponent = styled.div`
  display:flex;
  align-items:center;
  line-height: 26px;
  font-weight: 700;
  font-size: 14px;
  border-radius: 2px;
  padding: 0 4px;
  margin: 4px 5px;
  cursor: pointer;
  &:hover {
    background-color: #e6e7e8;
    color: #1976d2;
  }
`;

const TextShortcut = function (props) {
  const { title, desc = "", onClick,style={} } = props;
  const handler = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
      <WrapComponent style={style}  title={desc} onClick={handler}>
        <span>{title}</span>
      </WrapComponent>
  );
};

export default TextShortcut;
