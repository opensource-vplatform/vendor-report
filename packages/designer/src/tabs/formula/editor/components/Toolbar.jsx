import { useSelector } from 'react-redux';
import styled from 'styled-components';

import BackIcon from '@icons/arrow/ArrowBack';
import ForwardIcon from '@icons/arrow/ArrowForward';
import CancelIcon from '@icons/shape/Cancel';
import DataObjectIcon from '@icons/shape/DataObject';

const ErrorIconWrap = styled.div`
  display: flex;
  align-items: center;
  cursor:pointer;
  height:22px;
  border-radius: 2px;
  padding-left: 9px;
  padding-right: 9px;
  &:hover {
    background-color:#e6e7e8;
  }
`;

const ErrorIcon = function (props) {
  const { store } = props;
  const {errorList,showErrorDetail} = useSelector(({formulaSlice})=>formulaSlice);
  return errorList.length > 0 ? (
    <ErrorIconWrap onClick={()=>{
      store.setErrorDetailVisible(!showErrorDetail);
    }}>
      <CancelIcon style={{ color: "red", fontSize: "18px" }}></CancelIcon>
      <span style={{color: "#515a6e",fontSize:"12px",marginLeft:"8px"}}>{"错误："+errorList.length}</span>
    </ErrorIconWrap>
  ) : null;
};

export default function (props) {
  const { store } = props;
  const {errorList,canGoBack,canGoForward,showErrorDetail} = useSelector(({formulaSlice})=>formulaSlice);
  return (
    <div
      style={{
        height: 32,
        borderTop: "#d2d0d0 1px solid",
        borderBottom: "#d2d0d0 1px solid",
        backgroundColor: "#f7f7f7",
        fontSize: "17px",
        lineHeight: "32px",
        paddingLeft: "15px",
        display: "flex",
        alignItems: "center",
        zIndex:1,
      }}
    >
        <DataObjectIcon
          fontSize="small"
          title="格式化"
          sx={{
            color: "#515a6e",
            cursor: "pointer",
            marginRight: "16px",
            "&:hover": { backgroundColor:"#e6e7e8",color: "#1976d2" },
          }}
          onClick={()=>{
            store.setExpression(format(store.exp));
          }}
        ></DataObjectIcon>
        <BackIcon
          fontSize="small"
          title="后退"
          color="disabled"
          sx={{
            color: canGoBack ? "#515a6e":"#ddd",
            cursor: canGoBack ? "pointer":"not-allowed",
            marginRight: "16px",
            "&:hover": { backgroundColor:canGoBack ? "#e6e7e8":"transparent",color: canGoBack ? "#1976d2":"#ddd" },
          }}
          onClick={()=>store.back()}
        ></BackIcon>
        <ForwardIcon
          fontSize="small"
          title="前进"
          sx={{
            color: canGoForward ? "#515a6e":"#ddd",
            cursor: canGoForward ? "pointer":"not-allowed",
            marginRight: "10px",
            "&:hover": { backgroundColor:canGoForward ? "#e6e7e8":"transparent",color: canGoForward ? "#1976d2":"#ddd" },
          }}
          onClick={()=>store.forward()}
        ></ForwardIcon>
      <ErrorIcon store={store}></ErrorIcon>
    </div>
  );
};
