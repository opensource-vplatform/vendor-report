package com.toone.spreadsheet;

import java.util.Map;

/**
 * 报表数据规范
 * @author matoa
 *
 */
public interface IReportSpec {

	/**
	 * 将报表转换成Map数据
	 * @return
	 */
	Map<String,Object> toMap();	
	
	/**
	 * 将报表转换成Json数据
	 * @return
	 */
	String toJson();
	
}
