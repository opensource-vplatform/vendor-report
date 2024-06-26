import { createRoot } from 'react-dom/client';

import {
  bind,
  EVENTS,
} from '@event/EventManager';
import {
  getOffsetFromBody,
  isUndefined,
} from '@toone/report-util';
import { getBaseUrl } from '@utils/environmentUtil';
import {
  getNamespace,
  getSpecifiedRect,
} from '@utils/spreadUtil';
import { getActiveIndexBySheet } from '@utils/worksheetUtil';

import Setting, {
  getDirection,
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

  _showDirectionIcons(item) {
    if (isUndefined(item)) {
      const icons = this.directionIcons;
      if (icons) {
        icons.forEach((item) => {
          this._showDirectionIcons(item);
        });
      }
    } else {
      item.ele.style.display = 'block';
    }
  }

  _hideDirectionIcons(item) {
    if (isUndefined(item)) {
      const icons = this.directionIcons;
      if (icons) {
        icons.forEach((item) => {
          this._showDirectionIcons(item);
        });
      }
    } else {
      item.ele.style.display = 'none';
    }
  }

  _refreshDirectionIconPosition(item) {
    if (isUndefined(item)) {
      const icons = this.directionIcons;
      if (icons) {
        icons.forEach((item) => {
          this._refreshDirectionIconPosition(item);
        });
      }
    } else {
      if (!item) {
        return;
      }
      const spread = this.sheet.getParent();
      if (
        spread &&
        this._isDesignMode(this.sheet) &&
        spread.getActiveSheet() === this.sheet &&
        item.sheet == this.sheet
      ) {
        const { row, col } = item;
        const span = this.sheet.getSpan(row, col);
        const rowIndex = row;
        const colIndex = col;
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
          const ele = item.ele;
          const offset = getOffsetFromBody(ele);
          if (rect && offset) {
            const zoom = this.sheet.zoom() || 1;
            const style = ele.style;
            style.display = 'flex';
            style.left = rect.x + 'px';
            style.top = rect.y + 'px';
            style.width = `${ele.dataset.width * zoom}px`;
            style.height = `${ele.dataset.height * zoom}px`;
            style.display = 'block';
            return;
          }
        }
      }
      item.ele.style.display = 'none';
    }
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
          const rowIndex = row; //span ? span.row + span.rowCount : row;
          const colIndex = col; //span ? span.col + span.colCount : col;
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
      this._refreshDirectionIconPosition();
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
        this._hideDirectionIcons();
      },
    });
    this._bindEvents([EVENTS.onEditorVisible], () => {
      if (this.sheet && this.sheet.getParent()) {
        const { sheet, row, col } = getActiveIndexBySheet(this.sheet);
        if (this._couldShowIcon(sheet, row, col)) {
          const icon = this._initIcon();
          icon.style.display = 'flex';
        }
        this._showDirectionIcons();
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
  _initDirectionIcon(width, height, src) {
    let iconEle = document.createElement('img');
    const style = iconEle.style;
    style.position = 'absolute';
    iconEle.dataset.width = width;
    iconEle.dataset.height = height;
    style.backgroundColor = '#ffea37';
    style.display = height;
    iconEle.src = src;
    document.body.append(iconEle);
    return iconEle;
  }
  /**
   * 绘画单元格扩展方向图标
   * @param {*} sheet
   * @param {*} row
   * @param {*} col
   */
  _paintDirectionIcon(sheet, row, col) {
    const direction = getDirection(sheet, row, col);
    if (direction != null) {
      const directionIcons = this.directionIcons || [];
      let ele = null;
      let item = directionIcons.find(
        (item) => item.row === row && item.col === col && item.sheet === sheet
      );
      if (!item) {
        if (direction == 'v') {
          ele = this._initDirectionIcon(
            6,
            12,
            getBaseUrl() + '/css/icons/design/arrowDown.svg'
          );
        } else if (direction == 'h') {
          ele = this._initDirectionIcon(
            12,
            6,
            getBaseUrl() + '/css/icons/design/arrowRight.svg'
          );
        }
        item = {
          row,
          col,
          sheet,
          ele,
        };
        directionIcons.push(item);
      }
      this._refreshDirectionIconPosition(item);
      this.directionIcons = directionIcons;
    } else {
      const directionIcons = this.directionIcons;
      if (directionIcons) {
        const icon = directionIcons.find(
          (icon) =>
            icon.row === row && icon.col === col && icon.sheet === this.sheet
        );
        if (icon) {
          document.body.removeChild(icon.ele);
          const index = directionIcons.indexOf(icon);
          directionIcons.splice(index, 1);
        }
      }
    }
  }

  paint(ctx, value, x, y, w, h, style, context) {
    this.sheet = context.sheet;
    this.spread = this.sheet.getParent();
    value = paintCell(context, style, value, { canvasCtx: ctx, x, y, w, h });
    const { row, col } = getActiveIndexBySheet(this.sheet);
    if (row == context.row && col == context.col) {
      //当前绘制的单元格为激活的单元格，才判断是否需要显示设置图标
      this._paintSettingIcon(this.sheet, row, col);
    } else {
      //非绘制激活的单元格，隐藏设置图标
      //this._hideIcon();
    }
    this._paintDirectionIcon(this.sheet, context.row, context.col);
    if(!isUndefined(value)){
        super.paint(ctx, value, x, y, w, h, style, context);
    }
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
        style.zIndex = 1; //防止被扩展方向箭头遮盖
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
    if (this.directionIcons) {
      this.directionIcons.forEach((item) => {
        const ele = item.ele;
        document.body.removeChild(ele);
      });
      this.directionIcons = null;
    }
  }

  toJSON() {
    const json = { ...super.toJSON() };
    delete json.sheet;
    delete json.root;
    delete json._iconEle;
    delete json.spread;
    delete json.directionIcons;
    return json;
  }
}

export default DefaultCell;
