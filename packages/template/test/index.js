import template from './template.js';
import WorkBook from '../src/impls/WorkBookTemplate.js';
import Datasource from '../src/model/Datasource.js';
const datasource = new Datasource();
datasource.load(template.datas);
const workbook = new WorkBook(template.template, datasource);
const json = workbook.toJson();
console.log(JSON.stringify(json));
