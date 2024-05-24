import { getNamespace } from '@utils/spreadUtil';

const GC = getNamespace();

function Image() {
    this.name = 'TOONE.IMAGE';
    this.maxArgs = 1;
    this.minArgs = 1;
}

Image.prototype = new GC.Spread.CalcEngine.Functions.Function();
Image.prototype.description = function () {
    return {
        description: "图片函数",
        parameters: []
    }
}
Image.prototype.evaluate = function (arg) {
    debugger;
    return '[函数(Fx)]';
};

export default Image;
