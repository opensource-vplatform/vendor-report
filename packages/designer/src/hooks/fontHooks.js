import { useRef } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { setStyle } from '../utils/fontUtil.js';

export function useFontAction() {
    const dispatch = useDispatch();
    const {
        spread,
    } = useSelector(({ fontSlice }) => fontSlice);

    //将数据存储在cacheDatasRef，防止由于闭包问题获取不到正确的数据。例如spread初始值是null，_setFontAction方法获取到的永远是初始值
    const cacheDatasRef = useRef({ spread });
    cacheDatasRef.current.spread = spread;

    return function(params) {
        const { value, dispatchFun, attribute, dispatchParams, property } =
            params;
        const spread = cacheDatasRef.current.spread;
        debugger;
        const sheet = spread?.getActiveSheet?.();
        const selections = sheet?.getSelections?.();
        const sheetName = sheet?.name?.();
        spread.suspendPaint();
        try {
            setStyle({
                attribute,
                property,
                value,
                sheetName,
                selections,
                sheet,
                spread,
            });
            dispatch(dispatchFun(dispatchParams));
        } catch (e) {
            console.error(e);
        } finally {
            spread.resumePaint();
        }
        spread.focus(true);
    };
}