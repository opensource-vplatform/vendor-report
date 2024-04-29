import { useState } from 'react';

import {
  GroupItem,
  VItem,
} from '@components/group/Index';
import PageSettings from '@components/pageSettings/Index';
import PagingSettingsIcon from '@icons/report/pagingSettings';

export default function Index(props) {
    const [show, setShow] = useState(false);
    const clickHandler = function () {
        setShow(!show);
    };
    return (
        <>
            {show && (
                <PageSettings
                    onConfirm={clickHandler}
                    onCancel={clickHandler}
                ></PageSettings>
            )}
            <GroupItem title='分页设置'>
                <VItem
                    title='分页设置'
                    desc='分页设置'
                    style={{
                        marginLeft: 4,
                        marginRight: 4,
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingBottom: 4,
                        cursor: 'pointer',
                    }}
                    icon={
                        <PagingSettingsIcon
                            iconStyle={{
                                width: 28,
                                height: 28,
                                cursor: 'pointer',
                            }}
                        ></PagingSettingsIcon>
                    }
                    onClick={clickHandler}
                ></VItem>
            </GroupItem>
        </>
    );
}
