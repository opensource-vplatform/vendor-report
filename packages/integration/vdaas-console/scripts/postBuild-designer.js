const path = require('path');

const xmljs = require('xml-js');

const del = require("del");

const buildUtils = require('../../../../scripts/buildUtils');

const distPath = path.resolve(__dirname, '../designerDist');

const designerHtmlPath = path.resolve(distPath, 'designer.html');

const importPath = path.resolve(__dirname, '../../../designer/dist/designer-import.xml');

const spreadsheetPath = path.resolve(__dirname,"../resources/page/spreadsheet")

const INDEX_SCRIPT_REG = /^integration\-vdaas\-designer\-[\w\d]+\.umd\.js$/;

//获取build名称生成的js文件路径
let distFilePath = buildUtils.getBuildFilenamePath(distPath, INDEX_SCRIPT_REG);

if(distFilePath){
    //将导入的xml转换成object
    const result = buildUtils.importToObject(importPath,xmljs.xml2js);

    //添加js到object中
    buildUtils.appendScript(result,distFilePath);

    //将导入信息写入到html中
    buildUtils.importToHtmlByObject(result,designerHtmlPath);

    //移除report.html
    del.sync(["designerDist/report.html"]);

    //将build结果拷贝到spreadsheet目录
    buildUtils.copy(distPath,spreadsheetPath)

    //删除designerDist目录
    del.sync(["designerDist/**"]);
}
