package com.toone.spreadsheet.plugin;

import java.util.Map;

import com.toone.spreadsheet.api.IPlugin;
import com.toone.spreadsheet.api.ITool;

public class Plugin implements IPlugin {

	@SuppressWarnings("rawtypes")
	private Map plugin;

	@SuppressWarnings("rawtypes")
	public Plugin(Map plugin) {
		this.plugin = plugin;
	}

	public boolean test(ITool tool) {
		return true;
	}

	@SuppressWarnings("rawtypes")
	public Map getPlugin() {
		return this.plugin;
	}

	@SuppressWarnings("rawtypes")
	protected Map getConfig() {
		if (this.plugin != null) {
			return (Map) this.plugin.get("config");
		}
		return null;
	}

	@SuppressWarnings("rawtypes")
	public Map execute(Map value, ITool tool) {
		return value;
	}
	
	@SuppressWarnings("rawtypes")
	public Map update(Map param) {
		return this.plugin;
	}

}
