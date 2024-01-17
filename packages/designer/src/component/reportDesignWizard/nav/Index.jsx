import styled from 'styled-components';

import StatementDetail from './StatementDetail';

const Wrap = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    user-select: none;
`;
export default function Index(props) {
    return (
        <Wrap>
            <StatementDetail {...props}></StatementDetail>
        </Wrap>
    );
}
