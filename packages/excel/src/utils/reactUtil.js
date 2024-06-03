export const isReactNode = function (node) {
    return (
        typeof node === 'object' &&
        node !== null &&
        typeof node.$$typeof === 'symbol' &&
        node.$$typeof.toString() === 'Symbol(react.element)'
    );
};
