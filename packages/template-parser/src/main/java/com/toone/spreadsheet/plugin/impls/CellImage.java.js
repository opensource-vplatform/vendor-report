package com.toone.spreadsheet.plugin.impls;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import com.toone.spreadsheet.api.ITool;
import com.toone.spreadsheet.plugin.Plugin;

public class CellImage extends Plugin {
	
	private static Map<String,Object> argMap = new HashMap<String,Object>(11);
	
	private static String[] argNameIndex = new String[] {
			"url","alt","mode","height","width","clipX",
			"clipY","clipHeight","clipWidth","vAlign","hAlign"};
	static {
		argMap.put("url","");
        argMap.put("alt","");
        argMap.put("mode", 1);
        argMap.put("height", 0);
        argMap.put("width", 0);
        argMap.put("clipX", 0);
        argMap.put("clipY", 0);
        argMap.put("clipHeight", 0);
        argMap.put("clipWidth", 0);
        argMap.put("vAlign", 2);
        argMap.put("hAlign", 1);
	}

	@SuppressWarnings("rawtypes")
	public CellImage(Map plugin) {
		super(plugin);
	}
	
	/**
	 * 非image函数默认值
	 * @param {} value
	 * @returns
	 */
	@SuppressWarnings("rawtypes")
	private boolean isNotDefImageValue(Object value) {
		if(
				value!=null&&value instanceof Map &&
				"SparklineExValue".equals(((Map)value).get("typeName"))&&
				((Map)value).get("value")!=null &&
				"./image.png".equals(((Map)((Map)value).get("value")).get("url"))
		) {
			return false;
		}
		return true;
	}
	
	 private Object toFormulaArg(Object val) {
	    if (val==null) {
	        return "";
	    }
	    return val;
	}
	 
	 private boolean isEquals(Object val,Object val1) {
		 if(val instanceof Integer &&val1 instanceof Integer) {
			 return (Integer)val == (Integer)val1;
		 }else if(val instanceof String &&val1 instanceof String) {
			 return ((String)val).equals((String)val1);
		 }
		 return false;
	 }

	@SuppressWarnings("rawtypes")
	private String toFormula(Map data) {
	    StringBuilder formula = new StringBuilder();
	    formula.append("IMAGE(");
	    for(String argName: argNameIndex) {
	    	Object argDef = argMap.get(argName);
	        Object val = data.get(argName);
	        val = this.isEquals(val, argDef) ? null : val;
	        formula.append(this.toFormulaArg(val));
	        formula.append(',');
	    }
	    formula.deleteCharAt(formula.length()-1);
	    formula.append(')');
	    return formula.toString();
	};
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map execute(Map value,ITool tool) {
        Map config = this.getConfig();
        Object val = value.get("value");
        if (val!=null && this.isNotDefImageValue(val)) {
            //有值的时候才生成IMAGE函数
        	String type = (String)value.get("type");
        	String url = "formula".equals(type) ? (String)val: "\""+(String)val+"\"";
        	Map data = new HashMap(config);
        	data.put("url", url);
            String formula = toFormula(data);
            Map result = new HashMap(2);
            result.put("type", "formula");
            result.put("value", formula);
            return result;
        } else {
        	Map result = new HashMap(2);
        	result.put("type", "text");
        	result.put("value", "");
            return result;
        }
    }

}
