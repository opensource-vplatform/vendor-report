import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { registerCommand } from '@commands/index';
import {
  bind,
  EVENTS,
  fire,
} from '@event/EventManager';
import { setSpread } from '@store/appSlice/appSlice';
import {
  initDatasource,
  setSetting,
  updateActiveSheetTablePath,
  updateDslist,
} from '@store/datasourceSlice/datasourceSlice';
import { hideTab } from '@store/navSlice/navSlice';
import { resetView } from '@store/viewSlice/viewSlice';
import {
  initWizardSlice,
  toggleBooleanValue,
  updateTemplateName,
} from '@store/wizardSlice';
import {
  Workbook,
  Worksheet,
} from '@toone/report-excel';
import {
  enhanceSpreadJson,
  formatBindingPathCellType,
} from '@utils/cellUtil';
import {
  findTreeNodeById,
  getActiveSheetTablesPath,
} from '@utils/commonUtil';
import {
  getLicense,
  isLocalLicenseUnCheck,
} from '@utils/configUtil';
import { getBaseUrl } from '@utils/environmentUtil';
import { fireCellEnter } from '@utils/eventUtil';
import { getNamespace } from '@utils/spreadUtil';
import {
  getCellTag,
  getSheetTag,
  setSheetTag,
} from '@utils/worksheetUtil';

import { enhance as enhanceContextMenu } from './contextMenu/index';
import DesignerContext from './DesignerContext';
import { register as registerShortcut } from './shortcutKey/index';
import { enhanceSheet } from './spread/index';
import { handleEventPrmiseResult } from './utils/eventUtil';

const GC = getNamespace();

function RowChanged(params) {
    const { sheet, row, newValue, propertyName, type = 'pageArea' } = params;
    if (['deleteRows', 'addRows'].includes(propertyName)) {
        const range = getSheetTag(sheet, type);
        if (!range) {
            return;
        }
        const REG = /^\d+:\d+$/;
        if (!REG.test(range)) {
            return;
        }

        const ranges = range.split(':');
        let newStartRow = Number(ranges[0]);
        let newEndRow = Number(ranges[1]);
        let startRow = newStartRow - 1;
        let count = newValue;
        if (propertyName !== 'addRows') {
            count = 0 - count;
            if (row === startRow) {
                startRow += 1;
            }
        }

        if (row <= startRow) {
            newStartRow = startRow + count + 1;
            newEndRow = newEndRow + count;
        } else if (row > startRow && row < newEndRow) {
            newEndRow = newEndRow + count;
        }

        let rowHeaderType = 'C';
        if (type === 'pageArea') {
            rowHeaderType = 'G';
        } else if (type === 'totalArea') {
            rowHeaderType = 'T';
        }

        for (let i = newStartRow; i < newEndRow; i++) {
            sheet.setValue(
                i,
                0,
                rowHeaderType,
                GC.Spread.Sheets.SheetArea.rowHeader
            );
        }
        setSheetTag(sheet, type, `${newStartRow}:${newEndRow}`);
    }
}

