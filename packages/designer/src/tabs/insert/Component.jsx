import styled from 'styled-components';

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

export const IconList = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 220px;
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

export function WithShapeIcon(Icon) {
    return function (props) {
        const { iconStyle = {},style={marginTop:2,marginBottom:2}, ...others } = props;
        const icStyle = { width: 18, height: 18, padding: 0, margin: 0 };
        return <Icon style={style} {...others} iconStyle={{ ...iconStyle, ...icStyle }}></Icon>;
    };
}
