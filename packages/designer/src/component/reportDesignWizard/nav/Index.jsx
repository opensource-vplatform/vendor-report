import styled from 'styled-components';

import CrossStatementIcon from './icons/CrossStatementIcon';
import GroupReportIcon from './icons/GroupReportIcon';
import StatementDetailIcon from './icons/StatementDetailIcon';
import NavItem from './NavItem';

const Wrap = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    user-select: none;
`;

export default function Index(props) {
    return (
        <Wrap>
            <NavItem
                {...props}
                type='statementDetail'
                text='明细报表'
                Icon={StatementDetailIcon}
            ></NavItem>
            <NavItem
                {...props}
                type='groupReport'
                text='分组报表'
                Icon={GroupReportIcon}
            ></NavItem>
            <NavItem
                {...props}
                type='crossStatement'
                text='交叉报表'
                Icon={CrossStatementIcon}
            ></NavItem>
        </Wrap>
    );
}
