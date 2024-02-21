import styled from 'styled-components';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    margin: '18px 4px 8px 4px';
    border: 1px solid #dadada;
`;

const Title = styled.span`
    font-size: 12px;
    margin-left: 8px;
    transform: translateY(-50%);
    background: #fff;
    width: max-content;
    padding-left: 4px;
    padding-right: 4px;
`;

export const Group = function (props) {
    const { style = {}, title = '', children, titleStyle={} } = props;
    return (
        <Wrap style={style}>
            <GroupTitle style={titleStyle}>{title}</GroupTitle>
            {children}
        </Wrap>
    );
};

const GroupTitle = function (props) {
    const { children, style = {} } = props;
    return <Title style={style}>{children}</Title>;
};
