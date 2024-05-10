const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log("start");

// 将 Base64 编码的数据解码为二进制数据
const base64Data = 'Hello World'; 
const binaryData = Buffer.from(base64Data, 'base64');

// 计算二进制数据的 MD5 哈希值
const md5Hash = crypto.createHash('md5').update(binaryData).digest('hex');

console.log('MD5 哈希值:', md5Hash);

// fs.stat(path.join(__dirname, 'fonts','华文仿宋1.ttf'), (err, stats) => {
//     if(err){
//       console.error(err);
//       return
//     }
//     console.log(stats)
// })
console.log(fs.existsSync(path.join(__dirname, 'fonts','华文仿宋.ttf')));