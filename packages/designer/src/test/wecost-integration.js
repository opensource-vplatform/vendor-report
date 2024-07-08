const datasourceMetadata = [
    {
      "code": "GY01Param",
      "name": "总预算表",
      "type": "table",
      "children": [
        { "desc": "", "code": "projectCode", "name": "项目编号", "type": "text" },
        {
          "desc": "",
          "code": "projectName",
          "name": "建设项目名称",
          "type": "text"
        },
        { "desc": "", "code": "scope", "name": "编制范围", "type": "text" },
        { "desc": "", "code": "editor", "name": "编制", "type": "text" },
        { "desc": "", "code": "reviewer", "name": "复核", "type": "text" },
        { "desc": "", "code": "auditor", "name": "审核", "type": "text" }
      ]
    },
    {
      "code": "GY01Model",
      "name": "总预算表明细",
      "type": "table",
      "children": [
        { "desc": "", "code": "subProjNo", "name": "分项编号", "type": "text" },
        {
          "desc": "",
          "code": "subProjName",
          "name": "工程或费用名称",
          "type": "text"
        },
        { "desc": "", "code": "unit", "name": "单位", "type": "text" },
        { "desc": "", "code": "amount", "name": "数量", "type": "decimals" },
        { "desc": "", "code": "money", "name": "金额(元)", "type": "decimals" },
        {
          "desc": "",
          "code": "indicator",
          "name": "技术经济指标",
          "type": "decimals"
        },
        {
          "desc": "",
          "code": "ratio",
          "name": "各项费用比例(%)",
          "type": "decimals"
        },
        { "desc": "", "code": "remark", "name": "备注", "type": "text" }
      ]
    },
    {
      "code": "BB04_4Param",
      "name": "标表4-4单价分析表(08表合计格式)",
      "type": "table",
      "children": [
        { "desc": "", "code": "listNo", "name": "清单编号", "type": "text" },
        { "desc": "", "code": "unit", "name": "计量单位", "type": "text" },
        { "desc": "", "code": "amount", "name": "数量", "type": "decimals" },
        { "desc": "", "code": "tenderer", "name": "投标人", "type": "text" },
        {
          "desc": "",
          "code": "authorRepresentative",
          "name": "投标人授权代表",
          "type": "text"
        }
      ]
    }
  ]
 
  const testData = {
    "tableMetadata": [{
            "code": "GY01Param",
            "name": "总预算表",
            "type": "table",
            "children": [{
                    "desc": "",
                    "code": "projectCode",
                    "name": "项目编号",
                    "type": "text"
                }, {
                    "desc": "",
                    "code": "projectName",
                    "name": "建设项目名称",
                    "type": "text"
                }, {
                    "desc": "",
                    "code": "scope",
                    "name": "编制范围",
                    "type": "text"
                }, {
                    "desc": "",
                    "code": "editor",
                    "name": "编制",
                    "type": "text"
                }, {
                    "desc": "",
                    "code": "reviewer",
                    "name": "复核",
                    "type": "text"
                }, {
                    "desc": "",
                    "code": "auditor",
                    "name": "审核",
                    "type": "text"
                }
            ]
        }, {
            "code": "GY01Model",
            "name": "总预算表明细",
            "type": "table",
            "children": [{
                    "desc": "",
                    "code": "subProjNo",
                    "name": "分项编号",
                    "type": "text"
                }, {
                    "desc": "",
                    "code": "subProjName",
                    "name": "工程或费用名称",
                    "type": "text"
                }, {
                    "desc": "",
                    "code": "unit",
                    "name": "单位",
                    "type": "text"
                }, {
                    "desc": "",
                    "code": "amount",
                    "name": "数量",
                    "type": "decimals"
                }, {
                    "desc": "",
                    "code": "money",
                    "name": "金额(元)",
                    "type": "decimals"
                }, {
                    "desc": "",
                    "code": "indicator",
                    "name": "技术经济指标",
                    "type": "decimals"
                }, {
                    "desc": "",
                    "code": "ratio",
                    "name": "各项费用比例(%)",
                    "type": "decimals"
                }, {
                    "desc": "",
                    "code": "remark",
                    "name": "备注",
                    "type": "text"
                }
            ]
        }
    ],
    "excelJson": {
        "version": "17.0.5",
        "name": "",
        "sheetCount": 1,
        "showHorizontalScrollbar": false,
        "showVerticalScrollbar": false,
        "scrollbarShowMax": false,
        "tabStripVisible": false,
        "newTabVisible": false,
        "customList": [],
        "defaultSheetTabStyles": {},
        "sheets": {
            "Sheet1": {
                "name": "Sheet1",
                "isSelected": true,
                "rowCount": 6,
                "columnCount": 10,
                "activeRow": 3,
                "activeCol": 2,
                "zoomFactor": 1.9,
                "visible": 1,
                "theme": "Office",
                "data": {
                    "dataTable": {
                        "0": {
                            "0": {
                                "value": "表A.0.2-5 总预算表",
                                "style": {
                                    "hAlign": 1,
                                    "vAlign": 1,
                                    "font": "bold 16pt 宋体",
                                    "themeFont": "Body",
                                    "locked": true,
                                    "imeMode": 1,
                                    "fontWeight": "bold",
                                    "fontSize": "16pt",
                                    "fontFamily": "宋体"
                                }
                            },
                            "1": {
                                "style": {
                                    "vAlign": 1,
                                    "font": "bold 16pt 宋体",
                                    "fontWeight": "bold",
                                    "fontSize": "16pt",
                                    "fontFamily": "宋体"
                                }
                            },
                            "2": {
                                "style": {
                                    "vAlign": 1,
                                    "font": "bold 16pt 宋体",
                                    "fontWeight": "bold",
                                    "fontSize": "16pt",
                                    "fontFamily": "宋体"
                                }
                            },
                            "3": {
                                "style": {
                                    "vAlign": 1,
                                    "font": "bold 16pt 宋体",
                                    "fontWeight": "bold",
                                    "fontSize": "16pt",
                                    "fontFamily": "宋体"
                                }
                            },
                            "4": {
                                "style": {
                                    "vAlign": 1,
                                    "font": "bold 16pt 宋体",
                                    "fontWeight": "bold",
                                    "fontSize": "16pt",
                                    "fontFamily": "宋体"
                                }
                            },
                            "5": {
                                "style": {
                                    "vAlign": 1,
                                    "font": "bold 16pt 宋体",
                                    "fontWeight": "bold",
                                    "fontSize": "16pt",
                                    "fontFamily": "宋体"
                                }
                            },
                            "6": {
                                "style": {
                                    "vAlign": 1,
                                    "font": "bold 16pt 宋体",
                                    "fontWeight": "bold",
                                    "fontSize": "16pt",
                                    "fontFamily": "宋体"
                                }
                            },
                            "7": {
                                "style": {
                                    "vAlign": 1,
                                    "font": "bold 16pt 宋体",
                                    "fontWeight": "bold",
                                    "fontSize": "16pt",
                                    "fontFamily": "宋体"
                                }
                            },
                            "8": {
                                "style": {
                                    "vAlign": 1,
                                    "font": "bold 16pt 宋体",
                                    "fontWeight": "bold",
                                    "fontSize": "16pt",
                                    "fontFamily": "宋体"
                                }
                            },
                            "9": {
                                "style": {
                                    "vAlign": 1,
                                    "font": "bold 16pt 宋体",
                                    "fontWeight": "bold",
                                    "fontSize": "16pt",
                                    "fontFamily": "宋体"
                                }
                            }
                        },
                        "1": {
                            "0": {
                                "value": "建设项目名称：",
                                "style": {
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "1": {
                                "value": "[总预算表.建设项目名称]",
                                "style": {
                                    "hAlign": 0,
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "themeFont": "Body",
                                    "locked": true,
                                    "imeMode": 1,
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                },
                                "bindingPath": "GY01Param.projectName"
                            },
                            "2": {
                                "style": {
                                    "hAlign": 0,
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "3": {
                                "style": {
                                    "hAlign": 0,
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "4": {
                                "style": {
                                    "hAlign": 0,
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "5": {
                                "style": {
                                    "hAlign": 0,
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "6": {
                                "style": {
                                    "hAlign": 0,
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "7": {
                                "style": {
                                    "hAlign": 0,
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "8": {
                                "value": "01表",
                                "style": {
                                    "hAlign": 0,
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "themeFont": "Body",
                                    "locked": true,
                                    "imeMode": 1,
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            }
                        },
                        "2": {
                            "0": {
                                "value": "编制范围：",
                                "style": {
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "1": {
                                "value": "[总预算表.编制范围]",
                                "style": {
                                    "hAlign": 0,
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "themeFont": "Body",
                                    "locked": true,
                                    "imeMode": 1,
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                },
                                "bindingPath": "GY01Param.scope"
                            },
                            "2": {
                                "style": {
                                    "hAlign": 0,
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "3": {
                                "style": {
                                    "hAlign": 0,
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "4": {
                                "style": {
                                    "hAlign": 0,
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "5": {
                                "value": "第[函数(Fx)]页",
                                "style": {
                                    "hAlign": 0,
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                },
                                "formula": "CONCAT(\"第\",TOONE.PAGEINDEX(),\"页\")"
                            },
                            "6": {
                                "value": "共[函数(Fx)]页",
                                "style": {
                                    "hAlign": 0,
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                },
                                "formula": "CONCAT(\"共\",TOONE.PAGECOUNT(),\"页\")"
                            },
                            "7": {
                                "style": {
                                    "hAlign": 0,
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "8": {
                                "value": "01表",
                                "style": {
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            }
                        },
                        "3": {
                            "0": {
                                "value": "分项编号123",
                                "style": {
                                    "hAlign": 1,
                                    "vAlign": 1,
                                    "font": "bold 9pt Calibri",
                                    "borderLeft": {
                                        "style": 1
                                    },
                                    "borderTop": {
                                        "style": 1
                                    },
                                    "borderRight": {
                                        "style": 1
                                    },
                                    "borderBottom": {
                                        "style": 1
                                    },
                                    "fontWeight": "bold",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "1": {
                                "value": "工程或费用名称232333",
                                "style": {
                                    "hAlign": 1,
                                    "vAlign": 1,
                                    "font": "bold 9pt Calibri",
                                    "borderLeft": {
                                        "style": 1
                                    },
                                    "borderTop": {
                                        "style": 1
                                    },
                                    "borderRight": {
                                        "style": 1
                                    },
                                    "borderBottom": {
                                        "style": 1
                                    },
                                    "fontWeight": "bold",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "2": {
                                "value": "单位11",
                                "style": {
                                    "hAlign": 1,
                                    "vAlign": 1,
                                    "font": "bold 9pt Calibri",
                                    "borderLeft": {
                                        "style": 1
                                    },
                                    "borderTop": {
                                        "style": 1
                                    },
                                    "borderRight": {
                                        "style": 1
                                    },
                                    "borderBottom": {
                                        "style": 1
                                    },
                                    "fontWeight": "bold",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                },
                                "bindingPath": "",
                                "tag": ""
                            },
                            "3": {
                                "value": "数量",
                                "style": {
                                    "hAlign": 1,
                                    "vAlign": 1,
                                    "font": "bold 9pt Calibri",
                                    "borderLeft": {
                                        "style": 1
                                    },
                                    "borderTop": {
                                        "style": 1
                                    },
                                    "borderRight": {
                                        "style": 1
                                    },
                                    "borderBottom": {
                                        "style": 1
                                    },
                                    "fontWeight": "bold",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "4": {
                                "value": "金额（元）",
                                "style": {
                                    "hAlign": 1,
                                    "vAlign": 1,
                                    "font": "bold 9pt Calibri",
                                    "borderLeft": {
                                        "style": 1
                                    },
                                    "borderTop": {
                                        "style": 1
                                    },
                                    "borderRight": {
                                        "style": 1
                                    },
                                    "borderBottom": {
                                        "style": 1
                                    },
                                    "fontWeight": "bold",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "5": {
                                "value": "技术经济指标",
                                "style": {
                                    "hAlign": 1,
                                    "vAlign": 1,
                                    "font": "bold 9pt Calibri",
                                    "borderLeft": {
                                        "style": 1
                                    },
                                    "borderTop": {
                                        "style": 1
                                    },
                                    "borderRight": {
                                        "style": 1
                                    },
                                    "borderBottom": {
                                        "style": 1
                                    },
                                    "fontWeight": "bold",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "6": {
                                "value": "各项费用比例(%)",
                                "style": {
                                    "hAlign": 1,
                                    "vAlign": 1,
                                    "font": "bold 9pt Calibri",
                                    "borderLeft": {
                                        "style": 1
                                    },
                                    "borderTop": {
                                        "style": 1
                                    },
                                    "borderRight": {
                                        "style": 1
                                    },
                                    "borderBottom": {
                                        "style": 1
                                    },
                                    "fontWeight": "bold",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "7": {
                                "value": "备注",
                                "style": {
                                    "hAlign": 1,
                                    "vAlign": 1,
                                    "font": "bold 9pt Calibri",
                                    "themeFont": "Body",
                                    "borderLeft": {
                                        "style": 1
                                    },
                                    "borderTop": {
                                        "style": 1
                                    },
                                    "borderRight": {
                                        "style": 1
                                    },
                                    "borderBottom": {
                                        "style": 1
                                    },
                                    "locked": true,
                                    "imeMode": 1,
                                    "fontWeight": "bold",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "8": {
                                "style": {
                                    "hAlign": 1,
                                    "vAlign": 1,
                                    "font": "bold 9pt Calibri",
                                    "borderLeft": {
                                        "style": 1
                                    },
                                    "borderTop": {
                                        "style": 1
                                    },
                                    "borderRight": {
                                        "style": 1
                                    },
                                    "borderBottom": {
                                        "style": 1
                                    },
                                    "fontWeight": "bold",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            }
                        },
                        "4": {
                            "0": {
                                "value": "[总预算表明细.subProjNo]",
                                "style": {
                                    "hAlign": 0,
                                    "vAlign": 1,
                                    "font": "9pt Calibri",
                                    "borderLeft": {
                                        "style": 1
                                    },
                                    "borderTop": {
                                        "style": 1
                                    },
                                    "borderRight": {
                                        "style": 1
                                    },
                                    "borderBottom": {
                                        "style": 1
                                    },
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                },
                                "bindingPath": "GY01Model.subProjNo"
                            },
                            "1": {
                                "value": "[总预算表明细.工程或费用名称]",
                                "style": {
                                    "hAlign": 0,
                                    "vAlign": 1,
                                    "font": "9pt Calibri",
                                    "borderLeft": {
                                        "style": 1
                                    },
                                    "borderTop": {
                                        "style": 1
                                    },
                                    "borderRight": {
                                        "style": 1
                                    },
                                    "borderBottom": {
                                        "style": 1
                                    },
                                    "wordWrap": true,
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                },
                                "bindingPath": "GY01Model.subProjName"
                            },
                            "2": {
                                "value": "[总预算表明细.单位]",
                                "style": {
                                    "hAlign": 1,
                                    "vAlign": 1,
                                    "font": "9pt Calibri",
                                    "formatter": "0.00_);-0.00",
                                    "borderLeft": {
                                        "style": 1
                                    },
                                    "borderTop": {
                                        "style": 1
                                    },
                                    "borderRight": {
                                        "style": 1
                                    },
                                    "borderBottom": {
                                        "style": 1
                                    },
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                },
                                "bindingPath": "GY01Model.unit",
                                "tag": ""
                            },
                            "3": {
                                "value": "[总预算表明细.数量]",
                                "style": {
                                    "hAlign": 2,
                                    "vAlign": 1,
                                    "font": "9pt Calibri",
                                    "formatter": "0.00;[Red]0.00",
                                    "borderLeft": {
                                        "style": 1
                                    },
                                    "borderTop": {
                                        "style": 1
                                    },
                                    "borderRight": {
                                        "style": 1
                                    },
                                    "borderBottom": {
                                        "style": 1
                                    },
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                },
                                "bindingPath": "GY01Model.amount",
                                "tag": ""
                            },
                            "4": {
                                "value": "[总预算表明细.金额(元)]",
                                "style": {
                                    "hAlign": 2,
                                    "vAlign": 1,
                                    "font": "9pt Calibri",
                                    "formatter": "0.00;[Red]0.00",
                                    "borderLeft": {
                                        "style": 1
                                    },
                                    "borderTop": {
                                        "style": 1
                                    },
                                    "borderRight": {
                                        "style": 1
                                    },
                                    "borderBottom": {
                                        "style": 1
                                    },
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                },
                                "bindingPath": "GY01Model.money",
                                "tag": ""
                            },
                            "5": {
                                "value": "[总预算表明细.技术经济指标]",
                                "style": {
                                    "hAlign": 2,
                                    "vAlign": 1,
                                    "font": "9pt Calibri",
                                    "formatter": "0.00;[Red]0.00",
                                    "borderLeft": {
                                        "style": 1
                                    },
                                    "borderTop": {
                                        "style": 1
                                    },
                                    "borderRight": {
                                        "style": 1
                                    },
                                    "borderBottom": {
                                        "style": 1
                                    },
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                },
                                "bindingPath": "GY01Model.indicator"
                            },
                            "6": {
                                "value": "[总预算表明细.各项费用比例(%)]",
                                "style": {
                                    "hAlign": 2,
                                    "vAlign": 1,
                                    "font": "9pt Calibri",
                                    "formatter": "0.00;[Red]0.00",
                                    "borderLeft": {
                                        "style": 1
                                    },
                                    "borderTop": {
                                        "style": 1
                                    },
                                    "borderRight": {
                                        "style": 1
                                    },
                                    "borderBottom": {
                                        "style": 1
                                    },
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                },
                                "bindingPath": "GY01Model.ratio"
                            },
                            "7": {
                                "value": "[总预算表明细.备注]",
                                "style": {
                                    "hAlign": 1,
                                    "vAlign": 1,
                                    "font": "9pt Calibri",
                                    "themeFont": "Body",
                                    "borderLeft": {
                                        "style": 1
                                    },
                                    "borderTop": {
                                        "style": 1
                                    },
                                    "borderRight": {
                                        "style": 1
                                    },
                                    "borderBottom": {
                                        "style": 1
                                    },
                                    "locked": true,
                                    "imeMode": 1,
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                },
                                "bindingPath": "GY01Model.remark"
                            },
                            "8": {
                                "style": {
                                    "vAlign": 1,
                                    "font": "9pt Calibri",
                                    "borderLeft": {
                                        "style": 1
                                    },
                                    "borderTop": {
                                        "style": 1
                                    },
                                    "borderRight": {
                                        "style": 1
                                    },
                                    "borderBottom": {
                                        "style": 1
                                    },
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            }
                        },
                        "5": {
                            "0": {
                                "value": "编制：",
                                "style": {
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "1": {
                                "style": {
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                },
                                "bindingPath": "",
                                "tag": ""
                            },
                            "2": {
                                "style": {
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "3": {
                                "style": {
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "4": {
                                "value": "复核：",
                                "style": {
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "5": {
                                "style": {
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "6": {
                                "style": {
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "7": {
                                "style": {
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            },
                            "8": {
                                "style": {
                                    "vAlign": 2,
                                    "font": "9pt Calibri",
                                    "fontSize": "9pt",
                                    "fontFamily": "Calibri"
                                }
                            }
                        }
                    },
                    "defaultDataNode": {
                        "style": {
                            "themeFont": "Body"
                        },
                        "tag": "{\"instanceId\":\"4igs7i4n7iezlms1rv65sr3fxmifkse1xlx2vhy2i\",\"isFillData\":true,\"pageArea\":\"5:5\",\"scaleType\":2}"
                    }
                },
                "rowHeaderData": {
                    "dataTable": {
                        "4": {
                            "0": {
                                "value": "C"
                            }
                        }
                    },
                    "defaultDataNode": {
                        "style": {
                            "themeFont": "Body"
                        }
                    }
                },
                "colHeaderData": {
                    "defaultDataNode": {
                        "style": {
                            "themeFont": "Body"
                        }
                    }
                },
                "rows": [{
                        "size": 43
                    }, null, null, {
                        "size": 26.315789473684212
                    }, {
                        "size": 28.947368421052634
                    }
                ],
                "columns": [{
                        "size": 92.63157894736842
                    }, {
                        "size": 180
                    }, {
                        "size": 45.26315789473684
                    }, {
                        "size": 66.31578947368422
                    }, {
                        "size": 66.31578947368422
                    }, {
                        "size": 67.89473684210526
                    }, {
                        "size": 67.89473684210526
                    }, {
                        "size": 33.68421052631579
                    }, {
                        "size": 33
                    }, {
                        "visible": false
                    }
                ],
                "defaultData": {},
                "leftCellIndex": 0,
                "topCellIndex": 0,
                "spans": [{
                        "row": 0,
                        "col": 0,
                        "rowCount": 1,
                        "colCount": 10
                    }, {
                        "row": 1,
                        "col": 1,
                        "rowCount": 1,
                        "colCount": 8
                    }, {
                        "row": 3,
                        "col": 7,
                        "rowCount": 1,
                        "colCount": 2
                    }, {
                        "row": 4,
                        "col": 7,
                        "rowCount": 1,
                        "colCount": 2
                    }
                ],
                "selections": {
                    "0": {
                        "row": 3,
                        "col": 2,
                        "rowCount": 1,
                        "colCount": 1
                    },
                    "length": 1
                },
                "rowOutlines": {
                    "items": []
                },
                "columnOutlines": {
                    "items": []
                },
                "cellStates": {},
                "states": {},
                "rowFilter": {
                    "typeName": "HideRowFilter",
                    "dialogVisibleInfo": {},
                    "filterButtonVisibleInfo": {
                        "0": true,
                        "1": true,
                        "2": true,
                        "3": true,
                        "4": true,
                        "5": true,
                        "6": true,
                        "7": true,
                        "8": true,
                        "9": true,
                        "10": true,
                        "11": true,
                        "12": true,
                        "13": true,
                        "14": true,
                        "15": true,
                        "16": true,
                        "17": true,
                        "18": true,
                        "19": true
                    },
                    "showFilterButton": true,
                    "filteredOutRows": []
                },
                "outlineColumnOptions": {},
                "autoMergeRangeInfos": [],
                "shapeCollectionOption": {
                    "snapMode": 0
                },
                "names": [{
                        "name": "Print_Area",
                        "formula": "Sheet1!$A$1:$K$7",
                        "row": 0,
                        "col": 0,
                        "isReadOnly": false
                    }
                ],
                "printInfo": {
                    "showBorder": false,
                    "showColumnHeader": 1,
                    "showRowHeader": 1,
                    "centering": 1,
                    "firstPageNumber": 1,
                    "pageHeaderFooter": {
                        "normal": {
                            "header": {
                                "left": "",
                                "leftImage": "",
                                "center": "",
                                "centerImage": "",
                                "right": "",
                                "rightImage": ""
                            },
                            "footer": {
                                "left": "",
                                "leftImage": "",
                                "center": "",
                                "centerImage": "",
                                "right": "",
                                "rightImage": ""
                            }
                        }
                    },
                    "margin": {
                        "left": 70,
                        "right": 70,
                        "top": 75,
                        "bottom": 75,
                        "header": 30,
                        "footer": 30
                    },
                    "pageOrder": 1,
                    "paperSize": {
                        "width": 850,
                        "height": 1100,
                        "kind": 1
                    }
                },
                "rowHeaderVisible": false,
                "colHeaderVisible": false,
                "gridline": {
                    "showHorizontalGridline": false,
                    "showVerticalGridline": false
                },
                "sheetAreaOffset": {
                    "left": 1,
                    "top": 1
                },
                "index": 0,
                "order": 0
            }
        },
        "sheetTabCount": 0,
        "namedPatterns": {},
        "customFunctions": {
            "TOONE.GET": {
                "name": "TOONE.GET",
                "maxArgs": 2,
                "minArgs": 1
            },
            "TOONE.PAGECOUNT": {
                "name": "TOONE.PAGECOUNT",
                "maxArgs": 0,
                "minArgs": 0
            },
            "TOONE.PAGEINDEX": {
                "name": "TOONE.PAGEINDEX",
                "maxArgs": 0,
                "minArgs": 0
            },
            "TOONE.GROUPNAME": {
                "name": "TOONE.GROUPNAME",
                "maxArgs": 0,
                "minArgs": 0
            },
            "TOONE.IMAGE": {
                "name": "TOONE.IMAGE",
                "maxArgs": 10,
                "minArgs": 1
            }
        }
    },
    "datasourceSetting": {},
    "wizardSlice": {
        "groups": [],
        "sumColumns": [],
        "rowMerge": true,
        "columnMerge": false,
        "template": {},
        "currentSheetIsTemplate": false,
        "isEdit": false,
        "spread": null
    }
};

export default {
    //配置详情参考README.md
    //batchGetDatasURL,
    //datasPath: 'data/data',
    localLicenseUnCheck: true,
    fonts: [].map(item => ({
      value: item,
      title: item,
      text: item,
    })),
    nav: {
      file: true, //隐藏文件页签页，
      table: {
        tableOptions: false,
      },
      toolbar: {
        isShow: false,
      },
    },
    dataSource: {
      //allowToView: false, //不允许查看数据源
      allowToEdit: false, //不允许编辑数据源
    },
    event: {
      onSave: function () {
        return window.tooneReport.saveReport();
      },
      onDatasourceSelectVisible: function () {
        return new Promise(function (resolve, reject) {
          resolve(datasourceMetadata);
        });
      },
      onDesignerInited: function () {
        return new Promise(function (resolve, reject) {
          resolve(testData);
        });
      },
      onPreview: function (context) {
        return new Promise(function (resolve, reject) {
            resolve({});
        });
      },
    },
  }