# 说明

本目录存放计量支付验证场景

# 场景返回说明

1、每个测试场景单独建立一个js文件
2、js文件到处配置说明
```javascript
{
    "title":"",//测试场景标题
    "configResponse":Object,//报表配置请求响应数据
    "dataResponse":Object,//报表数据请求响应数据
    "spreadJson":Object,//spread表格toJSON接口返回数据
}
```