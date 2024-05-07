const path = require('path');

const xmljs = require('xml-js');

const del = require("del");

const buildUtils = require('../../../../scripts/buildUtils');

const distPath = path.resolve(__dirname, '../reportDist');

const reportHtmlPath = path.resolve(distPath, 'view/index.html');

const spreadsheetPath = path.resolve(__dirname,"../resources/static/spreadsheet")

const importPath = path.resolve(__dirname, '../../../excel/dist/report-import.xml');

const INDEX_SCRIPT_REG = /^integration\-vdaas\-report\-[\w\d]+\.umd\.js$/;

//获取build名称生成的js文件路径
let distFilePath = buildUtils.getBuildFilenamePath(distPath, INDEX_SCRIPT_REG);

if(distFilePath){
    //将导入的xml转换成object
    const result = buildUtils.importToObject(importPath,xmljs.xml2js);

    //添加js到object中
    buildUtils.appendScript(result,distFilePath);

    //将导入信息写入到html中
    buildUtils.importToHtmlByObject(result,reportHtmlPath,"../");

    //designer.html
    del.sync(["reportDist/designer/index.html"]);

    //将build结果拷贝到spreadsheet目录
    buildUtils.copy(distPath,spreadsheetPath)

    //删除reportDist目录
    del.sync(["reportDist/**"]);
}
