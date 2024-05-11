import { getNamespace } from '@utils/spreadUtil';

const GC = getNamespace();

function PageCount() {
    this.name = 'TOONE.PAGECOUNT';
    this.maxArgs = 0;
    this.minArgs = 0;
}

PageCount.prototype = new GC.Spread.CalcEngine.Functions.Function();
PageCount.prototype.description = function () {
    return {
        description: "获取总页数",
        parameters: []
    }
}
PageCount.prototype.evaluate = function (arg) {
    return '';
};

export default PageCount;
