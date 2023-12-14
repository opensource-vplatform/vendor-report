import { withBatchUpdate } from './spreadUtil';

const getTable = function (sheet) {
    return sheet.tables.find(
        sheet.getActiveRowIndex(),
        sheet.getActiveColumnIndex()
    );
};

export function parseTable(sheet) {
    const table = getTable(sheet);
    let showHeader = true,
        showFooter = false,
        filterButtonVisible = false;
    if (table) {
        showHeader = table.showHeader();
        showFooter = table.showFooter();
        filterButtonVisible = table.filterButtonVisible();
    }
    return { showHeader, showFooter,filterButtonVisible };
}

export function setTableStyles(params) {
    const { spread, showHeader, showFooter,filterButtonVisible } = params;
    withBatchUpdate(spread, (sheet) => {
        const table = getTable(sheet);
        if (table) {
            table.showHeader(showHeader);
            table.showFooter(showFooter);
            const {colCount} = table.range();
            for(let i=0,l=colCount;i<l;i++){
                table.filterButtonVisible(i,filterButtonVisible);
            }
        }
    });
}
