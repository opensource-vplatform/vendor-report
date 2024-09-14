package com.toone.spreadsheet.model;

import org.apache.poi.ss.SpreadsheetVersion;
import org.apache.poi.ss.util.AreaReference;
import org.apache.poi.ss.util.CellReference;

public class Range {
	/**
	 * 开始行
	 */
	private int startRow = -1;
	/**
	 * 结束行
	 */
	private int endRow = -1;
	/**
	 * 开始列
	 */
	private int startCol = -1;
	/**
	 * 结束列
	 */
	private int endCol = -1;
	/**
	 * 列数
	 */
	private int colCount = 0;
	
	public Range() {
		
	}

	public Range(String formula) {
		AreaReference areaRef = new AreaReference(formula, SpreadsheetVersion.EXCEL2007);
		CellReference[] refs = areaRef.getAllReferencedCells();
		if (refs.length > 0) {
			CellReference startRef = refs[0];
			this.startRow = startRef.getRow();
			this.startCol = startRef.getCol();
			CellReference endRef = refs[refs.length - 1];
			this.endRow = endRef.getRow();
			this.endCol = endRef.getCol();
			this.colCount = this.endCol - this.startCol + 1;
		}
	}

	public int getStartRow() {
		return startRow;
	}

	public int getEndRow() {
		return endRow;
	}

	public int getStartCol() {
		return startCol;
	}

	public int getEndCol() {
		return endCol;
	}

	public int getColCount() {
		return colCount;
	}

}
