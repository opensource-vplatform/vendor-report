import { useState } from 'react';

import styled from 'styled-components';

import { Range } from '@components/range/Index';
import InfoIcon from '@icons/shape/Info';
import {
  CheckBox,
  OperationDialog,
} from '@toone/report-ui';
import {
  isString,
  uuid,
} from '@toone/report-util';

const Wrap = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  user-select: none;
`;

const Text = styled.div`
  font-size: 12px;
  width: 85px;
`;

const HLayout = styled.div`
  display: flex;
  margin-top: 8px;
  align-items: center;
`;

const Default_Info = '选择需要分页的区域';
const Default_Group_Sum_Range_Info = '选择分组汇总区域';
const Default_Total_Range_Info = '选择总计区域';

const Group_Sum_Range_Info_Before_Range_info =
  '分组汇总区域应该位于分页区域后面';
const Total_Range_Info_Before_Range_info = '总计区域应该位于分页区域后面';

const REG = /^\d+:\d+$/;

export default function (props) {
  const {
    functionNum = 109,
    onConfirm,
    onCancel,
    range,
    isFillData = false,
    groupSumRange,
    isTemplate = false,
    totalRange,
    singleRowFill = false,
  } = props;

  const [data, setData] = useState(() => {
    return {
      functionNum,
      range,
      domId: uuid(),
      visible: true,
      rangeError: false,
      rangeMessage: Default_Info,
      isFillData,
      singleRowFill,
      groupSumRange,
      groupSumRangeError: false,
      groupSumRangeMessage: Default_Group_Sum_Range_Info,
      totalRange,
      totalRangeError: false,
      totalRangeMessage: Default_Total_Range_Info,
    };
  });

  const handleConfirm = () => {
    let isError = false;
    let checkedResult = {};
    //校验分页区域正确性
    const rangeStr = data.range;
    let rangeEndRow = -1;
    if (rangeStr && !REG.test(rangeStr)) {
      checkedResult.rangeError = true;
      isError = true;
    } else {
      rangeEndRow = Number(rangeStr.split(':')[1]);
    }

    //校验分组汇总区域正确性
    const groupSumRangeStr = data.groupSumRange;
    let groupSumRangeStartRow = -1;
    if (groupSumRangeStr && !REG.test(groupSumRangeStr)) {
      checkedResult.groupSumRangeError = true;
      isError = true;
    } else if (groupSumRangeStr) {
      groupSumRangeStartRow = Number(groupSumRangeStr.split(':')[0]);
      if (groupSumRangeStartRow <= rangeEndRow) {
        checkedResult.groupSumRangeError = true;
        checkedResult.groupSumRangeMessage =
          Group_Sum_Range_Info_Before_Range_info;
        isError = true;
      }
    }

    //校验总计区域正确性
    const totalRangeStr = data.totalRange;
    let totalRangeStartRow = -1;
    if (totalRangeStr && !REG.test(totalRangeStr)) {
      checkedResult.totalRangeError = true;
      isError = true;
    } else if (totalRangeStr) {
      totalRangeStartRow = Number(totalRangeStr.split(':')[0]);
      if (totalRangeStartRow <= rangeEndRow) {
        checkedResult.totalRangeError = true;
        checkedResult.totalRangeMessage = Total_Range_Info_Before_Range_info;
        isError = true;
      }
    }

    if (isError) {
      setData((data) => {
        return {
          ...data,
          ...checkedResult,
        };
      });
      return;
    }

    if (typeof onConfirm === 'function') {
      onConfirm({
        range: rangeStr,
        groupSumRange: groupSumRangeStr,
        totalRange: totalRangeStr,
        isFillData: data.isFillData,
        singleRowFill: data.singleRowFill,
      });
    }
  };
  const handleCancel = () => {
    onCancel && onCancel();
  };

  const handleRangeOnChange = function (key, val, message) {
    if (isString(val)) {
      val = val.trim();
      val = val.startsWith('=') ? val.substring(1) : val;
      let isError = REG.test(val);
      if ((key === 'groupSumRange' || key === 'totalRange') && data.range) {
        const rangeEndRow = Number(data.range.split(':')[1]);
        const startRow = Number(val.split(':')[0]);
        if (startRow <= rangeEndRow) {
          isError = false;
          if (key === 'groupSumRange') {
            message = Group_Sum_Range_Info_Before_Range_info;
          } else {
            message = Total_Range_Info_Before_Range_info;
          }
        }
      }

      if (key === 'range') {
        if (data.groupSumRange) {
          const startRow = Number(data.groupSumRange.split(':')[0]);
          const endRow = Number(val.split(':')[1]);
          if (startRow <= endRow) {
            isError = false;
            message = '分页区域应该位于分组区域前面';
          }
        } else if (data.totalRange) {
          const startRow = Number(data.totalRange.split(':')[0]);
          const endRow = Number(val.split(':')[1]);
          if (startRow <= endRow) {
            isError = false;
            message = '分页区域应该位于总计区域前面';
          }
        }
      }
      const result = {
        [`${key}Error`]: !isError,
        [key]: val,
        [`${key}Message`]: message,
      };

      if ((key === 'groupSumRange' || key === 'totalRange') && isError) {
        result.rangeError = false;
        result.rangeMessage = Default_Info;
      }

      setData((data) => {
        return {
          ...data,
          ...result,
        };
      });
    }
  };

  const onRangeEndSelect = function (a, b, c) {
    setData((data) => {
      return {
        ...data,
        visible: true,
      };
    });
  };

  const onRangeStartSelect = function () {
    setData((data) => {
      return {
        ...data,
        visible: false,
      };
    });
  };

  return data.visible ? (
    <OperationDialog
      title='分页设置'
      width=''
      id={data.domId}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    >
      <Wrap>
        <HLayout>
          <Text>填充数据：</Text>
          <CheckBox
            value={data.isFillData}
            onChange={(checked) => {
              setData((data) => {
                return {
                  ...data,
                  isFillData: checked,
                };
              });
            }}
          ></CheckBox>
          <InfoIcon
            iconStyle={{ color: '#228ee5' }}
            tips='数据不满一页时会填充满一页'
          ></InfoIcon>
        </HLayout>
        <HLayout>
          <Text>单行填充：</Text>
          <CheckBox
            value={data.singleRowFill}
            onChange={(checked) => {
              setData((data) => {
                return {
                  ...data,
                  singleRowFill: checked,
                };
              });
            }}
          ></CheckBox>
          <InfoIcon
            iconStyle={{ color: '#228ee5' }}
            tips='使用单行填充'
          ></InfoIcon>
        </HLayout>
        <HLayout>
          <Text>分页区域：</Text>
          <Range
            value={data.range}
            hostId={data.domId}
            error={data.rangeError}
            selectionType='row'
            onStartSelect={onRangeStartSelect}
            onEndSelect={onRangeEndSelect}
            onChange={(val) => {
              handleRangeOnChange('range', val, Default_Info);
            }}
          ></Range>
          <InfoIcon
            iconStyle={{
              color: data.rangeError ? 'red' : '#228ee5',
            }}
            tips={data.rangeMessage}
          ></InfoIcon>
        </HLayout>

        {isTemplate && (
          <>
            <HLayout>
              <Text>分组汇总区域：</Text>
              <Range
                value={data.groupSumRange}
                hostId={data.domId}
                error={data.groupSumRangeError}
                selectionType='row'
                onStartSelect={onRangeStartSelect}
                onEndSelect={onRangeEndSelect}
                onChange={(val) => {
                  handleRangeOnChange(
                    'groupSumRange',
                    val,
                    Default_Group_Sum_Range_Info
                  );
                }}
              ></Range>
              <InfoIcon
                iconStyle={{
                  color: data.groupSumRangeError ? 'red' : '#228ee5',
                }}
                tips={data.groupSumRangeMessage}
              ></InfoIcon>
            </HLayout>
            <HLayout>
              <Text>总计区域：</Text>
              <Range
                value={data.totalRange}
                hostId={data.domId}
                error={data.totalRangeError}
                selectionType='row'
                onStartSelect={onRangeStartSelect}
                onEndSelect={onRangeEndSelect}
                onChange={(val) => {
                  handleRangeOnChange(
                    'totalRange',
                    val,
                    Default_Total_Range_Info
                  );
                }}
              ></Range>
              <InfoIcon
                iconStyle={{
                  color: data.totalRangeError ? 'red' : '#228ee5',
                }}
                tips={data.totalRangeMessage}
              ></InfoIcon>
            </HLayout>
          </>
        )}
      </Wrap>
    </OperationDialog>
  ) : null;
}
