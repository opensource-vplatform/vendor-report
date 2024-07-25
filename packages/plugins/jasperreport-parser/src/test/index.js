import JRXMLParser from '../JRXMLParser';
import A032 from './units/【21-2表】表A.0.3-2 分项工程预算表';
import { equals } from './utils';

//import cover from './units/封面';
//import zgsb from './units/总估算表（07样式）';
//import catalog from './units/报表目录';

const units = [/*A022,A027*/,A032/*,catalog,cover,zgsb*/];

export const testUnits = function(){
    const promises = units.map((unit)=>{
        return new Promise((resolve,reject)=>{
            const {jrxml,result,name} = unit;
            try{
                const parser = new JRXMLParser(jrxml);
                parser.parse().then((json) => {
                    if(!equals(json,result)){
                        console.log(json);
                        console.log(JSON.stringify(json));
                        reject(new Error(`场景：${name}，转换失败！`));
                    }else{
                        resolve();
                    }
                });
            }catch(e){
                reject(e)
            }
        });
    });
    Promise.all(promises).then(()=>{
        console.log("本地场景验证通过！");
    }).catch(console.err);
}