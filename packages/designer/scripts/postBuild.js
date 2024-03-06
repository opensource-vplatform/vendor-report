const path = require('path');

const fs = require('fs');

const indexHtmlPath = path.resolve(__dirname, '../dist/designer.html');

const distPath = path.resolve(__dirname,'../dist');

const filenames = fs.readdirSync(distPath);

let indexScriptName = null;

const INDEX_SCRIPT_REG = /^designer\-[\w\d]+\.umd\.js$/;

const SCRIPT_REG = /<script\s+src=["'](\.\/designer.+?umd\.js)["']\s*>/;

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
        return "<script src='./script/"+indexScriptName+"'>";
    });
    fs.writeFileSync(indexHtmlPath,content);
    const distDir = path.resolve(distPath,'script');
    if(!fs.existsSync(distDir)){
        fs.mkdirSync(distDir,{ recursive: true });
    }
    const distScriptPath = path.resolve(distPath,indexScriptName);
    fs.copyFileSync(distScriptPath, path.resolve(distDir,indexScriptName));
    fs.unlinkSync(distScriptPath);
}