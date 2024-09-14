package com.toone.spreadsheet.api;

/**
 * 变量执行句柄
 * @author matoa
 *
 */
public interface IVariableHandler {
	
	/**
	 * 获取变量值
	 * @param varCode 变量编号
	 * @return
	 */
	Object evaluate(String varCode);
	
}
