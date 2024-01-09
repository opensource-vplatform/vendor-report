import styled from 'styled-components';

import Button from '@components/button/Index';

import Dialog from './Dialog';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
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
        cancelTitle = '取消',
        confirmTitle = '确定',
        children,
        ...others
    } = props;
    return (
        <Dialog {...others}>
            <Wrap>
                <Content>
                    {children}
                    <ButtonWrap>
                        <DialogButton onClick={onCancel}>
                            {cancelTitle}
                        </DialogButton>
                        <DialogButton
                            style={{ marginRight: 8 }}
                            onClick={onConfirm}
                        >
                            {confirmTitle}
                        </DialogButton>
                    </ButtonWrap>
                </Content>
            </Wrap>
        </Dialog>
    );
}
