import { Fragment, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Range as RangSelector } from '@components/range/Index';
import { ConditionRule } from '@toone/report-excel';
import { OperationDialog, RadioGroup, Radio } from '@toone/report-ui';
import { hasRange, isNullOrUndef, uuid } from '@toone/report-util';

import {
  setRowColumnVisibleCompareConfig,
  setRowColumnVisibleCompareVisible,
  setTextCompareConfig,
  setTextCompareVisible,
} from '../../store/conditionStyleSlice';
import { HLayout, StyleSelect, Text, Title, Wrap } from './Components';
import { showErrorMessage } from '@utils/messageUtil';

export default function (props) {
  const { onCancel, onConfirm } = props;
  const dispatcher = useDispatch();
  const { rowColumnVisibleCompareConfig } = useSelector(
    ({ conditionStyleSlice }) => conditionStyleSlice
  );
  const [data] = useState({
    id: uuid(),
  });
  const handleConfirm = (...args) => {
    const range = rowColumnVisibleCompareConfig.range;
    if (isNullOrUndef(range) || range.length == 0) {
      return showErrorMessage(dispatcher, '请设置条件！');
    } else if (hasRange(range)) {
      return showErrorMessage(
        dispatcher,
        '暂不支持选择其他单元格，请重新配置！'
      );
    } else {
      const rule = new ConditionRule({
        _type: 'rowColumnVisibleRule',
        operator: rowColumnVisibleCompareConfig.operator,
        target: rowColumnVisibleCompareConfig.target,
        visible: rowColumnVisibleCompareConfig.visible,
        value: range,
      });
      onConfirm && onConfirm(rule);
    }
  };
  return (
    <OperationDialog
      title={rowColumnVisibleCompareConfig.title}
      width='380px'
      onCancel={onCancel}
      id={data.id}
      anchor={true}
      onConfirm={handleConfirm}
    >
      <Wrap>
        <HLayout style={{ marginTop: 8, alignItems: 'center' }}>
          <Title style={{ width: 90, textAlign: 'end', paddingRight: 8 }}>
            {rowColumnVisibleCompareConfig.desc}:
          </Title>
          <RangSelector
            title={rowColumnVisibleCompareConfig.title}
            autoFocus={true}
            hostId={data.id}
            value={rowColumnVisibleCompareConfig.range}
            absoluteReference={true}
            onStartSelect={() =>
              dispatcher(setRowColumnVisibleCompareVisible(false))
            }
            onChange={(val) =>
              dispatcher(
                setRowColumnVisibleCompareConfig({
                  ...rowColumnVisibleCompareConfig,
                  range: val,
                })
              )
            }
            onEndSelect={() =>
              dispatcher(setRowColumnVisibleCompareVisible(true))
            }
            style={{ flex: 1 }}
          ></RangSelector>
        </HLayout>
        <HLayout style={{ alignItems: 'center' }}>
          <Title style={{ width: 90, textAlign: 'end', paddingRight: 8 }}>
            的:
          </Title>
          <RadioGroup
            value={rowColumnVisibleCompareConfig.target}
            onChange={(val) =>
              dispatcher(
                setRowColumnVisibleCompareConfig({
                  ...rowColumnVisibleCompareConfig,
                  target: val,
                })
              )
            }
          >
            <Radio value='row' label='行'></Radio>
            <Radio value='column' label='列'></Radio>
          </RadioGroup>
        </HLayout>
        <HLayout style={{ alignItems: 'center' }}>
          <Title style={{ width: 90, textAlign: 'end', paddingRight: 8 }}>
            设置为:
          </Title>
          <RadioGroup
            value={rowColumnVisibleCompareConfig.visible}
            onChange={(val) =>
              dispatcher(
                setRowColumnVisibleCompareConfig({
                  ...rowColumnVisibleCompareConfig,
                  visible: val,
                })
              )
            }
          >
            <Radio value={true} label='显示'></Radio>
            <Radio value={false} label='隐藏'></Radio>
          </RadioGroup>
        </HLayout>
      </Wrap>
    </OperationDialog>
  );
}
