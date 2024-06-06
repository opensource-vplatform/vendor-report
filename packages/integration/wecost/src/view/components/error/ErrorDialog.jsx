import { useState } from 'react';

import styled from 'styled-components';

import Button from '../button/Index';
import Dialog from '../dialog/Index';
import ErrorMessage from './ErrorMessage';

const IconWrap = styled.label`
    margin: 0px 2px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    &[data-hoverable='true']:hover {
        background-color: #dadada;
    }
    &[data-disabled='true'] {
        cursor: not-allowed;
        opacity: 0.5;
    }
    &[data-disabled='true']:hover {
        background-color: transparent;
    }
    &[data-type='toone-md'] {
        min-height: 24px;
        min-width: 24px;
    }
`;

const Icon = styled.div`
    height: 8px;
    width: 8px;
    padding: 4px;
    margin: 4px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    &[data-type='toone'] {
        padding: 0px;
        margin: 0px;
        height: 24px;
        width: 24px;
    }
    &[data-type='toone-md'] {
        padding: 0px;
        margin: 0px;
        height: 18px;
        width: 18px;
    }
`;

const BaseIcon = function (pros) {
    const {
        icon,
        tips,
        active = false,
        hoverable = true,
        onClick,
        disabled = false,
        style = {},
        iconStyle = {},
        type,
        children,
        ...others
    } = pros;
    const st = { ...style };
    if (active) {
        st.backgroundColor = '#dadada';
    }
    const icSt = { ...iconStyle };
    icSt.backgroundImage = icon;
    const handleClick = (...args) => {
        !disabled && onClick && onClick(...args);
    };
    return (
        <IconWrap
            {...others}
            title={tips}
            onClick={handleClick}
            style={st}
            data-type={type}
            data-disabled={disabled}
            data-hoverable={hoverable}
        >
            <Icon style={icSt} data-type={type}></Icon>
            {children}
        </IconWrap>
    );
};

const ErrorIcon = function (props) {
    return (
        <BaseIcon
            {...props}
            icon='url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5NZXNzYWdlQm94LUVycm9yPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9Ik1lc3NhZ2VCb3gtRXJyb3IiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnPgogICAgICAgICAgICA8Y2lyY2xlIGlkPSLmpK3lnIblvaLlpIfku70iIGZpbGw9IiNFNjUyNDkiIGN4PSIxNiIgY3k9IjE2IiByPSIxNiI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSLot6/lvoQiIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMTYgMTMuODQ2MTUzOCAyMC44NDYxNTM4IDkgMjMgMTEuMTUzODQ2MiAxOC4xNTM4NDYyIDE2IDIzIDIwLjg0NjE1MzggMjAuODQ2MTUzOCAyMyAxNiAxOC4xNTM4NDYyIDExLjE1Mzg0NjIgMjMgOSAyMC44NDYxNTM4IDEzLjg0NjE1MzggMTYgOSAxMS4xNTM4NDYyIDExLjE1Mzg0NjIgOSI+PC9wb2x5Z29uPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+)'
        ></BaseIcon>
    );
};

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
    min-width: 330px;
`;

const ContentWrap = styled.div`
    display: flex;
    height: max-content;
    margin: 10px;
    align-items: center;
`;

const Content = styled.div`
    margin-left: 10px;
    max-width: 500px;
    height: max-content;
    word-wrap: break-word;
`;

const ActionWrap = styled.div`
    display: flex;
    flex-direction: row-reverse;
    height: 48px;
    align-items: center;
`;

const copyToClipboard = function (text) {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
};

export default function (props) {
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
                            indent={false}
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
