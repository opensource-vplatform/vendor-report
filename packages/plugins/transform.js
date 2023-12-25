let textFieldIndex = 0;
function getStyle(params) {
    const { row, col, dataTable } = params;
    return dataTable?.[row]?.[col]?.['style'];
}

let defaultHeight = 20;
let defaultWidth = 62;
function getRect(params) {
    const { row, col, rowsSize, columnsSize } = params;
    const height = rowsSize?.[row]?.size || defaultHeight;
    const width = columnsSize?.[col]?.size || defaultWidth;

    let y = 0;
    let rowIndex = 0;
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

function gengenFields(params) {
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
            value: dataField,
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
                isForPrompting: 'false',
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
        },
    };
}

//以表格作为参照，表格结束行作为底部的开始行
function genColumnFooterBand(params) {
    const { tables, dataTable, rowsSize } = params;
    const { row, rowCount } = tables[0];
    const endRow = row + rowCount;

    const childrens = [];

    //标记band的起始行与结束行
    let footerStartRow = null;
    let footerEndRow = null;

    Object.entries(dataTable).forEach(function ([_row_, value]) {
        const _row = Number(_row_);
        if (_row > endRow) {
            Object.entries(value).forEach(function ([
                col,
                { value, bindingPath, style },
            ]) {
                if (value || bindingPath) {
                    if (footerStartRow === null) {
                        footerStartRow = _row;
                    }
                    footerEndRow = _row;
                    const textField = genTextField({
                        ...params,
                        row: _row,
                        col: Number(col),
                        style,
                        dataField: bindingPath,
                    });
                    childrens.push(textField);
                }
            });
        }
    });

    //计算band高度
    const height = calculateHeight({
        startRow: footerStartRow,
        endRow: footerEndRow,
        rowsSize,
    });

    return {
        band: {
            props: { height, isSplitAllowed: 'false' },
            childrens,
        },
    };
}

//头部
function genPageHeader(params) {
    const band = genPageHeaderBand(params);
    return {
        pageHeader: {
            childrens: [band],
        },
    };
}

//以表格作为参照，表格开始行作为头部的结束行
function genPageHeaderBand(params) {
    const { tables, dataTable, rowsSize } = params;
    const { row } = tables[0];

    const childrens = [];

    //标记头部的起始行与结束行
    let headerStartRow = null;
    let headerEndRow = null;

    Object.entries(dataTable).forEach(function ([_row_, value]) {
        const _row = Number(_row_);
        if (_row < row) {
            Object.entries(value).forEach(function ([
                col,
                { value, bindingPath, style },
            ]) {
                if (value || bindingPath) {
                    if (headerStartRow === null) {
                        headerStartRow = _row;
                    }
                    headerEndRow = _row;
                    const textField = genTextField({
                        ...params,
                        row: _row,
                        col: Number(col),
                        style,
                        dataField: bindingPath,
                    });
                    childrens.push(textField);
                }
            });
        }
    });

    //计算band高度
    const height = calculateHeight({
        startRow: headerStartRow,
        endRow: headerEndRow,
        rowsSize,
    });

    return {
        band: {
            props: { height, isSplitAllowed: 'false' },
            childrens,
        },
    };
}

//详情
function genDetail(params) {
    const band = genDetailBand(params);
    return {
        detail: {
            childrens: [band],
        },
    };
}

function genDetailBand(params) {
    const { tables, rowsSize } = params;
    const { row, col, rowCount, bindingPath, columns } = tables[0];
    const childrens = [];
    columns.forEach(function ({ dataField }, index) {
        const _col = col + index;
        const _params = {
            ...params,
            row,
            col: _col,
            dataField,
        };
        _params.style = getStyle(_params);
        const textField = genTextField(_params);
        childrens.push(textField);
    });

    //计算band高度
    const height = calculateHeight({
        startRow: row,
        endRow: row + rowCount - 1,
        rowsSize,
    });

    return {
        band: {
            props: { height, isSplitAllowed: 'false' },
            childrens,
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
    const { row, col, style, rowsSize, columnsSize } = params;
    const rect = getRect({
        row,
        col,
        rowsSize,
        columnsSize,
    });
    /*  {
        mode: 'Transparent',
        x: '0',
        y: '0',
        width: '40',
        height: '15',
        forecolor: '#000000',
        backcolor: '#FFFFFF',
        key: 'textField-14',
        stretchType: 'RelativeToBandHeight',
    } */
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
                props[key] = style[key];
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

    /*  {
        topBorder: 'None',
        topBorderColor: '#000000',
        leftBorder: '1Point',
        leftBorderColor: '#000000',
        leftPadding: '1',
        rightBorder: 'Thin',
        rightBorderColor: '#000000',
        rightPadding: '1',
        bottomBorder: 'Thin',
        bottomBorderColor: '#000000',
        bottomPadding: '3',
    } */
    const defaultBorderColor = '#000000';
    const props = {
        //上
        topBorder: 'None',
        topBorderColor: defaultBorderColor,
        //左
        leftBorder: 'None', //
        leftBorderColor: defaultBorderColor,
        leftPadding: '1',
        //右
        rightBorder: 'None',
        rightBorderColor: defaultBorderColor,
        rightPadding: '1',
        //下
        bottomBorder: 'None',
        bottomBorderColor: defaultBorderColor,
        bottomPadding: '1',
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
        3: 'General', //水平对齐基于值类型
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
    let fontName = 'Calibri';
    let size = '14.6667';
    if (style?.font) {
        const fontArr = style?.font.split(' ');
        fontName = fontArr[1];
        if (fontArr[0].endsWith('px') || fontArr[0].endsWith('pt')) {
            size = fontArr[0].slice(0, -2);
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
    const { dataField: value } = params;
    return {
        textFieldExpression: {
            props: { class: 'java.lang.String' },
            value,
        },
    };
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
    const fields = gengenFields(params);
    const pageHeader = genPageHeader(params);
    const detail = genDetail(params);
    const columnFooter = genColumnFooter(params);

    const childrens = [
        ...parameters,
        ...fields,
        pageHeader,
        detail,
        columnFooter,
    ];
    const props = {
        name: 'rpt2018_01-1',
        columnCount: '1',
        printOrder: 'Vertical',
        orientation: 'Landscape',
        pageWidth: '842',
        pageHeight: '586',
        columnWidth: '758',
        columnSpacing: '0',
        leftMargin: '42',
        rightMargin: '42',
        topMargin: '70',
        bottomMargin: '42',
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
        { props = {}, childrens, value },
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

        if (value) {
            startTag += `<![CDATA[$F{${value}}]]>`;
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
    } = sheet;

    const jasperReport = genJasperReport({
        tables,
        dataTable,
        columnsSize,
        rowsSize,
        dsList,
    });

    const JRXML = genJRXML(jasperReport);
    console.log(jasperReport, JRXML);
    return JRXML;
}
