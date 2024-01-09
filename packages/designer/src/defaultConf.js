//file:Boolean or fileOptions = {import:Boolean,export:Boolean,print:Boolean}
export default {
    nav: {
        file: {
            import: true, //导入
            export: true, //导出
            print: true, //打印
        }, //文件
        start: {}, //开始
        formula: {}, //公式
        data: {}, //数据
        view: {}, //视图
        table: {}, //表设计
    },
    dataSource: {
        dataSourceDefinition: [], //数据源定义
        allowToView: true, //是否允许查看数据源
        allowToEdit: true, //是否允许编辑数据源
    },
};
