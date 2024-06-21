import styled from 'styled-components';

const Label = styled.label`
  padding: 0px;
  position: relative;
  display: block;
  transform-origin: left top;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  text-align: right;
  color: #333333;
  font-size: 14px;
  flex-shrink: 0;
  margin-right: 6px;
`;

const TitleWrap = styled.div`
  position: absolute;
  width: 100%;
  right: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Span = styled.span`
  white-space: nowrap;
  padding: 0px 4px;
`;

export const Title = function (props) {
  const { title = '', desc = '', width, height } = props;
  return (
    <Label style={{ width, lineHeight: height+'px', height }}>
      <TitleWrap title={desc ? desc:title}>
        <Span>{title}</Span>
      </TitleWrap>
      :
    </Label>
  );
};
