import { getNamespace } from '@utils/spreadUtil';

const GC = getNamespace();

function Index() {
  this.name = 'TOONE.SEQ';
  this.maxArgs = 1;
  this.minArgs = 0;
}

Index.prototype = new GC.Spread.CalcEngine.Functions.Function();
Index.prototype.description = function () {
  return {
    description:
      '数据集序列号。列如当前页数据集序列号：TOONE.SEQ();全局数据集序列号：TOONE.SEQ("g")',
    parameters: [
      {
        name: '类型',
        optional: true,
      },
    ],
  };
};
Index.prototype.evaluate = function (arg) {
  return '[函数(Fx)]';
};

export default Index;
