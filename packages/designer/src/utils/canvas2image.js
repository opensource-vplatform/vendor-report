function scaleCanvas(canvas, width, height) {
    const w = canvas.width,
        h = canvas.height;
    if (width === undefined) {
        width = w;
    }
    if (height === undefined) {
        height = h;
    }

    const retCanvas = document.createElement("canvas");
    const retCtx = retCanvas.getContext("2d");
    retCanvas.width = width;
    retCanvas.height = height;
    retCtx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
    return retCanvas;
}

function getDataURL(canvas, width, height) {
    canvas = scaleCanvas(canvas, width, height);
    return canvas.toDataURL("png");
}

export const saveAsImg = function(spread,width,height){
    const el = spread.getHost();
    const sheet = spread.getActiveSheet();
    if(width===undefined){
        width = sheet.getViewportWidth();
    }
    if(height===undefined){
        height = sheet.getViewportHeight();
    }
    const canvas = el.querySelector("canvas");
    return getDataURL(canvas, width, height);
}

window.saveAsImg = saveAsImg;