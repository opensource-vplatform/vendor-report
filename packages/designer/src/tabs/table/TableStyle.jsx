import {
  GroupItem,
  VItem,
} from '@components/group/Index';
import Menu from '@components/Menu/Index';
import TableStyle from '@icons/table/Style';

export default function () {
    return (
        <GroupItem title='表格样式'>
            <Menu>
                <VItem
                    title='套用表格样式'
                    icon={
                        <TableStyle
                            iconStyle={{ width: 28, height: 28 }}
                        ></TableStyle>
                    }
                ></VItem>
            </Menu>
        </GroupItem>
    );
}
