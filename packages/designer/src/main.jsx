import ReportDesigner from './ReportDesigner';
import config from './test/index';

const designer = new ReportDesigner(config);
designer.mount(document.getElementById('app'));
