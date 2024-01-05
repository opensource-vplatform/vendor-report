import { testTransform } from './transform';

class JasperReportTransform{

    data = {};

    constructor(data){
        this.data = data;
    }

    transform(){
        return testTransform(this.data);
    }

}

export default JasperReportTransform;