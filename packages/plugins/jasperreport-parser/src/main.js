import Parser from './Parser';
import jrxml from './test/报表目录';

const parser = new Parser(jrxml);
const table = parser.parse();
console.log(table);