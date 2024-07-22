import { isObject } from '@toone/report-util';

import { sum } from '../utils/mathUtil';

/**
 * 联合数据源定义
 */
class UnionDatasource {
  datas = [];

  references = [];

  treeStruct = {};

  treeDataIndexMap = {};

  /**
   * {
   *   [code:string]:{
   *     type:"param"|"field",
   *     fields?:Array<string>
   *   }
   * }
   */
  datasources = {};

  constructor(bindingPaths, setting) {
    this._parseBindingPaths(bindingPaths);
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
     *   }>,
     *   cellPlugins:Array<{
     *     bindingPath:string,
     *     plugins:Array<{
     *       type: string,//插件类型
     *       [code:string]:any,//插件配置信息
     *     }>
     *   }>
     * }
     */
    this.setting = setting;
    this._anslysisSetting();
  }

  _parseBindingPaths(bindingPaths) {
    if (bindingPaths && bindingPaths.length > 0) {
      bindingPaths.forEach((bindingPath) => {
        const paths = bindingPath.split('.');
        const len = paths.length;
        if (len == 1) {
          const code = paths[0];
          this.datasources[code] = { type: 'param' };
        } else if (len == 2) {
          const code = paths[0];
          const fieldCode = paths[1];
          const ds = this.datasources[code] || {
            type: 'field',
            fields: [],
          };
          const fields = ds.fields;
          if (fields.indexOf(fieldCode) == -1) {
            fields.push(fieldCode);
          }
          this.datasources[code] = ds;
        }
      });
    }
  }

  _containsTable(tableCode) {
    const ds = this.datasources[tableCode];
    return ds && ds.type == 'field';
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
   * 分析插件设置
   */
  _analysisPluginSetting() {
    const cellPlugins = this.setting.cellPlugins;
    if (cellPlugins && cellPlugins.length > 0) {
      //只处理分组
      this.cellPlugins = [];
      cellPlugins.forEach((plugin) => {
        const bindingPath = plugin.bindingPath;
        const plugins = plugin.plugins;
        if (plugins && plugins.length > 0) {
          for (let i = 0; i < plugins.length; i++) {
            const plugin = plugins[i];
            if (plugin.type == 'cellGroup' || plugin.type == 'cellGroupType') {
              this.cellPlugins.push({
                bindingPath,
                type: 'cellGroup',
              });
            }
          }
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
      this._analysisPluginSetting();
    }
  }

  _toUniqueKey(tableCode, fieldCode) {
    return `${tableCode},${fieldCode}`;
  }

  _isLeaf(node) {
    return node.hasOwnProperty('isLeaf')
      ? node.isLeaf
      : !node.children || node.children.length == 0;
  }

  /**
   * 树形结构数据处理
   * @param {*} datasetMap
   */
  _treeStructDataEnhance(datasetMap) {
    for (let [tableCode, settings] of Object.entries(this.treeStruct)) {
      const datas = datasetMap[tableCode];
      //有数据，且启用树形结构
      if (datas && datas.length > 0 && settings.enable) {
        const { sumFields, idField, pidField, leafField, sortField, sortType } =
          settings;
        /**
         * {
         *   [记录主键值]：{
         *      data:记录,
         *      isLeaf?:boolean,//是否为叶子节点
         *      children:Array<子节点记录>
         *   }
         * }
         */
        const dataIndexMap = this.treeDataIndexMap[tableCode] || {};
        datas.forEach((data) => {
          const id = data[idField];
          const item = { data, children: [] };
          if (leafField) {
            //设置有叶子结点字段
            item.isLeaf = !!data[leafField];
          }
          dataIndexMap[id] = item;
        });
        this.treeDataIndexMap[tableCode] = dataIndexMap;
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
          const treeSum = (node) => {
            const isLeaf = this._isLeaf(node);
            if (!isLeaf) {
              //非叶子节点需要先对子节点进行汇总
              const children = node.children || [];
              children.forEach((child) => treeSum(child));
              const data = node.data;
              sumFields.forEach((sumField) => {
                const values = [];
                children.forEach((child) => {
                  const val = child.data[sumField];
                  if (!isNaN(val)) {
                    values.push(val);
                  }
                });
                const result = sum(values);
                data[sumField] = result;
              });
            }
          };
          root.children.forEach((child) => treeSum(child));
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
   * 根据分组信息联合数据
   * @param {*} datasetMap
   * @param {*} result
   * @param {*} except
   */
  _unitDataByGroup(datasetMap, result, except) {
    if (this.cellPlugins && this.cellPlugins.length > 0) {
      const dataset = [];
      const indexs = {};
      const notGroupPaths = [];
      for (let [tableCode, cfg] of Object.entries(this.datasources)) {
        if (cfg.type == 'field') {
          const fields = cfg.fields;
          fields.forEach((fieldCode) => {
            if (
              !this.cellPlugins.find(
                (plugin) => plugin.bindingPath == `${tableCode}.${fieldCode}`
              )
            ) {
              notGroupPaths.push({
                tableCode,
                fieldCode,
              });
            }
          });
        }
      }
      const concat_char = '_@_#_$_%_^_&_*_(_)_';
      result.forEach((item) => {
        const values = [];
        const get = (tableCode, fieldCode) => {
          const data = item[tableCode];
          let value = null;
          if (data) {
            value = data[fieldCode];
          }
          return value;
        };
        this.cellPlugins.forEach((plugin) => {
          const bindingPath = plugin.bindingPath;
          const [tableCode, fieldCode] = bindingPath.split('.');
          values.push(get(tableCode, fieldCode));
        });
        notGroupPaths.forEach((path) => {
          const { tableCode, fieldCode } = path;
          values.push(get(tableCode, fieldCode));
        });
        const key = values.join(concat_char);
        if (!indexs[key]) {
          dataset.push(item);
          indexs[key] = true;
        }
      });
      return dataset;
    }
    return result;
  }

  /**
   * 是否为树形汇总字段
   * @param {*} tableCode
   * @param {*} fieldCode
   */
  isTreeSumField(tableCode, fieldCode) {
    const setting = this.treeStruct[tableCode];
    if (setting?.sumFields?.length > 0) {
      return setting.sumFields.indexOf(fieldCode) != -1;
    }
    return false;
  }

  /**
   * 获取叶子节点范围
   * @param {*} start
   * @param {*} end
   */
  getLeafRanges(tableCode, start, end) {
    const dataIndexMap = this.treeDataIndexMap[tableCode];
    let ranges = [];
    const idField = this.setting.treeStruct[tableCode].idField;
    for (let index = start; index <= end; index++) {
      const data = this.datas[index];
      if (data && data[tableCode]) {
        const record = data[tableCode];
        const id = record[idField];
        const node = dataIndexMap[id];
        if (this._isLeaf(node)) {
          ranges.push(index);
        }
      }
    }
    return ranges;
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
    let result = this._unitDataByReferences(datasetMap, except);
    result = this._unitDataByIndex(datasetMap, result, except);
    this.datas = this._unitDataByGroup(datasetMap, result, except);
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
  getValue(dsCode, fieldCode, mapKey, index = 0, plugins = []) {
    const data = this.datas[index];
    let value = null;
    if (data) {
      const val = data[dsCode]?.[fieldCode];
      value = val === undefined ? null : val;
      if (mapKey) {
        value = value?.[mapKey];
      }
      if (Array.isArray(value)) {
        let index = -1;
        if (plugins && plugins.length > 0) {
          for (let i = 0; i < plugins.length; i++) {
            const plugin = plugins?.[i] || {};
            const { type, config = {} } = plugin;
            if (
              type == 'cellGroup' ||
              type == 'cellGroupType' ||
              type == 'cellList'
            ) {
              if (isObject(config) && config.hasOwnProperty('listIndex')) {
                index = Number(config.listIndex) - 1;
                break;
              }
            }
          }
        }
        if (index > -1) {
          value = value[index];
        } else {
          value = value.toString();
        }
      }
    }
    return { type: 'text', value };
  }

  /**
   * 获取字段值
   * @param {*} dsCode
   * @param {*} fieldCode
   */
  getFieldValues(dsCode, fieldCode) {
    const result = [];
    const count = this.getCount();
    let index = 0;
    while (index < count) {
      result.push(this.getValue(dsCode, fieldCode, '', index));
      index++;
    }
    return result;
  }

  /**
   * 获取叶子节点字段值
   * @param {*} dsCode
   * @param {*} fieldCode
   */
  getLeafFieldValues(dsCode, fieldCode) {
    const treeStruct = this.setting.treeStruct[dsCode];
    if (treeStruct && treeStruct.idField && treeStruct.pidField) {
      const result = [];
      const dataIndexMap = this.treeDataIndexMap[dsCode];
      const idField = treeStruct.idField;
      const count = this.getCount();
      for (let index = 0; index < count; index++) {
        const data = this.datas[index];
        if (data && data[dsCode]) {
          const record = data[dsCode];
          const id = record[idField];
          const node = dataIndexMap[id];
          if (this._isLeaf(node)) {
            const data = node.data;
            const value = data ? data[fieldCode] : null;
            result.push({ value });
          }
        }
      }
      return result;
    } else {
      return this.getFieldValues(dsCode, fieldCode);
    }
  }
}

export default UnionDatasource;
