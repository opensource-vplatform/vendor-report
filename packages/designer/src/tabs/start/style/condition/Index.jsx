import {
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import ConditionStyle from '@components/conditionStyle/Index';
import ConditionFormatIcon from '@icons/style/conditionFormat';
import { Icon } from '@utils/componentUtils';

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [data, setData] = useState({
        title: '',
        desc: '',
        operator: '',
        secondary: '',
        showTextCompareDialog: false,
        showDateCompareDialog: false,
        showDuplicateCompareDialog: false,
        showTextBetweenDialog: false,
        showNumberCompareDialog: false,
        showNumberApplyDiloag: false,
        showRuleEditor: false,
    });
    return (
        <Fragment>
            <ConditionStyle>
                <Icon title='条件格式' icon={ConditionFormatIcon}></Icon>
            </ConditionStyle>
        </Fragment>
    );
}
