const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
const { Readable } = require('stream');
const crypto = require('crypto');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const querystring = require('querystring');

const app = express();
let port = 8080;


// 公开本地端口环境变量的值
// const exposePort = process.env.ExposePort || 3000;
// 公开API读取数据的端口环境变量的值
const exposeAPIUrl = process.env.ExposeAPIUrl || 'http://dev.service.vdaas.t.vtoone.com';

// 打印环境变量的值
// console.log("exposePort 的值是：", exposePort);
console.log("exposeAPIUrl 的值是：", exposeAPIUrl);

// 获取命令行参数
const args = process.argv.slice(2);

// 解析命令行参数
const portArgIndex = args.findIndex(arg => arg.startsWith('--port='));
if (portArgIndex !== -1) {
  port = args[portArgIndex].split('=')[1];
  console.log('修改运行端口Port:', port);
}


let browser;

// 设置 Express 使用静态文件目录
app.use(express.static(path.join(__dirname, 'resources/static/vdaasservice/spreadsheet')));

app.get('/test', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end("我的一家人")

})

/**
 * Middleware function that serves font files for the application.
 *
 * This middleware function is applied to the `/font` route. It checks if the requested font file
 * exists in the `fonts` directory, and if not, it defaults to the '华文仿宋' font. The font file is
 * then sent as the response.
 *
 * @param {Object} req - The HTTP request object.
 * @param {string} req.query.fontFamilyName - The name of the requested font family.
 * @param {Object} res - The HTTP response object.
 */
app.use('/font', (req, res) => {
  const {
    fontFamilyName
  } = req.query;
  let lastFontFamilyName;
  if (fs.existsSync(path.join(__dirname, 'fonts', `${fontFamilyName}.ttf`)))
    lastFontFamilyName = fontFamilyName;
  else
    lastFontFamilyName = '华文仿宋';
  res.sendFile(path.join(__dirname, 'fonts', `${lastFontFamilyName}.ttf`), err => {
    if (err) {
      console.error('Error sending file:', err);
    } else {
      console.log('File sent successfully');
    }
  })
});

/**
 * Middleware function that sets the necessary CORS headers for all requests.
 *
 * This middleware function is applied to all routes in the application. It sets the
 * `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`,
 * and `Access-Control-Allow-Credentials` headers to enable Cross-Origin Resource Sharing (CORS)
 * for the application.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the stack.
 */
app.get('*', (req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
})


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'resources/static/vdaasservice/spreadsheet', 'view.html'));
});

/**
 * Exports a PDF file based on the provided query parameters.
 *
 * @param {Object} req - The Express.js request object.
 * @param {string} req.query.fileName - The name of the PDF file to be exported.
 * @param {Object} res - The Express.js response object.
 * @returns {Promise<void>} - A Promise that resolves when the PDF file has been exported.
 */
app.get('/api/exportPDF', async (req, res) => {
  const fileName = req.query.fileName || 'a';
  const queryParams = querystring.stringify(req.query);
  //  console.log("queryParams",queryParams);
  // return
  let page;
  try {
    return new Promise(async (resolve, reject) => {
      // const browser = await puppeteer.launch({ headless: true })
      // 打开一个新页面
      if (!browser) return;
      page = await browser.newPage();
      //  const pages =  await browser.pages()
      //   console.log("打开一个新页面",pages);

      const exportPDF = (data) => {
        console.log("有人调用 exportPDF 方法了");
        resolve(data);
      };



      //   添加方法
      await page.exposeFunction("exportPDF", (path) => exportPDF(path));
      await page.exposeFunction("exportPDFError", (err) => reject(err));

      // 访问指定的网址
      await page.goto(`${req.protocol}://localhost:${port}/?${queryParams}`);

      // Set screen size
      // await page.setViewport({ width: 1080, height: 1024 });

      // 直接在上下文执行，不需要通过选择器，简单理解，上下文就是 puppeteer 内核浏览器的控制台
      // page.evaluate(() => {
      //   console.log("puppeteer 内核浏览器");
      //   exportPDF("/img/test");
      // });


    }).then((data) => {
      // console.log("导出PDF成功", data);
      // 去掉前缀部分
      const base64Data = data.replace(/^data:application\/pdf;base64,/, '');
      // 将Base64数据转换为可读流
      const stream = base64ToStream(base64Data);
      // 设置响应头，指定内容类型和文件名
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}.pdf"`); // 文件名为file.dat，可自定义

      const binaryData = Buffer.from(base64Data, 'base64');
      // 计算二进制数据的 MD5 哈希值
      const md5Hash = crypto.createHash('md5').update(binaryData).digest('hex');
      res.setHeader('Content-MD5', md5Hash);
      res.setHeader('Content-Length', binaryData.length);
      console.log('MD5 哈希值:', md5Hash);
      // 将流管道连接到响应
      stream.pipe(res);
      // 当可读流读取完所有数据时触发
      stream.on('end', () => {
        console.log('数据读取完成，关闭可读流');
        // 在 'end' 事件触发后关闭可读流
        page.close();
        stream.destroy();
      });
    }).catch((err) => {
      res.json({
        message: '导出PDF失败,请检查参数是否正确',
        success: false
      })
    })
  } catch (e) {
    console.log("导出PDF失败", e);
    // res.status(500).end();
  }
})


// 解码 Base64 数据并转换为可读流
function base64ToStream(base64String) {
  // 将 Base64 字符串解码为 Buffer 对象
  const bufferData = Buffer.from(base64String, 'base64');

  // 创建可读流并返回
  const stream = new Readable();
  stream.push(bufferData);
  stream.push(null); // 标记流结束
  return stream;
}

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
});

app.on('close', async () => {
  console.log(`Server close`);
  await browser.close();
})


// 本地测试需要跨域中间件代理
const proxyMiddleware = createProxyMiddleware({
  // 目标服务器地址
  target: `${exposeAPIUrl}/sysapi`,
  // 修改响应头，确保只允许来自指定来源的请求
  changeOrigin: true,
  // 重写响应头，只允许一个 Origin
  onProxyRes: function (proxyRes) {
    proxyRes.headers['Access-Control-Allow-Origin'] = `http://localhost:${exposePort}`;
  }
});

// 使用代理中间件
app.use('/sysapi', proxyMiddleware);