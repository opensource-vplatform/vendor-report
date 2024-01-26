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

function sum(datas, groupFields = [], fields = []) {
    const results = [];
    const countCol = ['quantity'];
    const field = fields.filter(function ({ code }) {
        return !groupFields.includes(code) && !countCol.includes(code);
    });
    const spansInfo = [];
    const fieldLen = field.length;
    function handleDatas(groups) {
        let lastChild = null;
        groups.forEach(function ({
            childrenGroups,
            allChildrens,
            groupCode,
            groupName,
        }) {
            if (childrenGroups) {
                lastChild = handleDatas(childrenGroups);
                spansInfo.push({
                    field,
                    isNull: true,
                    groupCode,
                });
            } else {
                let virtualDatasLen = 0;
                allChildrens.forEach(function (item) {
                    lastChild = item;
                    const virtualDatas = [];
                    const preFiledData = {};
                    groupFields.forEach(function (field) {
                        preFiledData[field] = item[field];
                    });
                    for (let i = 0; i < fieldLen - 1; i++) {
                        const currentFieldCode = field[i].code;
                        preFiledData[currentFieldCode] = item[currentFieldCode];
                        const nextFieldCode = field[i + 1].code;
                        const virtualData = {
                            ...preFiledData,
                            [nextFieldCode]: '小计',
                        };
                        Object.defineProperty(virtualData, 'quantity', {
                            get() {
                                return item['quantity'];
                            },
                        });
                        virtualDatas.unshift(virtualData);
                    }
                    virtualDatasLen = virtualDatas.length;
                    results.push(item, ...virtualDatas);
                });
                spansInfo.push({
                    virtualDatasLen,
                    datasLen: allChildrens.length,
                    field,
                    groupCode,
                });
            }
            const virtualData = {};
            if (groupCode) {
                const index = groupFields.indexOf(groupCode);
                groupFields.forEach(function (item, curIndex) {
                    curIndex <= index && (virtualData[item] = lastChild[item]);
                });
                let code = groupFields[index + 1];
                if (index + 1 === groupFields.length) {
                    code = field[0].code;
                }

                virtualData[groupCode] = groupName;
                virtualData[code] = '小计';
            } else {
                virtualData[groupFields[0]] = '小计';
            }
            Object.defineProperty(virtualData, 'quantity', {
                get() {
                    return allChildrens.reduce(function (res, item) {
                        return res + item['quantity'];
                    }, 0);
                },
            });
            results.push(virtualData);
        });
        return lastChild;
    }
    handleDatas(datas);
    window.spansInfo = spansInfo;
    console.log(spansInfo);
    return results;
}

function groupData(datas, groups) {
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
    const groupedDatas = new Map([
        [
            '总',
            {
                groupName: '总',
                groupCode: null,
                allChildrens: [...datas],
                childrenGroups: group(datas, groups),
            },
        ],
    ]);
    return groupedDatas;
}

export function sortData(datas, groups, fields) {
    //初始化分组数据(二维数组)
    const groupedDatas = [datas];
    const groupFields = groups.map(({ code }) => code);
    const spans = []; //二维数组，用于收集每一组合并单元格的数量，[[]]
    let groupNumber = 0;
    const resultDatas = groupData(datas, groupFields);
    const sumRes = sum(resultDatas, groupFields, fields);
    while (groupFields.length > 0) {
        spans[groupNumber] = [];
        const field = groupFields.shift();
        const pendingGroupDatas = [];
        while (groupedDatas.length > 0) {
            //对当前分组的数据再次分组
            const currentGroupDatas = groupedDatas.shift();
            //子分组
            const childrenGroupedDatas = {};
            currentGroupDatas.forEach(function (item) {
                if (!childrenGroupedDatas[item[field]]) {
                    childrenGroupedDatas[item[field]] = [];
                }
                childrenGroupedDatas[item[field]].push(item);
            });

            //将当前分组进行分组后的数据推入栈中，再次分组，以此类推
            //放while循环里面，避免不同分组之间数据一样时导致数据问题
            Object.values(childrenGroupedDatas).forEach(function (group) {
                //1,将分组后数据推入栈中
                pendingGroupDatas.push(group);

                //2，统计每一组应该合并的单元格数量
                spans[groupNumber].push(group.length);
            });
        }
        groupedDatas.push(...pendingGroupDatas);
        groupNumber += 1;
    }

    //合并分组后的数据
    const result = groupedDatas.reduce((res, cur) => [...res, ...cur], []);
    window.sumRes = sumRes;
    return {
        datas: sumRes || result,
        spans,
    };
}
