import {
  Fragment,
  useCallback,
  useContext,
  useRef,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  EVENTS,
  fire,
} from '@event/EventManager';
import { setSpread } from '@store/appSlice/appSlice';
import {
  setSelectedFontColor,
} from '@store/cellSettingSlice/fontCellSettingSlice';
import {
  updateActiveSheetTablePath,
  updateDslist,
} from '@store/datasourceSlice/datasourceSlice';
import {
  setFontStyles,
  setIsStrickoutLine,
} from '@store/fontSlice/fontSlice';
import { hideTab } from '@store/navSlice/navSlice';
import { resetView } from '@store/viewSlice/viewSlice';
import {
  toggleBooleanValue,
  updateTemplateName,
} from '@store/wizardSlice';
import {
  Workbook,
  Worksheet,
} from '@toone/report-excel';
import {
  findTreeNodeById,
  getActiveSheetTablesPath,
} from '@utils/commonUtil';
import { parseFont } from '@utils/fontUtil';
import { getCellTag } from '@utils/worksheetUtil';

import {
  formatBindingPathCellType,
} from './component/defineDatasource/utils/utils';
import DesignerContext from './DesignerContext';
import { isLineThrough } from './utils/fontUtil';

export default function () {
    const dispatch = useDispatch();
    const context = useContext(DesignerContext);
    const { dsList } = useSelector(({ datasourceSlice }) => datasourceSlice);
    const { template } = useSelector(({ wizardSlice }) => wizardSlice);
    const cacheDatas = useRef({ template }).current;
    cacheDatas.template = template;
    const sheetName = 'Person Address';
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
    const handleEnterCell = (type, args) => {
        const sheet = args.sheet;
        const styles = parseFont(sheet);
        dispatch(setFontStyles({ styles }));
        context.handleSelectionChange();

        // 解析textDecoration数值，验证是否选中删除线
        const { textDecoration } = styles;
        dispatch(
            setIsStrickoutLine({
                isStrickoutLine: isLineThrough(textDecoration),
            })
        );
        // 解析时更新选择的selectColor
        let { foreColor } = styles;
        if (foreColor === undefined) foreColor = 'black';
        dispatch(setSelectedFontColor({ selectedFontColor: foreColor }));
        fire({
            event: EVENTS.EnterCell,
            args: [args],
        });
    };
    const handleActiveSheetChanged = useCallback(
        (type, args) => {
            const sheet = args.newSheet;
            const styles = parseFont(sheet);
            const tablePaths = getActiveSheetTablesPath({ sheet });
            const sheetName = sheet.name();
            dispatch(updateActiveSheetTablePath({ tablePaths }));
            dispatch(setFontStyles({ styles }));
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
        },
        [template]
    );
    const handleWorkbookInitialized = useCallback((spread) => {
        const menuDatas = spread.contextMenu.menuData;
        for (let i = 0, l = menuDatas.length; i < l; i++) {
            const menu = menuDatas[i];
            if (
                menu.name == 'gc.spread.tableDelete' &&
                menu.workArea == 'table'
            ) {
                menu.subMenu.push({
                    command: 'tableDeleteAllForContextMenu',
                    iconClass: 'gc-spread-deleteComment',
                    name: 'gc.spread.tableDeleteAll',
                    text: '整表',
                });
                menuDatas.push({
                    command: 'tableMoveForContextMenu',
                    name: 'gc.spread.tableMove',
                    text: '移动',
                    workArea: 'table',
                });
                break;
            }
        }
        menuDatas.push({
            command: 'toggleHyperlink',
            name: 'gc.spread.toggleHyperlink',
            text: '超链接',
            workArea: 'viewport',
        });
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
    });
    const handleSelectionChanged = useCallback((type, data) => {
        fire({
            event: EVENTS.SelectionChanged,
            args: [data],
        });
    });
    const handleSelectionChanging = useCallback((type, data) => {
        fire({
            event: EVENTS.SelectionChanging,
            args: [data],
        });
    });
    const handleSheetChanged = useCallback((type, data) => {
        fire({
            event: EVENTS.SheetChanged,
            args: [data],
        });
    });
    const handleEditorStatusChanged = useCallback((type, data) => {
        fire({
            event: EVENTS.EditorStatusChanged,
            args: [data],
        });
    });
    const handleRendered = useCallback((data) => {
        fire({
            event: EVENTS.Rendered,
            args: [data],
        });
    });
    const sheetsConf = context?.conf?.sheets || {};
    //是否显示添加选项卡按钮
    const newTabVisible = sheetsConf.newTabVisible !== false;
    //选项卡是否可编辑
    const tabEditable = sheetsConf.tabEditable !== false;
    //实现显示选项卡
    const tabStripVisible = sheetsConf.tabStripVisible !== false;
    //许可证
    const license = context?.conf?.license;

    const json = context?.conf?.json?.reportJson;

    return (
        <Fragment>
            <Workbook
                license={license}
                json={json}
                enablePrint={true}
                newTabVisible={newTabVisible}
                tabEditable={tabEditable}
                tabStripVisible={tabStripVisible}
                onInited={handleWorkbookInitialized}
                onEnterCell={handleEnterCell}
                onActiveSheetChanged={handleActiveSheetChanged}
                onActiveSheetChanging={function (a, b, c) {
                    console.log(a, b);
                    console.log(11111);
                }}
                onValueChanged={handleValueChanged}
                onSelectionChanged={handleSelectionChanged}
                onSelectionChanging={handleSelectionChanging}
                onSheetChanged={handleSheetChanged}
                onEditorStatusChanged={handleEditorStatusChanged}
                onRendered={handleRendered}
                onSheetNameChanged={function (aciton, datas) {
                    const { newValue, oldValue } = datas;
                    dispatch(
                        updateTemplateName({
                            oldName: oldValue,
                            newName: newValue,
                        })
                    );
                }}
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
