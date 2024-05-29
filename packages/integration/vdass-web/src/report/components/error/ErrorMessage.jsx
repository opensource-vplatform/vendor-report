import { useState } from 'react';

import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    ::-webkit-scrollbar-track {
        border: 2px solid #fff;
        background-color: #f3f3f3;
    }

    ::-webkit-scrollbar-thumb {
        border: 2px solid #fff;
        background-color: #d5d7da !important;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #b3b6bb !important;
    }

    ::-webkit-scrollbar-thumb:active {
        background-color: #b3b6bb !important;
    }
`;

const Message = styled.div`
    max-width: 420px;
    text-indent: 2em;
    line-height: 1.5;
`;

const Detail = styled.div`
    position: relative;
    margin-top: 8px;
    max-width: 420px;
    max-height: 180px;
    overflow-y: auto;
    border: 1px solid lightgray;
    padding: 8px;
    box-shadow: 1px 1px 5px 1px rgba(211, 211, 211, 0.5);
`;

const Wrap = styled.span`
    width: max-content;
    color: blue;
    cursor: pointer;
    height: 21px;
    margin-left: 8px;
`;

const Pre = styled.pre`
    margin: 0px;
    text-indent: 0;
`;

const Expand = function (props) {
    const { onClick } = props;
    return (
        <Wrap onClick={onClick}>
            展开详情
            <svg
                style={{ width: 21, height: 21, marginBottom: -5 }}
                viewBox='0 0 24 24'
            >
                <path
                    fill='blue'
                    d='M18 6.41 16.59 5 12 9.58 7.41 5 6 6.41l6 6z'
                ></path>
                <path
                    fill='blue'
                    d='m18 13-1.41-1.41L12 16.17l-4.59-4.58L6 13l6 6z'
                ></path>
            </svg>
        </Wrap>
    );
};

const Collapse = function (props) {
    const { onClick, detail } = props;
    return (
        <>
            <Wrap onClick={onClick}>
                收起详情
                <svg
                    style={{ width: 21, height: 21, marginBottom: -5 }}
                    viewBox='0 0 24 24'
                >
                    <path
                        fill='blue'
                        d='M6 17.59 7.41 19 12 14.42 16.59 19 18 17.59l-6-6z'
                    ></path>
                    <path
                        fill='blue'
                        d='m6 11 1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z'
                    ></path>
                </svg>
            </Wrap>
            <Detail>
                <Pre>{detail}</Pre>
            </Detail>
        </>
    );
};

export default function (props) {
    const { message, detail, indent = true } = props;
    const [expand, setExpand] = useState(false);
    return (
        <>
            <GlobalStyle></GlobalStyle>
            <Message style={{ textIndent: indent ? '2em' : '0em' }}>
                {message}
                {detail ? (
                    expand ? (
                        <Collapse
                            onClick={() => setExpand(false)}
                            detail={detail}
                        ></Collapse>
                    ) : (
                        <Expand onClick={() => setExpand(true)}></Expand>
                    )
                ) : null}
            </Message>
        </>
    );
}
