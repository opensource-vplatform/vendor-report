import { createRoot } from 'react-dom/client';

import {
  bind,
  EVENTS,
} from '@event/EventManager';
import { genUUID } from '@utils/commonUtil';
import { getOffsetFromBody } from '@utils/domUtil';
import { isFunction } from '@utils/objectUtil';
import {
  applyToSelectedCell,
  getNamespace,
  getSpecifiedRect,
} from '@utils/spreadUtil';
import {
  clearAllCellTagPlugin,
  getActiveIndexBySheet,
  getCellInstanceId,
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

    _refreshIconPosition() {
        if (this._iconEle) {
            const style = getComputedStyle(this._iconEle);
            const width = style.width;
            const height = style.height;
            if ('0px' !== width && '0px' !== height && this.sheet) {
                const spread = this.sheet.getParent();
                if (spread && spread.getActiveSheet() === this.sheet) {
                    const { row, col } = getActiveIndexBySheet(this.sheet);
                    const span = this.sheet.getSpan(row, col);
                    const rowIndex = span ? span.row + span.rowCount : row;
                    const colIndex = span ? span.col + span.colCount : col;
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
                            style.left = rect.x + 2 + rect.width + 'px';
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
        const showIcon = () => {
            this._initIcon();
            refreshIconPosition();
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
        this._bindEvents([EVENTS.Inited, EVENTS.onEditorVisible], showIcon);
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
        return bindPath&&bindPath.split('.').length==2;
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

    /**
     * 显示绑定样式
     * @param {*} style
     */
    _showBindingStyle(style) {
        //绑定字段，添加角标
        const posType = GC.Spread.Sheets.CornerPosition;
        style.decoration = {
            cornerFold: {
                size: 8,
                position: posType.rightBottom,
                color: 'green',
            },
        };
    }

    _showFormulaStyle(style) {
        const posType = GC.Spread.Sheets.CornerPosition;
        style.decoration = {
            cornerFold: {
                size: 8,
                position: posType.rightBottom,
                color: 'blue',
            },
        };
    }

    _getField(bindingPath) {
        if (this.spread && isFunction(this.spread.getDesignerDatasources)) {
            const datasources = this.spread.getDesignerDatasources();
            if (datasources && datasources.length > 0) {
                const paths = bindingPath.split('.');
                const code = paths[0];
                const datasource = datasources.find(
                    (datasource) => datasource.code == code
                );
                if (datasource) {
                    if (paths.length == 2) {
                        const children = datasource.children;
                        if (children && children.length > 0) {
                            const field = children.find(
                                (field) => field.code == paths[1]
                            );
                            if (field) {
                                return { datasource, field };
                            }
                        }
                    }
                }
            }
        }
        return null;
    }

    _showBindingText(value, context) {
        const bindPath = this.getBindPath(context);
        const define = this._getField(bindPath);
        if (define) {
            const { datasource, field } = define;
            const datasourceName = datasource.name
                ? datasource.name
                : datasource.code;
            return `[${datasourceName}.${
                field.name ? field.name : field.code
            }]`;
        }
        return value;
    }

    _hasFormula(context) {
        const { sheet, row, col } = context;
        return !!sheet.getFormula(row, col);
    }

    paint(ctx, value, x, y, w, h, style, context) {
        const sheet = context.sheet;
        this.spread = sheet.getParent();
        const bindPath = this.getBindPath(context);
        if (bindPath) {
            this._showBindingStyle(style);
            value = this._showBindingText(value, context);
            this._showIconDuringPaint(x, y, w, h, context);
        } else if (this._hasFormula(context)) {
            this._showFormulaStyle(style);
        } else {
            this._hideIcon();
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

    _showIcon(cellRect, context) {
        const iconEle = this._initIcon();
        const { x, y, width } = cellRect;
        const { sheet, row, col } = context;
        const style = iconEle.style;
        const spread = sheet.getParent();
        const host = spread.getHost();
        const rect = host.getBoundingClientRect();
        style.left = `${rect.left + x + width}px`;
        style.top = `${rect.top + y}px`;
        style.display = 'flex';
        this.root = createRoot(iconEle);
        this.root.render(
            <Setting
                value={getCellTagPlugins(sheet, row, col)}
                onChange={(plugins) => {
                    applyToSelectedCell(sheet, (sheet, row, col) => {
                        clearAllCellTagPlugin(sheet, row, col);
                        const bindingPath = sheet.getBindingPath(row, col);
                        if (bindingPath) {
                            const paths = bindingPath.split('.');
                            const instanceId = getCellInstanceId(sheet,row,col);
                            const tableCode = paths[0];
                            const fieldCode = paths[1];
                            plugins = plugins ? plugins : [];
                            plugins.forEach((plugin) => {
                                const config = plugin.config || {};
                                config.tableCode = tableCode;
                                config.fieldCode = fieldCode;
                                config.instanceId = instanceId
                                plugin.config = config;
                                setCellTagPlugin(sheet, row, col, plugin);
                            });
                        }
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
        const { cellRect, context } = hitinfo;
        this.sheet = context.sheet;
        if (this.isBindCell(context)) {
            this._showIcon(cellRect, context);
        } else {
            this._hideIcon();
        }
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
