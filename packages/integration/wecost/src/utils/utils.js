import { genUUID as md5 } from './commonUtil';
import axios from 'axios';
import { getExportPdfUrl, getExportPdfProgressUrl } from './constant'

const urlSearchParams = new URLSearchParams(window.location.search);
const host = window.location.origin;
const ctxPathKey = "ctxPath"

export const getParameter = function (key) {
  return urlSearchParams.get(key);
}

export const getReportId = function () {
  return urlSearchParams.get("id") || md5();
}

export const getHost = function () {
  const ctxPath = getParameter(ctxPathKey);
  return ctxPath ? host + '/' + ctxPath : host;
}

export const getTitle = function (def) {
  return getParameter("reportTitle") || def;
}

export const parameterToUrl = function (except) {
  except = except || [];
  const url = [];
  for (const [key, value] of urlSearchParams.entries()) {
    if (except.indexOf(key) == -1) {
      url.push(`${key}=${encodeURIComponent(value)}`);
    }
  }
  return url.join('&')
}

/**  创建一个Axios实例
     默认返回类型为 blob
 **/
const instance = axios.create({
  responseType: 'blob' // 默认设置为'blob'
});


instance.interceptors.response.use(response => {
  const contentType = response.headers['content-type'];
  if (contentType && contentType.includes('application/json')) {
    // 如果响应是JSON，尝试将其解析为JSON对象
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const json = JSON.parse(reader.result);
          resolve({ ...response, data: json });
        } catch (e) {
          reject(e);
        }
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsText(response.data);
    });
  }
  return response;
}, error => {
  return Promise.reject(error);
});

/**
 * 调用服务端导出PDF接口
 * @returns 
 */
export const exportPdf = function (fileId) {

  // 示例请求
  return new Promise((resolve, reject) => {
    instance.get(getExportPdfUrl(fileId))
      .then(response => {
        if (response.data instanceof Blob && response.data.type === 'application/json') {
          // 如果Blob的内容类型是JSON，解析JSON
          const reader = new FileReader();
          reader.onload = () => {
            const json = JSON.parse(reader.result);
            console.log(json);
          };
          reader.readAsText(response.data);
        } else {
          // 正常处理Blob
          resolve(response.data);
        }
      })
      .catch(error => {
        reject(error)
      });
  })
}

function triggerClick(ele) {
  try {
    ele.dispatchEvent(new MouseEvent("click"))
  } catch (e) {
    const n = document.createEvent("MouseEvents");
    ele.dispatchEvent(n)
  }
}

/**
 * 下载流文件
 * @param {*} data 流数据
 * @param {*} filename 文件名称
 */
export function download(data, filename) {
  const url = window.URL || window.webkitURL;
  const ele = document.createElement("a");
  ele.download = filename;
  ele.rel = "noopener";
  if (typeof data == 'string') {
    ele.href = data;
    if (ele.origin == window.location.origin) {
      triggerClick(ele);
    } else if (check(ele.href)) {
      console.error('导出文件出现错误！');
    } else {
      ele.target = '_blank';
      triggerClick(ele);
    }
  } else {
    ele.href = url.createObjectURL(data);
    setTimeout(function () {
      url.revokeObjectURL(ele.href)
    }, 40000);
    setTimeout(function () {
      triggerClick(ele)
    }, 0);
  }
}

/**
 * 请求参数配置
 */
const getRequestParams = {
  queryReportConfig: {
    id: getReportId(),
    bizParams: getParameter("bizParams") || "",
    reportTitle: getTitle("报表"),
  },
  getTableData: {
    id: getReportId(),
    bizParams: getParameter("bizParams") || "",
    reportTitle: getTitle("报表"),
  },
  queryMetadatas: {
    id: getReportId(),
    bizParams: getParameter("bizParams") || "",
    reportTitle: getTitle("报表"),
  },
  saveReportConfig: {
    id: getReportId(),
    bizParams: getParameter("bizParams") || "",
    reportTitle: getTitle("报表"),
  }
}

/**
 * 请求本地数据接口
 * @param {*} action 请求类型
 * @param {*} options 额外参数
 * @returns 
 */
export const request = function (action, options = {}) {
  return new Promise((resolve) => {
    const requestJson = JSON.stringify({
      action,
      ...(getRequestParams[action] || {}),
      ...options
    });
    java({
      request: requestJson,
      onSuccess: function (response) {
        try {
          resolve(JSON.parse(response));
        } catch (e) {
          console.log("请求失败：" + e);
        }
      }
    })
  })
}

let fontFamilies = {}

export const getFontFamily = async () => {
  if (Object.keys(fontFamilies).length == 0) {
    const res = await request('queryAvailableFonts')
    const fonts = res?.data?.fonts || [];
    fontFamilies = {
      fonts,
      defaultFont: fonts[0]
    }
  }
  return fontFamilies
}
/**
 * 
 * @param {*} name 注册字体名称
 * @param {*} type 注册类型
 * @returns 
 */
export const registerFont = function (name, type) {
  let downloadFont = name;
  if (fontFamilies.fonts.indexOf(name) == -1) {
    downloadFont = fontFamilies.defaultFont
  }
  return new Promise(async (resolve) => {
    try {
      const fontContentRes = await request('getFontContent', { fontName: downloadFont })
      const fontrrayBuffer = base64ToArrayBuffer(fontContentRes?.data?.content);
      const fonts = GC.Spread.Sheets.PDF.PDFFontsManager.getFont(name) || {};
      fonts[type] = fontrrayBuffer;
      GC.Spread.Sheets.PDF.PDFFontsManager.registerFont(name, fonts);
      resolve();
    } catch (e) {
      console.log(e);
      resolve()
    }
  })
}

/**
 * base64 转 ArrayBuffer
 * @param {*} base64 base64字符串
 * @returns 
 */
const base64ToArrayBuffer = function (base64) {

  const binaryString = atob(base64);


  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
}
