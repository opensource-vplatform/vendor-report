import { sum } from '../utils/mathUtil';

/**
 * 联合数据源定义
 */
class UnionDatasource {
    datas = [];

    references = [];

    treeStruct = {};

    constructor(datasources, setting) {
        /**
         * 表编号集合
         * Array<string>
         */
        this.datasources = datasources;
        /**
         * 结构
         * {
         *   treeStruct?:{//树形结构
         *     [tableCode]:{
         *        enable:boolean,//是否启用
         *        idField:string,//标识字段
         *        pidField:string,//父标识字段
         *        leafField?:string,//叶子节点字段
         *        sortField?:string,//排序字段
         *        sortType?:"asc"|"desc",//排序类型
         *        sumFields?:Array<strign>,//汇总字段
         *     }
         *   },
         *   references?:Array<{//外键信息
         *      foreignKey:{//从表
         *          tableCode:string,//从表编号
         *          fieldCode:string,//从表字段编号
         *      },
         *      references:{//主表
         *          tableCode:string,//主表编号
         *          fieldCode:string,//主表字段编号
         *      },
         *   }>
         * }
         */
        this.setting = setting;
        this._anslysisSetting();
    }

    _containsTable(tableCode) {
        return this.datasources.indexOf(tableCode) != -1;
    }

    /**
     * 分析树形结构
     */
    _analysisTreeStructSetting() {
        if (this.setting.treeStruct) {
            for (let [tableCode, setting] of Object.entries(
                this.setting.treeStruct
            )) {
                if (this._containsTable(tableCode)) {
                    this.treeStruct[tableCode] = setting;
                }
            }
        }
    }
    /**
     * 分析引用关系
     */
    _analysisReferenceSetting() {
        if (this.setting.references) {
            this.setting.references.forEach((reference) => {
                const { foreignKey, references } = reference;
                if (
                    this._containsTable(foreignKey.tableCode) &&
                    this._containsTable(references.tableCode)
                ) {
                    this.references.push(reference);
                }
            });
        }
    }

    /**
     * 分析数据源设置
     */
    _anslysisSetting() {
        if (this.setting) {
            this._analysisTreeStructSetting();
            this._analysisReferenceSetting();
        }
    }

    _toUniqueKey(tableCode, fieldCode) {
        return `${tableCode},${fieldCode}`;
    }

    /**
     * 树形结构数据处理
     * @param {*} datasetMap
     */
    _treeStructDataEnhance(datasetMap) {
        for (let [tableCode, settings] of Object.entries(this.treeStruct)) {
            const datas = datasetMap[tableCode];
            if (datas && datas.length > 0) {
                const {
                    sumFields,
                    idField,
                    pidField,
                    leafField,
                    sortField,
                    sortType,
                } = settings;
                /**
                 * {
                 *   [记录主键值]：{
                 *      data:记录,
                 *      isLeaf?:boolean,//是否为叶子节点
                 *      children:Array<子节点记录>
                 *   }
                 * }
                 */
                const dataIndexMap = {};
                /**
                 * {
                 *   [父节点id值]：Array<string> 子节点id值集合
                 * }
                 */
                const childrenIndexMap = {};
                datas.forEach((data) => {
                    const id = data[idField];
                    const pid = data[pidField];
                    const item = { data, children: [] };
                    if (leafField) {
                        //设置有叶子结点字段
                        item.isLeaf = !![data[leafField]];
                    }
                    dataIndexMap[id] = item;
                    const childrenIds = childrenIndexMap[pid] || [];
                    childrenIds.push(id);
                    childrenIndexMap[pid] = childrenIds;
                });
                //开始构造树
                const root = { data: null, children: [] }; //虚拟根节点
                datas.forEach((data) => {
                    const id = data[idField];
                    const pid = data[pidField];
                    let parent = dataIndexMap[pid];
                    parent = parent ? parent : root;
                    const item = dataIndexMap[id];
                    parent.children.push(item);
                });
                if (sumFields && sumFields.length > 0) {
                    //开始进行树形汇总
                    const treeSum = function (node) {
                        const isLeaf = node.hasOwnProperty('isLeaf')
                            ? node.isLeaf
                            : !children || children.length == 0;
                        if(!isLeaf){
                            //非叶子节点需要先对子节点进行汇总
                            const children = node.children||[];
                            children.forEach(child=>treeSum(child));
                        }
                        const data = node.data;
                        const children = node.children;
                        sumFields.forEach(sumField=>{
                            const values = [];
                            children.forEach(child=>{
                                const val = child[sumField];
                                if(!isNaN(val)){
                                    values.push(val);
                                }
                            });
                            const result = sum(...values);
                            data[sumField] = result;
                        });
                    };
                    root.children.forEach(child=>treeSum(child));
                }
                if (sortField) {
                    //设置有排序字段，则按照排序字段对记录进行排序
                    const sortHandler = (node) => {
                        let children = node.children;
                        children = children.sort(function (o1, o2) {
                            const data1 = o1.data;
                            const data2 = o2.data;
                            const val1 = data1[sortField];
                            const val2 = data2[sortField];
                            const delta = val1 - val2;
                            return sortType == 'asc' ? delta : 0 - delta;
                        });
                        children.forEach((child) => sortHandler(child));
                        node.children = children;
                    };
                    sortHandler(root);
                }
                const expandTree = function (nodes) {
                    let datas = [];
                    nodes.forEach((node) => {
                        datas.push(node.data);
                        const children = node.children;
                        if (children && children.length > 0) {
                            datas = datas.concat(expandTree(children));
                        }
                    });
                    return datas;
                };
                datasetMap[tableCode] = expandTree(root.children);
            }
        }
    }

    /**
     * 根据主从关系联合数据
     * @param {*} datasetMap
     * @param {*} result
     * @returns
     */
    _unitDataByReferences(datasetMap, except) {
        const datas = [];
        if (this.references) {
            const mainTableMap = {};
            this.references.forEach((reference) => {
                const { references, foreignKey } = reference;
                const mainCode = references.tableCode;
                const mainFieldCode = references.fieldCode;
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
                const slaveCode = foreignKey.tableCode;
                except.push(slaveCode);
                const slaveFieldCode = foreignKey.fieldCode;
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
    _unitDataByIndex(datasetMap, result, except) {
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
     * 加载数据
     * @param {Object} datas 数据源数据
     * {
     *     数据源编号：数据源数据
     * }
     */
    load(datas) {
        const datasetMap = { ...datas };
        let except = [];
        this._treeStructDataEnhance(datasetMap);
        const result = this._unitDataByReferences(datasetMap, except);
        this.datas = this._unitDataByIndex(datasetMap, result, except);
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

export default UnionDatasource;
