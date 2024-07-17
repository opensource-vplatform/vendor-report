import { useState } from 'react';

import { useSelector } from 'react-redux';

import {
  HCard,
  VIconTitle,
} from '@components/nav/Index';
import ReportColumnSetting from '@components/reportColumnSetting';
import QueryPanelSettingsIcon from '@icons/report/queryPanelSettings';
import { setSheetTag } from '@utils/worksheetUtil';

export default function Index() {
  const [show, setShow] = useState(false);
  const clickHandler = () => setShow(!show);
  const { spread } = useSelector(({ appSlice }) => appSlice);
  const sheet = spread.getActiveSheet();
  const onConfirmHandler = (datas) => {
    setSheetTag(sheet, 'columnConfig', datas);
    setShow(false);
  };
  return (
    <>
      {show && (
        <ReportColumnSetting
          onClose={clickHandler}
          onConfirm={onConfirmHandler}
        ></ReportColumnSetting>
      )}
      <HCard title='报表分栏设置'>
        <VIconTitle
          title='报表分栏设置'
          desc='报表分栏设置'
          icon={QueryPanelSettingsIcon}
          onClick={clickHandler}
        ></VIconTitle>
      </HCard>
    </>
  );
}
