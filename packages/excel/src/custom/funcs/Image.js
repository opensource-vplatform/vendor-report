import { getNamespace } from '@utils/spreadUtil';

const GC = getNamespace();

function Image() {
    this.name = 'TOONE.IMAGE';
    this.maxArgs = 10;
    this.minArgs = 1;
}

Image.prototype = new GC.Spread.CalcEngine.Functions.Function();
Image.prototype.description = function () {
    return {
        description: '图片函数',
        parameters: [],
    };
};
Image.prototype.evaluate = function (url, mode, width, height) {
    return '';
};

export default Image;
