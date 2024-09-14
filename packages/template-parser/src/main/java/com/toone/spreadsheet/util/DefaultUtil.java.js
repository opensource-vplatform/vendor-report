package com.toone.spreadsheet.util;

import java.util.HashMap;
import java.util.Map;

@SuppressWarnings("unchecked")
public class DefaultUtil {
	
	@SuppressWarnings({ "rawtypes" })
	public static Map getSheetDefaults() {
		Map sheetDefs = new HashMap(5);
		sheetDefs.put("colHeaderRowHeight", 20);
		sheetDefs.put("colWidth", 64);
		sheetDefs.put("rowHeaderColWidth", 40);
		sheetDefs.put("rowHeight", 20);
		sheetDefs.put("_isExcelDefaultColumnWidth", false);
		return sheetDefs;
	}
	
}
