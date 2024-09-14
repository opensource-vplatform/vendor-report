package com.toone.spreadsheet.model;

import java.util.Map;

public class ColumnConfig {
	private boolean isColumn = false;
	private boolean fixed = false;
	private int numberOfColumns = 1;
	private int blankSpan = 0;
	// 复制区域
	private int copyAreaStartRow = -1;
	private int copyAreaEndRow = -1;
	private int copyAreaStarCol = -1;
	private int copyAreaEndCol = -1;
	// 分栏区域
	private int columnAreaStartRow = -1;
	private int columnAreaEndRow = -1;
	private int columnAreaStarCol = -1;
	private int columnAreaEndCol = -1;
	private int fixedColumnCount = 0;

	public ColumnConfig(Map<String, Object> config) {
		if (config != null) {
			boolean enable = (Boolean) config.get("enable");
			if (enable) {
				this.blankSpan = this._getIntAttr(config, "blankSpan", 0);
				this.isColumn = true;
				this.fixed = (Boolean) config.get("fixed");
				this.numberOfColumns = this._getIntAttr(config, "colCount", 1);
				this.setCopyRannge((String) config.get("copyRange"));
				Range range = this.setColumnRange((String) config.get("range"));
				this.fixedColumnCount = range.getColCount();
			}
		}
	}

	private int _getIntAttr(Map<String, Object> config, String attrName, int def) {
		Object value = config.get(attrName);
		if (value != null) {
			return (Integer) value;
		}
		return def;
	}

	private Range setCopyRannge(String range) {
		if (range != null) {
			Range rg = new Range(range);
			this.columnAreaStartRow = rg.getStartRow();
			this.columnAreaStarCol = rg.getStartCol();
			this.columnAreaEndRow = rg.getEndRow();
			this.columnAreaEndCol = rg.getEndCol();
			return rg;
		} else {
			return new Range();
		}
	}

	private Range setColumnRange(String range) {
		if (range != null) {
			Range rg = new Range(range);
			this.copyAreaStartRow = rg.getStartRow();
			this.copyAreaStarCol = rg.getStartCol();
			this.copyAreaEndRow = rg.getEndRow();
			this.copyAreaEndCol = rg.getEndCol();
			return rg;
		} else {
			return new Range();
		}
	}

	public boolean isColumn() {
		return isColumn;
	}

	public boolean isFixed() {
		return fixed;
	}

	public int getNumberOfColumns() {
		return numberOfColumns;
	}

	public int getBlankSpan() {
		return blankSpan;
	}

	public int getCopyAreaStartRow() {
		return copyAreaStartRow;
	}

	public int getCopyAreaEndRow() {
		return copyAreaEndRow;
	}

	public int getCopyAreaStarCol() {
		return copyAreaStarCol;
	}

	public int getCopyAreaEndCol() {
		return copyAreaEndCol;
	}

	public int getColumnAreaStartRow() {
		return columnAreaStartRow;
	}

	public int getColumnAreaEndRow() {
		return columnAreaEndRow;
	}

	public int getColumnAreaStarCol() {
		return columnAreaStarCol;
	}

	public int getColumnAreaEndCol() {
		return columnAreaEndCol;
	}

	public int getFixedColumnCount() {
		return fixedColumnCount;
	}

}
