/**
 * 联合数据源定义
 */
class UnitDatasource {
    datas = [];

    constructor(setting) {
        this.setting = setting;
        //实体记录
        this.datas = [];
        //参数值
        this.paramValues = {};
    }

    _toUniqueKey(tableCode, fieldCode) {
        return `${tableCode},${fieldCode}`;
    }

    /**
     * 根据主从关系联合数据
     * @param {*} datasetMap
     * @param {*} result
     * @returns
     */
    _unionDataByReferences(datasetMap, except) {
        const datas = [];
        if (this.setting && this.setting.references) {
            const mainTableMap = {};
            this.setting.references.forEach((reference) => {
                const { main, slave } = reference;
                const mainCode = main.getTableCode();
                const mainFieldCode = main.getFieldCode();
                except.push(mainCode);
                const key = this._toUniqueKey(mainCode, mainFieldCode);
                let mainTableDataMap = mainTableMap[key];
                if (!mainTableDataMap) {
                    mainTableDataMap = {};
                    mainTableMap[key] = mainTableDataMap;
                    const mainDatas = datasetMap[mainCode];
                    mainDatas.forEach((data) => {
                        mainTableDataMap[data[mainFieldCode]] = data;
                    });
                }
                const slaveCode = slave.getTableCode();
                except.push(slaveCode);
                const slaveFieldCode = slave.getFieldCode();
                const slaveDatas = datasetMap[slaveCode];
                slaveDatas.forEach((data) => {
                    datas.push({
                        [slaveCode]: data,
                        [mainCode]: mainTableDataMap[data[slaveFieldCode]],
                    });
                });
            });
        }
        return datas;
    }

    /**
     * 根据下标联合数据
     * @param {} datasetMap
     * @param {*} result
     */
    _unionDataByIndex(datasetMap, result, except) {
        for (let [dsCode, datas] of Object.entries(datasetMap)) {
            if (except.indexOf(dsCode) == -1) {
                for (let i = 0, len = datas.length; i < len; i++) {
                    const item = datas[i];
                    const data = result[i] || {};
                    data[dsCode] = item;
                    result[i] = data;
                }
            }
        }
        return result;
    }

    /**
     * 解析参数值
     * @param {*} dataMap
     * @param {*} except
     */
    _parseParamValue(dataMap, except) {
        for (let [code, val] of Object.entries(dataMap)) {
            if (!Array.isArray(val)) {
                except.push(code);
                this.paramValues[code] = val;
            }
        }
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
        let except = [];
        this._parseParamValue(datasetMap, except);
        const result = this._unionDataByReferences(datasetMap, except);
        this.datas = this._unionDataByIndex(datasetMap, result, except);
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
    getFieldValue(dsCode, fieldCode, index = 0) {
        const data = this.datas[index];
        if (data) {
            const val = data[dsCode]?.[fieldCode];
            return val === undefined ? null : val;
        }
        return null;
    }

    /**
     * 获取参数值
     * @param {*} paramCode
     * @returns
     */
    getParamValue(paramCode) {
        return this.paramValues[paramCode];
    }
}

export default UnitDatasource;
