import styled from 'styled-components';

const Textarea = styled.textarea`
    border: 1px solid #ddd;
    min-width: 500px;
    min-height: 80px;
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
        itemType = '',
        maxLength = 200,
        disabled,
        onChange = () => {},
    } = props;
    return (
        <Textarea
            onChange={onChange}
            value={value}
            data-item-type={itemType}
            maxLength={maxLength}
            disabled={disabled}
        ></Textarea>
    );
}
