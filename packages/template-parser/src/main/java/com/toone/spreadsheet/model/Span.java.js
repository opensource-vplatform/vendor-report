package com.toone.spreadsheet.model;

import java.util.HashMap;
import java.util.Map;

public class Span {

	private int row;
	
	private int col;
	
	private int rowCount;
	
	private int colCount;
	
	public Span() {
		
	}
	
	public Span(int row,int col,int rowCount,int colCount) {
		this.row = row;
		this.col = col;
		this.rowCount = rowCount;
		this.colCount = colCount;
	}

	public int getRow() {
		return row;
	}

	public void setRow(int row) {
		this.row = row;
	}

	public int getCol() {
		return col;
	}

	public void setCol(int col) {
		this.col = col;
	}

	public int getRowCount() {
		return rowCount;
	}

	public void setRowCount(int rowCount) {
		this.rowCount = rowCount;
	}

	public int getColCount() {
		return colCount;
	}

	public void setColCount(int colCount) {
		this.colCount = colCount;
	}
	
	public Span clone() {
		return new Span(this.row,this.col,this.rowCount,this.colCount);
	}
	
	public Map<String,Integer> toJSON() {
		Map<String,Integer> json = new HashMap<String, Integer>(4);
		json.put("row", this.row);
		json.put("col", this.col);
		json.put("rowCount", this.rowCount);
		json.put("colCount", this.colCount);
		return json;
	}
	
}
