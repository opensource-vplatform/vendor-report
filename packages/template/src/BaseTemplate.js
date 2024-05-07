
/**
 * 
 */
class BaseTemplate{

    constructor(template,context){
        this.template = template;
        this.context = context;
    }

    /**
     * 获取json模板
     * @returns 
     */
    getTemplate(){
        return this.template;
    }

    /**
     * 获取上下文
     * @returns 
     */
    getContext(){
        return this.context;
    }

    /**
     * 转换成json
     */
    toJson(){

    }

    load(datas){

    }

}

export default BaseTemplate;