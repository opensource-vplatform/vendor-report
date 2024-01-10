import { useContext } from 'react';

import { useDispatch } from 'react-redux';

import {
  Group,
  GroupItem,
  VItem,
} from '@components/group/Index';
import DatasourceIcon from '@icons/data/datasource';
import { setIsShowDatasource } from '@store/datasourceSlice/datasourceSlice';

import DesignerContext from '../../DesignerContext';

export default function () {
    const dispatch = useDispatch();
    const context = useContext(DesignerContext);
    //是否允许查看数据源
    const isAllowToView = context?.conf?.dataSource?.allowToView !== false;
    const cursor = isAllowToView ? 'pointer' : 'not-allowed';

    return (
        <Group>
            <GroupItem title='数据绑定'>
                <VItem
                    title='数据源'
                    desc='维护数据源信息'
                    style={{
                        marginLeft: 4,
                        marginRight: 4,
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingBottom: 4,
                        cursor,
                    }}
                    icon={
                        <DatasourceIcon
                            iconStyle={{
                                width: 28,
                                height: 28,
                                cursor,
                            }}
                        ></DatasourceIcon>
                    }
                    onClick={() => {
                        isAllowToView && dispatch(setIsShowDatasource());
                    }}
                ></VItem>
            </GroupItem>
        </Group>
    );
}
