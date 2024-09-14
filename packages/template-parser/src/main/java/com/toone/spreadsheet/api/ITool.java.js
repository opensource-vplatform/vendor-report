package com.toone.spreadsheet.api;

import java.util.Map;

import com.toone.spreadsheet.model.UnionDatasource;

public interface ITool {
	
	/**
	 * 获取字段值
	 * @param bindingPath
	 * @return
	 */
	Object getValue(String bindingPath);
	
	/**
	 * 获取分组名称
	 * @return
	 */
	String getGroupName();
	
	/**
	 * 获取总页数
	 * @return
	 */
	int getPageCount();
	
	/**
	 * 获取当前页
	 * @return
	 */
	int getPageIndex();
	
	/**
	 * 获取序号
	 * @param type
	 * @return
	 */
	int getSeq(String type);
	/**
	 * 获取行号
	 * @return
	 */
	int getRow();
	/**
	 * 获取列号
	 * @return
	 */
	int getCol();
	/**
	 * 获取模板
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	Map getTemplate();
	/**
	 * 获取模板行号
	 * @return
	 */
	int getTemplateRowIndex();
	/**
	 * 获取模板列号
	 * @return
	 */
	int getTemplateColIndex();
	/**
	 * 获取当前页
	 * @return
	 */
	int getPage();
	/**
	 * 获取总页数
	 * @return
	 */
	int getTotalPages();
	/**
	 * 获取数据集
	 * @return
	 */
	UnionDatasource getUnionDatasource();
	/**
	 * 获取数据量
	 * @return
	 */
	int getDataCount(String tableCode);
	/**
	 * 获取数据下标
	 * @return
	 */
	int getDataIndex(String tableCode,String fieldCode);
	
	/**
	 * 是否在分组合计区域
	 * @return
	 */
	boolean isInGroupSumArea();
	/**
	 * 获取工作表配置
	 * @return
	 */
	Map getSheetJson();
}
