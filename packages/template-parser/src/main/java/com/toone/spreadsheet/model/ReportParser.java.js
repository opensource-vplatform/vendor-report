package com.toone.spreadsheet.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.regex.Pattern;

import com.toone.spreadsheet.api.IFilter;
import com.toone.spreadsheet.api.IHandler;
import com.toone.spreadsheet.api.IValueHandler;
import com.toone.spreadsheet.formula.FormulaEngine;
import com.toone.spreadsheet.util.CollectionUtil;
import com.toone.spreadsheet.util.DefaultUtil;
import com.toone.spreadsheet.util.JsonUtil;
import com.toone.spreadsheet.util.MapUtil;
import com.toone.spreadsheet.util.ObjectUtil;
import com.toone.spreadsheet.util.SheetUtil;
import com.toone.spreadsheet.util.StringUtil;
import com.toone.spreadsheet.util.VarUtil;

/**
 * 报表解析器
 * 
 * @author matoa
 *
 */
public class ReportParser {
	// 导出类型。连续导出，分组导出，连续分组导出
	private Map<String, Object> exportType = new HashMap<String, Object>(4);
	private List asynChronousQueue = new ArrayList();
	private List shapesEnhancer = new ArrayList();
	private List delayPlugins = new ArrayList();
	private List<IHandler> delayFormula = new ArrayList<IHandler>();
	private Map sheetPages = new HashMap();
	private Map<UnionDatasource, Integer> globalSeq = new HashMap(); // 全局序列号
	private Map cellDataSource = new HashMap(); // 单元格数据源

	private Map<String, Object> reportJson = null;

	private Map<String, Object> paper = null;
	private Map<String, Object> datas = null;
	private Map<String, Object> setting = null;
	private Map tempConfig = null;
	private List variablesDefine = null;
	private int printConversionUnits = 96;
	private List<Map<String, Object>> dataSourceMap = null;
	private Map<String, Object> templates = null;
	private boolean isHorizontalExpansion = false;
	private Map horizontalExpansionInfos = null;
	private List namedStyles = null;
	private int blankSpan = 0;
	private int numberOfColumns = 0;
	private int showPageCount = 0;
	private boolean fixed = false;
	private int fixedColumnCount = 0;
	private int oldSheetCount = 0;
	private String activeSheetName = null;
	private List sheetNames = null;
	private FormulaEngine formulaEngine = FormulaEngine.getInstance();

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ReportParser(Map<String, Object> config) {
		this.initExportType();
		Map<String, Object> reportJson = (Map<String, Object>) config.get("reportJson");
		reportJson.put("scrollbarMaxAlign", true);
		this.paper = new HashMap<String, Object>();
		this.datas = (Map<String, Object>) config.get("datas");
		this.showPageCount = (Integer) MapUtil.get(config, "showPageCount", 20);
		this.reportJson = reportJson;
		this.tempConfig = JsonUtil.parseObject(JsonUtil.toJSONString(MapUtil.get(config, "tempConfig", new HashMap())));
		this.setting = (Map<String, Object>) config.get("setting");
		;
		this.variablesDefine = null;
		this.removeDesignerInfo();
		// 打印换算单位
		this.printConversionUnits = (Integer) MapUtil.get(config, "pxPerInch", 96);
		this.parse();

		// 总页数需延后渲染
		Iterator<IHandler> iterator = this.delayPlugins.iterator();
		while (iterator.hasNext()) {
			IHandler item = iterator.next();
			iterator.remove();
			// 执行回调
			item.invoke(null);
		}
		// 总页数需延后渲染
		iterator = this.delayFormula.iterator();
		while (iterator.hasNext()) {
			IHandler item = iterator.next();
			iterator.remove();
			// 执行回调
			item.invoke(null);
		}
		this.removeEmptyAttrs();
		// window.sheetPages=this.sheetPages;
	}
	
	/**
	 * 移除空属性
	 */
	@SuppressWarnings("rawtypes")
	private void removeEmptyAttrs() {
		Map sheets = (Map)this.reportJson.get("sheets");
		if(sheets!=null) {
			for(Object item:sheets.entrySet()) {
				Entry entry = (Entry)item;
				Map sheet = (Map)entry.getValue();
				List shapes = (List)sheet.get("shapes");
				if(shapes!=null&&shapes.size()==0) {
					sheet.remove("shapes");
				}
			}
		}
	}

	@SuppressWarnings("rawtypes")
	private void initExportType() {
		// 连续导出
		this.exportType.put("continuous", new HashMap());
		// 分组导出
		this.exportType.put("group", new HashMap());
		// 连续分组导出
		this.exportType.put("continuousGroup", new HashMap());
		this.exportType.put("continuousPage", new HashMap());
	}

	private void enhancer() {
		// 生成报表json的时候，有些处理是异步的，得等异步处理结束后，才可以渲染报表
		/*
		 * return new Promise((resolve) => { if (this.shapesEnhancer.length) { const
		 * groups = {}; this.shapesEnhancer.forEach(({ imgUrl, handler }) => { if
		 * (!groups[imgUrl]) { groups[imgUrl] = []; } groups[imgUrl].push(handler); });
		 * Object.entries(groups).forEach(([imgUrl, handlers]) => {
		 * this.asynChronousQueue.push( new Promise((resolve) => {
		 * base64DataURLToImageData(imgUrl) .then(({ data }) => {
		 * handlers.forEach((handler) => { handler(data); }); resolve(); }) .catch(() =>
		 * { handlers.forEach((handler) => { handler(''); }); resolve(); }); }) ); }); }
		 * Promise.all(this.asynChronousQueue).then(() => { resolve(); }); });
		 */
	}

	/**
	 * 移除设计器中设置的样式信息 如：行列合并设置的角标
	 */
	private void removeDesignerInfo() {
		if (this.reportJson != null) {
			Map<String, Object> sheets = (Map<String, Object>) this.reportJson.get("sheets");
			if (sheets == null) {
				return;
			}
			for (Entry<String, Object> entry : sheets.entrySet()) {
				String sheetName = entry.getKey();
				Object sheet = entry.getValue();
				if (sheet != null) {
					Object dataTable = JsonUtil.get(sheet, new String[] { "data", "dataTable" });
					if (dataTable == null) {
						return;
					}
					Map<String, Map<String, Object>> dataTableMap = (Map<String, Map<String, Object>>) dataTable;
					for (Entry<String, Map<String, Object>> dataTableEntry : dataTableMap.entrySet()) {
						String rowStr = dataTableEntry.getKey();
						Map<String, Object> columns = (Map<String, Object>) dataTableEntry.getValue();
						for (Entry<String, Object> columnEntry : columns.entrySet()) {
							Object column = columnEntry.getValue();
							Object style = JsonUtil.get(column, new String[] { "style" });
							if (style instanceof Map) {
								((Map) style).remove("decoration");
							}
						}
					}
				}
			}
		}
	}

