import styled from 'styled-components';

export const WithColorIcon = function (Icon) {
    return function (props) {
        const {iconStyle={},...others} = props;
        const style = { width: 64, height: 48 };
        return <Icon {...others} iconStyle={{...iconStyle,...style}}></Icon>;
    };
};

export const IconList = styled.div`
    display: flex;
`;

export const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

const CardTitle = styled.div`
    background-color: #f0f2f5;
    font-size: 12px;
    padding: 4px 8px;
`;

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 4px;
`;

const CardWrap = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2px;
`;

export const Card = function (props) {
    const { title, children } = props;
    return (
        <CardWrap>
            <CardTitle>{title}</CardTitle>
            <CardContent>{children}</CardContent>
        </CardWrap>
    );
};