import { getNamespace } from './spreadUtil';

const getTextDecorationType = function (type) {
    const GC = getNamespace();
    return GC.Spread.Sheets.TextDecorationType[type];
};

export const isLineThrough = function (textDecoration) {
    const lineThrough = getTextDecorationType('lineThrough');
    return (
        textDecoration == lineThrough ||
        lineThrough == without(textDecoration, 'underline') ||
        lineThrough == without(textDecoration, 'doubleUnderline')
    );
};

const without = function (textDecoration, type) {
    const delta = getTextDecorationType(type);
    return textDecoration - delta;
};

export const withoutLineThrough = function (textDecoration) {
    return without(textDecoration, 'lineThrough');
};

export const withLineThrough = function(textDecoration){
    const lineThrough = getTextDecorationType('lineThrough');
    return textDecoration | lineThrough;
}

export const isUnderline = function (textDecoration) {
    const underline = getTextDecorationType('underline');
    return (
        textDecoration == underline ||
        underline == withoutLineThrough(textDecoration)
    );
};

export const isDoubleUnderline = function (textDecoration) {
    const doubleUnderline = getTextDecorationType('doubleUnderline');
    return (
        textDecoration == doubleUnderline ||
        doubleUnderline == withoutLineThrough(textDecoration)
    );
};
