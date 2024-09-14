package com.toone.spreadsheet.plugin.impls;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.toone.spreadsheet.api.ITool;
import com.toone.spreadsheet.formula.FormulaEngine;
import com.toone.spreadsheet.plugin.Plugin;
import com.toone.spreadsheet.util.DomUtil;
import com.toone.spreadsheet.util.TemplateUtil;

public class CellList extends Plugin {

	@SuppressWarnings("rawtypes")
	public CellList(Map plugin) {
		super(plugin);
	}

	private boolean isIn(int index, int start, int count) {
		return index >= start && index < start + count;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private Map getColSpan(int rowIndex, int colIndex, Map template) {
		List<Map> spans = (List<Map>) template.get("spans");
		if (spans != null) {
			for (int i = 0; i < spans.size(); i++) {
				Map span = spans.get(i);
				int row = (Integer) span.get("row");
				int col = (Integer) span.get("col");
				int rowCount = (Integer) span.get("rowCount");
				int colCount = (Integer) span.get("colCount");
				if (this.isIn(rowIndex, row, rowCount) && this.isIn(colIndex, col, colCount)) {
					Map result = new HashMap(2);
					result.put("col", col);
					result.put("colCount", colCount);
					return result;
				}
			}

		}
		Map result = new HashMap(2);
		result.put("col", colIndex);
		result.put("colCount", 1);
		return result;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Map execute(Map value, ITool tool) {
		Map template = tool.getTemplate();
		int row = tool.getTemplateRowIndex();
		int col = tool.getTemplateColIndex();
		String bindingPath = TemplateUtil.getBindingPath(template, row, col);
		Object formula = TemplateUtil.getFormula(template, row, col);
		if (bindingPath == null && formula == null) {
			Map result = new HashMap(2);
			result.put("type", "text");
			result.put("value", null);
			return result;
		}
		Map result = new HashMap(2);
		result.put("type", "text");
		FormulaEngine formulaEngine = FormulaEngine.getInstance();
		result.put("value", bindingPath != null ? ((Map) tool.getValue(bindingPath)).get("value")
				: formula instanceof String ? formulaEngine.evaluate((String)formula, tool):formula);
		Map config = this.getConfig();
		if (config != null) {
			if (config.containsKey("listIndex")) {
				int listIndex = (Integer) config.get("listIndex");
				Object val = result.get("value");
				if (val instanceof List) {
					result.put("value", ((List) val).get(listIndex));
				}
			}
			if (config.containsKey("rowHeight")) {
				String rowHeight = (String) config.get("rowHeight");
				if ("autoFitByContent".equals(rowHeight)) {
					Map colSpan = this.getColSpan(row, col, template);
					int columnWidth = TemplateUtil.getColumnWidth(template, (Integer) colSpan.get("col"),
							(Integer) colSpan.get("colCount"));
					String fontSize = TemplateUtil.getFontSize(template, row, col, null);
					int height = DomUtil.getFitHeight((String) result.get("value"), columnWidth, fontSize);
					result.put("rowHeight", height);
				} else if ("autoFitByZoom".equals(rowHeight)) {
					Map mp = new HashMap(1);
					mp.put("shrinkToFit", true);
					result.put("style", mp);
				}
			}
		}
		return result;
	}

}
