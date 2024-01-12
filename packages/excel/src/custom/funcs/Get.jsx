import { getNamespace } from '@utils/spreadUtil';

const GC = getNamespace();

function Get() {
    this.name = 'TOONE.GET';
    this.maxArgs = 1;
    this.minArgs = 1;
}

Get.prototype = new GC.Spread.CalcEngine.Functions.Function();
Get.prototype.isContextSensitive = function(){
    return true;
}
Get.prototype.evaluate = function (arg) {
    const sheet = arg?.source?.getSheet();
    const args = arg?.WK?.arguments;
    if(args&&args.length>0&&sheet){
        const fieldCode = args[0].value;
        const datasource = sheet.getDataSource();
        if(datasource){
            return datasource.getValue(fieldCode);
        }
    }
    return '#VALUE!';
};

export default Get;
