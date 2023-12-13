import { genUUID } from './commonUtil';

//设置表单的标签值
export function setSheetTag(sheetInstance, key, vlaue) {
    if (!sheetInstance) {
        return;
    }
    const _tag = sheetInstance.tag();
    const _tagJson = _tag ? JSON.parse(_tag) : {};
    //生成表单的实例id
    if (!_tagJson.hasOwnProperty('instanceId')) {
        _tagJson['instanceId'] = genUUID();
    }

    if (key) {
        _tagJson[key] = vlaue;
    }

    sheetInstance.tag(JSON.stringify(_tagJson));
    return _tagJson;
}

//获取表单的标签值
export function getSheetTag(sheetInstance, key) {
    if (!sheetInstance) {
        return;
    }
    const _tag = sheetInstance.tag();
    const _tagJson = _tag ? JSON.parse(_tag) : {};
    if (key) {
        return _tagJson[key];
    }
    return;
}

//获取表单的实例id
export function getSheetInstanceId(sheetInstance) {
    if (!sheetInstance) {
        return;
    }

    let instanceId = getSheetTag(sheetInstance, 'instanceId');
    if (instanceId) {
        return instanceId;
    }

    //还没有实例id，则创建实例id并且输出示例id
    return setSheetTag(sheetInstance)['instanceId'];
}

//设置表单单元格的标签值
export function setCellTag(sheetInstance, row, col, key, vlaue) {
    if (!sheetInstance) {
        return;
    }

    const _tag = sheetInstance.getTag(row, col);
    const _tagJson = _tag ? JSON.parse(_tag) : {};
    //生成表单的实例id
    if (!_tagJson.hasOwnProperty('instanceId')) {
        _tagJson['instanceId'] = genUUID();
    }

    if (key) {
        _tagJson[key] = vlaue;
    }

    sheetInstance.setTag(row, col, JSON.stringify(_tagJson));
    return _tagJson;
}

//获取表单单元格的标签值
export function getCellTag(sheetInstance, row, col, key) {
    if (!sheetInstance) {
        return;
    }
    const _tag = sheetInstance.getTag(row, col);
    const _tagJson = _tag ? JSON.parse(_tag) : {};
    if (key) {
        return _tagJson[key];
    }
    return;
}

//获取表单单元格的实例id
export function getCellInstanceId(sheetInstance, row, col) {
    if (!sheetInstance) {
        return;
    }

    let instanceId = getCellTag(sheetInstance, row, col, 'instanceId');
    if (instanceId) {
        return instanceId;
    }

    //还没有实例id，则创建实例id并且输出示例id
    return setCellTag(sheetInstance, row, col)['instanceId'];
}
