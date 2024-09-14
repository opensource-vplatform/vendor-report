package com.toone.spreadsheet.cache;

import java.util.HashMap;
import java.util.Map;

public class CacheManager {
	
	private Map<String,Cache> pool = new HashMap<String,Cache>();
	
	private Map<String,MemeryCache> memeryPool = new HashMap<String, MemeryCache>();
	
	private static CacheManager INSTANCE = new CacheManager();
	
	private CacheManager() {}
	
	public static CacheManager getInstance() {
		return INSTANCE;
	}
	
	public Cache getCache(String domain) {
		Cache cache = pool.get(domain);
		if(cache == null) {
			cache = new Cache();
			pool.put(domain, cache);
		}
		return cache;
	}
	
	public MemeryCache getMemeryCache(String domain) {
		MemeryCache cache = memeryPool.get(domain);
		if(cache==null) {
			cache = new MemeryCache();
			memeryPool.put(domain, cache);
		}
		return cache;
	}

}
