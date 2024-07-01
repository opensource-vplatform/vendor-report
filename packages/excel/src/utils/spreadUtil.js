import { getBaseUrl } from './environmentUtil';

/**
 * 获取命令空间
 */
export const getNamespace = function () {
  return window.GC;
};

export const withBatchCalcUpdate = function (spread, updateHandler) {
  if (spread) {
    spread.suspendPaint();
    spread.suspendEvent();
    spread.suspendCalcService();
    const sheet = spread.getActiveSheet();
    try {
      updateHandler(sheet);
    } finally {
      spread.resumePaint();
      spread.resumeEvent();
      spread.resumeCalcService();
    }
  }
};

const PLUGIN_SRCS = {
  print: ['print.min.js'],
  pdf: ['print.min.js', 'pdf.min.js'],
  excel: ['excelio.min.js'],
};

export const getPluginSrc = function (type) {
  return PLUGIN_SRCS[type].map((src) => toExcelPluginUrl(src));
};

/**
 * 将样式应用到选择的单元格
 * @returns
 */
export const applyToRange = function (cellRange, sheet, func) {
  const { col, row, rowCount, colCount } = cellRange;
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      func(sheet, row + i, col + j);
    }
  }
};

export function getExcelVersion() {
  const GC = getNamespace();
  return GC.Spread.Sheets.productInfo.productVersion;
}

export const getExcelBaseUrl = function () {
  const version = getExcelVersion();
  return `${getBaseUrl()}/vendor/excel/${version}`;
};

export const toExcelPluginUrl = function (filename) {
  return `${getExcelBaseUrl()}/plugins/${filename}`;
};

const getSheetRect = function (sheet) {
  const sheetJSON = sheet.toJSON();
  const {
    rows = [],
    rowCount = 200,
    colHeaderVisible = true,
    colHeaderRowInfos = [],
    columns = [],
    columnCount = 20,
    rowHeaderVisible = true,
    rowHeaderColInfos = [],
  } = sheetJSON;

  //内容高度
  let sheetHeight = 0;
  if (colHeaderVisible) {
    if (colHeaderRowInfos.length > 0) {
      colHeaderRowInfos.forEach((info) => {
        sheetHeight += info?.size || 20;
      });
    } else {
      sheetHeight += 20;
    }
  }

  for (let i = 0; i < rowCount; i++) {
    sheetHeight += rows[i]?.size || 20;
  }

  //内容宽度
  let sheetWidth = 30; //显示竖向滚动条，则添加竖向滚动条宽度
  if (rowHeaderVisible) {
    const rowHeaderWidth = sheetJSON.defaults?.rowHeaderColWidth || 40; //默认行标题宽度
    if (rowHeaderColInfos.length > 0) {
      rowHeaderColInfos.forEach((info) => {
        sheetWidth += info?.size || rowHeaderWidth;
      });
    } else {
      sheetWidth += rowHeaderWidth;
    }
  }
  const defColWidth = sheetJSON.defaults?.colWidth || 62; //默认列宽
  for (let i = 0; i < columnCount; i++) {
    sheetWidth += columns[i]?.size || defColWidth;
  }

  return {
    sheetHeight,
    sheetWidth,
  };
};

