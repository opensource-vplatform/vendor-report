let textFieldIndex = 0;
let defaultHeight = 20;
let defaultWidth = 62;

function getStyle(params) {
    const { row, col, dataTable } = params;
    const baseStyle = dataTable?.[row]?.[col]?.['style'] || {};
    const { rowCount, colCount } = getCellRange(params);

    //如果单元格纵向合并，则获取合并区域的末尾行单元格下边框的样式作为合并区域的下边框样式
    if (rowCount > 1) {
        const bottomStyle =
            dataTable?.[row + rowCount - 1]?.[col]?.['style'] || {};
        if (bottomStyle.hasOwnProperty('borderBottom')) {
            baseStyle.borderBottom = bottomStyle.borderBottom;
        }
    }

    //如果单元格纵向合并，则获取合并区域的末尾列单元格右边框的样式作为合并区域的右边框样式
    if (colCount > 1) {
        const rightStyle =
            dataTable?.[row]?.[col + colCount - 1]?.['style'] || {};
        if (rightStyle.hasOwnProperty('borderRight')) {
            baseStyle.borderRight = rightStyle.borderRight;
        }
    }
    return { ...baseStyle };
}

function getCellRange(params) {
    const { row, col, spans = [] } = params;
    return (
        spans.find(function ({ row: _row, col: _col }) {
            return _row === row && _col === col;
        }) || {
            row,
            col,
            rowCount: 1,
            colCount: 1,
        }
    );
}

//获取单元格宽高
function getExtent(params) {
    const { rowsSize, columnsSize } = params;

    const { row, col, rowCount, colCount } = getCellRange(params);

    //单元格高度
    let height = 0;
    let startRow = row;
    let endRow = row + rowCount;
    while (startRow < endRow) {
        height += rowsSize?.[startRow++]?.size || defaultHeight;
    }

    //单元格宽度
    let width = 0;
    let startCol = col;
    let endCol = col + colCount;
    while (startCol < endCol) {
        width += columnsSize?.[startCol++]?.size || defaultWidth;
    }

    return {
        height,
        width,
    };
}

function getRect(params) {
    const { row, col, rowsSize, columnsSize, boxStartRow = 0 } = params;

    const { height, width } = getExtent(params);

    let y = 0;
    let rowIndex = boxStartRow;
    while (rowIndex < row) {
        y += rowsSize?.[rowIndex++]?.size || defaultHeight;
    }

    let x = 0;
    let colIndex = 0;
    while (colIndex < col) {
        x += columnsSize?.[colIndex++]?.size || defaultWidth;
    }

    return {
        height,
        width,
        x,
        y,
    };
}

function calculateHeight(params) {
    const { startRow, endRow, rowsSize } = params;

    let height = 15;
    if (startRow !== null) {
        let index = 0;
        height = 0;
        let rowIndex = startRow + index;
        while (rowIndex <= endRow) {
            height += rowsSize[rowIndex++]?.size || defaultHeight;
        }
    }
    return height;
}

function genFields(params) {
    const fields = [];
    const { tables } = params;

    const { bindingPath, columns } = tables[0];

    columns.forEach(function ({ dataField }) {
        const _params = {
            ...params,
            bindingPath,
            dataField,
        };
        const field = genField(_params);
        fields.push(field);
    });

    return fields;
}

const typeMaps = {
    text: 'java.lang.String',
    integer: 'java.lang.Integer',
    decimals: 'java.lang.Double',
};

function getType(type) {
    return typeMaps[type] || 'java.lang.String';
}

function genField(params) {
    const { dataField, dsList, bindingPath } = params;
    const entity = dsList.find(function (item) {
        return item.code === bindingPath;
    });
    const entityField =
        entity.children.find(function (item) {
            return item.code === dataField;
        }) || {};
    const fieldDescription = genFieldDescription({
        ...params,
        dataField: entityField.code,
    });
    return {
        field: {
            props: {
                name: `${dataField}`,
                class: getType(entityField.type),
            },
            childrens: [fieldDescription],
        },
    };
}

