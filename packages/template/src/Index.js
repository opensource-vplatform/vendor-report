const report = new TOONE.Report.Preview({
    license: import.meta.env.PROD ? '用许可证替换我' : null,
    ready: function (workbook) {
        //此处开始你的表演，workbook的api文档请参考：https://demo.grapecity.com.cn/spreadjs/help/api/classes/GC.Spread.Sheets.Workbook
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
        sheet.addSpan(0,0,4,4);
        sheet.setValue(0,0,"测试数据");
        var range = sheet.getRange(0,0,4,4);
        const border = new GC.Spread.Sheets.LineBorder();
        border.color = "#000";
        border.style = GC.Spread.Sheets.LineStyle.thin;
        range.setBorder(border,{outline:true});
        range.hAlign(GC.Spread.Sheets.HorizontalAlign.center);
        range.vAlign(GC.Spread.Sheets.VerticalAlign.center);
        range.fontWeight("bold");
        range.fontFamily("微软雅黑");
        range.fontStyle("italic");
        range.fontSize("16px");
    },
});

report.mount(document.getElementById('app'));
