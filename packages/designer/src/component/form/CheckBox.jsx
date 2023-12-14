import styled from 'styled-components';

const Label = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 4px;
    box-sizing: border-box;
    &:hover {
        background-color: #dadada;
    }
    &[data-disabled='true']{
        background-color: transparent !important;
        cursor:not-allowed;
    }
`;

const Input = styled.input`
    margin: 0px;
    padding: 0px;
`;

const Title = styled.span`
    margin-left: 12px;
    font-size: 12px;
`;

export default function(props){
    const { title, value, onChange,disabled,desc='' } = props;
    return (
        <Label data-disabled={!!disabled} title={desc}>
            <Input
                type='checkbox'
                checked={!!value}
                onChange={onChange}
                disabled={!!disabled}
            ></Input>
            <Title>{title}</Title>
        </Label>
    );
}