const recursionSheetZoom = function (sheet, el, spread) {
  spread.options.showHorizontalScrollbar = true;
  spread.options.showVerticalScrollbar = true;
  const result = new Promise(function (resolve) {
    let flag = true;
    function recursion() {
      let zoomFactor = sheet.zoom();
      if (zoomFactor <= 0.25 || zoomFactor >= 4) {
        resolve();
        return;
      }

      let hasScroll = false;
      const scrollbarWrappers = el?.current?.querySelectorAll?.(
        '.gc-scrollbar-wrapper'
      );
      scrollbarWrappers.forEach(function (scrollbarWrapper) {
        const scrollbarWrapperCss = window.getComputedStyle(scrollbarWrapper);
        const scrollbarWrapperHeight = Number(
          scrollbarWrapperCss.height.slice(0, -2)
        );
        const scrollbarWrapperWidth = Number(
          scrollbarWrapperCss.width.slice(0, -2)
        );

        const scrollHandle =
          scrollbarWrapper?.querySelector?.('.gc-scroll-handle');
        const scrollHandleCss = window.getComputedStyle(scrollHandle);
        const scrollHandleHeight = Number(scrollHandleCss.height.slice(0, -2));
        const scrollHandleWidth = Number(scrollHandleCss.width.slice(0, -2));

        const heightDiff = Math.floor(
          scrollbarWrapperHeight - scrollHandleHeight
        );
        const widthDiff = Math.floor(scrollbarWrapperWidth - scrollHandleWidth);
        if (
          (scrollbarWrapperHeight && heightDiff > 2) ||
          (scrollbarWrapperWidth && widthDiff > 2)
        ) {
          hasScroll = true;
        }
      });
      if (hasScroll) {
        //缩放
        flag = false;
        zoomFactor -= 0.01;
        sheet.zoom(zoomFactor);
        sheetZoom(sheet, zoomFactor);
        recursion();
      } else if (flag) {
        //如果没有滚动条，先放大到有滚动条为止再缩放
        zoomFactor += 0.05;
        sheet.zoom(zoomFactor);
        //sheetZoom(sheet, zoomFactor);
        recursion();
      } else {
        resolve();
      }
    }
    recursion();
  });
  result.then(function () {
    spread.options.showHorizontalScrollbar = false;
    spread.options.showVerticalScrollbar = false;
    spread.refresh();
    _resolve(true);
  });
};

const afterRefresh = function ({ spread, el }) {
  setTimeout(() => {
    spread.options.showHorizontalScrollbar = true;
    spread.options.showVerticalScrollbar = true;
    const { width: canvasWidth, height: canvasHeight } =
      getSpreadCanvasRect(el);
    spread.sheets.forEach((sheet) => {
      const { sheetHeight, sheetWidth } = getSheetRect(sheet);
      let heightZoomFactor = 1;
      if (sheetHeight > 0) {
        heightZoomFactor = canvasHeight / sheetHeight;
      }
      let widthZoomFactor = 1;
      if (sheetWidth > 0) {
        widthZoomFactor = canvasWidth / sheetWidth;
      }
      let zoomFactor = heightZoomFactor;
      if (heightZoomFactor >= widthZoomFactor) {
        zoomFactor = widthZoomFactor;
      }
      if (zoomFactor >= 4) {
        zoomFactor = 4;
      }
      sheetZoom(sheet, zoomFactor);
      recursionSheetZoom(sheet, el, spread);
    });
  }, 200);
};

