import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { CheckBox } from '@components/form/Index';
import {
  GroupItem,
  HLayout,
  VGroupItem,
} from '@components/group/Index';
import ItemList from '@components/group/ItemList';
import { setIsFillData } from '@store/datasourceSlice/datasourceSlice';

export default function Index() {
    const dispatch = useDispatch();
    const groupStyle = { padding: '4px 6px' };
    const { isFillData } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );
    return (
        <GroupItem title='其它'>
            <HLayout>
                <VGroupItem>
                    <ItemList style={groupStyle}>
                        <CheckBox
                            title='填充数据'
                            desc=''
                            value={isFillData}
                            onChange={(checked) => {
                                dispatch(
                                    setIsFillData({
                                        value: checked,
                                    })
                                );
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
            </HLayout>
        </GroupItem>
    );
}
