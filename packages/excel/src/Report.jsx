import { createElement } from 'react';

import { createRoot } from 'react-dom/client';
import resourceManager from 'resource-manager-js';

import WorkBookApi from './api/WorkBook';
import { download } from './utils/fileUtil';
import {
  getNamespace,
  withBatchCalcUpdate,
} from './utils/spreadUtil';
import Workbook from './Workbook';

/**
 * 报表
 * @class Report
 * @example
 * var report = new TOONE.Report.Preview();
 * report.mount(document.getElementById('app'));
 * report.exportExcel("test.xlsx")
 */
class Report {
    conf = {};

    spread = null;

    printHandler = null;

    constructor(conf) {
        this.conf = conf;
    }

    /**
     * 报表挂载
     * @param {DOMElement} el 挂载dom对象
     */
    mount(el) {
        const GC = getNamespace();
        GC.Spread.Common.CultureManager.culture('zh-cn');
        const { onInited, ready, ...others } = this.conf;
        const onInitHandler = (spread) => {
            this.spread = spread;
            if (onInited) {
                onInited(spread);
            }
            if (typeof ready == 'function') {
                withBatchCalcUpdate(spread, () => {
                    ready(new WorkBookApi(spread));
                });
            }
        };
        createRoot(el).render(
            createElement(Workbook, {
                onInited: onInitHandler,
                onPrintHandler: (handler) => {
                    this.printHandler = handler;
                },
                ...others,
            })
        );
    }

    /**
     * 导出excel
     * @param {String} filename 导出excel名称
     * @param {Object=} options 导出配置<br/>ignoreFormula：忽略公式<br/>ignoreStyle：忽略样式<br/>
     * @returns Promise
     */
    exportExcel(
        filename,
        options = { ignoreFormula: false, ignoreStyle: false }
    ) {
        return new Promise((resolve, reject) => {
            if (typeof filename == 'string' && filename.trim() !== '') {
                filename = filename.endsWith('.xlsx')
                    ? filename
                    : filename + '.xlsx';
                resourceManager
                    .loadScript(['vendor/plugins/excelio.min.js'])
                    .then(() => {
                        const GC = getNamespace();
                        const excelIO = new GC.Spread.Excel.IO();
                        const json = JSON.stringify(this.spread.toJSON());
                        excelIO.save(
                            json,
                            (blob) => {
                                download(blob, filename);
                                resolve();
                            },
                            (err) => {
                                reject(err);
                            },
                            {
                                columnHeadersAsFrozenRows: false,
                                includeAutoMergedCells: false,
                                includeBindingSource: false,
                                includeCalcModelCache: false,
                                includeEmptyRegionCells: true,
                                includeFormulas: !options.ignoreFormula,
                                includeStyles: !options.ignoreStyle,
                                includeUnusedNames: true,
                                password: undefined,
                                rowHeadersAsFrozenColumns: false,
                                saveAsView: false,
                            }
                        );
                    });
            } else {
                reject(Error('导出excel失败，原因:没有传递导出文件名'));
            }
        });
    }

    /**
     * 导出pdf
     * @param {String} filename 导出pdf文件名称
     * @param {Object=} options 导出配置<br/>author：作者<br/>creator：创建者<br/>keywords：关键字<br/>subject：主题<br/>title：标题<br/>sheetIndex：导出工作表下标，如未设置，则导出全部
     * @returns Promise
     */
    exportPdf(
        filename,
        options = {
            author: '',
            creator: '',
            keywords: '',
            subject: '',
            title: '',
            sheetIndex: null,
        }
    ) {
        return new Promise((resolve, reject) => {
            if (typeof filename == 'string' && filename.trim() !== '') {
                filename = filename.endsWith('.pdf')
                    ? filename
                    : filename + '.pdf';
                resourceManager
                    .loadScript([
                        'vendor/plugins/print.min.js',
                        'vendor/plugins/pdf.min.js',
                    ])
                    .then(() => {
                        this.spread.savePDF(
                            (data) => {
                                download(data, filename);
                                resolve();
                            },
                            (err) => {
                                reject(err);
                            },
                            {
                                author: options.auther,
                                creator: options.application,
                                keywords: options.keyword,
                                subject: options.subject,
                                title: options.title,
                            },
                            options.sheetIndex == null
                                ? undefined
                                : options.sheetIndex
                        );
                    });
            } else {
                reject(Error('导出pdf失败，原因:没有传递导出文件名'));
            }
        });
    }
    /**
     * 打印
     */
    print(
        params = {
            showBorder: false,
            showColumnHeader: true,
            showRowHeader: true,
            showGridLine: true,
        }
    ) {
        return new Promise((resolve, reject) => {
            if (this.printHandler) {
                this.printHandler(params).then(resolve).catch(reject);
            } else {
                reject(Error('打印失败，原因：报表未初始化'));
            }
        });
    }
}

export default Report;
