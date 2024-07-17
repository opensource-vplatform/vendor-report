import { getNamespace } from '@utils/spreadUtil';

const GC = getNamespace();

function Get() {
  this.name = 'TOONE.GET';
  this.maxArgs = 3;
  this.minArgs = 1;
}

Get.prototype = new GC.Spread.CalcEngine.Functions.Function();
Get.prototype.evaluate = function (arg) {
  return '[函数(Fx)]';
};

export default Get;
