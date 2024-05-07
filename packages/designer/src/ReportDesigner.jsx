/* import { StrictMode } from 'react'; */

import axios from 'axios';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from '@store/store';
import { saveAsImg } from '@utils/canvas2image';

import Designer from './Designer';
import { bind } from './event/EventManager';
import { genUUID } from './utils/commonUtil';
import { showConfirm } from './utils/messageUtil';

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
                <Designer conf={this.conf} />
            </Provider>
            /*  </StrictMode> */
        );
    }

    toImage(width, height) {
        saveAsImg(width, height);
    }
}

ReportDesigner.Utils = {
    md5: genUUID,
    RPC: axios,
    msg:{
        confirm:showConfirm,
    }
};

export default ReportDesigner;
