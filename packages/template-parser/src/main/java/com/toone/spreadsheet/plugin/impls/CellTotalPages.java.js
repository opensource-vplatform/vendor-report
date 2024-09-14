package com.toone.spreadsheet.plugin.impls;

import java.util.HashMap;
import java.util.Map;

import com.toone.spreadsheet.api.ITool;
import com.toone.spreadsheet.plugin.Plugin;

public class CellTotalPages extends Plugin {

	@SuppressWarnings("rawtypes")
	public CellTotalPages(Map plugin) {
		super(plugin);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map execute(Map value,ITool tool) {
		Map result = new HashMap(2);
		Object res = tool.getTotalPages();
		result.put("type", "text");
		result.put("value", res);
		return result;
	  }
}
