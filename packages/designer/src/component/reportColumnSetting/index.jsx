import { useState } from 'react';

import styled from 'styled-components';

import { Range } from '@components/range/Index';
import InfoIcon from '@icons/shape/Info';
import {
  CheckBox,
  Integer,
  OperationDialog,
  Select,
} from '@toone/report-ui';
import {
  isFunction,
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

const COLUMN_OPTIONS = [
  {
    value: 'row',
    text: '行分栏',
  },
  /*  {
    value: 'column',
    text: '列分栏',
  }, */
];

const REG = /^\d+:\d+$/;

export default (props) => {
  const {
    onConfirm,
    onClose,
    enable = true,
    columnType = 'row',
    colCount = 1,
    range,
    copyRange,
  } = props;

  const [data, setData] = useState(() => {
    return {
      domId: uuid(),
      enable, //是否启用分栏
      columnType, //分栏类型。row || column
      colCount, //分栏列数
      visible: true,
      range, //分栏区域
      copyRange, //复制区域
    };
  });

  const handleConfirm = () => {
    let isError = false;
    let checkedResult = {};

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
        ...data,
      });
    }
  };
  const handleCancel = () => {
    isFunction(onClose) && onClose();
  };

  const handleRangeOnChange = function (key, val, message) {
    if (isString(val)) {
      val = val.trim();
      val = val.startsWith('=') ? val.substring(1) : val;
      let isError = REG.test(val);
      const result = {
        [`${key}Error`]: !isError,
        [key]: val,
        [`${key}Message`]: message,
      };

      setData((data) => {
        return {
          ...data,
          ...result,
        };
      });
    }
  };

  const onRangeEndSelect = () => {
    setData((data) => {
      return {
        ...data,
        visible: true,
      };
    });
  };

  const onRangeStartSelect = () => {
    setData((data) => {
      return {
        ...data,
        visible: false,
      };
    });
  };

  return data.visible ? (
    <OperationDialog
      title='报表分栏设置'
      id={data.domId}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    >
      <Wrap>
        <HLayout>
          <Text>启用分栏：</Text>
          <CheckBox
            value={data.enable}
            onChange={(checked) => {
              setData((data) => {
                return {
                  ...data,
                  enable: checked,
                };
              });
            }}
          ></CheckBox>
        </HLayout>
        <HLayout>
          <Text>分栏类型：</Text>
          <Select
            wrapStyle={{ flex: 1 }}
            value={data.columnType}
            datas={COLUMN_OPTIONS}
            onChange={(value) => {
              setData((data) => {
                return { ...data, columnType: value };
              });
            }}
          ></Select>
        </HLayout>
        <HLayout>
          <Text>分栏列数：</Text>
          <Integer
            style={{ flex: 1 }}
            min={1}
            value={data.colCount}
            max={20}
            onChange={(value) => {
              setData((data) => {
                return { ...data, colCount: value };
              });
            }}
          ></Integer>
        </HLayout>
        <HLayout>
          <Text>分栏区域：</Text>
          <Range
            value={data.range}
            hostId={data.domId}
            error={data.rangeError}
            selectionType='row'
            onStartSelect={onRangeStartSelect}
            onEndSelect={onRangeEndSelect}
            onChange={(val) => {
              handleRangeOnChange('range', val, '');
            }}
          ></Range>
          <InfoIcon
            iconStyle={{
              color: data.rangeError ? 'red' : '#228ee5',
            }}
            tips={data.rangeMessage}
          ></InfoIcon>
        </HLayout>
        <HLayout>
          <Text>复制区域：</Text>
          <Range
            value={data.copyRange}
            hostId={data.domId}
            error={data.rangeError}
            selectionType='row'
            onStartSelect={onRangeStartSelect}
            onEndSelect={onRangeEndSelect}
            onChange={(val) => {
              handleRangeOnChange('copyRange', val, '');
            }}
          ></Range>
          <InfoIcon
            iconStyle={{
              color: data.rangeError ? 'red' : '#228ee5',
            }}
            tips={data.rangeMessage}
          ></InfoIcon>
        </HLayout>
      </Wrap>
    </OperationDialog>
  ) : null;
};