export const zoomToPage = function ({
  spread,
  width,
  height,
  paper,
  setStyle,
  el,
}) {
  let { paperWidth, paperHeight, zoomFactor, direction } = genPaperHeight({
    spread,
    width,
    height,
    paper,
  });
  const verticalPadding = paper.paddingTop + paper.paddingBottom;
  const horizontalPadding = paper.paddingLeft + paper.paddingRight;
  if (direction === 'vertical') {
    paperWidth =
      paperWidth +
      horizontalPadding +
      (spread?.options?.tabStripVisible ? 30 : 0) -
      verticalPadding;
    if (paperWidth >= width - 20) {
      paperWidth = width - 20;
    }
  } else {
    paperHeight =
      paperHeight +
      verticalPadding +
      (spread?.options?.tabStripVisible ? 30 : 0) -
      horizontalPadding -
      horizontalPadding * 0.2; //30误差
    if (paperHeight >= height - 20) {
      paperHeight = height - 20;
    }
  }

  setStyle({
    ...paper,
    height: paperHeight,
    width: paperWidth,
    zoomFactor,
  });
  setTimeout(() => spread.refresh(), 0);
  afterRefresh({ spread, el });
};
let _resolve = null;
export const zoomToFit = function ({ spread, width, paper, setStyle, el }) {
  let paperHeight = 0;
  let paperWidth = 0;
  spread.sheets.forEach((sheet) => {
    const { sheetHeight, sheetWidth } = getSheetRect(sheet);
    paperHeight = sheetHeight;
    paperWidth = sheetWidth;
  });
  let zoomFactor = 1;
  if (width) {
    //10:预留滚动条
    const widthZoomFactor = (width - 16 - 10) / paperWidth;
    zoomFactor = widthZoomFactor;
    paperWidth = paperWidth * zoomFactor - 5;
    paperHeight = paperHeight * zoomFactor;
  }
  const verticalPadding = paper.paddingTop + paper.paddingBottom;
  const horizontalPadding = paper.paddingLeft + paper.paddingRight;
  setStyle({
    ...paper,
    height:
      paperHeight +
      (spread?.options?.tabStripVisible ? 100 : 50) +
      verticalPadding,
    width: paperWidth,
    zoomFactor,
  });
  setTimeout(() => spread.refresh(), 0);
  setTimeout(() => {
    const { width: canvasWidth } = getSpreadCanvasRect(el);
    spread.sheets.forEach((sheet) => {
      const { sheetWidth } = getSheetRect(sheet);
      let zoomFactor = 1;
      if (sheetWidth > 0) {
        zoomFactor = canvasWidth / sheetWidth;
      }
      if (zoomFactor >= 4) {
        zoomFactor = 4;
      }
      sheetZoom(sheet, zoomFactor);
      recursionSheetZoom(sheet, el, spread);
    });
  }, 200);
};

export const zoomToRecover = function ({ spread, setStyle, paper, el, width }) {
  let paperHeight = 0;
  let paperWidth = 0;
  spread.sheets.forEach((sheet) => {
    const { sheetHeight, sheetWidth } = getSheetRect(sheet);
    paperHeight = sheetHeight;
    paperWidth = sheetWidth;
  });

  const verticalPadding = paper.paddingTop + paper.paddingBottom;
  const horizontalPadding = paper.paddingLeft + paper.paddingRight;
  if (spread?.options?.tabStripVisible) {
    paperHeight += 35;
  }
  if (verticalPadding > 0) {
    paperHeight += verticalPadding;
  }

  if (horizontalPadding > 0) {
    paperWidth += horizontalPadding;
  }
  let exceededWidth = width < paperWidth ? true : false;
  setStyle({
    ...paper,
    height: paperHeight,
    width: paperWidth,
    zoomFactor: 1,
    exceededWidth,
  });
  setTimeout(() => spread.refresh(), 0);
  afterRefresh({ spread, el });
};

const getSpreadCanvasRect = function (el) {
  const canvasEl = el?.current?.querySelector?.('#vp_vp');
  const height = Number(canvasEl.getAttribute('height'));
  const width = Number(canvasEl.getAttribute('width'));
  return {
    height,
    width,
  };
};

const getSpreadWrapRect = function (el) {
  const css = getComputedStyle(el.current);
  const height = css.height;
  const width = css.width;
  return {
    isRender: width.endsWith('px') ? true : false,
    height: height.slice(0, -2),
    width: width.slice(0, -2),
  };
};

const genPaperHeight = function ({
  height,
  width,
  paper,
  zoomFactor: _zoomFactor = 1,
}) {
  let paperHeight = paper.height;
  let paperWidth = paper.width;

  let zoomFactor = 1;
  let direction = 'horizontal';
  if (width) {
    const widthZoomFactor = (width - 16) / paperWidth;
    zoomFactor = widthZoomFactor;

    if (height) {
      const heightZoomFactor = (height - 16) / paperHeight;
      if (heightZoomFactor < widthZoomFactor) {
        zoomFactor = heightZoomFactor;
        direction = 'vertical';
      }
    }
    if (direction === 'vertical') {
      paperWidth = paperWidth * zoomFactor;
    } else {
      paperWidth = width - 16;
    }
    if (direction === 'horizontal') {
      paperHeight = paperHeight * zoomFactor;
    } else {
      paperHeight = height - 16;
    }
  }

  return {
    paperWidth: paperWidth,
    paperHeight,
    zoomFactor,
    direction,
  };
};

