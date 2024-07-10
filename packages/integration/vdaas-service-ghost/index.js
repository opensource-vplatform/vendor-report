const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
// const { Readable } = require('stream');
const crypto = require('crypto');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const querystring = require('querystring');
const log4js = require('log4js');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { PDFDocument } = require('pdf-lib');

// 使用 multer 处理 multipart/form-data
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const upload = multer({ dest: 'uploads/' });
let isDev = false;

// 用于存储文件流的 Map
const fileMap = new Map();
// const clientMap = new Map();

// 创建一个自定义的 silent logger 配置
const logConfig = {
  appenders: {
    silent: { type: 'console' },
    access: { type: 'file', filename: 'httpAccess.log' }, // 记录HTTP请求的日志文件
    runLogs: { type: 'file', filename: 'runLogs.log' } // 记录运行日志
  },
  categories: {
    default: { appenders: ['silent'], level: 'OFF' },
    access: { appenders: ['access'], level: 'info' },
    runLogs: { appenders: ['runLogs'], level: 'info' }
  }
};

// 配置 log4js
log4js.configure(logConfig);

// 获取 logger 实例
const silentLogger = log4js.getLogger('silent');
const accessHttpLogger = log4js.getLogger('access');
const runLogs = log4js.getLogger('runLogs');


const app = express();
let port = 8080;
let client;
let serverUrl = 'http://service.vdaas.t.vtoone.com';


// 获取命令行参数
const args = process.argv.slice(2);

// 解析命令行参数
const portArgIndex = args.findIndex(arg => arg.startsWith('--port='));
if (portArgIndex !== -1) {
  port = args[portArgIndex].split('=')[1];
  console.log('修改运行端口Port:', port);
}

// 解析命令行参数
const DevArgIndex = args.findIndex(arg => arg.startsWith('--isDev='));
if (DevArgIndex !== -1) {
  isDev = args[DevArgIndex].split('=')[1];
  console.log('现在是开发模式');
}

// 解析命令行参数
const ServerUrlArgIndex = args.findIndex(arg => arg.startsWith('--serverUrl='));
if (ServerUrlArgIndex !== -1) {
  serverUrl = args[ServerUrlArgIndex].split('=')[1];
  console.log('服务端接口地址是：', serverUrl);
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
      // console.log('File sent successfully');
    }
  })
});

// 通知对应客户端更新消息
// const notifyClient = (fileId, data) => {
//   if (!!clientMap.get(fileId))
//     clientMap.get(fileId).write(`data: ${JSON.stringify(data)}\n\n`);
// };

app.all('/reportapi/:appCode/report/reportExportProgress/:fileId', (req, res) => {
  const fileId = req.params.fileId;
  res.setHeader('Content-Type', 'application/json');
  if (fileMap.get(fileId))
    try {
      res.json({
        curPageIndex: fileMap.get(fileId).curPageIndex,
        pageCounts: fileMap.get(fileId).pageCounts,
        progress: Math.round((fileMap.get(fileId).curPageIndex / fileMap.get(fileId).pageCounts).toFixed(2) * 100),
        success: true
      })
    } catch (err) {
      res.json({
        message: `查询进度异常：${typeof err === 'string' ? err : err.message}`,
        success: false
      })
      runLogs.error(`导出PDF失败:${err}`);
    }
  else {
    res.json({
      message: '没找到fileId对应的导出进程,请检查参数是否正确',
      success: false
    })
  }
})



// app.all('/reportapi/:appCode/report/reportExportStreamProgress/:fileId', (req, res) => {
//   const fileId = req.params.fileId;
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');
//   clientMap.set(fileId, res);
//   if (fileMap.get(fileId))
//     try {
//       const data = {
//         curPageIndex: fileMap.get(fileId).curPageIndex,
//         pageCounts: fileMap.get(fileId).pageCounts,
//         progress: Math.round((fileMap.get(fileId).curPageIndex / fileMap.get(fileId).pageCounts).toFixed(2) * 100),
//         success: true
//       }
//       res.write(`data : ${JSON.stringify(data)}\n\n`)
//     } catch (err) {
//       const errData = {
//         message: `查询进度异常：${typeof err === 'string' ? err : err.message}`,
//         success: false
//       }
//       res.write(`data : ${JSON.stringify(errData)}\n\n`);
//       runLogs.error(`导出PDF失败:${err}`);
//       // res.end();
//     }
//   else {
//     const errData = {
//       message: '没找到fileId对应的导出进程,请检查参数是否正确',
//       success: false
//     }
//     res.write(`data : ${JSON.stringify(errData)}\n\n`);
//     // res.end();
//   }
//   // 处理客户端断开连接
//   req.on('close', () => {
//     res.end();
//     clientMap.delete(fileId);
//   });
// })

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


