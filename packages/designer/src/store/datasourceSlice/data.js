export const dataJson = {
    title: '表A.0.2-3 总估算汇总表',
    projectName: '合同管理',
    editDate: '2023-12-21',
    pageNumber: '1',
    headerOther: '01-1表',
    detail: [
        {
            sysCode: '1', //分项编号
            name: '工程费用', //工程名称
            unit: '元', //单位
            totalCount: '100', //总数量
            test1Count: '100', //数量
            test1Momey: '100', //金额
            test1Other: '100', //技术经济指标

            test2Count: '200', //数量
            test2Momey: '200', //金额
            test2Other: '200', //技术经济指标

            totalMomey: '200', //总金额
            totalOther: '200', //全路段技术经济指标，
            other: '0.8', //各项费用比例
        },
        {
            sysCode: '1', //分项编号
            name: '工程费用', //工程名称
            unit: '元', //单位
            totalCount: '100', //总数量
            test1Count: '100', //数量
            test1Momey: '100', //金额
            test1Other: '100', //技术经济指标

            test2Count: '200', //数量
            test2Momey: '200', //金额
            test2Other: '200', //技术经济指标

            totalMomey: '200', //总金额
            totalOther: '200', //全路段技术经济指标，
            other: '0.8', //各项费用比例
        },
        {
            sysCode: '1', //分项编号
            name: '工程费用', //工程名称
            unit: '元', //单位
            totalCount: '100', //总数量
            test1Count: '100', //数量
            test1Momey: '100', //金额
            test1Other: '100', //技术经济指标

            test2Count: '200', //数量
            test2Momey: '200', //金额
            test2Other: '200', //技术经济指标

            totalMomey: '200', //总金额
            totalOther: '200', //全路段技术经济指标，
            other: '0.8', //各项费用比例
        },
        {
            sysCode: '1', //分项编号
            name: '工程费用', //工程名称
            unit: '元', //单位
            totalCount: '100', //总数量
            test1Count: '100', //数量
            test1Momey: '100', //金额
            test1Other: '100', //技术经济指标

            test2Count: '200', //数量
            test2Momey: '200', //金额
            test2Other: '200', //技术经济指标

            totalMomey: '200', //总金额
            totalOther: '200', //全路段技术经济指标，
            other: '0.8', //各项费用比例
        },
    ],
    personName: '张三', //编制人
    check: '', //复核
};

export const ds = [
    {
        id: '6589cf29ae694fe1a7a6de70fbceac061',
        value: '',
        type: 'text',
        typeName: '文本',
        desc: '必填',
        code: 'title',
        name: '标题',
    },
    {
        id: '6589cf29ae694fe1a7a6de70fbceac062',
        value: '',
        type: 'text',
        typeName: '文本',
        desc: '必填',
        code: 'projectName',
        name: '项目名称',
    },
    {
        id: '6589cf29ae694fe1a7a6de70fbceac063',
        value: '',
        type: 'text',
        typeName: '文本',
        desc: '必填',
        code: 'editDate',
        name: '编制时间',
    },
    {
        id: '6589cf29ae694fe1a7a6de70fbceac0631',
        value: '',
        type: 'integer',
        typeName: '整型',
        desc: '必填',
        code: 'pageNumber',
        name: '页码',
    },
    {
        id: '6589cf29ae694fe1a7a6de70fbceac064',
        value: '',
        type: 'text',
        typeName: '文本',
        desc: '必填',
        code: 'headerOther',
        name: '其它',
    },
    {
        id: '140a79cc0041403a9aa30898ba858ac51',
        value: '',
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
        value: '',
        type: 'text',
        typeName: '文本',
        desc: '必填',
        code: 'personName',
        name: '编制人',
    },
    {
        id: '6589cf29ae694fe1a7a6de70fbceac066',
        value: '',
        type: 'text',
        typeName: '文本',
        desc: '必填',
        code: 'check',
        name: '复核',
    },
    {
        id: '140a79cc0041403a9aa30898ba858ac5',
        value: '',
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
];