function genFieldDescription(params) {
    const { dataField } = params;
    return {
        fieldDescription: {
            props: {},
            staticValue: dataField,
        },
    };
}

function genParameters(params) {
    const { dsList } = params;
    const parameters = [];
    dsList.forEach(function (item) {
        if (item?.type !== 'table') {
            const parameter = genParameter({
                ...params,
                dsListItem: item,
            });
            parameters.push(parameter);
        }
    });

    return parameters;
}

function genParameter(params) {
    const {
        dsListItem: { code, type },
    } = params;
    return {
        parameter: {
            props: {
                name: code,
                isForPrompting: true,
                class: getType(type),
            },
        },
    };
}

function genBand(params) {
    return {
        band: {
            props: { height: '15', isSplitAllowed: 'true' },
        },
    };
}

function genEmpty(params) {
    const band = genBand(params);
    return {
        [params.tagName]: {
            props: {},
            childrens: [band],
        },
    };
}

function genSummary(params) {
    return genEmpty({ ...params, tagName: 'summary' });
}

function genPageFooter(params) {
    return genEmpty({ ...params, tagName: 'pageFooter' });
}

function genColumnHeader(params) {
    return genEmpty({ ...params, tagName: 'columnHeader' });
}

function genTitle(params) {
    return genEmpty({ ...params, tagName: 'title' });
}

function genBackground(params) {
    return genEmpty({ ...params, tagName: 'background' });
}

function genGroup(params) {
    const groupExpression = genGroupExpression(params);
    const groupHeader = genGroupHeader(params);
    const groupFooter = genGroupFooter(params);
    return {
        group: {
            name: 'top',
            isStartNewPage: 'true',
            isReprintHeaderOnEachPage: 'true',
        },
        childrens: [groupExpression, groupHeader, groupFooter],
    };
}

function genGroupExpression(params) {
    return {
        groupExpression: {
            props: {},
            value: '',
        },
    };
}

function genGroupHeader(params) {}

function genGroupFooter() {
    return genEmpty({ ...params, tagName: 'groupFooter' });
}

function genColumnFooter(params) {
    const band = genColumnFooterBand(params);
    return {
        columnFooter: {
            childrens: [band],
            rect: band.band.bandRect,
        },
    };
}

//适用头部和尾部
function _genBand(params) {
    const { dataTable, rowsSize, condition } = params;
    const childrens = [];

    //标记band的起始行与结束行
    let boxStartRow = null;
    let boxEndRow = null;

    //标记band的其实列与结束列
    let boxEndCol = null;
    let boxStartCol = null;

    Object.entries(dataTable).forEach(function ([_row_, value]) {
        const _row = Number(_row_);
        if (condition(_row)) {
            Object.entries(value).forEach(function ([
                col,
                { value, bindingPath, style },
            ]) {
                if (value || bindingPath) {
                    const _col = Number(col);

                    //起始行
                    if (boxStartRow === null) {
                        boxStartRow = _row;
                    }

                    //结束行
                    boxEndRow = _row;

                    //结束列
                    if (boxEndCol === null) {
                        boxEndCol = _col;
                    }
                    if (_col > boxEndCol) {
                        boxEndCol = _col;
                    }

                    //起始列
                    if (boxStartCol === null) {
                        boxStartCol = _col;
                    }
                    if (_col < boxStartCol) {
                        boxStartCol = _col;
                    }

                    const _params = {
                        ...params,
                        row: _row,
                        col: _col,
                        dataField: bindingPath,
                        staticValue: value,
                        boxStartRow,
                    };

                    _params.style = getStyle(_params);

                    const textField = genTextField(_params);
                    childrens.push(textField);
                }
            });
        }
    });

    //计算band高度
    const height = calculateHeight({
        startRow: boxStartRow,
        endRow: boxEndRow,
        rowsSize,
    });

    return {
        band: {
            props: { height, isSplitAllowed: 'false' },
            childrens,
            bandRect: {
                startRow: boxStartRow,
                startCol: boxStartCol,
                endRow: boxEndRow,
                endCol: boxEndCol,
            },
        },
    };
}

