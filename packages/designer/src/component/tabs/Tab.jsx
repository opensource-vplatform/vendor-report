import { useContext } from 'react';

import styled from 'styled-components';

import { ThemeContext } from '@toone/report-excel';

import Context from './Context';

const Wrap = styled.div`
    border: none;
    display: none;
    &[data-active='true'] {
        display: block !important;
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
    const { code, children, style = {} } = props;

    const themeContext = useContext(ThemeContext);
    if (
        themeContext.functionalZone &&
        typeof themeContext.functionalZone === 'object'
    ) {
        style.padding = themeContext.functionalZone.padding;
        style.backgroundColor = themeContext.functionalZone.backgroundColor;
    }

    return (
        <Context.Consumer>
            {({ active, appearance }) => {
                if (appearance == 'normal') {
                    return active == code ? (
                        <Wrap
                            data-active={active == code}
                            data-appearance={appearance}
                            style={style}
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
