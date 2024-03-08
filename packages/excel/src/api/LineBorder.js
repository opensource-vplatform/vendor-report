import { getNamespace } from '../utils/spreadUtil';

/**
 * @class 
 * @catalog 基础定义
 * @description 单元格边框定义，可以设置边框颜色及样式
 * @example
 * const border = new LineBorder("#ddd",TOONE.Report.LineStyle.thin);
 */
class LineBorder{

    /**
     * @constructor
     * @param {String} color 颜色
     * @param {@link LineStyle} style 样式
     */
    constructor(color,style){
        this.color = color;
        this.style = style;
    }

    /**
     * 设置颜色
     * @param {String} color 
     */
    setColor(color){
        this.color = color;
    }

    /**
     * 获取颜色
     * @returns String 
     */
    getColor(){
        return this.color;
    }

    /**
     * 设置样式
     * @param {LineStyle} style 样式
     */
    setStyle(style){
        this.style = style;
    }

    /**
     * 获取样式
     * @returns {LineStyle}
     */
    getStyle(){
        return this.style;
    }

    /**
     * @ignore
     */
    _to(){
        const GC = getNamespace();
        return new GC.Spread.Sheets.LineBorder(this.color,this.style);
    }

}

export default LineBorder;