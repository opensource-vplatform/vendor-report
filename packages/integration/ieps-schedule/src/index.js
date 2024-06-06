
/**
 * 获取1cm对应多少像素
 */
const getUnitCount = function(){
    const div = document.createElement("div");
    div.style.width = '1cm';
    document.body.appendChild(div);
    const rect = window.getComputedStyle(div);
    const unit = parseFloat(rect.width);
    document.body.removeChild(div);
    return unit;
}

/**
 * 获取纸张大小
 */
const getPaperRect = function(unit){
    //纸张(A4,横向)宽高，单位cm
    const pageWidth = 29.7,pageHeight=21;
    return {
        width: pageWidth*unit,
        height: pageHeight*unit,
    }
}

/**
 * 设置
 */
const setHeader = function(sheet,){

}

export default function () {
    return new TOONE.Report.Dev({
        datasources:[],//添加需要加载的数据集编码
        ready: function (workbook,context) {
            //此处开始你的表演，workbook的api文档请参考：https://demo.grapecity.com.cn/spreadjs/help/api/classes/GC.Spread.Sheets.Workbook
            const unit = getUnitCount();
            const paper = getPaperRect(unit);
            workbook.addSheet(0);
            workbook.options.newTabVisible = false;
            workbook.options.tabStripVisible = false;
            var sheet = workbook.getSheet(0);
            sheet.defaults.rowHeight = 40;
            sheet.defaults.colWidth = 80;
            sheet.options.showHorizontalGridline = false;
            sheet.options.showVerticalGridline = false;
            sheet.setRowCount(5);
            sheet.setColumnCount(5);
            sheet.addSpan(0, 0, 4, 4);
            sheet.setValue(0, 0, '测试数据');
            var range = sheet.getRange(0, 0, 4, 4);
            const border = new GC.Spread.Sheets.LineBorder();
            border.color = '#000';
            border.style = GC.Spread.Sheets.LineStyle.thin;
            range.setBorder(border, { outline: true });
            range.hAlign(GC.Spread.Sheets.HorizontalAlign.center);
            range.vAlign(GC.Spread.Sheets.VerticalAlign.center);
            range.fontWeight('bold');
            range.fontFamily('微软雅黑');
            range.fontStyle('italic');
            range.fontSize('16px');
        },
    });
}
