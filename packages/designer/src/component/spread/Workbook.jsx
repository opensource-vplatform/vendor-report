import {
  createRef,
  useContext,
  useEffect,
  useState,
} from 'react';

import styled from 'styled-components';

import { checkLicense } from '@utils/licenseUtil';
import { getNamespace } from '@utils/spreadUtil';

import DesignerContext from '../../DesignerContext';
import LicenseError from './LicenseError';
import LicenseWarn from './LicenseWarn';

const Wrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: visible;
    user-select: none;
`;

const ExcelWrap = styled.div`
    width: 100%;
    height: 100%;
    overflow: visible;
    user-select: none;
`;

const bindEvent = function (spread, typeName, handler) {
    if (handler) {
        const GC = getNamespace();
        const type = GC.Spread.Sheets.Events[typeName];
        spread.bind(type, handler);
    }
};

export default function (props) {
    const {
        inited,
        enterCell,
        activeSheetChanged,
        valueChanged,
        selectionChanged,
        selectionChanging,
        children,
    } = props;
    const [data, setData] = useState(() => {
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

    const context = useContext(DesignerContext);

    const el = createRef(null);
    useEffect(() => {
        if (el.current && !data.showError) {
            let spread = null;
            const unInited = !data.spread;
            if (unInited) {
                const GC = getNamespace();

                const sheetsConf = context?.conf?.sheets || {};
                //是否显示添加选项卡按钮
                const newTabVisible = sheetsConf.newTabVisible !== false;
                //选项卡是否可编辑
                const tabEditable = sheetsConf.tabEditable !== false;
                //实现显示选项卡
                const tabStripVisible = sheetsConf.tabStripVisible !== false;

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
                    if (children) {
                        const sheetList = Array.isArray(children)
                            ? children
                            : [children];
                        sheetList.forEach((sheet, index) => {
                            const {
                                name = `sheet${index + 1}`,
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
                    }
                    inited && inited(spread);
                }
                spread.unbindAll();
                bindEvent(spread, 'EnterCell', enterCell);
                bindEvent(spread, 'ActiveSheetChanged', activeSheetChanged);
                bindEvent(spread, 'ValueChanged', valueChanged);
                bindEvent(spread, 'SelectionChanged', selectionChanged);
                bindEvent(spread, 'SelectionChanging', selectionChanging);
            } finally {
                spread.resumePaint();
                spread.resumeEvent();
            }
        }
    }, [
        inited,
        enterCell,
        activeSheetChanged,
        valueChanged,
        selectionChanged,
        selectionChanging,
    ]);

    return (
        <Wrap>
            {data.showError ? (
                <LicenseError></LicenseError>
            ) : (
                <ExcelWrap ref={el}></ExcelWrap>
            )}
            {!data.showError && data.showWarn ? (
                <LicenseWarn></LicenseWarn>
            ) : null}
        </Wrap>
    );
}
