import { useState } from 'react';

import {
  HCard,
  VIconTitle,
} from '@components/nav/Index';
import QueryPanelSettings from '@components/queryPanelSettings/Index';
import PagingSettingsIcon from '@icons/report/pagingSettings';

export default function Index() {
    const [show, setShow] = useState(false);
    const clickHandler = () => setShow(!show);
    return (
        <>
            {show && (
                <QueryPanelSettings onClose={clickHandler}></QueryPanelSettings>
            )}
            <HCard title='查询设置'>
                <VIconTitle
                    title='查询设置'
                    desc='查询设置'
                    icon={PagingSettingsIcon}
                    onClick={clickHandler}
                ></VIconTitle>
            </HCard>
        </>
    );
}
