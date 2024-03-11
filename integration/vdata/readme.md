本文档主要描述如何跟vdata产品进行集成，集成详细如下：
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
    value: 'table',
    text: '表'
}]
```
## 设计器与VData集成api说明

### 获取获取报表配置信息和数据源定义信息
#### 入参：
1、id：报表id值
#### 返回值：
```json
{
    success:true,
    data:{
        id:string,//报表id值
        define:{//定义信息
            table:[{//表定义信息
                "type": 'text', //如types中枚举的value值
                "desc": "编码唯一",
                "code": 'code', //唯一
                "name": '编码',
            }, {
                "type": 'integer', //如types中枚举的值
                "desc": "年龄不能小于0",
                "code": 'age', //唯一
                "name": '年龄',
            }, {
                "type": "table",
                "desc": "销售明细",
                "code": "sales",
                "name": "销售明细",
                "children": [//只有type等于table，才有children属性；children不能定义类型为table的数据源
                    {
                        "type": "text",
                        "desc": "订单编号",
                        "code": "order_num",
                        "name": "订单编号"
                    }, {
                        "type": "text",
                        "desc": "订购日期",
                        "code": "order_date",
                        "name": "订购日期",
                    },
                ]
            }]
        },
        config:string,//可选，报表配置数据
        data:{//可选，如果有值，报表设计器中点击预览，则使用该数据
            code: 'code001',
            age: 18,
            sales: [{
                    order_num: 1,
                    order_date: 20240311
                }
            ]
        }
    },
    message:
}
```

### 保存报表配置信息
#### 入参：
1、id:string, //报表id值
2、config: string, //报表配置数据
#### 返回值：
```json
{
	success：true，//是否保存成功，如未成功，将异常信息写入message属性值中
	message: string
}
```
# 集成报表预览
应用系统直接打开report.html页面，须传递报表id值,例：
```url
http://**/report.html?id=[报表id]
```

## 报表预览与VData集成api说明

### 预览报表
#### 参数：
1、id，报表id值
#### 返回值: 
```json
{
    success:false
    data:{
        config: string,//如2中入参描述的config属性值
        data: {
            code: 'code001',
            age: 18,
            sales: [{
                    order_num: 1,
                    order_date: 20240311
                },{
                    
                }
            ],
            sales1:[]
        }
    }
    message:"asdfasdf"
}

```