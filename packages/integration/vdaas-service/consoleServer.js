const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const port = 3002;

let serverUrl = 'http://test.console.vdaas.t.vtoone.com';

// 设置 Express 使用静态文件目录
app.use(express.static(path.join(__dirname, '../vdaas-console/resources/page/vdaas/spreadsheet')));

// 本地测试需要跨域中间件代理
let proxyMiddleware = createProxyMiddleware({
  // 目标服务器地址
  target: `${serverUrl}/webapi`,
  // 修改响应头，确保只允许来自指定来源的请求
  changeOrigin: true,
  // 重写响应头，只允许一个 Origin
  onProxyRes: function (proxyRes) {
    proxyRes.headers['Access-Control-Allow-Origin'] = `http://localhost:${port}`;
  }
});

// 使用代理中间件
app.use('/webapi', proxyMiddleware);


app.get('/designer', (req, res) => {
  res.sendFile(path.join(__dirname, '../vdaas-console/resources/page/vdaas/spreadsheet/designer', 'index.html'));
});

app.get('/view', (req, res) => {
  res.sendFile(path.join(__dirname, '../vdaas-console/resources/page/vdaas/spreadsheet/view', 'index.html'));
});


app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
})