import DefaultCell from '../spread/DefaultCell';
import { getBaseUrl } from './environmentUtil';
import { isNullOrUndef } from './objectUtil';
import {
  getNamespace,
  withBatchUpdate,
} from './spreadUtil';

const GC = getNamespace();

export const insertRows = function (spread) {
    withBatchUpdate(spread, (sheet) => {
        const commandManager = spread.commandManager();
        commandManager.execute({
            cmd: 'gc.spread.contextMenu.insertRows',
            sheetName: sheet.name(),
            selections: sheet.getSelections(),
            activeRow: sheet && sheet.getActiveRowIndex(),
            activeCol: sheet && sheet.getActiveColumnIndex(),
        });
    });
};

export const insertColumns = function (spread) {
    withBatchUpdate(spread, (sheet) => {
        const commandManager = spread.commandManager();
        commandManager.execute({
            cmd: 'gc.spread.contextMenu.insertColumns',
            sheetName: sheet.name(),
            selections: sheet.getSelections(),
            activeRow: sheet && sheet.getActiveRowIndex(),
            activeCol: sheet && sheet.getActiveColumnIndex(),
        });
    });
};

export const deleteRows = function (spread) {
    withBatchUpdate(spread, (sheet) => {
        const commandManager = spread.commandManager();
        commandManager.execute({
            cmd: 'gc.spread.contextMenu.deleteRows',
            sheetName: sheet.name(),
            selections: sheet.getSelections(),
            activeRow: sheet && sheet.getActiveRowIndex(),
            activeCol: sheet && sheet.getActiveColumnIndex(),
        });
    });
};

export const deleteColumns = function (spread) {
    withBatchUpdate(spread, (sheet) => {
        const commandManager = spread.commandManager();
        commandManager.execute({
            cmd: 'gc.spread.contextMenu.deleteColumns',
            sheetName: sheet.name(),
            selections: sheet.getSelections(),
            activeRow: sheet && sheet.getActiveRowIndex(),
            activeCol: sheet && sheet.getActiveColumnIndex(),
        });
    });
};

export function getSortedColumnSelections(selections) {
    for (let i = 0; i < selections.length - 1; i++) {
        for (let j = i + 1; j < selections.length; j++) {
            if (selections[i].col < selections[j].col) {
                const selection = selections[i];
                selections[i] = selections[j];
                selections[j] = selection;
            }
        }
    }
    return selections;
}

export function getSortedRowSelections(selections) {
    for (let i = 0; i < selections.length - 1; i++) {
        for (let j = i + 1; j < selections.length; j++) {
            if (selections[i].row < selections[j].row) {
                const o = selections[i];
                selections[i] = selections[j];
                selections[j] = o;
            }
        }
    }
    return selections;
}

export class BindingPathCellType extends GC.Spread.Sheets.CellTypes.Text {
    constructor() {
        super();
    }

    /**
     * 是否为绑定数据单元格
     * @param {*} context 
     */
    isBindPathCell(context){
        const {sheet,row,col} = context;
        if (sheet && (row === 0 || !!row) && (col === 0 || !!col)) {
            let bindingPath = sheet.getBindingPath(row,col);
            return !!bindingPath;
        }
        return false;
    }

    paint(ctx, value, x, y, w, h, style, context) {
        const bindCell = this.isBindPathCell(context);
        if(bindCell){
            //添加角标
            style.decoration = {
                cornerFold: {
                    size: 8,
                    position: GC.Spread.Sheets.CornerPosition.leftTop,
                    color: 'green',
                },
            };
        }
        if(bindCell&&!isNullOrUndef(value)){
            value = '[' + bindingPath + ']';
        }
        if (value === null || value === undefined) {
            let sheet = context.sheet,
                row = context.row,
                col = context.col;
            if (sheet && (row === 0 || !!row) && (col === 0 || !!col)) {
                let bindingPath = sheet.getBindingPath(
                    context.row,
                    context.col
                );
                if (bindingPath) {
                    value = '[' + bindingPath + ']';
                }
            }
        }
        
        super.paint(ctx, value, x, y, w, h, style, context);
    }

    getHitInfo(x, y, cellStyle, cellRect, context) {
        return {
            x: cellRect.x,
            y: cellRect.y,
            width: cellRect.width,
            height: cellRect.height,
            row: context.row,
            col: context.col,
            cellStyle: cellStyle,
            cellRect: cellRect,
            sheetArea: context.sheetArea,
            sheet: context.sheet,
            value: context.sheet.getValue(context.row, context.col),
        };
    }

    _initIcon(){
        if(!this._iconEle){
            let iconEle = document.createElement('div');
            const basePath = getBaseUrl();
            iconEle.innerHTML = `<img src="${basePath}/css/icons/cell/config.svg" style="width:14px;height:14px;cursor:pointer;">`;
            document.body.append(iconEle);
            const style = iconEle.style;
            style.position = 'absolute';
            style.width = '16px';
            style.height = '16px';
            style.display = 'flex';
            style.backgroundColor ='white';
            style.alignItems = 'center';
            style.justifyContent = 'center';
            this._iconEle = iconEle;
        }
        return this._iconEle;
    }

    _showIcon(hitinfo){
        const iconEle = this._initIcon();
        const { x, y, sheet, width} = hitinfo;
        const style = iconEle.style;
        const spread = sheet.getParent();
        const host = spread.getHost();
        const rect = host.getBoundingClientRect();
        style.left = `${rect.left+x+width}px`;
        style.top = `${rect.top+y}px`;
        style.display = 'flex';
    }

    _hideIcon(){
        const iconEle = this._initIcon();
        iconEle.style.display = 'none';
    }

    processMouseDown(hitinfo) {
        const { x, y, value, sheet, width,row, col } = hitinfo;
        if(!this._iconEle){
            let iconEle = document.createElement('div');
            const basePath = getBaseUrl();
            iconEle.innerHTML = `<img src="${basePath}/css/icons/cell/config.svg" style="width:14px;height:14px;cursor:pointer;">`;
            document.body.append(iconEle);
            const style = iconEle.style;
            style.position = 'absolute';
            style.width = '16px';
            style.height = '16px';
            style.display = 'flex';
            style.backgroundColor ='white';
            style.alignItems = 'center';
            style.justifyContent = 'center';
            this._iconEle = iconEle;
        }
        const style = this._iconEle.style;
        const spread = sheet.getParent();
        const host = spread.getHost();
        const rect = host.getBoundingClientRect();
        style.left = `${rect.left+x+width}px`;
        style.top = `${rect.top+y}px`;
    }
}

export function formatBindingPathCellType(sheet) {
    const dataTable = sheet.toJSON().data.dataTable;
    if (!dataTable) {
        return;
    }
    sheet.suspendPaint();
    const bindingPathCellType = new DefaultCell();
    Object.entries(dataTable).forEach(([rowStr, colValue]) => {
        const row = Number(rowStr);
        Object.entries(colValue).forEach(([colStr, { bindingPath }]) => {
            if (bindingPath) {
                const col = Number(colStr);
                sheet.getCell(row, col).cellType(bindingPathCellType);
            }
        });
    });
    sheet.resumePaint();
}
