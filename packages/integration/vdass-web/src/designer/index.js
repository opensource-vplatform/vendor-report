import {
  getReportConfigUrl,
  getSaveReportUrl,
  getTableMetadataUrl,
} from '../utils/constant';
import { license } from '../utils/license';
import {
  getReportId,
  getTitle,
} from '../utils/utils';

document.title = getTitle("同望电子表格设计器");

const Designer = TOONE.Report.Designer;
const Utils = Designer.Utils;
const RPC = Utils.RPC;
const MSG = Utils.msg;

const getError = function (result) {
    if (result && result.data) {
        const data = result.data;
        if (data.success === false) {
            return data.msg || '存在未知异常！';
        } else {
            return getError(data);
        }
    }
    return null;
};

const getUsedDatasources = function(context){
    const result = [];
    if(context&&context.define){
        context.define.forEach(ds=>{
            result.push(ds.code);
        })
    }
    return result;
}

const Type_Map = {
    table: 'table',
    query: 'table', 
    api: 'table',
    char:'text',
    text: 'text',
    number: 'decimals',
    boolean: 'text',
    date: 'text',
    longDate: 'text',
    file: 'text',
    object: 'text',
    integer:'integer',
}

const enhanceType = function(type){
    return Type_Map[type]
}

/**
 * 处理元数据
 * 1、将服务端字段类型、实体类型适配成报表设计器中的类型
 * 2、字段、实体名称如没有，则使用编号
 * @param {*} metadata 
 * @returns 
 */
const enhanceMetadata = function(metadata){
    return metadata.map(({type,children,code,name,...others})=>{
        if(children){
            return {
                ...others,
                code,
                name: name ? name:code,
                type: enhanceType(type),
                children:enhanceMetadata(children),
            }
        }else{
            return {
                ...others,
                code,
                name: name ? name:code,
                type: enhanceType(type),
            }
        }
    });
}

const designer = new Designer({
    //配置详情参考README.md
    //batchGetDatasURL,
    //datasPath: 'data/data',
    nav: {
        file: true, //隐藏文件页签页，
        table:{
            tableOptions:false
        }
    },
    dataSource: {
        allowToView: false, //不允许查看数据源
        allowToEdit: false, //不允许编辑数据源
    },
    event: {
        onSave: function (json, context) {
            return new Promise(function (resolve, reject) {
                json.usedDatasources = getUsedDatasources(context);
                const config = JSON.stringify(json);
                //保存的参数
                const params = {
                    id: getReportId(),
                    config,
                    icon:null,
                    preview:context.toImage(),
                    requestTables:''
                };
                RPC.post(getSaveReportUrl(), params)
                    .then((response) => {
                        if (response?.data?.success) {
                            resolve({ success: true });
                        } else {
                            reject({
                                success: false,
                                message: response?.data?.message,
                            });
                        }
                    })
                    .catch((e) => {
                        console.error(e);
                        reject({
                            success: false,
                            message: '出现未知异常！',
                        });
                    });
            });
        },
        onDesignerInited: function () {
            return new Promise(function (resolve, reject) {
                const promises = [
                    RPC.get(getTableMetadataUrl()),
                    RPC.get(getReportConfigUrl()),
                ];
                Promise.all(promises)
                    .then(([metadata, config]) => {
                        let error = getError(metadata);
                        error = error == null ? getError(config):null;
                        if(error != null){
                            return reject(Error(error));
                        }
                        let excelJson = null;
                        if(config?.data?.data?.data?.config){
                            try{
                                excelJson = JSON.parse(config.data.data.data.config);
                            }catch(e){}
                        }
                        resolve({
                            tableMetadata:enhanceMetadata(metadata?.data?.data?.define||[]),
                            excelJson:excelJson ? excelJson.reportJson:null,
                        });
                    })
                    .catch(reject);
            });
        },
    },
    license,
    toolbar: [
        {
            title: '关闭',
            type: 'warning',
            onClick() {
                MSG.confirm('','确定关闭设计器吗？',function(confirmed){
                    if(confirmed){
                        window.opener = null;
                        window.open("","_self");
                        window.close();
                    }
                });
            },
        },
    ],
});

//设计器挂载到指定dom元素
designer.mount(document.getElementById('app'));