const zoomByNumber = function ({
  spread,
  value,
  setStyle,
  width: _width,
  paper,
  el,
}) {
  let newValue = value;
  if (newValue >= 4) {
    newValue = 4;
  }
  if (newValue <= 0.5) {
    newValue = 0.5;
  }

  let paperHeight = paper.height * newValue;
  let paperWidth = paper.width * newValue;
  const verticalPadding = paper.paddingTop + paper.paddingBottom;
  const horizontalPadding = paper.paddingLeft + paper.paddingRight;
  if (spread?.options?.tabStripVisible) {
    paperHeight += 35;
  }
  if (verticalPadding > 0) {
    paperHeight += verticalPadding;
  }

  if (horizontalPadding > 0) {
    paperWidth += horizontalPadding;
  }

  let height = paperHeight;
  let width = paperWidth;

  let exceededWidth = _width < width ? true : false;
  setStyle({
    ...paper,
    height,
    width,
    zoomFactor: newValue,
    exceededWidth,
  });
  setTimeout(() => spread.refresh(), 0);
  afterRefresh({ spread, el });
};

export const zoom = function (params) {
  return new Promise((resolve) => {
    _resolve = resolve;
    const { el, value } = params;
    const { height, width, isRender } = getSpreadWrapRect(el);
    if (value === 'actualSize') {
      zoomToRecover({ ...params, width });
      return;
    }

    if (!isRender) {
      return;
    }
    let newValue = Number(value);
    if (!Number.isNaN(newValue)) {
      zoomByNumber({ ...params, value: newValue, width });
      return;
    }

    if (value === 'suitableToPageWidth') {
      zoomToFit({ ...params, width });
      return;
    }

    if (value === 'suitableToPage') {
      zoomToPage({ ...params, width, height });
      return;
    }
  });
};

export const zoomOut = function ({ spread, getStyle, setStyle, el, paper }) {
  let { zoomFactor } = getStyle();
  zoomFactor = Math.floor(zoomFactor * 10);
  if (zoomFactor === 12.5 || zoomFactor === 7.5 || zoomFactor === 2.5) {
    zoomFactor += 0.5;
  }

  let step = -1;
  if (zoomFactor >= 33) {
    step = -4;
  } else if (zoomFactor >= 21) {
    step = -3;
  } else if (zoomFactor >= 11) {
    step = -2;
  }
  zoomFactor = (zoomFactor + step) / 10;
  if (zoomFactor <= 0.5) {
    zoomFactor = 0.5;
  }

  const { width: _width } = getSpreadWrapRect(el);
  zoomByNumber({
    spread,
    value: zoomFactor,
    setStyle,
    width: _width,
    paper,
    el,
  });
  return (zoomFactor * 100).toFixed(0);
};

export const zoomIn = function ({ spread, getStyle, setStyle, el, paper }) {
  let { zoomFactor } = getStyle();
  zoomFactor = Math.floor(zoomFactor * 10);
  if (zoomFactor === 12.5 || zoomFactor === 7.5 || zoomFactor === 2.5) {
    zoomFactor += 0.5;
  }

  let step = 1;
  if (zoomFactor >= 33) {
    step = 4;
  } else if (zoomFactor >= 21) {
    step = 3;
  } else if (zoomFactor >= 11) {
    step = 2;
  }
  zoomFactor = (zoomFactor + step) / 10;
  if (zoomFactor >= 4) {
    zoomFactor = 4;
  }

  const { width: _width } = getSpreadWrapRect(el);
  zoomByNumber({
    spread,
    value: zoomFactor,
    setStyle,
    width: _width,
    paper,
    el,
  });
  return (zoomFactor * 100).toFixed(0);
};

const sheetZoom = function (sheet, value) {
  sheet.zoom(value);
  //sheet.zoom(value / (window.devicePixelRatio || 1));
};
