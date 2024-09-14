package com.toone.spreadsheet.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.toone.spreadsheet.api.IFilter;
import com.toone.spreadsheet.api.IHandler;
import com.toone.spreadsheet.formula.FormulaEngine;
import com.toone.spreadsheet.formula.Tool;
import com.toone.spreadsheet.plugin.PluginEngine;
import com.toone.spreadsheet.util.CollectionUtil;
import com.toone.spreadsheet.util.DefaultUtil;
import com.toone.spreadsheet.util.JsonUtil;
import com.toone.spreadsheet.util.MapUtil;
import com.toone.spreadsheet.util.NumberUtil;
import com.toone.spreadsheet.util.SheetUtil;
import com.toone.spreadsheet.util.StringUtil;

public class Row {
	// 外部传入属性
	private Map<String, Map> template = null;
	private List shapes = new ArrayList();
	private List<Map> spans = new ArrayList(); // 单元格合并信息(不能删除！！！)
	private Map rows = new HashMap(); // 行相关信息(行高，是否显示)(不能删除！！！)
	private List<Map> rules = new ArrayList(); // 单元格的条件规则(不能删除！！！)
	private List autoMergeRanges = new ArrayList(); // 自动合并区域(不能删除！！！)
	private int dataIndex = 0; // 数据源索引
	private UnionDatasource datasource = null; // 数据源
	private Map sheet = null;
	private Sheet sheetPage = null;
	private int rowNo = 0;
	private List namedStyles = new ArrayList();
	private int dataStartIndex = 0;
	private IHandler totalPagesHandler = new IHandler() {
		public Object invoke(Object args) {
			return 1;
		}
	}; // 总页数
	private IHandler pageHandler = null;
	private boolean isGroup = false;
	private boolean isTotalArea = false;
	private UnionDatasource unionDatasourceAll = null;
	private int tempHeight = 0;
	private boolean isFillData = false;
	private int tempRow = 0;
	private Map style = new HashMap();
	private Variables variable = null;

	// 内部属性
	private Map<String,Object> dataTable = new HashMap<String,Object>();
	private int rowHeight = 0; // 行高
	private int _rowHeight = 0; // 行高
	private List plugins = new ArrayList(); // 待执行的插件
	private List formulas = new ArrayList(); // 待执行的公式
	private Map cells = new HashMap();
	private Map rowStyles = new HashMap();
	private int seqNo = 0;
	private int dataTableIndex = 0;
	private String groupName = null;
	private IHandler getValueHandler = null;
	
	/**
	   * 存放横向扩展的信息，例如expandDataTable等于
	   *  {
	   *    4：{
	   *      step:3
	   *      dataTables:[{value:1,...},{value:2,...}]
	   *    }
	   *  }，
	   * 其中4表示第5列，以上信息表示第5列横向拓展两列，两列之间的间隔是3
	   *
	   */
	private Map  expandDataTable = new HashMap();
	private Map sharedFormulas = new HashMap();
	private Map colValues = new HashMap();
	private Map colStyles = new HashMap();
	private List<Map> expandColumns = new ArrayList<Map>();
	private Map expandColumn = null;

