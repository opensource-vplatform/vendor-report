import CsvExport from './exports/CsvExport';
import ExcelExport from './exports/ExcelExport';
import PdfExport from './exports/PdfExport';
import WithLeftMenu from './hoc/WithLeftMenu';
import WithTitleContent from './hoc/WithTitleContent';

const WithLeftMenuComponent = WithLeftMenu([
    { code: 'excel', title: 'Excel文件', comp: ExcelExport },
    { code: 'csv', title: 'CSV文件', comp: CsvExport },
    { code: 'pdf', title: 'PDF文件', comp: PdfExport },
]);

const Component = WithTitleContent('导出', WithLeftMenuComponent);

function Index(props) {
    return <Component {...props}></Component>;
}

export default Index;
