import { isArray } from '@toone/report-util';
import { error } from '@utils/consoleUtil';

/**
 * 本文件中提供全局事件注册
 */

const CtrlKey = 'CtrlKey';

/**
 * 事件存储器
 * Array<{
 *  criteria:Array<"CtrlKey"|Array<String>|'z'|'Z'>,
 *  handler:Function
 * }>
 */
const Container = [];

function getOS() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (userAgent.indexOf('Windows NT') > -1) {
        return 'Windows';
    }
    if (userAgent.indexOf('Mac OS X') > -1) {
        return 'Mac';
    }
    if (userAgent.indexOf('Linux') > -1) {
        return 'Linux';
    }
    if (/Android/.test(userAgent)) {
        return 'Android';
    }
    if (/like Mac OS X/.test(userAgent)) {
        return 'iOS';
    }

    return 'Unknown';
}

const testCriteria = function (criteria, evt) {
    if (criteria == CtrlKey) {
        return getOS() == 'Mac' ? evt.metaKey : evt.ctrlKey;
    } else {
        return evt.key === criteria;
    }
};

const testOrCriteria = function (criterias, evt) {
    if (criterias && criterias.length > 0) {
        for (let i = 0; i < criterias.length; i++) {
            const cria = criterias[i];
            if (testCriteria(cria, evt)) {
                return true;
            }
        }
    }
    return false;
};

const testAndCriteria = function (criterias, evt) {
    if (criterias && criterias.length > 0) {
        for (let i = 0; i < criterias.length; i++) {
            const cria = criterias[i];
            let flag = isArray(cria)
                ? testOrCriteria(cria, evt)
                : testCriteria(cria, evt);
            if (!flag) {
                return false;
            }
        }
    }
    return true;
};

const testCriterias = function (criterias, evt) {
    return testAndCriteria(criterias, evt);
};

window.addEventListener('keydown', (evt) => {
    Container.forEach((unit) => {
        try {
            const { criterias, handler } = unit;
            if (testCriterias(criterias,evt)) {
                handler(evt);
            }
        } catch (e) {
            error(e);
        }
    });
});

/**
 * 添加事件监听
 * @param {*} criterias
 * @param {*} handler
 */
const addListen = function (criterias, handler) {
    Container.push({
        criterias,
        handler,
    });
    return () => {
        unListen(handler);
    };
};

/**
 * 取消监听
 * @param {*} handler
 */
const unListen = function (handler) {
    const unit = Container.find((unit) => unit.handler === handler);
    const index = Container.indexOf(unit);
    Container.splice(index, 1);
};

/**
 * 全局监听保存事件
 * @param {*} handler
 * @returns 取消监听回调
 */
export const listenSave = function (handler) {
    return addListen([CtrlKey, ['s', 'S']], handler);
};

/**
 * 全局监听撤销事件
 * @param {*} handler
 * @returns 取消监听回调
 */
export const listenUndo = function (handler) {
    return addListen([CtrlKey, ['z', 'Z']], handler);
};

/**
 * 全局监听重做事件
 * @param {*} handler
 * @returns 取消监听回调
 */
export const listenRedo = function (handler) {
    return addListen([CtrlKey, ['y', 'Y']], handler);
};
