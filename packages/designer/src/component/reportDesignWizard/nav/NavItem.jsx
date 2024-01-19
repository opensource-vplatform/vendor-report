import styled from 'styled-components';

const Wrap = styled.div`
    height: 190px;
    width: 260px;
    margin: 10px;
    transition: box-shadow 0.3s ease-out;
    cursor: pointer;
    box-sizing: border-box;
    user-select: none;
`;

const Container = styled.div`
    height: 140px;
    background: #f5f5f5;
    padding: 5px;
    box-sizing: border-box;
    user-select: none;
`;

const Label = styled.div`
    background-color: #f5f5f5;
    color: #424242;
    height: 50px;
    line-height: 50px;
    text-align: center;
    box-sizing: border-box;
    user-select: none;
`;
export default function Index(props) {
    const { onChange, Icon, type, text } = props;
    const clickHandler = function () {
        if (typeof onChange === 'function') {
            //onChange('statementDetail');
            onChange(type);
        }
    };
    return (
        <Wrap onClick={clickHandler}>
            <Container>
                <Icon></Icon>
            </Container>
            <Label> {text} </Label>
        </Wrap>
    );
}
