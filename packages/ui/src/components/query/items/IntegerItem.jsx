import styled from 'styled-components';

import TextInput from '../../form/TextInput';

const Wrap = styled.div`
    display: flex;
    align-items: center;
`;

const Label = styled.div`
    height: 35px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    padding-left: 10px;
`;
export function IntegerItem(props) {
    const { labelText = '整数', labelWidth = 80, disabled = false } = props;
    const labelStyles = {
        width: labelWidth,
    };
    return (
        <Wrap>
            <Label style={labelStyles}>{labelText}</Label>
            <TextInput
                style={{ flex: 1, borderRadius: 0 }}
                disabled={disabled}
            ></TextInput>
        </Wrap>
    );
}
