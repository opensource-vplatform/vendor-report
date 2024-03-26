const path = require('path');
const fs = require('fs');

//const distDir = path.resolve(__dirname, '../dist');
const distDir = path.resolve(
    `D:\\vdata\\vdata.biz.designer\\resources\\page\\saasvdata`
);

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
        } else {
            fs.copyFileSync(sourcePath, destinationPath);
        }
    });
}

const designerDistDir = path.resolve(__dirname, '../integration/vdata');
copyDirectory(designerDistDir, distDir);

const DESIGNER_NAME_REG = /^designer\-[\w\d]+\.umd\.js$/;

const DESIGNER_SCRIPT_REG =
    /<script\s+src=["'](\.\/designer.+?umd\.js)["']\s*>/;

const REPORT_NAME_REG = /^report\-[\w\d]+\.umd\.js$/;

const REPORT_SCRIPT_REG = /<script\s+src=["'](\.\/report.+?umd\.js)["']\s*>/;

let designer_script_name = null;

let report_script_name = null;

const filenames = fs.readdirSync(path.resolve(distDir, 'script'));

for (let index = 0; index < filenames.length; index++) {
    const filename = filenames[index];
    if (DESIGNER_NAME_REG.test(filename)) {
        designer_script_name = filename;
        continue;
    } else if (REPORT_NAME_REG.test(filename)) {
        report_script_name = filename;
        continue;
    }
}

if (designer_script_name != null) {
    const designerHtml = path.resolve(distDir, 'designer.html');
    let content = fs.readFileSync(designerHtml);
    content = new String(content);
    content = content.replace(DESIGNER_SCRIPT_REG, function () {
        return "<script src='./script/" + designer_script_name + "'>";
    });
    fs.writeFileSync(designerHtml, content);
}

if (report_script_name != null) {
    const reportHtml = path.resolve(distDir, 'report.html');
    let content = fs.readFileSync(reportHtml);
    content = new String(content);
    content = content.replace(REPORT_SCRIPT_REG, function () {
        return "<script src='./script/" + report_script_name + "'>";
    });
    fs.writeFileSync(reportHtml, content);
}
