import styled from 'styled-components';

import Button from '@components/Button/Index';

export const ButtonWrap = styled.div`
    width: 100%;
    padding: 8px 0px 0px 0px;
    margin: 0px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row-reverse;
`;

export const FormulaDesc = styled.div`
    margin-top: 4px;
    margin-left: 8px;
    font-size: 12px;
    min-height: 50px;
`;

export const FormulaButton = function(props){
    const {style={},children,...others} = props;
    const btnStyle = { width: 80, height: 32 };
    return <Button style={{...btnStyle,...style}} {...others}>{children}</Button>
}