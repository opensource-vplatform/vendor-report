package com.toone.spreadsheet.util;

import java.util.List;
import java.util.Map;

import com.toone.spreadsheet.api.IFilter;

public class TemplateUtil {

	/**
	 * 获取列宽
	 * 
	 * @param {*} template
	 * @param {*} row
	 * @param {*} col
	 */
	@SuppressWarnings("rawtypes")
	public static int getColumnWidth(Map template, int col, int colCount) {
		List columns = (List) template.get("columns");
		int width = -1;
		if (columns != null) {
			Map column = (Map) columns.get(col);
			if (column != null) {
				width = (Integer) column.get("size");
			}
		}
		if (width == -1) {
			Map defaults = (Map) template.get("defaults");
			if (defaults != null) {
				width = (Integer) defaults.get("colWidth");
			}
		}
		int result = width != -1 ? width : 62;
		if (colCount > 1) {
			result += getColumnWidth(template, col + 1, colCount - 1);
		}
		return result;
	};

	@SuppressWarnings("rawtypes")
	public static Map getColumn(Map template, int row, int col) {
		Map rows = (Map) JsonUtil.get(template, "data", "dataTable");
		if (rows != null) {
			Map columns = (Map) rows.get(row);
			if (columns != null) {
				return (Map) columns.get(col);
			}
		}
		return null;
	};

	/**
	 * 获取字体大小
	 * @param {*} template
	 * @param {*} row
	 * @param {*} col
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static String getFontSize(Map template,int row,int col,Map style) {
	  if (style!=null) {
		  String fontSize = (String)style.get("fontSize");
		  if(!StringUtil.isEmpty(fontSize)) {
			  return fontSize;
		  }
	  }
	  Map column = getColumn(template, row, col);
	  if (column!=null) {
	    Object stl = column.get("style");
	    if (stl instanceof String) {
	    final	String stlStr = (String)stl;
	      List namedStyles = (List)template.get("namedStyles");
	      if(namedStyles != null) {
	    	  style = (Map)CollectionUtil.find(namedStyles,new IFilter(){
				public boolean filter(Object named) {
	    			  Map nameMap = (Map)named;
	    			  return stlStr.equals(nameMap.get("name"));
	    		  }
	    	  });
	      }
	    }
	    if(style!=null) {
	    	String fontSize = (String)style.get("fontSize");
	    	return StringUtil.isEmpty(fontSize) ? "11pt":fontSize;
	    }
	  }
	  return "11pt";
	};
	
	/**
	 * 获取绑定路径
	 * @param {*} template
	 * @param {*} row
	 * @param {*} col
	 * @returns
	 */
	@SuppressWarnings("rawtypes")
	public static String getBindingPath(Map template,int row,int col) {
	  Map column = getColumn(template, row, col);
	  return column!=null ? (String)column.get("bindingPath") : null;
	};
	
	/**
	 * 获取单元格公式
	 * @param {*} template
	 * @param {*} row
	 * @param {*} col
	 */
	@SuppressWarnings("rawtypes")
	public static Object  getFormula(Map template,int row,int col) {
	  Object formula = null;
	  Map column = getColumn(template, row, col);
	  Object fml = column.get("formula");
	  if (fml!=null && !(fml instanceof String)) {
	    formula = JsonUtil.get(template, "sharedFormulas",JsonUtil.get(column, "formula","si")+"","formula");
	  } else if (fml!=null) {
	    formula = (String)fml;
	  }
	  return formula;
	};
}
