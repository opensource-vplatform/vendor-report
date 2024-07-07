import { getNamespace } from '@toone/report-util';

let pxperinch = null;

/**
 * 页面适配基类
 * 主要功能：
 * 根据外部容器适配方案调整sheet的缩放比例
 */
class AbstractPaperFit {
  /**
   *
   * @param {*} spread
   * @param {*} paperEle
   * @param {*} containerEle
   */
  constructor(spread, paperEle, containerEle) {
    this.spread = spread;
    this.paperEle = paperEle;
    this.containerEle = containerEle;
  }

  /**
   * 设置dom元素样式
   * @param {*} el
   * @param {*} style
   */
  setStyle(el, style) {
    const sty = el.style;
    Object.assign(sty, style);
  }

  /**
   * 百分之一英尺单位转换成像素
   */
  percentInchTopx(percentInch) {
    const pxperinch = this.getPxPerInch();
    return (percentInch * pxperinch) / 100;
  }

  /**
   * 获取容器大小
   * @returns
   */
  getContainerSize() {
    const style = getComputedStyle(this.containerEle);
    return {
      width: parseFloat(style.width),
      height: parseFloat(style.height),
    };
  }

  /**
   * 工作表打印是否横向
   * @param {*} sheet
   */
  isPaperLandscape(sheet) {
    const printInfo = sheet.printInfo();
    const orientation = printInfo.orientation();
    return orientation == GC.Spread.Sheets.Print.PrintPageOrientation.landscape;
  }

  /**
   * 获取一英寸为多少像素
   * @returns
   */
  getPxPerInch() {
    if (pxperinch == null) {
      const div = document.createElement('div');
      div.style.width = '1in';
      div.style.visibility = 'none';
      document.body.appendChild(div);
      const style = getComputedStyle(div);
      pxperinch = parseFloat(style.width);
      document.body.removeChild(div);
    }
    return pxperinch;
  }

  /**
   * 获取指定纸张大小
   * @param {*} paperKind
   */
  getPaperKindSizeBySheet(sheet) {
    const printInfo = sheet.printInfo();
    const paperSize = printInfo.paperSize();
    return {
      height: this.percentInchTopx(paperSize.height()),
      width: this.percentInchTopx(paperSize.width()),
    };
  }

  /**
   * 获取工作表间距
   * @param {*} sheet
   */
  getSheetMargin(sheet) {
    const printInfo = sheet.printInfo();
    const { top = 0, bottom = 0, left = 0, right = 0 } = printInfo.margin();
    return {
      top: this.percentInchTopx(top),
      bottom: this.percentInchTopx(bottom),
      left: this.percentInchTopx(left),
      right: this.percentInchTopx(right),
    };
  }

  /**
   * 设置纸张大小
   */
  setPaperSize(size) {
    const { height = 0, width = 0 } = size;
    this.paperEle.style.width = `${width}px`;
    this.paperEle.style.height = `${height}px`;
  }

  /**
   * 设置纸张间距
   * @param {*} padding
   */
  setPaperPadding(padding) {
    const { top = 0, bottom = 0, left = 0, right = 0 } = padding;
    this.paperEle.style.padding = `${top}px ${right}px ${bottom}px ${left}px`;
  }

  /**
   * 获取工作簿的配置项
   * @param {*} attr
   */
  getSpreadOption(attr) {
    const options = this.spread.options;
    return options[attr];
  }

  /**
   * 获取工作表配置项
   * @param {*} sheet
   * @param {*} attr
   * @returns
   */
  getSheetOption(sheet, attr) {
    const options = sheet.options;
    return options[attr];
  }

  /**
   * 获取工作表默认项
   * @param {*} sheet
   * @param {*} attr
   * @returns
   */
  getSheetDefault(sheet, attr) {
    const defaults = sheet.defaults;
    return defaults[attr];
  }

  /**
   * 根据工作表获取宽度(未包含垂直滚动条宽度)
   * @param {*} sheet
   */
  getWidthBySheet(sheet) {
    if (sheet.visible()) {
      //工作表显示才计算宽度
      let width = 0;
      const rowHeaderVisible = this.getSheetOption(sheet, 'rowHeaderVisible');
      if (rowHeaderVisible) {
        //显示行标题
        width += this.getSheetDefault(sheet, 'rowHeaderColWidth');
      }
      const colCount = sheet.getColumnCount();
      for (let i = 0; i < colCount; i++) {
        if (sheet.getColumnVisible(i)) {
          //列可见，汇总列宽
          width += sheet.getColumnWidth(i);
        }
      }
      return width;
    }
    return -1;
  }

  /**
   * 根据工作表获取高度（未包含水平滚动条高度）
   * @param {*} sheet
   */
  getHeightBySheet(sheet) {
    if (sheet.visible()) {
      //工作表可见才汇总高度
      let height = 0;
      const colHeaderVisible = this.getSheetOption(sheet, 'colHeaderVisible');
      if (colHeaderVisible) {
        //汇总工作表列头高度
        height += this.getSheetDefault(sheet, 'colHeaderRowHeight');
      }
      const rowCount = sheet.getRowCount();
      for (let i = 0; i < rowCount; i++) {
        if (sheet.getRowVisible(i)) {
          //行可见，汇总行高度
          height += sheet.getRowHeight(i);
        }
      }
      return height;
    }
    return -1;
  }

  /**
   * 获取垂直滚动条宽度
   */
  getVScrollerWidth() {
    const showVerticalScrollbar = this.getSpreadOption('showVerticalScrollbar');
    return showVerticalScrollbar ? 22 : 0;
  }

  /**
   * 获取水平滚动条高度
   */
  getHScrollerHeight() {
    const showHorizontalScrollbar = this.getSpreadOption(
      'showHorizontalScrollbar'
    );
    return showHorizontalScrollbar ? 28 : 0;
  }

  /**
   * 获取电子表格选项卡条高度
   */
  getTabStripHeight() {
    const tabStripVisible = this.getSpreadOption('tabStripVisible');
    return tabStripVisible ? 28 : 0;
  }

  fit() {
    throw Error('未实现页面适配逻辑，请检查！');
  }
}

export default AbstractPaperFit;
