import styled from 'styled-components';

const Button = styled.button`
    background-color: #fdfdfd;
    border: solid 1px #d5d5d5;
    border-radius: 4px;
    cursor: pointer;
    min-width: 80px;
    width: max-content;
    user-select: none;
    &:hover {
        background-color: #e0eef9;
        border-color: #5292f7;
    }
    &[data-type='primary'] {
        background-color: #162ddc;
        border-color: #162ddc;
        color: #fff;
    }
    &[data-type='primary']:hover {
        background-color: #00285d;
        border-color: #00285d;
    }
    &[data-type='info'] {
        background-color: #fff;
        border-color: #dcdfe6;
        color: #606266;
    }
    &[data-type='info']:hover {
        background-color: #fff;
        border-color: #e5e5e5;
        color:#162ddc;
    }
    &[data-type='warning'] {
        background-color: #f90;
        border-color: #f90;
        color: #fff;
    }
    &[data-type='warning']:hover {
        background-color: #ffad33;
        border-color: #ffad33;
    }
    &[data-type='warning']:disabled {
        border-color: #2d8cf0 !important;
    }
    &:disabled {
        background-color: #f7f7f7 !important;
        color: #c5c8ce !important;
        border-color: #d5d5d5 !important;
        cursor: not-allowed;
    }
`;

const Text = styled.span`
    width: max-content;
    white-space: nowrap;
`;

function Index(props) {
    const {
        title,
        onClick,
        style = {},
        disabled = false,
        type = 'default',
        children,
    } = props;
    return (
        <Button
            data-type={type}
            disabled={disabled}
            title={title}
            style={style}
            onClick={onClick}
        >
            <Text>{children}</Text>
        </Button>
    );
}

export default Index;
