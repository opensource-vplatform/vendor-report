const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const port = 3001;

let serverUrl = 'http://service.vdaas.t.vtoone.com';

// 设置 Express 使用静态文件目录
app.use(express.static(path.join(__dirname, '../vdass-web/resources/static/vdaasweb/spreadsheet')));

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

let proxyPDFMiddleware = createProxyMiddleware({
  // 目标服务器地址
  target: `http://localhost:3000/reportapi`,
  // 修改响应头，确保只允许来自指定来源的请求
  changeOrigin: true,
  // 重写响应头，只允许一个 Origin
  onProxyRes: function (proxyRes) {
    proxyRes.headers['Access-Control-Allow-Origin'] = `http://localhost:${port}`;
  }
});

// 使用代理中间件
app.use('/reportapi', proxyPDFMiddleware);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../vdass-web/resources/static/vdaasweb/spreadsheet', 'view.html'));
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
})