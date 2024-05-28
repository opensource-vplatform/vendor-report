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
            const imageData = context.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            );
            resolve(imageData);
        };
        img.onerror = (error) => {
            reject(error);
        };
        img.src = base64DataURL;
    });
};
