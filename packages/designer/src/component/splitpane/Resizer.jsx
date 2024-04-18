import {
  createRef,
  useEffect,
  useState,
} from 'react';

import styled from 'styled-components';

import DotHorizIcon from '@icons/shape/DotHoriz';
import DotVertIcon from '@icons/shape/DotVert';

import Context from './Context';

const Wrap = styled.div`
    display: flex;
    background-color: #f6f6f6;
    border-right: 1px solid #ababab;
    overflow: hidden;
    flex-shrink: 0;
    &:hover {
        color: #0075ff;
    }
    &[data-collapsable='false'] {
        color: inherit;
    }
    &[data-type='h'] {
        cursor: e-resize;
        align-items: center;
    }
    &[data-type='v'] {
        cursor: n-resize;
        justify-content: center;
    }
`;

export default function (props) {
    const {
        size,
        direction = 'h',
        collapsable = true,
        style = {},
        minSize = null,
    } = props;
    const isH = direction == 'h';
    const [data, setData] = useState({
        originalWidth: 0,
        originalHeight: 0,
        collapsed: false,
        timeoutIndexs: [],
        duration: 200,
        onResize: () => {},
    });
    let mouseX = 0,
        mouseY = 0,
        targetWidth = 0,
        targetHeight = 0;
    const ref = createRef(null);
    const mouseMoveHandler = (evt) => {
        const indesx = data.timeoutIndexs;
        indesx.forEach((index) => {
            clearTimeout(index);
        });
        data.timeoutIndexs.length = 0;
        const index = setTimeout(() => {
            data.onResize();
        }, data.duration);
        data.timeoutIndexs.push(index);
        const delta = isH ? evt.screenX - mouseX : evt.screenY - mouseY;
        let value = isH ? targetWidth + delta : targetHeight + delta;
        if (minSize != null) {
            value = value < minSize ? minSize : value;
        }
        handleResize(value);
    };
    const handleResize = (val) => {
        if (ref.current) {
            const preEle = ref.current.previousElementSibling;
            if (isH) {
                preEle.style.width = `${val}px`;
            } else {
                preEle.style.height = `${val}px`;
            }
        }
    };
    const hideOrShowPreviousElement = (isShow) => {
        if (ref.current) {
            const preEle = ref.current.previousElementSibling;
            preEle.style.display = isShow ? 'block' : 'none';
        }
    };
    const handleIconClick = () => {
        if (collapsable) {
            if (data.collapsed) {
                setData({ ...data, collapsed: false });
                if (minSize != null) {
                    handleResize(
                        isH ? data.originalWidth : data.originalHeight
                    );
                } else {
                    hideOrShowPreviousElement(true);
                }
                //handleResize(isH ? data.originalWidth : data.originalHeight);
                data.onResize();
            } else {
                setData({ ...data, collapsed: true });
                if (minSize != null) {
                    handleResize(minSize);
                } else {
                    hideOrShowPreviousElement(false);
                }
                data.onResize();
            }
        }
    };
    useEffect(() => {
        if (ref.current) {
            const preEle = ref.current.previousElementSibling;
            const { width, height } = preEle.getBoundingClientRect();
            data.originalWidth = width;
            data.originalHeight = height;
            //前一个dom元素不允许压缩，否则会导致不跟手问题
            preEle.style.flexShrink = 0;
            targetWidth = width;
            targetHeight = height;
        }
    }, []);
    const handleMouseDown = (evt) => {
        if (evt.currentTarget === evt.target) {
            mouseX = evt.nativeEvent.screenX;
            mouseY = evt.nativeEvent.screenY;
            if (ref.current) {
                const preEle = ref.current.previousElementSibling;
                const rect = preEle.getBoundingClientRect();
                targetWidth = rect.width;
                targetHeight = rect.height;
            }
            document.addEventListener('mousemove', mouseMoveHandler);
            const handler = ()=>{
                document.removeEventListener('mousemove', mouseMoveHandler)
                document.removeEventListener('mouseup',handler);
            };
            document.addEventListener('mouseup',handler);
            evt.nativeEvent.preventDefault();
            return false;
        }
    };
    return (
        <Context.Consumer>
            {(ctx) => {
                data.onResize = ctx.onResize;
                data.duration = ctx.duration;
                return (
                    <Wrap
                        style={{
                            width: isH ? size : 'unset',
                            height: !isH ? size : 'unset',
                            overflow: 'hidden',
                            ...style,
                        }}
                        data-type={direction}
                        ref={ref}
                        data-collapsable={collapsable}
                        onMouseDown={handleMouseDown}
                    >
                        {isH ? (
                            <DotVertIcon
                                tips={
                                    collapsable
                                        ? data.collapsed
                                            ? '向右展开'
                                            : '向左折叠'
                                        : ''
                                }
                                style={{
                                    marginLeft: collapsable ? -8 : 0,
                                    backgroundColor: collapsable
                                        ? '#dadada'
                                        : 'unset',
                                    cursor: collapsable
                                        ? 'pointer'
                                        : 'e-resize',
                                    pointerEvents: collapsable ? 'unset' : 'none',
                                }}
                                hoverable={false}
                                onClick={handleIconClick}
                            ></DotVertIcon>
                        ) : (
                            <DotHorizIcon
                                tips={
                                    collapsable
                                        ? data.collapsed
                                            ? '向下展开'
                                            : '向上折叠'
                                        : ''
                                }
                                hoverable={false}
                                style={{
                                    backgroundColor: collapsable
                                        ? '#dadada'
                                        : 'unset',
                                    cursor: collapsable
                                        ? 'pointer'
                                        : 'n-resize',
                                    pointerEvents: collapsable ? 'unset' : 'none',
                                }}
                                onClick={handleIconClick}
                            ></DotHorizIcon>
                        )}
                    </Wrap>
                );
            }}
        </Context.Consumer>
    );
}
