import { useEffect } from 'react';

import { getSheetRect } from '../utils/spreadUtil';

function floorOrCeil(zoomFactor) {
  if (true) {
    let num = zoomFactor * 10;
    const decimal = num - Math.floor(num); // 获取小数部分
    if (decimal < 0.5) {
      num = Math.floor(num) / 10; // 小于0.5时向下取整
    } else {
      num = Math.ceil(num) / 10; // 大于等于0.5时向上取整
    }
    if (num < zoomFactor) {
      zoomFactor = num;
    }
  }

  return zoomFactor;
}

export function zoom(ctxVal) {
  const {
    json: _json,
    cacheJson,
    paperStyle,
    paperWrapWidth,
    paperWrapHeight,
    paper,
    paperWrapStylePadding,
  } = ctxVal;
  let {
    width: paperWidth,
    height: paperHeight,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
  } = paper;
  let paperWrapStyle = {};
  //还原配置
  _json.showVerticalScrollbar = cacheJson.showVerticalScrollbar;
  _json.showHorizontalScrollbar = cacheJson.showHorizontalScrollbar;

  //缩放类型：适合页宽
  if (ctxVal.zoomValue === 'suitableToPageWidth') {
    paperWidth = '100%'; //纸张宽度
    let diffHeight =
      paperWrapStylePadding.top +
      paperWrapStylePadding.bottom +
      paddingBottom +
      paddingTop +
      28 +
      20;
    let diffWidth =
      paperWrapStylePadding.left +
      paperWrapStylePadding.right +
      paddingLeft +
      paddingRight +
      10;
    //计算报表画布canvas的宽度；16：边距；28：报表底部工具栏;10:滚动条宽度
    let width = paperWrapWidth - diffWidth;
    let height = 0;
    //报表缩放因子计算
    Object.values(_json?.sheets ?? {}).forEach((sheet) => {
      const { isSelected = false } = sheet;
      if (!isSelected) {
        return;
      }
      const { sheetWidth, sheetHeight } = getSheetRect(sheet);
      //const zoomFactor = width / sheetWidth;
      const zoomFactor = floorOrCeil(width / sheetWidth);
      //缩放后内容新高度
      height = sheetHeight * zoomFactor;
      width = sheetWidth * zoomFactor;
      sheet.zoomFactor = zoomFactor;
    });
    paperHeight = height + 10 + diffHeight;
    //paperWidth = width + diffWidth;
    paperStyle.display = 'flex';
    if (paperWidth < paperWrapWidth) {
      paperWrapStyle = { justifyContent: 'center' };
    }
  }

  //缩放类型：适合页面
  if (ctxVal.zoomValue === 'suitableToPage') {
    const widthZoomFactor = paperWrapWidth / paperWidth;
    const heightZoomFactor = paperWrapHeight / paperHeight;
    let diffWidth = 16 + paddingLeft + paddingRight;
    let diffHeight = 16 + paddingBottom + paddingTop + 28 + 20;
    let type = '';
    if (widthZoomFactor < heightZoomFactor) {
      paperWidth = paperWrapWidth - 16;
      type = 'width';
    } else {
      paperHeight = paperWrapHeight - 16;
      type = 'height';
    }

    //计算报表画布canvas的宽度；16：边距；28：报表底部工具栏
    let width = paperWrapWidth - diffWidth;
    let height = paperWrapHeight - diffHeight;
    //报表缩放因子计算
    Object.values(_json?.sheets ?? {}).forEach((sheet) => {
      const { isSelected = false } = sheet;
      if (!isSelected) {
        return;
      }
      const { sheetWidth, sheetHeight } = getSheetRect(sheet);
      let zoomFactor = 1;
      let value = 0;
      let limitValue = 0;
      if (type === 'height') {
        zoomFactor = height / sheetHeight;
        value = sheetWidth;
        limitValue = width;
      } else {
        zoomFactor = width / sheetWidth;
        value = sheetHeight;
        limitValue = height;
      }
      let newValue = 0;
      let index = 0;
      do {
        if (index > 0) {
          zoomFactor -= 0.1;
        }
        newValue = value * zoomFactor;
        index++;
      } while (newValue > limitValue);

      //重新计算画布大小
      if (type === 'height') {
        if (index > 1) {
          height = sheetHeight * zoomFactor;
        }
        width = sheetWidth * zoomFactor;
      } else {
        if (index > 1) {
          width = sheetWidth * zoomFactor;
        }
        height = sheetHeight * zoomFactor;
      }
      //zoomFactor = floorOrCeil(zoomFactor);
      sheet.zoomFactor = zoomFactor;
    });
    //纸张大小等于画布大小加上边距等
    paperWidth = diffWidth + width;
    paperHeight = diffHeight + height - 28;

    paperStyle.display = 'flex';
    if (paperWidth < paperWrapWidth) {
      paperWrapStyle = { justifyContent: 'center' };
    }
  }

  //缩放类型：实际大小
  if (ctxVal.zoomValue === 'actualSize') {
    //计算报表画布canvas的宽度；16：边距；28：报表底部工具栏
    let diffWidth = 16 + paddingLeft + paddingRight;
    let width = paperWidth - diffWidth;

    let diffHeight = 16 + paddingBottom + paddingTop + 28;
    let height = paperHeight - diffHeight;
    //纸张大小大于等于内容大小
    Object.values(_json?.sheets ?? {}).forEach((sheet) => {
      const { isSelected = false } = sheet;
      if (!isSelected) {
        return;
      }
      const { sheetWidth, sheetHeight } = getSheetRect(sheet);
      width = sheetWidth;
      height = sheetHeight;
      //实际大小应该将缩放因子设置为1
      sheet.zoomFactor = 1;
    });
    paperHeight = height + diffHeight;
    paperWidth = width + diffWidth;
    paperStyle.display = 'flex';
    if (paperWidth < paperWrapWidth) {
      paperWrapStyle = { justifyContent: 'center' };
    }
  }
  //缩放类型：其它

  //纸张大小不能大于容器大小(存在性能问题)
  if (paperHeight > paperWrapHeight) {
    _json.showVerticalScrollbar = true;
    paperHeight = '100%';
  }

  if (paperWidth > paperWrapWidth) {
    paperWidth = '100%';
    _json.showHorizontalScrollbar = true;
  }
  return {
    ...ctxVal,
    json: { ..._json },
    paperStyle: {
      ...paperStyle,
      width: paperWidth,
      height: paperHeight,
    },
    paperWrapStyle,
  };
}

export default function useZoom(ctxVal, setCtxVal) {
  //设置缩放
  ctxVal.setZoomInfo = (zoomValue, zoomType = 'zoom') => {
    return new Promise((resolve) => {
      setCtxVal((ctxVal) => {
        if (zoomValue === ctxVal.zoomValue && zoomType === ctxVal.zoomType) {
          resolve();
          return ctxVal;
        }
        resolve();
        return {
          ...ctxVal,
          zoomValue,
          isLoading: true,
        };
      });
    });
  };
  useEffect(() => {
    //缩放
    setCtxVal((ctxVal) => {
      return zoom(ctxVal);
    });
  }, [ctxVal.zoomValue, ctxVal.dataSource, ctxVal.isRefresh]);
}
