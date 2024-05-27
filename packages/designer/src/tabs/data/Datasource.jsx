import { useContext } from 'react';

import { useDispatch } from 'react-redux';

import {
  HCard,
  VIconTitle,
} from '@components/nav/Index';
import DatasourceIcon from '@icons/data/datasource';
import { setIsShowDatasource } from '@store/datasourceSlice/datasourceSlice';
import { getDataSourceConfig } from '@utils/configUtil';

import DesignerContext from '../../DesignerContext';

export default function () {
    const dispatch = useDispatch();
    const context = useContext(DesignerContext);
    //是否允许查看数据源
    const isAllowToView = !getDataSourceConfig(context, 'allowToView');
    //const cursor = isAllowToView ? 'pointer' : 'not-allowed';
    return isAllowToView ? (
        <HCard title='数据绑定'>
            <VIconTitle
                title='数据源'
                desc='维护数据源信息'
                icon={DatasourceIcon}
                onClick={() => {
                    isAllowToView && dispatch(setIsShowDatasource());
                }}
            ></VIconTitle>
        </HCard>
    ) : null;
}
