package com.toone.spreadsheet.cache;

import java.util.HashMap;
import java.util.Map;

public class Cache {

	private Map<String,String> pool = new HashMap<String,String>();
	
	public String get(String key) {
		return pool.get(key);
	}
	
	public boolean contains(String key) {
		return pool.containsKey(key);
	}
	
	public void set(String key,String value) {
		pool.put(key, value);
	}
	
}
