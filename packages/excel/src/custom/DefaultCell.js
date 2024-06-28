import { getNamespace } from '../utils/spreadUtil';
import { paint } from './plugins/index';

const GC = getNamespace();

export class DefaultCell extends GC.Spread.Sheets.CellTypes.Text {

    paint(ctx, value, x, y, w, h, style, context) {
        const res = paint(ctx, value, x, y, w, h, style, context);
        if(!res.break){
            super.paint(ctx, res.value, x, y, w, h, style, context);
        }
    }

}