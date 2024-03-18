export default class Main {
    initialDatas = [];
    rowFields = []; //行字段。[{code:'province',name:'省份'}]
    colFields = []; //列字段。[{code:'type_name',name:'类型'}]
    summationFields = []; //求和字段。[{code:'quantity',name:'数量'}]

    groupedDatas = new Map();
    datas = [];
    colums = [];
    columnsObj = {};
    columnsPrefix = [];
    spansArr = [];

    constructor(options = {}) {
        const {
            datas,
            rowFields = [],
            colFields = [],
            summationFields = [],
        } = options;

        this.initialDatas = datas;
        this.rowFields = rowFields;
        this.colFields = colFields;
        this.summationFields = summationFields;
        this.genDatas();
    }

    genDatas() {
        if (
            !this.colFields.length &&
            !this.rowFields.length &&
            !this.summationFields
        ) {
            this.datas = [];
        }
        this.create();
    }

    genRowFieldsSpans(rowCount) {
        //生成合并表格头部需要的数据
        const spanItem = {
            row: 0,
            col: 0,
            colCount: 1,
            rowCount: rowCount || 1,
            children: [],
            style: {
                vAlign: 1,
            },
        };
        let parent = spanItem;
        this.spansArr.unshift(spanItem);
        let index = this.rowFields.length - 1;
        while (index-- > 0) {
            const spanItem = {
                row: 0,
                col: parent.col + 1,
                colCount: 1,
                rowCount: rowCount || 1,
                children: [],
                style: {
                    vAlign: 1,
                },
            };
            parent.children.push(spanItem);
            parent = spanItem;
        }
        return parent;
    }

    create() {
        const sumDatas = []; //求和数据
        const tableColumns = []; //表格列(隐藏)
        const headerDatas = []; //表头数据
        const rowFields = this.rowFields;
        const colFields = this.colFields;
        const summationFields = this.summationFields;

        const rowFieldsLen = rowFields.length;
        const colFieldsLen = colFields.length;
        const summationFieldsLen = summationFields.length;

        //构造分组对应的表头信息，用于构造分组对应的表头数据
        const rowGroupsColsInfo = {};
        rowFields.forEach(({ code, name }) => {
            rowGroupsColsInfo[code] = name;
            tableColumns.push({ id: code, code, name });
        });

        //构造分组对应的表头数据(多重)
        if (rowFieldsLen && colFieldsLen) {
            const num = colFieldsLen + (summationFieldsLen > 1 ? 1 : 0);
            for (let i = 0; i < num; i++) {
                headerDatas[i] = { ...rowGroupsColsInfo };
            }
        }

        if (rowFieldsLen || colFieldsLen) {
            const groupedDatas = this.groupData();
            this.handleGroupedDatas(groupedDatas, sumDatas);
        } else if (summationFieldsLen) {
            //不存在行字段和列字段，则直接根据求和字段构造数据，数据形如:{求和字段1：100,求和字段2：222}
            const result = summationFields.reduce((res, { code }) => {
                res[code] = 0;
                this.initialDatas.forEach((data) => {
                    const value = Number(data[code]);
                    if (Number.isFinite(value)) {
                        res[code] += value;
                    }
                });
                return res;
            }, {});
            sumDatas.push(result);
        }

        const rowFieldsSpanItem = this.genRowFieldsSpans(headerDatas.length);

        const spanItem = {
            row: 0,
            col: rowFieldsSpanItem.col + 1,
            colCount: 0,
            rowCount: 1,
            children: [],
            style: {
                hAlign: 1,
            },
        };
        let parent = spanItem;

        let groupName = '';

        if (colFieldsLen) {
            //构造列字段对应的表头数据
            rowFieldsSpanItem.children.push(spanItem);
            this.columnsPrefix.forEach((item) => {
                Object.entries(this.columnsObj).forEach(([key, value]) => {
                    if (key.startsWith(item)) {
                        tableColumns.push({ id: key, code: key, name: key });
                        if (!groupName) {
                            groupName = value[0].name;
                        }
                        if (groupName !== value[0].name) {
                            groupName = value[0].name;
                            const spanItem = {
                                row: 0,
                                col: parent.col + parent.colCount,
                                colCount: 0,
                                rowCount: 1,
                                children: [],
                                style: {
                                    hAlign: 1,
                                },
                            };
                            parent.children.push(spanItem);
                            parent = spanItem;
                        }
                        parent.colCount += 1;
                        value.forEach((_value, index) => {
                            headerDatas[index][key] = _value.name;
                            if (index > 1) {
                            }
                        });
                    }
                });
            });
        } else {
            //构造求和字段对应的表头数据
            tableColumns.push(...summationFields);
            const res = summationFields.reduce(
                (res, { code, name }) => {
                    res[code] = name;
                    return res;
                },
                { ...rowGroupsColsInfo }
            );
            headerDatas.push(res);
        }

        //空白字段补0
        const dataCol = tableColumns.slice(this.rowFields.length);
        dataCol.forEach(function ({ code }) {
            sumDatas.forEach(function (data) {
                if (!data[code]) {
                    data[code] = 0;
                }
            });
        });

        this.tableColumns = tableColumns;
        this.sumDatas = [...headerDatas, ...sumDatas];
        this.headerDatas = headerDatas;

        if (this.summationFields.length) {
            this.spansArr.push({
                row: 0,
                col: 0,
                rowCount: 1,
                colCount: this.rowFields.length,
            });
        }

        debugger;
    }

    handleGroupedDatas(groupedDatas, result = []) {
        const subtotal = {};

        groupedDatas.forEach((groupedDataItem) => {
            const {
                childrenGroups,
                groupCode,
                groupName,
                parentGroups,
                childType,
                sumDatas = {},
            } = groupedDataItem;

            subtotal[groupCode] = groupName;
            if (Array.isArray(parentGroups)) {
                parentGroups.forEach(({ code, name }) => {
                    subtotal[code] = name;
                });
            }

            if (childrenGroups && childType === 'row') {
                //按行统计没有结束，继续迭代
                const _subtotal = this.handleGroupedDatas(
                    childrenGroups,
                    result
                );

                Object.entries(_subtotal).forEach(([key, value]) => {
                    subtotal[key] = subtotal[key] ? subtotal[key] : 0;
                    if (typeof value === 'number') {
                        subtotal[key] += value;
                    }
                    value === '小计' && (subtotal[key] = '小计');
                    subtotal[groupCode] = '小计';
                });
                if (this.summationFields.length) {
                    result.push(_subtotal);
                }
            } else {
                let data = {};
                if (parentGroups?.length) {
                    parentGroups.forEach(function ({ code, name }) {
                        data[code] = name;
                    });
                }
                if (groupCode) {
                    //按行并且按列统计数据
                    data[groupCode] = groupName;
                    result.push({ ...data, ...sumDatas });
                    Object.entries(sumDatas).forEach(([key, value]) => {
                        subtotal[key] = subtotal[key] ? subtotal[key] : 0;
                        if (typeof value === 'number') {
                            subtotal[key] += value;
                        }

                        subtotal[groupCode] = '小计';
                    });
                } else if (
                    !this.rowFields.length &&
                    !groupCode &&
                    childrenGroups &&
                    childType === 'col' &&
                    !!this.summationFields.length
                ) {
                    //只按列统计数据
                    childrenGroups.forEach(({ sumDatas = {} }) => {
                        data = { ...data, ...sumDatas };
                    });
                    result.push(data);
                }
            }
        });

        return subtotal;
    }

    groupData() {
        let groupType = 'normal';
        let fields = this.rowFields;
        if (!!this.rowFields.length) {
            groupType = 'row';
        } else if (!!this.colFields.length) {
            groupType = 'col';
            fields = this.colFields;
        }

        const childrenGroups = this.groupByFields({
            datas: this.initialDatas,
            fields,
            type: groupType,
            col: 0,
        });

        this.groupedDatas = new Map([
            [
                '总',
                {
                    groupName: '总',
                    groupCode: null,
                    allChildrens: [...this.initialDatas],
                    childrenGroups,
                    childType: groupType,
                    type: 'normal',
                },
            ],
        ]);

        return this.groupedDatas;
    }

    groupByFields({
        datas,
        fields = [],
        type = 'row',
        parentGroups = [],
        sumDatas = {},
        children,
        col = 0,
    }) {
        if (!fields.length) {
            return;
        }
        const groupedDatas = new Map();

        let _fields = [...fields];
        const { code: groupCode } = _fields.shift();
        const summationFieldsLen = this.summationFields.length;
        const _spans = children ? children : this.spansArr;
        //对数据进行分组
        datas.forEach((data) => {
            const groupName = data[groupCode];
            if (!groupedDatas.has(groupName)) {
                //当前分组合并单元格信息
                const spansItem = {
                    groupName,
                    groupCode,
                    children: [],
                    row: 0,
                    col,
                    rowCount: 0,
                    colCount: 1,
                    style: {
                        vAlign: 1,
                    },
                };
                groupedDatas.set(groupName, {
                    groupName,
                    groupCode,
                    allChildrensDatas: [],
                    parentGroups,
                    type,
                    spansItem,
                });
                if (type === 'row') {
                    _spans.push(spansItem);
                }
            }
            if (type === 'col' && !this.columnsPrefix.includes(groupName)) {
                this.columnsPrefix.push(groupName);
            }
            const currentGroups = groupedDatas.get(groupName);
            currentGroups.allChildrensDatas.push(data);
        });

        let _newType = type;
        if (!_fields.length && this.colFields.length && type !== 'col') {
            _newType = 'col';
            _fields = this.colFields;
        }

        if (!_fields.length) {
            let parentGroupsColKey = '';
            if (parentGroups.length) {
                parentGroupsColKey = parentGroups.reduce(function (pre, cur) {
                    return pre + cur.name;
                }, '');
            }
            const _sumDatas = sumDatas || { ...sumDatas };
            groupedDatas.forEach((groupInfo) => {
                const { allChildrensDatas, groupName, groupCode } = groupInfo;
                if (summationFieldsLen) {
                    this.summationFields.forEach(({ name, code }) => {
                        const res = allChildrensDatas.reduce((res, cur) => {
                            const value = Number(cur[code]);
                            if (Number.isFinite(value)) {
                                return res + value;
                            }
                            return res;
                        }, 0);

                        let columnKey = parentGroupsColKey + groupName;

                        columnKey = !!this.colFields.length
                            ? columnKey + (name || code)
                            : code;
                        _sumDatas[columnKey] = res;

                        this.columnsObj[columnKey] = [
                            ...parentGroups,
                            { code: groupCode, name: groupName },
                        ];

                        //如果求和列的数量大于1，则求和列也作为表头数据展示
                        if (summationFieldsLen > 1) {
                            this.columnsObj[columnKey].push({ code, name });
                        }
                    });
                } else {
                    let columnKey = parentGroupsColKey + groupName;
                    this.columnsObj[columnKey] = [
                        ...parentGroups,
                        { code: groupCode, name: groupName },
                    ];
                }
                groupInfo.sumDatas = { ..._sumDatas };
            });

            return groupedDatas;
        }
        //对分组后的数据再次分组
        groupedDatas.forEach((groupInfo) => {
            const { allChildrensDatas, groupName, spansItem } = groupInfo;

            if (allChildrensDatas.length <= 0) {
                return;
            }

            groupInfo.sumDatas = {};
            //参数
            const parentGroupsParam =
                type === _newType
                    ? [...parentGroups, { code: groupCode, name: groupName }]
                    : [];

            //参数
            const sumDatasParam =
                type === _newType && type !== 'row'
                    ? sumDatas
                    : groupInfo.sumDatas;

            groupInfo.childrenGroups = this.groupByFields({
                datas: allChildrensDatas,
                fields: _fields,
                type: _newType,
                parentGroups: parentGroupsParam,
                sumDatas: sumDatasParam,
                children: spansItem?.children,
                col: col + 1,
            });

            spansItem.children = spansItem?.children.filter((item) => {
                if (item.rowCount > 1) {
                    spansItem.rowCount += item.rowCount;
                } else {
                    spansItem.rowCount += 1;
                }

                return true;
            });

            if (this.summationFields.length && spansItem.rowCount >= 1) {
                spansItem.rowCount += 1;
                //生成小计所在单元格的合并信息
                const index = this.rowFields.findIndex(function (item) {
                    return item.code === spansItem.groupCode;
                });
                if (index >= 0) {
                    const diff = this.rowFields.length - index;
                    if (diff >= 2) {
                        spansItem.children.push({
                            row: 0,
                            col: index + 1,
                            rowCount: 1,
                            colCount: diff - 1,
                        });
                    }
                }
            }

            groupInfo.type = _newType;
            groupInfo.childType = _newType;
        });

        return groupedDatas;
    }
    setRowFields(rowFields) {
        this.rowFields = Array.isArray(rowFields) ? rowFields : [];
        this.genDatas();
    }

    setColFields(colFields) {
        this.colFields = Array.isArray(colFields) ? colFields : [];
        this.genDatas();
    }

    setSummationFields(summationFields) {
        this.summationFields = Array.isArray(summationFields)
            ? summationFields
            : [];
        this.genDatas();
    }
}
