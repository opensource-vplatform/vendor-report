import { createRoot } from 'react-dom/client';

import {
  bind,
  EVENTS,
} from '@event/EventManager';
import { genUUID } from '@utils/commonUtil';
import { getOffsetFromBody } from '@utils/domUtil';
import { isNullOrUndef } from '@utils/objectUtil';
import {
  applyToSelectedCell,
  getNamespace,
  getSpecifiedRect,
} from '@utils/spreadUtil';
import {
  clearAllCellTagPlugin,
  getActiveIndexBySheet,
  getCellTagPlugins,
  setCellTagPlugin,
} from '@utils/worksheetUtil';

import Setting from './cellsetting/index';

const GC = getNamespace();

const Ele_Id = genUUID();

export class DefaultCell extends GC.Spread.Sheets.CellTypes.Text {
    constructor() {
        super();
        this._bindEvent();
    }

    _bindEvent() {
        const handler = () => {
            if (this._iconEle) {
                const style = getComputedStyle(this._iconEle);
                const width = style.width;
                const height = style.height;
                if ('0px' !== width && '0px' !== height && this.sheet) {
                    const spread = this.sheet.getParent();
                    if (spread.getActiveSheet() === this.sheet) {
                        const { row, col } = getActiveIndexBySheet(this.sheet);
                        const span = this.sheet.getSpan(row, col);
                        const rowIndex = span ? span.row + span.rowCount : row;
                        const colIndex = span ? span.col + span.colCount : col;
                        const lastRowIndex =
                            this.sheet.getLastFullyVisibleRow();
                        const lastColIndex =
                            this.sheet.getLastFullyVisibleColumn();
                        if (
                            rowIndex <= lastRowIndex &&
                            colIndex <= lastColIndex
                        ) {
                            const rect = getSpecifiedRect(
                                spread,
                                new GC.Spread.Sheets.Range(
                                    row,
                                    col,
                                    span ? span.rowCount : 1,
                                    span ? span.colCount : 1
                                ),
                                undefined,
                                this.sheet
                            )[0];
                            const offset = getOffsetFromBody(this._iconEle);
                            if (rect && offset) {
                                const style = this._iconEle.style;
                                style.display = 'flex';
                                style.left = rect.x + 2 + rect.width + 'px';
                                style.top = rect.y + 'px';
                                return;
                            }
                        }
                    }
                }
                this._iconEle.style.display = 'none';
            }
        };
        bind({ event: EVENTS.ColumnWidthChanged, handler });
        bind({ event: EVENTS.RowHeightChanged, handler });
        bind({ event: EVENTS.LeftColumnChanged, handler });
        bind({ event: EVENTS.TopRowChanged, handler });
        bind({ event: EVENTS.ViewZoomed, handler });
        bind({ event: EVENTS.SheetChanged, handler });
        bind({ event: EVENTS.ActiveSheetChanged, handler });
    }

    /**
     * 获取绑定字段信息
     * @param {*} context
     */
    getBindPath(context) {
        const { sheet, row, col } = context;
        if (sheet && (row === 0 || !!row) && (col === 0 || !!col)) {
            return sheet.getBindingPath(row, col);
        }
        return;
    }

    /**
     * 是否绑定字段单元格
     * @param {*} context
     */
    isBindCell(context) {
        const bindPath = this.getBindPath(context);
        return !!bindPath;
    }

    paint(ctx, value, x, y, w, h, style, context) {
        const bindPath = this.getBindPath(context);
        if (bindPath) {
            //绑定字段，添加角标
            style.decoration = {
                cornerFold: {
                    size: 8,
                    position: GC.Spread.Sheets.CornerPosition.leftTop,
                    color: 'green',
                },
            };
            if (!isNullOrUndef(value)) {
                value = '[' + bindPath + ']';
            }
        }
        super.paint(ctx, value, x, y, w, h, style, context);
    }

    getHitInfo(x, y, cellStyle, cellRect, context) {
        return {
            cellRect,
            context,
        };
    }

    _initIcon() {
        if (!this._iconEle) {
            this._iconEle = document.getElementById(Ele_Id);
            if (!this._iconEle) {
                let iconEle = document.createElement('div');
                iconEle.id = Ele_Id;
                document.body.append(iconEle);
                const style = iconEle.style;
                style.position = 'absolute';
                style.width = '16px';
                style.height = '16px';
                style.display = 'flex';
                style.backgroundColor = 'white';
                style.alignItems = 'center';
                style.justifyContent = 'center';
                this._iconEle = iconEle;
            }
        }
        return this._iconEle;
    }

    _showIcon(hitinfo) {
        const iconEle = this._initIcon();
        const { cellRect, context } = hitinfo;
        const { x, y, width } = cellRect;
        const { sheet } = context;
        const style = iconEle.style;
        const spread = sheet.getParent();
        const host = spread.getHost();
        const rect = host.getBoundingClientRect();
        style.left = `${rect.left + x + width}px`;
        style.top = `${rect.top + y}px`;
        style.display = 'flex';
        const { row, col } = getActiveIndexBySheet(sheet);
        this.root = createRoot(iconEle);
        this.root.render(
            <Setting
                value={getCellTagPlugins(sheet, row, col)}
                onChange={(plugins) => {
                    applyToSelectedCell(sheet,(sheet,row,col)=>{
                        clearAllCellTagPlugin(sheet,row,col);
                        plugins = plugins ? plugins:[];
                        plugins.forEach(plugin=>{
                            setCellTagPlugin(sheet,row,col,plugin);
                        });
                    });
                }}
            ></Setting>
        );
    }

    _hideIcon() {
        const iconEle = this._initIcon();
        if (this.root) {
            this.root.unmount();
        }
        iconEle.style.display = 'none';
    }

    processMouseDown(hitinfo) {
        const { context } = hitinfo;
        this.sheet = context.sheet;
        if (this.isBindCell(context)) {
            this._showIcon(hitinfo);
        } else {
            this._hideIcon();
        }
    }
}

export default DefaultCell;
