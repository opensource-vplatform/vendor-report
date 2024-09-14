package com.toone.spreadsheet.plugin.impls;

import java.util.HashMap;
import java.util.Map;

import com.toone.spreadsheet.api.ITool;
import com.toone.spreadsheet.plugin.Plugin;

public class CellPage extends Plugin {

	@SuppressWarnings("rawtypes")
	public CellPage(Map plugin) {
		super(plugin);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Map execute(Map value,ITool tool) {
		int res = tool.getPage();
		Map result = new HashMap(2);
		result.put("type", "text");
		result.put("value", res);
        return result;
    }

}