//以表格作为参照，表格结束行作为底部的开始行
function genColumnFooterBand(params) {
    const { tables } = params;
    const { row, rowCount } = tables[0];
    const endRow = row + rowCount - 1;
    function condition(row) {
        return row > endRow;
    }
    debugger;
    return _genBand({ ...params, condition });
}

//头部
function genPageHeader(params) {
    const band = genPageHeaderBand(params);
    return {
        pageHeader: {
            childrens: [band],
            rect: band.band.bandRect,
        },
    };
}

//以表格作为参照，表格开始行作为头部的结束行
function genPageHeaderBand(params) {
    const { tables } = params;
    const { row: endRow } = tables[0];
    function condition(row) {
        return row < endRow;
    }

    return _genBand({ ...params, condition });
}

//详情
function genDetail(params) {
    const band = genDetailBand(params);
    return {
        detail: {
            childrens: [band],
            rect: band.band.bandRect,
        },
    };
}

function genDetailBand(params) {
    const { tables, rowsSize } = params;
    const { row, col, rowCount, colCount, bindingPath, columns } = tables[0];
    const childrens = [];
    columns.forEach(function ({ dataField }, index) {
        const _col = col + index;
        const _params = {
            ...params,
            row,
            col: _col,
            dataField,
            boxStartRow: row,
            type: 'F',
        };
        _params.style = getStyle(_params);
        const textField = genTextField(_params);
        childrens.push(textField);
    });

    //计算band高度
    const height = calculateHeight({
        startRow: row,
        endRow: row,
        //endRow: row + rowCount - 1,
        rowsSize,
    });

    return {
        band: {
            props: { height, isSplitAllowed: 'false' },
            childrens,
            bandRect: {
                startRow: row,
                startCol: col,
                endRow: row + rowCount - 1,
                endCol: col + colCount - 1,
            },
        },
    };
}

function genTextField(params) {
    const reportElement = genReportElement(params);
    const box = genBox(params);
    const textElement = genTextElement(params);
    const textFieldExpression = genTextFieldExpression(params);
    return {
        textField: {
            props: {
                isStretchWithOverflow: 'true',
                pattern: '',
                isBlankWhenNull: 'true',
                evaluationTime: 'Now',
                hyperlinkType: 'None',
                hyperlinkTarget: 'Self',
            },
            childrens: [reportElement, box, textElement, textFieldExpression],
        },
    };
}

function genReportElement(params) {
    const { style } = params;
    const rect = getRect(params);
    const props = {
        mode: 'Transparent',
        ...rect,
        key: `textField-${++textFieldIndex}`,
        stretchType: 'RelativeToBandHeight',
    };
    if (style) {
        const keys = {
            backColor: true,
            foreColor: true,
        };

        Object.keys(keys).forEach(function (key) {
            if (style[key]) {
                props[key.toLowerCase()] = style[key];
            }
        });
    }
    return {
        reportElement: {
            props,
        },
    };
}

