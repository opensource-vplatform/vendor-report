import styled from 'styled-components';

import Context from './Context';

const Wrap = styled.div`
    display: flex;
`;

export default function (props) {
    const { style = {}, children,duration=200, onResize = () => {} } = props;
    return (
        <Context.Provider value={{onResize,duration}}>
            <Wrap style={style}>{children}</Wrap>
        </Context.Provider>
    );
}