	private void initTempates() {
		this.dataSourceMap = new ArrayList<Map<String, Object>>();
		this.templates = new HashMap<String, Object>();
		Map<String, Object> header = new HashMap<String, Object>();
		header.put("template", new ArrayList());
		header.put("height", 0);
		Map<String, Object> totalArea = new HashMap();
		totalArea.put("height", 0);
		totalArea.put("dataTables", new HashMap());
		header.put("totalArea", totalArea);
		Map<String, Object> groupSumArea = new HashMap<String, Object>();
		groupSumArea.put("height", 0);
		groupSumArea.put("dataTables", new HashMap());
		header.put("groupSumArea", groupSumArea);
		header.put("usedTables", new ArrayList());
		this.templates.put("header", header);
		Map<String, Object> footer = new HashMap<String, Object>();
		footer.put("template", new ArrayList());
		footer.put("height", 0);
		totalArea = new HashMap();
		totalArea.put("height", 0);
		totalArea.put("dataTables", new HashMap());
		footer.put("totalArea", totalArea);
		groupSumArea = new HashMap<String, Object>();
		groupSumArea.put("height", 0);
		groupSumArea.put("dataTables", new HashMap());
		footer.put("groupSumArea", groupSumArea);
		footer.put("usedTables", new ArrayList());
		this.templates.put("footer", footer);
		Map<String, Object> content = new HashMap<String, Object>();
		content.put("template", new ArrayList());
		content.put("height", 0);
		totalArea = new HashMap();
		totalArea.put("height", 0);
		totalArea.put("dataTables", new HashMap());
		content.put("totalArea", totalArea);
		groupSumArea = new HashMap<String, Object>();
		groupSumArea.put("height", 0);
		groupSumArea.put("dataTables", new HashMap());
		content.put("groupSumArea", groupSumArea);
		content.put("usedTables", new ArrayList());
		content.put("dataLen", 0);
		this.templates.put("content", content);
		this.templates.put("datas", new HashMap());
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private Map horizontalExpansion(Map pageInfos, Map<String, Object> templates) {
		Object header = templates.get("header");
		Object footer = templates.get("footer");
		Object content = templates.get("content");
		if (!this.isHorizontalExpansion) {
			Map temp = new HashMap();
			temp.put("header", header);
			temp.put("footer", footer);
			temp.put("content", content);
			return temp;
		}
		int columnCount = (Integer) JsonUtil.get(pageInfos, "sheet", "columnCount");
		List columns = (List) JsonUtil.get(pageInfos, "sheet", "columns");
		List newColumns = new ArrayList();
		Map columnsUnionDatasource = new HashMap();
		for (Entry<String, Object> entry : ((Map<String, Object>) this.horizontalExpansionInfos.get("columns"))
				.entrySet()) {
			String key = entry.getKey();
			Map val = (Map) entry.getValue();
			Map<String, Object> tableCodes = (Map<String, Object>) val.get("tableCodes");
			Object cellPlugins = val.get("cellPlugins");
			List<String> dataPath = (List<String>) val.get("dataPath");
			Map datas = new HashMap();
			Map setting = new HashMap();
			setting.putAll(this.setting);
			setting.put("cellPlugins", cellPlugins);
			for (String tableCode : tableCodes.keySet()) {
				datas.put(tableCode, JsonUtil.get(templates, new String[] { "datas", tableCode }));
			}
			UnionDatasource unionDatasource = new UnionDatasource(dataPath, setting);
			unionDatasource.load(datas);
			columnsUnionDatasource.put(key, unionDatasource);
		}
		String[] tempKeys = new String[] { "header", "content", "footer" };
		int maxColumnCount = 0;
		for (String tempKey : tempKeys) {
			Map tempInfos = (Map) templates.get(tempKey);
			List<Map> template = (List<Map>) tempInfos.get("template");
			for (Map temp : template) {
				if (temp != null) {
					List<Map> dataTables = (List<Map>) MapUtil.get(temp, "dataTables", new ArrayList());
					for (Map dataTableInfos : dataTables) {
						Map rows = (Map) MapUtil.get(dataTableInfos, "rows", new HashMap());
						List spans = (List) MapUtil.get(dataTableInfos, "spans", new ArrayList());
						List<Map> rules = (List<Map>) MapUtil.get(dataTableInfos, "rules", new ArrayList());
						List autoMergeRanges = (List) MapUtil.get(dataTableInfos, "autoMergeRanges", new ArrayList());
						Map rowDataTable = (Map) dataTableInfos.get("rowDataTable");
						dataTableInfos.put("rowDataTable", new HashMap());
						dataTableInfos.put("rules", new ArrayList());
						Map dataTable = new HashMap();
						dataTable.putAll(rowDataTable);
						int newColumnCount = 0;
						for (int col = 0; col < columnCount; col++) {
							final int colIndex = col;
							Map _colDataTable = (Map) dataTable.get(col);
							// 条件规则
							List newRules = CollectionUtil.filter(rules, new IFilter<Map>() {

								public boolean filter(Map rule) {
									List ranges = (List) MapUtil.get(rule, "ranges", Collections.EMPTY_LIST);
									return CollectionUtil.some(ranges, new IFilter<Map>() {

										public boolean filter(Map range) {
											int rangeCol = (Integer) range.get("col");
											int colCount = (Integer) range.get("colCount");
											return rangeCol <= colIndex && colIndex < rangeCol + colCount;
										}
									});
								}
							});
							if (newColumnCount < col) {
								newColumnCount = col;
							}
							Map colDataTable = new HashMap(_colDataTable);
							String bindingPath = (String) colDataTable.get("bindingPath");
							String tag = (String) colDataTable.get("tag");
							Map style = (Map) colDataTable.get("style");
							UnionDatasource unionDatasource = (UnionDatasource) columnsUnionDatasource.get(col);
							if (unionDatasource != null) {
								int dataLen = unionDatasource.getCount();
								boolean isHorizontalExpansion = false;
								if (!StringUtil.isEmpty(tag)) {
									Map jsonTag = JsonUtil.parseObject(tag);
									List<Map> plugins = (List<Map>) jsonTag.get("plugins");
									if (plugins != null) {
										for (Map plugin : plugins) {
											Map config = (Map) plugin.get("config");
											if (config != null && "horizontal".equals(config.get("direction"))) {
												isHorizontalExpansion = true;
												break;
											}
										}
									}
								}
								// 当前单元格是否是横向扩展
								if (isHorizontalExpansion) {
									for (int i = 0; i < dataLen; i++) {
										Map newColDataTable = new HashMap(_colDataTable);
										if (!StringUtil.isEmpty(bindingPath) && bindingPath.contains(".")) {
											colDataTable.remove("bindingPath");
											Map value = unionDatasource.getValue(bindingPath, i);
											String type = (String) value.get("type");
											if ("text".equals(type)) {
												newColDataTable.put("value", value.get("value"));
											}
										}
										JsonUtil.set(dataTableInfos, newColDataTable, "rowDataTable",
												newColumnCount + "");
										Object columnConfig = columns.get(col);
										if (columnConfig != null) {
											newColumns.set(newColumnCount, columnConfig);
										}
										for (Map rule : (List<Map>) newRules) {
											List<Map> ranges = (List<Map>) MapUtil.get(rule, "ranges", new ArrayList());
											for (Map range : ranges) {
												int rangeCol = (Integer) range.get("col");
												int rangeColCount = (Integer) range.get("colCount");
												if (rangeCol <= col && col < rangeCol + rangeColCount) {
													range.put("colCount", rangeColCount + 1);
												}
											}
										}
										newColumnCount++;
									}
								} else {
									for (int i = 0; i < dataLen; i++) {
										Map newColDataTable = new HashMap(_colDataTable);
										JsonUtil.set(dataTableInfos, newColDataTable, "rowDataTable",
												newColumnCount + "");
										Object columnConfig = columns.get(col);
										if (columnConfig != null) {
											newColumns.set(newColumnCount, columnConfig);
										}
										newColumnCount++;
									}
								}
							} else {
								JsonUtil.set(dataTableInfos, colDataTable == null ? new HashMap() : colDataTable,
										"rowDataTable", newColumnCount + "");
								Object columnConfig = columns.get(col);
								if (columnConfig != null) {
									newColumns.set(newColumnCount, columnConfig);
								}
								newColumnCount++;
							}
							rules.addAll((List) dataTableInfos.get("rules"));
						}

						if (newColumnCount > maxColumnCount) {
							maxColumnCount = newColumnCount;
						}
					}
				}
			}
		}
		if (maxColumnCount > columnCount) {
			JsonUtil.set(pageInfos, maxColumnCount, "sheet", "columnCount");
		}
		JsonUtil.set(pageInfos, newColumns, "sheet", "columns");
		Map result = new HashMap();
		result.put("header", header);
		result.put("footer", footer);
		result.put("content", content);
		return result;
	}

	private Map calculateHeight(Map header, Map footer, Map content, Map pageInfos) {
		double headerHeight = MapUtil.getDouble(header, "height");
		double footerHeight = MapUtil.getDouble(footer, "height");
		double contentTempHeight = MapUtil.getDouble(content, "height");
		double pageTotalHeight = MapUtil.getDouble(pageInfos, "pageTotalHeight");

		double _height = headerHeight + footerHeight;
		double remainderHeight = _height % pageTotalHeight;
		double diffHeight = pageTotalHeight - remainderHeight;
		double contentTotalHeight = pageTotalHeight;
		if (diffHeight >= contentTempHeight) {
			contentTotalHeight = diffHeight;
		}
		contentTotalHeight -= 5;
		Map result = new HashMap<String, Double>(1);
		result.put("contentTotalHeight", contentTotalHeight);
		return result;
	}

	private void enhancePageInfos(Map pageInfos, Map header, Map footer, final Map content) {
		// 计算内容区域的可用高度，不包含章合计和总计
		Map result = this.calculateHeight(header, footer, content, pageInfos);
		double contentTotalHeight = (Double) result.get("contentTotalHeight");
		// 内容总高度，不包括头部和底部
		pageInfos.put("contentTotalHeight", contentTotalHeight);
		// 已经消耗的内容高度
		pageInfos.put("contentHeight", 0);
		// 内容所用到的数据的起始索引
		pageInfos.put("contentDataIndex", 0);
		// 标识内容是否已经循环处理完。true表示还未处理完
		pageInfos.put("flag", true);
		// 标识是否在最后一页已经处理过章合计
		pageInfos.put("hasHandleLastPage", false);
		UnionDatasource contentUnionDatasource = content == null ? null
				: (UnionDatasource) JsonUtil.get(content, new String[] { "template", "0", "unionDatasource" });
		pageInfos.put("contentUnionDatasource", contentUnionDatasource);
		// 内容所用到的数据的长度
		if (contentUnionDatasource != null) {
			int count = contentUnionDatasource.getCount();
			pageInfos.put("dataLen", count == 0 ? 1 : count);
		}
		pageInfos.put("contentUsedTables", content.get("usedTables"));
		// 标识内容区域的数据集是否有在合计区域中用到，如果有用到，则删除内容区域数据集最后一条数据
		boolean isInFooter = false;
		Map dataTables = footer == null ? null : (Map) JsonUtil.get(footer, new String[] { "totalArea", "dataTables" });
		if (dataTables != null) {
			isInFooter = CollectionUtil.some(dataTables.values(), new IFilter<Map>() {
				public boolean filter(Map value) {
					boolean res = false;
					List<String> usedTables = (List<String>) value.get("usedTables");
					Set<String> contentUsedTables = (Set<String>) content.get("usedTables");
					for (String tableCode : usedTables) {
						if (contentUsedTables.contains(tableCode)) {
							res = true;
							break;
						}
					}
					return res;
				}
			});
		}
		pageInfos.put("isInFooter", isInFooter);
	}

	private List deepCopyColumns(Map pageInfos) {
		if (pageInfos == null) {
			return new ArrayList();
		}
		List columns = (List) JsonUtil.get(pageInfos, new String[] { "sheet", "columns" });
		if (columns == null) {
			columns = new ArrayList();
		}
		return JsonUtil.parseArray(JsonUtil.toJSONString(columns));
	}

	private void render(Map pageInfos, Map templates) {
		// 如果有横向扩展，则先横向扩展
		Map result = this.horizontalExpansion(pageInfos, templates);
		Map header = (Map) result.get("header");
		Map footer = (Map) result.get("footer");
		Map content = (Map) result.get("content");
		// 需要分页
		String pageArea = (String) pageInfos.get("pageArea");
		if (!StringUtil.isEmpty(pageArea)) {
			List headerTemplates = (List) header.get("template");
			List footerTemplates = (List) footer.get("template");
			List contentTemplates = (List) content.get("template");
			this.enhancePageInfos(pageInfos, header, footer, content);
			Sheet sheetPage = null;
			while ((Boolean) pageInfos.get("flag")) {
				// 用于存储当前页内容
				sheetPage = new Sheet();
				sheetPage.setSheet(this.copySheet((Map) pageInfos.get("sheet")));
				sheetPage.setPageIndex((Integer) pageInfos.get("pageIndex"));
				sheetPage.setCellsDatasource(sheetPage != null ? (Map) sheetPage.getCellsDatasource() : new HashMap());
				sheetPage.setShapesEnhancer(this.shapesEnhancer);
				sheetPage.setDatas(this.datas);
				pageInfos.put("sheetPage", sheetPage);
				Map parameters = new HashMap();
				parameters.put("pageInfos", pageInfos);
				parameters.put("sheetPage", sheetPage);
				String[] pages = new String[] { "sheetPage", "groupSheet", "continuousGroupSheet",
						"continuousPageSheet" };
				// 处理头部区域
				final UnionDatasource contentUnionDatasource = (UnionDatasource) pageInfos
						.get("contentUnionDatasource");
				final Object contentUsedTables = (Object) pageInfos.get("contentUsedTables");
				final int contentDataIndex = (Integer) pageInfos.get("contentDataIndex");
				Map params = new HashMap();
				params.putAll(parameters);
				params.put("templates", headerTemplates);
				params.put("type", "header");
				params.put("getValueHandler", new IHandler() {
					public Object invoke(Object args) {
						Map params = (Map) args;
						UnionDatasource unionDatasource = (UnionDatasource) params.get("unionDatasource");
						String bindingPath = (String) params.get("bindingPath");
						int dataIndex = (Integer) params.get("dataIndex");
						List plugins = (List) params.get("plugins");
						Map result = unionDatasource.getValue(bindingPath, dataIndex);
						String[] bindingPaths = bindingPath.split("\\.");
						boolean isUsedInContent = contentUsedTables == null ? false
								: ObjectUtil.contains(contentUsedTables, bindingPaths[0]);
						if (isUsedInContent) {
							result = contentUnionDatasource.getValue(bindingPath, contentDataIndex);
						}
						return result;
					}
				});
				this.genPageDataTables(params);
				pageInfos.put("isFirstPage", false);
				pageInfos.put("isFirstGroupPage", false);
				// 处理内容区域
				if (this.numberOfColumns > 1) {
					// 行分栏
					Column column = new Column();
					column.setDatasource((UnionDatasource) pageInfos.get("contentUnionDatasource"));
					column.setTotalHeight((Integer) pageInfos.get("contentTotalHeight"));
					column.setStartRow((Integer) pageInfos.get("rowCount"));
					column.setStartIndex((Integer) pageInfos.get("contentDataIndex"));
					column.setFixed(this.fixed);
					column.setFixedColumnCount(this.fixedColumnCount);
					column.setOldSheetCount(this.oldSheetCount);
					column.setNamedStyles(this.namedStyles);
					column.setBlankSpan(this.blankSpan);
					column.setFillData((Boolean) pageInfos.get("isFillData"));
					column.setNumberOfColumns(this.numberOfColumns);
					column.setSheet((Map) pageInfos.get("sheet"));
					column.setSingleRowFill((Boolean) pageInfos.get("singleRowFill"));
					column.setGroupName((String) pageInfos.get("groupName"));
					column.setTempRow(
							contentTemplates == null ? 0 : (Integer) ((Map) contentTemplates.get(0)).get("row"));
					column.setTemplate((Map) contentTemplates.get(0));
					column.render();
					for (String item : pages) {
						Sheet sheet = (Sheet) pageInfos.get(item);
						sheet.addColumn(column);
					}
					// 连续导出
					Sheet continuousSheet = (Sheet) pageInfos.get("continuousSheet");
					continuousSheet.addColumn(column, !((Boolean) pageInfos.get("isLastGroup")));
					pageInfos.put("flag", !column.isLastPage());
					double pageHeight = (Double) pageInfos.get("pageHeight");
					pageInfos.put("pageHeight", pageHeight + column.getHeight());
					int newContentDataIndex = (Integer) pageInfos.get("contentDataIndex");
					pageInfos.put("contentDataIndex", newContentDataIndex + column.getDataCount());
					this.delayPlugins.addAll(column.getPlugins());
					this.delayFormula.addAll(column.getFormulas());
				} else {
					Map args = new HashMap(parameters);
					args.put("templates", contentTemplates);
					this.genPageDataTables(args);
					// 如果是最后一页，处理填充等
					args = new HashMap(parameters);
					args.put("footer", footer);
					args.put("content", content);
					args.put("footerTemplates", footerTemplates);
					args.put("contentTemplates", contentTemplates);
					footerTemplates = this.checkIsLastPage(args);
				}
				// 底部
				Map args = new HashMap(parameters);
				args.put("templates", footerTemplates);
				args.put("type", "footer");
				args.put("getValueHandler", new IHandler() {

					public Object invoke(Object args) {
						Map params = (Map) args;
						UnionDatasource unionDatasource = (UnionDatasource) params.get("unionDatasource");
						String bindingPath = (String) params.get("bindingPath");
						int dataIndex = (Integer) params.get("dataIndex");
						List plugins = (List) params.get("plugins");
						boolean isGroup = (Boolean) params.get("isGroup");
						Map result = unionDatasource.getValue(bindingPath, dataIndex);
						String[] bindingPaths = bindingPath.split("\\.");
						boolean isUsedInContent = contentUsedTables == null ? false
								: ObjectUtil.contains(contentUsedTables, bindingPaths[0]);
						if (isUsedInContent && isGroup) {
							int count = contentUnionDatasource.getCount();
							if (count == 0) {
								count = 1;
							}
							result = contentUnionDatasource.getValue(bindingPath, count - 1);
						}
						return result;
					}
				});
				this.genPageDataTables(args);
				if ((Boolean) pageInfos.get("flag")) {
					this.onAfterPage(pageInfos);
				}
				pageInfos.put("pageHeight", 0);
				pageInfos.put("contentHeight", 0);
				String sheetName = (String) JsonUtil.get(pageInfos, new String[] { "sheet", "name" });
				List pageDatas = (List) JsonUtil.get(this.sheetPages, new String[] { sheetName, "datas" });
				pageDatas.add(sheetPage);
				int showPageCount = (Integer) pageInfos.get("showPageCount");
				pageInfos.put("showPageCount", showPageCount + 1);
				
				List<String> _pages = new ArrayList();
				_pages.add("sheetPage");
				for(String item : _pages){
					Sheet sheet = (Sheet)pageInfos.get(item);
					sheet.handleExpandDataTables();
				}
			}
		} else {
			Object sheetPage = pageInfos.get("sheetPage");
			Map params = new HashMap();
			params.put("templates", header.get("template"));
			params.put("pageInfos", pageInfos);
			params.put("sheetPage", sheetPage);
			params.put("type", "header");
			this.genPageDataTables(params);
			String sheetName = (String) JsonUtil.get(pageInfos, "sheet", "name");
			List pageDatas = (List) JsonUtil.get(this.sheetPages, sheetName, "datas");
			pageDatas.add(sheetPage);
			
			List<String> pages = new ArrayList();
			pages.add("sheetPage");
			for(String item : pages){
				Sheet sheet = (Sheet)pageInfos.get(item);
				sheet.handleExpandDataTables();
			}
			
		}
	}

	private List checkIsLastPage(Map params) {
		Map footer = (Map) params.get("footer");
		Map pageInfos = (Map) params.get("pageInfos");
		Map content = (Map) params.get("content");
		Sheet sheetPage = (Sheet) params.get("sheetPage");
		List footerTemplates = (List) params.get("footerTemplates");
		List contentTemplates = (List) params.get("contentTemplates");
		double diffHeight = 0;
		// 判断是否已经是最后一页
		if (!(Boolean) pageInfos.get("flag")) {
			// 只包含章合计
			int footerHeight = (Integer) footer.get("height");
			int groupSumAreaHeight = (Integer) JsonUtil.get(footer, "groupSumArea", "height");
			int height = groupSumAreaHeight + footerHeight;
			List newTemplates = new ArrayList(footerTemplates);
			Map<String, Object> dataTables = (Map<String, Object>) JsonUtil.get(footer, "groupSumArea", "dataTables");
			for (Entry<String, Object> entry : dataTables.entrySet()) {
				newTemplates.set(Integer.valueOf(entry.getKey()), entry.getValue());
			}
			if ((Boolean) pageInfos.get("isLastGroup")) {
				// 最后一组的最后一页的底部包含章合计和总计
				height += (Integer) JsonUtil.get(footer, "totalArea", "height");
				Map<String, Object> footerDataTables = (Map) JsonUtil.get(footer, "totalArea", "dataTables");
				for (Entry<String, Object> entry : footerDataTables.entrySet()) {
					newTemplates.set(Integer.valueOf(entry.getKey()), entry.getValue());
				}
			}
			double pageTotalHeight = MapUtil.getDouble(pageInfos, "pageTotalHeight");
			double pageHeight = MapUtil.getDouble(pageInfos, "pageHeight");
			double remainderHeight = height % pageTotalHeight;
			diffHeight = pageTotalHeight - pageHeight - remainderHeight;
			if (diffHeight > 0 || (Boolean) pageInfos.get("hasHandleLastPage")) {
				// 如果剩余高度能渲染包含章合计的底部，则用包含章合计的底部模板渲染
				footerTemplates = newTemplates;
			} else {
				// 如果剩余高度不能渲染包含章合计的底部，则继续循环
				pageInfos.put("flag", true);
				pageInfos.put("hasHandleLastPage", true);
			}
		}
		// 填充数据
		Map args = new HashMap();
		args.put("pageInfos", pageInfos);
		args.put("diffHeight", diffHeight);
		args.put("sheetPage", sheetPage);
		args.put("contentHeight", content.get("height"));
		args.put("contentTemplates", contentTemplates);
		this.fillData(args);
		return footerTemplates;
	}

	private void fillData(Map params) {
		Map pageInfos = (Map) params.get("pageInfos");
		Sheet sheetPage = (Sheet) params.get("sheetPage");
		double diffHeight = MapUtil.getDouble(params, "diffHeight");
		List contentTemplates = (List) params.get("contentTemplates");
		// 最后一页才填充数据
		if (!(!(Boolean) pageInfos.get("flag") && (Boolean) pageInfos.get("isFillData"))) {
			return;
		}
		double tempHeight = diffHeight - 10;
		if (tempHeight <= 0) {
			return;
		}
		Row lastRow = (Row) pageInfos.get("lastRow");
		// 1，单行填充
		double fillCount = 1;
		// 2，多行填充
		if (!(Boolean) pageInfos.get("singleRowFill")) {
			int lastRowHeight = lastRow.getRowHeight();
			fillCount = Math.floor(tempHeight / lastRowHeight);
			tempHeight = lastRowHeight;
		}
		List<String> pages = new ArrayList<String>();
		pages.add("sheetPage");
		pages.add("groupSheet");
		pages.add("continuousGroupSheet");
		pages.add("continuousPageSheet");
		if ((Boolean) pageInfos.get("isLastGroup")) {
			pages.add("continuousSheet");
		}
		for (int i = 0; i < fillCount; i++) {
			double pageHeight = MapUtil.getDouble(pageInfos, "pageHeight");
			pageInfos.put("pageHeight", pageHeight + tempHeight);
			Map<String, Object> dataTable = JsonUtil.parseObject(JsonUtil.toJSONString(lastRow.getDataTable()));
			for (Entry<String, Object> entry : dataTable.entrySet()) {
				Map map = new HashMap();
				Map value = (Map) entry.getValue();
				Object style = value.get("style");
				map.put("style", style);
				dataTable.put(entry.getKey(), map);
			}
			Map rows = new HashMap();
			// 行高
			Object defRowHeight = JsonUtil.get(pageInfos, "defaults", "rowHeight");
			if (defRowHeight == null || tempHeight != (Integer) defRowHeight) {
				rows.put("size", tempHeight);
			}
			List spans = new ArrayList();
			for (Map span : lastRow.getSpans()) {
				Map map = new HashMap(span);
				map.put("rowCount", 1);
				map.put("row", sheetPage.getRowCount());
				spans.add(map);
			}
			for (String item : pages) {
				Sheet sheet = (Sheet) pageInfos.get(item);
				Map args = new HashMap();
				args.put("spans", spans);
				args.put("rows", rows);
				args.put("rules", new ArrayList());
				args.put("dataTable", dataTable);
				args.put("autoMergeRanges", new ArrayList());
				args.put("rowHeight", tempHeight);
				args.put("defaultRowHeight", JsonUtil.get(pageInfos, "defaults", "rowHeight"));
				args.put("expandDataTable", new HashMap());
				sheet.addDataTable(args);
			}
		}
	}

	private void fillData1(Map params) {
		int contentHeight = (Integer) params.get("contentHeight");
		Map pageInfos = (Map) params.get("pageInfos");
		Object sheetPage = params.get("sheetPage");
		int diffHeight = (Integer) params.get("diffHeight");
		List contentTemplates = (List) params.get("contentTemplates");
		// 最后一页才填充数据
		if (!(!(Boolean) pageInfos.get("flag") && (Boolean) pageInfos.get("isFillData"))) {
			return;
		}
		int tempHeight = diffHeight - 10;
		if (tempHeight <= 0) {
			return;
		}
		// 1，单行填充
		double fillCount = 1;
		// 2，多行填充
		if (!(Boolean) pageInfos.get("singleRowFill")) {
			fillCount = Math.floor(tempHeight / contentHeight);
			tempHeight = contentHeight;
		}
		Map parameters = new HashMap();
		parameters.put("templates", contentTemplates);
		parameters.put("pageInfos", pageInfos);
		parameters.put("sheetPage", sheetPage);
		parameters.put("fillCount", fillCount);
		parameters.put("tempHeight", tempHeight);
		this.genPageDataTables(parameters);
		return;
	}

	private Map genPageInfos(Map params) {
		Map sheet = (Map) params.get("sheet");
		String name = (String) sheet.get("name");
		Map data = (Map) sheet.get("data");
		Object paperSizeHeight = JsonUtil.get(sheet, "printInfo", "paperSize", "height");
		BigDecimal paperHeight = null;
		if (paperSizeHeight instanceof BigDecimal) {
			paperHeight = (BigDecimal) paperSizeHeight;
		} else if (paperSizeHeight instanceof Integer) {
			paperHeight = BigDecimal.valueOf((Integer) paperSizeHeight);
		}
		double height = 0;
		if (paperHeight != null && paperHeight.intValue() != 0) {
			height = 1100;
		} else {
			height = paperHeight.doubleValue();
		}
		Object paperSizeWidth = JsonUtil.get(sheet, "printInfo", "paperSize", "width");
		;
		BigDecimal paperWidth = null;
		if (paperWidth instanceof BigDecimal) {
			paperWidth = (BigDecimal) paperSizeWidth;
		} else if (paperSizeWidth instanceof Integer) {
			paperWidth = BigDecimal.valueOf((Integer) paperSizeWidth);
		}
		double width = 0;
		if (paperWidth != null && paperWidth.intValue() != 0) {
			width = paperWidth.doubleValue();
		} else {
			width = 850;
		}
		int orientation = JsonUtil.getInt(sheet, "printInfo", "orientation");
		Map margin = (Map) JsonUtil.get(sheet, "printInfo", "margin");
		if (margin == null) {
			margin = new HashMap(4);
			margin.put("bottom", 75);
			margin.put("top", 75);
			margin.put("left", 75);
			margin.put("right", 75);
		}
		Object showColumnHeaderVal = JsonUtil.get(sheet, "printInfo", "showColumnHeader");
		int showColumnHeader = 1;
		if(showColumnHeaderVal!=null){
			showColumnHeader = (Integer)showColumnHeaderVal;
		}
		List<Map> colHeaderRowInfos = (List) MapUtil.get(sheet, "colHeaderRowInfos", new ArrayList());
		List columns = (List) sheet.get("columns");
		Map defaults = (Map) sheet.get("defaults");
		Map templateInfo = (Map) JsonUtil.get(this.tempConfig, name);
		boolean isFillData = false;
		boolean singleRowFill = false;
		String sheetTag = (String) JsonUtil.get(data, "defaultDataNode", "tag");
		Map tag = new HashMap();
		if (!StringUtil.isEmpty(sheetTag)) {
			Map res = JsonUtil.parseObject(sheetTag);
			isFillData = MapUtil.getBoolean(res, "isFillData");
			singleRowFill = MapUtil.getBoolean(res, "singleRowFill");
			tag = res;
		}
		int marginBottom = (Integer) margin.get("bottom");
		int marginTop = (Integer) margin.get("top");
		int marginLeft = (Integer) margin.get("left");
		int marginRight = (Integer) margin.get("right");
		double pageTotalHeight = 0;
		int printConversionUnits = this.printConversionUnits;
		double _width = (printConversionUnits * width) / 100;
		double _height = (printConversionUnits * height) / 100;
		marginBottom = (printConversionUnits * marginBottom) / 100;
		marginTop = (printConversionUnits * marginTop) / 100;
		marginLeft = (printConversionUnits * marginLeft) / 100;
		marginRight = (printConversionUnits * marginRight) / 100;
		this.paper.put("width", _width);
		this.paper.put("height", _height);
		this.paper.put("paddingBottom", marginBottom);
		this.paper.put("paddingTop", marginTop);
		this.paper.put("paddingLeft", marginLeft);
		this.paper.put("paddingRight", marginRight);

		int defaultHeaderHeight = JsonUtil.getInt(defaults, "colHeaderRowHeight");
		if (colHeaderRowInfos.size() > 0) {
			int areaHeight = 0;
			for (Map item : colHeaderRowInfos) {
				int size = (Integer) defaults.get("rowHeight");
				if (item.containsKey("size")) {
					size = (Integer) item.get("size");
				}
				areaHeight += size;
			}
			defaultHeaderHeight = areaHeight;
		}

		int colHeaderHeight = showColumnHeader == 2 ? defaultHeaderHeight : 0;
		if (orientation == 2) {
			pageTotalHeight = _width - marginBottom - marginTop - colHeaderHeight;
			this.paper.put("width", _height);
			this.paper.put("height", _width);
		} else {
			pageTotalHeight = _height - marginBottom - marginTop - colHeaderHeight;
		}
		Map pageInfos = new HashMap();
		pageInfos.put("spans", new ArrayList());
		pageInfos.put("rows", new ArrayList());
		pageInfos.put("rules", new ArrayList());
		pageInfos.put("dataTable", new HashMap());
		pageInfos.put("autoMergeRanges", new ArrayList());
		pageInfos.put("rowCount", 0);
		pageInfos.put("pageIndex", 1);
		pageInfos.put("pageTotal", 1);
		pageInfos.put("pageArea", tag.get("pageArea"));
		pageInfos.put("pageTotalHeight", pageTotalHeight);
		pageInfos.put("pageHeight", 0);
		pageInfos.put("singleRowFill", singleRowFill);
		pageInfos.put("isFillData", isFillData);
		pageInfos.put("page", new HashMap());
		pageInfos.put("columns", columns);
		pageInfos.put("defaults", defaults);
		return pageInfos;
	}

	private void collectTemplate(Map temp, String type) {
		this.collectTemplate(temp, type, new ArrayList());
	}

	private void collectTemplate(Map temp, String type, List columns) {
		Map<String, Object> datas = (Map) temp.get("datas");
		Map allDatas = (Map) temp.get("allDatas");
		List dataTables = (List) temp.get("dataTables");
		List<String> dataPath = (List<String>) temp.get("dataPath");
		List cellPlugins = (List) temp.get("cellPlugins");
		List usedTables = (List) temp.get("usedTables");
		boolean isTotalArea = (Boolean) temp.get("isTotalArea");
		boolean isGroupSumArea = (Boolean) temp.get("isGroupSumArea");
		int tempHeight = (Integer) temp.get("height");

		// 生成联合数据源
		Map setting = new HashMap();
		if(this.setting!=null) {
			setting.putAll(this.setting);
		}
		setting.put("cellPlugins", cellPlugins);
		UnionDatasource unionDatasource = new UnionDatasource(dataPath, setting);
		unionDatasource.load(datas);
		for (Entry<String, Object> entry : datas.entrySet()) {
			String tableCode = entry.getKey();
			Map map = new HashMap();
			map.put("tableCode", tableCode);
			map.put("datas", datas);
			map.put("unionDatasource", unionDatasource);
			map.put("type", type);
			map.put("temp", temp);
			map.put("dataPath", dataPath);
			map.put("setting", setting);
			this.dataSourceMap.add(map);
		}
		temp.put("unionDatasource", unionDatasource);
		Map args = new HashMap(2);
		args.put("variablesDefine", this.variablesDefine);
		args.put("unionDatasource", unionDatasource);
		Variables variables = new Variables();
		variables.setUnionDatasource(unionDatasource);
		variables.setVariableDefines(this.variablesDefine);
		temp.put("variable", variables);
		UnionDatasource unionDatasourceAll = new UnionDatasource(dataPath, setting);
		unionDatasourceAll.load(allDatas);
		temp.put("unionDatasourceAll", unionDatasourceAll);
		// 计算高度
		int height = 0;
		int dataLen = "content".equals(type) ? 1 : unionDatasource.getCount();
		if (dataLen == 0 || isTotalArea || isGroupSumArea) {
			dataLen = 1;
		}
		Map datasMap = new HashMap();
		datasMap.putAll((Map) this.templates.get("datas"));
		datasMap.putAll(datas);
		this.templates.put("datas", datasMap);
		for (int i = 0; i < dataLen; i++) {
			height += tempHeight;
		}
		// 如果不是章合计区域并且不是总计区域
		if (!(Boolean) temp.get("isTotalArea") && !(Boolean) temp.get("isGroupSumArea")) {
			List template = (List) JsonUtil.get(this.templates, type, "template");
			template.add(temp);
			JsonUtil.selfAddSet(this.templates, height, type, "height");
		} else {
			String areaKey = (Boolean) temp.get("isTotalArea") ? "totalArea" : "groupSumArea";
			JsonUtil.selfAddSet(this.templates, height, type, areaKey, "height");
			int len = ((List) JsonUtil.get(this.templates, type, "template")).size();
			JsonUtil.set(this.templates, temp, type, areaKey, "dataTables", len + "");
			((List) JsonUtil.get(this.templates, type, "template")).add(null);
		}

		// 所有模板
		if ("content".equals(type)) {
			int count = unionDatasource.getCount();
			if (count == 0) {
				count = 1;
			}
			JsonUtil.set(this.templates, count, type, "dataLen");
		}
		Set newUsedTables = new HashSet((Collection) JsonUtil.get(this.templates, type, "usedTables"));
		newUsedTables.addAll(usedTables);
		JsonUtil.set(this.templates, new HashSet(newUsedTables), type, "usedTables");
	}

	private void genTemplateFromSheet(Map sheet) {
		this.namedStyles = new ArrayList();
		int rowCount = (Integer) MapUtil.get(sheet, "rowCount", 200);
		Map data = (Map) sheet.get("data");
		List columns = (List) sheet.get("columns");
		this.initTempates();
		String sheetTag = (String) JsonUtil.get(data, "defaultDataNode", "tag");
		Map tag = new HashMap();
		if (!StringUtil.isEmpty(sheetTag)) {
			Map res = JsonUtil.parseObject(sheetTag);
			tag = res;
		}
		Pattern REG = Pattern.compile("^\\d+:\\d+$");
		String pageArea = (String) MapUtil.get(tag, "pageArea", "");
		String groupSumArea = (String) MapUtil.get(tag, "groupSumArea", "");
		String totalArea = (String) MapUtil.get(tag, "totalArea", "");
		Map<String, Object> columnConfig = (Map<String, Object>) tag.get("columnConfig");
		// 分页区域范围
		int pageAreaStartRow = rowCount;
		int pageAreaEndRow = rowCount;
		if (!StringUtil.isEmpty(pageArea) && REG.matcher(pageArea) != null) {
			String[] res = pageArea.split(":");
			pageAreaStartRow = Integer.valueOf(res[0]) - 1;
			pageAreaEndRow = Integer.valueOf(res[1]);
		}

		// 分组汇总区域范围
		int groupSumAreaStartRow = rowCount;
		int groupSumAreaEndRow = rowCount;

		if (!StringUtil.isEmpty(groupSumArea) && REG.matcher(groupSumArea) != null) {
			String[] res = groupSumArea.split(":");
			groupSumAreaStartRow = Integer.valueOf(res[0]) - 1;
			groupSumAreaEndRow = Integer.valueOf(res[1]);
		}

		// 统计区域范围
		int totalAreaStartRow = rowCount;
		int totalAreaEndRow = rowCount;
		if (!StringUtil.isEmpty(totalArea) && REG.matcher(totalArea) != null) {
			String[] res = totalArea.split(":");
			totalAreaStartRow = Integer.valueOf(res[0]) - 1;
			totalAreaEndRow = Integer.valueOf(res[1]);
		}
		ColumnConfig columnInfos = new ColumnConfig(columnConfig);
		int numberOfColumns = columnInfos.getNumberOfColumns();
		boolean fixed = columnInfos.isFixed();
		int fixedColumnCount = columnInfos.getFixedColumnCount();
		int blankSpan = columnInfos.getBlankSpan();
		this.numberOfColumns = numberOfColumns;
		this.fixed = fixed;
		this.fixedColumnCount = fixedColumnCount;
		this.blankSpan = blankSpan;
		Map template = null;
		int row = 0;
		do {
			Map args = new HashMap();
			args.put("row", row);
			args.put("sheet", sheet);
			args.put("columnInfos", columnInfos);
			Map rowTemplate = this.parseRowDataTable(args);
			// 判断当前行是否属于分组汇总区域
			if (row >= groupSumAreaStartRow && row < groupSumAreaEndRow) {
				rowTemplate.put("isGroupSumArea", true);
			}

			// 判断当前行是否属于总计区域
			if (row >= totalAreaStartRow && row < totalAreaEndRow) {
				rowTemplate.put("isTotalArea", true);
			}

			// 当前行与上一行存在合并关系，这两行作为一个模板
			if (template != null && row < (Integer) template.get("endRow")) {
				JsonUtil.selfAddSet(template, (Integer) rowTemplate.get("height"), "height");
				((List) template.get("dataTables")).addAll((List) rowTemplate.get("dataTables"));
				if ((Integer) rowTemplate.get("endRow") > (Integer) template.get("endRow")) {
					template.put("endRow", rowTemplate.get("endRow"));
					template.put("rowCount", (Integer) template.get("endRow") - (Integer) template.get("row"));
				}
				template.put("datas", MapUtil.mergeNew((Map) template.get("datas"), (Map) rowTemplate.get("datas")));
				template.put("allDatas",
						MapUtil.mergeNew((Map) template.get("allDatas"), (Map) rowTemplate.get("allDatas")));
				if ((Boolean) rowTemplate.get("isGroupSumArea")) {
					template.put("isGroupSumArea", rowTemplate.get("isGroupSumArea"));
				}
				((List) template.get("dataPath")).addAll((List) rowTemplate.get("dataPath"));
				((List) template.get("cellPlugins")).addAll((List) rowTemplate.get("cellPlugins"));
				template.put("tableCodes",
						MapUtil.mergeNew((Map) template.get("tableCodes"), (Map) rowTemplate.get("tableCodes")));
			} else {
				template = rowTemplate;
			}

			// 分页区域作为一个整体处理
			if (row >= pageAreaStartRow && row < pageAreaEndRow) {
				template.put("endRow", pageAreaEndRow);
				template.put("rowCount", (Integer) template.get("endRow") - (Integer) template.get("row"));
			}
			// 将模板方法指定区域模板中
			if (row + 1 == (Integer) template.get("endRow")) {
				template.put("verticalAutoMergeRanges", new ArrayList());
				for (Map dataTable : (List<Map>) template.get("dataTables")) {
					List mergeInfos = (List) MapUtil.get(dataTable, "mergeInfos", new ArrayList());
					int len = mergeInfos.size();
					if (len > 0) {
						List<Map> autoMergeRanges = new ArrayList();
						Map merge = (Map) mergeInfos.get(0);
						for (int i = 1; i < len; i++) {
							Map item = (Map) mergeInfos.get(i);
							if ((Integer) merge.get("row") == (Integer) item.get("row")
									&& (Integer) merge.get("rowCount") == (Integer) item.get("rowCount")
									&& (Boolean) merge.get("columnMerge") == (Boolean) item.get("columnMerge")
									&& (Boolean) merge.get("rowMerge") == (Boolean) item.get("rowMerge")
									&& (Integer) merge.get("col")
											+ (Integer) merge.get("colCount") == (Integer) item.get("col")) {
								JsonUtil.selfAddSet(merge, (Integer) item.get("colCount"), "colCount");
							} else {
								SheetUtil.genAutoMergeRanges(merge, autoMergeRanges, (Integer) template.get("row"));
								merge = item;
							}
						}
						SheetUtil.genAutoMergeRanges(merge, autoMergeRanges, (Integer) template.get("row"));
						dataTable.put("autoMergeRanges", new ArrayList());
						for (Map item : autoMergeRanges) {
							if ((Integer) JsonUtil.get(item, "range", "rowCount") == (Integer) template
									.get("rowCount")) {
								((List) template.get("verticalAutoMergeRanges")).add(item);
							} else if ((Integer) JsonUtil.get(item, "range", "colCount") > 1) {
								((List) dataTable.get("autoMergeRanges")).add(item);
							}
						}
					}
				}

				if ((Integer) template.get("row") < pageAreaStartRow) {
					this.collectTemplate(template, "header", columns);
				} else if ((Integer) template.get("row") >= pageAreaEndRow) {
					this.collectTemplate(template, "footer", columns);
				} else {
					this.collectTemplate(template, "content", columns);
				}
				template = null;
			}

			row++;
		} while (row < rowCount);

		// 行分栏
		if (columnConfig != null && numberOfColumns > 1 && !fixed) {
			List columnList = (List) sheet.get("columns");

			if (columnList != null) {
				int columnCount = (Integer) sheet.get("columnCount");
				sheet.put("columns", new ArrayList(columnList));
				for (int i = 0; i < columnCount; i++) {
					for (int j = 0; j < numberOfColumns; j++) {
						JsonUtil.set(sheet, columns.get(i), "columns", (i + j * columnCount) + "");
					}
				}
			}
		}
	}

	private Map copySheet(Map sheet) {
		Map _sheet = JsonUtil.parseObject(JsonUtil.toJSONString(sheet));
		_sheet.put("namedStyles", this.namedStyles);
		return _sheet;
	}

	private void parse() {
		Collection<Map> sheets = ((Map) this.reportJson.get("sheets")).values();
		this.sheetNames = new ArrayList();
		for (Map sheet : sheets) {
			int visible = (Integer) MapUtil.get(sheet, "visible", 1);
			String name = (String) sheet.get("name");
			boolean isSelected = (Boolean) sheet.get("isSelected");
			// 当前sheet不可见，直接跳过解析
			if (visible == 0) {
				continue;
			}
			Map templateInfo = (Map) this.tempConfig.get(name);
			// 新模板放在sheet上，不再放在store中
			String sheetTagStr = (String) JsonUtil.get(sheet, "data", "defaultDataNode", "tag");
			Map sheetTag = new HashMap();
			if (!StringUtil.isEmpty(sheetTagStr)) {
				sheetTag = JsonUtil.parseObject(sheetTagStr);
			}
			Map template = (Map) sheetTag.get("template");
			if (template != null) {
				templateInfo = template;
			}
			List variables = (List) sheetTag.get("variables");
			if (variables != null) {
				this.variablesDefine = variables;
			}
			
			if (isSelected) {
				this.activeSheetName = name;
			}
			this.horizontalExpansionInfos = new HashMap();
			this.horizontalExpansionInfos.put("columns", new HashMap());
			this.initTempates();
			this.genTemplateFromSheet(sheet);
			if ((Integer) sheet.get("columnCount") > 0 && !this.fixed) {
				this.oldSheetCount = (Integer) sheet.get("columnCount");
				sheet.put("columnCount", (Integer) sheet.get("columnCount") * this.numberOfColumns);
			}
			
			List sheetNames = new ArrayList();
			sheetNames.add(name);
			Map sheetDatas = new HashMap();
			String tableCode = "";
			
			if (templateInfo != null) {
				Map res = this.groupDatas(templateInfo);
				sheetDatas = (Map) res.get("sheetDatas");
				List groupNames = (List) res.get("groupNames");
				if (groupNames.size() > 0) {
					sheetNames = groupNames;
				}
				tableCode = (String) res.get("tableCode");
			}
			Map args = new HashMap();
			args.put("sheet", sheet);
			Map pageInfos = this.genPageInfos(args);
			pageInfos.put("tableCode", tableCode);
			Map templates = this.templates;
			int groupCount = sheetNames.size();
			boolean isPage = StringUtil.isEmpty((String) pageInfos.get("pageArea")) ? false : true;
			Map sheetPages = new HashMap();
			sheetPages.put("isPage", isPage);
			sheetPages.put("pageIndex", 0);
			sheetPages.put("datas", new ArrayList());
			this.sheetPages.put(name, sheetPages);
			pageInfos.put("unionDatasourceDatas", new HashMap());
			pageInfos.put("showPageCount", 1);
			// 连续导出
			Sheet continuousSheet = new Sheet();
			continuousSheet.setSheet(this.copySheet(sheet));
			continuousSheet.setDatas(datas);
			continuousSheet.setShapesEnhancer(this.shapesEnhancer);
			JsonUtil.set(this.exportType, continuousSheet, "continuous", name);
			pageInfos.put("continuousSheet", continuousSheet);
			// 连续分页导出
			Sheet continuousPageSheet = new Sheet();
			continuousPageSheet.setSheet(this.copySheet(sheet));
			continuousPageSheet.setDatas(datas);
			continuousPageSheet.setShapesEnhancer(this.shapesEnhancer);
			JsonUtil.set(this.exportType, continuousPageSheet, "continuousPage", name);
			pageInfos.put("continuousPageSheet", continuousPageSheet);

			Sheet sheetPage = new Sheet();
			sheetPage.setSheet(this.copySheet(sheet));
			sheetPage.setDatas(datas);
			sheetPage.setShapesEnhancer(this.shapesEnhancer);
			pageInfos.put("sheetPage", sheetPage); // 未分页
			pageInfos.put("isFirstPage", true);

			// sheetNames:1,分组的时候是每一个分组的名称；2，未分组的时候是当前sheet的名称
			for (int index = 0, l = sheetNames.size(); index < l; index++) {
				String sheetName = (String) sheetNames.get(index);
				pageInfos.put("sheet", this.copySheet(sheet));
				pageInfos.put("isFirstGroupPage", true);
				// 分组导出实列
				Sheet groupSheet = new Sheet();
				groupSheet.setSheet(this.copySheet(sheet));
				groupSheet.setDatas(datas);
				groupSheet.setShapesEnhancer(this.shapesEnhancer);
				JsonUtil.set(this.exportType, groupSheet, "group", sheetName);
				pageInfos.put("groupSheet", groupSheet);

				// 连续分组导出实列
				Sheet continuousGroupSheet = new Sheet();
				continuousGroupSheet.setSheet(this.copySheet(sheet));
				continuousGroupSheet.setDatas(datas);
				continuousGroupSheet.setShapesEnhancer(this.shapesEnhancer);
				JsonUtil.set(this.exportType, continuousGroupSheet, "continuousGroup", sheetName);
				pageInfos.put("continuousGroupSheet", continuousGroupSheet);
				pageInfos.put("groupName", sheetName);
				pageInfos.put("isLastGroup", groupCount == index + 1);
				pageInfos.put("groupIndex", index);
				pageInfos.put("groupCount", groupCount);
				
				Object groupDatas = sheetDatas.get(sheetName);
				if (groupDatas != null) {
					pageInfos.put("groupDatas", groupDatas);
					for (Map<String, Object> item : this.dataSourceMap) {
						String dsCode = (String) item.get("tableCode");
						Map datas = (Map) item.get("datas");
						UnionDatasource unionDatasource = (UnionDatasource) item.get("unionDatasource");
						Map temp = (Map) item.get("temp");
						List<String> dataPath = (List<String>) item.get("dataPath");
						Map setting = (Map) item.get("setting");
						if (dsCode.equals(pageInfos.get("tableCode"))) {
							Map newDatas = new HashMap(datas);
							newDatas.put(dsCode, pageInfos.get("groupDatas"));
							UnionDatasource datasource = new UnionDatasource(dataPath, setting);
							temp.put("unionDatasource", datasource);
							Variables variable = new Variables();
							variable.setUnionDatasource(unionDatasource);
							variable.setVariableDefines(this.variablesDefine);
							temp.put("variable", variable);
							datasource.load(newDatas);
							JsonUtil.set(this.templates, pageInfos.get("groupDatas"), "datas", dsCode);
							JsonUtil.set(pageInfos, newDatas, "unionDatasourceDatas", sheetName);
							unionDatasource.load(newDatas);
						}
					}
				}
				if (index > 0) {
					// 强制打印时在当前行换页
					this.onAfterPage(pageInfos);
				}
				this.render(pageInfos, templates);
			}
			//横向扩展
			List<String> pages = new ArrayList();
			pages.add("groupSheet");
			pages.add("continuousGroupSheet");
			pages.add("continuousPageSheet");
			pages.add("continuousSheet");
			for(String item:pages){
				Sheet _sheet = (Sheet)pageInfos.get(item);
				_sheet.handleExpandDataTables();
			}
			
			Sheet setting = (Sheet) JsonUtil.get(this.sheetPages, name, "datas", "0");
			this.resetSheet(setting);
			JsonUtil.set(this.reportJson, setting.getSheet(), "sheets", name);
		}
	}

	private Map parseRowDataTable(Map params) {
		ColumnConfig columnInfos = (ColumnConfig) params.get("columnInfos");
		Map sheet = (Map) params.get("sheet");
		final int row = (Integer) params.get("row");
		int numberOfColumns = columnInfos.getNumberOfColumns();
		boolean fixed = columnInfos.isFixed();
		// 复制区域
		int copyAreaStartRow = columnInfos.getCopyAreaStartRow();
		int copyAreaEndRow = columnInfos.getCopyAreaEndRow();
		int copyAreaStarCol = columnInfos.getCopyAreaStarCol();
		int copyAreaEndCol = columnInfos.getCopyAreaEndCol();
		// 分栏区域
		int columnAreaStartRow = columnInfos.getColumnAreaStartRow();
		int columnAreaEndRow = columnInfos.getColumnAreaEndRow();
		int columnAreaStarCol = columnInfos.getColumnAreaStarCol();
		int columnAreaEndCol = columnInfos.getColumnAreaEndCol();
		List spans = (List) MapUtil.get(sheet, "spans", new ArrayList());
		Map data = (Map) MapUtil.get(sheet, "data", new HashMap());
		List rows = (List) MapUtil.get(sheet, "rows", new ArrayList());
		Map conditionalFormats = (Map) MapUtil.get(sheet, "conditionalFormats", new HashMap());
		Map defaults = (Map) MapUtil.get(sheet, "defaults", DefaultUtil.getSheetDefaults());
		int columnCount = (Integer) MapUtil.get(sheet, "columnCount", 20);
		List<Map> shapes = (List) MapUtil.get(sheet, "shapes", new ArrayList());
		List rules = (List) MapUtil.get(conditionalFormats, "rules", new ArrayList());
		Map dataTable = (Map) MapUtil.get(data, "dataTable", new HashMap());
		Map rowDataTable = (Map) MapUtil.get(dataTable, row, new HashMap());
		Map args = new HashMap(2);
		args.put("rules", rules);
		args.put("row", row);
		List rowRules = SheetUtil.getRowRules(args);
		final Map dataTableInfos = JsonUtil
				.parseObject("{\"spans\":[],\"mergeInfos\":[],\"rules\":[],\"columns\":[],\"shapes\":[]}");
		dataTableInfos.put("rowDataTable", rowDataTable);
		for (Map item : shapes) {
			if ((Integer) JsonUtil.get(item, "shapeData", "startPoint", "row") == row) {
				((List) dataTableInfos.get("shapes")).add(item);
			}
		}
		boolean isColumnRow = (row >= copyAreaStartRow && row < copyAreaEndRow)
				|| (row >= columnAreaStartRow && row < columnAreaEndRow);
		Map result = JsonUtil.parseObject(
				"{\"rowCount\":1,\"datas\":{},\"allDatas\":{},\"dataLen\":0,\"height\":0,\"isGroupSumArea\":false,\"isTotalArea\":false,\"dataPath\":[],\"cellPlugins\":[],\"tableCodes\":{},\"usedTables\":[]}");
		result.put("row", row);
		result.put("endRow", row + 1);
		List dataTablesList = new ArrayList();
		dataTablesList.add(dataTableInfos);
		result.put("dataTables", dataTablesList);
		// final int maxRowCount=1;
		final int[] maxRowCounts = new int[] { 1 };
		// 当前行的合并信息
		List rowSpans = CollectionUtil.filter(spans, new IFilter<Map>() {

			public boolean filter(Map span) {
				if ((Integer) span.get("row") == row) {
					int rowCount = (Integer) span.get("rowCount");
					if (rowCount > maxRowCounts[0]) {
						maxRowCounts[0] = rowCount;
					}
					return true;
				}
				return false;
			}
		});
		((List) dataTableInfos.get("spans")).addAll(rowSpans);
		// 行高等信息
		dataTableInfos.put("rows", SheetUtil.getOldRowHeight(rows, row, (Integer) defaults.get("rowHeight")));
		result.put("height", JsonUtil.get(dataTableInfos, "rows", "size"));

		int newColIndex = 0;
		Map newRowDataTable = new HashMap();
		int endCol = -1;
		for (int i = 0; i < columnCount; i++) {
			Map _colDataTable = (Map) rowDataTable.get(i);
			int _newColIndex = newColIndex;
			int colStr = i;
			final int compareIndex = i;
			Map cellSpan = (Map) CollectionUtil.find(rowSpans, new IFilter<Map>() {

				public boolean filter(Map span) {
					return (Integer) span.get("col") == compareIndex;
				}
			});
			if (cellSpan == null && _newColIndex + 1 >= endCol) {
				cellSpan = JsonUtil.parseObject(
						"{\"row\":" + row + ",\"col\":" + _newColIndex + ",\"colCount\":1,\"rowCount\":1}");
			}
			if (cellSpan != null && numberOfColumns > 1 && !fixed) {
				if (!isColumnRow) {
					cellSpan.put("colCount", (Integer) cellSpan.get("colCount") * numberOfColumns);
					((List) dataTableInfos.get("spans")).add(cellSpan);
				}

				endCol = (Integer) cellSpan.get("colCount") + _newColIndex;
			}

			if (!isColumnRow && !fixed) {
				newColIndex = newColIndex + numberOfColumns;
			} else {
				newColIndex++;
			}

			if (_colDataTable == null && numberOfColumns > 1 && !fixed) {
				for (int index = 0; index < numberOfColumns; index++) {
					newRowDataTable.put(_newColIndex + index, new HashMap());
				}
				continue;
			}
			_colDataTable = _colDataTable == null ? new HashMap() : _colDataTable;
			String bindingPath = (String) _colDataTable.get("bindingPath");
			String tag = (String) _colDataTable.get("tag");
			Object formula = (Object) _colDataTable.get("formula");
			Object style = _colDataTable.get("style");
			// Map style = (Map)MapUtil.get(_colDataTable, "style", new HashMap());
			if (row >= copyAreaStartRow && row < copyAreaEndRow && numberOfColumns > 1) {
				if (fixed) {
					for (int col = 0; col < numberOfColumns; col++) {
						if (_newColIndex >= copyAreaStarCol && _newColIndex < copyAreaEndCol) {
							int index = _newColIndex + col * (copyAreaEndCol - copyAreaStarCol)
									+ (col > 0 ? this.blankSpan : 0);
							newRowDataTable.put(index, _colDataTable);
						}
					}
				} else {
					for (int col = 0; col < numberOfColumns; col++) {
						newRowDataTable.put(_newColIndex + i * columnCount, _colDataTable);
					}
				}
			} else if (row >= columnAreaStartRow && row < columnAreaEndRow && numberOfColumns > 1 && fixed) {
				if (_newColIndex >= columnAreaStarCol && _newColIndex < columnAreaEndCol) {
					newRowDataTable.put(_newColIndex, _colDataTable);
				}
			} else {
				newRowDataTable.put(_newColIndex, _colDataTable);
			}

			boolean isHorizontalExpansion = false;
			List colPlugins = null;
			if (!StringUtil.isEmpty(tag)) {
				Map jsonTag = JsonUtil.parseObject(tag);
				List<Map> plugins = (List<Map>) jsonTag.get("plugins");
				if (plugins != null) {
					colPlugins = plugins;
					String rowHeightType = "";
					for (Map plugin : plugins) {
						Map config = (Map) plugin.get("config");
						if (config != null) {
							String rowHeight = (String) config.get("rowHeight");
							if (!StringUtil.isEmpty(rowHeight)) {
								rowHeightType = rowHeight;
							}
							String direction = (String) plugin.get("direction");
							if ("horizontal".equals(direction)) {
								isHorizontalExpansion = true;
							}
						}
					}

					// 当前单元格是否是横向扩展
					if (isHorizontalExpansion) {
						this.isHorizontalExpansion = true;
						String tableCode = bindingPath.split(".")[0];
						Map cfg = (Map) JsonUtil.get(this.horizontalExpansionInfos, "columns", colStr + "");
						if (cfg == null) {
							cfg = new HashMap();
							cfg.put("tableCodes", new HashMap());
							cfg.put("dataPath", new ArrayList());
							cfg.put("cellPlugins", new ArrayList());
						}
						JsonUtil.set(this.horizontalExpansionInfos, cfg, "columns", colStr + "");
						((Map) cfg.get("tableCodes")).put(tableCode, true);
						((List) cfg.get("dataPath")).add(bindingPath);
						Map cellPlugin = new HashMap();
						cellPlugin.put("plugins", plugins);
						cellPlugin.put("bindingPath", bindingPath);
						((List) cfg.get("cellPlugins")).add(cellPlugin);
						List dsDatas = (List) this.datas.get(tableCode);
						if (dsDatas == null) {
							dsDatas = new ArrayList();
						}
						JsonUtil.set(this.templates, dsDatas, "datas", tableCode);
					}
				}
			}

			// 样式采用命名空间
			String namedStyles = null;
			Object cellStyle = _colDataTable.get("style");
			if (cellStyle != null && !(cellStyle instanceof String)) {
				Map cellStyleMap = (Map) cellStyle;
				Object parentName = cellStyleMap.get("parentName");
				if (parentName == null) {
					namedStyles = VarUtil.getVarName();
					Map styleDef = new HashMap(cellStyleMap);
					styleDef.put("name", namedStyles);
					this.namedStyles.add(styleDef);
					_colDataTable.put("style", namedStyles);
				}
			}

			final int col = Integer.valueOf(colStr);
			boolean isBindEntity = bindingPath != null ? bindingPath.contains(".") : false;
			if (isBindEntity) {
				String tableCode = bindingPath.split("\\.")[0];
				if (!isHorizontalExpansion) {
					((List) result.get("dataPath")).add(bindingPath);
					((Map) result.get("tableCodes")).put(tableCode, true);
					((List) result.get("usedTables")).add(tableCode);
					List dsDatas = (List) this.datas.get(tableCode);
					List allDsDatas = (List) this.datas.get(tableCode);
					if (dsDatas == null) {
						dsDatas = new ArrayList();
					}
					if (allDsDatas == null) {
						allDsDatas = new ArrayList();
					}
					((Map) result.get("datas")).put(tableCode, dsDatas);
					((Map) result.get("allDatas")).put(tableCode, allDsDatas);
				}
				Map span = (Map) CollectionUtil.find(rowSpans, new IFilter<Map>() {

					public boolean filter(Map span) {
						return (Integer) span.get("col") == col;
					}
				});
				if (span == null) {
					span = new HashMap();
					span.put("rowCount", 1);
					span.put("colCount", 1);
				}
				if (!StringUtil.isEmpty(tag)) {
					// 收集当前单元格是否已经设置了行合并或列合并
					Map jsonTag = JsonUtil.parseObject(tag);
					boolean columnMerge = MapUtil.getBoolean(jsonTag, "columnMerge");
					boolean rowMerge = MapUtil.getBoolean(jsonTag, "rowMerge");
					if (columnMerge || rowMerge) {
						Map mergeInfo = new HashMap(span);
						mergeInfo.put("row", row);
						mergeInfo.put("col", col);
						mergeInfo.put("columnMerge", columnMerge);
						mergeInfo.put("rowMerge", rowMerge);
						((List) dataTableInfos.get("mergeInfos")).add(mergeInfo);
					}
					List plugins = (List) jsonTag.get("plugins");
					if (plugins != null && !isHorizontalExpansion) {
						Map pluginDef = new HashMap();
						pluginDef.put("plugins", plugins);
						pluginDef.put("bindingPath", bindingPath);
						pluginDef.put("formula", formula);
						((List) result.get("cellPlugins")).add(pluginDef);
					}
				}
			} else if (!StringUtil.isEmpty(tag)) {
				Map jsonTag = JsonUtil.parseObject(tag);
				List plugins = (List) jsonTag.get("plugins");
				Map cellPlugin = new HashMap();
				cellPlugin.put("plugins", plugins);
				cellPlugin.put("formula", formula);
				((List) result.get("cellPlugins")).add(cellPlugin);
			}
			if (formula instanceof String &&( !StringUtil.isEmpty((String) formula) || colPlugins != null)) {
				List<String> tableCodes = formulaEngine.getTableCodesFromFormula((String) formula, colPlugins);
				if (tableCodes != null) {
					for (String tableCode : tableCodes) {
						
						List usedTables = (List)result.get("usedTables");
						usedTables.add(tableCode);
						
						((Map) result.get("tableCodes")).put(tableCode, true);
						List dsDatas = (List) this.datas.get(tableCode);
						List allDsDatas = (List) this.datas.get(tableCode);
						if (dsDatas == null) {
							dsDatas = new ArrayList();
						}
						if (allDsDatas == null) {
							allDsDatas = new ArrayList();
						}
						((Map) result.get("datas")).put(tableCode, dsDatas);
						((Map) result.get("allDatas")).put(tableCode, allDsDatas);
					}
				}
			}

			if (style != null && style instanceof Map) {
				((Map) style).remove("decoration");
			}
			Map arguments = new HashMap(3);
			arguments.put("rules", rowRules);
			arguments.put("col", col);
			arguments.put("colHandler", new IValueHandler() {

				public Map get(Map rule) {
					((List) dataTableInfos.get("rules")).add(new HashMap(rule));
					return null;
				}

			});
			SheetUtil.getColRules(arguments);
			// 复制样式
			if (numberOfColumns > 1) {
				if (!isColumnRow && !fixed) {
					for (int colIndex = 1; colIndex < numberOfColumns; colIndex++) {
						Map cellDef = new HashMap();
						cellDef.put("style", namedStyles != null ? namedStyles : style);
						newRowDataTable.put(_newColIndex + colIndex, cellDef);
					}
				}
			}
		}
		dataTableInfos.put("rowDataTable", newRowDataTable);
		result.put("rowCount", maxRowCounts[0]);
		result.put("endRow", (Integer) result.get("row") + maxRowCounts[0]);
		return result;
	}

	private Map groupDatas(Map temp) {
		Map<String, List> groups = (Map) temp.get("groups");
		if (groups == null) {
			return new HashMap(0);
		}
		Map sheetDatas = new HashMap();
		Set groupNames = new HashSet();
		String tableCode = "";
		// 对数据进行分组，分组的名称就是sheet的名称
		for (Entry<String, List> entry : groups.entrySet()) {
			String dsName = entry.getKey();
			List group = entry.getValue();
			if (this.datas.get(dsName) != null && group != null && group.size() > 0) {
				tableCode = dsName;
				String groupFieldCode = (String) ((Map) group.get(0)).get("code");
				List<Map> dsDatas = (List) this.datas.get(dsName);
				for (Map item : dsDatas) {
					String groupName = (String) item.get("groupFieldCode");
					groupNames.add(groupName);
					List groupDatas = (List) sheetDatas.get(groupName);
					if (groupDatas == null) {
						groupDatas = new ArrayList();
						sheetDatas.put(groupName, groupDatas);
					}
					groupDatas.add(item);
				}
				break;
			}
		}

		temp.put("groupNames", new ArrayList(groupNames));
		temp.put("tableCode", tableCode);

		// 只支持一个实体进行分组
		Map result = new HashMap();
		result.put("sheetDatas", sheetDatas);
		result.put("groupNames", temp.get("groupNames"));
		result.put("tableCode", tableCode);
		return result;
	}
	
	private void addSheetDataTable(Map parameter){
		Chunk chunk = (Chunk)parameter.get("chunk");
		Map pageInfos = (Map)parameter.get("pageInfos");
		Sheet sheetPage = (Sheet)parameter.get("sheetPage");
		List<String> pages = (List)parameter.get("pages");
		
		for (Row rowInst : chunk.getRows()) {
			List spans = rowInst.getSpans();
			Map rows = (Map) rowInst.getRows();
			List rules = rowInst.getRules();
			Map dataTable = rowInst.getDataTable();
			List autoMergeRanges = rowInst.getAutoMergeRanges();
			int rowHeight = rowInst.getRowHeight();
			Map cells = rowInst.getCells();
			List plugins = rowInst.getPlugins();
			List formulas = rowInst.getFormulas();
			List shapes = (List) rowInst.getShapes();
			Map expandDataTable = (Map)rowInst.getExpandDataTable();
			
			
			if(sheetPage != null){
				JsonUtil.selfAddSet(pageInfos, 1, "rowCount");
				pageInfos.put("lastRow", rowInst);
				sheetPage.changeCells(cells);
			}
			
			
			this.delayPlugins.addAll(plugins);
			this.delayFormula.addAll(formulas);
			
			for (String item : pages) {
				Sheet sheet = (Sheet) pageInfos.get(item);
				Map args = new HashMap();
				args.put("shapes", shapes);
				args.put("spans", spans);
				args.put("rows", rows);
				args.put("rules", rules);
				args.put("dataTable", dataTable);
				args.put("autoMergeRanges", autoMergeRanges);
				args.put("rowHeight", rowHeight);
				args.put("defaultRowHeight", JsonUtil.get(pageInfos, "defaults", "rowHeight"));
				args.put("expandDataTable", expandDataTable);
				sheet.addDataTable(args);
			}
		}
		
	}

	private void genPageDataTables(Map params) {
		Sheet sheetPage = (Sheet) params.get("sheetPage");
		IHandler getValueHandler = (IHandler) params.get("getValueHandler");
		int fillCount = (Integer) MapUtil.get(params, "fillCount", 0);
		String type = (String) MapUtil.get(params, "type", "content");
		Map<String, Object> pageInfos = (Map<String, Object>) params.get("pageInfos");
		boolean isContent = "content".equals(type);
		int startIndex = isContent ? (Integer) pageInfos.get("contentDataIndex") : 0;
		List<Map<String, Object>> templates = (List) params.get("templates");
		if (templates.size() <= 0 && isContent) {
			pageInfos.put("flag", false);
		}
		int tempHeight = (Integer) MapUtil.get(params, "tempHeight", 0);
		int count = templates.size();
		if (count == 0) {
			count = 1;
		}
		double _tempHeight = tempHeight / count;
		int dataCount = 0;
		for (Map<String, Object> temp : templates) {
			if (temp == null) {
				return;
			}
			List dataTables = (List) temp.get("dataTables");
			UnionDatasource unionDatasource = (UnionDatasource) temp.get("unionDatasource");
			UnionDatasource unionDatasourceAll = (UnionDatasource) temp.get("unionDatasourceAll");
			List<Map> verticalAutoMergeRanges = (List) temp.get("verticalAutoMergeRanges");
			int row = (Integer) temp.get("row");
			Variables variable = (Variables) temp.get("variable");
			boolean isGroupSumArea = (Boolean) MapUtil.get(temp, "isGroupSumArea", false);
			boolean isTotalArea = (Boolean) MapUtil.get(temp, "isTotalArea", false);
			boolean isGroup = isGroupSumArea || isTotalArea;
			int dataLen = unionDatasource.getCount();
			if (dataLen == 0) {
				dataLen = 1;
			}
			if (isContent) {
				dataLen = (Integer) pageInfos.get("dataLen") + ((Boolean) pageInfos.get("isInFooter") ? -1 : 0)
						+ fillCount;
			}

			if ("footer".equals(type) && isGroup) {
				dataLen = 1;
			}

			// 处理内容前先缓存内容在当前页起始行
			int sheetPageRowCount = (Integer) sheetPage.getRowCount();
			int seqNo = 1;
			for (int i = startIndex; i < dataLen; i++) {
				double tempRowsHeight = 0;
				final Map sheetPages = this.sheetPages;
				final Map pageInfoVar = pageInfos;
				// 总页数
				IHandler totalPagesHandler = new IHandler<Integer>() {

					public Object invoke(Integer t) {
						Map datas = (Map) sheetPages.get(JsonUtil.get(pageInfoVar, "sheet", "name"));
						int count = datas.size();
						if (count == 0) {
							count = 1;
						}
						return count;
					}
				};
				Chunk chunk = new Chunk();
				chunk.setDataTables(dataTables);
				chunk.setDataIndex(i);
				chunk.setNamedStyles(this.namedStyles);
				chunk.setSheet((Map) pageInfos.get("sheet"));
				chunk.setStartRow((Integer) sheetPage.getRowCount());
				chunk.setDatasource(unionDatasource);
				chunk.setTotalPagesHandler(totalPagesHandler);
				chunk.setDataStartIndex(startIndex);
				chunk.setSheetPage(sheetPage);
				chunk.setGetValueHandler(getValueHandler);
				chunk.setGroup(isGroup);
				chunk.setGroupName((String) pageInfos.get("groupName"));
				chunk.setTotalArea(isTotalArea);
				chunk.setUnionDatasourceAll(unionDatasourceAll);
				chunk.setSeqNo(fillCount <= 0 ? seqNo++ : 1);
				chunk.setTempHeight(_tempHeight);
				chunk.setFillData(fillCount <= 0 ? false : true);
				chunk.setTempRow(row);
				chunk.setVariable(variable);
				chunk.render();
				tempRowsHeight = chunk.getHeight();
				// 当前页剩余高度不足以渲染内容
				if (!StringUtil.isEmpty((String) pageInfos.get("pageArea"))) {
					if ("content".equals(type)) {
						double contentHeight = MapUtil.getDouble(pageInfos, "contentHeight");
						double contentTotalHeight = MapUtil.getDouble(pageInfos, "contentTotalHeight");
						if (contentHeight + tempRowsHeight > contentTotalHeight) {
							break;
						} else {
							JsonUtil.selfAddSet(pageInfos, tempRowsHeight, "contentHeight");
							JsonUtil.selfAddSet(pageInfos, tempRowsHeight, "pageHeight");
						}
					} else {
						double pageHeight = MapUtil.getDouble(pageInfos, "pageHeight");
						double pageTotalHeight = MapUtil.getDouble(pageInfos, "pageTotalHeight");
						if (pageHeight + tempRowsHeight > pageTotalHeight) {
							this.onAfterPage(pageInfos, tempRowsHeight);
							// this.onAfterPage(sheetPage,tempRowsHeight); TODO
						} else {
							JsonUtil.selfAddSet(pageInfos, tempRowsHeight, "pageHeight");
						}
					}
				}
				if (this.globalSeq.containsKey(unionDatasource)) {
					Integer no = (Integer) this.globalSeq.get(unionDatasource);
					this.globalSeq.put(unionDatasource, no + 1);
				} else {
					this.globalSeq.put(unionDatasource, 1);
				}
				
				List<String> pages = new ArrayList();
				pages.add("sheetPage");
				pages.add("groupSheet");
				pages.add("continuousPageSheet");
				
				Map parameter = new HashMap();
				parameter.put("chunk", chunk);
				parameter.put("pageInfos", pageInfos);
				parameter.put("sheetPage", sheetPage);
				parameter.put("pages", pages);
				
				this.addSheetDataTable(parameter);
				
				// 连续导出
				if ((Boolean) pageInfos.get("isFirstPage")
						|| (!(Boolean) pageInfos.get("flag") && (Boolean) pageInfos.get("isLastGroup"))
						|| ("content".equals(type) && fillCount == 0)) {
					
					// 总页数
					IHandler _totalPagesHandler = new IHandler<Integer>() {
						public Object invoke(Integer t) {
							return 1;
						}
					};
					IHandler pageHandler = new IHandler<Integer>() {
						public Object invoke(Integer t) {
							return 1;
						}
					};
					
					Chunk continuousSheetChunk = new Chunk();
					continuousSheetChunk.setDataTables(dataTables);
					continuousSheetChunk.setDataIndex(i);
					continuousSheetChunk.setNamedStyles(this.namedStyles);
					continuousSheetChunk.setSheet((Map) pageInfos.get("sheet"));
					continuousSheetChunk.setStartRow((Integer) sheetPage.getRowCount());
					continuousSheetChunk.setDatasource(unionDatasource);
					continuousSheetChunk.setTotalPagesHandler(_totalPagesHandler);
					continuousSheetChunk.setDataStartIndex(startIndex);
					continuousSheetChunk.setSheetPage(sheetPage);
					continuousSheetChunk.setGetValueHandler(getValueHandler);
					continuousSheetChunk.setGroup(isGroup);
					continuousSheetChunk.setGroupName((String) pageInfos.get("groupName"));
					continuousSheetChunk.setTotalArea(isTotalArea);
					continuousSheetChunk.setUnionDatasourceAll(unionDatasourceAll);
					continuousSheetChunk.setSeqNo(fillCount <= 0 ? seqNo : 1);
					continuousSheetChunk.setTempHeight(_tempHeight);
					continuousSheetChunk.setFillData(fillCount <= 0 ? false : true);
					continuousSheetChunk.setTempRow(row);
					continuousSheetChunk.setVariable(variable);
					continuousSheetChunk.setPageHandler(pageHandler);
					continuousSheetChunk.render();
					
					pages.clear();
					pages.add("continuousSheet");
					
					parameter.clear();
					parameter.put("chunk", continuousSheetChunk);
					parameter.put("pageInfos", pageInfos);
					parameter.put("pages", pages);
					
					this.addSheetDataTable(parameter);
				}
				
				
				// 分组连续导出
				if ((Boolean) pageInfos.get("isFirstGroupPage") || !(Boolean) pageInfos.get("flag")
						|| ("content".equals(type) && fillCount == 0)) {
					//当前页码
					final int groupIndex = (Integer)pageInfos.get("groupIndex") + 1;
					//总页数
					final int groupCount = (Integer)pageInfos.get("groupCount");
					// 总页数
					IHandler _totalPagesHandler = new IHandler<Integer>() {
						public Object invoke(Integer t) {
							return groupCount;
						}
					};
					IHandler pageHandler = new IHandler<Integer>() {
						public Object invoke(Integer t) {
							return groupIndex;
						}
					};
					
					Chunk continuousGroupSheetChunk = new Chunk();
					continuousGroupSheetChunk.setDataTables(dataTables);
					continuousGroupSheetChunk.setDataIndex(i);
					continuousGroupSheetChunk.setNamedStyles(this.namedStyles);
					continuousGroupSheetChunk.setSheet((Map) pageInfos.get("sheet"));
					continuousGroupSheetChunk.setStartRow((Integer) sheetPage.getRowCount());
					continuousGroupSheetChunk.setDatasource(unionDatasource);
					continuousGroupSheetChunk.setTotalPagesHandler(_totalPagesHandler);
					continuousGroupSheetChunk.setDataStartIndex(startIndex);
					continuousGroupSheetChunk.setSheetPage(sheetPage);
					continuousGroupSheetChunk.setGetValueHandler(getValueHandler);
					continuousGroupSheetChunk.setGroup(isGroup);
					continuousGroupSheetChunk.setGroupName((String) pageInfos.get("groupName"));
					continuousGroupSheetChunk.setTotalArea(isTotalArea);
					continuousGroupSheetChunk.setUnionDatasourceAll(unionDatasourceAll);
					continuousGroupSheetChunk.setSeqNo(fillCount <= 0 ? seqNo : 1);
					continuousGroupSheetChunk.setTempHeight(_tempHeight);
					continuousGroupSheetChunk.setFillData(fillCount <= 0 ? false : true);
					continuousGroupSheetChunk.setTempRow(row);
					continuousGroupSheetChunk.setVariable(variable);
					continuousGroupSheetChunk.setPageHandler(pageHandler);
					continuousGroupSheetChunk.render();
					
					List<String> continuousGroupSheetPages = new ArrayList();
					pages.clear();
					pages.add("continuousGroupSheet");
					
					parameter.clear();
					parameter.put("chunk", continuousGroupSheetChunk);
					parameter.put("pageInfos", pageInfos);
					parameter.put("pages", pages);
					this.addSheetDataTable(parameter);
				}
				
				
				if (fillCount <= 0) {
					dataCount += 1;
				}
			}
			if (fillCount <= 0 && "content".equals(type)) {
				JsonUtil.selfAddSet(pageInfos, dataCount, "contentDataIndex");
			}
			// 标识内容处理结束
			if ("content".equals(type) && (Integer) pageInfos.get("contentDataIndex") >= dataLen) {
				pageInfos.put("flag", false);
			}
			// 纵向上自动合并信息(在纵向上连续，只需修改起始行号和行号数)
			for (Map item : verticalAutoMergeRanges) {
				// 当前页的纵向合并
				Map args = new HashMap();
				args.putAll(item);
				Map range = new HashMap();
				range.putAll((Map) item.get("range"));
				range.put("rowCount", (Integer) sheetPage.getRowCount() - sheetPageRowCount);
				range.put("row", sheetPageRowCount);
				args.put("range", range);
				sheetPage.getAutoMergeRanges().add(args);
			}
		}
	}

	private void onAfterPage(Map sheetInfos) {
		this.onAfterPage(sheetInfos, 0);
	}

	private void onAfterPage(Map sheetInfos, double initHeight) {
		// 强制打印时在当前行换页
		int rowCount = (Integer) sheetInfos.get("rowCount");
		Map<String, Object> rows = (Map<String, Object>) JsonUtil.get(sheetInfos, "rows", rowCount + "");
		if (rows == null) {
			rows = new HashMap<String, Object>();
		}
		rows.put("pageBreak", true);
		JsonUtil.set(sheetInfos, rows, "rows", rowCount + "");
		sheetInfos.put("pageHeight", initHeight);
		sheetInfos.put("pageIndex", ((Integer) sheetInfos.get("pageIndex")) + 1);
		sheetInfos.put("pageTotal", ((Integer) sheetInfos.get("pageTotal")) + 1);
	}

	private void resetSheet(Sheet setting) {
		if (setting == null) {
			return;
		}
		Map<String, Object> sheet = (Map<String, Object>) setting.getSheet();
		if (sheet == null) {
			return;
		}
		int rowCount = setting.getRowCount();
		if (rowCount > 0) {
			sheet.put("rowCount", rowCount);
		}
		Object dataTable = setting.getDataTable();
		JsonUtil.set(sheet, dataTable, "data", "dataTable");
		// 条件格式规则
		Map<String, Object> conditionalFormats = (Map<String, Object>) sheet.get("conditionalFormats");
		if (conditionalFormats == null) {
			conditionalFormats = new HashMap<String, Object>();
			sheet.put("conditionalFormats", conditionalFormats);
		}
		conditionalFormats.put("rules", setting.getRules());
		// 合并单元格
		sheet.put("spans", setting.getSpans());

		// 行高
		List rows = new ArrayList();
		List _rows = (List) sheet.get("rows");
		if(_rows != null){
			rows.addAll(_rows);
		}
		
		sheet.put("rows", rows);
		// 列宽
		List columns = new ArrayList();
		columns.addAll(setting.getColumns());
		sheet.put("columns", columns);

		// 自动合并区域
		sheet.put("autoMergeRangeInfos", setting.getAutoMergeRanges());
		sheet.put("shapes", setting.getShapes());
	}
	
	public Map<String,Object> getSheetPages(){
		return this.sheetPages;
	}
	
	public String getActiveSheetName() {
		return this.activeSheetName;
	}
	
}
