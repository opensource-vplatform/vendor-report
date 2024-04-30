import { genUUID } from './commonUtil';
import { isFunction } from './objectUtil';

const HANDLER_CONTIANER = {};

export const addCallback = function(onConfirm,onCancel,autoDestroy=true){
    const callbackId = genUUID();
    const callback = {onConfirm,onCancel,autoDestroy};
    HANDLER_CONTIANER[callbackId] = callback;
    return callbackId;
}

const handleCallback = function(callbackId,type,...args){
    const callback = HANDLER_CONTIANER[callbackId];
    if(callback){
        const handler = callback[type];
        const autoDestroy = callback.autoDestroy;
        if(isFunction(handler)){
            handler(...args);
        }
        if(autoDestroy){
            delete HANDLER_CONTIANER[callbackId];
        }
    }
}

export const handleConfirm = function(callbackId,...args){
    handleCallback(callbackId,"onConfirm",...args);
}

export const handleCancel = function(callbackId,...args){
    handleCallback(callbackId,"onCancel",...args);
}