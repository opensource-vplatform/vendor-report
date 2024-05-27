import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  HCard,
  VIconTitle,
} from '@components/nav/Index';
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
            <HCard title='向导'>
                <VIconTitle
                    title='向导'
                    desc='这是向导'
                    icon={WizardIcon}
                    onClick={clickHandler}
                ></VIconTitle>
            </HCard>
        </>
    );
}
