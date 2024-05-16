import { genUUID as md5 } from './commonUtil';
import axios from 'axios';
import {getExportPdfUrl} from './constant'

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

/**
 * 调用服务端导出PDF接口
 * @returns 
 */
export const exportPdf = function () {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: getExportPdfUrl(),
      responseType: 'blob'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
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