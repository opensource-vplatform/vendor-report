import Dialog from '../../component/dialog/Index';
import WithLeftMenu from './hoc/WithLeftMenu';
import WithTitleContent from './hoc/WithTitleContent';

function ExcelImport() {
    return <Dialog title="test" width={500} height={500}></Dialog>
}

function CsvImport(){

}

const WithLeftMenuComponent = WithLeftMenu([
    { code: 'excel', title: 'Excel文件',comp:<ExcelImport></ExcelImport> },
    { code: 'csv', title: 'CSV文件',comp:<CsvImport></CsvImport> },
]);

const Component = WithTitleContent("导入",WithLeftMenuComponent);

function Index() {
    return (
        <Component></Component>
    );
}

export default Index;
