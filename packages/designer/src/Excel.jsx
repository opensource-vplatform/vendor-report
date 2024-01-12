import {
  Fragment,
  useCallback,
  useContext,
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
  Workbook,
  Worksheet,
} from '@toone/report-excel';
import {
  findTreeNodeById,
  getActiveSheetTablesPath,
} from '@utils/commonUtil';
import { parseFont } from '@utils/fontUtil';
import { getCellTag } from '@utils/worksheetUtil';

import DesignerContext from './DesignerContext';
import { isLineThrough } from './utils/fontUtil';

export default function () {
    const dispatch = useDispatch();
    const context = useContext(DesignerContext);
    const { dsList } = useSelector(({ datasourceSlice }) => datasourceSlice);
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
    };
    const handleActiveSheetChanged = useCallback((type, args) => {
        const sheet = args.newSheet;
        const styles = parseFont(sheet);
        const tablePaths = getActiveSheetTablesPath({ sheet });
        dispatch(updateActiveSheetTablePath({ tablePaths }));
        dispatch(setFontStyles({ styles }));
        dispatch(resetView());
        dispatch(hideTab({ code: 'table' }));
    });
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
        const sheet = spread.getActiveSheet();
        const tablePaths = getActiveSheetTablesPath({ sheet });
        dispatch(updateActiveSheetTablePath({ tablePaths }));

        dispatch(setSpread({ spread }));
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
    const sheetsConf = context?.conf?.sheets || {};
    //是否显示添加选项卡按钮
    const newTabVisible = sheetsConf.newTabVisible !== false;
    //选项卡是否可编辑
    const tabEditable = sheetsConf.tabEditable !== false;
    //实现显示选项卡
    const tabStripVisible = sheetsConf.tabStripVisible !== false;
    //许可证
    const license = context?.conf?.license;

    const spreadJson = localStorage.getItem('spreadJson');
    const json = JSON.parse(spreadJson);

    return (
        <Fragment>
            <Workbook
                license={license}
                json={json}
                newTabVisible={newTabVisible}
                tabEditable={tabEditable}
                tabStripVisible={tabStripVisible}
                onInited={handleWorkbookInitialized}
                onEnterCell={handleEnterCell}
                onActiveSheetChanged={handleActiveSheetChanged}
                onValueChanged={handleValueChanged}
                onSelectionChanged={handleSelectionChanged}
                onSelectionChanging={handleSelectionChanging}
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