export default function () {
    const dispatch = useDispatch();
    const context = useContext(DesignerContext);
    const json = context?.conf?.json?.reportJson;
    const { dsList } = useSelector(({ datasourceSlice }) => datasourceSlice);
    const { spread } = useSelector(({ appSlice }) => appSlice);
    if (spread) {
        //添加自定义方法，供DefaultCell中使用（根据绑定路径，后期绑定名称）
        spread.getDesignerDatasources = () => {
            return dsList;
        };
    }
    const { template } = useSelector(({ wizardSlice }) => wizardSlice);
    const cacheDatas = useRef({ template }).current;
    cacheDatas.template = template;
    const sheetName = 'Sheet1';
    const handleValueChanged = useCallback((type, args) => {
        const { sheet, row, col, newValue } = args;
        const bindInfo = getCellTag(sheet, row, col, 'bindInfo');
        if (bindInfo && bindInfo.bindType === 'tableColumn') {
            const ds = findTreeNodeById(bindInfo.bindDsInstanceId, dsList);
            dispatch(
                updateDslist({
                    newData: {
                        ...ds,
                        name: newValue,
                    },
                    isSave: true,
                })
            );
        }
    });
    const genEventHandler = (eventType, observers, before, after) => {
        return useCallback((type, args) => {
            before && before(type, args);
            fire({
                event: EVENTS[eventType],
                args: [args],
            });
            after && after(type, args);
        }, observers || []);
    };
    const handleEnterCell = genEventHandler('EnterCell', [], () =>
        context.handleSelectionChange()
    );
    const handleActiveSheetChanged = useCallback(
        (type, args) => {
            const sheet = args.newSheet;
            const tablePaths = getActiveSheetTablesPath({ sheet });
            const sheetName = sheet.name();
            dispatch(updateActiveSheetTablePath({ tablePaths }));
            dispatch(resetView());
            dispatch(hideTab({ code: 'table' }));
            dispatch(
                toggleBooleanValue({
                    code: 'currentSheetIsTemplate',
                    value: cacheDatas.template[sheetName] ? true : false,
                })
            );
            fire({
                event: EVENTS.ActiveSheetChanged,
                args: [args],
            });
            fireCellEnter(sheet.getParent());
        },
        [template]
    );
    const handleWorkbookInitialized = useCallback((spread) => {
        return new Promise((resolve, reject) => {
            const sheet = spread.getActiveSheet();
            const tablePaths = getActiveSheetTablesPath({ sheet });
            dispatch(updateActiveSheetTablePath({ tablePaths }));

            dispatch(setSpread({ spread }));
            //对已经绑定了数据源的单元格进行类型设置，设置后就可以看到当前单元格已经绑定了哪个数据源
            spread.sheets.forEach((sheet) => {
                formatBindingPathCellType(sheet);
            });
            fire({
                event: EVENTS.Inited,
                args: [spread],
            });
            registerCommand(spread);
            registerShortcut(spread);
            enhanceContextMenu(spread, dispatch);
            const result = fire({
                event: EVENTS.onDesignerInited,
                args: [],
            });
            handleEventPrmiseResult(
                result,
                dispatch,
                '正在初始化设计器，请稍候...',
                EVENTS.onDesignerInited
            ).then(
                ({
                    excelJson,
                    tableMetadata,
                    datasourceSetting,
                    wizardSlice,
                }) => {
                    if (excelJson) {
                        enhanceSpreadJson(excelJson);
                        resolve(excelJson);
                    }
                    dispatch(
                        initDatasource({
                            datasource: tableMetadata,
                        })
                    );
                    datasourceSetting &&
                        dispatch(setSetting(datasourceSetting));
                    wizardSlice && dispatch(initWizardSlice({ wizardSlice }));
                }
            );
        });
    });
    const handleSelectionChanged = genEventHandler('SelectionChanged');
    const handleSelectionChanging = genEventHandler('SelectionChanging');
    const handleSheetChanged = genEventHandler('SheetChanged');
    const handleEditorStatusChanged = genEventHandler('EditorStatusChanged');
    const handleRendered = genEventHandler('Rendered');
    const handleUndo = genEventHandler('Undo');
    const handleRedo = genEventHandler('Redo');

    const handleSheetNameChanged = useCallback((aciton, datas) => {
        const { newValue, oldValue } = datas;
        dispatch(
            updateTemplateName({
                oldName: oldValue,
                newName: newValue,
            })
        );
    });

    const handleRowChanged = genEventHandler('RowChanged');

    const sheetsConf = context?.conf?.sheets || {};
    //是否显示添加选项卡按钮
    const newTabVisible = sheetsConf.newTabVisible !== false;
    //选项卡是否可编辑
    const tabEditable = sheetsConf.tabEditable !== false;
    //实现显示选项卡
    const tabStripVisible = sheetsConf.tabStripVisible !== false;
    //许可证
    const license = getLicense(context);
    //是否忽略本地localhost许可证检查
    const localLicenseUnCheck = isLocalLicenseUnCheck(context);

    useEffect(() => {
        const unbind = bind({
            event: EVENTS.RowChanged,
            handler: (event, datas) => {
                RowChanged({ ...datas, type: 'pageArea' });
                RowChanged({ ...datas, type: 'groupSumArea' });
                RowChanged({ ...datas, type: 'totalArea' });
            },
        });
        return () => {
            unbind();
        };
    }, []);

    useEffect(() => {
        const unbind = bind({
            event: EVENTS.SheetChanged,
            handler: (params) => {
                if (params) {
                    let { sheet, sheetIndex, propertyName } = params;
                    if (!sheet && propertyName == 'insertSheet' && spread) {
                        sheet = spread.getSheet(sheetIndex);
                    }
                    sheet && enhanceSheet(sheet);
                }
            },
        });
        return () => {
            unbind();
        };
    }, [spread]);

    return (
        <Fragment>
            <Workbook
                baseUrl={getBaseUrl()}
                license={license}
                localLicenseUnCheck={localLicenseUnCheck}
                json={json}
                enablePrint={true}
                newTabVisible={newTabVisible}
                tabEditable={tabEditable}
                tabStripVisible={tabStripVisible}
                onInited={handleWorkbookInitialized}
                onEnterCell={handleEnterCell}
                onActiveSheetChanged={handleActiveSheetChanged}
              
                onValueChanged={handleValueChanged}
                onSelectionChanged={handleSelectionChanged}
                onSelectionChanging={handleSelectionChanging}
                onSheetChanged={handleSheetChanged}
                onEditorStatusChanged={handleEditorStatusChanged}
                onRendered={handleRendered}
                onSheetNameChanged={handleSheetNameChanged}
                onUndo={handleUndo}
                onRedo={handleRedo}
                onRowChanged={handleRowChanged}
                onColumnWidthChanged={genEventHandler('ColumnWidthChanged')}
                onRowHeightChanged={genEventHandler('RowHeightChanged')}
                onLeftColumnChanged={genEventHandler('LeftColumnChanged')}
                onTopRowChanged={genEventHandler('TopRowChanged')}
                onViewZoomed={genEventHandler('ViewZoomed')}
                onEditEnding={genEventHandler('EditEnding')}
                onEditStarting={genEventHandler('EditStarting')}
                onCellDoubleClick={genEventHandler('CellDoubleClick')}
                isShowToolbar={false}
                type='designer'
            >
                <Worksheet
                    name={sheetName}
                    rowCount={20}
                    colCount={20}
                ></Worksheet>
            </Workbook>
        </Fragment>
    );
}
