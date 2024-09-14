package com.toone.spreadsheet.util;

import java.util.HashMap;
import java.util.Map;

public class MapUtil {

	@SuppressWarnings("rawtypes")
	public static Object get(Map target,Object key,Object def) {
		if(target.containsKey(key)) {
			return target.get(key);
		}
		return def;
	}
	
	@SuppressWarnings("rawtypes")
	public static boolean getBoolean(Map target,Object key) {
		Object val = target.get(key);
		if(val == null) {
			return false;
		}else if(val instanceof Boolean) {
			return (Boolean)val;
		}else if(val instanceof String) {
			return Boolean.valueOf((String)val);
		}else {
			return val != null;
		}
	}
	
	@SuppressWarnings("rawtypes")
	public static double getDouble(Map target,Object key) {
		Object val = target.get(key);
		if(val instanceof Integer) {
			return (Integer)val;
		}else if(val instanceof Double) {
			return (Double)val;
		}
		return 0;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static Map mergeNew(Map ...args) {
		Map result = new HashMap();
		for(Map arg:args) {
			result.putAll(arg);
		}
		return result;
	}
	
}
