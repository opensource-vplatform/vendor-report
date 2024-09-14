package com.toone.spreadsheet.plugin;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.toone.spreadsheet.api.IPlugin;
import com.toone.spreadsheet.formula.Tool;

public class PluginEngine {
	
	private static PluginEngine INSTANCE = new PluginEngine();
	
	private PluginEngine() {}
	
	public static PluginEngine getInstance() {
		return INSTANCE;
	}

	@SuppressWarnings("rawtypes")
	public Map exePlugins(Map value,List<Map<String,Object>> plugins,Tool tool) {
		for(Map<String,Object> plugin:plugins) {
			IPlugin inst = PluginFactory.create(plugin);
			if(inst != null && inst.test(tool)) {
				value = inst.execute(value, tool);
			}
		}
	    return value;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<Map<String,Object>> updatePlugins(List<Map<String,Object>> plugins,Map updateParams) {
		List<Map<String,Object>> result = new ArrayList<Map<String,Object>>();
	    for(Map<String,Object> plugin:plugins) {
	    	IPlugin inst = PluginFactory.create(plugin);
	        if(inst!=null){
	            result.add((Map<String,Object>)inst.update(updateParams));
	        }
	    }
	    return result;
	}
	
}
