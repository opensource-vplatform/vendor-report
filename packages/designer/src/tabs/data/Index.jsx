import { useDispatch } from 'react-redux';

import {
  Group,
  GroupItem,
  VItem,
} from '@components/group/Index';
import DatasourceIcon from '@icons/data/datasource';
import { setIsShowDatasource } from '@store/datasourceSlice/datasourceSlice';

export default function () {
    const dispatch = useDispatch();
    return (
        <Group>
            <GroupItem title='数据绑定'>
                <VItem
                    title='数据源'
                    desc='维护数据源信息'
                    icon={
                        <DatasourceIcon
                            iconStyle={{ width: 28, height: 28 }}
                        ></DatasourceIcon>
                    }
                    onClick={() => {
                        dispatch(setIsShowDatasource());
                    }}
                ></VItem>
            </GroupItem>
        </Group>
    );
}
