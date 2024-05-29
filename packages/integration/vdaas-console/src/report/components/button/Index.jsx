import styled from 'styled-components';

const Button = styled.button`
    background-color: #fdfdfd;
    border: solid 1px #d5d5d5;
    border-radius: 4px;
    cursor: pointer;
    min-width: 80px;
    padding: 0px;
    user-select: none;
    &:hover {
        background-color: #e0eef9;
        border-color: #5292f7;
    }
    &[data-type='primary'] {
        background-color: #2d8cf0;
        border-color: #2d8cf0;
        color: #fff;
    }
    &[data-type='primary']:hover {
        background-color: #57a3f3;
        border-color: #57a3f3;
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
    &[data-type='text'] {
        background-color: transparent;
        border: none;
        color: blue;
    }
    &[data-type='text']:hover {
        background-color: transparent;
        border: none;
        text-decoration: underline;
    }
    &[data-type='text']:disabled {
        background-color: transparent !important;
        border: none;
        color: #c5c8ce !important;
        text-decoration: none;
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
