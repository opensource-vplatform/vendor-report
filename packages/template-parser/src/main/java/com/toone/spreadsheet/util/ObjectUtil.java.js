package com.toone.spreadsheet.util;

import java.util.Collection;
import java.util.List;
import java.util.Map;

public class ObjectUtil {

	@SuppressWarnings("rawtypes")
	public static Map cloneMap(Map map) {
		return JsonUtil.parseObject(JsonUtil.toJSONString(map));
	}
	
	@SuppressWarnings("rawtypes")
	public static List cloneList(List list) {
		return JsonUtil.parseArray(JsonUtil.toJSONString(list));
	}
	
	public static boolean contains(Object obj,Object item) {
		if(obj instanceof Map) {
			return ((Map)obj).containsKey(item);
		}else if(obj instanceof Collection) {
			return ((Collection)obj).contains(item);
		}
		return false;
	}
}
