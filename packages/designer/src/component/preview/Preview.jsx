import React, {
  useEffect,
  useRef,
} from 'react';

import styled from 'styled-components';

import { format as formatData } from '@utils/cellSettingUtil';
import { isString } from '@utils/objectUtil';
import {
  isDoubleUnderline,
  isLineThrough,
  isUnderline,
} from '@utils/textDecorationUtil';

import { isObject } from '../../../../excel/src/utils/objectUtils';

const Wrap = styled.div`
    width: 180px;
    height: 100px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Outline = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100%;
`;

const TextPreviewWrap = styled.div`
    position: absolute;
    width: max-content;
    height: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    width: 100%;
    height: 100%;
`;

const MultiCellWrap = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const MultiCellItem = styled.div`
    position: relative;
    width: 50%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function TextPreview(props) {
    const {
        fontFamily,
        textDecoration,
        fontWeight,
        fontStyle,
        fontSize,
        backColor,
        foreColor,
        format,
        text = 'AaBbCcYyZz',
    } = props;
    return (
        <TextPreviewWrap
            style={{
                fontFamily,
                backgroundColor: isString(backColor)
                    ? backColor
                    : isObject(backColor)
                      ? backColor.backgroundColor
                      : 'unset',
                fontWeight: fontWeight == 'bold' ? 'bold' : 'normal',
                fontSize: fontSize + 'pt',
                color: foreColor,
                fontStyle: fontStyle == 'italic' ? 'italic' : 'normal',
                textDecorationLine: `${
                    isLineThrough(textDecoration) ? 'line-through' : ''
                } ${isUnderline(textDecoration) ? 'underline' : ''}`,
                borderBottom: isDoubleUnderline(textDecoration)
                    ? `3px double ${foreColor}`
                    : 'unset',
            }}
        >
            {formatData(format, text)}
        </TextPreviewWrap>
    );
}

const Border2Style = {
    0: { lineWidth: 1, lineDash: [0, 0] },
    7: { lineWidth: 1, lineDash: [3, 3] },
    4: { lineWidth: 1, lineDash: [5, 5] },
    11: { lineWidth: 1, lineDash: [15, 5, 5, 5, 5, 5] },
    9: { lineWidth: 1, lineDash: [15, 5, 5, 5] },
    3: { lineWidth: 1, lineDash: [10, 10] },
    1: { lineWidth: 1, lineDash: [] },
    12: { lineWidth: 3, lineDash: [15, 5, 5, 5, 5, 5] },
    10: { lineWidth: 3, lineDash: [15, 5, 10, 5] },
    13: { lineWidth: 3, lineDash: [15, 5, 5, 5] },
    8: { lineWidth: 3, lineDash: [15, 5] },
    2: { lineWidth: 3, lineDash: [] },
    5: { lineWidth: 5, lineDash: [] },
    6: { lineWidth: 1, lineDash: [], type: 'double' },
};

const toCanvasBorderStyle = function (style) {
    return Border2Style[style] || { lineWidth: 1, lineDash: [] };
};

const isV = function (start, end) {
    const startX = start[0];
    const endX = end[0];
    return startX == endX;
};

const isH = function (start, end) {
    const startY = start[1];
    const endY = end[1];
    return startY == endY;
};

const isDown = function (start, end) {
    const startY = start[1];
    const endY = end[1];
    return endY - startY > 2;
};

const drawLine = function (ctx, border, lines, maxWidth, maxHeight) {
    ctx.beginPath();
    const { style, color } = border;
    ctx.strokeStyle = color;
    const { lineWidth, lineDash, type } = toCanvasBorderStyle(style);
    ctx.lineWidth = lineWidth;
    ctx.setLineDash(lineDash);
    if (type == 'double') {
        lines = [...lines];
        for (let i = 0; i < lines.length; i++) {
            const { start, end } = lines[i];
            const [startX, startY] = start;
            const [endX, endY] = end;
            let delta = 3;
            if (isV(start, end)) {
                if (startX + delta > maxWidth) {
                    delta = -3;
                }
                lines.push({
                    start: [startX + delta, startY],
                    end: [endX + delta, endY],
                });
            } else if (isH(start, end)) {
                if (startY + delta > maxHeight) {
                    delta = -3;
                }
                lines.push({
                    start: [startX, startY + delta],
                    end: [endX, endY + delta],
                });
            } else if (isDown(start, end)) {
                lines.push({
                    start: [startX, startY + delta],
                    end: [endX, endY + delta],
                });
            } else {
                lines.push({
                    start: [startX + delta, startY + delta],
                    end: [endX + delta, endY + delta],
                });
            }
            i = i + 1;
        }
    }
    lines.forEach(({ start, end }) => {
        ctx.moveTo(...start);
        ctx.lineTo(...end);
        ctx.stroke();
    });
    ctx.stroke();
};

/*
 *canvas绘制边框区域
 */
export default function (props) {
    const canvasRef = useRef(null);
    const {
        style,
        isSingleCell = true,
        backColor,
        borderLeft,
        borderRight,
        borderTop,
        borderBottom,
        innerHorizontal,
        innerVertical,
        //对角线\
        diagonalDown,
        //对角线/
        diagonalUp,
        fontFamily,
        textDecoration,
        fontWeight,
        fontStyle,
        fontSize,
        foreColor,
        format,
        text = 'AaBbCcYyZz',
    } = props;

    // canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        // 清除画布
        ctx.clearRect(0, 0, width, height);
        canvas.style.display = 'block';
        ctx.lineWidth = 3;
        if (isSingleCell) {
            diagonalDown &&
                drawLine(
                    ctx,
                    diagonalDown,
                    [
                        {
                            start: [0, 0],
                            end: [width, height],
                        },
                    ],
                    width,
                    height
                );
            diagonalUp &&
                drawLine(
                    ctx,
                    diagonalUp,
                    [
                        {
                            start: [0, height],
                            end: [width, 0],
                        },
                    ],
                    width,
                    height
                );
        } else {
            ctx.beginPath();
            diagonalDown &&
                drawLine(
                    ctx,
                    diagonalDown,
                    [
                        {
                            start: [1, 1],
                            end: [width, height],
                        },
                        {
                            start: [width / 2, 1],
                            end: [width, height / 2],
                        },
                        {
                            start: [1, height / 2],
                            end: [width / 2, height],
                        },
                    ],
                    width,
                    height
                );
            diagonalUp &&
                drawLine(
                    ctx,
                    diagonalUp,
                    [
                        {
                            start: [1, height],
                            end: [width, 1],
                        },
                        {
                            start: [1, height / 2],
                            end: [width / 2, 1],
                        },
                        {
                            start: [width / 2, height],
                            end: [width, height / 2],
                        },
                    ],
                    width,
                    height
                );
            innerHorizontal &&
                drawLine(
                    ctx,
                    innerHorizontal,
                    [
                        {
                            start: [1, height / 2],
                            end: [width, height / 2],
                        },
                    ],
                    width,
                    height
                );
            innerVertical &&
                drawLine(
                    ctx,
                    innerVertical,
                    [
                        {
                            start: [width / 2, 1],
                            end: [width / 2, height],
                        },
                    ],
                    width,
                    height
                );
        }
        borderLeft &&
            drawLine(
                ctx,
                borderLeft,
                [{ start: [1, 1], end: [1, height - 1] }],
                width,
                height
            );
        borderBottom &&
            drawLine(
                ctx,
                borderBottom,
                [
                    {
                        start: [1, height - 1],
                        end: [width - 1, height - 1],
                    },
                ],
                width,
                height
            );
        borderRight &&
            drawLine(
                ctx,
                borderRight,
                [
                    {
                        start: [width - 1, height - 1],
                        end: [width - 1, 1],
                    },
                ],
                width,
                height
            );
        borderTop &&
            drawLine(
                ctx,
                borderTop,
                [{ start: [1, 1], end: [width - 1, 1] }],
                width,
                height
            );
    }, [
        borderTop,
        borderRight,
        borderBottom,
        borderLeft,
        innerHorizontal,
        innerVertical,
        diagonalDown,
        diagonalUp,
        canvasRef,
    ]);

    return (
        <Outline style={style}>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                }}
            />
            {isSingleCell ? (
                <TextPreview
                    fontFamily={fontFamily}
                    textDecoration={textDecoration}
                    fontWeight={fontWeight}
                    fontStyle={fontStyle}
                    fontSize={fontSize}
                    backColor={backColor}
                    foreColor={foreColor}
                    format={format}
                    text={text}
                ></TextPreview>
            ) : (
                <MultiCellWrap>
                    <MultiCellItem>
                        <TextPreview
                            fontFamily={fontFamily}
                            textDecoration={textDecoration}
                            fontWeight={fontWeight}
                            fontStyle={fontStyle}
                            fontSize={fontSize}
                            backColor={backColor}
                            foreColor={foreColor}
                            format={format}
                            text={text}
                        ></TextPreview>
                    </MultiCellItem>
                    <MultiCellItem>
                        <TextPreview
                            fontFamily={fontFamily}
                            textDecoration={textDecoration}
                            fontWeight={fontWeight}
                            fontStyle={fontStyle}
                            fontSize={fontSize}
                            backColor={backColor}
                            foreColor={foreColor}
                            format={format}
                            text={text}
                        ></TextPreview>
                    </MultiCellItem>
                    <MultiCellItem>
                        <TextPreview
                            fontFamily={fontFamily}
                            textDecoration={textDecoration}
                            fontWeight={fontWeight}
                            fontStyle={fontStyle}
                            fontSize={fontSize}
                            backColor={backColor}
                            foreColor={foreColor}
                            format={format}
                            text={text}
                        ></TextPreview>
                    </MultiCellItem>
                    <MultiCellItem>
                        <TextPreview
                            fontFamily={fontFamily}
                            textDecoration={textDecoration}
                            fontWeight={fontWeight}
                            fontStyle={fontStyle}
                            fontSize={fontSize}
                            backColor={backColor}
                            foreColor={foreColor}
                            format={format}
                            text={text}
                        ></TextPreview>
                    </MultiCellItem>
                </MultiCellWrap>
            )}
        </Outline>
    );
}
