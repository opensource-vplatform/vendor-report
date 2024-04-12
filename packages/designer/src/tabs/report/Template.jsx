import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  GroupItem,
  VItem,
} from '@components/group/Index';
import { Template } from '@components/reportDesignWizard/Index';
import WizardIcon from '@icons/report/wizard';
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
            <GroupItem title='模板'>
                <div style={{ display: 'flex' }}>
                    <VItem
                        title='创建模板'
                        desc='点击创建模板'
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
                    {currentSheetIsTemplate && (
                        <VItem
                            title='编辑模板'
                            desc='点击编辑模板'
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
                            onClick={editClickHandler}
                        ></VItem>
                    )}
                </div>
            </GroupItem>
        </>
    );
}
