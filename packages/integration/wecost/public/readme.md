本文档主要描述如何跟V-DaaS产品进行集成。本文档用到的方法名，入参名，入参数量等都是作为示例使用，项目应该根据命名规范进行命名。集成详细如下：

# 集成报表设计器

应用系统直接打开designer.html页面，如果为修改报表，则须传递报表id值，例：

```url
http://**/designer.html?id=[报表id]
```

## 报表数据源枚举类型

```json
[{
    value: 'text',
    text: '文本'
}, {
    value: 'integer',
    text: '整数'
}, {
    value: 'decimals',
    text: '小数'
}, {
    value: 'table|query|api',
    text: '表'
}]
```

## 设计器与V-DaaS集成api说明

### 1，获取报表数据源元信息

#### 调用URL：

> http://localhost/webapi/innersysapi/VDassDbmsConsole/report?operate=queryMetadatas&id=14c24a69a00c417c870525dc8d07e857

#### 入参：

> id为报表ID

#### 返回值：

```json
{
    "msg": "",
    "data": {
        "success": true,
        "define": [
            {
                "code": "sys_user",
                "children": [
                    {
                        "code": "id",
                        "name": "id",
                        // char、text、number、integer、date、longDate、boolean
                        "type": "char",
                        "desc": ""
                    },
                    {
                        "code": "account_name",
                        "name": "account",
                        "type": "char",
                        "desc": ""
                    }
                ],
                "name": "sys_user",
                // model：实体、view：视图
                "type": "mode",
                "desc": ""
            }
        ],
        "message": "操作成功",
        "status": 200,
        "timestamp": 1714010009532
    },
    "success": true
}
```

### 2，获取报表数据信息

#### 调用URL：

> http://localhost/webapi/innersysapi/VDassDbmsConsole/report?operate=queryReportConfig&id=14c24a69a00c417c870525dc8d07e857

#### 入参：

> id为报表ID（必填）

#### 返回值：

```json
{
    "msg": "",
    "data": {
        "success": true,
        "message": "操作成功",
        "status": 200,
        "timestamp": 1714010009532,
        "data": {
            "id": "xx",
            "config": "xx",
            "requestTables": "xx",
            "icon": "xx",
            "preview": "xx"
        }
    },
    "success": true
}
```

### 3，保存报表配置信息

#### 调用URL：

> http://localhost/webapi/innersysapi/VDassDbmsConsole/report?operate=saveReportConfig

#### 入参（Post请求）：

```json
{
    "id": string,//报表id
    "config": string,//报表配置数据
    "requestTables":string,//报表用到的实体编号，多个以逗号分割
    "icon":string,//报表微缩图
    "preview":string,//报表预览图
}
```

#### 返回值：

```json
{
    "msg": "",
    "data": {
        "success": true,
        "message": "操作成功",
        "status": 200,
        "timestamp": 1714010009532,
        "data": {
            "id": "xx"
        }
    },
    "success": true
}
```

### 4，获取实体数据（待定）

#### 方法名：getTableData

#### 入参：

```json
{
    "requestTables":string,//报表用到的实体编号，多个以逗号分割
}
```

#### 返回值：

```json
{
    success：true,  //是否保存成功，如未成功，将异常信息写入message属性值中
    message: string,
    data:{  
        sales: [{
            order_num: 1,
            order_date: 20240311  
        }],
        sales1：[{
            order_num: 1,
            order_date: 20240311
        }]
    }
}
```