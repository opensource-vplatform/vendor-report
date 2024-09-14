package com.toone.spreadsheet.plugin.impls;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.toone.spreadsheet.api.ITool;
import com.toone.spreadsheet.formula.FormulaEngine;
import com.toone.spreadsheet.plugin.Plugin;
import com.toone.spreadsheet.util.DomUtil;
import com.toone.spreadsheet.util.StringUtil;
import com.toone.spreadsheet.util.TemplateUtil;

public class CellCondition extends Plugin {

	@SuppressWarnings("rawtypes")
	public CellCondition(Map plugin) {
		super(plugin);
	}

	@SuppressWarnings("rawtypes")
	public boolean test(ITool tool) {
		Map config = this.getConfig();
		String test = (String) config.get("test");
		if (!StringUtil.isEmpty(test)) {
			FormulaEngine formulaEngine = FormulaEngine.getInstance();
			return formulaEngine.evaluateBoolean(test, tool);
		}
		return true;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map execute(Map value, ITool tool) {
		Map config = this.getConfig();
		List<Map> spans = (List<Map>) config.get("spans");
		spans = spans == null ? Collections.EMPTY_LIST : spans;
		Map text = (Map) config.get("text");
		// 调整合并行、列
		int row = tool.getRow();
		int col = tool.getCol();
		for (Map span : spans) {
			span.put("row", row);
			span.put("col", col);
		}
		Map result = new HashMap();
		result.put("type", text != null ? text.get("type") : "text");
		result.put("value", text != null ? text.get("value") : "");
		result.put("style", config.get("style"));
		result.put("spans", spans);
		if (text != null) {
			if ("autoFitByContent".equals(config.get("rowHeight"))) {
				Map template = tool.getTemplate();
				int templateRow = tool.getTemplateRowIndex();
				int templateCol = tool.getTemplateColIndex();
				int colCount = 1;
				for (Map span : spans) {
					colCount = (Integer) span.get("colCount");
				}
				int columnWidth = TemplateUtil.getColumnWidth(template, templateCol, colCount);
				String fontSize = TemplateUtil.getFontSize(template, templateRow, templateCol,
						(Map) result.get("style"));
				Object cellValue = "";
				String type = (String) result.get("type");
				String valueStr = (String) result.get("value");
				if ("text".equals(type)) {
					cellValue = valueStr;
				} else if ("formula".equals(type)) {
					FormulaEngine formulaEngine = FormulaEngine.getInstance();
					cellValue = formulaEngine.evaluate(valueStr, tool);
				}
				int height = DomUtil.getFitHeight(cellValue+"", columnWidth, fontSize);
				result.put("rowHeight", height);
			} else if ("autoFitByZoom".equals(config.get("rowHeight"))) {
				Map style = (Map) result.get("style");
				if (style == null) {
					style = new HashMap();
				}
				style.put("shrinkToFit", true);
				result.put("style", style);
			}
		}
		return result;
	}

	/**
	 * 将列拆分信息转换成数组 {0:{colCount:3},1:{colCount:5},4:{colCount:2},6:{colCount:3}} =>
	 * [0, 0, 0, 1, 1, 1, 1, 1, 2, 3, 4, 4, 5, 6, 6, 6]
	 * 
	 * @param {*} splitColumns
	 * @returns
	 */
	@SuppressWarnings("rawtypes")
	private List<Integer> _splitColumnstoArr(Map<String, Object> splitColumns) {
		List<Integer> columns = new ArrayList<Integer>();
		Set<String> cols = splitColumns.keySet();
		List<Integer> colIndexs = new ArrayList<Integer>(cols.size());
		for (String colStr : cols) {
			colIndexs.add(Integer.valueOf(colStr));
		}
		colIndexs.sort(new Comparator<Integer>() {
			public int compare(Integer o1, Integer o2) {
				return o1 - o2;
			}
		});
		int colDelta = 0;
		for (int col : colIndexs) {
			Map column = (Map) splitColumns.get(col + "");
			int colCount = (Integer) column.get("colCount");
			for (int i = 0; i < colCount; i++) {
				int index = i + col + colDelta;
				while(columns.size()<index+1) {
					columns.add(-1);
				}
				columns.set(i + col + colDelta, col);
			}
			colDelta += colCount - 1;
		}
		int col = 0;
		int len = columns.size();
		int index = 0;
		while (index < len) {
			int column = columns.get(index);
			if (column == -1) {
				columns.set(index, col);
				col++;
			} else {
				col = column + 1;
			}
			index++;
		}
		return columns;
	}

	/**
	 * splitColumns格式:{[列序号]:{colCount:number,}}
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Map update(Map updateParam) {
		if (updateParam != null && updateParam.containsKey("splitColumns")) {
			// 因分栏报表导致列重新拆分，引发条件单元格合并信息需要调整
			Map splitColumns = (Map) updateParam.get("splitColumns"); //
			List<Integer> colIndexs = this._splitColumnstoArr(splitColumns);
			Map config = this.getConfig();
			if (config != null && config.containsKey("spans")) {
				List<Map> spans = (List<Map>) config.get("spans");
				List<Map> newSpans = new ArrayList();
				for (Map span : spans) {
					int row = (Integer) span.get("row");
					int col = (Integer) span.get("row");
					int rowCount = (Integer) span.get("rowCount");
					int colCount = (Integer) span.get("colCount");
					int start = col;
					int endCol = col + colCount - 1;
					int newCol = -1;
					int newColCount = -1;
					for (int i = 0, len = colIndexs.size(); i < len; i++) {
						int index = colIndexs.get(i);
						if (newCol == -1 && start == index) {
							newCol = i;
						} else if (endCol == index) {
							newColCount = i - newCol + 1;
						} else if (index > endCol) {
							break;
						}
					}
					Map newSpan = new HashMap(4);
					newSpan.put("row", row);
					newSpan.put("col", newCol == -1 ? col : newCol);
					newSpan.put("rowCount", rowCount);
					newSpan.put("colCount", newColCount == -1 ? colCount : newColCount);
					newSpans.add(newSpan);
				}
				config.put("spans", newSpans);
			}
		}
		return this.getPlugin();
	}

}
