import { formulaToAST, parseImageArgs } from '../..//utils/formulaUtil';
import { isString } from '../../utils/objectUtils';
import { getNamespace } from '../../utils/spreadUtil';
import { addShape } from '../../shape/ShapeManager';

const GC = getNamespace();

export class DefaultCell extends GC.Spread.Sheets.CellTypes.Text {
    paint(ctx, value, x, y, w, h, style, context) {
        if (context && context.sheet && isString(value) && context.textRect) {
            const { sheet, row, col } = context;
            const formula = sheet.getFormula(row, col);
            if (formula && formula.startsWith('TOONE.IMAGE(')) {
                try {
                    const ast = formulaToAST(formula);
                    const args = ast.arguments;
                    const params = parseImageArgs(args);
                    const url = params.url;
                    if (url) {
                        //url存在值才添加形状
                        const shapeId = `CellImage_${row}_${col}`;
                        const shape = sheet.shapes.get(shapeId);
                        if (!shape) {
                            const { colHeaderVisible, rowHeaderVisible } =
                                sheet.options;
                            const left = rowHeaderVisible
                                ? x + 22 - sheet.defaults.colWidth
                                : x + 22;
                            const top = colHeaderVisible
                                ? y - sheet.defaults.rowHeight
                                : y;
                            addShape(sheet, {
                                id: shapeId,
                                ...params,
                                cellLeft: left,
                                cellTop: top,
                                cellWidth: w,
                                cellHeight: h,
                                row,
                                col,
                            });
                            const picture = sheet.shapes.addPictureShape(
                                shapeId,
                                url,
                                left,
                                top,
                                w,
                                h
                            );
                            picture.allowMove(false);
                            picture.allowResize(false);
                            picture.allowRotate(false);
                            picture.canPrint(true);
                        }
                        return;
                    }
                } catch (e) {}
            }
        }
        super.paint(ctx, value, x, y, w, h, style, context);
    }
}

export default DefaultCell;
