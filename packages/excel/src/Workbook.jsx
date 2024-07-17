import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import resourceManager from 'resource-manager-js';
import styled from 'styled-components';

import { isFunction } from '@toone/report-util';

import {
  EVENTS,
  fire,
} from './event/EventManager';
import LicenseError from './LicenseError';
import LicenseWarn from './LicenseWarn';
import PreviewContext from './PreviewContext';
import { withDivStyled } from './utils/componentUtil';
import { setBaseUrl } from './utils/environmentUtil';
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

const GC = getNamespace();
const GCsheets = GC.Spread.Sheets;
const Wrap = withDivStyled({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'visible',
  userSelect: 'none',
  display: 'flex',
  flexDirection: 'column',
});

const ExcelWrap = styled.div`
  width: 100%;
  height: 100%;
  overflow: visible;
  user-select: none;
  box-sizing: border-box;
`;

const bindEvent = function (spread, typeName, handler) {
  if (handler) {
    const type = GC.Spread.Sheets.Events[typeName];
    spread.bind(type, handler);
  }
};

const bindEvents = function (spread, events) {
  if (spread && events) {
    for (let [event, handler] of Object.entries(events)) {
      bindEvent(spread, event, handler);
    }
  }
};

//绑定数据源
const bindDataSource = function (params) {
  const { spread, dataSource } = params;
  if (!spread || !dataSource) {
    return;
  }
  spread.sheets.forEach((sheet) => {
    const _dataSource = JSON.parse(JSON.stringify(dataSource));
    const source = new GCsheets.Bindings.CellBindingSource(_dataSource);
    sheet.setDataSource(source);
  });
};

//处理事件绑定
const handleEvents = (params) => {
  const { spread } = params || {};
  if (!spread) return;
  const {
    onEnterCell,
    onActiveSheetChanged,
    onValueChanged,
    onSelectionChanged,
    onSelectionChanging,
    onEditorStatusChanged,
    onSheetNameChanged,
    onSheetNameChanging,
    onActiveSheetChanging,
    onSheetChanged,
    onRowChanged,
    onUndo,
    onRedo,
    json: _json = null,
    onColumnWidthChanged,
    onRowHeightChanged,
    onLeftColumnChanged,
    onTopRowChanged,
    onViewZoomed,
    onEditEnding,
    onEditStarting,
    onCellDoubleClick,
  } = params;

  spread.unbindAll();
  bindEvents(spread, {
    EnterCell: onEnterCell,
    ActiveSheetChanged: onActiveSheetChanged,
    ValueChanged: onValueChanged,
    ActiveSheetChanging: onActiveSheetChanging,
    SheetNameChanged: onSheetNameChanged,
    SheetNameChanging: onSheetNameChanging,
    SelectionChanged: onSelectionChanged,
    SelectionChanging: onSelectionChanging,
    EditorStatusChanged: onEditorStatusChanged,
    WorkbookUndo: onUndo,
    WorkbookRedo: onRedo,
    RowChanged: onRowChanged,
    SheetChanged: onSheetChanged,
    ColumnWidthChanged: onColumnWidthChanged,
    RowHeightChanged: onRowHeightChanged,
    LeftColumnChanged: onLeftColumnChanged,
    TopRowChanged: onTopRowChanged,
    ViewZoomed: onViewZoomed,
    EditEnding: onEditEnding,
    EditStarting: onEditStarting,
    CellDoubleClick: onCellDoubleClick,
  });
};

