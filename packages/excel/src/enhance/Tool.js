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
}
