import {
  setErrorMsg,
  setWaitMsg,
} from '@store/appSlice/appSlice';

import { setConfirmMsg } from '../store/appSlice/appSlice';
import { addCallback } from './callbackUtil';

let _dispatch = null;

export const setDispatch = function (dispatch) {
    _dispatch = dispatch;
};

/**
 * 设置等待动画信息
 * @param {*} message
 */
export const showLoadingMessage = function (dispatch, message) {
    dispatch(setWaitMsg({ message }));
};

/**
 * 隐藏等待动画
 * @param {*} dispatch
 */
export const hideLoadingMessage = function (dispatch) {
    dispatch(setWaitMsg({ message: null }));
};

/**
 * 设置错误信息
 * @param {*} dispatch
 * @param {*} message
 */
export function showErrorMessage(dispatch, message) {
    hideLoadingMessage(dispatch);
    dispatch(setErrorMsg({ message }));
}

/**
 * 隐藏错误信息
 * @param {} dispatch
 */
export const hideErrorMessage = function (dispatch) {
    dispatch(setErrorMsg({ message: null }));
};

/**
 * 显示确认信息
 * @param {*} title
 * @param {*} message
 * @param {*} callback
 */
export const showConfirm = function (title, message, callback) {
    const callbackId = addCallback(callback, callback);
    _dispatch &&
        _dispatch(
            setConfirmMsg({
                title,
                message,
                callbackId,
            })
        );
};

window.showConfirm = showConfirm;
