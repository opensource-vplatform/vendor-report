import { isFunction } from '@utils/objectUtil';

export const getBindText = function(bindingPath,spread){
    if (spread && isFunction(spread.getDesignerDatasources)) {
        const datasources = spread.getDesignerDatasources();
        if (datasources && datasources.length > 0) {
            const paths = bindingPath.split('.');
            const code = paths[0];
            const datasource = datasources.find(
                (datasource) => datasource.code == code
            );
            if (datasource) {
                const datasourceName = datasource.name
                    ? datasource.name
                    : datasource.code;
                if (paths.length == 2) {
                    const children = datasource.children;
                    if (children && children.length > 0) {
                        const field = children.find(
                            (field) => field.code == paths[1]
                        );
                        if (field) {
                            const fieldName = field.name
                                ? field.name
                                : field.code;
                            return `[${datasourceName}.${fieldName}]`;
                        }
                    }
                } else {
                    return `[${datasourceName}]`;
                }
            }
        }
    }
}