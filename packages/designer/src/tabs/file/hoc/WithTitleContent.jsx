import styled from 'styled-components';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const Title = styled.div`
    margin: 50px 0px 15px 50px;
    font-size: 36px;
    line-height: 80px;
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    padding-left: 50px;
`;

function Index(title, Component) {
    return function (props) {
        const { ...others } = props;
        return (
            <Wrap>
                <Title>{title}</Title>
                <Content>
                    <Component {...others}></Component>
                </Content>
            </Wrap>
        );
    };
}

export default Index;
