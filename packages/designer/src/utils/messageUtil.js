import {
  setErrorMsg,
  setWaitMsg,
} from '@store/appSlice/appSlice';

/**
 * 设置等待动画信息，message为null时隐藏等待动画
 * @param {*} message 
 */
export const showLoadingMessage = function(dispatch,message){
    dispatch(setWaitMsg({ message }));
}

/**
 * 设置错误信息，message为null时隐藏错误信息
 * @param {*} dispatch 
 * @param {*} message 
 */
export function showErrorMessage(dispatch, message) {
  dispatch(setWaitMsg({ message: null }));
  dispatch(setErrorMsg({ message }));
}