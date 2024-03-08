import WorkSheet from './WorkSheet';

/**
 * 工作簿
 * @class WorkBook
 * @catalog 基础定义
 * @example
 * new TOONE.Report.Report({
 *  ready:function(workBook){
 *      workBook.addSheet(0);
 *      const sheet = workBook.getSheet(0);
 *      ...
 *  }
 * })
 */
class WorkBook {
    /**
     * @private
     */
    constructor(spread) {
        this.spread = spread;
    }

    /**
     * 新增工作表
     * @param {Integer} index 新增位置
     */
    addSheet(index) {
        this.spread.addSheet(index);
    }

    /**
     * 获取工作表
     * @param {Integer} index 工作表位置
     * @returns {@link WorkSheet}
     */
    getSheet(index) {
        const sheet = this.spread.getSheet(index);
        return sheet ? new WorkSheet(sheet) : null;
    }

    /**
     * 设置配置项
     * @param {Object} options 配置项<br/>
     * newTabVisible：显示新增工作表图标<br/>
     * tabStripVisible： 显示工作表选项卡<br/>
     * showVerticalScrollbar：显示垂直滚动条<br/>
     * showHorizontalScrollbar：显示垂直滚动条<br/>
     */
    setOptions(options) {
        const {
            newTabVisible = true,
            tabStripVisible = true,
            showHorizontalScrollbar = true,
            showVerticalScrollbar = true,
        } = options;
        Object.assign(this.spread.options, {
            newTabVisible,
            tabStripVisible,
            showHorizontalScrollbar,
            showVerticalScrollbar,
        });
    }
}

export default WorkBook;
