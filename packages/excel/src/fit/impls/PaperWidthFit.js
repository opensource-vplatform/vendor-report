import AbstractPaperFit from '../AbstractPaperFit';

/**
 * 页宽适配
 */
class PaperWidthFit extends AbstractPaperFit {
  constructor(spread, paperEle, containerEle) {
    super(spread, paperEle, containerEle);
  }

  getZoomedPaperSize(paperSize, containerSize, sheet) {
    const { containerWidth = width, containerHeight = height } = containerSize;
    const { paperWidth = width, paperHeight = height } = paperSize;
    if (this.isPaperLandscape(sheet)) {
      //纸张横向
      const zoom = (containerWidth - 60) / paperHeight; //计算出纸张缩放比例，其中60px为容器间距及容器滚动条预留的宽度
      return {
        width: containerWidth - 60,
        height: paperWidth * zoom,
      };
    } else {
      //纸张纵向
      const zoom = (containerWidth - 60) / paperWidth; //计算出纸张缩放比例，其中60px为容器间距及容器滚动条预留的宽度
      return {
        width: containerWidth - 60,
        height: paperHeight * zoom,
      };
    }
  }

  /**
   * 设置容器样式
   * 1、上下间距8px，左右间距0px
   */
  setContainerStyle() {
    this.setStyle(this.containerEle, { padding: `8px 0px` });
  }

  /**
   * 设置纸张样式
   */
  setPaperStyle(paperWidth) {}

  fit() {
    const sheet = this.spread.getActiveSheet();
    if (sheet) {
      this.setContainerStyle();
      const containerSize = this.getContainerSize();
      //预览60px为纸张与容器间距以及容器纵向滚动条的宽度
      const paperWidth = containerSize.width - 60;
      const margin = this.getSheetMargin(sheet);
      const hScrollHeight = this.getHScrollerHeight();
      const vScrollWidth = this.getVScrollerWidth();
      //工作表宽度
      const sheetWidth = paperWidth - margin.left - margin.right;
      const width = this.getWidthBySheet(sheet);
      const zoom = (sheetWidth - vScrollWidth) / width;
      sheet.zoom(zoom);
      const height = this.getHeightBySheet(sheet);
      const sheetHeight = zoom * height + hScrollHeight;
      this.setStyle(this.paperEle, {
        width: `${sheetWidth}px`,
        height: `${sheetHeight}px`,
        padding: `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`,
      });
      const sheets = this.spread.sheets;
      if (sheets && sheets.length > 0) {
        sheets.forEach((sht) => {
          if (sht !== sheet) {
            const width = this.getWidthBySheet(sht);
            if (width > 0) {
              const zoom = sheetWidth / width;
              sheet.zoom(zoom);
            }
          }
        });
      }
    }
  }
}

export default PaperWidthFit;
