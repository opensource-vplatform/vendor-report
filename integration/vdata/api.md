# 数据源类型

types = [{
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
    },
];

## 1, 数据源定义接口返回数据格式
入参：
1、id：报表id值
返回值：
{
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
}

## 2, 报表保存接口格式
入参：
1、id:string, //报表id值
2、config: string, //报表配置数据
返回值：
{
	success：true，//是否保存成功，如未成功，将异常信息写入message属性值中
	message: string
}
## 3、报表预览
参数：
1、id，报表id值
返回值: 
{
    config: //如2中入参描述的config属性值
    data: {
        code: 'code001',
        age: 18,
        sales: [{
                order_num: 1,
                order_date: 20240311
            }
        ]
    }
}
