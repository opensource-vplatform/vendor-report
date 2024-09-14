package com.toone.spreadsheet.formula;

import java.util.Map;

import com.toone.spreadsheet.api.IHandler;
import com.toone.spreadsheet.api.ITool;
import com.toone.spreadsheet.model.UnionDatasource;

public class Tool implements ITool {

	private IHandler fieldIndexHandler;

	private IHandler colHandler;

	private IHandler templateColIndexHandler;

	private IHandler groupNameHandler;

	private IHandler isGroupSumAreaHandler;

	private IHandler rowHandler;

	private IHandler sheetJsonHandler;

	private IHandler templateHandler;
	private IHandler pageHandler;
	private IHandler totalPagesHandler;
	private IHandler valueHandler;
	private IHandler seqHandler;
	private IHandler dataCountHandler;
	private IHandler dataIndexHandler;
	private IHandler unionDatasourceHandler;
	private IHandler variableHandler;
	private IHandler templateRowIndexHandler;

	public void setFieldIndexHandler(IHandler handler) {
		this.fieldIndexHandler = handler;
	}

	public void setColHandler(IHandler handler) {
		this.colHandler = handler;
	}

	public void setTemplateColIndex(IHandler handler) {
		this.templateColIndexHandler = handler;
	}

	public void setGroupNameHandler(IHandler handler) {
		this.groupNameHandler = handler;
	}

	public void setIsGroupSumAreaHandler(IHandler handler) {
		this.isGroupSumAreaHandler = handler;
	}

	public void setRowHandler(IHandler handler) {
		this.rowHandler = handler;
	}

	public void setSheetJsonHandler(IHandler handler) {
		this.sheetJsonHandler = handler;
	}

	public void setTemplateHandler(IHandler handler) {
		this.templateHandler = handler;
	}

	public void setTemplateRowIndex(IHandler handler) {
		this.templateRowIndexHandler = handler;
	}

	public void setPageHandler(IHandler handler) {
		this.pageHandler = handler;
	}

	public void setTotalPagesHandler(IHandler handler) {
		this.totalPagesHandler = handler;
	}

	public void setValueHandler(IHandler handler) {
		this.valueHandler = handler;
	}

	public void setSeqHandler(IHandler handler) {
		this.seqHandler = handler;
	}

	public void setDataCountHandler(IHandler handler) {
		this.dataCountHandler = handler;
	}

	public void setDataIndex(IHandler handler) {
		this.dataIndexHandler = handler;
	}

	public void setUnionDatasourceHandler(IHandler handler) {
		this.unionDatasourceHandler = handler;
	}

	public void setVariableHandler(IHandler handler) {
		this.variableHandler = handler;
	}

	@SuppressWarnings("unchecked")
	public Object getValue(String bindingPath) {
		return this.valueHandler.invoke(bindingPath);
	}

	@SuppressWarnings("unchecked")
	public String getGroupName() {
		return (String)this.groupNameHandler.invoke(null);
	}

	@SuppressWarnings("unchecked")
	public int getPageCount() {
		return (Integer)this.totalPagesHandler.invoke(null);
	}

	@SuppressWarnings("unchecked")
	public int getPageIndex() {
		return (Integer)this.pageHandler.invoke(null);
	}

	@SuppressWarnings("unchecked")
	public int getSeq(String type) {
		return (Integer)this.seqHandler.invoke(type);
	}

	@SuppressWarnings("unchecked")
	public int getRow() {
		return (Integer)this.rowHandler.invoke(null);
	}

	@SuppressWarnings("unchecked")
	public int getCol() {
		return (Integer)this.colHandler.invoke(null);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map getTemplate() {
		return (Map)this.templateHandler.invoke(null);
	}

	@SuppressWarnings("unchecked")
	public int getTemplateRowIndex() {
		return (Integer)this.templateRowIndexHandler.invoke(null);
	}

	@SuppressWarnings("unchecked")
	public int getTemplateColIndex() {
		return (Integer)this.templateColIndexHandler.invoke(null);
	}

	@SuppressWarnings("unchecked")
	public int getPage() {
		 return (Integer)this.pageHandler.invoke(null);
	}

	@SuppressWarnings("unchecked")
	public int getTotalPages() {
		return (Integer)this.totalPagesHandler.invoke(null);
	}

	@SuppressWarnings("unchecked")
	public UnionDatasource getUnionDatasource() {
		return (UnionDatasource)this.unionDatasourceHandler.invoke(null);
	}

	@SuppressWarnings("unchecked")
	public int getDataCount(String tableCode) {
		return (Integer)this.dataCountHandler.invoke(tableCode);
	}

	@SuppressWarnings("unchecked")
	public int getDataIndex(String tableCode, String fieldCode) {
		return (Integer)this.dataIndexHandler.invoke(null);
	}

	@SuppressWarnings("unchecked")
	public boolean isInGroupSumArea() {
		return (Boolean)this.isGroupSumAreaHandler.invoke(null);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Map getSheetJson() {
		return (Map)this.sheetJsonHandler.invoke(null);
	}

}
