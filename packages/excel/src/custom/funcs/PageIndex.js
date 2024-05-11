import { getNamespace } from '@utils/spreadUtil';

const GC = getNamespace();

function PageIndex() {
    this.name = 'TOONE.PAGEINDEX';
    this.maxArgs = 0;
    this.minArgs = 0;
}

PageIndex.prototype = new GC.Spread.CalcEngine.Functions.Function();
PageIndex.prototype.description = function () {
    return {
        description: "获取当前页",
        parameters: []
    }
}
PageIndex.prototype.evaluate = function (arg) {
    return '';
};

export default PageIndex;
