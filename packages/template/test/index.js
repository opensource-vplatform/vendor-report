import WorkBookTemplate from '../src/impls/WorkBookTemplate';
import Datasource from '../src/model/Datasource';
import testUnits from './unit/index';

const test = function(unit){
    const {name,template,datas,test} = unit;
    const datasource = new Datasource();
    datasource.load(datas);
    const workbookTemplate = new WorkBookTemplate(template,datasource);
    const json = workbookTemplate.toJson();
    const str = JSON.stringify(json);
    const testStr = JSON.stringify(test);
    if(str!==testStr){
        throw Error("测试用例出现错误，测试场景："+name)
    }
}

testUnits.forEach(unit=>{
    test(unit);
});
