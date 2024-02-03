export function findTreeNodeById(nodeId, tree) {
    if (!nodeId || !tree) {
        return;
    }
    let node = null;
    const _stack = Array.isArray(tree) ? [...tree] : [tree];
    while (_stack.length > 0) {
        const _current = _stack.shift();
        if (_current.id === nodeId) {
            node = _current;
            break;
        }
        if (Array.isArray(_current.children)) {
            _stack.push(..._current.children);
        }
    }
    return node;
}

export function hasSameNode(node, tree) {
    if (!node || !tree) {
        return false;
    }
    let _tree = tree;

    const { parentId, id, code } = node;
    const parent = findTreeNodeById(parentId, _tree);
    if (parent) {
        _tree = Array.isArray(parent.children) ? parent.children : [];
    }
    const _stack = Array.isArray(_tree) ? [..._tree] : [_tree];

    while (_stack.length > 0) {
        const _current = _stack.shift();
        if (_current.id !== id && _current.code === code) {
            return true;
        }
    }
    return false;
}

export function genUUID() {
    return crypto.randomUUID().replaceAll('-', '');
}

//内部函数，不对外提供
function _deepCopy(obj, cache = new WeakMap()) {
    // 如果是基本类型或者null/undefined，直接返回
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // 如果已经拷贝过了，直接返回缓存中的对象
    if (cache.has(obj)) {
        return cache.get(obj);
    }

    // 根据类型创建新的对象
    const newObj = Array.isArray(obj) ? [] : {};

    // 将新对象缓存起来
    cache.set(obj, newObj);

    // 递归拷贝每一个属性
    Object.keys(obj).forEach((key) => {
        newObj[key] = _deepCopy(obj[key], cache);
    });

    return newObj;
}

export function deepCopy(obj) {
    return _deepCopy(obj);
}

export function genValueByType(name, type, index) {
    switch (type) {
        case 'integer':
            return index;
        case 'decimals':
            return index + Math.floor(Math.random() * 100) / 100;
        default:
            return name + index;
    }
}

export function getActiveSheetTablesPath(params) {
    const { sheet } = params;
    const tables = sheet.tables.all();
    return tables.reduce(function (result, table) {
        const path = table.bindingPath();
        if (path) {
            result[path] = true;
        }
        return result;
    }, {});
}

