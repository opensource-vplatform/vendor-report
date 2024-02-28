import resourceManager from 'resource-manager-js';

import {
  isNullOrUndef,
  isUndefined,
} from './objectUtil';
import {
  getNamespace,
  withBatchUpdate,
} from './spreadUtil';

const getShapes = function () {
    const GC = getNamespace();
    return GC.Spread.Sheets.Shapes;
};

const toAutoShape = function (type) {
    const { AutoShapeType } = getShapes();
    return {
        type: AutoShapeType[type],
    };
};

const handlers = {
    slash: function () {
        const { ConnectorType } = getShapes();
        return {
            type: ConnectorType.straight,
            isConnectorType: true,
        };
    },
    slashWithEndArrow: function () {
        const {
            ConnectorType,
            ArrowheadStyle,
            ArrowheadWidth,
            ArrowheadLength,
        } = getShapes();
        return {
            type: ConnectorType.straight,
            isConnectorType: true,
            endArrowhead: {
                style: ArrowheadStyle.open,
                width: ArrowheadWidth.medium,
                length: ArrowheadLength.medium,
            },
        };
    },
    slashWithStartEndArrow: function () {
        const {
            ConnectorType,
            ArrowheadStyle,
            ArrowheadWidth,
            ArrowheadLength,
        } = getShapes();
        return {
            type: ConnectorType.straight,
            isConnectorType: true,
            endArrowhead: {
                style: ArrowheadStyle.open,
                width: ArrowheadWidth.medium,
                length: ArrowheadLength.medium,
            },
            beginArrowhead: {
                style: ArrowheadStyle.open,
                width: ArrowheadWidth.medium,
                length: ArrowheadLength.medium,
            },
        };
    },
    elbow: function () {
        const { ConnectorType } = getShapes();
        return {
            type: ConnectorType.elbow,
            isConnectorType: true,
        };
    },
    elbowWithEndArrow: function () {
        const {
            ConnectorType,
            ArrowheadStyle,
            ArrowheadWidth,
            ArrowheadLength,
        } = getShapes();
        return {
            type: ConnectorType.elbow,
            isConnectorType: true,
            endArrowhead: {
                style: ArrowheadStyle.open,
                width: ArrowheadWidth.medium,
                length: ArrowheadLength.medium,
            },
        };
    },
    elbowWithStartEndArrow: function () {
        const {
            ConnectorType,
            ArrowheadStyle,
            ArrowheadWidth,
            ArrowheadLength,
        } = getShapes();
        return {
            type: ConnectorType.elbow,
            isConnectorType: true,
            beginArrowhead: {
                style: ArrowheadStyle.open,
                width: ArrowheadWidth.medium,
                length: ArrowheadLength.medium,
            },
            endArrowhead: {
                style: ArrowheadStyle.open,
                width: ArrowheadWidth.medium,
                length: ArrowheadLength.medium,
            },
        };
    },
    horizontalTextBox: function () {
        const { AutoShapeType } = getShapes();
        return {
            type: AutoShapeType.rectangle,
            style: {
                fill: {
                    type: 1,
                    color: 'rgb(255,255,255)',
                    transparency: 0,
                },
                line: {
                    width: 1,
                    capType: 2,
                    joinType: 0,
                    compoundType: 0,
                    lineStyle: 0,
                    color: 'rgb(188,188,188)',
                    transparency: 0,
                },
                textEffect: {
                    color: 'rgb(0,0,0)',
                    transparency: 0,
                },
                textFrame: {
                    vAlign: 0,
                    hAlign: 0,
                    resizeToFitText: false,
                },
            },
            isTextBox: true,
        };
    },
};

const fillAutoShape = function (types) {
    types.forEach((type) => {
        if (Array.isArray(type)) {
            handlers[type[0]] = () => toAutoShape(type[1]);
        } else {
            handlers[type] = () => toAutoShape(type);
        }
    });
};

