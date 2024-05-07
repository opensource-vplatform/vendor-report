class Context {
    constructor(datasource) {
        this.datasource = datasource;
        this.spans = [];
    }

    /**
     * 获取数据源
     * @returns
     */
    getDatasource() {
        return this.datasource;
    }

    /**
     * 添加合并信息
     * @param {} span
     */
    appendSpan(span) {
        this.spans.push(span);
    }

    /**
     * 获取所有单元格合并信息
     * @returns
     */
    getSpans() {
        return this.spans;
    }
}

export default Context;
