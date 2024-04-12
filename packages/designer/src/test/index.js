import otherData from './jsonData/otherData.json';
import jsonStr from './jsonData/reportJsonData';
import salesData from './jsonData/salesData.json';
import tourismData from './jsonData/tourismData.json';

let json = JSON.parse(jsonStr);
salesData.data.length = 30 || 21;
tourismData.data.length = 11 || 21;
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
            ...otherData.ds,

            salesData.ds,
            tourismData.ds,
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
