import styled from 'styled-components';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    &~div[data-type='VGroupItem']{
        border-left: solid 1px lightgray;
    }
`;

export default function(props){
    const {children,...others} = props;
    return <Wrap style={others} data-type="VGroupItem">{children}</Wrap>
}
