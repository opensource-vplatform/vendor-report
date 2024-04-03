import {
  Fragment,
  useEffect,
  useState,
} from 'react';

import InputBox from './InputBox';
import SelectBox from './SelectBox';

export default function (props) {
      const {
          title = null,
          value,
          onFocus,
          onChange,
          style = {},
          disabled=false,
          autoFocus = false,
          absoluteReference = false,
          onStartSelect,
          onEndSelect,
      } = props;
      const [showRange, setRangeVisible] = useState(false);
      const [data,setData] = useState(value);
      const handleStartSelect = () => {
          setRangeVisible(true);
          onStartSelect && onStartSelect();
      };
      const handleEndSelect = () => {
          setRangeVisible(false);
          onEndSelect && onEndSelect();
      };
      const handleChange = (val)=>{
          setData(val);
          onChange(val);
      }
      useEffect(()=>{
        setData(value);
      },[value]);
      return (
          <Fragment>
              {showRange ? (
                  <SelectBox
                      style={style}
                      value={data}
                      absoluteReference={absoluteReference}
                      onChange={handleChange}
                      onIconClick={handleEndSelect}
                  ></SelectBox>
              ) : (
                  <InputBox
                      autoFocus={autoFocus}
                      style={style}
                      value={data}
                      disabled={disabled}
                      onChange={handleChange}
                      onIconClick={handleStartSelect}
                  ></InputBox>
              )}
          </Fragment>
      );
  }
  