import { getBaseUrl } from '@utils/environmentUtil';
import {
  getCellTagPlugin,
  hasCellTagPluginByIndex,
} from '@utils/worksheetUtil';

const PLUGIN_TYPE = 'cellChart';

const CACHCE = {};

const paintCell = function (context, style, value, params) {
    const {canvasCtx,x,y,w,h} = params;
    if (!canvasCtx) {
        return value;
    }
    const { sheet, row, col } = context;
    const has = hasCellTagPluginByIndex(sheet, row, col, PLUGIN_TYPE);
    if (has) {
        const plugin = getCellTagPlugin(sheet, row, col, PLUGIN_TYPE);
        const config = plugin.config;
        const icon = config.icon;
        const url = `${getBaseUrl()}/css/icons/chart/${icon}.png`;
        /*const data = null;//CACHCE[icon];
        const drawImage = (data)=>{
            let img = document.createElement("img")
            img.src = data;
            canvasCtx.drawImage(img, x, y, w, h)
        }
        if(data){
            drawImage(data);
        }else{
            base64DataURLToImageData(url).then((res)=>{
                CACHCE[icon] = res.data;
                drawImage(CACHCE[icon]);
                sheet.repaint();
            });
        }*/
        //const style = new GC.Spread.Sheets.Style();
        style.backgroundImage = url;
        return '';
    }
    return value;
};

export default {
    PLUGIN_TYPE,
    paintCell,
}