import { genUUID as md5 } from './commonUtil';
import axios from 'axios';

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
 * Registers a server-hosted font with the PDF fonts manager.
 *
 * @param {string} name - The name of the font to register.
 * @param {string} type - The type of the font (e.g. 'regular', 'bold', 'italic').
 * @param {string} serverPath - The URL of the font file on the server.
 * @returns {Promise<void>} A Promise that resolves when the font has been successfully registered.
 */
export const registerServerFont = function (name, type, serverPath) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: serverPath,
      responseType: 'blob'
    }).then(res => {
      const blob = res.data;
      //将Blob 对象转换成 ArrayBuffer
      const reader = new FileReader();
      reader.onload = function () {
        const fontrrayBuffer = reader.result;
        const fonts = GC.Spread.Sheets.PDF.PDFFontsManager.getFont(name) || {};
        fonts[type] = fontrrayBuffer;
        GC.Spread.Sheets.PDF.PDFFontsManager.registerFont(name, fonts);
        resolve();
      }
      reader.readAsArrayBuffer(blob);
    }).catch(err => reject(err))
  })
}