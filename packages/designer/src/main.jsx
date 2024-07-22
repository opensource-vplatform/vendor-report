import ReportDesigner from './ReportDesigner';
import config from './test/index';

//import config from './test/wecost-integration';

const designer = new ReportDesigner(config);
designer.mount(document.getElementById('app'));
window.designer = designer;
