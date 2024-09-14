package com.toone.spreadsheet.api;

import java.util.Map;

/**
 * 获取字段值句柄
 * @author matoa
 *
 */
public interface IValueHandler {

	@SuppressWarnings("rawtypes")
	Map get(Map params);
	
}
