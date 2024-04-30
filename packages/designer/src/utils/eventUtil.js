import {
  EVENTS,
  fire,
} from '@event/EventManager';

import {
  hideLoadingMessage,
  showErrorMessage,
  showLoadingMessage,
} from './messageUtil';

export const fireCellEnter = function (spread) {
    const sheet = spread.getActiveSheet();
    if (sheet) {
        const col = sheet.getActiveColumnIndex();
        const row = sheet.getActiveRowIndex();
        const sheetName = sheet.name();
        const arg = { row, col, sheet, sheetName };
        fire({
            event: EVENTS.EnterCell,
            args: [arg],
        });
    }
};

export const handleEventPrmiseResult = function (
    result,
    dispatch,
    waitMsg,
    eventName
) {
    return new Promise((resolve, reject) => {
        if (result.length > 0) {
            showLoadingMessage(dispatch, waitMsg);
            const promise = result[0];
            if (promise instanceof Promise) {
                promise
                    .then((data) => {
                        hideLoadingMessage(dispatch);
                        resolve(data);
                    })
                    .catch((e) => {
                        showErrorMessage(
                            dispatch,
                            typeof e == 'string'
                                ? e
                                : e.message
                                  ? e.message
                                  : null
                        );
                        reject();
                    });
            } else {
                throw Error(
                    eventName +
                        '事件回调返回值不正确，期望：Promise实例，实际：' +
                        typeof promise
                );
            }
        }
    });
};
