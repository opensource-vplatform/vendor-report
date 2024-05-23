import { useRef } from 'react';

import styled from 'styled-components';

import Context from './Context';

const Wrap = styled.div`
    border: none;
    padding: 0px;
    display: none;
    &[data-active='true'] {
        display: flex !important;
    }
    &[data-appearance='toolbar'] {
        position: absolute;
        width: 100%;
        background-color: #fff;
        z-index: 5;
        display: none;
    }
`;

function Tab(props) {
    const { code, children, style = {},onVisible } = props;
    const ref = useRef(null);
    /*useEffect(()=>{
        if(ref.current){
            onVisible&&onVisible();
        }
    },[ref.current]);*/
    return (
        <Context.Consumer>
            {({ active, appearance }) => {
                if (appearance == 'normal') {
                    const isActive = active == code;
                    if(isActive){
                        onVisible&&onVisible();
                    }
                    return isActive ? (
                        <Wrap
                            data-active={active == code}
                            data-appearance={appearance}
                            style={style}
                            ref={ref}
                        >
                            {children}
                        </Wrap>
                    ) : null;
                } else {
                    return (
                        <Wrap
                            data-active={active == code}
                            data-appearance={appearance}
                            style={style}
                            ref={ref}
                        >
                            {children}
                        </Wrap>
                    );
                }
            }}
        </Context.Consumer>
    );
}

Tab.defaultProps = {
    visible: true,
};

export default Tab;
