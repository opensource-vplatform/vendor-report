import { testTransform } from './transform';

class JasperReportTransform {
    data = {};

    //ctx = {};

    constructor(data /* ,ctx */) {
        this.data = data;
        //this.ctx = ctx;
    }

    transform() {
        return testTransform({
            spreadJsonData: this?.data?.reportJson,
            dsList: this?.data?.context?.datasourceSlice?.finalDsList,
        });
    }
}

export default JasperReportTransform;
