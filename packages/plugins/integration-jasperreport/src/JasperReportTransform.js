import { testTransform } from './transform';

class JasperReportTransform{

    data = {};

    ctx = {};

    constructor(data,ctx){
        this.data = data;
        this.ctx = ctx;
    }

    transform(){
        return testTransform({spreadJsonData:this.data,dsList:this.ctx.dsList});
    }

}

export default JasperReportTransform;