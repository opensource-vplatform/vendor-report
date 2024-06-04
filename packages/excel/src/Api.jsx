import Dev from './Dev';
import {
  Report,
  Workbook as WorkBook,
  Worksheet as WorkSheet,
} from './Index';

let DEV_DEFINEF = null;

const injectDev = function (dev) {
    DEV_DEFINEF = dev;
};

const parseDev = function (devScript) {
    try {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.textContent = devScript;
        document.head.appendChild(script);
        return DEV_DEFINEF;
    } finally {
        DEV_DEFINEF = null;
    }
};

export default {
    Preview: Report,
    WorkBook,
    WorkSheet,
    Dev,
    injectDev,
    parseDev,
};
