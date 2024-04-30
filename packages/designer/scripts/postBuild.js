const path = require('path');

const xmljs = require('xml-js');

const buildUtils = require('../../../scripts/buildUtils');

const indexHtmlPath = path.resolve(__dirname, '../dist/designer.html');

const distPath = path.resolve(__dirname, '../dist');

const vendorImportPath = path.resolve(distPath, 'vendor-designer-import.xml');

const importPath = path.resolve(distPath, 'designer-import.xml');

const INDEX_SCRIPT_REG = /^designer\-[\w\d]+\.umd\.js$/;

//获取build名称生成的js文件路径
let distFilePath = buildUtils.getBuildFilenamePath(distPath, INDEX_SCRIPT_REG);

if(distFilePath){
    //生成html需要导入资源的xml信息
    buildUtils.genImportXML(
        distFilePath,
        vendorImportPath,
        xmljs.xml2js,
        importPath
    );
    
    //将导入信息填充到html中
    buildUtils.importToHtml(xmljs.xml2js, importPath, indexHtmlPath);
}
