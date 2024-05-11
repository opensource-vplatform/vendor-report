import { getNamespace } from '@utils/spreadUtil';

const GC = getNamespace();

function Get() {
    this.name = 'TOONE.GET';
    this.maxArgs = 2;
    this.minArgs = 1;
}

Get.prototype = new GC.Spread.CalcEngine.Functions.Function();
Get.prototype.evaluate = function (arg) {
    /*const sheet = arg?.source?.getSheet();
    const args = arg?.Whe?.arguments;
    if(args&&sheet){
        if(args.length==1){
            const fieldCode = args[0].value;
            const datasource = sheet.getDataSource();
            if(datasource){
                return datasource.getValue(fieldCode);
            }
        }else{
            const tableCode = args[0].value;
            const fieldCode = args[1].value;
            const datasource = sheet.getDataSource();
            if(datasource){
                const datas = datasource.getValue(tableCode);
                if(datas&&datas.length>0){
                    const data = datas[0];
                    return data[fieldCode];
                }
            }
        }
    }*/
    return '';
};

export default Get;
