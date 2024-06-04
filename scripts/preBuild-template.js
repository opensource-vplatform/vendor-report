const fs = require('fs');

const path = require('path');

const buildUtils = require('./buildUtils');

const xmljs = require('xml-js');

const del = require('del');

const htmlparser2 = require('htmlparser2');

const domutils = require('domutils');

const domhandler = require('domhandler');

const render = require('dom-serializer').default;

const BeautyHtml = require('./BeautyHtml');

const reportDist = path.resolve(__dirname, '../packages/excel/dist');

const spreadsheetDir = path.resolve(__dirname, '../packages/template/public');

const importPath = path.resolve(
    __dirname,
    '../packages/excel/dist/report-import.xml'
);

const indexHTMLPath = path.resolve(
    __dirname,
    '../packages/template/index.html'
);

function getDirNames(sourcePath) {
    const filenames = fs.readdirSync(sourcePath);
    if (filenames && filenames.length > 0) {
        const dirNames = [];
        filenames.forEach((filename) => {
            const sourceFilePath = path.resolve(sourcePath, filename);
            const stats = fs.statSync(sourceFilePath);
            if (stats.isDirectory()) {
                dirNames.push(filename);
            }
        });
        return dirNames;
    }
    return [];
}

/**
 * 获取head元素
 * @param {*} doc
 * @returns
 */
function getHeadEle(doc) {
    const heads = domutils.find(
        function (ele) {
            if (ele.name == 'head') {
                return true;
            }
            return false;
        },
        [doc],
        true
    );
    if (heads && heads.length == 1) {
        return heads[0];
    } else {
        throw Error(
            '处理模板index.html失败！原因:未找到head节点，路径：' +
                indexHTMLPath
        );
    }
}

/**
 * 移除节点下style、link、script节点
 * @param {*} ele
 */
function removeStyleAndScript(ele) {
    const children = ele.childNodes;
    if (children && children.length > 0) {
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (
                child.name == 'style' ||
                child.name == 'script' ||
                child.name == 'link'
            ) {
                domutils.removeElement(child);
                i--;
            }
        }
    }
}

function appendScriptAndStyle(ele) {
    //将导入的xml转换成object
    const result = buildUtils.importToObject(importPath, xmljs.xml2js);
    const styles = result.elements[0].elements[0].elements;
    const scripts = result.elements[0].elements[1].elements;
    styles.forEach((style) => {
        const attributes = style.attributes;
        const linkEl = new domhandler.Element('link', {
            rel: 'stylesheet',
            href: attributes.href,
        });
        domutils.appendChild(ele, linkEl);
    });
    scripts.forEach((script) => {
        const attributes = script.attributes;
        const scriptEl = new domhandler.Element('script', {
            type: 'text/javascript',
            src: attributes.src,
        });
        domutils.appendChild(ele, scriptEl);
    });
}

const dirnames = getDirNames(reportDist);

dirnames.forEach((dirname) => {
    buildUtils.copy(
        path.resolve(reportDist, dirname),
        path.resolve(spreadsheetDir, dirname)
    );
});

const root = htmlparser2.parseDocument(
    new String(fs.readFileSync(indexHTMLPath))
);
del.sync(['../packages/template/public/**']);
const head = getHeadEle(root);
removeStyleAndScript(head);
appendScriptAndStyle(head);
let html = render(root, { encodeEntities: 'utf8' });
html = new BeautyHtml().beautify(html);
fs.writeFileSync(indexHTMLPath, html);
