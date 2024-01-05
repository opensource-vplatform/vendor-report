import { getNamespace } from './spreadUtil';

const LICENSE_127 = '127.0.0.1|localhost,219775434953547#B1rUeINVNvhFez5Eb5Qzaq9UWIpWdDZjWll4Lo9Wb4tSSihzK0pUQPVHT6xWaVVTUJd6L834Qn9mUpd4SZJ6S8JEVy24LOd6MvgGT5R4LwAleVt4MTdjc58Eb7NmSxYkcDd5LXNje6AHSBJESyUzVJZkMQRzbXhDbaBHS6klMQBlTQdHduJTWnJzKL3iM0VWdmZVOEdFeGRXQYVzb5cjeNplaoB7M7hHcrklVCB7aUF5R9cXWQ96TrMUYTtie73ka5QkWqV4aVZVRvcmMyMTQygUe9lTcTlmd0FEWp9kR8Q5UrskWMFTRPdFRyMHdzgjcj56MPdWSwRVN8MkI0IyUiwiI4QzQBJDNwYjI0ICSiwCOxkTM9cTOyEjM0IicfJye&Qf35VficFVDplI0IyQiwiI6EjL6ByUKBCZhVmcwNlI0IiTis7W0ICZyBlIsICNzMTM6ADIzATMwQjMwIjI0ICdyNkIsICdz3GasF6YvxGLx8CMuAjL7ITMiojIz5GRiwiI8+Y9sWY9QmZ0Jyp93uL9hKI0Aqo9Re09byp9MCZ9iojIh94QiwiI7QTNzUTO4MDN5czN9EjMiojIklkIs4XXbpjInxmZiwSZzxWYmpjIyNHZisnOiwmbBJye0ICRiwiI34TUv54Khl4NyU7TltCSkZEWYdDNCRlNMlWVXZjcWFlcud6d5Vkd4JDeu5mdphDUHRER99ESVtGZFN6KupGNPdVVvdUQMhVSW5GOGVHbrNTVvQESxFGNBllZBtG4w';

let LICENSE = null;

const isLocalhost = function(){
    const reg = /^(127\.0\.0\.1|localhost)/g;
    const hostname = location.hostname;
    return reg.test(hostname)
}

/**
 * 设置许可证
 * @param {*} license
 */
export const setLicense = function (license) {
    LICENSE = license;
};

/**
 * 获取许可证
 * @returns
 */
export const getLicense = function () {
    if (LICENSE) {
        return LICENSE;
    }
    /*const hostname = location.hostname;
    if (REG_IP_LOCAL.test(hostname)||hostname=="") {
        return LICENSE_127;
    }*/
    return LICENSE_127;
};

export const checkLicense = function () {
    const GC = getNamespace();
    try {
        const spread = new GC.Spread.Sheets.Workbook();
        spread.getSheet(0).setValue(0, 0, 'test');
    } catch (e) {
        return {
            success: false,//失败
            showError: true,//会引发spreadjs报错
        };
    }
    if (isLocalhost()) {
        return {
            success: false,//失败
            showWarn: true,//不会引发spreadjs报错
        };
    }
    return {
        success: true//成功
    }
};
