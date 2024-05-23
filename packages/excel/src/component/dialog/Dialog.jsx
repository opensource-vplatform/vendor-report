import {
  createRef,
  Fragment,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import styled from 'styled-components';

import { getNext } from '@utils/zIndexUtil';

function genUUID() {
    const S1 = Math.random().toString(36).slice(2);
    const S2 = Math.random().toString(36).slice(2);
    const S3 = Math.random().toString(36).slice(2);
    const S4 = Date.now().toString(36);
    return S1 + S2 + S3 + S4;
}

const Mask = styled.div`
    z-index: 2000;
    background-color: #aaaaaa;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const Wrap = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100px;
    min-height: 1px;
    transform: translateX(-50%) translateY(-50%);
    display: flex;
    flex-direction: column;
    border: 1px solid #aaaaaa;
    background-color: #f0f0f0;
    outline: none;
    font-weight: 400;
    box-sizing: border-box;
`;

const TitleWrap = styled.div`
    border: none;
    padding: 2px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    cursor: move;
    height: 30px;
    flex-flow: column;
    font-weight: 500;
`;

const Title = styled.span`
    pointer-events: none;
`;

const CloseButton = styled.button`
    position: absolute;
    right: 0;
    width: 35px;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: white;
    color: black;
    border: none;
    height: 100%;
    min-width: auto;
    &:hover {
        background-color: red;
    }
`;

const CloseIcon = styled.div`
    width: 16px;
    height: 16px;
    padding: 0px;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJjbG9zZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTkuMTQ1MTkwODUsOC4wMDAxNTM1NyBMMTIuNzYxOTkxNCw0LjM4MjE4MTEyIEMxMy4wNzkzMzYyLDQuMDY2MDAyMzUgMTMuMDc5MzM2MiwzLjU1MzMxNjc2IDEyLjc2MTk5MTQsMy4yMzcxMzQwOCBDMTIuNDQ2NDc5NiwyLjkyMDk1NTMxIDExLjkzNDQ2MTEsMi45MjA5NTUzMSAxMS42MTc3ODQyLDMuMjM3MTM0MDggTDguMDAwMzE5Niw2Ljg1NDkzMDc0IEw0LjM4MjE4MTEyLDMuMjM3MTM0MDggQzQuMDY2MDAyMzUsMi45MjA5NTUzMSAzLjU1MzMxNjc2LDIuOTIwOTU1MzEgMy4yMzcxMzQwOCwzLjIzNzEzNDA4IEMyLjkyMDk1NTMxLDMuNTUzMzEyODUgMi45MjA5NTUzMSw0LjA2NTk5ODQ0IDMuMjM3MTM0MDgsNC4zODIxODExMiBMNi44NTUxMDY1Myw4LjAwMDE1MzU3IEwzLjIzNzEzNDA4LDExLjYxODYyNDEgQzIuOTIwOTU1MzEsMTEuOTM0OTY4OSAyLjkyMDk1NTMxLDEyLjQ0NjY1NDQgMy4yMzcxMzQwOCwxMi43NjI5OTczIEMzLjU1MzMxMjg1LDEzLjA3OTM0MjEgNC4wNjU5OTg0NCwxMy4wNzkzNDIxIDQuMzgyMTgxMTIsMTIuNzYyOTk3MyBMOC4wMDAzMTk2LDkuMTQ1MjAwNjEgTDExLjYxNzc4NDIsMTIuNzYyOTk3MyBDMTEuOTM0NDYzLDEzLjA3OTM0MjEgMTIuNDQ2NjQ4NiwxMy4wNzkzNDIxIDEyLjc2MTk5MTQsMTIuNzYyOTk3MyBDMTMuMDc5MzM2MiwxMi40NDcxNTI1IDEzLjA3OTMzNjIsMTEuOTM0OTY2OSAxMi43NjE5OTE0LDExLjYxODYyNDEgTDkuMTQ1MTkwODUsOC4wMDAxNTM1NyBMOS4xNDUxOTA4NSw4LjAwMDE1MzU3IFoiIGlkPSLot6/lvoQiIGZpbGw9IiM2NjY2NjYiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=);
    &:hover {
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5jbG9zZS1ob3ZlcjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJjbG9zZS1ob3ZlciIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTEzLjExNTYwMiw0LjczNTY3NzIzIEMxMy42MjgzNjg1LDQuMjI0Nzk2MzEgMTMuNjI4MzY4NSwzLjM5NDUyNTIgMTMuMTE0ODk1NiwyLjg4MjkzMjcxIEMxMi42MDUxNjczLDIuMzcyMTIzODcgMTEuNzc2NDkzMSwyLjM3MjEyMzg3IDExLjI2NDUwOTIsMi44ODMzMDI1NCBMOC4wMDAyODY2OCw2LjE0NzgyNDQ1IEw0LjczNTcxNzgxLDIuODgzNTYzOTkgQzQuMjI0MjkzOTYsMi4zNzIxNDAxMyAzLjM5NTAyNzU2LDIuMzcyMTQwMTMgMi44ODM1ODI4NywyLjg4MzU3ODUgQzIuMzcyMTQwMTMsMy4zOTUwMjEyNCAyLjM3MjE0MDEzLDQuMjI0Mjg3NjQgMi44ODM1Nzg1LDQuNzM1NzMyMzIgTDYuMTQ4MDI0MDksOC4wMDAxNzc5MSBMMi44ODM1NTYzNSwxMS4yNjUwOTUgQzIuMzcyMTcwNTIsMTEuNzc2NzQ5NCAyLjM3MjE3MDUyLDEyLjYwNDg3NTEgMi44ODM0ODg5OSwxMy4xMTY0NTg5IEMzLjM5NDk0OTY2LDEzLjYyODE4ODIgNC4yMjQzNTkyMiwxMy42MjgxODgyIDQuNzM1ODI1MTEsMTMuMTE2NDYgTDguMDAwMjg2NjcsOS44NTIzMDY5MSBMMTEuMjY0MjE0NiwxMy4xMTY1MzQ0IEMxMS43NzY0NDA0LDEzLjYyODIyMDEgMTIuNjA1NDk2OSwxMy42MjgyMjAxIDEzLjExNjEwNTEsMTMuMTE1OTg5NCBDMTMuNjI4Mzg0OCwxMi42MDYxMzY4IDEzLjYyODM4NDgsMTEuNzc2MjkwNiAxMy4xMTQ5ODUzLDExLjI2NDUxMjEgTDkuODUyMTU4NzMsOC4wMDAxNzc5NiBMMTMuMTE1NjAyLDQuNzM1Njc3MjMgWiIgaWQ9Iui3r+W+hCIgZmlsbD0id2hpdGUiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=);
    }
`;

function Index(props) {
    const {
        title,
        width = 'auto',
        height = 'auto',
        mask = true,
        id = genUUID(),
        closable = true,
        anchor = false,
        style = {},
        onClose,
    } = props;
    const dialogEl = createRef(null);
    const [data] = useState(() => {
        return {
            maskZIndex: getNext(),
            dialogZIndex: getNext(),
        };
    });
    let mouseX,
        mouseY = 0;
    const mouseMoveHandler = (evt) => {
        if (dialogEl.current) {
            const targetX = evt.pageX - mouseX;
            const targetY = evt.pageY - mouseY;
            // 给元素重新赋值 上左定位的位置
            const elStyle = dialogEl.current.style;
            elStyle.left = targetX + 'px';
            elStyle.top = targetY + 'px';
            elStyle.transform = 'unset';
        }
    };
    useEffect(() => {
        if (anchor) {
            const wrapEl = dialogEl.current;
            if (wrapEl) {
                const { left, top } = wrapEl.getBoundingClientRect();
                wrapEl.style.top = `${top}px`;
                wrapEl.style.left = `${left}px`;
                wrapEl.style.transform = 'none';
            }
        }
    }, []);
    return (
        <Fragment>
            {mask ? <Mask style={{ zIndex: data.maskZIndex }}></Mask> : null}
            <Wrap
                style={{ zIndex: data.dialogZIndex, width, height, ...style }}
                id={id}
                data-title={title}
                ref={dialogEl}
            >
                <TitleWrap
                    onMouseDown={(evt) => {
                        if (evt.currentTarget === evt.target) {
                            mouseX = evt.nativeEvent.offsetX;
                            mouseY = evt.nativeEvent.offsetY;
                            document.addEventListener(
                                'mousemove',
                                mouseMoveHandler
                            );
                            evt.nativeEvent.preventDefault();
                            return false;
                        }
                    }}
                    onMouseUp={(evt) => {
                        if (evt.currentTarget === evt.target) {
                            document.removeEventListener(
                                'mousemove',
                                mouseMoveHandler
                            );
                            evt.nativeEvent.preventDefault();
                            return false;
                        }
                    }}
                >
                    <Title>{title}</Title>
                    <CloseButton
                        onClick={() => {
                            if (onClose) {
                                onClose();
                            }
                        }}
                    >
                        <CloseIcon></CloseIcon>
                    </CloseButton>
                </TitleWrap>
                {props.children}
            </Wrap>
        </Fragment>
    );
}

export default function (props) {
    return createPortal(<Index {...props}></Index>, document.body);
}
