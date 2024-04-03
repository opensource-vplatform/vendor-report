import { genUUID } from '../utils/commonUtil';

export const EVENTS = {
    /**
     * 选择变更事件
     */
    SelectionChanging:"SelectionChanging",
    /**
     * 选择变更后事件
     */
    SelectionChanged:"SelectionChanged",
    /**
     * 保存
     */
    onSave: "onSave",
    /**
     * 激活工作表变更事件
     */
    ActiveSheetChanged: "ActiveSheetChanged",

    EditorStatusChanged: "EditorStatusChanged",

    EnterCell: "EnterCell",

    /**
     * 初始化后事件
     */
    Inited: "Inited",
};

const check = function (params) {
    const { event } = params;
    if (!EVENTS[event]) {
        throw Error(`不支持[${event}]事件，请检查！`);
    }
};
const checkId = function(params){
    const { id } = params;
    if (id === undefined) {
        throw Error(`未传递id值，请检查！`);
    }
}

/**
 * {
 *  [event]:{
 *      [id]:handler
 *  } 
 * }
 */
const EVENT_HANDLER_MAP = {};

/**
 * 绑定事件
 * @param {
 *  id: 回调唯一标识，标识相同会被覆盖，取消绑定时使用该标识定位回调
 *  event: 事件名称,
 *  handler:事件回调
 *  } params
 */
export const bind = function (params) {
    check(params);
    const { id=genUUID(),event, handler } = params;
    const handlers = EVENT_HANDLER_MAP[event] || {};
    handlers[id] = handler
    EVENT_HANDLER_MAP[event] = handlers;
    if(SPREAD_INITED&&event === EVENTS.Inited){
        //解决热更新时，Inited事件不再触发引发的一系列问题
        handler(SPREAD);
    }
    return ()=>{
        unbind({
            id,event
        });
    }
};

/**
 * 取消绑定事件
 * @param {
 *  id: 回调唯一标识
 *  event:事件名称
 * } params 
 */
export const unbind = function (params) {
    check(params);
    checkId(params);
    const { id, event } = params;
    const handlers = EVENT_HANDLER_MAP[event];
    if (handlers) {
        handlers[id] = undefined;
        delete handlers[id];
    }
};

let SPREAD_INITED = false

let SPREAD = null;

/**
 * 触发事件
 * @param {event:事件名称,args:事件参数} params 
 */
export const fire = function (params) {
    check(params);
    const {event,args} = params;
    const handlers = EVENT_HANDLER_MAP[event];
    const result = [];
    if(handlers){
        for(let [id,handler] of Object.entries(handlers)){
            try{
                result.push(handler.apply(handler,args));
            }catch(e){
                handler(null,e);
            }
        }
    }
    if(event == EVENTS.Inited){
        SPREAD_INITED = true;
        SPREAD = args[0];
    }
    return result;
};
