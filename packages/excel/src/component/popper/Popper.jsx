import {
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import styled from 'styled-components';

import { genUUID } from '../../utils/commonUtil';
import { isBoolean } from '../../utils/objectUtil';
import { getNext } from '../../utils/zIndexUtil';

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
        //点击遮罩层才关闭
        maskClose = false,
        disabled = false,
        open,
    } = props;
    const ref = useRef(null);
    const contentRef = useRef(null);
    const [data, setData] = useState({
        left: 0,
        top: 0,
        width: 0,
        contentVisible: false,
        contentWrapClassName: 'popper-content-wrap-' + genUUID(),
    });
    useEffect(() => {
        if (isBoolean(open)) {
            setData({
                ...data,
                contentVisible: open,
            });
        }
    }, [open]);
    const handleVisibleChange = (visible) => {
        onVisibleChange && onVisibleChange(visible);
    };
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
            if (rect.left + rect.width > document.body.clientWidth) {
                //超出浏览器宽度，尝试向左偏移
                const hostRect = ref.current.getBoundingClientRect();
                if (hostRect.left - rect.width >= 0) {
                    //左边有位置，展示在左方
                    contentRef.current.style.left = `${
                        hostRect.left - rect.width
                    }px`;
                } else {
                    //左边位置不够,直接顶着最左边展示
                    contentRef.current.style.left = '0px';
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
                    if (disabled || (data.contentVisible && maskClose)) return;
                    if (!evt.target.closest('.' + data.contentWrapClassName)) {
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
                              className={data.contentWrapClassName}
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
