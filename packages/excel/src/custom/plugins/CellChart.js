const PLUGIN_TYPE = 'cellChart';

const paintCell = function (context, value, x, y, w, h, options) {
    const {sheet,row,col} = options;
    //....
    return {break:true}
};

export default { paintCell, PLUGIN_TYPE };
