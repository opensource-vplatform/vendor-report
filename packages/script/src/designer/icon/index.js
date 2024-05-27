/**
 * 使用场景
 * UI组给的图标都是全量的，且图标名称为中文
 * 每次全量更新工作量，需要筛选出哪些为新增的。
 * 
 * 实现原理：
 * 通过读取每个图标内容，生成MD5，跟设计器中图标
 * 进行对比，从而知道哪些图标为新增。
 * 
 * 使用方法：
 * 将UI组给的图标拷贝到icons目录，执行本文件代码，
 * 增量的图标将放置在delta目录下
 */

const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const del = require("del");

const designerIconDir = path.resolve(__dirname,'../../../../designer/public/css/icons');

const uiIconDir = path.resolve(__dirname,'icons');

const distDir = path.resolve(__dirname,'delta');

const listIcons = function(dir){
    if(fs.existsSync(dir)){
        const filenames = fs.readdirSync(dir);
        let result = [];
        filenames.forEach(filename=>{
            const absPath = path.resolve(dir,filename);
            const stat = fs.statSync(absPath);
            if(stat.isDirectory()){
                result = result.concat(listIcons(absPath));
            }else{
                result.push(absPath);
            }
        });
        return result;
    }
    return [];
}

const toMD5 = function(absPath){
    const buff = fs.readFileSync(absPath);
    return md5(buff);
}

const parseIcons = function(icons){
    const result = [];
    icons.forEach(icon=>{
        const md5 = toMD5(icon);
        result.push({
            path: icon,
            md5
        });
    });
    return result;
}

const designerIcons = listIcons(designerIconDir);

const uiIcons = listIcons(uiIconDir);

//清空delta目录
del.sync(['delta/**']);

const designerIconList = parseIcons(designerIcons);

const uiIconList = parseIcons(uiIcons);

const diff = [];

uiIconList.forEach(({path,md5})=>{
    const item = designerIconList.find(item=>item.md5 == md5);
    if(!item){
        diff.push(path);
    }
});

diff.forEach(ph=>{
    const relativePath = path.relative(uiIconDir,ph);
    const absPath = path.resolve(distDir,relativePath);
    const dirPath = path.resolve(absPath,'..');
    fs.mkdirSync(dirPath,{recursive:true});
    fs.copyFileSync(ph,absPath);
});