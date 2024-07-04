import { useState } from 'react';

import { isNullOrUndef } from '@toone/report-util';

import Calendar from '../../../icons/Calendar';
import Clear from '../../../icons/Clear';
import { Popper } from '../../popper/Index';
import { TextInput } from '../Index';
import DateComp from './Date';

export default function (props) {
  const { value, onChange,onClear } = props;
  const [data, setData] = useState({ value, open: false });
  const setValue = (val) => {
    if (val !== data) {
      setData({ value: val, open: false });
      onChange && onChange(val);
    } else {
      setData({ open: false });
    }
  };
  const handleClear = (evt) => {
    setValue(null);
    evt.preventDefault();
    onClear&&onClear();
  };
  return (
    <Popper
      maskClose={true}
      open={data.open}
      style={{
        height: 'max-content',
      }}
      onVisibleChange={(val) => {
        setData({ ...data, open: val });
      }}
      contentStyle={{minWidth:216,maxWidth:216}}
      content={<DateComp value={data.value} setValue={setValue}></DateComp>}
    >
      <TextInput
        value={isNullOrUndef(data.value) ? '' : data.value}
        SuffixIcon={
          data.value ? (
            <Clear
              style={{ width: 24, height: 24 }}
              //hoverable={false}
              onClick={handleClear}
            ></Clear>
          ) : (
            <Calendar
              style={{ width: 24, height: 24 }}
              //hoverable={false}
            ></Calendar>
          )
        }
      ></TextInput>
    </Popper>
  );
}