app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // console.log("存文件时间:", new Date().toString());

  const fileId = req.body.fileId; // 使用文件名作为唯一标识符
  // const fileBuffer = req.file.buffer;

  // 将 buffer 转换为可读流并存储在 Map 中
  // const readableStream = new Readable();
  // readableStream._read = () => {}; // _read 是必需的，但我们不需要实际实现它
  // readableStream.push(fileBuffer);
  // readableStream.push(null); // 无更多数据
  // fileStreams.set(fileId, readableStream);

  // const targetPath = path.join(__dirname, 'uploads', fileId);
  //  fileStreams.set(fileId, fileId);
  if (!fileMap.get(fileId) || !fileMap.get(fileId).filePath)
    fileMap.set(fileId, {
      filePath: [req.file.path],
      pageCounts: req.body.pageCounts,
      curPageIndex: req.body.pageIndex
    });
  else
    fileMap.set(fileId, {
      filePath: fileMap.get(fileId).filePath.concat(req.file.path),
      pageCounts: req.body.pageCounts,
      curPageIndex: req.body.pageIndex
    });
  res.json({
    fileId,
  })
  // if (req.body.pageCounts !== req.body.pageIndex)
  //   notifyClient(fileId, {
  //     curPageIndex: fileMap.get(fileId).curPageIndex,
  //     pageCounts: fileMap.get(fileId).pageCounts,
  //     progress: Math.round((fileMap.get(fileId).curPageIndex / fileMap.get(fileId).pageCounts).toFixed(2) * 100),
  //     success: true
  //   })
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
app.get('/reportapi/:appCode/report/exportPdf', async (req, res) => {
  // 如果没有传入fileId 则生成一个
  const fileId = req.query.fileId ?? uuidv4()
  try {
    if (!!req.query.fileId && Array.isArray(req.query.fileId))
      throw new Error("只能接受一个fileId,请重新确定参数再重试")
    if (!!req.query.fileId && !!fileMap.get(req.query.fileId))
      throw new Error("当前文件ID正在导出进程中，请切换文件ID再重试")


    fileMap.set(fileId, {
      pageCounts: 1,
      curPageIndex: 0,
    });
    // console.log("开始的时间是:", new Date().toString());
    let fileName = req.query.fileName;
    const appCode = req.params.appCode;
    const queryParams = querystring.stringify(req.query);
    // console.log("queryParams", queryParams);
    if (!fileName && !!req.query.reportTitle) // 不传fileName 则取reportTitle
      fileName = decodeURIComponent(req.query.reportTitle)
    else if (!fileName)
      fileName = '未命名'
    let page;
    accessHttpLogger.info(`${req.method} ${req.url}`); // 记录HTTP请求方法和URL
    return new Promise(async (resolve, reject) => {

      if (!browser) return;
      // 打开一个新页面
      page = await browser.newPage();
      //  const pages =  await browser.pages()
      //   console.log("打开一个新页面",pages);

      const exportPDF = (fileId) => {
        // console.log("有人调用 exportPDF 方法了");
        resolve(fileId);
      };

      //   添加方法
      await page.exposeFunction("exportPDFServer", (path) => exportPDF(path));
      await page.exposeFunction("getFileName", () => `${fileName}_${new Date().getTime()}`);;
      await page.exposeFunction("exportPDFServerError", (err) => {
        reject(err);
        runLogs.error(`导出PDF失败:${err}`);
      });

      // 访问指定的网址
      await page.goto(`${req.protocol}://localhost:${port}/?${queryParams}&appcode=${appCode}${!req.query.fileId ? `&fileId=${fileId}` : ''}`);

      // Set screen size
      // await page.setViewport({ width: 1080, height: 1024 });

      // 直接在上下文执行，不需要通过选择器，简单理解，上下文就是 puppeteer 内核浏览器的控制台
      // page.evaluate(() => {
      //   console.log("puppeteer 内核浏览器");
      //   exportPDF("/img/test");
      // });


    }).then(async (fileId) => {
      // console.log("进到导出最后操作用时间:", new Date().toString());
      const { filePath } = fileMap.get(fileId);
      if (!filePath) {
        runLogs.error(`导出PDF失败：${fileId} 文件不存在`);
        res.json({
          message: `导出PDF失败：${fileId} 文件不存在`,
          success: false
        });
        return;
      }
      let lastPath = filePath[0];
      if (filePath.length > 1) {
        const mergedPdf = await PDFDocument.create();
        for (const pdf of filePath) {
          const pdfBytes = fs.readFileSync(pdf);
          const pdfDoc = await PDFDocument.load(pdfBytes);
          const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
          copiedPages.forEach((page) => {
            mergedPdf.addPage(page);
          });
        }
        const mergedPdfBytes = await mergedPdf.save();
        // 创建临时文件路径
        const mergedPdfPath = path.join(__dirname, 'uploads', fileId + '.pdf');
        fs.writeFileSync(mergedPdfPath, mergedPdfBytes);
        lastPath = mergedPdfPath;
      }
      const stream = fs.createReadStream(lastPath);
      const { md5Hash } = await getFileMD5(lastPath)
      const fileStat = fs.statSync(lastPath);
      // 输出数据 MD5 哈希值
      res.setHeader('X-MD5-Hash', md5Hash);
      // console.log('MD5 哈希值:', md5Hash);
      res.setHeader('Content-Length', fileStat.size);
      // 将流管道连接到响应
      stream.pipe(res);
      // 当可读流读取完所有数据时触发
      stream.on('end', () => {
        // console.log('数据读取完成，关闭可读流');
        // 在 'end' 事件触发后关闭可读流
        !isDev && page.close();
        stream.destroy();
        // notifyClient(fileId, {
        //   curPageIndex: fileMap.get(fileId).curPageIndex,
        //   pageCounts: fileMap.get(fileId).pageCounts,
        //   progress: 100,
        //   success: true
        // })
        // clientMap.get(fileId) && clientMap.get(fileId).end();
        fileMap.delete(fileId);
        fs.rmSync(lastPath);
        if (filePath.length > 1)
          for (let item of filePath) {
            fs.rmSync(item)
          }
        runLogs.info(`导出PDF成功：${fileName}.pdf`);
        // console.log("完成时间是:", new Date().toString());
      });
      // 设置响应头，指定内容类型和文件名
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(fileName)}.pdf"`); // 文件名

    }).catch((err) => {
      res.setHeader('Content-Type', 'application/json');
      res.json({
        message: '导出PDF失败,请检查参数是否正确',
        errDesc: typeof err === 'string' ? err : err.message,
        success: false
      })
      handleError(err, fileId);
    })
  } catch (err) {


    res.setHeader('Content-Type', 'application/json');
    res.json({
      message: '导出PDF失败,请检查参数是否正确',
      errDesc: typeof err === 'string' ? err : err.message,
      success: false
    })
    handleError(err, fileId);
    // res.status(500).end();
  }
})

