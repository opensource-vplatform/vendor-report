import styled from 'styled-components';

import { Button } from '@toone/report-ui';

export const ItemList = styled.div`
    display: flex;
    width: 260px;
    padding: 4px 8px;
    align-items: center;
`;

export const Item = styled.div`
    width: 130px;
    height: 26px;
    display: flex;
    align-items: center;
`;

export const Title = styled.span`
    font-size: 12px;
`;

export const Text = styled.span`
    font-size: 12px;
`;

const btnStyle = {
    height: 26,
};

export const Toolbar = function (props) {
    const { onConfirm, onCancel } = props;
    return (
        <ItemList>
            <Item></Item>
            <Button style={{ ...btnStyle, marginRight: 8 }} onClick={onConfirm}>
                确定
            </Button>
            <Button style={btnStyle} onClick={onCancel}>
                取消
            </Button>
        </ItemList>
    );
};
