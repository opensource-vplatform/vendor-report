const path = require('path');

const fs = require('fs');

const indexHtmlPath = path.resolve(__dirname, '../dist/index.html');

const filenames = fs.readdirSync(path.resolve(__dirname,'../dist'));

let indexScriptName = null;

const INDEX_SCRIPT_REG = /^index\-[\w\d]+\.umd\.js$/;

const SCRIPT_REG = /<script\s+src=["'](\.\/index.+?umd\.js)["']\s*>/;

for (let index = 0; index < filenames.length; index++) {
    const filename = filenames[index];
    if(INDEX_SCRIPT_REG.test(filename)){
        indexScriptName = filename;
        break;
    }
}

if(indexScriptName!=null){
    let content = fs.readFileSync(indexHtmlPath)
    content = new String(content);
    content = content.replace(SCRIPT_REG,function(){
        return "<script src='./"+indexScriptName+"'>";
    });
    fs.writeFileSync(indexHtmlPath,content);
}