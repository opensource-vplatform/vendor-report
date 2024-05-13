import qdzfbb from './jlzf/qdzfbb';
import zjjlb from './jlzf/zjjlb';
import zjjlzfhzb from './jlzf/zjjlzfhzb';
import zqzfzs from './jlzf/zqzfzs';
import otherData from './jsonData/otherData.json';
import jsonStr from './jsonData/reportJsonData';
import salesData from './jsonData/salesData.json';
import tourismData from './jsonData/tourismData.json';

let json = JSON.parse(jsonStr);

salesData.data.length = 150 || 21;
/* salesData.data = salesData.data.filter(function (item) {
    return ['华北'].includes(item.sales_area);
}); */
tourismData.data.length = 1 || 21;
export default {
    json,
    /* json: { reportJson: json }, */
    /*batchGetDatasURL,
    datasPath,  */
    /* toolbar: [
        {
            title: '关闭',
            desc: '请点击关闭',
            onClick() {
                console.log('asdf');
                window.close();
            },
        },
    ], */
    nav: {
        //file:false | true //文件。默认值true
        file: {
            import: true, //导入。默认值true
            export: true, //导出。默认值true
            print: true, //打印。默认值true
        }, //文件
        //start: false | true //开始。默认值true
        start: {
            font: true, //字体。默认值true
            align: true, //居中。默认值true
        },
        //formula:false | true //公式。默认值true
        formula: {
            library: true, //函数库。默认值true
            calculation: true, //计算。默认值true
        }, //公式
        data: true, //数据。默认值true
        //view:false | true //视图。默认值true
        view: {
            display: true, //显示/隐藏。默认值true
            ratio: true, //显示比例。默认值true
        }, //视图
        //table:false | true//表格。默认值true
        table: {
            tableOptions: true, //表格选项。默认值true
            tableStyle: true, //表格样式。默认值true
        }, //表设计
    },
    dataSource: {
        dataSourceDefinition: [
            {
                id: 'zonaTree',
                type: 'table',
                typeName: '表',
                desc: 'zonaTree',
                code: 'zonaTree',
                name: '树形数据',
                children: [
                    {
                        id: 'code',
                        type: 'text',
                        typeName: '文本',
                        desc: 'code',
                        code: 'code',
                        name: '编码',
                        parentId: 'zonaTree',
                    },
                    {
                        id: 'PID',
                        type: 'text',
                        typeName: '文本',
                        desc: 'PID',
                        code: 'PID',
                        name: '父ID',
                        parentId: 'zonaTree',
                    },
                    {
                        id: 'leaf',
                        type: 'text',
                        typeName: '文本',
                        desc: 'leaf',
                        code: 'leaf',
                        name: '叶子节点',
                        parentId: 'zonaTree',
                    },
                    {
                        id: 'name',
                        type: 'text',
                        typeName: '文本',
                        desc: 'name',
                        code: 'name',
                        name: '名称',
                        parentId: 'zonaTree',
                    },
                    {
                        id: 'num',
                        type: 'integer',
                        typeName: '整数',
                        desc: '购买数量',
                        code: 'num',
                        name: '购买数量',
                        parentId: 'zonaTree',
                    },
                ],
            },
            {
                id: 'purchaseContract',
                type: 'table',
                typeName: '表',
                desc: 'purchaseContract',
                code: 'purchaseContract',
                name: '采购合同',
                children: [
                    {
                        id: 'A',
                        type: 'text',
                        typeName: '文本',
                        desc: 'code',
                        code: 'code',
                        name: '编码',
                        parentId: 'purchaseContract',
                    },
                    {
                        id: 'BB',
                        type: 'text',
                        typeName: '文本',
                        desc: 'name',
                        code: 'name',
                        name: '名称',
                        parentId: 'purchaseContract',
                    },
                    {
                        id: 'C',
                        type: 'text',
                        typeName: '文本',
                        desc: '负责人',
                        code: 'person',
                        name: '负责人',
                        parentId: 'purchaseContract',
                    },
                ],
            },
            {
                id: 'purchaseInfo',
                type: 'table',
                typeName: '表',
                desc: 'purchaseInfo',
                code: 'purchaseInfo',
                name: '采购详情',
                children: [
                    {
                        id: 'A',
                        type: 'text',
                        typeName: '文本',
                        desc: 'code',
                        code: 'code',
                        name: '外键',
                        parentId: 'purchaseInfo',
                        reference: {
                            //外键信息
                            tableCode: 'purchaseContract',
                            fieldCode: 'code',
                        },
                    },
                    {
                        id: 'BB',
                        type: 'text',
                        typeName: '文本',
                        desc: 'name',
                        code: 'name',
                        name: '名称',
                        parentId: 'purchaseInfo',
                    },
                    {
                        id: 'C',
                        type: 'text',
                        typeName: '文本',
                        desc: '采购人',
                        code: 'person',
                        name: '采购人',
                        parentId: 'purchaseInfo',
                    },
                ],
            },
            ...otherData.ds,
            salesData.ds,
            tourismData.ds,
            zqzfzs.metadata,
            qdzfbb.metadata,
            zjjlb.metadata,
            zjjlzfhzb.metadata,
            {
                id: 'stu',
                type: 'table',
                typeName: '表',
                desc: 'stu',
                code: 'stu',
                name: '学生表',
                children: [
                    {
                        id: 'A',
                        type: 'text',
                        typeName: '文本',
                        desc: 'code',
                        code: 'code',
                        name: '编码',
                        parentId: 'stu',
                    },
                    {
                        id: 'BB',
                        type: 'text',
                        typeName: '文本',
                        desc: 'name',
                        code: 'name',
                        name: '名称',
                        parentId: 'stu',
                    },
                ],
            },
        ], //数据源定义
        datas: {
            ...otherData.data,
            ...zqzfzs.datas,
            ...qdzfbb.datas,
            ...zjjlb.datas,
            ...zjjlzfhzb.datas,
            sales: salesData.data,
            tourism: tourismData.data,
            stu: [
                {
                    code: 'sheetzs',
                    name: '张三',
                },
                {
                    code: 'ls2',
                    name: '李四',
                },
            ],
            ...JSON.parse(
                '{"ff8081818ee4d888018ee4dfe463211e":[{"标段":"TJ3","计量号":"TJ3-201812A","开始日期":"2018-11-21T00:00:00","截止日期":"2018-12-25T00:00:00","本期完成(元)":36085616,"累计完成(元)":58186150,"制表人":"姜程","制表日期":"2018-12-18T00:00:00","申报单位":"广东省长大公路工程有限公司","监理单位":"广东华路交通科技有限公司","中期支付证书备注":"无"}],"ff8081818ee4d888018ee4e14fa0280c":[{"审批人角色":"承包人计量员 ","审批人":"姜程","审批时间":"2018-12-18T20:24:46","审批意见":"已完成、请审核"},{"审批人角色":"承包人项目经理 ","审批人":"谢书良","审批时间":"2018-12-19T09:33:03","审批意见":"已审核"},{"审批人角色":"现场监理","审批人":"刘德刚","审批时间":"2019-01-13T09:31:40","审批意见":""},{"审批人角色":"承包人项目经理","审批人":"谢书良","审批时间":"2019-01-13T09:36:31","审批意见":""},{"审批人角色":"承包人计量员 ","审批人":"姜程","审批时间":"2019-01-13T10:32:55","审批意见":"已完成、请审核"},{"审批人角色":"承包人项目经理 ","审批人":"谢书良","审批时间":"2019-01-13T10:34:47","审批意见":"已审核"},{"审批人角色":"现场监理","审批人":"刘德刚","审批时间":"2019-01-14T17:10:39","审批意见":"同意上报"},{"审批人角色":"总监办计量负责人","审批人":"侯秀全 ","审批时间":"2019-01-14T17:18:29","审批意见":"数量已核，同意上报。"},{"审批人角色":"总监理工程师","审批人":"柯杰平","审批时间":"2019-01-15T17:25:49","审批意见":"同意计量。"},{"审批人角色":"业务部门经办人","审批人":"张力嘉","审批时间":"2019-01-21T10:29:34","审批意见":"同意计量"},{"审批人角色":"业务部门负责人","审批人":"汪胜","审批时间":"2019-01-21T10:58:04","审批意见":"不同意"}]}'
            ),
            purchaseContract: [
                {
                    code: 'PC1',
                    name: '水果采购',
                    person: '张三',
                },
                {
                    code: 'PC2',
                    name: '蔬菜采购',
                    person: '李四',
                },
            ],
            purchaseInfo: [
                {
                    code: 'PC1',
                    name: '香蕉',
                    person: '王五',
                },
                {
                    code: 'PC1',
                    name: '雪梨',
                    person: '王五',
                },
                {
                    code: 'PC1',
                    name: '火龙果',
                    person: '赵六',
                },
                {
                    code: 'PC1',
                    name: '苹果',
                    person: '刘七',
                },
                {
                    code: 'PC2',
                    name: '大白菜',
                    person: '陈八',
                },
                {
                    code: 'PC2',
                    name: '辣椒',
                    person: '周九',
                },
            ],
            zonaTree: [
                {
                    code: 'A',
                    name: '同望',
                    PID: '',
                    leaf: false,
                    num: 10,
                },
                {
                    code: 'B',
                    name: '张三',
                    PID: 'A',
                    leaf: true,
                    num: 20,
                },
                {
                    code: 'C',
                    name: '李四',
                    PID: 'A',
                    leaf: true,
                    num: 30,
                },
            ],
        }, //数据源数据
        allowToView: true, //是否允许查看数据源
        allowToEdit: true, //是否允许编辑数据源
    },
    sheets: {
        newTabVisible: true, //是否显示添加选项卡按钮
        tabEditable: true, //选项卡是否可编辑
        tabStripVisible: true, //实现显示选项卡
    },
    event: {
        onSave: function (a, b) {
            window.localStorage.setItem('spreadJSON1', JSON.stringify(a));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ success: true });
                }, 0);
            });
        },
    },
};
