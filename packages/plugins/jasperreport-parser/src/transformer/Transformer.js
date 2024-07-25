import Sheet from './model/Sheet';
import Spread from './model/Spread';

class Transformer{

    constructor(report){
        this.report = report;
    }

    transform(){
        return new Promise((resolve,reject)=>{
            try{
                const spread = new Spread();
                const sheet = new Sheet(this.report);
                spread.appendSheet(sheet);
                resolve(spread);
            }catch(e){
                reject(e);
            }
        });
    }

}

export default Transformer;