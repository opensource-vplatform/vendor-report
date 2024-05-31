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

