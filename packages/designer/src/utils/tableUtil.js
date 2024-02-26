import {
  getNamespace,
  withBatchUpdate,
} from './spreadUtil';

const GC = getNamespace();

//设置角标
function setCornerMark(params) {
    const {
        sheet,
        row = 0,
        col = 0,
        position = 1,
        color = 'red',
        size = 8,
        setType = 'toggle' /* toggle | onlyAdd | onlyRemove */,
    } = params;
    let style = sheet.getStyle(row, col);
    if (!style) {
        style = new GC.Spread.Sheets.Style();
    }
    if (
        style?.decoration?.cornerFold?.markType === 'table' &&
        (setType === 'toggle' || setType === 'onlyRemove')
    ) {
        delete style.decoration.cornerFold;
    } else if (setType === 'toggle' || setType === 'onlyAdd') {
        style.decoration = {
            cornerFold: {
                size,
                position,
                color,
                markType: 'table',
            },
        };
    }
    sheet.setStyle(row, col, style);
}

export function setTableCornerMarks(params) {
    const {
        sheet,
        row,
        col,
        rowCount,
        colCount,
        setType = 'toggle' /* toggle | onlyAdd | onlyRemove */,
    } = params;

    const startRow = row;
    const startCol = col;
    const endRow = row + rowCount - 1;
    const endCol = col + colCount - 1;
    const cornerMarkColor = 'blue';
    const cornerMarkSize = 8;

    //左上角
    setCornerMark({
        sheet,
        row: startRow,
        col: startCol,
        color: cornerMarkColor,
        position: 1,
        size: cornerMarkSize,
        setType,
    });

    //右上角
    setCornerMark({
        sheet,
        row: startRow,
        col: endCol,
        color: cornerMarkColor,
        position: 2,
        size: cornerMarkSize,
        setType,
    });

    //左下角
    setCornerMark({
        sheet,
        row: endRow,
        col: startCol,
        color: cornerMarkColor,
        position: 4,
        size: cornerMarkSize,
        setType,
    });

    //右下角
    setCornerMark({
        sheet,
        row: endRow,
        col: endCol,
        color: cornerMarkColor,
        position: 8,
        size: cornerMarkSize,
        setType,
    });
}

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
    return {
        showHeader,
        showFooter,
        bandRow,
        bandColumn,
        highlightFirstColumn,
        highlightLastColumn,
        filterButtonVisible,
        footerDropDownList,
    };
}

function getTableStyle(styleName) {
    if (styleName) {
        const GC = getNamespace();
        return GC.Spread.Sheets.Tables.TableThemes[styleName.toLowerCase()];
    }
    return null;
}

export function setTableStyleName(params) {
    const { spread, styleName } = params;
    setTableStyle(spread, styleName);
}

export function setTableStyle(spread, style) {
    style = typeof style == 'string' ? getTableStyle(style) : style;
    if (!style) return;
    withBatchUpdate(spread, (sheet) => {
        const table = getTable(sheet);
        if (table) {
            table.style(style);
        }
    });
}

export function setTableStyles(params) {
    const {
        spread,
        showHeader,
        bandColumn,
        bandRow,
        highlightFirstColumn,
        highlightLastColumn,
        showFooter,
        filterButtonVisible,
        footerDropDownList,
    } = params;
    withBatchUpdate(spread, (sheet) => {
        const table = getTable(sheet);
        if (table) {
            //移除表格区域样式
            const oldRange = table.range();
            setTableCornerMarks({
                ...oldRange,
                sheet,
                setType: 'onlyRemove',
            });

            table.showHeader(showHeader);
            table.showFooter(showFooter);
            debugger;
            table.useFooterDropDownList(footerDropDownList);
            table.bandColumns(bandColumn);
            table.bandRows(bandRow);
            table.highlightFirstColumn(highlightFirstColumn);
            table.highlightLastColumn(highlightLastColumn);
            const { colCount } = table.range();
            for (let i = 0, l = colCount; i < l; i++) {
                table.filterButtonVisible(i, filterButtonVisible);
            }

            //添加表格区域样式
            const newRange = table.range();
            setTableCornerMarks({
                ...newRange,
                sheet,
                setType: 'onlyAdd',
            });
        }
    });
}
