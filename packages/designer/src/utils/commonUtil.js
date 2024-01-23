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

export function sortData(datas, groups) {
    //初始化分组数据(二维数组)
    const groupedDatas = [datas];
    const groupFields = groups.map(({ code }) => code);
    const spans = []; //二维数组，用于收集每一组合并单元格的数量，[[]]
    let groupNumber = 0;

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
    return {
        datas: result,
        spans,
    };
}
