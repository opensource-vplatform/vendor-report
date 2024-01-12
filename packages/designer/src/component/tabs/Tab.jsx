import styled from 'styled-components';

import Context from './Context';

const Wrap = styled.div`
    border: none;
    padding: 0px;
    display: none;
    &[data-active='true'] {
        display: block;
    }
`;

function Tab(props) {
    const { code, children, style = {} } = props;
    return (
        <Context.Consumer>
            {(active) => {
                return active == code ? (
                    <Wrap data-active={active == code} style={style}>
                        {children}
                    </Wrap>
                ) : null;
            }}
        </Context.Consumer>
    );
}

Tab.defaultProps = {
    visible: true,
};

export default Tab;
