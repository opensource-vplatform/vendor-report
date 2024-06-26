import styled from 'styled-components';

import { Button } from '../form/Index';
import Dialog from './Dialog';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  height: calc(100% - 30px);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ButtonWrap = styled.div`
  width: 100%;
  padding: 8px 0px 0px 0px;
  margin: 0px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row-reverse;
`;

export const DialogButton = function (props) {
  const { style = {}, children, ...others } = props;
  const btnStyle = { width: 80, height: 32 };
  return (
    <Button style={{ ...btnStyle, ...style }} {...others}>
      {children}
    </Button>
  );
};

export default function (props) {
  const {
    onConfirm,
    onCancel,
    hideOperations = false,
    showConfirmButton = true,
    showCancelButton = true,
    cancelTitle = '取消',
    confirmTitle = '确定',
    children,
    tools = null,
    beforeTools = null,
    ...others
  } = props;
  return (
    <Dialog {...others} onClose={onCancel}>
      <Wrap>
        <Content>
          {children}
          {hideOperations ? null : (
            <ButtonWrap>
              {tools}
              {showCancelButton ? (
                <DialogButton
                  onClick={onCancel}
                  style={{
                    marginRight: tools ? 8 : 0,
                  }}
                >
                  {cancelTitle}
                </DialogButton>
              ) : null}
              {showConfirmButton ? (
                <DialogButton style={{ marginRight: 8 }} onClick={onConfirm}>
                  {confirmTitle}
                </DialogButton>
              ) : null}
              {beforeTools}
            </ButtonWrap>
          )}
        </Content>
      </Wrap>
    </Dialog>
  );
}
