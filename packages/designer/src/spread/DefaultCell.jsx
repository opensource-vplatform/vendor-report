import { createRoot } from 'react-dom/client';

import {
  bind,
  EVENTS,
} from '@event/EventManager';
import {
  getOffsetFromBody,
  isUndefined,
} from '@toone/report-util';
import {
  getNamespace,
  getSpecifiedRect,
} from '@utils/spreadUtil';
import { getActiveIndexBySheet } from '@utils/worksheetUtil';

import Setting, {
  isShowIcon,
  paintCell,
} from './cellsetting/index';

const GC = getNamespace();

export class DefaultCell extends GC.Spread.Sheets.CellTypes.Text {

    provider = 'toone';

    constructor() {
        super();
        this._bindEvent();
    }

    _refreshIconPosition(row, col) {
        if (this._iconEle) {
            const style = getComputedStyle(this._iconEle);
            const width = style.width;
            const height = style.height;
            if (
                '0px' !== width &&
                '0px' !== height &&
                style.display != 'none' &&
                this.sheet
            ) {
                const spread = this.sheet.getParent();
                if (spread && spread.getActiveSheet() === this.sheet) {
                    if (isUndefined(row) || isUndefined(col)) {
                        const index = getActiveIndexBySheet(this.sheet);
                        row = index.row;
                        col = index.col;
                    }
                    const span = this.sheet.getSpan(row, col);
                    const rowIndex = row;//span ? span.row + span.rowCount : row;
                    const colIndex = col;//span ? span.col + span.colCount : col;
                    const lastRowIndex = this.sheet.getLastFullyVisibleRow();
                    const lastColIndex = this.sheet.getLastFullyVisibleColumn();
                    if (rowIndex <= lastRowIndex && colIndex <= lastColIndex) {
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
                            style.left = rect.x + 3 + rect.width + 'px';
                            style.top = rect.y + 'px';
                            return;
                        }
                    }
                }
            }
            this._iconEle.style.display = 'none';
        }
    }

    _bindEvents(events, handler) {
        events.forEach((evt) => {
            bind({ event: evt, handler });
        });
    }

    _bindEvent() {
        const refreshIconPosition = () => {
            this._refreshIconPosition();
        };
        this._bindEvents(
            [
                EVENTS.ColumnWidthChanged,
                EVENTS.RowHeightChanged,
                EVENTS.LeftColumnChanged,
                EVENTS.TopRowChanged,
                EVENTS.ViewZoomed,
                EVENTS.SheetChanged,
                EVENTS.ActiveSheetChanged,
            ],
            refreshIconPosition
        );
        bind({
            event: EVENTS.onPreviewVisible,
            handler: () => {
                //预览时隐藏设置图标
                this._hideIcon();
            },
        });
        this._bindEvents([EVENTS.onEditorVisible], () => {
            if(this.sheet&&this.sheet.getParent()){
                const { sheet, row, col } = getActiveIndexBySheet(this.sheet);
                if (this._couldShowIcon(sheet, row, col)) {
                    const icon = this._initIcon();
                    icon.style.display = 'flex';
                }
            }
        });
    }

    /**
     * 显示设置图标
     * @param {*} context
     */
    _showIconDuringPaint(left, top, width, height, context) {
        const { row, col, sheet } = context;
        this.sheet = sheet;
        const activeIndex = getActiveIndexBySheet(sheet);
        if (row == activeIndex.row && col == activeIndex.col) {
            this._showIcon({ x: left, y: top, width, height }, context);
            this._refreshIconPosition();
        }
    }

    _isDesignMode(sheet) {
        return sheet.getParent()?.getHost()?.dataset?.type !== 'preview';
    }

    _couldShowIcon(sheet, row, col) {
        return this._isDesignMode(sheet) && isShowIcon(sheet, row, col);
    }

    _paintSettingIcon(sheet, row, col) {
        if (this._couldShowIcon(sheet, row, col)) {
            this._showIcon(row, col);
        } else {
            this._hideIcon();
        }
    }

    paint(ctx, value, x, y, w, h, style, context) {
        this.sheet = context.sheet;
        this.spread = this.sheet.getParent();
        value = paintCell(context, style, value);
        const { row, col } = getActiveIndexBySheet(this.sheet);
        if (row == context.row && col == context.col) {
            //当前绘制的单元格为激活的单元格，才判断是否需要显示设置图标
            this._paintSettingIcon(this.sheet, row, col);
        } else {
            //非绘制激活的单元格，隐藏设置图标
            //this._hideIcon();
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
            //this._iconEle = document.getElementById(Ele_Id);
            if (!this._iconEle) {
                let iconEle = document.createElement('div');
                //iconEle.id = Ele_Id;
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
                this.root = createRoot(iconEle);
                this.root.render(<Setting sheet={this.sheet}></Setting>);
            }
        }
        return this._iconEle;
    }

    _showIcon(row, col) {
        const iconEle = this._initIcon();
        const style = iconEle.style;
        style.display = 'flex';
        this._refreshIconPosition(row, col);
    }

    _hideIcon() {
        const iconEle = this._initIcon();
        if (iconEle) {
            iconEle.style.display = 'none';
        }
    }

    processMouseDown(hitinfo) {
        const { context } = hitinfo;
        const { sheet, row, col } = context;
        this._paintSettingIcon(sheet, row, col);
    }

    destory() {
        this.sheet = null;
        const root = this.root;
        if (root) {
            root.unmount();
        }
        this.root = null;
        document.body.removeChild(this._iconEle);
        this._iconEle = null;
        this.spread = null;
    }

    toJSON() {
        const json = { ...super.toJSON() };
        delete json.sheet;
        delete json.root;
        delete json._iconEle;
        delete json.spread;
        return json;
    }
}

export default DefaultCell;
