import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Workbook, Worksheet } from '@components/spread/Index';
import { setSpread } from '@store/appSlice/appSlice';
import { updateDslist } from '@store/datasourceSlice/datasourceSlice';
import { setFontStyles } from '@store/fontSlice/fontSlice';
import { hideTab, setActive, showTab } from '@store/navSlice/navSlice';
import { resetView } from '@store/viewSlice/viewSlice';
import { isBindingTable } from '@utils/bindingUtil';
import { findTreeNodeById } from '@utils/commonUtil';
import { parseFont } from '@utils/fontUtil';
import { getCellTag } from '@utils/worksheetUtil';

import { setData } from './store/tableDesignSlice/tableDesignSlice';
import { parseTable } from './utils/tableUtil';

export default function () {
    const dispatch = useDispatch();
    let { dsList } = useSelector(({ datasourceSlice }) => datasourceSlice);
    const sheetName = 'Person Address';
    const autoGenerateColumns = false;
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
    const handleEnterCell = useCallback((type, args) => {
        const sheet = args.sheet;
        const styles = parseFont(sheet);
        dispatch(setFontStyles({ styles }));
        if (isBindingTable(sheet)) {
            dispatch(showTab({ code: 'table' }));
            dispatch(setData({ data: parseTable(sheet) }));
            dispatch(setActive({ code: 'table' }));
        } else {
            dispatch(hideTab({ code: 'table' }));
            dispatch(setActive({ code: null }));
        }
    });
    const handleActiveSheetChanged = useCallback((type, args) => {
        const sheet = args.newSheet;
        const styles = parseFont(sheet);
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
                break;
            }
        }
        const spreadJson = localStorage.getItem('spreadJson');
        if (spreadJson) {
            spread.fromJSON(JSON.parse(spreadJson));
        }
        dispatch(setSpread({ spread }));
    });
    return (
        <Workbook
            inited={handleWorkbookInitialized}
            enterCell={handleEnterCell}
            activeSheetChanged={handleActiveSheetChanged}
            valueChanged={handleValueChanged}
        >
            <Worksheet name={sheetName} rowCount={20} colCount={20}></Worksheet>
        </Workbook>
    );
}
