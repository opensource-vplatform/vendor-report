import React, { useRef, useEffect } from 'react';
/*
 *canvas绘制边框区域
 */
const CanvasBorderArea = (props) => {
    const canvasRef = useRef(null);
    const {
        style,
        diagonalDownLine,
        diagonalUpLine,
        lineHorizontalInner,
        lineVerticalInner,
        isMoreCell,
        lineColor,
    } = props;

    // canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        // 清除画布
        context.clearRect(0, 0, canvas.width, canvas.height);
        // 设置线条样式
        context.strokeStyle = lineColor;
        canvas.style.display = 'block';
        context.lineWidth = 1;

        if (!isMoreCell) {
            context.font = '24px Arial';
            context.fillStyle = 'black';
            // 在 Canvas 上绘制文本
            context.beginPath();
            context.fillText('文本', 125, 80);
            context.stroke();
            if (diagonalDownLine) {
                context.beginPath();
                context.moveTo(0, 0);
                context.lineTo(canvas.width, canvas.height);
                context.stroke();
            }
            if (diagonalUpLine) {
                context.beginPath();
                context.moveTo(0, canvas.height);
                context.lineTo(canvas.width, 0);
                context.stroke();
            }
        } else {
            context.beginPath();
            context.font = '24px Arial';
            context.fillStyle = 'black';

            // 在 Canvas 上绘制文本
            context.fillText('文本', 55, 50);
            context.fillText('文本', 55, 120);
            context.fillText('文本', 205, 50);
            context.fillText('文本', 205, 120);
            context.stroke();

            if (diagonalDownLine) {
                context.beginPath();
                context.moveTo(0, 0);
                context.lineTo(canvas.width, canvas.height);
                context.moveTo(canvas.width / 2, 0);
                context.lineTo(canvas.width, canvas.height / 2);
                context.moveTo(0, canvas.height / 2);
                context.lineTo(canvas.width / 2, canvas.height);
                context.stroke();
            }
            if (diagonalUpLine) {
                context.beginPath();
                context.moveTo(0, canvas.height);
                context.lineTo(canvas.width, 0);
                context.moveTo(0, canvas.height / 2);
                context.lineTo(canvas.width / 2, 0);
                context.moveTo(canvas.width / 2, canvas.height);
                context.lineTo(canvas.width, canvas.height / 2);
                context.stroke();
            }
            if (lineHorizontalInner) {
                context.beginPath();
                context.moveTo(0, 75);
                context.lineTo(canvas.width, 75);
                context.stroke();
            }
            if (lineVerticalInner) {
                context.beginPath();
                context.moveTo(150, 0);
                context.lineTo(150, canvas.height);
                context.stroke();
            }
        }
    }, [
        diagonalDownLine,
        diagonalUpLine,
        lineHorizontalInner,
        lineVerticalInner,
        canvasRef,
        lineColor,
    ]);

    return <canvas ref={canvasRef} style={style} />;
};
export default CanvasBorderArea;
