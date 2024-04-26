/**
 * 联合数据源定义
 */
class UnitDatasource{

    datas = [];

    references = [];

    constructor(datasources){
        this.datasources = datasources;
    }

    /**
     * 分析主从关系
     */
    _anlysisReferences(){

    }


    /**
     * 加载数据
     * @param {Object} datas 数据源数据
     * {
     *     数据源编号：数据源数据
     * }
     */
    load(datas){

    }

    /**
     * 获取总记录数
     */
    getCount(){
        return this.datas.length;
    }

    /**
     * 获取字段值
     * @param {string} dsCode 数据源编号
     * @param {string} fieldCode 字段编号
     * @param {string} index 记录下标
     */
    getValue(dsCode,fieldCode,index=0){

    }

}

export default UnitDatasource;