package com.toone.spreadsheet.workbook.impls;

import java.util.HashMap;
import java.util.Map;

import com.toone.spreadsheet.util.MapUtil;
import com.toone.spreadsheet.workbook.ISpreadComponent;

public class Range implements ISpreadComponent {
	/**
	 * 行索引
	 */
	private int row;

	/**
	 * 列索引
	 */
	private int col;

	/**
	 * 行数
	 */
	private int rowCount;

	/**
	 * 列数
	 */
	private int colCount;

	public Range() {

	}

	public Range(int row, int col, int rowCount, int colCount) {
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

	public boolean contains(int row, int col) {
		return this.contains(row, col, 1, 1);
	}

	public boolean contains(int row, int col, int rowCount) {
		return this.contains(row, col, rowCount, 1);
	}

	public boolean contains(int row, int col, int rowCount, int colCount) {
		return this.row >= row && this.col >= col && this.row + this.rowCount >= row + rowCount
				&& this.col + this.colCount >= col + colCount;
	}

	public Object toJson() {
		Map<String, Integer> json = new HashMap<String, Integer>(4);
		json.put("row", this.row);
		json.put("col", this.col);
		json.put("rowCount", this.rowCount);
		json.put("colCount", this.colCount);
		return json;
	}

	@SuppressWarnings("unchecked")
	public ISpreadComponent fromJson(Object json) {
		Map<String, Integer> data = (Map<String, Integer>) json;
		int row = (Integer) MapUtil.get(data, "row", 0);
		int col = (Integer) MapUtil.get(data, "col", 0);
		int rowCount = (Integer) MapUtil.get(data, "rowCount", 1);
		int colCount = (Integer) MapUtil.get(data, "colCount", 1);
		Range range = new Range(row, col, rowCount, colCount);
		return range;
	}

}
