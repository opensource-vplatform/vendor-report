/* import { StrictMode } from 'react'; */

import axios from 'axios';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from '@store/store';
import { uuid } from '@toone/report-util';
import { saveAsImg } from '@utils/canvas2image';

import Designer from './Designer';
import { bind } from './event/EventManager';
import { showConfirm } from './utils/messageUtil';

let tooneReport = {
    isPreview: false,
    save: null,
    preview: null,
};

class ReportDesigner {
    conf = {};

    constructor(conf) {
        this.conf = conf;
        if (this.conf && this.conf.event) {
            const events = this.conf.event;
            for (let [event, handler] of Object.entries(events)) {
                bind({ event, handler });
            }
        }
    }

    mount(el) {
        GC.Spread.Common.CultureManager.culture('zh-cn');
        createRoot(el).render(
            /*  <StrictMode> */
            <Provider store={store}>
                <Designer
                    conf={this.conf}
                    onDesignerInited={function (options) {
                        tooneReport = { ...tooneReport, ...options };
                    }}
                />
            </Provider>
            /*  </StrictMode> */
        );
    }

    toImage(width, height) {
        saveAsImg(width, height);
    }
    getDesignReport() {
        if (typeof tooneReport.save === 'function') {
            return tooneReport.save();
        }
        return '';
    }
    //预览
    preview() {
        if (typeof tooneReport.preview === 'function') {
            tooneReport.preview();
            tooneReport.isPreview = true;
        }
    }

    //编辑
    edit() {
        if (typeof tooneReport.edit === 'function') {
            tooneReport.edit();
            tooneReport.isPreview = false;
        }
    }

    //打印
    print() {
        if (typeof tooneReport.print === 'function') {
            tooneReport.print();
        }
    }

    //下一页
    nextPage() {
        if (typeof tooneReport.nextPage === 'function') {
            tooneReport.nextPage();
        }
    }

    //上一页
    previousPage() {
        if (typeof tooneReport.previousPage === 'function') {
            tooneReport.previousPage();
        }
    }

    //跳转指定页数
    specifyPage(index) {
        if (typeof tooneReport.specifyPage === 'function') {
            tooneReport.specifyPage(index);
        }
    }
}

ReportDesigner.Utils = {
    md5: uuid,
    RPC: axios,
    msg: {
        confirm: showConfirm,
    },
};

export default ReportDesigner;
