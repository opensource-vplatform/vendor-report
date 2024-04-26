/**
 * 联合数据源定义
 */
class UnitDatasource {
    datas = [];

    references = [];

    constructor(datasources) {
        this.datasources = datasources;
        this._anlysisReferences();
    }

    /**
     * 分析主从关系
     */
    _anlysisReferences() {
        if (this.datasources && this.datasources.length > 0) {
            this.datasources.forEach((datasource) => {
                datasource.children?.forEach((child) => {
                    const { reference } = child;
                    if (reference) {
                        const { tableCode, fieldCode } = reference;
                        this.references.push({
                            /**
                             * 主表
                             */
                            main: { code: tableCode, fieldCode },
                            /**
                             * 从表
                             */
                            slave: {
                                code: datasource.code,
                                fieldCode: child.code,
                            },
                        });
                    }
                });
            });
        }
    }

    /**
     * 根据主从关系联合数据
     * @param {*} datasetMap 
     * @param {*} result 
     * @returns 
     */
    _unitDataByReferences(datasetMap,result) {
        const datas = [];
        if (this.references) {
            this.references.forEach(reference=>{
                const {main,slave} = reference;
                const mainCode = main.code;
                const mainFieldCode = main.fieldCode;
                const slaveCode = slave.code;
                const slaveFieldCode = slave.fieldCode;
                const mainDatas = datasetMap[mainCode];
                const slaveDatas = datasetMap[slaveCode];
                
            });
        }
        return datas;
    }

    /**
     * 根据下标联合数据
     * @param {} datasetMap 
     * @param {*} result 
     */
    _unitDataByIndex(datasetMap,result){
        for(let [dsCode,datas] of Object.entries(datasetMap)){
            for (let i = 0,len=datas.length; i < len; i++) {
                const item = datas[i];
                const data = result[i]||{}
                data[dsCode] = item;
                result[i] = data;
            }
        }
        return result;
    }

    /**
     * 加载数据
     * @param {Object} datas 数据源数据
     * {
     *     数据源编号：数据源数据
     * }
     */
    load(datas) {
        const datasetMap = { ...datas };
        const result = this._unitDataByReferences(datasetMap);
        this.datas = this._unitDataByIndex(datasetMap,result);
    }

    /**
     * 获取总记录数
     */
    getCount() {
        return this.datas.length;
    }

    /**
     * 获取字段值
     * @param {string} dsCode 数据源编号
     * @param {string} fieldCode 字段编号
     * @param {string} index 记录下标
     */
    getValue(dsCode, fieldCode, index = 0) {
        const data = this.datas[index];
        if (data) {
            const val = data[dsCode]?.[fieldCode];
            return val === undefined ? null : val;
        }
        return null;
    }
}

export default UnitDatasource;
