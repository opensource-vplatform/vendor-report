const path = require('path')
const fs = require('fs');

function listFile(dir){
    const state = fs.statSync(dir);
    let files = [];
    if(state.isDirectory()){
        const filenames = fs.readdirSync(dir);
        if(filenames&&filenames.length>0){
            filenames.forEach(filename=>{
                const fileArray = listFile(path.resolve(dir,filename));
                files = files.concat(fileArray);
            });
        }
    }else{
        files.push(dir);
    }
    return files;
}

const files = listFile(path.resolve(__dirname));

const REG = /url\(["']?(data:image.+?)["']?\)/

function parseFile(filePath){
    const buffer = fs.readFileSync(filePath);
    let content = new String(buffer).toString();
    if(content.indexOf("${getBaseUrl()}")!=-1){
        if(content.indexOf("import { getBaseUrl }")==-1){
            content = `import { getBaseUrl } from '@utils/environmentUtil';\n`+content;
            fs.writeFileSync(filePath,content);
        }
    }
    /*const match = content.match(REG);
    if(match){
        const urlData = match[0];
        const base64Data = match[1];
        let subfix = null
        let filename = path.basename(filePath);
        const extname = path.extname(filePath);
        let name = filename.substring(0,1).toLowerCase()+filename.substring(1,filename.length-extname.length);
        let imgData = null;
        if(base64Data.startsWith("data:image/svg+xml;base64,")){
            const buffer = Buffer.from(base64Data.substring(26), 'base64');
            imgData = buffer.toString('utf8');
            subfix = ".svg";
        }else if(base64Data.startsWith("data:image/png;base64,")){
            const buffer = Buffer.from(base64Data.substring(22), 'base64');
            imgData = buffer.toString();
            subfix = ".png"
        }
        name += subfix;
        const dir = path.dirname(filePath);
        const newPath = path.resolve(dir,name);
        const relativePath = path.relative(__dirname,newPath)
        const iconBase = "D:/Workspace/Nodejs/vendor-report/packages/designer/public/css/icons";
        const iconPath = path.resolve(iconBase,relativePath);
        let urlPath = "./css/icons/"+relativePath;
        urlPath = urlPath.replace(/\\/g,'/');
        const iconContent = content.replace(urlData,`url(${urlPath})`);
        fs.mkdirSync(path.resolve(iconPath,'..'),{recursive:true});
        fs.writeFileSync(iconPath,imgData);
        fs.writeFileSync(filePath,iconContent);
    }*/
    
}

files.forEach(file=>{
    parseFile(file);
});

// parseFile(files[100]);