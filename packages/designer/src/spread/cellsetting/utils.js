import {
  isFunction,
  isNullOrUndef,
} from '@toone/report-util';
import { getBaseUrl } from '@utils/environmentUtil';
import { getNamespace } from '@utils/spreadUtil';

export const getBindText = function (bindingPath, spread) {
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
};

/**
 * 是否绑定实体字段
 * @param {*} sheet
 * @param {*} row
 * @param {*} col
 * @returns
 */
export const hasBindField = function (sheet, row, col) {
    const bindingPath = sheet.getBindingPath(row, col);
    //有绑定信息，且绑定的为实体字段
    return bindingPath && bindingPath.split&& bindingPath.split('.').length == 2;
};

export const setIconDecoration = function (style, type) {
    const GC = getNamespace();
    style.decoration = {
        icons: [
            {
                src: getBaseUrl() + `/css/icons/design/${type}.svg`,
                width: 16,
                height: 16,
                v_i: true,
                position: GC.Spread.Sheets.IconPosition.leftOfText,
            },
        ],
    };
    const hAlign = style.hAlign;
    const HorizontalAlign = GC.Spread.Sheets.HorizontalAlign;
    if (
        hAlign == HorizontalAlign.left ||
        hAlign == HorizontalAlign.general ||
        isNullOrUndef(hAlign)
    ) {
        style.textIndent = style.textIndent || 1;
    }
};

export const setFormulaDecoration = function (style) {
    setIconDecoration(style, 'formula');
};

export const setListDecoration = function (style) {
    setIconDecoration(style, 'list');
};

export const setGroupDecoration = function (style) {
    setIconDecoration(style, 'group');
};

export const setSumDecoration = function (style) {
    setIconDecoration(style, 'sum');
};

export const setImageDecoration = function (style) {
    setIconDecoration(style, 'image');
};
