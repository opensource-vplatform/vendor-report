import otherData from './jsonData/otherData.json';
import salesData from './jsonData/salesData.json';
import tourismData from './jsonData/tourismData.json';

export default {
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
        dataSourceDefinition: [...otherData.ds, salesData.ds, tourismData.ds], //数据源定义
        datas: {
            ...otherData.data,
            sales: salesData.data,
            tourism: tourismData.data,
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
        onSave: function () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ success: true });
                }, 3000);
            });
        },
    },
};