export default function (props) {
  const {
    newTabVisible = true,
    tabEditable = true,
    tabStripVisible = true,
    onInited,
    onActiveSheetChanged: _onActiveSheetChanged,
    onSheetChanged,
    license,
    localLicenseUnCheck = false,
    enablePrint = false,
    json: _json = null,
    children,
    baseUrl,
    dataSource = null,
  } = props;
  if (license) {
    setLicense(license);
  }
  if (baseUrl) {
    setBaseUrl(baseUrl);
  }
  const context = useContext(PreviewContext);
  const json = context?.json || _json;
  const pageIndex = context?.pageIndex || 1;
  const licenseKey = getLicense();
  if (licenseKey) {
    GC.Spread.Sheets.LicenseKey = licenseKey;
  }
  const [data] = useState(() => {
    const result = checkLicense(localLicenseUnCheck);
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
      isFirstRender: true,
    };
  });

  const el = useRef(null);

  const onActiveSheetChanged = (type, args) => {
    _onActiveSheetChanged && _onActiveSheetChanged(type, args);
  };

  const initSpread = async () => {
    if (enablePrint) {
      const plugins = getPluginSrc('print');
      await resourceManager.loadScript(plugins);
    }
    if (!data.spread && el.current && !el.showError) {
      const spread = new GC.Spread.Sheets.Workbook(el.current, {
        sheetCount: 0,
        newTabVisible,
        tabEditable,
        tabStripVisible,
      });
      spread.TOONE_FUNCS = {
        setJSON(json) {
          const result = spread.fromJSON(json);
          result.then(() => {
            fire({
              event: EVENTS.OnSheetJsonInited,
              args: [],
            });
          });
        },
      };
      data.spread = spread;
      fire({
        event: EVENTS.OnSpreadInited,
        args: [spread],
      });
      return true;
    }
    return false;
  };

  //处理工作表生成，优先使用json
  const handleSheets = (json) => {
    if (!data.spread) return;
    const spread = data.spread;
    if (json && Object.keys(json).length > 2) {
      withBatchCalcUpdate(spread, () => {
        spread.fromJSON(json);
        fire({
          event: EVENTS.OnSpreadJsonParsed,
          args: [spread],
        });
        const sheets = spread.sheets;
        if (sheets && sheets.length > 0) {
          sheets.forEach((sheet) => {
            fire({
              event: EVENTS.OnSheetInited,
              args: [sheet],
            });
            onSheetChanged && onSheetChanged('SheetChanged', { sheet });
          });
        }
      });
    } else {
      //不存在json数据时才根据子组件创建工作表
      withBatchCalcUpdate(spread, () => {
        let sheetList;
        if (children) {
          sheetList = Array.isArray(children) ? children : [children];
        } else {
          sheetList = [];
        }
        spread.clearSheets();
        sheetList.forEach((sheet, index) => {
          const {
            name = `Sheet${index + 1}`,
            rowCount = 20,
            colCount = 20,
          } = sheet.props;
          const workSheet = new GC.Spread.Sheets.Worksheet(name);
          workSheet.setRowCount(rowCount);
          workSheet.setColumnCount(colCount);
          spread.addSheet(index, workSheet);
          fire({
            event: EVENTS.OnSheetInited,
            args: [workSheet],
          });
          onSheetChanged &&
            onSheetChanged('SheetChanged', { sheet: workSheet });
        });
      });
    }
  };
  //处理数据
  const handleDatas = () => {
    if (!data.spread) return;
    const spread = data.spread;
    if (dataSource) {
      bindDataSource({
        spread: spread,
        dataSource,
      });
    }
  };

  useEffect(() => {
    (async () => {
      const inited = await initSpread();
      data.inited = inited;
      if (inited) {
        /**
         * 处理事件绑定必须在第一次spread初始才做，
         * 否则导致设计器编辑栏在初始化时注册的事件被清空
         */
        handleEvents({ ...props, onActiveSheetChanged, spread: data.spread });
        handleSheets(json);
        handleDatas();
        if (onInited) {
          onInited(data.spread);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (data.isFirstRender) {
      data.isFirstRender = false;
      return;
    }
    if (data.inited) {
      handleSheets(json);
      if (!!data.spread.getActiveSheet()) {
        // 重新重写默认单元格
        fire({
          event: EVENTS.OnSheetInited,
          args: [data.spread.getActiveSheet()],
        });
      }
      handleDatas();
    }
    if (isFunction(context.closeLoading)) {
      context.closeLoading();
    }
  }, [json, dataSource, pageIndex]);

  return (
    <Wrap>
      {data.showError ? (
        <LicenseError></LicenseError>
      ) : (
        <ExcelWrap ref={el}></ExcelWrap>
      )}
      {!data.showError && data.showWarn ? <LicenseWarn></LicenseWarn> : null}
    </Wrap>
  );
}
