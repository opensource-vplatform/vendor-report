import styled from 'styled-components';

import { Card } from '@components/card/Index';

export const WithColorIcon = function (Icon) {
    return function (props) {
        const { iconStyle = {}, ...others } = props;
        const style = { width: 64, height: 48 };
        return <Icon {...others} iconStyle={{ ...iconStyle, ...style }}></Icon>;
    };
};

export const IconList = styled.div`
    display: flex;
`;

export const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

export { Card };
