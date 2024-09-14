package com.toone.spreadsheet.util;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;

public class JsonUtil {
	
	@SuppressWarnings("rawtypes")
	private static Object get(Object target,String path) {
		if(target instanceof Map) {
			 return ((Map)target).get(path);
		}else if(target instanceof List) {
			int index = Integer.valueOf(path);
			List list = (List)target;
			if(list.size()>index) {
				return list.get(index);
			}
			return null;
		}else{
			throw new RuntimeException("获取Json值失败！");
		}
	}
	
	public static Object get(Object target,String ...paths) {
		if(target==null) {
			return null;
		}
		if(paths==null||paths.length==0) {
			return target;
		}
		String path = paths[0];
		return get(get(target,path),Arrays.copyOfRange(paths, 1, paths.length));
	}
	
	public static int getInt(Object target,String ...paths) {
		Object res = get(target,paths);
		if(res==null) {
			return 0;
		}else {
			return (Integer)res;
		}
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static void set(Object target,Object val,String ...paths) {
		if(target!=null&&paths!=null&&paths.length>0) {
			String path = paths[0];
			if(paths.length==1) {
				//设置属性
				if(target instanceof Map) {
					 ((Map)target).put(path, val);
				}else if(target instanceof List) {
					List list = (List)target;
					int index = Integer.valueOf(path);
					CollectionUtil.set(list,index,val);
				}
			}else {
				set(get(target,path),val,Arrays.copyOfRange(paths, 1, paths.length));
			}
			
		}
	}
	
	public static void selfAddSet(Object target,int increase,String ...paths) {
		int result = (Integer)get(target,paths);
		set(target,(Integer)(result+increase),paths);
	}
	
	public static void selfAddSet(Object target,double increase,String ...paths) {
		double val = 0;
		Object res = get(target,paths);
		if(res instanceof Integer) {
			val = (Integer)res;
		}else if(res instanceof Double) {
			val = (Double)res;
		}else {
			throw new RuntimeException("值有误！");
		}
		//double result = (Double)get(target,paths);
		set(target,val+increase,paths);
	}
	
	public static String toJSONString(Object obj) {
		return JSON.toJSONString(obj);
	}
	
	public static String toFormatedJSONString(Object obj) {
		return JSON.toJSONString(obj, true);
	}
	
	@SuppressWarnings("rawtypes")
	public static Map parseObject(String json) {
		return JSON.parseObject(json,Map.class);
	}
	
	
	@SuppressWarnings("rawtypes")
	public static List parseArray(String json) {
		return JSON.parseArray(json, Map.class);
	}
}
