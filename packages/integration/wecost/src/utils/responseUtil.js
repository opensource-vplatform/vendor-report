const BUSINESS_ERROR = [
    {
        min: 40000,
        max: 49999,
    },
];

/**
 * 是否有异常
 * @param {*} data
 * @returns
 */
const hasError = function (data) {
    return data.success === false;
};

/**
 * 判断是否为业务异常
 * @param {*} data
 * @returns
 */
const isBusinessError = function (data) {
    const errorCode = data.errorCode;
    if (!isNaN(errorCode)) {
        const errorNum = parseInt(errorCode);
        for (let i = 0; i < BUSINESS_ERROR.length; i++) {
            const err = BUSINESS_ERROR[i];
            if (errorNum >= err.min && errorNum <= err.max) {
                return true;
            }
        }
    }
    return false;
};

const getErrorDetail = function(data){
    let detail = data?.data?.errorDetail?.allStackMsg;
    if(!detail){
        detail = data.msg || data.message || '';
    }
    return detail;
}

/**
 * 获取异常信息
 * @param {*} data
 * @param {*} defMsg
 */
const getErrorMsg = function (data, defMsg) {
    if (isBusinessError(data)) {
        return {
            title: data.title || defMsg,
            detail: getErrorDetail(data),
        };
    } else {
        return {
            title: defMsg,
            detail: getErrorDetail(data),
        };
    }
};

const getError = function (data, defMsg) {
    if (hasError(data)) {
        return getErrorMsg(data, defMsg);
    } else if (data.data) {
        return getError(data.data, defMsg);
    } else {
        return null;
    }
};

export const getData = function (data, attr, deepFirst = false) {
    if (!data) {
        return null;
    }
    if (deepFirst) {
        let result = null;
        if (data.data) {
            result = getData(data.data, attr, deepFirst);
        }
        if (!result) {
            result = data[attr] || null;
        }
        return result;
    } else {
        const result = data[attr];
        if (result) {
            return result;
        } else if (data.data) {
            return getData(data.data, attr, deepFirst);
        }
    }
    return null;
};

export const handleReponseError = function (err, setData, data) {
    setData({
        ...data,
        loadMsg: null,
        errorMsg:
            err?.code == 'ERR_NETWORK' || err?.response?.status == 404
                ? '网络连接异常'
                : err?.response?.data?.msg ??
                  err?.response?.data?.data?.msg ??
                  err.message,
    });
};

const getResponseMsg = function (err) {
    return err?.code == 'ERR_NETWORK' || err?.response?.status == 404
        ? '网络连接异常'
        : err?.response?.data?.msg ??
              err?.response?.data?.data?.msg ??
              err.message;
};

export const genResponseErrorCallback = function (reject) {
    return (err) => reject(new Error(getResponseMsg(err)));
};

export const handleError = function (response, reject, defMsg) {
    const error = getError(response, defMsg);
    if (error != null) {
        const err = new Error(error.title);
        err.detail = error.detail;
        reject(err);
        return true;
    }
    return false;
};
