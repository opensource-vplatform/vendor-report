import { useCallback } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  SpreadSheets,
  Worksheet,
} from '@grapecity/spread-sheets-react';
import { setSpread } from '@store/appSlice/appSlice';
import { updateDslist } from '@store/datasourceSlice/datasourceSlice';
import { setFontStyles } from '@store/fontSlice/fontSlice';
import {
  hideTab,
  setActive,
  showTab,
} from '@store/navSlice/navSlice';
import { resetView } from '@store/viewSlice/viewSlice';
import { isBindingTable } from '@utils/bindingUtil';
import { findTreeNodeById } from '@utils/commonUtil';
import { parseFont } from '@utils/fontUtil';
import { getCellTag } from '@utils/worksheetUtil';

export default function () {
    const dispatch = useDispatch();
    let {
        datasourceSlice: { dsList },
    } = useSelector((state) => state);
    const spreadBackColor = 'aliceblue';
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
        if(isBindingTable(sheet)){
            dispatch(showTab({code:'table'}));
            dispatch(setActive({code:'table'}))
        }else{
            dispatch(hideTab({code:'table'}))
            dispatch(setActive({code:null}))
        }
    });
    const handleActiveSheetChanged = useCallback((type, args) => {
        const sheet = args.newSheet;
        const styles = parseFont(sheet);
        dispatch(setFontStyles({ styles }));
        dispatch(resetView());
        dispatch(hideTab({code:'table'}))
    });
    const handleWorkbookInitialized = useCallback((spread) => {
        dispatch(setSpread({ spread }));
    });
    return (
        <SpreadSheets
            backColor={spreadBackColor}
            workbookInitialized={handleWorkbookInitialized}
            enterCell={handleEnterCell}
            activeSheetChanged={handleActiveSheetChanged}
            valueChanged={handleValueChanged}
        >
            <Worksheet
                name={sheetName}
                autoGenerateColumns={autoGenerateColumns}
                rowCount={20}
                colCount={20}
            ></Worksheet>
        </SpreadSheets>
    );
}
