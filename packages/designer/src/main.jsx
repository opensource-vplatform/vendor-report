import ReportDesigner from './ReportDesigner';

const config = {
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
            align: false, //居中。默认值true
        },
        //formula:false | true //公式。默认值true
        formula: {
            library: false, //函数库。默认值true
            calculation: true, //计算。默认值true
        }, //公式
        data: false, //数据。默认值true
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
                id: '6589cf29ae694fe1a7a6de70fbceac061',
                type: 'text',
                typeName: '文本',
                desc: '必填',
                code: 'title',
                name: '标题',
            },
            {
                id: '6589cf29ae694fe1a7a6de70fbceac062',
                type: 'text',
                typeName: '文本',
                desc: '必填',
                code: 'projectName',
                name: '项目名称',
            },
            {
                id: '6589cf29ae694fe1a7a6de70fbceac063',
                type: 'text',
                typeName: '文本',
                desc: '必填',
                code: 'editDate',
                name: '编制时间',
            },
            {
                id: '6589cf29ae694fe1a7a6de70fbceac0631',
                type: 'integer',
                typeName: '整型',
                desc: '必填',
                code: 'pageNumber',
                name: '页码',
            },
            {
                id: '6589cf29ae694fe1a7a6de70fbceac064',
                type: 'text',
                typeName: '文本',
                desc: '必填',
                code: 'headerOther',
                name: '其它',
            },
            {
                id: '140a79cc0041403a9aa30898ba858ac51',
                type: 'table',
                typeName: '表',
                desc: '详情',
                code: 'detail',
                name: '详情',
                children: [
                    {
                        id: 'A001',
                        code: 'sysCode',
                        name: '分项编号',
                        type: 'text',
                        typeName: '文本',
                        parentId: '140a79cc0041403a9aa30898ba858ac51',
                    },
                    {
                        id: 'A002',
                        code: 'name',
                        name: '工程名称',
                        type: 'text',
                        typeName: '文本',
                        parentId: '140a79cc0041403a9aa30898ba858ac51',
                    },
                    {
                        id: 'A003',
                        code: 'unit',
                        name: '单位',
                        type: 'text',
                        typeName: '文本',
                        parentId: '140a79cc0041403a9aa30898ba858ac51',
                    },
                    {
                        id: 'A004',
                        code: 'totalCount',
                        name: '总数量',
                        type: 'text',
                        typeName: '文本',
                        parentId: '140a79cc0041403a9aa30898ba858ac51',
                    },
                    {
                        id: 'A005',
                        code: 'test1Count',
                        name: '测试1数量',
                        type: 'text',
                        typeName: '文本',
                        parentId: '140a79cc0041403a9aa30898ba858ac51',
                    },
                    {
                        id: 'A006',
                        code: 'test1Momey',
                        name: '测试1金额',
                        type: 'text',
                        typeName: '文本',
                        parentId: '140a79cc0041403a9aa30898ba858ac51',
                    },
                    {
                        id: 'A007',
                        code: 'test1Other',
                        name: '测试1技术经济指标',
                        type: 'text',
                        typeName: '文本',
                        parentId: '140a79cc0041403a9aa30898ba858ac51',
                    },
                    {
                        id: 'A008',
                        code: 'test2Count',
                        name: '测试2数量',
                        type: 'text',
                        typeName: '文本',
                        parentId: '140a79cc0041403a9aa30898ba858ac51',
                    },
                    {
                        id: 'A009',
                        code: 'test2Momey',
                        name: '测试2金额',
                        type: 'text',
                        typeName: '文本',
                        parentId: '140a79cc0041403a9aa30898ba858ac51',
                    },
                    {
                        id: 'A0010',
                        code: 'test2Other',
                        name: '测试2技术经济指标',
                        type: 'text',
                        typeName: '文本',
                        parentId: '140a79cc0041403a9aa30898ba858ac51',
                    },
                    {
                        id: 'A0011',
                        code: 'totalMomey',
                        name: '总金额',
                        type: 'text',
                        typeName: '文本',
                        parentId: '140a79cc0041403a9aa30898ba858ac51',
                    },
                    {
                        id: 'A0012',
                        code: 'totalOther',
                        name: '全路段技术经济指标，',
                        type: 'text',
                        typeName: '文本',
                        parentId: '140a79cc0041403a9aa30898ba858ac51',
                    },
                    {
                        id: 'A0013',
                        code: 'other',
                        name: '各项费用比例',
                        type: 'text',
                        typeName: '文本',
                        parentId: '140a79cc0041403a9aa30898ba858ac51',
                    },
                ],
            },
            {
                id: '6589cf29ae694fe1a7a6de70fbceac065',
                type: 'text',
                typeName: '文本',
                desc: '必填',
                code: 'personName',
                name: '编制人',
            },
            {
                id: '6589cf29ae694fe1a7a6de70fbceac066',
                type: 'text',
                typeName: '文本',
                desc: '必填',
                code: 'check',
                name: '复核',
            },
            {
                id: '140a79cc0041403a9aa30898ba858ac5',
                type: 'table',
                typeName: '表',
                desc: '工作履历',
                code: 'work',
                name: '工作经历',
                children: [
                    {
                        id: 'A0001',
                        code: 'startDate',
                        name: '开始日期',
                        type: 'text',
                        typeName: '文本',
                        parentId: '140a79cc0041403a9aa30898ba858ac5',
                    },
                    {
                        id: 'B001',
                        code: 'endDate',
                        type: 'text',
                        typeName: '文本',
                        name: '结束日期',
                        parentId: '140a79cc0041403a9aa30898ba858ac5',
                    },
                    {
                        id: 'C001',
                        code: 'companyName',
                        name: '公司名称',
                        type: 'text',
                        typeName: '文本',
                        parentId: '140a79cc0041403a9aa30898ba858ac5',
                    },
                    {
                        id: 'D001',
                        code: 'workingYears',
                        name: '工龄',
                        type: 'integer',
                        typeName: '整数',
                        parentId: '140a79cc0041403a9aa30898ba858ac5',
                    },
                    {
                        id: 'E001',
                        code: 'averagePay',
                        name: '平均工资',
                        type: 'decimals',
                        typeName: '小数',
                        parentId: '140a79cc0041403a9aa30898ba858ac5',
                    },
                ],
            },
        ], //数据源定义
        allowToView: false, //是否允许查看数据源
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
const designer = new ReportDesigner(config);
designer.mount(document.getElementById('app'));
