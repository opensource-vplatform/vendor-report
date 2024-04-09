import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import { Tabs } from '@components/tabs/Index';
import { setActive } from '@store/cellSettingSlice';
import { WithTabItem } from '@utils/componentUtils';

import OperationDialog from '../dialog/OperationDialog';
import Align from './tabs/Align';
import Border from './tabs/Border';
import Font from './tabs/Font';
import Number from './tabs/Number';

const TabPanel = styled.div`
    background: #fff;
    width: 700px;
    height: 530px;
    border-bottom: 1px solid #d3d3d3;
    border-left: 1px solid #d3d3d3;
    border-right: 1px solid #d3d3d3;
    P {
        margin: 5px 0 0 5px;
        font-size: 12px;
    }
`;

const NumberTab = WithTabItem(Number, setActive);
const AlignTab = WithTabItem(Align, setActive);
const FontTab = WithTabItem(Font, setActive);
const BorderTab = WithTabItem(Border, setActive);

export default function () {
    const { active } = useSelector(({ cellSettingSlice }) => cellSettingSlice);
    const dispatch = useDispatch();
    return (
        <OperationDialog title='设置单元格格式' height='630px'>
            <TabPanel>
                <Tabs
                    value={active}
                    onChange={(code) => dispatch(setActive(code))}
                >
                    <NumberTab code='number' title='数字'></NumberTab>
                    <AlignTab code='align' title='对齐'></AlignTab>
                    <FontTab code='font' title='字体'></FontTab>
                    <BorderTab code='border' title='边框'></BorderTab>
                </Tabs>
            </TabPanel>
        </OperationDialog>
    );
}
