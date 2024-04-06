import styled from 'styled-components';

const CardWrap = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2px;
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

export const Card = function (props) {
    const { title, children, contentStyle = {} } = props;
    return (
        <CardWrap>
            {title ? <CardTitle>{title}</CardTitle> : null}
            <CardContent style={contentStyle}>{children}</CardContent>
        </CardWrap>
    );
};
