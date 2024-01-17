import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  GroupItem,
  VItem,
} from '@components/group/Index';
import ReportDesignWizard from '@components/reportDesignWizard/Index';
import WizardIcon from '@icons/report/wizard';
import { toggleReportDesignWizard } from '@store/navSlice/navSlice';

export default function Index(props) {
    const dispatch = useDispatch();
    const { reportDesignWizard } = useSelector(({ navSlice }) => navSlice);
    const clickHandler = function () {
        dispatch(toggleReportDesignWizard());
    };
    return (
        <>
            {reportDesignWizard && <ReportDesignWizard></ReportDesignWizard>}
            <GroupItem title='向导'>
                <VItem
                    title='向导'
                    desc='这是向导'
                    style={{
                        marginLeft: 4,
                        marginRight: 4,
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingBottom: 4,
                        cursor: 'pointer',
                    }}
                    icon={
                        <WizardIcon
                            iconStyle={{
                                width: 28,
                                height: 28,
                                cursor: 'pointer',
                            }}
                        ></WizardIcon>
                    }
                    onClick={clickHandler}
                ></VItem>
            </GroupItem>
        </>
    );
}
