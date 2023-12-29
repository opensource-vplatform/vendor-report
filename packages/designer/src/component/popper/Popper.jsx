import {
  Fragment,
  useState,
} from 'react';

import styled from 'styled-components';

const Mask = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 2000;
`;

const Wrap = styled.div`
    position: relative;
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
    z-index: 2001;
    width: max-content;
`;

export default function (props) {
    const { style = {},children,content = null,contentStyle={} } = props;
    const [contentVisible, setContentVisible] = useState(false);
    return (
        <Fragment>
            {contentVisible ? (
                <Mask
                    onClick={() => {
                        setContentVisible(false);
                    }}
                ></Mask>
            ) : null}
            <Wrap
                onClick={(evt) => {
                    if (!evt.target.closest('.popper-content-wrap')) {
                        setContentVisible(true);
                    }else{
                        setContentVisible(false);
                    }
                }}
                style={style}
            >
                {children}
                {contentVisible ? (
                    <PopperContentWrap className='popper-content-wrap' style={contentStyle}>
                        {content}
                    </PopperContentWrap>
                ) : null}
            </Wrap>
        </Fragment>
    );
}
