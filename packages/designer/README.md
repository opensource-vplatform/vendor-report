# reportDesignerOptions

## 导航(nav)

类型：Boolean 或 navOptions

说明：用于控制导航是否显示。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
//情况1
new ReportDesigner({
    nav:false 
})
//情况2
new ReportDesigner({
    nav:{
        file:false,
        ...
    } 
})
```

## 导航文件(nav.file)

类型：Boolean 或 fileOptions

说明：用于控制文件导航是否显示。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
//情况1
new ReportDesigner({
    nav:{
        file:false,
        ...
    } 
})

//情况2
new ReportDesigner({
    nav:{
        file:{
          import:false,
          ...
        },
        ...
    } 
})
```

### 导入(nav.file.import)

类型：Boolean 

说明：用于控制文件导航【导入】菜单是否显示。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
new ReportDesigner({
    nav:{
        file:{
          import:false,
          ...
        },
        ...
    } 
})
```

### 导出(nav.file.export)

类型：Boolean

说明：用于控制文件导航【导出】菜单是否显示。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
new ReportDesigner({
    nav:{
        file:{
          export:false,
          ...
        },
        ...
    } 
})
```



### 打印(nav.file.print)

类型：Boolean

说明：用于控制文件导航【打印】菜单是否显示。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
new ReportDesigner({
    nav:{
        file:{
          print:false,
          ...
        },
        ...
    } 
})
```

## 导航开始(nav.start)

类型：Boolean 或 startOptions

说明：用于控制开始导航是否显示。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
//情况1
new ReportDesigner({
    nav:{
        start:false,
        ...
    } 
})

//情况2
new ReportDesigner({
    nav:{
        start:{
          font:false,
          ...
        },
        ...
    } 
})
```

### 字体(nav.start.font)

类型：Boolean

说明：用于控制开始导航【字体】是否显示。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
new ReportDesigner({
    nav:{
        start:{
          font:false,
          ...
        },
        ...
    } 
})
```



### 区中(nav.start.align)

类型：Boolean

说明：用于控制开始导航【区中】是否显示。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
new ReportDesigner({
    nav:{
        start:{
          align:false,
          ...
        },
        ...
    } 
})
```

## 导航公式(nav.formula)

类型：Boolean 或 formulaOptions

说明：用于控制公式导航是否显示。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
//情况1
new ReportDesigner({
    nav:{
        formula:false,
        ...
    } 
})

//情况2
new ReportDesigner({
    nav:{
        formula:{
          library:false,
          ...
        },
        ...
    } 
})
```

### 函数库(nav.formula.library)

类型：Boolean

说明：用于控制公式导航【函数库】是否显示。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
new ReportDesigner({
    nav:{
        formula:{
          library:false,
          ...
        },
        ...
    } 
})
```



### 计算(nav.formula.calculation)

类型：Boolean

说明：用于控制公式导航【计算】是否显示。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
new ReportDesigner({
    nav:{
        formula:{
          calculation:false,
          ...
        },
        ...
    } 
})
```

## 导航数据(nav.data)

类型：Boolean

说明：用于控制数据导航是否显示。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
new ReportDesigner({
    nav:{
        data:false
        ...
    } 
})
```



## 导航视图(nav.view)

类型：Boolean 或 viewOptions

说明：用于控制视图导航是否显示。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
//情况1
new ReportDesigner({
    nav:{
        view:false,
        ...
    } 
})
//情况2
new ReportDesigner({
    nav:{
        view:{
          display:false,
          ...
        },
        ...
    } 
})
```

### 显示/隐藏(nav.view.display)

类型：Boolean

说明：用于控制视图导航【显示/隐藏】是否显示。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
new ReportDesigner({
    nav:{
        view:{
            display:false
        },
        ...
    } 
})
```

### 显示比例(nav.view.ratio)

类型：Boolean

说明：用于控制视图导航【显示比例】是否显示。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
new ReportDesigner({
    nav:{
        view:{
            ratio:false
        },
        ...
    } 
})
```

## 导航表设计(nav.table)

类型：Boolean 或 tableOptions

说明：用于控制表设计导航是否显示。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
//情况1
new ReportDesigner({
    nav:{
        table:false,
        ...
    } 
})
//情况2
new ReportDesigner({
    nav:{
        table:{
          tableOptions:false,
          ...
        },
        ...
    } 
})
```

### 表格选项(nav.table.tableOptions)

类型：Boolean

说明：用于控制表设计导航【表格选项】是否显示。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
new ReportDesigner({
    nav:{
        table:{
          tableOptions:false,
          ...
        },
        ...
    } 
})
```

### 表格样式(nav.table.tableStyle)

类型：Boolean

说明：用于控制表设计导航【表格样式】是否显示。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
new ReportDesigner({
    nav:{
        table:{
          tableStyle:false,
          ...
        },
        ...
    } 
})

```

## 数据源(dataSource)

类型：dataSourceOptions

说明：用于定义数据源，是否查看数据源以及编辑数据等

代码示例：无

### 数据源(dataSource.dataSourceDefinition)

类型：Array<Object>

说明：用于定义数据源
代码示例：

```
new ReportDesigner({
    dataSource:{
        dataSourceDefinition:[{
             {
                id: 1,
                type: 'text',
                typeName: '文本',
                desc: '名称必填',
                code: 'name',
                name: '名称',
            },
        }],
        ...
    } 
})
```

其中，id和code必须唯一；type值：text(文本),integer(整数),decimals(小数),table(表)

### 是否允许查看(dataSource.allowToView)

类型：Boolean

说明：是否允许查看数据源。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
new ReportDesigner({
    dataSource:{
        allowToView:false,
        ...
    } 
})
```

### 是否允许编辑(dataSource.allowToEdit)

类型：Boolean

说明：是否允许编辑数据源。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
new ReportDesigner({
    dataSource:{
        allowToEdit:false,
        ...
    } 
})
```

## 表单(sheets)

类型：sheetOptions

说明：用于设置是否允许添加表单选项卡，是否允许编辑表单选项卡等

代码示例：无

### 添加(sheets.newTabVisible)

类型：Boolean

说明：用于设置是否显示添加表单选项卡。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
new ReportDesigner({
    sheets:{
        newTabVisible:false,
        ...
    } 
})
```

### 编辑(sheets.tabEditable)

类型：Boolean

说明：用于设置是否允许编辑选项卡。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
new ReportDesigner({
    sheets:{
        tabEditable:false,
        ...
    } 
})
```



### 显示(sheets.tabStripVisible)

类型：Boolean

说明：用于设置是否显示选项卡。默认值是true。值等于false不显示，反之亦然。

代码示例：

```
new ReportDesigner({
    sheets:{
        tabStripVisible:false,
        ...
    } 
})
```

## 事件(event)

类型：eventOptions

说明：用于订阅相关的事件

代码示例：无

### 保存(event.onSave)

类型：Function

说明：用于订阅保存事件

代码示例

```
new ReportDesigner({
    event:{
        onSave(info){
            console.log(info)
        },
        ...
    } 
})
```