function genBox(params) {
    const { style } = params;

    //边框相关默认值
    const defaultBorderColor = '#000000';
    const defaultBorder = 'None';
    const defaultPadding = '1';

    const props = {
        //上
        topBorder: defaultBorder,
        topBorderColor: defaultBorderColor,
        //左
        leftBorder: defaultBorder, //
        leftBorderColor: defaultBorderColor,
        leftPadding: defaultPadding,
        //右
        rightBorder: defaultBorder,
        rightBorderColor: defaultBorderColor,
        rightPadding: defaultPadding,
        //下
        bottomBorder: defaultBorder,
        bottomBorderColor: defaultBorderColor,
        bottomPadding: defaultPadding,
    };

    //边框的线条样式
    const borderStyle = {
        0: 'Empty', //没有样式的边框线
        1: 'Thin', //带有实线的边框线
        2: 'Medium', //用实线表示中边框线
        3: 'Dashed', //用虚线表示边框线
        4: 'Dotted', //带点的边框
        5: 'Thick', //用实线表示粗边框线
        6: 'Double', //双边框线
        7: 'Hair', //用点组成的边框线
        8: 'MediumDashed', //带虚线的中等边框线
        9: 'DashDot', //带点划线的边框线
        10: 'MediumDashDot', //带点划线的中等边框线
        11: 'DashDotDot', //带点划线的边框线
        12: 'MediumDashDotDot', //带点划线的中等边框线
        13: 'SlantedDashDot', //带点划线的倾斜边框线
    };

    if (style) {
        //jasper报表属性与spread样式属性映射
        const keys = {
            borderTop: { id: 'topBorder', colorKey: 'topBorderColor' },
            borderRight: { id: 'rightBorder', colorKey: 'rightBorderColor' },
            borderBottom: { id: 'bottomBorder', colorKey: 'bottomBorderColor' },
            borderLeft: { id: 'leftBorder', colorKey: 'leftBorderColor' },
        };

        Object.entries(keys).forEach(function ([key, { id, colorKey }]) {
            const value = style[key];
            if (value) {
                props[id] = borderStyle[value.style];
                props[colorKey] = value.color || defaultBorderColor;
            }
        });
    }

    return {
        box: {
            props,
        },
    };
}

function genTextElement(params) {
    const { style } = params;
    const verticalAlign = {
        0: 'Top', //单元格内容是顶对齐的
        1: 'Middle', //单元格内容居中
        2: 'Bottom', //单元格内容是底部对齐的
    };
    const defaultVerticalAlign = 'Top';

    const horizontalAlign = {
        0: 'Left', //单元格内容左对齐
        1: 'Center', //单元格内容居中
        2: 'Right', //单元格内容右对齐
        3: 'Left', //水平对齐基于值类型 不支持General
        4: 'CenterContinuous', //单元格内容跨列居中
    };
    const defaultHorizonAlign = 'Left';

    const props = {
        textAlignment: horizontalAlign[style?.hAlign] || defaultHorizonAlign,
        verticalAlignment: verticalAlign[style?.vAlign] || defaultVerticalAlign,
        rotation: 'None',
        lineSpacing: 'Single',
    };

    const font = genFont(params);
    return {
        textElement: {
            props,
            childrens: [font],
        },
    };
}

function genFont(params) {
    const { style } = params;
    let fontName = 'Calibri'; //中文有异常
    //let size = '14.6667';//不支持的字体大小
    let size = '11';
    const font = style?.font;
    if (font) {
        //字体大小
        const fontSizeReg = /\b(?<size>\d+)\.?\d*?(?:pt|px)/;
        size = font.match(fontSizeReg)?.groups?.size || '1';

        //字体
        const match = font.match(/"([^"]+)"/) || font.match(/(\S+)$/);
        if (match) {
            fontName = match[1];
        }
    }
    const props = {
        fontName,
        pdfFontName: 'STSong-Light',
        size,
        isPdfEmbedded: 'true',
        pdfEncoding: 'UniGB-UCS2-H',
    };
    return {
        font: {
            props,
        },
    };
}

function genTextFieldExpression(params) {
    const { dataField, staticValue, type } = params;
    return {
        textFieldExpression: {
            props: { class: 'java.lang.String' },
            dataField,
            staticValue,
            type,
        },
    };
}

//报表宽高，边距等
function getJasperReportRect(params) {
    const { columnsSize, pageHeader, detail, columnFooter } = params;

    const pageHeaderRect = pageHeader.pageHeader.rect;
    const detailRect = detail.detail.rect;
    const columnFooterRect = columnFooter.columnFooter.rect;
    const leftMargin = 42;
    const rightMargin = 42;
    const topMargin = 42;
    const bottomMargin = 42;

    const { endCol } = [pageHeaderRect, detailRect, columnFooterRect].reduce(
        function (pre, { endRow, endCol }) {
            if (endCol && endCol > pre.endCol) {
                pre.endCol = endCol;
            }

            if (endRow && endRow > pre.endRow) {
                pre.endRow = endRow;
            }

            return pre;
        },
        {
            startRow: 0,
            startCol: 0,
            endRow: 0,
            endCol: 0,
        }
    );

    let colIndex = 0;
    let pageWidth = leftMargin + rightMargin;

    while (colIndex <= endCol) {
        pageWidth += columnsSize?.[colIndex++]?.size || defaultWidth;
    }

    return {
        pageWidth,
        topMargin,
        rightMargin,
        bottomMargin,
        leftMargin,
    };
}

