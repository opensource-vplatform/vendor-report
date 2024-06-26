import styled from 'styled-components';

const Component = styled.div`
    width: 1px;
    border: none;
    border-left: 1px solid lightgray;
    height: 17px;
    display: inline-block;
    vertical-align: middle;
    &[data-type='horizontal'] {
        height: 1px;
        width: 100%;
        border-top: 1px solid lightgray;
        margin: 0px 0px 0px 12px;
    }
`;

export default function (props) {
    const { type = 'vertical', style = {} } = props;
    return <Component data-type={type} style={{ ...style }}></Component>;
}
