import { base64DataURLToImageData } from './imageUtil';
import { getNamespace } from './spreadUtil';

/**
 * excel增强
 */
class ExcelEnhancer {
    spread = null;

    items = [];

    constructor(spread) {
        this.spread = spread;
    }

    /**
     * 获取指定列的左边距
     * @param {*} sheet
     * @param {*} col
     * @returns
     */
    getLeft(sheet, col) {
        let left = 0;
        while (--col >= 0) {
            left += sheet.getColumnWidth(col);
        }
        return left;
    }

    /**
     * 获取指定行的上边距
     * @param {*} sheet
     * @param {*} row
     */
    getTop(sheet, row) {
        let top = 0;
        while (--row >= 0) {
            top += sheet.getRowHeight(row);
        }
        return top;
    }

    /**
     * 处理图片宽高
     * @param {*} item
     */
    dealPictureRect(
        cellWidth,
        originalWidth,
        cellHeight,
        originalHeight,
        mode,
        picture
    ) {
        if (mode == 0) {
            //保持长宽比
            const wRatio = cellWidth / originalWidth;
            const hRatio = cellHeight / originalHeight;
            const ratio = wRatio > hRatio ? hRatio : wRatio;
            const width = originalWidth * ratio;
            const height = originalHeight * ratio;
            picture.height(height);
            picture.width(width);
        } else if (mode == 1) {
            //拉伸
            picture.height(cellHeight);
            picture.width(cellWidth);
        } else if (mode == 2) {
            //原始尺寸
            picture.width(originalWidth);
            picture.height(originalHeight);
        } else if (mode == 3) {
            //自定义尺寸
            const { width, height } = item.shape;
            picture.width(width);
            picture.height(height);
        }
    }

    /**
     * 处理图片对齐方式
     * @param {*} item
     * @param {*} picture
     */
    dealPictureAlign(cellWidth, cellHeight, hAlign, vAlign, picture) {
        const width = picture.width();
        const height = picture.height();
        if (width < cellWidth) {
            //宽度小于单元格宽度才需要设置水平位置
            if (hAlign == 1) {
                //居中
                const x = picture.x();
                //中心点
                const center = x + cellWidth / 2;
                const left = center - width / 2;
                picture.x(left);
            } else if (hAlign == 2) {
                //靠右
                const delta = cellWidth - width;
                const x = picture.x();
                picture.x(x + delta);
            }
        }
        if (height < cellHeight) {
            //高度小于单元格高度才需要设置垂直位置
            if (vAlign == 1) {
                //垂直居中
                const y = picture.y();
                //中心点
                const center = y + cellHeight / 2;
                const top = center - height / 2;
                picture.y(top);
            } else if (vAlign == 2) {
                //底端对齐
                const delta = cellHeight - height;
                const y = picture.y();
                picture.y(y + delta);
            }
        }
    }

    /**
     * 解析迷你图
     * 逻辑：将迷你图转换成PictureShape
     * 目标：excel支持迷你图
     * @param {*} sheet
     * @param {*} row
     * @param {*} col
     */
    parseSparkline(sheet, row, col) {
        return new Promise((resolve, reject) => {
            const value = sheet.getValue(row, col);
            if (value && value.typeName == 'SparklineExValue') {
                if (
                    !value.value ||
                    (!value.value.imageBase64Data && !value.value.url)
                ) {
                    //添加迷你图处理，防止导出后excel中出现值错误问题（#VALUE）
                    this.items.push({
                        type: 'sparklineEnhancer',
                        sheetName: sheet.name(),
                        row,
                        col,
                        picture: null,
                    });
                    resolve();
                } else {
                    const { drawType, hAlign, imageBase64Data, url, vAlign } =
                        value.value;
                    const GC = getNamespace();
                    base64DataURLToImageData(imageBase64Data || url)
                        .then((imgData) => {
                            const {
                                width: originalWidth,
                                height: originalHeight,
                                data,
                            } = imgData;
                            const picture =
                                new GC.Spread.Sheets.Shapes.PictureShape(
                                    sheet,
                                    `CellImage_${row}_${col}`,
                                    data,
                                    this.getLeft(sheet, col),
                                    this.getTop(sheet, row)
                                );
                            picture.allowMove(false);
                            picture.allowResize(false);
                            picture.allowRotate(false);
                            picture.canPrint(true);
                            const cellWidth = sheet.getColumnWidth(col);
                            const cellHeight = sheet.getRowHeight(row);
                            this.dealPictureRect(
                                cellWidth,
                                originalWidth,
                                cellHeight,
                                originalHeight,
                                drawType,
                                picture
                            );
                            this.dealPictureAlign(
                                cellWidth,
                                cellHeight,
                                hAlign,
                                vAlign,
                                picture
                            );
                            this.items.push({
                                type: 'sparklineEnhancer',
                                sheetName: sheet.name(),
                                row,
                                col,
                                picture,
                            });
                            resolve();
                        })
                        .catch(()=>{
                            //加载图片信息出现异常
                            this.items.push({
                                type: 'sparklineEnhancer',
                                sheetName: sheet.name(),
                                row,
                                col,
                                picture: null,
                            });
                            resolve();
                        });
                }
            } else {
                resolve();
            }
        });
    }

    parseCell(sheet, row, col) {
        return new Promise((resolve, reject) => {
            this.parseSparkline(sheet, row, col).then(resolve).catch(reject);
        });
    }

    parseSheet(sheet) {
        return new Promise((resolve, reject) => {
            const rowCount = sheet.getRowCount();
            const colCount = sheet.getColumnCount();
            const promises = [];
            for (let row = 0; row < rowCount; row++) {
                for (let col = 0; col < colCount; col++) {
                    promises.push(this.parseCell(sheet, row, col));
                }
            }
            Promise.all(promises).then(resolve).catch(reject);
        });
    }

    parseSpread() {
        return new Promise((resolve, reject) => {
            const sheets = this.spread.sheets;
            if (sheets && sheets.length > 0) {
                const promises = [];
                sheets.forEach((sheet) => {
                    promises.push(this.parseSheet(sheet));
                });
                Promise.all(promises).then(resolve).catch(reject);
            } else {
                resolve();
            }
        });
    }

    executeSparklineEnhancer(json, item) {
        const { row, col, picture } = item;
        //将单元格的值设置为空字符串，防止excel中显示!value
        json.data.dataTable[row][col].value = '';
        json.data.dataTable[row][col].formula = undefined;
        if (picture) {
            const shapes = json.shapes || [];
            shapes.push(picture.toJSON());
            json.shapes = shapes;
        }
    }

    executeEnhancer(json) {
        const sheets = json.sheets;
        if (sheets) {
            this.items.forEach((item) => {
                const { sheetName, type } = item;
                const sheetJson = sheets[sheetName];
                if (sheetJson) {
                    if (type == 'sparklineEnhancer') {
                        this.executeSparklineEnhancer(sheetJson, item);
                    }
                }
            });
        }
    }

    enhance() {
        return new Promise((resolve, reject) => {
            this.parseSpread()
                .then(() => {
                    const json = this.spread.toJSON();
                    this.executeEnhancer(json);
                    resolve(json);
                })
                .catch(reject);
        });
    }
}

export default ExcelEnhancer;