//报表名称
let nameIndex = 1;
function genJasperReportName() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const d = now.getDate();
    let name = `报表${year}${month}${d}${nameIndex
        .toString()
        .padStart(4, '0')}`;
    nameIndex++;
    return name;
}

function genJasperReport(params) {
    /* const background = genBackground(params);
    const title = genTitle(params);
    const pageHeader = genPageHeader(params);
    const columnHeader = genColumnHeader(params);
    const detail = genDetail(params);
    const columnFooter = genColumnFooter(params);
    const pageFooter = genPageFooter(params);
    const summary = genSummary(params);

    const childrens = [
        background,
        title,
        pageHeader,
        columnHeader,
        detail,
        columnFooter,
        pageFooter,
        summary,
    ]; */
    const parameters = genParameters(params);
    const fields = genFields(params);
    const pageHeader = genPageHeader(params);
    const detail = genDetail(params);
    const columnFooter = genColumnFooter(params);

    const { pageWidth, topMargin, rightMargin, bottomMargin, leftMargin } =
        getJasperReportRect({
            columnsSize: params.columnsSize,
            pageHeader,
            detail,
            columnFooter,
        });

    const name = genJasperReportName();

    const childrens = [
        ...parameters,
        ...fields,
        pageHeader,
        detail,
        columnFooter,
    ];
    const props = {
        name,
        columnCount: '1',
        printOrder: 'Vertical',
        orientation: 'Landscape',
        pageWidth,
        /* pageHeight: '1586', */
        /*  columnWidth: '1758', */
        columnSpacing: '0',
        leftMargin,
        rightMargin,
        topMargin,
        bottomMargin,
        whenNoDataType: 'AllSectionsNoDetail',
        isTitleNewPage: 'false',
        isSummaryNewPage: 'false',
    };
    return {
        jasperReport: {
            props,
            childrens,
        },
    };
}

function genJRXML(jsonData) {
    let jrxml = '';
    Object.entries(jsonData).forEach(function ([
        tagName,
        { props = {}, childrens, dataField, staticValue, type = 'P' },
    ]) {
        //开始标签
        let startTag = Object.entries(props).reduce(function (
            tagStr,
            [key, value]
        ) {
            tagStr += ` ${key}="${value}"`;
            return tagStr;
        }, `<${tagName}`);

        startTag += ` >`;

        //子标签
        if (Array.isArray(childrens) && childrens.length > 0) {
            childrens.forEach(function (child) {
                startTag += `${genJRXML(child)}`;
            });
        }

        if (dataField) {
            startTag += `<![CDATA[$${type}{${dataField}}]]>`;
        } else if (staticValue) {
            startTag += `<![CDATA["${staticValue}"]]>`;
        }

        //结束标签
        const endTag = `</${tagName}>`;
        jrxml = `${startTag}${endTag}`;
    });
    return jrxml;
}

export function testTransform(params) {
    const { spreadJsonData, dsList } = params;
    const sheets = spreadJsonData.sheets;
    const sheetNames = Object.keys(spreadJsonData.sheets);
    const sheet = sheets[sheetNames[0]];
    const {
        tables,
        columns: columnsSize,
        rows: rowsSize,
        data: { dataTable },
        spans,
    } = sheet;

    const jasperReport = genJasperReport({
        tables,
        dataTable,
        columnsSize,
        rowsSize,
        dsList,
        spans,
    });

    const JRXML = genJRXML(jasperReport);
    console.log(jasperReport, JRXML);
    return JRXML;
}
