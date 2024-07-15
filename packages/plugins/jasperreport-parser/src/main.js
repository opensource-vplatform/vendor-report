import Parser from './Parser';
//import jrxml from './test/【00表】表A.0.2-2 建设项目属性及技术经济信息表';
//import jrxml from './test/报表目录';
//import jrxml from './test/封面';
import jrxml from './test/总估算表（07样式）';

const parser = new Parser(jrxml);
const table = parser.parse();
console.log(JSON.stringify(table));