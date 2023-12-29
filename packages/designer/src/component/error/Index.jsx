import styled from 'styled-components';

import ErrorIcon from '@icons/common/Error';

import Button from '../button/Index';
import Dialog from '../dialog/Index';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
    min-width: 330px;
`;

const ContentWrap = styled.div`
    display: flex;
    height: 50px;
    margin: 10px;
    align-items: center;
`;

const Content = styled.div`
    margin-left: 10px;
`;

const ActionWrap = styled.div`
    display: flex;
    flex-direction: row-reverse;
    height: 48px;
    align-items: center;
`;

function Index(props) {
    const { title = '错误', message = null, open = true, onClose } = props;
    return open && message !== null ? (
        <Dialog title={title} onClose={onClose}>
            <Wrap>
                <ContentWrap>
                    <ErrorIcon
                        style={{
                            cursor: 'default',
                            backgroundColor: 'transparent' 
                        }}
                        iconStyle={{ width: 32, height: 32, marginLeft: 20 }}
                    ></ErrorIcon>
                    <Content>{message}</Content>
                </ContentWrap>
                <ActionWrap>
                    <Button
                        title='确定'
                        style={{ height: 32, marginRight: 8 }}
                        onClick={() => {
                            onClose && onClose();
                        }}
                    >
                        确定
                    </Button>
                </ActionWrap>
            </Wrap>
        </Dialog>
    ) : null;
}

export default Index;
