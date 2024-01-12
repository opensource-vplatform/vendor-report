import {
  createRef,
  useEffect,
  useState,
} from 'react';

import styled from 'styled-components';

import DotVertIcon from '@icons/shape/DotVert';

import Context from './Context';

const Wrap = styled.div`
    display: flex;
    align-items: center;
    cursor: e-resize;
    background-color: #f6f6f6;
    border-right: 1px solid #ababab;
    overflow: hidden;
    &:hover {
        color: #0075ff;
    }
`;

export default function (props) {
    const { width } = props;
    const [data, setData] = useState({
        originalWidth: 0,
        collapsed: false,
        timeoutIndexs: [],
        duration: 200,
        onResize: () => {},
    });
    let mouseX = 0;
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
        const targetX = evt.pageX - mouseX;
        mouseX = evt.pageX;
        handleResizeByDelta(targetX);
    };
    const handleResizeByDelta = (delta)=>{
        if (ref.current) {
            const preEle = ref.current.previousElementSibling;
            const {width} = preEle.getBoundingClientRect();
            handleResize(width+delta);
        }
    }
    const handleResize = (newWidth) => {
        if (ref.current) {
            const preEle = ref.current.previousElementSibling;
            preEle.style.width = `${newWidth}px`;
        }
    };
    const handleIconClick = () => {
        if (data.collapsed) {
            setData({ ...data, collapsed: false });
            handleResize(data.originalWidth);
            data.onResize();
        } else {
            setData({ ...data, collapsed: true });
            handleResize(0);
            data.onResize();
        }
    };
    useEffect(() => {
        if (ref.current) {
            const preEle = ref.current.previousElementSibling;
            const { width } = preEle.getBoundingClientRect();
            data.originalWidth = width;
        }
    }, []);
    return (
        <Context.Consumer>
            {(ctx) => {
                data.onResize = ctx.onResize;
                data.duration = ctx.duration;
                return (
                    <Wrap
                        style={{ width }}
                        ref={ref}
                        onMouseDown={(evt) => {
                            if (evt.currentTarget === evt.target) {
                                mouseX = evt.nativeEvent.pageX;
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
                        <DotVertIcon
                            tips={data.collapsed ? '向右展开' : '向左折叠'}
                            style={{
                                marginLeft: -8,
                                backgroundColor: '#dadada',
                            }}
                            onClick={handleIconClick}
                        ></DotVertIcon>
                    </Wrap>
                );
            }}
        </Context.Consumer>
    );
}
