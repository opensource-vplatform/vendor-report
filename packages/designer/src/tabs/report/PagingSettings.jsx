import { useState } from 'react';

import { useSelector } from 'react-redux';

import {
  GroupItem,
  VItem,
} from '@components/group/Index';
import PageSettings from '@components/pageSettings/Index';
import PagingSettingsIcon from '@icons/report/pagingSettings';
import {
  getSheetTag,
  setSheetTag,
} from '@utils/worksheetUtil';

export default function Index(props) {
    const [show, setShow] = useState(false);
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const sheet = spread.getActiveSheet();
    const range = getSheetTag(sheet, 'pageArea');
    const isFillData = getSheetTag(sheet, 'isFillData');
    const groupSumRange = getSheetTag(sheet, 'groupSumArea');

    const { template } = useSelector(({ wizardSlice }) => wizardSlice);
    const activeSheetName = spread.getActiveSheet().name();
    const isTemplate = !!template?.[activeSheetName];

    const clickHandler = function (datas) {
        setShow(!show);
    };

    const onConfirmHandler = function (datas) {
        setSheetTag(sheet, 'pageArea', datas.range);
        setSheetTag(sheet, 'isFillData', datas.isFillData);
        setSheetTag(sheet, 'groupSumArea', datas.groupSumRange);

        setShow(false);
    };

    return (
        <>
            {show && (
                <PageSettings
                    onConfirm={onConfirmHandler}
                    onCancel={clickHandler}
                    range={range}
                    isFillData={isFillData}
                    isTemplate={isTemplate}
                    groupSumRange={groupSumRange}
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
