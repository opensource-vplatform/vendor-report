import CellRange from './CellRange';

/**
 * 工作表
 * @catalog 基础定义
 * @class WorkSheet
 */
class WorkSheet {
    constructor(sheet) {
        this.sheet = sheet;
    }

    /**
     * 设置工作表标题
     * @param {String} name 工作表标题
     */
    name(name) {
        this.sheet.name(name);
    }

    /**
     * 获取单元格
     * @param {Integer} row 行数
     * @param {Integer} col 列数
     * @returns {@link CellRange}
     */
    getCell(row, col) {
        const cellRange = this.sheet.getCell(row, col);
        return new CellRange(this.sheet, cellRange);
    }

    /**
     * 获取区间
     * @param {Integer} row 开始行
     * @param {Integer} col 开始列
     * @param {Integer} rowCount 行数
     * @param {Integer} colCount 列数
     * @returns {@link CellRange}
     */
    getRange(row, col, rowCount, colCount) {
        const cellRange = this.sheet.getRange(row, col, rowCount, colCount);
        return new CellRange(this.sheet, cellRange);
    }

    /**
     * 添加单元格合并
     * @param {Integer} row 开始行
     * @param {Integer} col 开始列
     * @param {Integer} rowCount 合并行数
     * @param {Integer} colCount 合并列数
     */
    addSpan(row, col, rowCount, colCount) {
        this.sheet.addSpan(row, col, rowCount, colCount);
    }

    /**
     * 新增行
     * @param {Integer} row 新增位置
     * @param {Integer} count 新增行数
     */
    addRows(row, count) {
        this.sheet.addRows(row, count);
    }

    /**
     * 新增列
     * @param {Integer} col 新增位置
     * @param {Integer} count 新增列数
     */
    addColumns(col, count) {
        this.sheet.addColumns(col, count);
    }

    /**
     * 设置单元格值
     * @param {Integer} row 行位置
     * @param {Integer} col 列位置
     * @param {String} value 值
     */
    setValue(row, col, value) {
        this.sheet.setValue(row, col, value);
    }

    /**
     * 设置公式
     * @param {Integer} row 行位置
     * @param {Integer} col 列位置
     * @param {String} formula 公式表达式
     * @example
     * ...
     * sheet.setFormula(17, 6, '=SUM(G12:G17)');
     */
    setFormula(row, col, formula) {
        this.sheet.setFormula(row, col, formula);
    }

    /**
     * 设置行数
     * @param {Integer} rowCount 行数
     */
    setRowCount(rowCount) {
        this.sheet.setRowCount(rowCount);
    }

    /**
     * 设置行高
     * @param {Integer} row 行位置
     * @param {Integer} height 行高
     */
    setRowHeight(row, height) {
        this.sheet.setRowHeight(row, height);
    }

    /**
     * 设置列数
     * @param {Integer} colCount 列数
     */
    setColumnCount(colCount) {
        this.sheet.setColumnCount(colCount);
    }

    /**
     * 设置列宽
     * @param {Integer} col 列位置
     * @param {Integer} width 列宽
     */
    setColumnWidth(col, width) {
        this.sheet.setColumnWidth(col, width);
    }

    /**
     * 设置默认值
     * @param {Object} defaults 默认值<br/>rowHeight：行高<br/>colWidth：列宽
     * @example
     * ...
     * sheet.setDefaults({
     *  rowHeight:40,
     *  colWidth:80
     * })
     */
    setDefaults(defaults) {
        Object.assign(this.sheet.defaults, defaults);
    }

    /**
     * 设置配置项
     * @param {Object} options 配置项<br/>
     * colHeaderVisible：显示列标题<br/>
     * rowHeaderVisible：显示行标题<br/>
     * showHorizontalGridline：显示水平网格线<br/>
     * showVerticalGridline：显示垂直网格线<br/>
     * isProtected: 启用保护<br/>
     * @example
     * ...
     * sheet.setOptions({
     *  colHeaderVisible:false,
     *  rowHeaderVisible:false
     * })
     * 
     */
    setOptions(options) {
        const {
            colHeaderVisible = true,
            rowHeaderVisible = true,
            showHorizontalGridline = true,
            showVerticalGridline = true,
            isProtected = false,
        } = options;
        Object.assign(this.sheet.options, {
            colHeaderVisible,
            rowHeaderVisible,
            isProtected,
        });
        Object.assign(this.sheet.options.gridline, {
            showHorizontalGridline,
            showVerticalGridline,
        });
    }
}

export default WorkSheet;
