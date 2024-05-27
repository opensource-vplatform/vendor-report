import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  HCard,
  VIconTitle,
} from '@components/nav/Index';
import { Template } from '@components/reportDesignWizard/Index';
import TempalteIcon from '@icons/report/template';
import { toggleBooleanValue } from '@store/navSlice/navSlice';
import { toggleBooleanValue as _toggleBooleanValue } from '@store/wizardSlice';

export default function Index(props) {
    const dispatch = useDispatch();
    const { showTemplate } = useSelector(({ navSlice }) => navSlice);
    const { currentSheetIsTemplate } = useSelector(
        ({ wizardSlice }) => wizardSlice
    );
    const clickHandler = function () {
        dispatch(
            toggleBooleanValue({
                key: 'showTemplate',
            })
        );

        dispatch(
            _toggleBooleanValue({
                code: 'isEdit',
                value: false,
            })
        );
    };

    const editClickHandler = function () {
        dispatch(
            toggleBooleanValue({
                key: 'showTemplate',
            })
        );
        dispatch(
            _toggleBooleanValue({
                code: 'isEdit',
                value: true,
            })
        );
    };

    return (
        <>
            {showTemplate && (
                <Template
                    onClose={function () {
                        dispatch(
                            toggleBooleanValue({
                                key: 'showTemplate',
                            })
                        );
                    }}
                ></Template>
            )}
            <HCard title='模板'>
                <div style={{ display: 'flex' }}>
                    <VIconTitle
                        title='创建模板'
                        desc='点击创建模板'
                        icon={TempalteIcon}
                        onClick={clickHandler}
                    ></VIconTitle>
                    {currentSheetIsTemplate && (
                        <VIconTitle
                            title='编辑模板'
                            desc='点击编辑模板'
                            icon={TempalteIcon}
                            onClick={editClickHandler}
                        ></VIconTitle>
                    )}
                </div>
            </HCard>
        </>
    );
}
