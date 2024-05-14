export default class Tool {
    setFieldIndexHandler(handler) {
        this.fieldIndexHandler = handler;
    }

    setDataCountHandler(handler) {
        this.dataCountHandler = handler;
    }

    setPageHandler(handler) {
        this.pageHandler = handler;
    }

    setTotalPagesHandler(handler) {
        this.totalPagesHandler = handler;
    }

    setUnionDatasourceHandler(handler){
        this.unionDatasourceHandler = handler;
    }

    setDataIndex(handler){
        this.dataIndexHandler = handler;
    }

    setValueHandler(handler){
        this.valueHandler = handler;
    }

    setSettingHandler(handler){
        this.settingHandler = handler;
    }

    /**
     * 获取字段下标（在工作表中的起始位置）
     * @param {*} tableCode 
     * @param {*} fieldCode 
     * @returns {row,col}
     */
    getFieldIndex(tableCode, fieldCode) {
        return this.fieldIndexHandler(tableCode, fieldCode);
    }

    /**
     * 获取字段下标（在联合数据源中的起始位置）
     * @param {*} tableCode 
     * @param {*} fieldCode 
     * @return Integer
     */
    getDataIndex(tableCode, fieldCode){
        return this.dataIndexHandler(tableCode, fieldCode);
    }

    getDataCount(tableCode) {
        return this.dataCountHandler(tableCode);
    }

    getUnionDatasource(){
        return this.unionDatasourceHandler();
    }

    getPage() {
        return this.pageHandler();
    }

    getTotalPages() {
        return this.totalPagesHandler();
    }

    /**
     * 获取当前页下标
     * @returns 
     */
    getPageIndex(){
        return this.pageHandler();
    }

    /**
     * 获取总页数
     * @returns 
     */
    getPageCount(){
        return this.totalPagesHandler();
    }

    /**
     * 获取值
     * @param {*} code 
     * @param {*} fieldCode 
     */
    getValue(code,fieldCode){
        return this.valueHandler(code,fieldCode);
    }

    /**
     * 获取设置信息
     * @returns 
     */
    getSetting(){
        return this.settingHandler();
    }
}
