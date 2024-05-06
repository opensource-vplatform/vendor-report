const fs = require('fs');
const json2xml = require('./json2xml');
const path = require('path');

/**
 * 获取build命令后生成的js脚本路径
 * @param {*} distPath
 * @param {*} regex
 * @returns
 */
exports.getBuildFilenamePath = function (distPath, regex) {
    const filenames = fs.readdirSync(distPath);
    for (let index = 0; index < filenames.length; index++) {
        const filename = filenames[index];
        if (regex.test(filename)) {
            const distScriptPath = path.resolve(distPath, filename);
            const distDir = path.resolve(distPath, 'script');
            if (!fs.existsSync(distDir)) {
                fs.mkdirSync(distDir, { recursive: true });
            }
            fs.copyFileSync(distScriptPath, path.resolve(distDir, filename));
            fs.unlinkSync(distScriptPath);
            return `./script/${filename}`;
        }
    }
    return null;
};

/**
 * 生成导入信息
 * @param {*} vendorImportPath 第三方资源导入定义xml路径
 * @param {*} xml2jsHandler xml转换成json的handler
 * @param {*} importDistPath 导入信息存放地址
 */
exports.genImportXML = function (
    distFilenamePath,
    vendorImportPath,
    xml2jsHandler,
    importDistPath
) {
    const options = {
        ignoreComment: true,
        alwaysChildren: true,
        alwaysArray: true,
    };
    const vendorImportContent = fs.readFileSync(vendorImportPath);
    const result = xml2jsHandler(vendorImportContent, options);
    appendScript(result,distFilenamePath);
    const xmlContent = json2xml.toXML(result);
    fs.writeFileSync(importDistPath, xmlContent);
};

const importToObject = function(importPath,xml2jsHandler){
    let importContent = fs.readFileSync(importPath);
    const options = {
        ignoreComment: true,
        alwaysChildren: true,
        alwaysArray: true,
    };
    return xml2jsHandler(importContent, options);
}


const findNode = function (node, nodeName) {
    if(node.type=='element'&&node.name==nodeName){
        return node;
    }else{
        const elements = node.elements;
        if(elements&&elements.length>0){
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                const node = findNode(element,nodeName);
                if(node !== null){
                    return node;
                }
            }
        }
    }
    return null;
};

const appendStyle = function (root, href) {
    const stylesElement = findNode(root, 'styles');
    const styles = stylesElement.elements || [];
    styles.push({
        type: 'element',
        name: 'link',
        elements: [],
        attributes: {
            href: href
        },
    });
};

const appendScript = function (root, src) {
    const stylesElement = findNode(root, 'scripts');
    const styles = stylesElement.elements || [];
    styles.push({
        type: 'element',
        name: 'script',
        elements: [],
        attributes: {
            src: src,
        },
    });
};

const importToHtmlByObject = function(object,htmlPath,prefix){
    const styles = object.elements[0].elements[0].elements;
    const scripts = object.elements[0].elements[1].elements;
    const styleImportScript = [];
    const scriptImportScript = [];
    prefix = prefix ? prefix:'./'
    styles.forEach((style) => {
        const attributes = style.attributes;
        styleImportScript.push(
            `<link rel="stylesheet" href="${attributes.href.startsWith('./') ? prefix+attributes.href.substring(2):prefix+attributes.href}"></link>`
        );
    });
    scripts.forEach((script) => {
        const attributes = script.attributes;
        scriptImportScript.push(
            `<script type="text/javascript" src="${attributes.src.startsWith('./') ? prefix+attributes.src.substring(2):prefix+attributes.src}"></script>`
        );
    });
    let htmlContent = new String(fs.readFileSync(htmlPath));
    htmlContent = htmlContent
        .replace(`<!--import-styles-->`, styleImportScript.join('\n'))
        .replace(`<!--import-scripts-->`, scriptImportScript.join('\n'));
    fs.writeFileSync(htmlPath, htmlContent);
}

/**
 *
 * @param {*} importPath
 * @param {*} htmlPath
 */
exports.importToHtml = function (xml2jsHandler, importPath, htmlPath) {
    const result = importToObject(importPath,xml2jsHandler);
    importToHtmlByObject(result,htmlPath);
};

const isDirectory = function (filepath) {
    const stats = fs.statSync(filepath);
    return stats.isDirectory();
};

const mkDir = function (dirpath) {
    if (!fs.existsSync(dirpath)) {
        fs.mkdirSync(dirpath, { recursive: true });
    }
};

const copy = function (sourcePath, targetPath) {
    if (isDirectory(sourcePath)) {
        copyDir(sourcePath, targetPath);
    } else {
        copyFile(sourcePath, targetPath);
    }
};

const copyDir = function (sourceDirPath, targetDirPath) {
    const filenames = fs.readdirSync(sourceDirPath);
    if (filenames && filenames.length > 0) {
        filenames.forEach((filename) => {
            const sourceFilePath = path.resolve(sourceDirPath, filename);
            const distFilePath = path.resolve(targetDirPath, filename);
            copy(sourceFilePath, distFilePath);
        });
    }
};

const copyFile = function (sourcePath, targetPath) {
    const dirpath = path.resolve(targetPath, '..');
    mkDir(dirpath);
    fs.copyFileSync(sourcePath, targetPath);
};

exports.importToObject = importToObject;

exports.appendScript = appendScript;

exports.appendStyle = appendStyle;

exports.importToHtmlByObject = importToHtmlByObject;

exports.isDirectory = isDirectory;

exports.copy = copy;