import config from './data/config.json';
import data from './data/data.json';
/**
 * 此文件存放二次开发和本地预览服务集成代码，
 * 修改会影响二次开发代码与原有报表模板兼容性，
 * 请不要修改。
 */
import dev from './index';

const inst = dev();
const report = new TOONE.Report.Preview({
    dev: inst,
    dataSource: data,
    json: config,
});
let dom = document.getElementById('app');
if (!dom) {
    dom = document.createElement('div');
    dom.id = 'app';
    document.body.appendChild(dom);
}
report.mount(dom);