const types_str =
    'rectangle,roundedRectangle,snip1Rectangle,snip2SameRectangle,snip2DiagRectangle,snipRoundRectangle,round1Rectangle,round2SameRectangle,round2DiagRectangle,oval,isoscelesTriangle,rightTriangle,parallelogram,trapezoid,diamond,regularPentagon,hexagon,heptagon,octagon,decagon,dodecagon,pie,chord,tear,frame,halfFrame,corner,diagonalStripe,cross,plaque,can,cube,bevel,donut,noSymbol,blockArc,foldedCorner,smileyFace,heart,lightningBolt,sun,moon,cloud,arc,doubleBracket,doubleBrace,leftBracket,rightBracket,leftBrace,rightBrace,upDownArrowCallout,actionButtonHome,actionButtonHelp,actionButtonInformation,actionButtonBackorPrevious,actionButtonForwardorNext,actionButtonBeginning,actionButtonEnd,actionButtonReturn,actionButtonDocument,actionButtonSound,actionButtonMovie,flowchartOfflineStorage,leftRightRibbon,chartStar,chartPlus,lineInverse,leftCircularArrow,leftRightCircularArrow,swooshArrow,chartX,gear6,gear9,funnel,pieWedge,nonIsoscelesTrapezoid,cornerTabs,squareTabs,plaqueTabs,rightArrow,leftArrow,upArrow,downArrow,leftRightArrow,upDownArrow,quadArrow,leftRightUpArrow,bentArrow,uTurnArrow,leftUpArrow,bentUpArrow,curvedRightArrow,curvedLeftArrow,curvedUpArrow,curvedDownArrow,stripedRightArrow,notchedRightArrow,pentagon,chevron,rightArrowCallout,downArrowCallout,leftArrowCallout,upArrowCallout,leftRightArrowCallout,quadArrowCallout,circularArrow,mathPlus,mathMinus,mathMultiply,mathDivide,mathEqual,mathNotEqual,flowchartProcess,flowchartAlternateProcess,flowchartDecision,flowchartData,flowchartPredefinedProcess,flowchartInternalStorage,flowchartDocument,flowchartMultidocument,flowchartTerminator,flowchartPreparation,flowchartManualInput,flowchartManualOperation,flowchartConnector,flowchartOffpageConnector,flowchartCard,flowchartPunchedTape,flowchartSummingJunction,flowchartOr,flowchartCollate,flowchartSort,flowchartExtract,flowchartMerge,flowchartStoredData,flowchartDelay,flowchartSequentialAccessStorage,flowchartMagneticDisk,flowchartDirectAccessStorage,flowchartDisplay,explosion1,explosion2,shape4pointStar,shape5pointStar,star6Point,star7Point,shape8pointStar,star10Point,star12Point,shape16pointStar,shape24pointStar,shape32pointStar,upRibbon,downRibbon,curvedUpRibbon,curvedDownRibbon,verticalScroll,horizontalScroll,wave,doubleWave,rectangularCallout,roundedRectangularCallout,ovalCallout,cloudCallout,lineCallout2,lineCallout3,lineCallout4,lineCallout2AccentBar,lineCallout3AccentBar,lineCallout4AccentBar,lineCallout2NoBorder,lineCallout3NoBorder,lineCallout4NoBorder,lineCallout2BorderandAccentBar,lineCallout3BorderandAccentBar,lineCallout4BorderandAccentBar';

fillAutoShape(types_str.split(','));

const getShapeRect = function (shapeInfo) {
    const GC = getNamespace();
    let width = 150;
    let height = 150;
    const autoShapeType = GC.Spread.Sheets.Shapes.AutoShapeType;
    if (shapeInfo.isConnectorType) height = width = 100;
    else {
        const type = shapeInfo.type;
        if (
            type === autoShapeType.leftRightArrow ||
            type === autoShapeType.leftRightArrowCallout ||
            type === autoShapeType.leftRightRibbon
        ) {
            width = 200;
        } else if (
            type === autoShapeType.upDownArrow ||
            type === autoShapeType.upDownArrowCallout
        ) {
            height = 200;
        }
    }
    return {
        width: width,
        height: height,
    };
};

