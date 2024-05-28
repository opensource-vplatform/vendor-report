import {
  bind,
  EVENTS,
} from '../event/EventManager';
import { register as registerFuncs } from './functionRegister';

export const register = function (spread) {
    registerFuncs(spread);
};

export { registerFuncs };

export const init = function () {
    bind({
        event: EVENTS.OnSpreadInited,
        handler: (spread) => {
            //注册自定义函数
            registerFuncs(spread);
        },
    });
    bind({
        event: EVENTS.onSpreadJsonParsed,
        handler: (spread) => {
            //必须每次都注册，否则spread填充json后，自定义函数注册被清空
            registerFuncs(spread);
        },
    });
};
