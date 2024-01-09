import styled from 'styled-components';

const Input = styled.input`
    position: relative;
    border: 1px solid #ddd;
    min-width: 500px;
    min-height: 26px;
    border-radius: 4px;
    cursor: pointer;
    caret-color: #777;

    &:focus {
        outline: 2px solid #ddd;
    }
    &:disabled {
        cursor: not-allowed;
        background-color: #f3f3f3;
        color: #333;
    }
`;
export default function Index(props) {
    const {
        value,
        onChange = () => {},
        onBlur = () => {},
        itemType = '',
        disabled = false,
    } = props;

    return (
        <Input
            type='text'
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            data-item-type={itemType}
            maxLength={20}
            disabled={disabled}
        ></Input>
    );
}
