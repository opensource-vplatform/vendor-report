package com.toone.spreadsheet.plugin;

import java.util.Map;

import com.toone.spreadsheet.api.IPlugin;
import com.toone.spreadsheet.plugin.impls.CellCondition;
import com.toone.spreadsheet.plugin.impls.CellFormatterPrecision;
import com.toone.spreadsheet.plugin.impls.CellGroup;
import com.toone.spreadsheet.plugin.impls.CellImage;
import com.toone.spreadsheet.plugin.impls.CellList;
import com.toone.spreadsheet.plugin.impls.CellPage;
import com.toone.spreadsheet.plugin.impls.CellSubTotal;
import com.toone.spreadsheet.plugin.impls.CellText;
import com.toone.spreadsheet.plugin.impls.CellTotalPages;
import com.toone.spreadsheet.plugin.impls.RowColumnVisible;

public class PluginFactory {

	public static IPlugin create(Map<String, Object> plugin) {
		String type = (String) plugin.get("type");
		if ("cellImage".equals(type)) {
			return new CellImage(plugin);
		} else if ("cellSubTotal".equals(type)) {
			return new CellSubTotal(plugin);
		} else if ("pageCellType".equals(type)) {
			return new CellPage(plugin);
		} else if ("totalPagesCellType".equals(type)) {
			return new CellTotalPages(plugin);
		} else if ("rowColumnVisible".equals(type)) {
			return new RowColumnVisible(plugin);
		} else if ("cellCondition".equals(type)) {
			return new CellCondition(plugin);
		} else if ("cellList".equals(type)) {
			return new CellList(plugin);
		} else if ("cellText".equals(type)) {
			return new CellText(plugin);
		} else if ("cellGroup".equals(type)) {
			return new CellGroup(plugin);
		} else if ("cellFormatterPrecision".equals(type)) {
			return new CellFormatterPrecision(plugin);
		}
		return null;
	}

}
