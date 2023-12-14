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
        bandRow = false,
        bandColumn = false,
        highlightFirstColumn = false,
        highlightLastColumn = false,
        filterButtonVisible = false
        footerDropDownList = false;
    if (table) {
        showHeader = table.showHeader();
        showFooter = table.showFooter();
        footerDropDownList = table.useFooterDropDownList();
        bandRow = table.bandRows();
        bandColumn = table.bandColumns();
        const style = table.style();
        highlightFirstColumn = style.highlightFirstColumnStyle();
        highlightLastColumn = style.highlightLastColumnStyle();
        filterButtonVisible = table.filterButtonVisible();
    }
    return { showHeader, showFooter,bandRow,bandColumn,highlightFirstColumn,highlightLastColumn,filterButtonVisible,footerDropDownList };
}

export function setTableStyles(params) {
    const { spread, showHeader,bandColumn,bandRow,highlightFirstColumn,highlightLastColumn, showFooter,filterButtonVisible,footerDropDownList } = params;
    withBatchUpdate(spread, (sheet) => {
        const table = getTable(sheet);
        if (table) {
            table.showHeader(showHeader);
            table.showFooter(showFooter);
            table.useFooterDropDownList(footerDropDownList);
            table.bandColumns(bandColumn);
            table.bandRows(bandRow);
            const style = table.style();
            style.highlightFirstColumnStyle(highlightFirstColumn);
            style.highlightLastColumnStyle(highlightLastColumn);
            table.style(style);
            const {colCount} = table.range();
            for(let i=0,l=colCount;i<l;i++){
                table.filterButtonVisible(i,filterButtonVisible);
            }
        }
    });
}
