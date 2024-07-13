import WithLeftMenu from './hoc/WithLeftMenu';
import WithTitleContent from './hoc/WithTitleContent';
import CsvImport from './imports/CsvImport';
import ExcelImport from './imports/ExcelImport';
import WECReportImport from './imports/WECReportImport';

const WithLeftMenuComponent = WithLeftMenu([
  { code: 'excel', title: 'Excel文件', comp: ExcelImport },
  { code: 'csv', title: 'CSV文件', comp: CsvImport },
  { code: 'wec', title: 'WEC报表文件', comp: WECReportImport },
]);

const Component = WithTitleContent('导入', WithLeftMenuComponent);

function Index(props) {
  return <Component {...props}></Component>;
}

export default Index;