	/*
	 * constructor(parameter = {}) { Object.entries(parameter).forEach(([key,
	 * value]) => { this[key] = value; }); this.spans =
	 * JSON.parse(JSON.stringify(this.spans)); this.render(); }
	 */

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private Object getValue(String path, List plugins) {
		Map result = null;
		if (this.getValueHandler instanceof IHandler) {
			Map args = new HashMap(5);
			args.put("bindingPath", path);
			args.put("plugins", plugins);
			args.put("dataIndex", this.dataIndex);
			args.put("unionDatasource", this.datasource);
			args.put("isGroup", this.isGroup);
			IHandler handler = (IHandler) this.getValueHandler;
			result = (Map) handler.invoke(args);
		} else {
			result = this.datasource.getValue(path, this.dataIndex);
		}
		if ("text".equals(result.get("type"))) {
			return result.get("value");
		}
		return "";
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void render() {
		Map<String,Object> dataTable = this.dataTable;
		this.sharedFormulas = (Map) this.sheet.get("sharedFormulas");
		Map defaults = (Map) MapUtil.get(this.sheet, "defaults", DefaultUtil.getSheetDefaults());
		// 初始化行高
		if (this.rows.containsKey("size")) {
			this.rowHeight = (Integer) this.rows.get("size");
		} else {
			this.rowHeight = (Integer) defaults.get("rowHeight");
		}
		// 遍历当前行的每一个单元格
		//Map colValues = new HashMap();
		//Map colStyles = new HashMap();
		for (Object obj : this.template.entrySet()) {
			Entry entry = (Entry) obj;
			int colStr = (Integer) entry.getKey();
			Map template = (Map) entry.getValue();
			Map colDataTable = new HashMap(template);
			int col = Integer.valueOf(colStr);
			//dataTable.put(col+"", colDataTable);
			String bindingPath = (String) colDataTable.get("bindingPath");
			String tag = (String) colDataTable.get("tag");
			Map tagObj = null;
			if (!StringUtil.isEmpty(tag)) {
				tagObj = JsonUtil.parseObject(tag);
			}
			
			 //收集横向扩展信息
		      if (tagObj !=null && "horizontalRow".equals(tagObj.get("expansionDirection"))) {
		        this.collectHorizontalExpansionInfo(colDataTable, col);
		        continue;
		      }
			
			if (!StringUtil.isEmpty(bindingPath) && bindingPath.contains(".")) {
				colDataTable.remove("bindingPath");
				List plugins = tagObj == null ? null : (List) tagObj.get("plugins");
				// 单元格赋值
				colDataTable.put("value", this.getValue(bindingPath, plugins));
			}
		
			Map toolArgs = new HashMap(1);
			toolArgs.put("col", col);
			Tool tool = this.createdTool(toolArgs);
			
			Map executeSideEffectsArgs = new HashMap(3);
			executeSideEffectsArgs.put("colDataTable", dataTable);
			executeSideEffectsArgs.put("tool", tool);
			executeSideEffectsArgs.put("col", col);
			executeSideEffectsArgs.put("colStr", colStr);
			this.executeSideEffects(executeSideEffectsArgs);
			
		}//结束
		if (this.tempHeight > this.rowHeight) {
			this.rowHeight = this.tempHeight;
		}
		// 存储渲染后的原始高度，当子栏重新渲染时用于恢复到原始高度(子栏有可能会修改父栏的行高)
		this._rowHeight = this.rowHeight;
		
		if (this.expandColumn != null) {
			this.expandColumns.add(this.expandColumn);
			this.handleExpandColumns();
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void setStyles(final Map colDataTable, Map styles) {
		Object style = colDataTable.get("style");
		if (style instanceof String) {
			Map styleMap = (Map) CollectionUtil.find(this.namedStyles, new IFilter<Map>() {
				public boolean filter(Map item) {
					return ((String) item.get("name")).equals(colDataTable.get("style"));
				};
			});
			if (styleMap == null) {
				styleMap = new HashMap();
			}
			Map map = new HashMap(styleMap);
			map.putAll(styles);
			colDataTable.put("style", style);
		} else {
			Map map = new HashMap((Map) colDataTable.get("style"));
			map.putAll(styles);
			colDataTable.put("style", style);
		}
	}

	private Tool createdTool(Map params) {
		final int col = (Integer) params.get("col");
		final int count = this.datasource.getCount();
		final Row rowInst = this;
		Tool tool = new Tool();
		tool.setFieldIndexHandler(new IHandler() {
			public Object invoke(Object arg) {
				Map result = new HashMap(2);
				result.put("row", rowInst.rowNo);
				result.put("col", col);
				return result;
			}
		});
		tool.setColHandler(new IHandler() {
			public Object invoke(Object arg) {
				return col;
			}
		});
		tool.setTemplateColIndex(new IHandler() {
			public Object invoke(Object arg) {
				return col;
			}
		});
		tool.setGroupNameHandler(new IHandler() {
			public Object invoke(Object arg) {
				return rowInst.groupName;
			}
		});
		tool.setIsGroupSumAreaHandler(new IHandler() {
			public Object invoke(Object arg) {
				return rowInst.isGroup;
			}
		});
		tool.setRowHandler(new IHandler() {
			public Object invoke(Object arg) {
				return rowInst.rowNo;
			}
		});
		tool.setSheetJsonHandler(new IHandler() {
			public Object invoke(Object arg) {
				return rowInst.sheetPage;
			}
		});
		tool.setTemplateHandler(new IHandler() {
			public Object invoke(Object arg) {
				return rowInst.sheet;
			}
		});
		tool.setTemplateRowIndex(new IHandler() {
			public Object invoke(Object arg) {
				return rowInst.tempRow + rowInst.dataTableIndex;
			}
		});
		tool.setPageHandler(new IHandler() {
			public Object invoke(Object arg) {
				int pageIndex = 0;
				if(rowInst.pageHandler != null){
					return rowInst.pageHandler.invoke(arg);
				}
				
				if (rowInst.sheetPage != null) {
					pageIndex = rowInst.sheetPage.getPageIndex();
				}
				if (pageIndex == 0) {
					pageIndex = 1;
				}
				return pageIndex;
			}
		});
		tool.setTotalPagesHandler(new IHandler() {
			@SuppressWarnings("unchecked")
			public Object invoke(Object arg) {
				if (rowInst.totalPagesHandler != null) {
					return rowInst.totalPagesHandler.invoke(arg);
				}
				return 1;
			}
		});
		tool.setValueHandler(new IHandler() {
			@SuppressWarnings({ "rawtypes", "unchecked" })
			public Object invoke(Object path) {
				if (rowInst.getValueHandler != null) {
					Map args = new HashMap(4);
					args.put("bindingPath", path);
					args.put("dataIndex", rowInst.dataIndex);
					args.put("unionDatasource", rowInst.datasource);
					args.put("isGroup", isGroup);
					return rowInst.getValueHandler.invoke(args);
				}
				String[] paths = ((String) path).split(".");
				if (paths.length == 1) {
					/*
					 * Map result = new HashMap(2); result.put("type", "text"); result.put("value",
					 * rowInst.datas.get(paths[0])); return result;
					 */
					throw new RuntimeException("出现未知异常！");
				} else {
					return rowInst.datasource.getValue((String) path, rowInst.dataIndex);
				}
			}
		});
		tool.setSeqHandler(new IHandler<String[]>() {
			public Object invoke(String... args) {
				int value = rowInst.dataIndex + 1; // 全局序列号
				// 当前页序列号
				if (args.length <= 0) {
					value = rowInst.seqNo;
				}
				if (value > count) {
					value = 0;
				}
				Map result = new HashMap(2);
				result.put("type", "text");
				result.put("value", value);
				return result;
			}

		});
		tool.setDataCountHandler(new IHandler() {
			public Object invoke(Object arg) {
				return 1;
			}
		});
		tool.setDataIndex(new IHandler() {
			public Object invoke(Object arg) {
				return rowInst.dataStartIndex;
			}
		});
		tool.setUnionDatasourceHandler(new IHandler() {
			public Object invoke(Object arg) {
				return rowInst.datasource;
			}
		});
		tool.setVariableHandler(new IHandler() {
			public Object invoke(Object arg) {
				if (rowInst.variable != null) {
					Variables variables = (Variables) rowInst.variable;
					return variables.getVariableHandler().invoke(arg);
				}
				return 0;
			}
		});
		return tool;
	}
	private void executeSideEffects(Map params){
		Map colDataTable = (Map)params.get("colDataTable");
		Tool tool = (Tool)params.get("tool");
		int col = (Integer)params.get("col");
		int colStr = -1;
		Object colStrObj = params.get("colStr");
		if(colStrObj !=null){
			colStr = (Integer)colStrObj;
		}
		
		
		Map tagObj = null;
		String tag = (String) colDataTable.get("tag");
		if (!StringUtil.isEmpty(tag)) {
			tagObj = JsonUtil.parseObject(tag);
		}
		
		// 从上一个单元格复制样式
		if (this.colStyles.containsKey(col)) {
			this.setStyles(colDataTable, (Map) this.colStyles.get(col));
		}
		// 从上一行复制样式到当前对应的单元格上
		if (this.style.containsKey(col)) {
			this.setStyles(colDataTable, (Map) this.style.get(col));
		}
		
		boolean hasRuntimePlugins = false;
		if (tagObj != null) {
			String instanceId = (String) tagObj.get("instanceId");
			if (!StringUtil.isEmpty(instanceId)) {
				Map map = new HashMap();
				map.put("unionDatasource", this.datasource);
				map.put("unionDatasourceAll", this.unionDatasourceAll);
				map.put("col", col);
				map.put("row", this.rowNo);
				map.put("dataStartIndex", this.dataStartIndex);
				this.cells.put(instanceId, map);
			}
			// 处理超链接信息
			Map hyperlinkInfo = (Map) tagObj.get("hyperlinkInfo");
			String type = null;
			boolean isAutoDoc = false;
			if (hyperlinkInfo != null) {
				type = (String) hyperlinkInfo.get("type");
				isAutoDoc = (Boolean) hyperlinkInfo.get("isAutoDoc");
			}
			if ("document".equals(type) && isAutoDoc) {
				JsonUtil.set(colDataTable, "sjs://" + colDataTable.get("value") + "!A1", "hyperlink", "url");
				Object tooltip = JsonUtil.get(colDataTable, "hyperlink", "tooltip");
				if (tooltip != null) {
					JsonUtil.set(colDataTable, colDataTable.get("value"), "hyperlink", "tooltip");
				}
			}
			// 执行插件
			List<Map> plugins = (List) tagObj.get("plugins");
			if (plugins != null) {
				boolean isDelay = false;
				String targetInstanceId = "";

				for (Map plugin : plugins) {
					String pluginType = (String) plugin.get("type");
					String retention = (String) plugin.get("retention");
					Map config = (Map) plugin.get("config");
					// 标识是否包含有运行时插件，如果有这不删除tag
					if ("runtime".equals(retention)) {
						hasRuntimePlugins = true;
					}
					// 包含这些插件需要延迟执行
					if ("cellSubTotal".equals(pluginType)) {
						targetInstanceId = config != null ? (String) config.get("instanceId") : null;
						isDelay = true;
					}
				}
				// 当前单元格汇总的单元格的起始行，列，数据源的起始索引，数据的记录数等信息
				if (!StringUtil.isEmpty(targetInstanceId)) {
					Map cells = this.sheetPage.getCells();
					final Map targetCell = (Map) JsonUtil.get(cells, targetInstanceId);
					Map cellsDatasource = this.sheetPage.getCellsDatasource();
					final Map targetCellDatasource = (Map) JsonUtil.get(cellsDatasource,
							targetInstanceId);
					tool.setFieldIndexHandler(new IHandler() {
						public Object invoke(Object arg) {
							Map result = new HashMap(2);
							result.put("row", targetCell != null ? targetCell.get("row") : 0);
							result.put("col", targetCell != null ? targetCell.get("col") : 0);
							return result;
						}
					});
					tool.setDataCountHandler(new IHandler() {
						public Object invoke(Object arg) {
							return targetCell == null ? 1 : targetCell.get("count");
						}
					});
					tool.setDataIndex(new IHandler() {
						public Object invoke(Object arg) {
							return targetCell == null ? 0 : targetCell.get("dataStartIndex");
						}
					});
					final boolean isTotalArea = this.isTotalArea;
					tool.setUnionDatasourceHandler(new IHandler() {
						public Object invoke(Object arg) {
							UnionDatasource datasource = null;
							if (targetCell != null) {
								datasource = isTotalArea ? (UnionDatasource) targetCell.get("unionDatasourceAll")
										: (UnionDatasource) targetCell.get("unionDatasource");
							}
							if (datasource == null && targetCellDatasource != null) {
								datasource = isTotalArea
										? (UnionDatasource) targetCellDatasource.get("unionDatasourceAll")
										: (UnionDatasource) targetCellDatasource.get("unionDatasource");
							}
							return datasource;
						}
					});
				}
				final Map pool = new HashMap();
				pool.put("colValues", this.colValues);
				pool.put("colDataTable", colDataTable);
				pool.put("plugins", plugins);
				pool.put("isFillData", this.isFillData);
				pool.put("col", col);
				pool.put("tool", tool);
				pool.put("colStr", colStr);
				pool.put("colStyles", this.colStyles);
				final Row rowInst = this;
				IHandler pluginsHandler = new IHandler() {
					public Object invoke(Object t) {
						Object cellVal =  ((Map) pool.get("colValues")).get(pool.get("col"));
						if (cellVal==null || (cellVal instanceof String)&&StringUtil.isEmpty((String)cellVal)) {
							cellVal = ((Map) pool.get("colDataTable")).get("value");
						}
						cellVal = cellVal == null ? "" : cellVal;
						Map value = new HashMap(2);
						value.put("type", "text");
						value.put("value", cellVal);
						PluginEngine pluginEngine = PluginEngine.getInstance();
						Map res = pluginEngine.exePlugins(value, (List) pool.get("plugins"),
								(Tool) pool.get("tool"));
						//插件执行完成后，移除插件配置信息
						((Map) pool.get("colDataTable")).remove("tag");
						Map resStyle = null;
						if (!(Boolean) pool.get("isFillData")) {
							// 样式
							if (res!=null && res.containsKey("style")) {
								Map sle = (Map) res.get("style");
								if (sle != null) {
									resStyle = sle;
									rowInst.setStyles((Map) pool.get("colDataTable"), sle);
								}
							}
							// 单元格合并
							List<Map> spans = res!=null ? (List<Map>) res.get("spans"):null;
							if (spans != null && spans.size() > 0) {
								if (resStyle != null) {
									for (Map span : spans) {
										int col = (Integer) span.get("col");
										int colCount = (Integer) span.get("colCount");
										int rowCount = (Integer) span.get("rowCount");
										if ((Integer) pool.get("colStr") == col) {
											for (int i = col; i < col + colCount; i++) {
												((Map) pool.get("colStyles")).put(i, resStyle);
											}
											// 当前单元格合并多行，需要存储当前行的样式，渲染下一行时需要复制样式
											if (rowCount > 1) {
												for (int i = 0; i < rowCount; i++) {
													rowInst.rowStyles.put(i, pool.get("colStyles"));
												}
											}
										}
									}
								}

								// 去除重复的span
								List<Map> spanList = rowInst.spans;
								for (Map span : spanList) {
									final int spanCol = (Integer) span.get("col");
									final int spanColCount = (Integer) span.get("colCount");
									spanList = CollectionUtil.filter(spanList, new IFilter<Map>() {
										public boolean filter(Map span) {
											int col = (Integer) span.get("col");
											if (col >= spanCol && col < spanCol + spanColCount) {
												return false;
											}
											return true;
										};
									});
								}
								rowInst.spans.addAll(spanList);
								rowInst.spans.addAll((List) res.get("spans"));
								// this.spans.push(...res.spans);
							}

							// 行高
							if (res!=null && NumberUtil.isNumber(res.get("rowHeight"))
									&& (Integer) res.get("rowHeight") > rowInst.rowHeight) {
								rowInst.rowHeight = (Integer) res.get("rowHeight");
							}
						}

						// 将插件执行的结果赋值给单元格
						if (!(Boolean) pool.get("isFillData")&&res!=null) {
							SheetUtil.enhance((Map) pool.get("colDataTable"), res);
						}
						return null;
					}
				};
				if (isDelay) {
					List list = new ArrayList();
					list.add(pluginsHandler);
					list.addAll(rowInst.plugins);
					rowInst.plugins = list;
				} else {
					pluginsHandler.invoke(null);
				}
			}
		}

		// 先执行插件，后执行公式
		if (colDataTable.get("formula")!=null) {
			final Map pool = new HashMap();
			pool.put("colDataTable", colDataTable);
			pool.put("isFillData", this.isFillData);
			pool.put("sharedFormulas", sharedFormulas);
			pool.put("tool", tool);
			this.formulas.add(new IHandler() {
				public Object invoke(Object arg) {
					Map table = (Map) pool.get("colDataTable");
					if ((Boolean) pool.get("isFillData")) {
						table.remove("formula");
						table.put("value", "");
						return null;
					}
					Object fla = table.get("formula");
					String formula = null;
					Map sharedFormulas = (Map) pool.get("sharedFormulas");
					if (fla instanceof String) {
						formula = (String) fla;
					} else if (sharedFormulas != null && table != null) {
						formula = (String) JsonUtil.get(sharedFormulas,
								JsonUtil.get(table, "formula", "si")+"", "formula");
					}
					// 执行公式
					Map formulaArg = new HashMap(2);
					formulaArg.put("type", "formula");
					formulaArg.put("value", formula);
					Tool tool = (Tool) pool.get("tool");
					FormulaEngine formulaEngine = FormulaEngine.getInstance();
					Map res = formulaEngine.enhanceFormula(formulaArg, tool);
					// 将执行公式结果赋值给单元格
					table.remove("formula");
					SheetUtil.enhance(table, res);
					return null;
				}
			});
		}
		if (!hasRuntimePlugins) {
			colDataTable.remove("tag");
		}
		if (this.isFillData) {
			colDataTable.put("value", "");
		}
		for (Map span : this.spans) {
			int spanCol = (Integer) span.get("col");
			int colCount = (Integer) span.get("colCount");
			if (Integer.valueOf(colStr) == spanCol) {
				for (int i = spanCol; i < spanCol + colCount; i++) {
					//throw new RuntimeException(); TODO
					/*
					 * if (!colValues.hasOwnProperty(i)) { Object.defineProperty(colValues, i, {
					 * 
					 * get() { return colDataTable.value; }, }); }
					 */
				}
			}
		}
		if(colDataTable.size()>0) {
			dataTable.put(col+"", colDataTable);				
		}
	}
	private void collectHorizontalExpansionInfo(Map colDataTable,int col){
		String bindingPath = (String)colDataTable.get("bindingPath");
		List<String> paths = this.splitPath(bindingPath);
		String path = paths.get(0);
		String fieldCode = paths.get(1);
		colDataTable.put("bindingPath", fieldCode);
		final int compareIndex = col;
		Map span = (Map) CollectionUtil.find(this.spans, new IFilter<Map>() {
			public boolean filter(Map span) {
				return (Integer) span.get("col") == compareIndex;
			}
		});
		
		if(this.expandColumn == null){
			Map expandColumn = new HashMap(4);
			expandColumn.put("col", col);
			expandColumn.put("path", path);
			expandColumn.put("colCount", 1);
			
			Map dataTable = new HashMap();
			dataTable.put(col, colDataTable);
			expandColumn.put("dataTable", dataTable);
			this.expandColumn = expandColumn;
		}else{
			int _col = (Integer)this.expandColumn.get("col");
			int colCount = (Integer)this.expandColumn.get("colCount");
			String _path = (String)this.expandColumn.get("path");
			if(_col + colCount == col && path.equals(_path)){
				this.expandColumn.put("colCount", colCount + 1);
				Map dataTable = (Map)this.expandColumn.get("dataTable");
				dataTable.put(col,colDataTable);
			}else{
				this.expandColumns.add(this.expandColumn);
				this.expandColumn = null;
			}
		}
	}
	private void handleExpandColumns(){
		for(Map item : this.expandColumns){
			final int compareIndex = (Integer)item.get("col");
			Map span = (Map) CollectionUtil.find(this.spans, new IFilter<Map>() {
				public boolean filter(Map span) {
					return (Integer) span.get("col") == compareIndex;
				}
			});
			if(span != null){
				int colCount = (Integer)span.get("colCount");
				for(int i = 1;i<colCount;i++){
					Map dataTable = (Map)item.get("dataTable");
					int newCol = compareIndex + i;
					if(dataTable.get(newCol) == null){
						dataTable.put(newCol, this.dataTable.get(newCol));
						item.put("colCount", (Integer)item.get("colCount") + 1);
					}
				}
			}
			String path = (String)item.get("path");
			List plugins = new ArrayList();
			List<Map> datas = (List)this.getValue(path,plugins);
			if(datas != null){
				for(Map dataItem : datas){
					Map itemDataTable = (Map)item.get("dataTable");
					for(Object mapItem:itemDataTable.entrySet()){
						Entry entry = (Entry)mapItem;
						int col = (Integer)entry.getKey();
						Map template = (Map)entry.getValue();
						Map dataTable = new HashMap(template);
						dataTable.remove("bindingPath");
						String bindingPath = (String)template.get("bindingPath");
						final Object value = dataItem.get(bindingPath);
						dataTable.put("value", value);
						
						if(this.expandDataTable.get(col) == null){
							Map expandDataTable = new HashMap();
							expandDataTable.put("step", item.get("colCount"));
							expandDataTable.put("dataTables", new ArrayList());
							this.expandDataTable.put(col, expandDataTable);
						}
						
						Map toolArgs = new HashMap(1);
						toolArgs.put("col", col);
						Tool tool = this.createdTool(toolArgs);
						tool.setValueHandler(new IHandler() {
							public Object invoke(Object arg) {
								Map result = new HashMap(2);
								result.put("type","text");
								result.put("value",value);
								return result;
							}
						});
						
						Map executeSideEffectsArgs = new HashMap(3);
						executeSideEffectsArgs.put("colDataTable", dataTable);
						executeSideEffectsArgs.put("tool", tool);
						executeSideEffectsArgs.put("col", col);
						this.executeSideEffects(executeSideEffectsArgs);
						
						Map expandDataTable = (Map)this.expandDataTable.get(col);
						List dataTables = (List)expandDataTable.get("dataTables");
						dataTables.add(dataTable);
					}
				}
			}
			
		}
	}
	

	private List<String> splitPath(String path){
		 int lastIndex = path.lastIndexOf('.');
	    String part1 = path.substring(0, lastIndex);
	    String part2 = path.substring(lastIndex + 1);
	    List<String> result = new ArrayList<String>();
	    result.add(part1);
	    result.add(part2);
	    return result;	    
	}
	
	public List<Map> getSpans() {
		return this.spans;
	}

	public Map getRows() {
		return this.rows;
	}

	public List<Map> getRules() {
		return this.rules;
	}

	public void setTemplate(Map template) {
		this.template = template;
	}

	public void setShapes(List shapes) {
		this.shapes = shapes;
	}

	public void setRows(Map rows) {
		this.rows = rows;
	}

	public void setSpans(List spans) {
		this.spans = spans;
	}

	public void setRules(List rules) {
		this.rules = rules;
	}

	public void setAutoMergeRanges(List autoMergeRanges) {
		this.autoMergeRanges = autoMergeRanges;
	}

	public List<Map> getAutoMergeRanges() {
		return this.autoMergeRanges;
	}

	public void setDataIndex(int dataIndex) {
		this.dataIndex = dataIndex;
	}

	public void setDatasource(UnionDatasource datasource) {
		this.datasource = datasource;
	}

	public void setSheet(Map sheet) {
		this.sheet = sheet;
	}

	public void setRowNo(int rowNo) {
		this.rowNo = rowNo;
	}

	public void setNamedStyles(List namedStyles) {
		this.namedStyles = namedStyles;
	}

	public void setDataStartIndex(int dataStartIndex) {
		this.dataStartIndex = dataStartIndex;
	}

	public void setSheetPage(Sheet sheetPage) {
		this.sheetPage = sheetPage;
	}

	public void setTotalPagesHandler(IHandler totalPagesHandler) {
		this.totalPagesHandler = totalPagesHandler;
	}
	
	public void setpageHandler(IHandler pageHandler){
		this.pageHandler = pageHandler;
	}
	

	public void setDataTableIndex(int index) {
		this.dataTableIndex = index;
	}

	public void setGetValueHandler(IHandler getValueHandler) {
		this.getValueHandler = getValueHandler;
	}

	public void setGroup(boolean isGroup) {
		this.isGroup = isGroup;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public void setTotalArea(boolean isTotalArea) {
		this.isTotalArea = isTotalArea;
	}

	public void setUnionDatasourceAll(UnionDatasource unionDatasourceAll) {
		this.unionDatasourceAll = unionDatasourceAll;
	}

	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}

	public void setTempHeight(int tempHeight) {
		this.tempHeight = tempHeight;
	}

	public void setFillData(boolean isFillData) {
		this.isFillData = isFillData;
	}

	public void setTempRow(int tempRow) {
		this.tempRow = tempRow;
	}

	public Map getDataTable() {
		return this.dataTable;
	}

	public int getRowHeight() {
		return this.rowHeight;
	}

	public List getPlugins() {
		return this.plugins;
	}

	public Map getCells() {
		return this.cells;
	}

	public List getShapes() {
		return this.shapes;
	}

	public List getFormulas() {
		return this.formulas;
	}

	public Map getRowStyles() {
		return this.rowStyles;
	}

	public void setStyle(Map style) {
		this.style = style;
	}

	public void setVariable(Variables variable) {
		this.variable = variable;
	}

	public Map getExpandDataTable(){
		return this.expandDataTable;
	}
}