import {
  Fragment,
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
    z-index: ${(props) => props.zIndex};
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
        disabled = false,
    } = props;
    const ref = useRef(null);
    const [data, setData] = useState({
        left: 0,
        top: 0,
        width: 0,
        contentVisible: false,
    });
    return (
        <Fragment>
            {data.contentVisible
                ? createPortal(
                      <Mask
                          zIndex={getNext()}
                          onClick={() => {
                              setData({
                                  ...data,
                                  contentVisible: false,
                              });
                          }}
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
                    } else {
                        setData({
                            ...data,
                            contentVisible: false,
                        });
                    }
                }}
                style={style}
            >
                {children}
                {data.contentVisible
                    ? createPortal(
                          <PopperContentWrap
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
