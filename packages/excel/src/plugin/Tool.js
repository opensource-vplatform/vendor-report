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

    getFieldIndex(tableCode, fieldCode) {
        return this.fieldIndexHandler(tableCode, fieldCode);
    }

    getDataCount(tableCode) {
        return this.dataCountHandler(tableCode);
    }

    getPage() {
        return this.pageHandler();
    }

    getTotalPages() {
        return this.totalPagesHandler();
    }
}
