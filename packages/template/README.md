# 报表自定义开发

报表二次开发

## 项目结构介绍
```js
|-public
|-src//二次开发源码目录
  |-data
    |-config.json
    |-data.json
  |-app.js
  |-dev.js //本地运行时
  |-index.js
|-index.html
|-vite.config.build.dev.js
|-vite.config.build.js
|-vite.config.js
```
- public  前端静态资源目录，如css文件、图片等等
- src  二次开发源码目录
- - data 配置数据
    - config.json 报表设计器配置数据
    - data.json 报表预览数据，方便本地开发预览
  - app.js 本地开发环境与二开代码集成逻辑
  - dev.js 报表与二开代码集成逻辑
  - index.js 二次开发入口文件
- index.html 访问入口文件
- package.json Nodejs插件配置文件
- vite.config.build.dev.js 二次开发代码构建配置文件
- vite.config.build.js 项目构建配置文件
- vite.config.js 本地开发服务配置文件

## 如何进行二次开发？

当用户在报表设计器中设计完报表点击保存后，报表设计器将配置数据生成一份[json数据](src/data/config.json)。本地二开环境启动后，会先解析此份配置数据，再结合[测试数据](src/data/data.json)生成报表，用户在此报表上进行二次开发。

### 初始化二开环境
在根目录下执行：
```sh
npm i
#或
yarn 
#或
pnpm i
```
### 启动本地测试环境
待二开环境初始化完成后，在根目录下执行：
```sh
npm run dev
```
本地环境启动完成后，在浏览器中打开控制台输出的链接地址，即可访问测试环境。当用户更改源码时，浏览器将实时刷新，更新最新源码。
### 编写二开代码
打开src/index.js文件，在ready回调函数中编写二开代码，ready函数入参为workbook实例，其详细api请参考[API文档](https://demo.grapecity.com.cn/spreadjs/help/api/classes/GC.Spread.Sheets.Workbook)。

## 二开代码如何使用？
目前二开报表使用方式有两种:
- 完全独立控制
- 导入到VDAAS平台
下面将详细介绍两种使用方式，
### 完全独立控制
此方式最终将生产前端需要的相关js、css、html等静态文件，用户只需要将这些静态文件拷贝到项目实际环境中即可使用。但需要注意的是，使用此方式需要处理两个额外的地方：
#### 许可证

#### 报表数据获取 