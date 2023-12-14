import {
  Group,
  GroupItem,
  VItem,
} from '@components/group/Index';
import DatasourceIcon from '@icons/data/datasource';

export default function () {
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
                    onClick={()=>{
                        alert('数据源');
                    }}
                ></VItem>
            </GroupItem>
        </Group>
    );
}
