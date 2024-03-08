const path = require('path');
const fs = require('fs');

const distDir = path.resolve(__dirname, '../dist');

function deleteDirectory(directory) {
    if (fs.existsSync(directory)) {
        const files = fs.readdirSync(directory);
        files.forEach((file) => {
            const filePath = path.join(directory, file);
            if (fs.lstatSync(filePath).isDirectory()) {
                deleteDirectory(filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        });
        fs.rmdirSync(directory);
    }
}

function copyDirectory(sourceDir, destinationDir) {
    if (!fs.existsSync(sourceDir)) return;
    if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir);
    }
    const files = fs.readdirSync(sourceDir);
    files.forEach((file) => {
        const sourcePath = path.join(sourceDir, file);
        const destinationPath = path.join(destinationDir, file);
        if (fs.lstatSync(sourcePath).isDirectory()) {
            copyDirectory(sourcePath, destinationPath);
        } else if (!fs.existsSync(destinationPath)) {
            fs.copyFileSync(sourcePath, destinationPath);
        }
    });
}

deleteDirectory(distDir);

const designerDistDir = path.resolve(__dirname, '../packages/designer/dist');
copyDirectory(designerDistDir,distDir)

const reportDistDir = path.resolve(__dirname,'../packages/excel/dist');
copyDirectory(reportDistDir,distDir)

const jasperreportDist = path.resolve(__dirname,'../packages/plugins/integration-jasperreport/dist');
copyDirectory(jasperreportDist,distDir);

const docsDist = path.resolve(__dirname,'../packages/docs/dist');
copyDirectory(docsDist,distDir);

const jasperreportDesignerHtmlPath = path.resolve(distDir, 'jasperreport-transform.html');

const DESIGNER_SCRIPT_REG = /^designer\-[\w\d]+\.umd\.js$/;

const SCRIPT_REG = /<script\s+src=["'](\.\/designer.+?umd\.js)["']\s*>/;

const filenames = fs.readdirSync(path.resolve(distDir,'script'));

let designerScriptName = null;

for (let index = 0; index < filenames.length; index++) {
    const filename = filenames[index];
    if(DESIGNER_SCRIPT_REG.test(filename)){
        designerScriptName = filename;
        break;
    }
}

if(designerScriptName!=null){
    let content = fs.readFileSync(jasperreportDesignerHtmlPath)
    content = new String(content);
    content = content.replace(SCRIPT_REG,function(){
        return "<script src='./script/"+designerScriptName+"'>";
    });
    fs.writeFileSync(jasperreportDesignerHtmlPath,content);
}