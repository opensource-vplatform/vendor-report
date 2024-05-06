export const getNavConfig = function (context, attr) {
    return context?.conf?.nav?.[attr] === false;
};

export const getNavViewConfig = function (context, attr) {
    return context?.conf?.nav?.view?.[attr] === false;
};

export const getNavTableConfig = function (context, attr) {
    return context?.conf?.nav?.table?.[attr] === false;
};

export const getNavStartConfig = function (context, attr) {
    return context?.conf?.nav?.start?.[attr] === false;
};

export const getNavFileConfig = function (context, attr) {
    return context?.conf?.nav?.file?.[attr] === false;
};

export const getNavSparklinesConfig = function (context, attr) {
    return context?.conf?.nav?.sparklines?.[attr] === false;
};

export const getNavFormulaConfig = function (context, attr) {
    return context?.conf?.nav?.sparklines?.[attr] === false;
};

export const getDataSourceConfig = function (context, attr) {
    return context?.conf?.dataSource?.[attr] === false;
};

export const getLicense = function (context) {
    return context?.conf?.license;
};

export const getToolbar = function (context) {
    return Array.isArray(context?.conf?.toolbar) ? context?.conf?.toolbar : [];
};
