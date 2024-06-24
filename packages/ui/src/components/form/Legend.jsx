import styled from 'styled-components';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    margin: '18px 4px 8px 4px';
    &[data-type='outline'] {
        border: 1px solid #dadada;
    }
    &[data-type='line'] {
        border-top: 1px solid #dadada;
    }
    &[data-disabled='true'] {
        opacity: 0.6;
    }
`;

const Title = styled.span`
    font-size: 12px;
    margin-left: 8px;
    transform: translateY(-50%);
    background: transparent;
    width: max-content;
    padding-left: 4px;
    padding-right: 4px;
`;

export const Legend = function (props) {
    const {
        style = {},
        title = '',
        children,
        titleStyle = {},
        type='outline',
        disabled = false,
    } = props;
    return (
        <Wrap style={style} data-disabled={disabled} data-type={type}>
            <GroupTitle style={titleStyle}>{title}</GroupTitle>
            {children}
        </Wrap>
    );
};

const GroupTitle = function (props) {
    const { children, style = {} } = props;
    return <Title style={style}>{children}</Title>;
};
