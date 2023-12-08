import styled from 'styled-components';

const Button = styled.button`
    background-color: #fdfdfd;
    border: solid 1px #d5d5d5;
    border-radius: 4px;
    cursor: pointer;
    min-width: 80px;
    &:hover{
        background-color: #e0eef9;
        border: solid 1px #1f88d8;
    }
`;

function Index(props){
    const {title,onClick,style={},children} = props;
    return <Button title={title} style={style} onClick={onClick}>{children}</Button>
}

export default Index;