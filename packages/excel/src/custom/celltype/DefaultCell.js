import { isString } from '../../utils/objectUtils';
import { getNamespace } from '../../utils/spreadUtil';

const GC = getNamespace();

const IMAGE_ARG_REGEX = /TOONE\.IMAGE\((.+?)\)/;

class PictureShape {
    constructor(params) {
        const { url, mode, left,top, width, height, sheet, row, col } = params;
        this.url = url;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.sheet = sheet;
        this.mode = mode;
        this.row = row;
        this.col = col;
        this.load();
    }

    load() {
        /*const request = new XMLHttpRequest();
        request.open('GET', this.url, true);
        request.responseType = 'blob';
        request.onload = () => {
            const reader = new FileReader();
            reader.readAsDataURL(request.response);
            reader.onload = (evt) => {
                this.sheet.shapes.addPicture(
                    `CellImage_${shape.row}_${shape.col}`,
                    evt.target.result,
                    shape.left,
                    shape.top
                );
            };
        };*/
        this.key = `CellImage_${this.row}_${this.col}`;
        this.sheet.shapes.addPictureShape(
            this.key,
            this.url,
            this.left,
            this.top,
            this.width,
            this.height
        );
    }
}

export class DefaultCell extends GC.Spread.Sheets.CellTypes.Text {
    pictures = [];

    addPicture(row, col, picture) {
        this.pictures.push({ row, col, picture });
    }

    existPicture(row, col) {
        return !!this.pictures.find(
            (picture) => picture.row == row && picture.col == col
        );
    }

    paint(ctx, value, x, y, w, h, style, context) {
        if (context && context.sheet && isString(value) && context.textRect) {
            const { sheet, row, col } = context;
            const formula = sheet.getFormula(row, col);
            if (formula && formula.startsWith('TOONE.IMAGE(')) {
                formula.mat
                try {
                    const config = JSON.parse(value);
                    if (!this.existPicture(row, col)) {
                        const { colHeaderVisible, rowHeaderVisible } =
                            sheet.options;
                        this.addPicture(
                            row,
                            col,
                            new PictureShape({
                                ...config,
                                sheet,
                                left: rowHeaderVisible
                                    ? x + 22 - sheet.defaults.colWidth
                                    : x + 22,
                                top: colHeaderVisible
                                    ? y - sheet.defaults.rowHeight
                                    : y,
                                width: w,
                                height: h,
                                row,
                                col,
                            })
                        );
                        value = '';
                    }
                } catch (e) {
                }
            }
        }
        super.paint(ctx, value, x, y, w, h, style, context);
    }
}

export default DefaultCell;
