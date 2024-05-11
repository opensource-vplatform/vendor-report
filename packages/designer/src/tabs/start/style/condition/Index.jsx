import { Fragment } from 'react';

import ConditionStyle from '@components/conditionStyle/Index';
import ConditionFormatIcon from '@icons/style/conditionFormat';
import { Icon } from '@utils/componentUtils';

export default function () {
    return (
        <Fragment>
            <ConditionStyle>
                <Icon title='条件格式' icon={ConditionFormatIcon}></Icon>
            </ConditionStyle>
        </Fragment>
    );
}
