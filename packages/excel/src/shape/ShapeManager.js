import { withBatchCalcUpdate } from '@utils/spreadUtil';

const SHAPES = [];

export const addShape = function (sheet, shape) {
    SHAPES.push({
        sheet,
        shape,
    });
};

/**
 * 处理图片宽高
 * @param {*} item
 */
const dealPictureRect = function (item, shape) {
    const { mode, cellWidth, cellHeight } = item.shape;
    if (mode == 1) {
        //保持长宽比
        const originalWidth = shape.getOriginalWidth();
        const originalHeight = shape.getOriginalHeight();
        const wRatio = cellWidth / originalWidth;
        const hRatio = cellHeight / originalHeight;
        const ratio = wRatio > hRatio ? hRatio : wRatio;
        const width = originalWidth * ratio;
        const height = originalHeight * ratio;
        shape.height(height);
        shape.width(width);
    } else if (mode == 2) {
        //拉伸
        shape.height(cellHeight);
        shape.width(cellWidth);
    } else if (mode == 3) {
        //原始尺寸
        const originalWidth = shape.getOriginalWidth();
        const originalHeight = shape.getOriginalHeight();
        shape.width(originalWidth);
        shape.height(originalHeight);
    } else if (mode == 4) {
        //自定义尺寸
        const { width, height } = item.shape;
        shape.width(width);
        shape.height(height);
    }
};

/**
 * 处理图片对齐方式
 * @param {*} item
 * @param {*} shape
 */
const dealPictureAlign = function (item, shape) {
    const { hAlign, vAlign, cellWidth, cellHeight } = item.shape;
    const width = shape.width();
    const height = shape.height();
    if (width < cellWidth) {
        //宽度小于单元格宽度才需要设置水平位置
        if (hAlign == 1) {
            //居中
            const x = shape.x();
            //中心点
            const center = x + cellWidth / 2;
            const left = center - width / 2;
            shape.x(left);
        } else if (hAlign == 2) {
            //靠右
            const delta = cellWidth - width;
            const x = shape.x();
            shape.x(x + delta);
        }
    }
    if (height < cellHeight) {
        //高度小于单元格高度才需要设置垂直位置
        if (vAlign == 1) {
            //垂直居中
            const y = shape.y();
            //中心点
            const center = y + cellHeight / 2;
            const top = center - height / 2;
            shape.y(top);
        } else if (vAlign == 2) {
            //底端对齐
            const delta = cellHeight - height;
            const y = shape.y();
            shape.y(y + delta);
        }
    }
};

export const handleShapeChanged = function (info) {
    const { sheet, propertyName, shape } = info;
    if (propertyName == 'originalSize') {
        const item = SHAPES.find(
            (item) => (item.sheet === sheet) & (item.shape.id == shape.name())
        );
        if (item) {
            withBatchCalcUpdate(sheet.getParent(), () => {
                dealPictureRect(item, shape);
                dealPictureAlign(item, shape);
            });
            const index = SHAPES.indexOf(item);
            if (index != -1) {
                SHAPES.splice(index, 1);
            }
        }
    }
};
