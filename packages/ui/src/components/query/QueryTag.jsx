import styled from 'styled-components';

import ClearIcon from '../../icons/Clear';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2px 5px;
  border: 1px solid #dcdee2;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.5s ease-out 0s;
  height: 28px;
  line-height: 28px;
  box-sizing: border-box;
  &:hover {
    border-color: #356abb;
  }
`;

const ContentWrap = styled.div`
  padding: 0px 10px;
`;

const Content = styled.span`
    color: #356abb;
    display: inline-block;
    margin-left: 10px;
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 6px;
  background: none;
  height: 100%;
  transition: all 0.2s ease-out 0s;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #356abb;
    color: #fff;
  }
`;

/**
 * 已选条件标签
 * @param {*} props
 */
export default function (props) {
  const { label, text, closable = true, onClose } = props;
  return (
    <Wrap>
      <ContentWrap>
        {label}:<Content>{text}</Content>
      </ContentWrap>
      {closable ? (
        <IconWrap>
          <ClearIcon onClick={onClose} hoverable={false} iconStyle={{margin:0}}></ClearIcon>
        </IconWrap>
      ) : null}
    </Wrap>
  );
}