// 异常处理
const handleError = (err, fileId) => {
  if (!!fileId) {

    const { filePath } = fileMap.get(fileId) ?? { filePath: [] };
    if (Array.isArray(filePath) && filePath.length > 1)
      for (let item of filePath) {
        fs.rmSync(item)
      }
    // notifyClient(fileId, {
    //   message: '导出PDF失败,请检查参数是否正确',
    //   errDesc: typeof err === 'string' ? err : err.message,
    //   success: false
    // })
    fileMap.delete(fileId);
  }
  runLogs.error(`导出PDF失败:${err}`);
}

// 本地测试需要跨域中间件代理
let proxyMiddleware = createProxyMiddleware({
  // 目标服务器地址
  target: `${serverUrl}/sysapi`,
  // 修改响应头，确保只允许来自指定来源的请求
  changeOrigin: true,
  // 重写响应头，只允许一个 Origin
  onProxyRes: function (proxyRes) {
    proxyRes.headers['Access-Control-Allow-Origin'] = `http://localhost:${port}`;
  }
});

// 使用代理中间件
app.use('/sysapi', proxyMiddleware);


app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  browser = await puppeteer.launch({ headless: !isDev ? true : false, timeout: 60000, args: ['--no-sandbox'], })
});

app.on('close', async () => {
  console.log(`Server close`);
  await browser.close();
  // deregister instance
  await client.deregisterInstance(serviceName, {
    ip: UserData_MyselfIp,
    port,
  });
})



// 读取文件内容并计算 MD5 哈希值
function getFileMD5(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5');
    const stream = fs.createReadStream(filePath);

    stream.on('data', (chunk) => {
      hash.update(chunk);
    });

    stream.on('end', () => {
      const md5Hash = hash.digest('hex');
      resolve({ md5Hash });
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
}

