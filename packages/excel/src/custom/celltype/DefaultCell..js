import { isObject } from '../../utils/objectUtils';
import { getNamespace } from '../../utils/spreadUtil';

const GC = getNamespace();

export class DefaultCell extends GC.Spread.Sheets.CellTypes.Text {


    paint(ctx, value, x, y, w, h, style, context) {
        if(isObject(value)&&value.typeName=='SparklineExValue'){
            const url = value.value.url;
            if(url&&context.sheet&&context.sheet.shapes){
                const sheet = context.sheet;
                sheet.shapes.addPictureShape("",url,x,y,w,h);
                return;
            }
        }
        super.paint(ctx, value, x, y, w, h, style, context);
    }

}

export default DefaultCell;
