import { useState } from 'react';

import { useSelector } from 'react-redux';

import {
  HCard,
  VIconTitle,
} from '@components/nav/Index';
import PageSettings from '@components/pageSettings/Index';
import PagingSettingsIcon from '@icons/report/pagingSettings';
import { getNamespace } from '@utils/spreadUtil';
import {
  getSheetTag,
  setSheetTag,
} from '@utils/worksheetUtil';

const GC = getNamespace();

export default function Index(props) {
    const [show, setShow] = useState(false);
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const sheet = spread.getActiveSheet();
    const range = getSheetTag(sheet, 'pageArea');
    const isFillData = getSheetTag(sheet, 'isFillData');
    const groupSumRange = getSheetTag(sheet, 'groupSumArea');
    const totalRange = getSheetTag(sheet, 'totalArea');
    const singleRowFill = getSheetTag(sheet, 'singleRowFill');

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
        setSheetTag(sheet, 'totalArea', datas.totalRange);
        setSheetTag(sheet, 'singleRowFill', datas.singleRowFill);

        if (datas.range) {
            const rangeArr = datas.range.split(':');
            const row = Number(rangeArr[0]) - 1;
            const endRow = Number(rangeArr[1]);
            for (let i = row; i < endRow; i++) {
                sheet.setValue(i, 0, 'C', GC.Spread.Sheets.SheetArea.rowHeader);
            }
        }

        if (datas.groupSumRange) {
            const rangeArr = datas.groupSumRange.split(':');
            const row = Number(rangeArr[0]) - 1;
            const endRow = Number(rangeArr[1]);
            for (let i = row; i < endRow; i++) {
                sheet.setValue(i, 0, 'G', GC.Spread.Sheets.SheetArea.rowHeader);
            }
        }

        if (datas.totalRange) {
            const rangeArr = datas.totalRange.split(':');
            const row = Number(rangeArr[0]) - 1;
            const endRow = Number(rangeArr[1]);
            for (let i = row; i < endRow; i++) {
                sheet.setValue(i, 0, 'T', GC.Spread.Sheets.SheetArea.rowHeader);
            }
        }
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
                    totalRange={totalRange}
                    singleRowFill={singleRowFill}
                ></PageSettings>
            )}
            <HCard title='分页设置'>
                <VIconTitle
                    title='分页设置'
                    desc='分页设置'
                    icon={PagingSettingsIcon}
                    onClick={clickHandler}
                ></VIconTitle>
            </HCard>
        </>
    );
}
