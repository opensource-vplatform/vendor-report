export const base64DataURLToImageData = function (base64DataURL) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            if (!context) {
                reject(new Error('context is null'));
                return;
            }
            context.drawImage(img, 0, 0);
            let imageData = context.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            );
            if(typeof imageData.data == 'object'){
                const data = {colorSpace:imageData.colorSpace,width:imageData.width,height:imageData.height};
                data.data = canvas.toDataURL('png');
                imageData = data;
            }
            resolve(imageData);
        };
        img.crossOrigin = 'Anonymous'
        img.onerror = (error) => {
            reject(error);
        };
        img.src = base64DataURL;
    });
};
