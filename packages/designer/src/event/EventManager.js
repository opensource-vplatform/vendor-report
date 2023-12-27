export const EVENTS = {
    /**
     * 选择变更事件
     */
    SelectionChanging:"SelectionChanging",
    /**
     * 选择变更后事件
     */
    SelectionChanged:"SelectionChanged",
};

const check = function (params) {
    const { event } = params;
    if (!EVENTS[event]) {
        throw Error(`不支持[${event}]事件，请检查！`);
    }
};

const EVENT_HANDLER_MAP = {};

/**
 * 绑定事件
 * @param {event: 事件名称,handler:事件回调} params
 */
export const bind = function (params) {
    check(params);
    const { event, handler } = params;
    const handlers = EVENT_HANDLER_MAP[event] || [];
    if (handlers.indexOf(handler) == -1) {
        handlers.push(handler);
    }
    EVENT_HANDLER_MAP[event] = handlers;
};

/**
 * 取消绑定事件
 * @param {event:事件名称,handler:事件回调} params 
 */
export const unbind = function (params) {
    check(params);
    const { event, handler } = params;
    const handlers = EVENT_HANDLER_MAP[event];
    if (handlers&&handlers.indexOf(handler) !== -1) {
        handlers.splice(handlers.indexOf(handler),1);
    }
};

/**
 * 触发事件
 * @param {event:事件名称,args:事件参数} params 
 */
export const fire = function (params) {
    check(params);
    const {event,args} = params;
    const handlers = EVENT_HANDLER_MAP[event];
    if(handlers&&handlers.length>0){
        for (let index = 0; index < handlers.length; index++) {
            const handler = handlers[index];
            try{
                handler(args);
            }catch(e){
                handler(null,e);
            }
        }
    }
};