function flatGrouped(datas, groupFields = [], fields = [], sumColumns = []) {
    const results = [];
    //求和字段
    const countCol = sumColumns.map(({ code }) => code);
    const isSum = countCol.length > 0;
    //普通字段。不参与分组和求和的字段
    const commonFields = fields.filter(function ({ code }) {
        return !groupFields.includes(code) && !countCol.includes(code);
    });

    const commonFieldsLen = commonFields.length;
    const a = {
        backColor: null,
        foreColor: null,
        hAlign: 0,
        vAlign: 1,
        font: '11pt Calibri',
        locked: true,
        wordWrap: false,
        textDecoration: 0,
        imeMode: 1,
        isVerticalText: false,
    };

    function handleDatas(groupedDatas) {
        let lastChild = null;
        let totalRowCount = 0;
        const spansTree = [];

        groupedDatas.forEach(function (groupedDataItem, a, b) {
            let spansTreeItem = {
                children: [],
                verticalSpans: [],
            };
            const { childrenGroups, allChildrens, groupCode, groupName } =
                groupedDataItem;

            let rowCount = 0;
            const groupIndex = groupFields.indexOf(groupCode);

            if (childrenGroups) {
                const res = handleDatas(childrenGroups);
                lastChild = res.lastChild;
                rowCount += res.totalRowCount;
                totalRowCount += res.totalRowCount;

                spansTreeItem.children.push(...res.spansTree);
            } else {
                allChildrens.forEach(function (item) {
                    lastChild = item;
                    const virtualDatas = [];
                    if (isSum) {
                        const preFiledData = {};
                        groupFields.forEach(function (field) {
                            preFiledData[field] = item[field];
                        });
                        for (let i = 0; i < commonFieldsLen - 1; i++) {
                            const fieldCode = commonFields[i].code;
                            preFiledData[fieldCode] = item[fieldCode];
                            const nextFieldCode = commonFields[i + 1].code;
                            const virtualData = {
                                ...preFiledData,
                                [nextFieldCode]: '小计',
                            };
                            countCol.forEach((key) => {
                                const numberData = Number(item[key]);
                                item[key] = !Number.isNaN(numberData)
                                    ? numberData
                                    : 0;
                                Object.defineProperty(virtualData, key, {
                                    get() {
                                        return item[key];
                                    },
                                });
                            });

                            virtualDatas.unshift(virtualData);
                            //纵向合并
                            if (!spansTreeItem.verticalSpans[i]) {
                                spansTreeItem.verticalSpans[i] = [];
                            }
                            spansTreeItem.verticalSpans[i].push({
                                rowCount: commonFieldsLen - i,
                                col: groupIndex + i + 1,
                                colCount: 1,
                                row: 0,
                                subtotalSpan: {
                                    rowCount: 1,
                                    col: groupIndex + i + 1 + 1,
                                    colCount: commonFieldsLen - i - 1,
                                    row: 0,
                                },
                                style: {
                                    vAlign: 1,
                                },
                            });

                            rowCount++;
                            totalRowCount++;
                        }
                    }

                    rowCount++;
                    totalRowCount++;
                    results.push(item, ...virtualDatas);
                });
            }

            const virtualData = {};
            if (groupCode) {
                if (isSum) {
                    //虚拟数据，用于对当前分组的数据进行求和
                    const index = groupFields.indexOf(groupCode);
                    groupFields.forEach(function (item, curIndex) {
                        curIndex <= index &&
                            (virtualData[item] = lastChild[item]);
                    });
                    let code = groupFields[index + 1];
                    if (index + 1 === groupFields.length) {
                        code = commonFields[0].code;
                    }

                    virtualData[groupCode] = groupName;
                    virtualData[code] = '小计';

                    //生成虚拟数据合并的单元格数据量
                    spansTreeItem.subtotalSpan = {
                        row: 0,
                        col: index + 1,
                        rowCount: 1,
                        colCount:
                            commonFieldsLen + (groupFields.length - index) - 1,
                    };

                    rowCount++;
                    totalRowCount++;
                }

                //生成分组需要合并的单元格数量
                const _span = {
                    rowCount,
                    col: groupIndex,
                    colCount: 1,
                    row: 0,
                    style: {
                        vAlign: 1,
                    },
                };
                spansTreeItem = { ...spansTreeItem, ..._span };
            } else if (isSum) {
                //虚拟数据，用于对所有数据进行求和
                virtualData[groupFields[0] || commonFields?.[0].code] = '小计';
                //生成虚拟数据合并的单元格数据量
                spansTreeItem = {
                    ...spansTreeItem,
                    row: totalRowCount,
                    rowCount: 1,
                    col: 0,
                    colCount: groupFields.length + commonFieldsLen,
                    isTotal: true,
                };
            }

            //对当前分组的数据根据求和字段进行求和
            if (isSum) {
                countCol.forEach((key) => {
                    Object.defineProperty(virtualData, key, {
                        get() {
                            return allChildrens.reduce(function (res, item) {
                                return res + item[key];
                            }, 0);
                        },
                    });
                });
                results.push(virtualData);
            }
            spansTree.push(spansTreeItem);
        });
        return { lastChild, totalRowCount, spansTree };
    }
    const { spansTree } = handleDatas(datas);

    return { datas: results, spansTree };
}

