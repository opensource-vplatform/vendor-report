import { createRoot } from 'react-dom/client';
import resourceManager from 'resource-manager-js';

import { download } from './utils/fileUtil';
import { getNamespace } from './utils/spreadUtil';
import Workbook from './Workbook';

class Report {
    conf = {};

    constructor(conf) {
        this.conf = conf;
    }

    mount(el) {
        GC.Spread.Common.CultureManager.culture('zh-cn');
        createRoot(el).render(<Workbook {...this.conf}></Workbook>);
    }

    /**
     * 导出excel
     */
    exportExcel(filename, cfg = { ignoreFormula: false, ignoreStyle: false }) {
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
                        const json = JSON.stringify(spread.toJSON());
                        excelIO.save(
                            json,
                            (blob) => {
                                download(blob, filename + '.xlsx');
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
                                includeFormulas: !cfg.ignoreFormula,
                                includeStyles: !cfg.ignoreStyle,
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
     */
    exportPdf(
        filename,
        data = {
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
                        spread.savePDF(
                            (data) => {
                                download(data, filename);
                                resolve();
                            },
                            (err) => {
                                reject(err);
                            },
                            {
                                author: data.auther,
                                creator: data.application,
                                keywords: data.keyword,
                                subject: data.subject,
                                title: data.title,
                            },
                            data.sheetIndex == null
                                ? undefined
                                : data.sheetIndex
                        );
                    });
            } else {
                reject(Error('导出pdf失败，原因:没有传递导出文件名'));
            }
        });
    }
}

export default Report;
