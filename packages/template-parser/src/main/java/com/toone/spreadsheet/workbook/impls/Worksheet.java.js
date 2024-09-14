package com.toone.spreadsheet.workbook.impls;

import java.util.ArrayList;
import java.util.List;

public class Worksheet {

	private List<Range> spans = null;
	
	/**
	 * 添加合并单元格信息
	 * @param row
	 * @param col
	 * @param rowCount
	 * @param colCount
	 */
	public void addSpan(int row,int col,int rowCount,int colCount) {
		if(this.spans == null) {
			this.spans = new ArrayList<Range>();
		}
		this.spans.add(new Range(row,col,rowCount,colCount));
	}
	
	/**
	 * 获取所有合并信息
	 * @return
	 */
	public List<Range> getSpans(){
		return this.spans == null ? null:new ArrayList<Range>(this.spans);
	}
	
	/**
	 * 获取单元格
	 * @param row
	 * @param col
	 * @return
	 */
	public Cell getCell(int row,int col) {
		return null;
	}
	
	/**
	 * 设置列数
	 * @param colCount
	 */
	public void setColumnCount(int colCount) {
		
	}
	
	/**
	 * 设置列宽
	 * @param col
	 * @param width
	 */
	public void setColumnWidth(int col,int width) {
		
	}
	
	/**
	 * 设置单元格值
	 * @param row
	 * @param col
	 * @param text
	 */
	public void setText(int row,int col, String text) {
		
	}
	
	/**
	 * 设置单元格值
	 * @param row
	 * @param col
	 * @param value
	 */
	public void setText(int row,int col, double value) {
		
	}
	
}
