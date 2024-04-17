import { genUUID } from './commonUtil';
import { isFunction } from './objectUtil';

const HANDLER_CONTIANER = {};

export const addCallback = function(onConfirm,onCancel){
    const callbackId = genUUID();
    const callback = {onConfirm,onCancel};
    HANDLER_CONTIANER[callbackId] = callback;
    return callbackId;
}

const handleCallback = function(callbackId,type,...args){
    const callback = HANDLER_CONTIANER[callbackId];
    if(callback){
        const handler = callback[type];
        if(isFunction(handler)){
            handler(...args);
        }
    }
}

export const handleConfirm = function(callbackId,...args){
    handleCallback(callbackId,"onConfirm",...args);
}

export const handleCancel = function(callbackId,...args){
    handleCallback(callbackId,"onCancel",...args);
}