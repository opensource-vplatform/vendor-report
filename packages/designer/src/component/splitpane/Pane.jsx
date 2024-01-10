import styled from 'styled-components';

const Wrap = styled.div`
    height: 100%;
    width: max-content;
    overflow:hidden;
`;

export default function(props){
    const {style={},children} = props;
    return <Wrap style={style} data-type='splitpane-pane'>{children}</Wrap>
}