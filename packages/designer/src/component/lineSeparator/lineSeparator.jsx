import styled from 'styled-components';

const Component = styled.div`
    width: 1px;
    border: none;
    border-left: 1px solid lightgray;
    height: 17px;
    display: inline-block;
    vertical-align: middle;
    &[data-type='horizontal']{
        height: 1px;
        width: 100%;
        border-top: 1px solid lightgray;
        margin: 0px 0px 0px 12px;
    }
`;

function LineSepatator(props) {
    const { type='vertical' } = props 
    return (
        <Component data-type={type}></Component>
    )
}
export default LineSepatator