package com.toone.spreadsheet.cache;

import java.util.HashMap;
import java.util.Map;

public class MemeryCache {

	private Map<String,Object> pool = new HashMap<String,Object>();
	
	
	public Object get(String key) {
		return pool.get(key);
	}
	
	public void set(String key,Object value) {
		pool.put(key, value);
	}
	
	public boolean contains(String key) {
		return pool.containsKey(key);
	}
	
}
