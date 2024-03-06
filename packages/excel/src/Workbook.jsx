import {
  useEffect,
  useRef,
  useState,
} from 'react';

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
        json = null,
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
                            const workSheet = new GC.Spread.Sheets.Worksheet(
                                name
                            );
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
                bindEvent(spread, 'ActiveSheetChanged', onActiveSheetChanged);
                bindEvent(spread, 'ValueChanged', onValueChanged);
                bindEvent(spread, 'SelectionChanged', onSelectionChanged);
                bindEvent(spread, 'SelectionChanging', onSelectionChanging);
                bindEvent(spread, 'SheetChanged', () => {
                    debugger;
                });
            } finally {
                spread.resumePaint();
                spread.resumeEvent();
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
