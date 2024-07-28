import { clone } from '../../util/ObjectUtil';
import { getSpreadJson } from '../metadata/Spread';

class Spread{

    sheets = [];

    constructor(){
        this.json = clone(getSpreadJson());
    }

    appendSheet(sheet){
        this.sheets.push(sheet);
    }

    toJSON(){
        const sheets = this.json.sheets;
        this.sheets.forEach(sheet=>{
            const sheetJson = sheet.toJSON();
            sheets[sheetJson.name] = sheetJson;
        });
        return this.json;
    }

}

export default Spread;