import { useMemo } from 'react';

import Print from './Print';
import ParseReportJson from './template/ParseReportJson';
import {
  getLicense,
  setLicense,
} from './utils/licenseUtil';
import { getNamespace } from './utils/spreadUtil';
import WorkbookItem from './WorkbookItem';

export default function (props) {
    const {
        enablePrint = false,
        onPrintHandler,
        onExportExcelHandler,
        license,
        dataSource,
        json: _json,
        template,
        setting,
    } = props;
    if (license) {
        setLicense(license);
    }
    const GC = getNamespace();

    const licenseKey = getLicense();
    if (licenseKey) {
        GC.Spread.Sheets.LicenseKey = licenseKey;
    }

    const { json, inst } = useMemo(() => {
        let json = null;
        let inst = null;
        if (_json) {
            json = JSON.parse(JSON.stringify(_json));
            if (json && dataSource) {
                inst = new ParseReportJson({
                    reportJson: json,
                    datas: dataSource,
                    tempConfig: template,
                    setting,
                });
                const item = localStorage.getItem('storeSpreadJson');
                if (item) {
                    localStorage.setItem('spreadJson', JSON.stringify(json));
                }
            }
        }

        return {
            json,
            inst,
        };
    }, [_json, dataSource, JSON.stringify(template), JSON.stringify(setting)]);

    const handlePrint = (printInfos) => {
        if (onPrintHandler) {
            onPrintHandler((params) => {
                return new Promise((resolve, reject) => {
                    if (!enablePrint) {
                        reject(
                            Error('打印失败，原因：初始化报表时未开启打印功能')
                        );
                        return;
                    }
                    resolve({
                        print: printInfos.show,
                        exportExcel: printInfos.exportExcel,
                    });
                });
            });
        }
        if (onExportExcelHandler) {
            onExportExcelHandler((params) => {
                return new Promise((resolve, reject) => {
                    resolve({
                        exportExcel: printInfos.exportExcel,
                    });
                });
            });
        }
    };

    return (
        <>
            <Print
                onInited={(printInfos) => {
                    handlePrint(printInfos);
                }}
                license={license}
                enablePrint={enablePrint}
                dataSource={dataSource}
                json={json}
                inst={inst}
            ></Print>
            <WorkbookItem
                {...props}
                onPrintHandler={null}
                inst={inst}
                json={json}
            ></WorkbookItem>
        </>
    );
}
