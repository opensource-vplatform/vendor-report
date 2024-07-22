import styled from 'styled-components';

import {
  Button,
  FormItem,
  Integer,
  Radio,
  RadioGroup,
} from '@toone/report-ui';

export const ItemList = styled.div`
  display: flex;
  width: 260px;
  padding: 4px 8px;
  align-items: center;
`;

export const Item = styled.div`
  width: 130px;
  height: 26px;
  display: flex;
  align-items: center;
`;

export const VItem = styled.div`
  width: 130px;
  height: 26px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.span`
  font-size: 12px;
`;

export const Text = styled.span`
  font-size: 12px;
`;

export const RowHeight = function (props) {
  const { value, onChange } = props;
  const radioStyle = { padding: 0 };
  const radioStyle1 = { padding: 0, marginLeft: 8 };
  const labelStyle = { marginLeft: 0 };
  return (
    <FormItem label='行高'>
      <RadioGroup value={value} onChange={onChange}>
        <Radio
          style={radioStyle}
          labelStyle={labelStyle}
          value=''
          label='固定'
        ></Radio>
        <Radio
          style={radioStyle1}
          labelStyle={labelStyle}
          value='autoFitByContent'
          label='内容'
          desc='根据列宽限制，内容自动换行，调整行高适配显示内容。'
        ></Radio>
        <Radio
          style={radioStyle1}
          labelStyle={labelStyle}
          value='autoFitByZoom'
          label='缩放'
          desc='根据列宽和行高限制，缩小字体大小适配显示内容。'
        ></Radio>
      </RadioGroup>
    </FormItem>
  );
};

const btnStyle = {
  height: 26,
};

export const Toolbar = function (props) {
  const { onConfirm, onCancel } = props;
  return (
    <FormItem style={{ marginTop: 8 }}>
      <div style={{ width: '100%' }}></div>
      <Button style={{ ...btnStyle, marginRight: 8 }} onClick={onConfirm}>
        确定
      </Button>
      <Button style={btnStyle} onClick={onCancel}>
        取消
      </Button>
    </FormItem>
  );
};

export const ListIndex = (props) => {
  const { sheet } = props;
  let isList = false;
  if (sheet) {
    const col = sheet?.getActiveColumnIndex?.();
    const row = sheet?.getActiveRowIndex?.();
    const cell = sheet?.getCell?.(row, col);
    if (cell) {
      const bindingPath = cell?.bindingPath?.();
      sheet.parent.TOONE_FUNCS;
      const type = sheet.parent.TOONE_FUNCS?.getDsType?.(bindingPath);
      isList = type === 'list';
    }
  }

  if (!isList) {
    return null;
  }

  return (
    <FormItem label='下标'>
      <Integer {...props} min={0}></Integer>
    </FormItem>
  );
};
