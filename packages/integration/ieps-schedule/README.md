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
- vite.config.build.js 项目构建配置文件
- vite.config.js 本地开发服务配置文件

## 如何进行二次开发？

当用户在报表设计器中设计完报表点击保存后，报表设计器将配置数据生成一份[json数据](src/data/config.json)。本地二开环境启动后，会先解析此份配置数据，再结合[测试数据](src/data/data.json)生成报表，用户在此报表上进行二次开发。

### 初始化二开环境
在二次开发前，需要初始化环境，在根目录下执行：
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
本地环境启动完成后，在浏览器中打开控制台输出的链接地址，即可访问本地验证环境。当用户更改源码时，浏览器将实时热更新，更新最新源码，方便进行代码验证。

### 编写二开代码
打开[src/index.js](src/index.js)文件，在ready回调函数中编写二开代码，ready函数入参为workbook实例，其详细api请参考[API文档](https://demo.grapecity.com.cn/spreadjs/help/api/classes/GC.Spread.Sheets.Workbook)。

#### 如何获取数据集数据
报表在执行ready回调函数时，已经将报表中用到的数据集数据应用到报表中了，如果需要获取额外的数据集数据，在二开实例初始化时传递数据集编码，在ready回调函数入参中获取即可，样例代码如下：
```js
new TOONE.Report.Dev({
        datasources:["dsCode1"],
        ready: function (workbook,context) {
          const datas = context.datas;
          const result = datas[dsCode1];//获取dsCode1数据集数据
        }
})
      
```
注意，上面样例中，如果想要在本地测试环境获取到测试数据，需要在[data.json](src/data/data.json)文件添加测试数据，样例如下：
```js
{
  ...//其他数据集测试数据,
  "dsCode1":[{"field1":"value1"}]
}
```

## 二开代码如何使用？
本地二次开发完成后，需要在根目录执行以下命令：
```sh
npm run build
```
待命令执行完成后，将在dist目录下生成一个dev-**.js文件，回到[vdaas环境](http://console.vdaas.t.vtoone.com/)中，选择对应的报表，在更多菜单中选择导入二次开发选中，选择dev-**.js文件即可。