import {
  setCallbackId,
  setConfig,
  setSetting,
  setVisible,
} from '@store/sparklineSlice';

import {
  addCallback,
  handleCancel as onCancel,
  handleConfirm as onConfirm,
} from './callbackUtil';
import { isNullOrUndef } from './objectUtil';
import {
  applyToSelectedCell,
  getNamespace,
  withBatchCalcUpdate,
} from './spreadUtil';
import {
  getCellTagPlugin,
  setCellTagPlugin,
} from './worksheetUtil';

const toFormulaArg = function (val) {
    if (isNullOrUndef(val)) {
        return '';
    }
    return val;
};

const argList = [
    ['url', ''],
    ['mode', 1],
    ['height', 0],
    ['width', 0],
    ['clipX', 0],
    ['clipY', 0],
    ['clipHeight', 0],
    ['clipWidth', 0],
    ['vAlign', 1],
    ['hAlign', 1],
];

export const toFormula = function (data) {
    const formula = ['IMAGE('];
    argList.forEach((argDef) => {
        let argName,
            argDeft = undefined;
        if (Array.isArray(argDef)) {
            argName = argDef[0];
            argDeft = argDef[1];
        } else {
            argName = argDef;
        }
        let val = data[argName];
        val = val === argDeft ? undefined : val;
        formula.push(toFormulaArg(val));
        formula.push(',');
    });
    formula.pop();
    formula.push(')');
    return formula.join('');
};

export const parseArgs = function (args, rowIndex, colIndex, spread) {
    const params = {};
    args.forEach((arg, index) => {
        if (arg) {
            const argDef = argList[index];
            let argName,
                def = undefined;
            if (Array.isArray(argDef)) {
                argName = argDef[0];
                def = argDef[1];
            } else {
                argName = argDef;
            }
            const argType = arg.type;
            let val = undefined;
            if (argType == 2) {
                val = arg.value;
            } else if (argType == 3) {
                val = `"${arg.value}"`;
            } else if (argType == 1) {
                let { row, column, rowRelative, columnRelative } = arg;
                if (rowRelative) {
                    row = rowIndex + row;
                }
                if (columnRelative) {
                    column = colIndex + column;
                }
                const GC = getNamespace();
                const rangeToFormula =
                    GC.Spread.Sheets.CalcEngine.rangeToFormula;
                const allRelative =
                    GC.Spread.Sheets.CalcEngine.RangeReferenceRelative
                        .allRelative;
                const r1c1Style =
                    GC.Spread.Sheets.ReferenceStyle.r1c1 ===
                    spread.options.referenceStyle;
                val = rangeToFormula(
                    { row, col: column, rowCount: 1, colCount: 1 },
                    rowIndex,
                    colIndex,
                    allRelative,
                    r1c1Style
                );
            }
            argType == 2
                ? arg.value
                : argType == 3
                  ? `"${arg.value}"`
                  : undefined;
            if (val == def) {
                val = undefined;
            }
            if (val !== undefined) {
                params[argName] = val;
            }
        }
    });
    return params;
};

export const isRectDisabled = function (config) {
    return config.mode !== 4;
};

export const isAlignDisabled = function (config) {
    const { mode } = config;
    return mode === 1 || mode === 2;
};

export const getDefaultConfig = function(){
    const result = {};
    for(let [key,val] of argList){
        result[key] = val;
    }
    return result;
}

export const showEditorDialog = function(spread,dispatch,ctx){
    const sheet = spread.getActiveSheet();
    const row = sheet.getActiveRowIndex();
    const col = sheet.getActiveColumnIndex();
    const plugin = getCellTagPlugin(sheet,row,col,"cellImage");
    const config = plugin?.config;
    show(dispatch,{
        onConfirm:function(config){
            let {url,...others} = config;
            url = `"./image.png"`;
            const datas = {url,...others};
            const formula = toFormula(datas);
            withBatchCalcUpdate(spread,(sheet)=>{
                applyToSelectedCell(sheet,(sheet,row,col)=>{
                    setCellTagPlugin(sheet,row,col,{
                        type: "cellImage",
                        config:others,
                    });
                    sheet.setFormula(row,col,formula);
                });
            });
            ctx.handleSelectionChange();
        },
        config,
        setting:{
            url: false,
        }
    });
}

export const show = function(dispatch,options){
    const {onConfirm,onCancel,config,setting} = options;
    const callbackId = addCallback(onConfirm,onCancel);
    if(config){
        const defConfig = getDefaultConfig();
        Object.assign(defConfig,config);
        dispatch(setConfig(defConfig));
    }
    if(setting){
        dispatch(setSetting(setting));
    }
    dispatch(setCallbackId(callbackId));
    dispatch(setVisible(true));
}

export const handleConfirm = function(callbackId,config){
    onConfirm(callbackId,config);
}

export const handleCancel = function(callbackId){
    onCancel(callbackId);
}