function groupData(datas, groups = []) {
    function group(datas, groups) {
        const cobyGroups = [...groups];
        const groupedDatas = new Map();
        const groupField = cobyGroups.shift();
        datas.forEach(function (data) {
            const groupName = data[groupField];
            if (!groupedDatas.has(groupName)) {
                groupedDatas.set(groupName, {
                    groupName,
                    groupCode: groupField,
                    allChildrens: [],
                });
            }
            const currentGroups = groupedDatas.get(groupName);
            currentGroups.allChildrens.push(data);
        });

        groupedDatas.forEach(function (groupInfo) {
            if (cobyGroups.length > 0 && groupInfo.allChildrens.length > 0) {
                groupInfo.childrenGroups = group(
                    groupInfo.allChildrens,
                    cobyGroups
                );
            }
        });
        return groupedDatas;
    }

    const childrenGroups = groups.length > 0 ? group(datas, groups) : undefined;

    const groupedDatas = new Map([
        [
            '总',
            {
                groupName: '总',
                groupCode: null,
                allChildrens: [...datas],
                childrenGroups,
            },
        ],
    ]);
    return groupedDatas;
}

export function sortData(datas, groups, fields, sumColumns) {
    const groupFields = groups.map(({ code }) => code);
    const groupedDatas = groupData(datas, groupFields);
    const { datas: _datas, spansTree } = flatGrouped(
        groupedDatas,
        groupFields,
        fields,
        sumColumns
    );
    return {
        datas: _datas,
        spansTree,
    };
}

export function genSpans(datas, row = 0, col = 0) {
    const spans = [];
    const dataTableStyle = {};
    function parseJsonDataToSpans(jsonData, parentRow = 0, parentCol = 0) {
        let rowStart = parentRow;
        jsonData.forEach(function (item) {
            const {
                row = 0,
                col = 0,
                rowCount = 1,
                colCount = 1,
                children = [],
                verticalSpans = [],
                subtotalSpan,
                isTotal = false,
            } = item;

            if (children.length > 0) {
                parseJsonDataToSpans(children, rowStart);
            }
            if (verticalSpans.length > 0) {
                verticalSpans.forEach(function (verticalSpan, index) {
                    let preRowStart = rowStart;
                    verticalSpan.forEach(function (item) {
                        if (item.hasOwnProperty('style')) {
                            const { col, style } = item;
                            if (!dataTableStyle[preRowStart]) {
                                dataTableStyle[preRowStart] = {};
                            }

                            if (!dataTableStyle[preRowStart][col]) {
                                dataTableStyle[preRowStart][col] = {};
                            }

                            dataTableStyle[preRowStart][col].style = {
                                ...style,
                            };
                        }

                        spans.push({
                            row: preRowStart,
                            col: item.col + parentCol,
                            rowCount: item.rowCount,
                            colCount: item.colCount,
                        });

                        if (item.subtotalSpan.colCount > 1) {
                            spans.push({
                                row: preRowStart + item.rowCount - 1,
                                col: item.subtotalSpan.col + parentCol,
                                rowCount: item.subtotalSpan.rowCount,
                                colCount: item.subtotalSpan.colCount,
                            });
                        }

                        preRowStart += item.rowCount + index;
                    });
                });
            }
            if (item.hasOwnProperty('style')) {
                const { col, style } = item;
                if (!dataTableStyle[rowStart]) {
                    dataTableStyle[rowStart] = {};
                }

                if (!dataTableStyle[rowStart][col]) {
                    dataTableStyle[rowStart][col] = {};
                }

                dataTableStyle[rowStart][col].style = { ...style };
            }
            if (item.hasOwnProperty('row')) {
                if (isTotal) {
                    spans.push({
                        row: row + parentRow,
                        col: col + parentCol,
                        rowCount,
                        colCount,
                    });
                } else {
                    spans.push({
                        row: rowStart,
                        col: col + parentCol,
                        rowCount,
                        colCount,
                    });
                }

                if (subtotalSpan) {
                    spans.push({
                        row: rowStart + rowCount - 1,
                        col: subtotalSpan.col + parentCol,
                        rowCount: subtotalSpan.rowCount,
                        colCount: subtotalSpan.colCount,
                    });
                }
                rowStart = rowStart + rowCount;
            }
        });
    }
    parseJsonDataToSpans(datas, row, col);
    console.log(dataTableStyle);
    return { spans, dataTableStyle };
}
