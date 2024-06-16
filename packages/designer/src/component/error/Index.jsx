import { useState } from 'react';

import styled from 'styled-components';

import ErrorIcon from '@icons/common/Error';
import {
  Button,
  Dialog,
} from '@toone/report-ui';
import { copyToClipboard } from '@utils/commonUtil';

import ErrorMessage from './ErrorMessage';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
    min-width: 330px;
`;

const ContentWrap = styled.div`
    display: flex;
    min-height: 50px;
    margin: 10px;
    align-items: center;
`;

const Content = styled.div`
    margin-left: 10px;
    max-width: 500px;
    overflow: visible;
    word-break: break-all;
`;

const ActionWrap = styled.div`
    display: flex;
    flex-direction: row-reverse;
    height: 48px;
    align-items: center;
`;

function Index(props) {
    const {
        title = '错误',
        message = null,
        detail,
        open = true,
        onClose,
    } = props;
    const [copied, markCopied] = useState(false);
    return open && message !== null ? (
        <Dialog title={title} onClose={onClose}>
            <Wrap>
                <ContentWrap>
                    <ErrorIcon
                        style={{
                            cursor: 'default',
                            backgroundColor: 'transparent',
                        }}
                        iconStyle={{ width: 32, height: 32, marginLeft: 20 }}
                    ></ErrorIcon>
                    <Content>
                        <ErrorMessage
                            message={message}
                            detail={detail}
                        ></ErrorMessage>
                    </Content>
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
                    <Button
                        type='text'
                        style={{ height: 32, marginRight: 8 }}
                        disabled={copied}
                        onClick={() => {
                            copyToClipboard(
                                detail
                                    ? `异常消息：${message}\n异常详细：${detail}`
                                    : message
                            );
                            markCopied(true);
                        }}
                    >
                        {copied ? '已复制' : '复制内容'}
                    </Button>
                </ActionWrap>
            </Wrap>
        </Dialog>
    ) : null;
}

export default Index;
