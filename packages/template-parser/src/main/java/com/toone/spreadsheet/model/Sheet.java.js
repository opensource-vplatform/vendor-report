package com.toone.spreadsheet.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.toone.spreadsheet.api.IHandler;
import com.toone.spreadsheet.util.CollectionUtil;
import com.toone.spreadsheet.util.JsonUtil;
import com.toone.spreadsheet.util.MapUtil;
import com.toone.spreadsheet.util.StringUtil;

public class Sheet {
	// 外部传入属性
	private Map sheet = null;
	private Map datas = new HashMap();
	private List shapesEnhancer = new ArrayList();
	// 内部属性
	private List shapes = new ArrayList();
	private List columns = new ArrayList();;
	private List spans = new ArrayList();
	private List rows = new ArrayList();
	private List<Map> rules = new ArrayList();
	private Map<String, Object> dataTable = new HashMap<String, Object>();
	private List autoMergeRanges = new ArrayList();
	private int rowCount = 0;
	private Map cells = new HashMap();
	private int pageIndex = 1; // 页码
	private Map cellsDatasource = new HashMap();
	private int pageTotal = 1;
	private String pageArea = null;

	private List expandDataTables = new ArrayList();
	private Map expandColumnsInfos = new HashMap();

	public void setSheet(Map<String, Object> sheet) {
		this.sheet = sheet;
		this.columns = (List) sheet.get("columns");
		if (this.columns == null) {
			this.columns = new ArrayList();
		} else {
			this.columns = JsonUtil.parseArray(JsonUtil.toJSONString(this.columns));
		}
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public void setCellsDatasource(Map cellsDatasource) {
		this.cellsDatasource = cellsDatasource;
	}

	public void setDatas(Map datas) {
		this.datas = datas;
	}

	public void setShapesEnhancer(List shapesEnhancer) {
		this.shapesEnhancer = shapesEnhancer;
	}

	public Map getCellsDatasource() {
		return cellsDatasource;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void addDataTable(Map params) {
		List<Map> shapes = (List) MapUtil.get(params, "shapes", new ArrayList());
		List<Map> spans = (List) MapUtil.get(params, "spans", new ArrayList());
		Map rows = (Map) MapUtil.get(params, "rows", new HashMap());
		List<Map> rules = (List) MapUtil.get(params, "rules", new ArrayList());
		Map dataTable = (Map) MapUtil.get(params, "dataTable", new ArrayList());
		List<Map> autoMergeRanges = (List) MapUtil.get(params, "autoMergeRanges", new ArrayList());
		double rowHeight = MapUtil.getDouble(params, "rowHeight");
		int defaultRowHeight = JsonUtil.getInt(params, "defaultRowHeight");
		Map expandDataTable = (Map) MapUtil.get(params, "expandDataTable", new HashMap());
		if (defaultRowHeight == 0) {
			defaultRowHeight = 20;
		}
		int row = this.rowCount;
		this.dataTable.put(row + "", dataTable);
		// 合并信息
		for (Map span : spans) {
			Map map = new HashMap(span);
			map.put("row", row);
			this.spans.add(map);
		}

		// 条件规则
		for (Map rule : rules) {
			Map map = new HashMap(rule);
			List ranges = new ArrayList();
			Map range = new HashMap();
			range.putAll((Map) ((List) rule.get("ranges")).get(0));
			range.put("row", row);
			ranges.add(range);
			map.put("ranges", ranges);
			this.rules.add(map);
		}

		// 行高
		double size = defaultRowHeight;
		if (rows != null && rows.containsKey("size")) {
			size = MapUtil.getDouble(rows, "size");
		}
		size = size > rowHeight ? size : rowHeight;
		Map newRows = new HashMap(rows);
		newRows.put("size", size);
		Set rowsKeys = newRows.keySet();
		boolean hasSizeKey = newRows.containsKey("size");
		if (!(hasSizeKey && rowsKeys.size() == 1 && MapUtil.getDouble(newRows, "size") == defaultRowHeight)) {
			Map map = new HashMap();
			Map rw = (Map) CollectionUtil.get(this.rows, row);
			if (rw != null) {
				map.putAll(rw);
			}
			map.putAll(rows);
			map.put("size", size);
			CollectionUtil.set(this.rows, row, map);
		}

		// 横向上的自动合并区域(在纵向上不连续)
		for (Map item : autoMergeRanges) {
			Map map = new HashMap(item);
			Map range = new HashMap((Map) item.get("range"));
			range.put("row", row);
			map.put("range", range);
			this.autoMergeRanges.add(map);
		}
		for (Map item : shapes) {
			int rowCount = (Integer) JsonUtil.get(item, "shapeData", "endPoint", "row")
					- (Integer) JsonUtil.get(item, "shapeData", "startPoint", "row");
			JsonUtil.set(item, row, "shapeData", "startPoint", "row");
			JsonUtil.set(item, row + rowCount, "shapeData", "endPoint", "row");
			if (this.shapes.contains(item)) {
				return;
			}
			Map tagObj = null;
			String tag = (String) JsonUtil.get(this.sheet, "data", "defaultDataNode", "tag");
			if (!StringUtil.isEmpty(tag)) {
				tagObj = JsonUtil.parseObject(tag);
			}
			String bindingPath = (String) JsonUtil.get(tagObj, "pictureShape",
					(String) JsonUtil.get(item, "item", "name"), "bindingPath");
			if (StringUtil.isEmpty(bindingPath)) {
				return;
			}

			if (bindingPath.contains(".")) {
				Map setting = new HashMap(1);
				List cellPlugins = new ArrayList(1);
				Map cellSetting = new HashMap(2);
				cellSetting.put("bindingPath", bindingPath);
				List plugins = new ArrayList(1);
				Map plugin = new HashMap(2);
				plugin.put("type", "cellText");
				plugin.put("config", new HashMap());
				plugins.add(plugin);
				cellSetting.put("plugins", plugins);
				setting.put("cellPlugins", cellPlugins);
				List<String> bindingPaths = new ArrayList(1);
				bindingPaths.add(bindingPath);
				UnionDatasource unionDatasource = new UnionDatasource(bindingPaths, setting);
				String tableCode = bindingPath.split(".")[0];
				Map datas = new HashMap(1);
				datas.put(tableCode, this.datas.get("tableCode"));
				unionDatasource.load(datas);
				Map data = unionDatasource.getValue(bindingPath, 0);
				String url = (String) data.get("value");
				if (!StringUtil.isEmpty(url)) {
					Map p = new HashMap();
					p.put("imgUrl", url);
					final Map target = item;
					p.put("handler", new IHandler() {
						public Object invoke(Object data) {
							JsonUtil.set(target, data, "shapeData", "pic", "blipFill", "blip", "blipBlob", "blob");
							return null;
						}
					});
					this.shapesEnhancer.add(p);
				}
			} else {
			}
			this.shapes.add(item);
			item.put("allowMove", false);
			item.put("allowResize", false);
			item.put("allowRotate", false);
			item.put("showHandle", false);
		}
		this.rowCount += 1;
		this.addExpandDataTable(expandDataTable);
	}

	public void addColumn(Column column) {
		this.addColumn(column, false);
	}

	// 加入分栏
	@SuppressWarnings("unchecked")
	public void addColumn(Column column, boolean ignoreBlanks) {
		Map dataTable = column.getDataTable();
		Collection values = dataTable.values();
		int index = 0;
		Iterator iterator = values.iterator();
		while (iterator.hasNext()) {
			Object value = iterator.next();
			if (ignoreBlanks && index >= column.getTempRowCount()) {
				continue;
			}
			this.dataTable.put((this.rowCount + index) + "", value);
			index++;
		}
		for (Map span : ((List<Map>) column.getSpans())) {
			int _row = (Integer) span.get("row") - (Integer) column.getStartRow();
			if (ignoreBlanks && _row >= column.getTempRowCount()) {
				return;
			}
			Map map = new HashMap(span);
			map.put("row", _row + this.rowCount);
			this.spans.add(map);
		}

		for (Object item : column.getRules()) {
			Map rule = (Map) item;
			int _row = (Integer) JsonUtil.get(rule, "ranges", "0", "row") - column.getStartRow();
			if (ignoreBlanks && _row >= column.getTempRowCount()) {
				return;
			}
			Map p = new HashMap(rule);
			List ranges = new ArrayList();
			Map range = new HashMap((Map) JsonUtil.get(rule, "ranges", "0"));
			range.put("row", _row + this.rowCount);
			ranges.add(range);
			p.put("ranges", ranges);
			this.rules.add(p);
		}

		for (Object item : column.getAutoMergeRanges()) {
			Map info = (Map) item;
			int _row = (Integer) JsonUtil.get(info, "range", "row") - column.getStartRow();
			if (ignoreBlanks && _row >= column.getTempRowCount()) {
				return;
			}
			Map p = new HashMap(info);
			Map range = new HashMap((Map) info.get("range"));
			range.put("row", (Integer) JsonUtil.get(info, "range", "row") - column.getStartRow() + this.rowCount);
			p.put("range", range);
			this.autoMergeRanges.add(p);
		}
		for (Map row : column.getRows()) {
			Object item = row.get("item");
			int idx = (Integer) row.get("index");
			if (item != null) {
				int _row = idx - column.getStartRow();
				if (ignoreBlanks && _row >= column.getTempRowCount()) {
					return;
				}
				this.rows.set(_row + this.rowCount, item);
			}
		}
		this.rowCount += ignoreBlanks ? column.getTempRowCount() : column.getRowCount();

		List<Map> expandDataTables = column.getExpandDataTables();
		for (Map expandDataTable : expandDataTables) {
			this.addExpandDataTable(expandDataTable);
		}
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void changeCells(Map cells) {
		for (Entry<String, Map> entry : ((Map<String, Map>) cells).entrySet()) {
			String instanceId = entry.getKey();
			Map value = entry.getValue();
			Map cell = (Map) this.cells.get(instanceId);
			if (cell != null) {
				JsonUtil.selfAddSet(this.cells, 1, instanceId, "count");
			} else {
				Map map = new HashMap(value);
				map.put("count", 1);
				this.cells.put(instanceId, map);
				this.cellsDatasource.put(instanceId, new HashMap(value));
			}
		}
	}

	public void handleExpandDataTables() {
		List newColumns = new ArrayList();
		List<Map> newSpans = new ArrayList();
		List newRules = new ArrayList();
		int columnCount = 0;
		int maxColumnCount = 0;

		int sheetColumnCount = (Integer) this.sheet.get("columnCount");

		for (Object obj : this.expandColumnsInfos.entrySet()) {
			Entry entry = (Entry) obj;
			int col = (Integer) entry.getKey();
			Map infos = (Map) entry.getValue();
			int step = (Integer) infos.get("step");
			int colCount = (Integer) infos.get("colCount");

			int sizes = this.expandDataTables.size();
			for (int row = 0; row < sizes; row++) {
				Map expandDataTable = (Map) this.expandDataTables.get(row);
				if (expandDataTable.containsKey(col)) {
					Map value = (Map) expandDataTable.get(col);
					List dataTables = (List) value.get("dataTables");
					int dataTablesSizes = dataTables.size();

					for (int i = dataTablesSizes; i < colCount; i++) {
						Map rowDataTalbe = (Map) this.dataTable.get(row);
						Map colDataTable = (Map) rowDataTalbe.get(col);

						Map newColDataTable = new HashMap();
						newColDataTable.put("style", colDataTable.get("style"));
						dataTables.add(newColDataTable);
					}

				} else {
					List dataTables = new ArrayList();
					for (int i = 0; i < colCount; i++) {
						Map rowDataTalbe = (Map) this.dataTable.get(row);
						Map colDataTable = new HashMap((Map) rowDataTalbe.get(col));
						dataTables.add(colDataTable);
					}

					Map value = new HashMap();
					value.put("step", step);
					value.put("dataTables", dataTables);

					expandDataTable.put(col, value);
				}

				Map value = (Map) expandDataTable.get(col);
				value.put("step", step);

			}
		}

		// 循环每一行的横向扩展信息，重新生成新的行
		int sizes = this.expandDataTables.size();
		for (int row = 0; row < sizes; row++) {
			Map expandDataTable = (Map) this.expandDataTables.get(row);
			Map rowDataTable = (Map) this.dataTable.get(row + "");
			List<Map> splitExpandDataTables = new ArrayList();
			// 对横向扩展区域进行拆分，相邻的列作为一个整体一起扩展
			Map splitExpandDataTable = null;
			int preCol = 0;
			for (Object obj : expandDataTable.entrySet()) {
				Entry entry = (Entry) obj;
				int col = (Integer) entry.getKey();
				if (splitExpandDataTable == null) {
					splitExpandDataTable = this.getInitSplitExpandDataTable(col);
				} else {
					int diff = col - preCol;
					if (diff != 1) {
						splitExpandDataTables.add(splitExpandDataTable);
						splitExpandDataTable = this.getInitSplitExpandDataTable(col);
					}
				}
				List cols = (List) splitExpandDataTable.get("cols");
				cols.add(col);
				Map dataTable = (Map) splitExpandDataTable.get("dataTable");
				dataTable.put(col, entry.getValue());
				preCol = col;
			}
			if(splitExpandDataTable!=null) {
				splitExpandDataTables.add(splitExpandDataTable);				
			}

			// 扩展区域生成新的行，以及合并信息等
			for (Map _splitExpandDataTable : splitExpandDataTables) {
				int col = (Integer) _splitExpandDataTable.get("startCol");
				Map dataTable = (Map) _splitExpandDataTable.get("dataTable");
				List spans = (List) _splitExpandDataTable.get("spans");
				List rules = (List) _splitExpandDataTable.get("rules");
				Map columns = (Map) _splitExpandDataTable.get("columns");

				Map newDataTables = new HashMap();
				int i = 0;
				for (Object obj : dataTable.entrySet()) {
					Entry entry = (Entry) obj;
					Map values = (Map) entry.getValue();
					int step = (Integer) values.get("step");
					List dataTables = (List) values.get("dataTables");
					int dataTablesSizes = dataTables.size();
					for (int index = 0; index < dataTablesSizes; index++) {
						int oldCol = i + col;
						int newCol = oldCol + index * step;
						newDataTables.put(newCol, new HashMap((Map) dataTables.get(index)));

						Map parameter = new HashMap();
						parameter.put("row", row);
						parameter.put("col", oldCol);
						parameter.put("newCol", newCol);
						List _spans = this.genSpans(parameter);
						spans.addAll(_spans);
						List _rules = this.genRules(parameter);
						rules.addAll(_rules);
						columns.put(newCol, new HashMap((Map) this.columns.get(oldCol)));
					}
					i++;
				}

				_splitExpandDataTable.put("dataTable", newDataTables);
			}

			columnCount = 0;
			Map newRowDataTable = new HashMap();
			// 重新生成新的行
			for (int col = 0; col < sheetColumnCount; col++) {
				final int colDiff = columnCount - col;
				Map dataTable = (Map) rowDataTable.get(col + "");
				if (dataTable == null) {
					dataTable = new HashMap();
				}
				Map expandCol = null;
				// 判断当前列是否是横向扩展
				boolean isExpandCol = false;
				for (Map item : splitExpandDataTables) {
					List cols = (List) item.get("cols");
					if (cols.contains(col)) {
						isExpandCol = true;
						expandCol = item;
						break;
					}
				}

				if (isExpandCol) {
					int startCol = (Integer) expandCol.get("startCol");
					if (startCol == col) {
						int oldColumnCount = columnCount;
						dataTable = (Map) expandCol.get("dataTable");
						List spans = (List) expandCol.get("spans");
						List rules = (List) expandCol.get("rules");
						List cols = (List) expandCol.get("cols");
						for (Object _obj : dataTable.entrySet()) {
							Entry _entry = (Entry) _obj;
							int _col = Integer.parseInt(_entry.getKey() + "");
							int newCol = _col + colDiff;

							Map value = (Map) _entry.getValue();
							newRowDataTable.put(newCol + "", new HashMap(value));

							// 参数
							Map parameter = new HashMap();
							parameter.put("row", row);
							parameter.put("col", _col);
							parameter.put("newCol", newCol);
							parameter.put("sourceSpans", spans);
							parameter.put("sourceRules", rules);

							// 合并信息
							List _spans = this.genSpans(parameter);
							newSpans.addAll(_spans);

							// 条件规则
							List _rules = this.genRules(parameter);
							newRules.addAll(_rules);

							columnCount += 1;

						}

						for (Map span : newSpans) {
							int spanRow = (Integer) span.get("row");
							int spanCol = (Integer) span.get("col");
							int spanColCount = (Integer) span.get("colCount");
							if (spanRow == row && col > spanCol && col < (spanCol + spanColCount)
									&& columnCount - oldColumnCount > 1) {
								span.put("colCount", columnCount - oldColumnCount - cols.size());
							}
						}

						// 列宽等信息
						if (row == 0) {
							Map columns = (Map) expandCol.get("columns");
							newColumns.addAll(columns.values());
						}

					}
				} else {
					// 当前列没有横向扩展，则位置不变或向右移动
					int newCol = col + colDiff;
					newRowDataTable.put(newCol + "", dataTable);

					// 参数
					Map parameter = new HashMap();
					parameter.put("row", row);
					parameter.put("col", col);
					parameter.put("newCol", newCol);

					// 合并信息
					List _spans = this.genSpans(parameter);
					newSpans.addAll(_spans);

					// 条件规则
					List _rules = this.genRules(parameter);
					newRules.addAll(_rules);

					// 列宽等信息
					if (row == 0) {
						newColumns.add(this.columns.get(col));
					}

					columnCount += 1;
				}
			}

			this.dataTable.put(row + "", newRowDataTable);
			if (columnCount > maxColumnCount) {
				maxColumnCount = columnCount;
			}
		}

		if (columnCount > 0) {
			this.columns = newColumns;
			this.spans = newSpans;
			this.rules = newRules;
			this.sheet.put("columnCount", maxColumnCount);
		}

	}

	private Map getInitSplitExpandDataTable(int startCol) {
		List cols = new ArrayList();
		Map dataTable = new HashMap();
		List spans = new ArrayList();
		List rules = new ArrayList();
		Map columns = new HashMap();

		Map result = new HashMap();
		result.put("cols", cols);
		result.put("dataTable", dataTable);
		result.put("startCol", startCol);
		result.put("spans", spans);
		result.put("rules", rules);
		result.put("columns", columns);

		return result;
	}

	private List genSpans(Map parameter) {
		int row = (Integer) parameter.get("row");
		int col = (Integer) parameter.get("col");
		int newCol = (Integer) parameter.get("newCol");
		List<Map> sourceSpans = (List) parameter.get("sourceSpans");
		if (sourceSpans == null) {
			sourceSpans = this.spans;
		}

		List spans = new ArrayList();
		for (Map span : sourceSpans) {
			int _row = (Integer) span.get("row");
			int _col = (Integer) span.get("col");
			if (_row == row && _col == col) {
				Map newSpan = new HashMap(span);
				newSpan.put("col", newCol);
				spans.add(newSpan);
			}

		}
		return spans;
	}

	private List genRules(Map parameter) {
		int row = (Integer) parameter.get("row");
		int col = (Integer) parameter.get("col");
		int newCol = (Integer) parameter.get("newCol");
		List<Map> sourceRules = (List) parameter.get("sourceRules");
		if (sourceRules == null) {
			sourceRules = this.rules;
		}
		List rules = new ArrayList();
		for (Map rule : sourceRules) {
			boolean flag = false;
			List<Map> newRanges = new ArrayList();
			List<Map> oldRanges = (List) rule.get("ranges");
			for (Map range : oldRanges) {
				int _row = (Integer) range.get("row");
				int _col = (Integer) range.get("col");
				if (_row == row && _col == col) {
					flag = true;
					Map newRange = new HashMap(range);
					newRange.put("col", newCol);
					newRanges.add(newRange);
				}
			}

			if (flag) {
				Map newRule = new HashMap(rule);
				newRule.put("ranges", newRanges);
				rules.add(newRule);
			}
		}

		return rules;
	}

	private void addExpandDataTable(Map expandDataTable) {
		if (expandDataTable != null) {
			this.expandDataTables.add(expandDataTable);
			for (Object obj : expandDataTable.entrySet()) {
				Entry entry = (Entry) obj;
				int col = (Integer) entry.getKey();
				Map value = (Map) entry.getValue();
				if (!this.expandColumnsInfos.containsKey(col)) {
					Map infos = new HashMap();
					infos.put("step", 0);
					infos.put("colCount", 0);
					this.expandColumnsInfos.put(col, infos);
				}

				Map infos = (Map) this.expandColumnsInfos.get(col);
				infos.put("step", value.get("step"));
				int colCount = (Integer) infos.get("colCount");
				List dataTables = (List) value.get("dataTables");
				int sizes = dataTables.size();
				if (colCount < sizes) {
					infos.put("colCount", sizes);
				}
			}
		}
	}

	public int getRowCount() {
		return this.rowCount;
	}

	public List getAutoMergeRanges() {
		return this.autoMergeRanges;
	}

	public int getPageIndex() {
		return this.pageIndex;
	}

	public int getPageTotal() {
		return this.pageTotal;
	}

	public Map getSheet() {
		return sheet;
	}

	public List getShapes() {
		return shapes;
	}

	public void setShapes(List shapes) {
		this.shapes = shapes;
	}

	public List getColumns() {
		return columns;
	}

	public void setColumns(List columns) {
		this.columns = columns;
	}

	public List getSpans() {
		return spans;
	}

	public void setSpans(List spans) {
		this.spans = spans;
	}

	public List getRows() {
		return rows;
	}

	public void setRows(List rows) {
		this.rows = rows;
	}

	public List getRules() {
		return rules;
	}

	public void setRules(List rules) {
		this.rules = rules;
	}

	public Map getDataTable() {
		return dataTable;
	}

	public void setDataTable(Map dataTable) {
		this.dataTable = dataTable;
	}

	public Map getCells() {
		return cells;
	}

	public void setCells(Map cells) {
		this.cells = cells;
	}

	public Map getDatas() {
		return datas;
	}

	public List getShapesEnhancer() {
		return shapesEnhancer;
	}

	public void setAutoMergeRanges(List autoMergeRanges) {
		this.autoMergeRanges = autoMergeRanges;
	}

	public void setRowCount(int rowCount) {
		this.rowCount = rowCount;
	}

	public void setPageTotal(int pageTotal) {
		this.pageTotal = pageTotal;
	}

	public String getPageArea() {
		return pageArea;
	}

	public void setPageArea(String pageArea) {
		this.pageArea = pageArea;
	}

}
