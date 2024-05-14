import { getNamespace } from '@utils/spreadUtil';

const GC = getNamespace();

function GroupName() {
    this.name = 'TOONE.GROUPNAME';
    this.maxArgs = 0;
    this.minArgs = 0;
}

GroupName.prototype = new GC.Spread.CalcEngine.Functions.Function();
GroupName.prototype.description = function () {
    return {
        description: '获取分组名称',
        parameters: [],
    };
};
GroupName.prototype.evaluate = function (arg) {
    return '';
};

export default GroupName;
