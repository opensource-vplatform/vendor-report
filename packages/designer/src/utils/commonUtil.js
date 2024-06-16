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

export const copyToClipboard = function(text) {
    if(navigator&&navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(text)
    }else{
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
  }
