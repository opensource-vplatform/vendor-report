const dataTypeToType = function (dataType) {
    switch (dataType) {
        case 'java.lang.Boolean':
        case 'java.lang.String':
            return { type: 'text', typeName: '文本' };
        case 'int':
            return { type: 'integer', typeName: '整数' };
        case 'java.lang.Double':
            return { type: 'decimals', typeName: '小数' };
    }
};

const parseMetadata = function (metadata) {
    let { code, name, children = [],params } = metadata;
    children = children.map((child) => {
        const { field, dataType, fieldName } = child;
        return {
            ...dataTypeToType(dataType),
            id: field,
            desc: field,
            code: field,
            name: fieldName,
            parentId: code,
        };
    });
    return {
        id: code,
        type: 'table',
        typeName: '表',
        desc: code,
        code,
        name,
        children,
        params,
    };
};

export const parseDefine = function (define) {
    const { metadata, datas } = define;
    return {
        metadata: parseMetadata(metadata),
        datas:{[metadata.code]:datas},
    };
};
