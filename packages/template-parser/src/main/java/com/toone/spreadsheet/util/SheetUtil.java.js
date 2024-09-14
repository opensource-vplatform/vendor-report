package com.toone.spreadsheet.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.toone.spreadsheet.api.IFilter;
import com.toone.spreadsheet.api.IValueHandler;

public class SheetUtil {

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static void genAutoMergeRanges(Map merge, List autoMergeRanges, int startRow) {
		int direction = 1; // 在列方向上应用自动合并
		int mode = 0; // 0:在相邻单元格具有相同值时应用自动合并;1:在相邻单元格具有相同值并且自动合并前一行或前一列中的相应单元格时应用自动合并
		int sheetArea = 3; // spreadNS.SheetArea.viewpor
		int selectionMode = 1; // 0:在应用自动合并时选择单个单元格;1:在应用自动合并时选择具有相同值的所有单元格

		if ((Boolean) merge.get("columnMerge") && (Boolean) merge.get("rowMerge")) {
			direction = 4; // 在行方向上优先于列方向应用自动合并
		} else if ((Boolean) merge.get("rowMerge")) {
			direction = 2; // 在行方向上应用自动合并
		}
		Map range = new HashMap();
		range.put("row", (Integer) merge.get("row") - startRow);
		range.put("col", merge.get("col"));
		range.put("rowCount", merge.get("rowCount"));
		range.put("colCount", merge.get("colCount"));

		Map mergeRange = new HashMap();
		mergeRange.put("range", range);
		mergeRange.put("direction", direction);
		mergeRange.put("mode", mode);
		mergeRange.put("sheetArea", sheetArea);
		mergeRange.put("selectionMode", selectionMode);
		autoMergeRanges.add(mergeRange);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List getRowRules(Map params) {
		List result = (List) params.get("rules");
		final int row = (Integer) params.get("row");
		if (row >= 0) {
			result = CollectionUtil.filter(result, new IFilter<Map>() {

				public boolean filter(Map map) {
					List ranges = (List) map.get("ranges");
					return CollectionUtil.some(ranges, new IFilter<Map>() {

						public boolean filter(Map range) {
							int _row = (Integer) range.get("row");
							int rowCount = (Integer) range.get("rowCount");
							return _row <= row && row < _row + rowCount;
						}
					});
				}
			});
		}
		return result;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static Map getOldRowHeight(List rows, int row, Integer rowHeight) {
		if (rowHeight == null) {
			rowHeight = 20;
		}
		Map res = null;
		if (rows != null) {
			int size = rows.size();
			if(size > 0 && row < size){
				res = (Map) rows.get(row);
			}
		}
		if (res == null) {
			res = new HashMap(1);
			res.put("size", rowHeight);
		}
		return res;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List getColRules(Map params) {
		final int col = (Integer) params.get("col");
		List rules = (List) params.get("rules");
		final Object colHandler = params.get("colHandler");
		List result = rules;
		if (col >= 0) {
			result = CollectionUtil.filter(result, new IFilter<Map>() {

				public boolean filter(Map item) {
					List ranges = (List) item.get("ranges");
					boolean res = CollectionUtil.some(ranges, new IFilter<Map>() {

						public boolean filter(Map range) {
							int _col = (Integer) range.get("col");
							int colCount = (Integer) range.get("colCount");
							return _col <= col && col < _col + colCount;
						}
					});
					if (res && colHandler instanceof IValueHandler) {
						IValueHandler handler = (IValueHandler) colHandler;
						handler.get(ObjectUtil.cloneMap(item));
					}
					return res;
				}
			});
		}
		return result;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void enhance(Map dataTable, List<Map> enhanceResult) {
		for (Map map : enhanceResult) {
			String type = (String)map.get("type");
			Object value = map.get("value");
			String key = null;
			if ("text".equals(type)) {
				key = "value";
				// 如果结果为text，则需要删除formula信息，否则单元格还是计算公式显示值。
				// delete dataTable.formula;//删除formula信息，有可能导致提前计算总页数，导致总页数计算错误,改在下面删除delete
				// colDataTable.formula
			} else {
				key = type;
				//如果设置了formula，value属性值将不再生效，移除
				dataTable.remove("value");
			}
			// const key = type === 'text' ? 'value' : type;
			dataTable.put(key, value);
		}
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static void enhance(Map dataTable, Map enhanceResult) {
		List res = new ArrayList();
		res.add(enhanceResult);
		enhance(dataTable,res);
	}

}
