class Tool{

    setFieldIndexHandler(handler){
        this.fieldIndexHandler = handler;
    }

    setDataCountHandler(handler){
        this.dataCountHandler = handler;
    }

    getFieldIndex(tableCode,fieldCode){
        this.fieldIndexHandler(tableCode,fieldCode);
    }

    getDataCount(tableCode){
        this.dataCountHandler(tableCode);
    }

}