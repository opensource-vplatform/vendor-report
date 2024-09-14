package com.toone.spreadsheet.api;

import java.util.Map;

public interface IPlugin {

	@SuppressWarnings("rawtypes")
	Map execute(Map value,ITool tool);
	
	boolean test(ITool tool);
	
	@SuppressWarnings("rawtypes")
	Map update(Map param);
	
}
