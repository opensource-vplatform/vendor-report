import { useContext } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import {
    setActive,
    setIsOpenforWorkbookSetting,
} from '@store/settingSlice/workbookSettingSlice';

import Tab from '@components/tabs/Tab';
import Tabs from '@components/tabs/Tabs';
import SpreadGeneralIcon from '@icons/setting/spreadGeneral';
import ScrollbarsIcon from '@icons/setting/Scrollbars';
import CalculationIcon from '@icons/setting/Calculation';
import TabstripIcon from '@icons/setting/Tabstrip';
import { Dialog } from '@components/dialog/Index';
import { GroupItem, VItem } from '@components/group/Index';
import { HLayout, ItemList, VGroupItem } from '@components/group/Index';
import GeneralTab from './WorkbookSettingSubPanel/GeneralTabItem';
import ScrollbarsTab from './WorkbookSettingSubPanel/ScrollbarsTab';

const Label = styled.span`
    font-size: 12px;
    margin-right: 4px;
`;
const TabPanel = styled.div`
    margin: 10px 13px;
    background: #fff;
    width: 700px;
    height: 530px;
    border-bottom: 1px solid #d3d3d3;
    border-left: 1px solid #d3d3d3;
    border-right: 1px solid #d3d3d3;
    P {
        margin: 5px 0 0 5px;
    }
`;
const WithTabItem = function (Component) {
    return function (props) {
        const dispatch = useDispatch();
        const { code, title, tabProps = {} } = props;
        return (
            <Tab
                code={code}
                title={title}
                onClick={() => {
                    dispatch(setActive({ code }));
                }}
            >
                <Component {...tabProps}></Component>
            </Tab>
        );
    };
};

const GeneralTabItem = WithTabItem(GeneralTab);
const ScrollbarsNavItem = WithTabItem(ScrollbarsTab);

export default function () {
    const dispatch = useDispatch();
    const workbookState = useSelector(
        ({ workbookSettingSlice }) => workbookSettingSlice
    );
    const { active, isOpenforWorkbookSetting } = workbookState;

    const handleClose = () => {
        dispatch(setIsOpenforWorkbookSetting(false));
    };

    return (
        <>
            <GroupItem title='工作簿设置'>
                <HLayout>
                    <VItem
                        title='常规'
                        desc='设置工作簿的常规属性'
                        style={{
                            marginLeft: 4,
                            marginRight: 4,
                            paddingLeft: 4,
                            paddingRight: 4,
                            paddingBottom: 4,
                            // cursor,
                        }}
                        icon={
                            <SpreadGeneralIcon
                                iconStyle={{
                                    width: 28,
                                    height: 28,
                                    // cursor,
                                }}
                            ></SpreadGeneralIcon>
                        }
                        onClick={() => {
                            dispatch(
                                setIsOpenforWorkbookSetting(
                                    !isOpenforWorkbookSetting
                                )
                            );
                        }}
                    ></VItem>
                    <VGroupItem>
                        <ItemList style={{ padding: '2px 4px 2px 4px' }}>
                            <ScrollbarsIcon
                                // onClick={handleAutoCalculation}
                                // disabled={isAuto}
                                tips='滚动条'
                            >
                                <Label>滚动条</Label>
                            </ScrollbarsIcon>
                        </ItemList>
                        <ItemList style={{ padding: '2px 4px 2px 4px' }}>
                            <CalculationIcon
                                // onClick={handleCalcWorksheet}
                                // disabled={isAuto}
                                tips='计算'
                            >
                                <Label>计算</Label>
                            </CalculationIcon>
                        </ItemList>
                        <ItemList style={{ padding: '2px 4px 2px 4px' }}>
                            <TabstripIcon
                                // onClick={handleCalcWorksheet}
                                // disabled={isAuto}
                                tips='工作表标签'
                            >
                                <Label>工作表标签</Label>
                            </TabstripIcon>
                        </ItemList>
                    </VGroupItem>
                </HLayout>
            </GroupItem>
            {isOpenforWorkbookSetting && (
                <Dialog
                    title='工作簿设置'
                    width='730px'
                    height='630px'
                    open={isOpenforWorkbookSetting}
                    // mask={true}
                    onClose={handleClose}
                >
                    <TabPanel>
                        <Tabs>
                            <GeneralTabItem
                                code='general'
                                title='常规'
                            ></GeneralTabItem>
                            <ScrollbarsNavItem
                                code='scrollbars'
                                title='滚动条'
                            ></ScrollbarsNavItem>
                        </Tabs>
                    </TabPanel>
                </Dialog>
            )}
        </>
    );
}
