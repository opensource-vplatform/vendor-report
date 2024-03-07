import {
  useEffect,
  useRef,
  useState,
} from 'react';

import resourceManager from 'resource-manager-js';

import { register } from './custom/index';
import LicenseError from './LicenseError';
import LicenseWarn from './LicenseWarn';
import { withDivStyled } from './utils/componentUtil';
import {
  checkLicense,
  getLicense,
  setLicense,
} from './utils/licenseUtil';
import {
  getNamespace,
  getPluginSrc,
  withBatchCalcUpdate,
} from './utils/spreadUtil';

const Wrap = withDivStyled({
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'visible',
    userSelect: 'none',
});

const ExcelWrap = withDivStyled({
    width: '100%',
    height: '100%',
    overflow: 'visible',
    userSelect: 'none',
});

const bindEvent = function (spread, typeName, handler) {
    if (handler) {
        const GC = getNamespace();
        const type = GC.Spread.Sheets.Events[typeName];
        spread.bind(type, handler);
    }
};

export default function (props) {
    const {
        newTabVisible = true,
        tabEditable = true,
        tabStripVisible = true,
        onInited,
        onEnterCell,
        onActiveSheetChanged,
        onValueChanged,
        onSelectionChanged,
        onSelectionChanging,
        license,
        enablePrint = false,
        json = null,
        onPrintHandler,
        children,
    } = props;
    if (license) {
        setLicense(license);
    }
    const GC = getNamespace();
    const licenseKey = getLicense();
    if (licenseKey) {
        GC.Spread.Sheets.LicenseKey = licenseKey;
    }
    const [data] = useState(() => {
        const result = checkLicense();
        let showError = false,
            showWarn = false;
        if (!result.success) {
            showError = result.showError;
            showWarn = result.showWarn;
        }
        return {
            spread: null,
            showError: showError,
            showWarn: showWarn,
        };
    });

    const el = useRef(null);
    useEffect(() => {
        if (el.current && !data.showError) {
            let plugins = [];
            if (enablePrint) {
                plugins = plugins.concat(getPluginSrc('print'));
            }
            const handler = () => {
                let spread = null;
                const unInited = !data.spread;
                if (unInited) {
                    const GC = getNamespace();
                    spread = new GC.Spread.Sheets.Workbook(el.current, {
                        sheetCount: 0,
                        newTabVisible,
                        tabEditable,
                        tabStripVisible,
                    });
                    data.spread = spread;
                } else {
                    spread = data.spread;
                }
                spread.suspendPaint();
                spread.suspendEvent();
                try {
                    if (unInited) {
                        if (json) {
                            withBatchCalcUpdate(spread, () => {
                                spread.fromJSON(json);
                                register(spread);
                                const sheets = spread.sheets;
                                if (sheets && sheets.length > 0) {
                                    sheets.forEach((sheet) => {
                                        sheet.recalcAll(true);
                                    });
                                }
                            });
                        } else {
                            let sheetList;
                            if (children) {
                                sheetList = Array.isArray(children)
                                    ? children
                                    : [children];
                            } else {
                                sheetList = [{ props: { name: 'Sheet1' } }];
                            }
                            sheetList.forEach((sheet, index) => {
                                const {
                                    name = `Sheet${index + 1}`,
                                    rowCount = 20,
                                    colCount = 20,
                                } = sheet.props;
                                const workSheet =
                                    new GC.Spread.Sheets.Worksheet(name);
                                workSheet.setRowCount(rowCount);
                                workSheet.setColumnCount(colCount);
                                spread.addSheet(index, workSheet);
                            });
                            register(spread);
                        }
                        onInited && onInited(spread);
                    }
                    spread.unbindAll();
                    bindEvent(spread, 'EnterCell', onEnterCell);
                    bindEvent(
                        spread,
                        'ActiveSheetChanged',
                        onActiveSheetChanged
                    );
                    bindEvent(spread, 'ValueChanged', onValueChanged);
                    bindEvent(spread, 'SelectionChanged', onSelectionChanged);
                    bindEvent(spread, 'SelectionChanging', onSelectionChanging);
                    bindEvent(spread, 'SheetChanged', () => {
                        debugger;
                    });
                    if (onPrintHandler) {
                        onPrintHandler(
                            (
                                params = {
                                    showBorder: false,
                                    showColumnHeader: true,
                                    showRowHeader: true,
                                    showGridLine: true,
                                }
                            ) => {
                                return new Promise((resolve, reject) => {
                                    if (spread) {
                                        if (enablePrint) {
                                            const sheets = spread.sheets;
                                            const GC = getNamespace();
                                            const visibleType =
                                                GC.Spread.Sheets.Print
                                                    .PrintVisibilityType;
                                            sheets.forEach((sheet) => {
                                                const printInfo =
                                                    sheet.printInfo();
                                                printInfo.columnStart(0);
                                                printInfo.columnEnd(
                                                    sheet.getColumnCount()
                                                );
                                                printInfo.rowStart(0);
                                                printInfo.rowEnd(
                                                    sheet.getRowCount()
                                                );
                                                printInfo.showBorder(
                                                    params.showBorder === true
                                                );
                                                printInfo.showGridLine(
                                                    params.showGridLine !==
                                                        false
                                                );
                                                printInfo.showColumnHeader(
                                                    params.showColumnHeader
                                                        ? visibleType.inherit
                                                        : visibleType.hide
                                                );
                                                printInfo.showRowHeader(
                                                    params.showRowHeader
                                                        ? visibleType.inherit
                                                        : visibleType.hide
                                                );
                                                sheet.printInfo(printInfo);
                                            });
                                            spread.print();
                                            resolve();
                                        } else {
                                            reject(
                                                Error(
                                                    '打印失败，原因：初始化报表时未开启打印功能'
                                                )
                                            );
                                        }
                                    } else {
                                        reject(
                                            Error(
                                                '打印失败，原因：报表未初始化'
                                            )
                                        );
                                    }
                                });
                            }
                        );
                    }
                } finally {
                    spread.resumePaint();
                    spread.resumeEvent();
                }
            };
            if (plugins.length > 0) {
                resourceManager.loadScript(plugins).then(() => {
                    handler();
                });
            } else {
                handler();
            }
        }
    }, [
        onInited,
        onEnterCell,
        onActiveSheetChanged,
        onValueChanged,
        onSelectionChanged,
        onSelectionChanging,
    ]);

    return (
        <Wrap>
            {data.showError ? (
                <LicenseError></LicenseError>
            ) : (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'visible',
                        userSelect: 'none',
                    }}
                    ref={el}
                ></div>
            )}
            {!data.showError && data.showWarn ? (
                <LicenseWarn></LicenseWarn>
            ) : null}
        </Wrap>
    );
}
