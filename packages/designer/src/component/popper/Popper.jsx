import {
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import styled from 'styled-components';

import { getNext } from '@utils/zIndexUtil';

const Mask = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
`;

const Wrap = styled.div`
    align-items: center;
    cursor: pointer;
    font-size: 12px;
`;

const PopperContentWrap = styled.div`
    position: absolute;
    background: white;
    top: 26px;
    padding: 0;
    margin: 0;
    border: 1px solid lightgray;
    min-width: 40px;
    max-height: 350px;
    overflow-y: auto;
    overflow-x: hidden;
    width: max-content;
`;

export default function (props) {
    const {
        style = {},
        children,
        content = null,
        contentStyle = {},
        onVisibleChange,
        disabled = false,
    } = props;
    const ref = useRef(null);
    const contentRef = useRef(null);
    const [data, setData] = useState({
        left: 0,
        top: 0,
        width: 0,
        contentVisible: false,
    });
    const handleVisibleChange = (visible)=>{
        onVisibleChange && onVisibleChange(visible);
    }
    useEffect(() => {
        if (data.contentVisible && contentRef.current && ref.current) {
            //内容展示时须判断是否有足够位置
            const rect = contentRef.current.getBoundingClientRect();
            if (rect.top + rect.height > document.body.clientHeight) {
                //超出浏览器高度，尝试展示在上方
                const hostRect = ref.current.getBoundingClientRect();
                if (hostRect.top - rect.height >= 0) {
                    //上方有位置，展示在上方
                    contentRef.current.style.top = `${
                        hostRect.top - rect.height
                    }px`;
                } else {
                    //上方位置不够,直接顶着最上边展示
                    contentRef.current.style.top = '0px';
                }
            }
        }
    }, [data.contentVisible]);
    return (
        <Fragment>
            {data.contentVisible
                ? createPortal(
                      <Mask
                          onClick={() => {
                              setData({
                                  ...data,
                                  contentVisible: false,
                              });
                              handleVisibleChange(false);
                          }}
                          style={{ zIndex: getNext() }}
                      ></Mask>,
                      document.body
                  )
                : null}
            <Wrap
                ref={ref}
                onClick={(evt) => {
                    if (disabled) return;
                    if (!evt.target.closest('.popper-content-wrap')) {
                        let el = ref.current;
                        el =
                            el.childNodes && el.childNodes.length == 1
                                ? el.childNodes[0]
                                : el;
                        const { left, top, height, width } =
                            el.getBoundingClientRect();
                        setData({
                            ...data,
                            left,
                            width,
                            top: top + height,
                            contentVisible: true,
                        });
                        handleVisibleChange(true);
                    } else {
                        setData({
                            ...data,
                            contentVisible: false,
                        });
                        handleVisibleChange(false);
                    }
                }}
                style={style}
            >
                {children}
                {data.contentVisible
                    ? createPortal(
                          <PopperContentWrap
                              ref={contentRef}
                              className='popper-content-wrap'
                              style={{
                                  left: data.left,
                                  top: data.top,
                                  minWidth: data.width,
                                  zIndex: getNext(),
                                  ...contentStyle,
                              }}
                          >
                              {content}
                          </PopperContentWrap>,
                          document.body
                      )
                    : null}
            </Wrap>
        </Fragment>
    );
}
