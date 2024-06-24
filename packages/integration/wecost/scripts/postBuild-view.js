const path = require('path');

const xmljs = require('xml-js');

const del = require("del");

const buildUtils = require('../../../../scripts/buildUtils');

const distPath = path.resolve(__dirname, '../viewDist');

const reportHtmlPath = path.resolve(distPath, 'view.html');

const spreadsheetPath = path.resolve(__dirname,"../resources/static/wecost/spreadsheet")

const importPath = path.resolve(__dirname, '../../../excel/dist/report-import.xml');

const INDEX_SCRIPT_REG = /^integration\-wecost\-report\-[\w\d]+\.umd\.js$/;

//获取build名称生成的js文件路径
let distFilePath = buildUtils.getBuildFilenamePath(distPath, INDEX_SCRIPT_REG);

if(distFilePath){
    //将导入的xml转换成object
    const result = buildUtils.importToObject(importPath,xmljs.xml2js);

    //添加js到object中
    buildUtils.appendScript(result,distFilePath);
    buildUtils.appendScript(result,'./vendor/excel/17.0.5/plugins/print.min.js');
    buildUtils.appendScript(result,'./vendor/excel/17.0.5/plugins/pdf.min.js');

    //将导入信息写入到html中
    buildUtils.importToHtmlByObject(result,reportHtmlPath);

    //designer.html
    del.sync(["viewDist/designer.html"]);

    //将build结果拷贝到spreadsheet目录
    buildUtils.copy(distPath,spreadsheetPath)

    //删除viewDist目录
    del.sync(["viewDist/**"]);
}
