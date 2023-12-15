import GC from '@grapecity/spread-sheets';

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
        filterButtonVisible = false,
        footerDropDownList = false;
    if (table) {
        showHeader = table.showHeader();
        showFooter = table.showFooter();
        footerDropDownList = table.useFooterDropDownList();
        bandRow = table.bandRows();
        bandColumn = table.bandColumns();
        //const style = table.style();
        highlightFirstColumn = table.highlightFirstColumn();
        highlightLastColumn = table.highlightLastColumn();
        filterButtonVisible = table.filterButtonVisible();
    }
    return { showHeader, showFooter,bandRow,bandColumn,highlightFirstColumn,highlightLastColumn,filterButtonVisible,footerDropDownList };
}

function getTableStyle(styleName) {
    if (styleName) {
        return GC.Spread.Sheets.Tables.TableThemes[styleName.toLowerCase()];
    }
    return null;
}

export function setTableStyleName(params){
    const { spread, styleName } = params;
    withBatchUpdate(spread, (sheet) => {
        const table = getTable(sheet);
        if (table) {
            table.style(getTableStyle(styleName));
        }
    });
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
            table.highlightFirstColumn(highlightFirstColumn);
            table.highlightLastColumn(highlightLastColumn);
            const {colCount} = table.range();
            for(let i=0,l=colCount;i<l;i++){
                table.filterButtonVisible(i,filterButtonVisible);
            }
        }
    });
}
