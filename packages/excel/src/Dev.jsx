
/**
 * 报表二次开发
 */
class Dev{

    /**
     * 
     * @param {Object} params 参数信息
     * {
     *      license?: string  许可证
     *      ready?: Function(workbook) 初始化成功回调
     * }
     */
    constructor(params){
        this.params = params;
    }

    getParams(){
        return this.params;
    }

}

export default Dev;