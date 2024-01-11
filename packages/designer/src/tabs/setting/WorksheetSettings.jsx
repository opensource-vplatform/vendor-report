import { useContext } from 'react';

import { useDispatch } from 'react-redux';

import { GroupItem, VItem } from '@components/group/Index';
import SpreadGeneral from '@icons/setting/spreadGeneral';

export default function () {
    const dispatch = useDispatch();

    // const cursor = isAllowToView ? 'pointer' : 'not-allowed';

    return (
        <GroupItem title='工作表设置'>
            <VItem
                title='常规'
                desc='设置工作表的常规属性'
                style={{
                    marginLeft: 4,
                    marginRight: 4,
                    paddingLeft: 4,
                    paddingRight: 4,
                    paddingBottom: 4,
                    // cursor,
                }}
                icon={
                    <SpreadGeneral
                        iconStyle={{
                            width: 28,
                            height: 28,
                            // cursor,
                        }}
                    ></SpreadGeneral>
                }
                onClick={() => {
                    // aa
                }}
            ></VItem>
        </GroupItem>
    );
}
