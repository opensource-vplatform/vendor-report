import { createElement } from 'react';

import { createRoot } from 'react-dom/client';
import resourceManager from 'resource-manager-js';

import WorkBookApi from './api/WorkBook';
import { setBaseUrl } from './utils/environmentUtil';
import { download } from './utils/fileUtil';
import {
  getNamespace,
  getPluginSrc,
  withBatchCalcUpdate,
} from './utils/spreadUtil';
import Workbook from './Workbook';

/**
 * 报表预览
 * @class Preview
 * @example
 * var report = new TOONE.Report.Preview();
 * report.mount(document.getElementById('app'));
 * report.exportExcel("test.xlsx")
 */
class Report {
    conf = {};

    spread = null;

    printHandler = null;

    /**
     * @constructor
     * @param {Object} conf 配置信息<br/>
     * ready: Function<{@link WorkBook}> 初始化完成回调<br/>
     * enablePrint: Boolean 是否启用打印功能<br/>
     * json: Object 报表配置数据<br/>
     * license：String 报表许可证<br/>
     */
    constructor(conf) {
        this.conf = conf;
        if (conf.baseUrl) {
            setBaseUrl(conf.baseUrl);
        }
    }

    replacer(key, value) {
        //删除角标信息
        if (key === 'cornerFold' && value?.markType === 'table') {
            return undefined;
        }
        return value;
    }

    /**
     * 报表挂载
     * @param {DOMElement} el 挂载dom对象
     */
    mount(el) {
        const GC = getNamespace();
        GC.Spread.Common.CultureManager.culture('zh-cn');
        const { onInited, ready, dataSource, ...others } = this.conf || {};
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
        let json = this.conf?.json?.reportJson;
        if (json) {
            json = JSON.parse(JSON.stringify(json, this.replacer));
        }

        const { rowMerge, columnMerge } =
            this.conf?.json?.context?.tableDesignSlice || {};
        const { onFetchData } = this.conf?.event || {};
        const {
            sumColumns,
            tableGroups: groupColumns,
            rowMergeColumns = {},
            colMergeColumns = {},
        } = this.conf?.json?.context?.datasourceSlice || {};

        createRoot(el).render(
            createElement(Workbook, {
                onInited: onInitHandler,
                onPrintHandler: (handler) => {
                    this.printHandler = handler;
                },
                onFetchData,
                rowMerge,
                columnMerge,
                sumColumns,
                groupColumns,
                rowMergeColumns,
                colMergeColumns,
                dataSource,
                ...others,
                json,
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
                resourceManager.loadScript(getPluginSrc('excel')).then(() => {
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
                resourceManager.loadScript(getPluginSrc('pdf')).then(() => {
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
     * @description 报表打印，使用打印时，须在Preview初始化时将属性enablePrint设置为true
     * @param {Object} params 打印参数<br/>
     * showBorder：显示excel外边框
     * showColumnHeader：显示列头
     * showRowHeader：显示行头
     * showGridLine：显示网格线
     * 如未设置，则使用工作表内的配置值
     * @example
     * var report = new TOONE.Report.Preview({
     *  enablePrint: true
     * });
     * var promise = report.print();
     * promise.then(function(){
     *  //打印成功
     * }).catch(function(e){
     *  //错误处理
     * });
     * @returns Promise
     */
    print(params) {
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
