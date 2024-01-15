import styled from 'styled-components';

const Button = styled.button`
    background-color: #fdfdfd;
    border: solid 1px #d5d5d5;
    border-radius: 4px;
    cursor: pointer;
    min-width: 80px;
    user-select: none;
    &:hover{
        background-color: #e0eef9;
        border: solid 1px #5292f7;
    }
    &[data-type='primary']{
        background-color: #2d8cf0;
        border-color: ##2d8cf0;
        color: #fff;
    }
    &[data-type='primary']:hover{
        background-color: #57a3f3;
        border-color: ##57a3f3;
    }
`;

function Index(props){
    const {title,onClick,style={},type='default',children} = props;
    return <Button data-type={type} title={title} style={style} onClick={onClick}>{children}</Button>
}

export default Index;