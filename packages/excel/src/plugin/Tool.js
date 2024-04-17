class Tool{

    setFieldIndexHandler(handler){
        this.fieldIndexHandler = handler;
    }

    setDataCountHandler(handler){

    }

    getFieldIndex(tableCode,fieldCode){
        this.fieldIndexHandler(tableCode,fieldCode);
    }

    getDataCount(tableCode){

    }

}