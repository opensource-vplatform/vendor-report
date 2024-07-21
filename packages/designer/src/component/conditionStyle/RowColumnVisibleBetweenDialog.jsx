import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Range as RangSelector } from '@components/range/Index';
import {
  setRowColumnVisibleBetweenConfig,
  setRowColumnVisibleBetweenVisible,
  setTextBetweenConfig,
  setTextBetweenVisible,
} from '@store/conditionStyleSlice';
import { ConditionRule } from '@toone/report-excel';
import { OperationDialog, RadioGroup, Radio } from '@toone/report-ui';
import { hasRange, isNullOrUndef, uuid } from '@toone/report-util';

import { HLayout, StyleSelect, Text, Title, Wrap } from './Components';

export default function (props) {
  const { onCancel, onConfirm } = props;
  const { rowColumnVisibleBetweenConfig } = useSelector(
    ({ conditionStyleSlice }) => conditionStyleSlice
  );
  const dispatcher = useDispatch();
  const [data] = useState({
    id: uuid(),
  });
  const handleConfirm = () => {
    const range = rowColumnVisibleBetweenConfig.range;
    const range1 = rowColumnVisibleBetweenConfig.range1;
    if (
      isNullOrUndef(range) ||
      range.length == 0 ||
      isNullOrUndef(range1) ||
      range1.length == 0
    ) {
      return showErrorMessage(dispatcher, '提示', '请设置条件！');
    } else if (hasRange(range) || hasRange(range1)) {
      return showErrorMessage(
        dispatcher,
        '提示',
        '暂不支持选择其他单元格，请重新配置！'
      );
    } else {
      const rule = new ConditionRule({
        _type: 'rowColumnVisibleRule',
        operator: rowColumnVisibleBetweenConfig.operator,
        target: rowColumnVisibleBetweenConfig.target,
        value1: range,
        value2: range1,
      });
      onConfirm && onConfirm(rule);
    }
  };
  return (
    <OperationDialog
      title={rowColumnVisibleBetweenConfig.title}
      width='380px'
      onCancel={onCancel}
      id={data.id}
      onConfirm={handleConfirm}
    >
      <Wrap>
        <HLayout style={{ marginTop: 8, alignItems: 'center' }}>
          <Title style={{ width: 90, textAlign: 'end', paddingRight: 8 }}>
            {rowColumnVisibleBetweenConfig.desc}:
          </Title>
          <RangSelector
            value={rowColumnVisibleBetweenConfig.range}
            absoluteReference={true}
            hostId={data.id}
            onStartSelect={() =>
              dispatcher(setRowColumnVisibleBetweenVisible(false))
            }
            onChange={(val) =>
              dispatcher(
                setRowColumnVisibleBetweenConfig({
                  ...textBetweenConfig,
                  range: val,
                })
              )
            }
            onEndSelect={() =>
              dispatcher(setRowColumnVisibleBetweenVisible(true))
            }
            style={{ flex: 1 }}
          ></RangSelector>
        </HLayout>
        <HLayout style={{ alignItems: 'center', marginTop: 8 }}>
          <Title
            style={{ width: 90, textAlign: 'end', paddingRight: 8 }}
          ></Title>
          <RangSelector
            value={rowColumnVisibleBetweenConfig.range1}
            hostId={data.id}
            absoluteReference={true}
            onStartSelect={() =>
              dispatcher(setRowColumnVisibleBetweenVisible(false))
            }
            onChange={(val) =>
              dispatcher(
                setRowColumnVisibleBetweenConfig({
                  ...textBetweenConfig,
                  range1: val,
                })
              )
            }
            onEndSelect={() =>
              dispatcher(setRowColumnVisibleBetweenVisible(true))
            }
            style={{ flex: 1 }}
          ></RangSelector>
        </HLayout>
        <HLayout style={{ alignItems: 'center' }}>
          <Title style={{ width: 90, textAlign: 'end', paddingRight: 8 }}>
            的:
          </Title>
          <RadioGroup value={rowColumnVisibleBetweenConfig.target}>
            <Radio value='row' label='行'></Radio>
            <Radio value='column' label='列'></Radio>
          </RadioGroup>
        </HLayout>
        <HLayout style={{ alignItems: 'center' }}>
          <Title style={{ width: 90, textAlign: 'end', paddingRight: 8 }}>
            设置为:
          </Title>
          <RadioGroup value={rowColumnVisibleBetweenConfig.visible}>
            <Radio value={true} label='显示'></Radio>
            <Radio value={false} label='隐藏'></Radio>
          </RadioGroup>
        </HLayout>
      </Wrap>
    </OperationDialog>
  );
}
