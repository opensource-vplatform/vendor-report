const EventNames = [
    /**
     * 工作薄初始化事件
     */
    'OnSpreadInited',
    /**
     * 工作表初始化事件
     */
    'OnSheetInited',
    /**
     * 工作簿json解析后事件
     */
    'OnSpreadJsonParsed',
];

export const EVENTS = {};

EventNames.forEach((name) => {
    EVENTS[name] = name;
});

const check = function (params) {
    const { event } = params;
    if (!EVENTS[event]) {
        throw Error(`不支持[${event}]事件，请检查！`);
    }
};

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
    const { event, handler } = params;
    const handlers = EVENT_HANDLER_MAP[event] || [];
    handlers.push(handler);
    EVENT_HANDLER_MAP[event] = handlers;
    return () => {
        unbind(params);
    };
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
    const { event, handler } = params;
    const handlers = EVENT_HANDLER_MAP[event];
    if (handlers) {
        const index = handlers.indexOf(handler);
        if (index != -1) {
            handlers.splice(index, 1);
        }
    }
};

/**
 * 触发事件
 * @param {event:事件名称,args:事件参数} params
 */
export const fire = function (params) {
    check(params);
    const { event, args } = params;
    const handlers = EVENT_HANDLER_MAP[event];
    const result = [];
    if (handlers) {
        for (let handler of handlers) {
            try {
                result.push(handler.apply(handler, args));
            } catch (e) {
                handler(null, e);
            }
        }
    }
    return result;
};

/**
 * 是否有绑定事件
 * @param {*} params
 */
export const hasBind = function (params) {
    check(params);
    const { event } = params;
    const handlers = EVENT_HANDLER_MAP[event];
    return handlers && handlers.length > 0;
};
