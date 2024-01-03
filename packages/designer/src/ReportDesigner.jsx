import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from '@store/store';
import {
  getLicense,
  setLicense,
} from '@utils/licenseUtil';
import { getNamespace } from '@utils/spreadUtil';

import Designer from './Designer';

class ReportDesigner {
    conf = {};

    constructor(conf) {
        this.conf = conf;
    }

    async mount(el) {
        if(this.conf&&this.conf.license){
            setLicense(this.conf.license);
        }
        const GC = getNamespace();
        const license = getLicense();
        if(license){
            GC.Spread.Sheets.LicenseKey = license;
        }
        GC.Spread.Common.CultureManager.culture('zh-cn');
        createRoot(el).render(
            <StrictMode>
                <Provider store={store}>
                    <Designer />
                </Provider>
            </StrictMode>
        );
    }
}

export default ReportDesigner;
