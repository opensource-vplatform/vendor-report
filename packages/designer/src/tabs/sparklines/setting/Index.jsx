import { useContext } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  GroupItem,
  HLayout,
  VItem,
} from '@components/group/Index';
import SpreadGeneralIcon from '@icons/setting/spreadGeneral';
import { showEditorDialog } from '@utils/sparklineUtil';

import context from '../../../DesignerContext';

export default function () {
    const dispatch = useDispatch();
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const ctx = useContext(context);
    return (
        <GroupItem title='参数'>
            <HLayout>
                <VItem
                    title='设置'
                    desc='设置迷你图属性'
                    style={{
                        marginLeft: 4,
                        marginRight: 4,
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingBottom: 4,
                    }}
                    icon={
                        <SpreadGeneralIcon
                            iconStyle={{
                                width: 28,
                                height: 28,
                            }}
                        ></SpreadGeneralIcon>
                    }
                    onClick={() => {
                        showEditorDialog(spread,dispatch,ctx);
                    }}
                ></VItem>
            </HLayout>
        </GroupItem>
    );
}
