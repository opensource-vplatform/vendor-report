import {
  useEffect,
  useState,
} from 'react';

import styled from 'styled-components';

const NumberWrap = styled.div`
      display: flex;
      width: 100%;
      height: 100%;
      padding: 0;
      border: 1px solid #d3d3d3;
      min-height: 24px;
      background: white;
  `;
  
  const NumberInput = styled.input`
      border: none;
      background: none;
      vertical-align: middle;
      width: 100%;
      padding-left: 4px;
      padding-top: 2px;
      &:focus-visible {
          border: solid 1px #5292f7;
          outline: none;
      }
  `;
  
  const NumberIconWrap = styled.div`
      width: 18px;
      height: 100%;
      cursor: default;
      display: flex;
      overflow: hidden;
      flex-direction: column;
      right: 0;
      top: 0;
      border-left: 1px solid #d3d3d3;
  `;
  
  const IconWrap = styled.div`
      width: 100%;
      color: #555555;
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
          background-color: #aaa;
      }
  `;
  
  const UpIcon = styled.div`
      width: 100%;
      min-width: 18px;
      min-height: 12px;
      color: #555555;
      height: 50%;
      background-repeat: no-repeat;
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMTUgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5Ecm9wZG93biBidXR0b24xPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkRyb3Bkb3duLWJ1dHRvbjEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwb2x5Z29uIGlkPSLot6/lvoQtNCIgZmlsbD0iIzY2NjY2NiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNy41MDAwMDAsIDUuNTAwMDAwKSByb3RhdGUoLTE4MC4wMDAwMDApIHRyYW5zbGF0ZSgtNy41MDAwMDAsIC01LjUwMDAwMCkgIiBwb2ludHM9IjMgMyAxMiAzIDcuNSA4Ij48L3BvbHlnb24+CiAgICA8L2c+Cjwvc3ZnPg==);
  `;
  
  const DownIcon = styled.div`
      width: 100%;
      min-width: 18px;
      min-height: 12px;
      color: #555555;
      height: 50%;
      background-repeat: no-repeat;
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMTUgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5Ecm9wZG93biBidXR0b24yPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkRyb3Bkb3duLWJ1dHRvbjIiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwb2x5Z29uIGlkPSLot6/lvoQtNCIgZmlsbD0iIzY2NjY2NiIgcG9pbnRzPSIzIDQgMTIgNCA3LjUgOSI+PC9wb2x5Z29uPgogICAgPC9nPgo8L3N2Zz4=);
  `;
  
  export default function (props) {
      const {
          value,
          onChange,
          style = {},
          min = Number.MIN_SAFE_INTEGER,
          max = Number.MAX_SAFE_INTEGER,
      } = props;
      const [data, setData] = useState(() => {
          return { innerVal: typeof value == 'number' ? value : 0, value: value };
      });
      const setVal = (val)=>{
          if (val >= min && val <= max) {
              setData((data)=>{
                  return {
                      ...data,
                      innerVal:val
                  }
              });
          }
      }
      const fireChange = (val) => {
          if (typeof onChange == 'function') {
              onChange(parseInt(val));
          }
      };
      const increase = () => {
          let newVal = parseInt(data.innerVal) + 1;
          newVal = newVal <= max ? newVal : max;
          if (newVal != data.innerVal) {
              setVal(newVal);
              fireChange(newVal);
          }
      };
      const decrease = () => {
          let newVal = parseInt(data.innerVal) - 1;
          newVal = newVal >= min ? newVal : min;
          if (newVal != data.innerVal) {
              setVal(newVal);
              fireChange(newVal);
          }
      };
      const handleInput = (evt) => {
          const newVal = parseInt(evt.target.value);
          setVal(newVal);
      };
      const handleBlur = (evt) => {
          let newVal = parseInt(evt.target.value);
          newVal = isNaN(newVal) ? 0 : newVal;
          if (newVal + '' != data.value) {
              setVal(newVal);
              fireChange(newVal);
          }
      };
      const handleFocus = (evt)=>{
          try{
              evt.nativeEvent.target.select();
          }catch(e){}
      }
      useEffect(() => {
          setData(()=>{
              return {
                  innerVal:typeof value == 'number' ? value : 0,
                  value
              };
          });
      }, [value]);
      return (
          <NumberWrap style={style}>
              <NumberInput
                  value={data.innerVal}
                  onInput={handleInput}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
              ></NumberInput>
              <NumberIconWrap>
                  <IconWrap
                      onClick={increase}
                      style={{ borderBottom: '1px solid #d3d3d3' }}
                  >
                      <UpIcon></UpIcon>
                  </IconWrap>
                  <IconWrap onClick={decrease}>
                      <DownIcon></DownIcon>
                  </IconWrap>
              </NumberIconWrap>
          </NumberWrap>
      );
  }
  