import { getNamespace } from '../utils/spreadUtil';

const GC = getNamespace();

/**
 * 线样式枚举
 * @catalog 枚举项
 * @namespace LineStyle
 * @enum {Integer}
 * @description 线样式枚举
 * @example TOONE.Report.LineStyle.dashed
 */
const LineStyle = {
    /**
     * 虚线
     */
    dashed: GC.Spread.Sheets.LineStyle.dashed,
    /**
     * 点
     */
    dotted: GC.Spread.Sheets.LineStyle.dotted,
    /**
     * 双实线
     */
    double: GC.Spread.Sheets.LineStyle.double,
    /**
     * 无边框
     */
    empty: GC.Spread.Sheets.LineStyle.empty,
    /**
     * 粗实线
     */
    thick: GC.Spread.Sheets.LineStyle.thick,
    /**
     * 实线
     */
    thin: GC.Spread.Sheets.LineStyle.thin,
};

/**
 * 水平位置
 * @catalog 枚举项
 * @enum {Integer}
 * @namespace HAlign
 * @description 水平位置
 * @example TOONE.Report.HAlign.center
 */
const HAlign = {
    /**
     * 居中
     */
    center: GC.Spread.Sheets.HorizontalAlign.center,
    /**
     * 靠左
     */
    left: GC.Spread.Sheets.HorizontalAlign.left,
    /**
     * 靠右
     */
    right: GC.Spread.Sheets.HorizontalAlign.right,
};

/**
 * 垂直位置
 * @catalog 枚举项
 * @enum {Integer}
 * @namespace VAlign
 * @description 垂直位置
 * @example TOONE.Report.VAlign.center
 */
const VAlign = {
    /**
     * 居中
     */
    center: GC.Spread.Sheets.VerticalAlign.center,
    /**
     * 靠下
     */
    bottom: GC.Spread.Sheets.VerticalAlign.bottom,
    /**
     * 靠上
     */
    top: GC.Spread.Sheets.VerticalAlign.top,
};

/**
 * 字体样式
 * @catalog 枚举项
 * @enum {String}
 * @namespace FontStyle
 * @example TOONE.Report.FontStyle.normal
 */
const FontStyle = {
    /**
     * 普通
     */
    normal: 'normal',
    /**
     * 斜体
     */
    italic: 'italic',
};

/**
 * 字体大小
 * @catalog 枚举项
 * @enum {String}
 * @namespace FontWeight
 * @example TOONE.Report.FontWeight.normal
 */
const FontWeight = {
    /**
     * 普通
     */
    normal: 'normal',
    /**
     * 粗体
     */
    bold: 'bold',
};

export { FontStyle, FontWeight, HAlign, LineStyle, VAlign };