const getColsWidth = function (sheet, colStart, colEnd) {
    let width = 0;
    for (let i = colStart; i < colEnd; i++) width += sheet.getColumnWidth(i);
    return width;
};

const getRowsHeight = function (sheet, rowStart, rowEnd) {
    let height = 0;
    for (let i = rowStart; i < rowEnd; i++) height += sheet.getRowHeight(i);
    return height;
};

const getShapePositionInXY = function (sheet, row, col) {
    return {
        x: 20 + getColsWidth(sheet, 0, col),
        y: 20 + getRowsHeight(sheet, 0, row),
    };
};

const getSheetMaxSize = function (sheet) {
    return {
        width: getColsWidth(sheet, 0, sheet.getColumnCount()),
        height: getRowsHeight(sheet, 0, sheet.getRowCount()),
    };
};

const getShapePosition = function (sheet, width, height) {
    const row = sheet.getActiveRowIndex();
    const col = sheet.getActiveColumnIndex();
    const bottomRow = sheet.getViewportBottomRow(1);
    const topRow = sheet.getViewportTopRow(1);
    const leftColumn = sheet.getViewportLeftColumn(1);
    const rightColumn = sheet.getViewportRightColumn(1);
    const rowEnd = row <= topRow ? topRow : bottomRow <= row ? bottomRow : row;
    const colEnd =
        col <= leftColumn ? leftColumn : rightColumn <= col ? rightColumn : col;
    const position = getShapePositionInXY(sheet, rowEnd, colEnd);
    if (width && height) {
        const size = getSheetMaxSize(sheet);
        (position.x = Math.min(position.x, size.width - width)),
            (position.y = Math.min(position.y, size.height - height));
    }
    return position;
};

export function insertShape(spread, shapeType, error) {
    resourceManager
        .loadScript(['vendor/plugins/shapes.min.js'])
        .then(() => {
            withBatchUpdate(spread, (sheet) => {
                if (sheet) {
                    const shapeInfo = handlers[shapeType]();
                    const { width, height } = getShapeRect(shapeInfo);
                    const position = getShapePosition(sheet, width, height);
                    const positionX = position.x;
                    const positionY = position.y;
                    const type = shapeInfo.type;
                    const isConnectorType = shapeInfo.isConnectorType;
                    const style = shapeInfo.style;
                    const isTextBox = shapeInfo.isTextBox;
                    if (isConnectorType) {
                        const shape = sheet.shapes.addConnector(
                            '',
                            type,
                            positionX,
                            positionY,
                            positionX + width,
                            positionY + height
                        );
                        const stl = shape.style();
                        if (!isUndefined(shapeInfo.beginArrowhead)) {
                            stl.line.beginArrowheadStyle =
                                shapeInfo.beginArrowhead.style;
                            stl.line.beginArrowheadWidth =
                                shapeInfo.beginArrowhead.width;
                            stl.line.beginArrowheadLength =
                                shapeInfo.beginArrowhead.length;
                            shape.style(stl);
                        }
                        if (!isUndefined(shapeInfo.endArrowhead)) {
                            stl.line.endArrowheadStyle =
                                shapeInfo.endArrowhead.style;
                            stl.line.endArrowheadWidth =
                                shapeInfo.endArrowhead.width;
                            stl.line.endArrowheadLength =
                                shapeInfo.endArrowhead.length;
                            shape.style(stl);
                        }
                    } else {
                        const shape = sheet.shapes.add(
                            '',
                            type,
                            positionX,
                            positionY,
                            width,
                            height
                        );
                        if (style) {
                            shape.style(style);
                        }
                        if (!isNullOrUndef(isTextBox)) {
                            shape.isTextBox(isTextBox);
                        }
                    }
                }
            });
        })
        .catch(error);
}
