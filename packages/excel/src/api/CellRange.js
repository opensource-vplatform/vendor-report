import { setStyle } from '../utils/styleUtil';
import LineBorder from './LineBorder';

/**
 * @class CellRange
 * @catalog 基础定义
 * @description 单元格区间
 * @example
 * const sheet = workBook.getSheet(0);
 * const cellRange = sheet.getCell(1,1);
 */
class CellRange {
    /**
     * @private
     */
    constructor(sheet, cellRange) {
        this.sheet = sheet;
        this.cellRange = cellRange;
    }

    /**
     * 设置水平位置
     * @param {HAlign} align 水平位置
     * @example
     * cellRange.hAlign(TOONE.Report.HAlign.center);
     */
    hAlign(align) {
        this.cellRange.hAlign(align);
    }

    /**
     * 设置垂直位置
     * @param {VAlign} align 垂直位置
     * @example
     * cellRange.vAlign(TOONE.Report.VAlign.center);
     */
    vAlign(align) {
        this.cellRange.vAlign(align);
    }

    /**
     * 设置边框
     * @param {LineBorder} border 边框样式
     * @param {Object} option 配置项<br/>all:设置区域内所有单元格边框<br/>outline:设置区域内外边框<br/>inside:设置区域内边框<br/>left:设置左边框<br/>right:设置右边框<br/>bottom:设置下边框<br/>top:设置上边框
     * @example
     * ...
     * const NS = TOONE.Report;
     * const lineBorder = new NS.LineBorder();
     * lineBorder.setColor("#000");
     * lineBorder.setStyle(NS.LineStyle.thin);
     * cellRange.setBorder(lineBorder,{outline:true});
     */
    setBorder(border, option) {
        this.cellRange.setBorder(border, option);
    }

    /**
     * 设置字体
     * @param {String} family 字体
     * @example
     * ...
     * cellRange.fontFamily("微软雅黑")
     */
    fontFamily(family) {
        //this.cellRange.fontFamily(family);
        setStyle(this.sheet,this.cellRange,{fontFamily:family});
    }

    /**
     * 设置字体大小
     * @param {String} size 字体大小
     * @example
     * ...
     * cellRange.fontSize('16px');
     */
    fontSize(size) {
        //this.cellRange.fontSize(size);
        setStyle(this.sheet,this.cellRange,{fontSize:size});
    }

    /**
     * 设置字体样式
     * @param {FontStyle} style 字体样式
     * @example
     * ...
     * cellRange.fontStyle(TOONE.Report.FontStyle.italic);
     */
    fontStyle(style) {
        //this.cellRange.fontStyle(style);
        setStyle(this.sheet,this.cellRange,{fontStyle:style});
    }

    /**
     * 设置字体粗细
     * @param {FontWeight} weight
     * @example
     * ...
     * cellRange.fontWeight(TOONE.Report.FontWeight.bold);
     */
    fontWeight(weight) {
        //this.cellRange.fontWeight(weight);
        setStyle(this.sheet,this.cellRange,{fontWeight:weight});
    }
}

export default CellRange;
