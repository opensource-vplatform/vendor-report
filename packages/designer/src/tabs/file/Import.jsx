import WithLeftMenu from './hoc/WithLeftMenu';
import WithTitleContent from './hoc/WithTitleContent';
import CsvImport from './imports/CsvImport';
import ExcelImport from './imports/ExcelImport';
import JasperReportImport from './imports/JasperReportImport';

const WithLeftMenuComponent = WithLeftMenu([
    { code: 'excel', title: 'Excel文件', comp: ExcelImport },
    { code: 'csv', title: 'CSV文件', comp: CsvImport },
    { code: 'jasperreport',title: 'JasperReport文件', comp: JasperReportImport},
]);

const Component = WithTitleContent('导入', WithLeftMenuComponent);

function Index(props) {
    return <Component {...props}></Component>;
}

export default Index;
