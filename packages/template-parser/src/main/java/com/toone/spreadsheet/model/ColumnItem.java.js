package com.toone.spreadsheet.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.toone.spreadsheet.util.MapUtil;

public class ColumnItem {
	// 外部传入属性
	private ColumnItem parent = null;
	private UnionDatasource datasource = null; // 数据源
	private int totalHeight = 0; // 栏的最大总高度。所有栏的高度不能大于这个值
	@SuppressWarnings("rawtypes")
	private Map template = null; // 行模板
	@SuppressWarnings("rawtypes")
	private Map sheet = null;
	private int startIndex = 0; // 数据源的起始索引
	@SuppressWarnings("rawtypes")
	private List namedStyles = new ArrayList(); // 样式命名空间
	private boolean isFillData = false; // 数据不满一页时是否填充满一页
	private boolean singleRowFill = false;
	private int startRow = 0;

	// 内部属性
	private int height = 0; // 当前栏已经渲染的高度。不能大于totalHeight
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private List<Map> rows = new ArrayList(); // 存储每一行的内容
	@SuppressWarnings("rawtypes")
	private List verticalAutoMergeRanges = new ArrayList();
	private int dataCount = 0; // 当前栏已经消耗多少数据源
	private int seqNo = 1; // 序列号
	private int rowCount = 0;
	private int tempRowCount = 0;
	private int tempRow = 0;

	/*
	 * constructor(parameter = {}) { Object.entries(parameter).forEach(([key,
	 * value]) => { this[key] = value; }); this.render(); }
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void render() {
		int dataCount = 0;
		if (this.datasource != null) {
			dataCount = this.datasource.getCount();
		}
		if (dataCount == 0) {
			dataCount = 1;
		}
		this.dataCount = 0;
		this.rowCount = 0;
		this.rows = new ArrayList();
		this.height = 0;
		this.seqNo = 1;
		if (this.parent != null) {
			this.startIndex = this.parent.dataCount + this.parent.startIndex;
			this.seqNo = this.parent.seqNo;
		}
		int index = this.startIndex;
		List<Map> verticalAutoMergeRanges = (List<Map>) MapUtil.get(this.template, "verticalAutoMergeRanges",
				new ArrayList());
		// 多行填充满一页
		boolean isMultiLineFilling = this.isFillData && !this.singleRowFill;
		while (index < dataCount || (this.parent != null && this.dataCount < this.parent.dataCount)
				|| (isMultiLineFilling && this.parent == null)) {
			if (this.parent != null && this.dataCount >= this.parent.dataCount) {
				break;
			}

			// 渲染当前行内容。当前内容尚未放入栏中
			Map res = this.renderRow(index, this.seqNo);
			// 父栏的行高度与子栏的行高度保持一致并且取最大者，父栏行高高取父栏，否则取子栏行高
			if (this.parent != null) {
				boolean setRowSizeRes = this.parent.setRowSize(this.rowCount, (List) res.get("dataTables"));
				// 改变行高后父栏高度已经超出了栏的最大总高度。子栏重新渲染
				if (setRowSizeRes) {
					this.render();
					break;
				}
			}

			// 如果当前行高度加上已经渲染的高度大于内容的高度，则当前栏渲染完成。否则将当行栏加入栏中
			if ((Integer) res.get("height") + this.height > this.totalHeight) {
				break;
			}
			if (index < dataCount || (this.parent != null && this.dataCount < this.parent.dataCount)) {
				if (this.parent != null) {
					this.tempRowCount = this.parent.tempRowCount;
				} else {
					this.tempRowCount += 1;
				}
			}
			this.seqNo++;
			this.height += (Integer) res.get("height");
			this.rows.addAll((List) res.get("dataTables"));
			this.rowCount += ((List) res.get("dataTables")).size();
			this.dataCount++;
			index++;
		}
		for (Map info : verticalAutoMergeRanges) {
			Map map = new HashMap(info);
			Map range = new HashMap((Map) info.get("range"));
			range.put("rowCount", this.dataCount);
			map.put("range", range);
			this.verticalAutoMergeRanges.add(map);
		}
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private Map renderRow(int dataIndex, int seqNo) {
		List dataTables = (List) this.template.get("dataTables");
		List renderResult = new ArrayList();
		int tempRowsHeight = 0;
		for (int index = 0, l = dataTables.size(); index < l; index++) {
			Map dataTable = (Map)dataTables.get(index);
			Map rows = (Map) MapUtil.get(dataTable, "rows", new HashMap());
			Map rowDataTable = (Map) dataTable.get("rowDataTable");
			List spans = (List) MapUtil.get(dataTable, "spans", new ArrayList());
			List rules = (List) MapUtil.get(dataTable, "rules", new ArrayList());
			List autoMergeRanges = (List) MapUtil.get(dataTable, "autoMergeRanges", new ArrayList());
			Map template = new HashMap(rowDataTable);
			Row row = new Row();
			row.setTemplate(template);
			row.setRows(rows);
			row.setSpans(spans);
			row.setRules(rules);
			row.setAutoMergeRanges(autoMergeRanges);
			row.setDataIndex(dataIndex);
			row.setDatasource(this.datasource);
			row.setSheet(this.sheet);
			row.setRowNo(this.startRow + this.rowCount + index);
			row.setNamedStyles(this.namedStyles);
			row.setSeqNo(seqNo);
			row.setTempRow(this.tempRow);
			row.setDataTableIndex(index);

			row.render();
			tempRowsHeight += row.getRowHeight();
			renderResult.add(row);
		}
		Map result = new HashMap(2);
		result.put("height", tempRowsHeight);
		result.put("dataTables", renderResult);
		return result;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private boolean setRowSize(int startRow, List dataTables) {
		if (this.parent != null) {
			boolean res = this.parent.setRowSize(startRow, dataTables);
			// 改变行高后。父栏高度已经超出了栏的最大总高度。子栏重新渲染
			if (res) {
				this.render();
				return true;
			}
		}
		boolean isExist = true;
		for (int i = 0; i < dataTables.size(); i++) {
			Map row = (Map) this.rows.get(i + startRow);
			if (row != null) {
				row.put("rowHeight", (((Map) dataTables.get(i)).get("rowHeight")));
			} else {
				isExist = false;
			}
		}

		if (!isExist) {
			return true;
		}
		for (Map row : this.rows) {
			int rowHeight = (Integer) row.get("rowHeight");
			this.height += rowHeight;
		}
		// 如果已经超过了一页
		if (this.height > this.totalHeight) {
			// 还原高度
			this.restoreHeight();
			// 移除末尾行数据
			this.rows.remove(this.rows.size() - 1);
			this.dataCount -= 1;
			this.rowCount -= 1;
			this.seqNo = this.dataCount + 1;
			return true;
		}
		return false;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private void restoreHeight() {
		for (Map item : this.rows) {
			item.put("rowHeight", item.get("tempRowHeight"));
		}
	}

	@SuppressWarnings("rawtypes")
	public void setTemplate(Map template) {
		this.template = template;
	}

	public void setDatasource(UnionDatasource datasource) {
		this.datasource = datasource;
	}

	public void setTotalHeight(int totalHeight) {
		this.totalHeight = totalHeight;
	}

	public void setParent(ColumnItem parent) {
		this.parent = parent;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	@SuppressWarnings("rawtypes")
	public void setSheet(Map sheet) {
		this.sheet = sheet;
	}

	@SuppressWarnings("rawtypes")
	public void setNamedStyles(List namedStyles) {
		this.namedStyles = namedStyles;
	}

	public void setFillData(boolean isFillData) {
		this.isFillData = isFillData;
	}

	public void setSingleRowFill(boolean singleRowFill) {
		this.singleRowFill = singleRowFill;
	}

	public void setStartRow(int startRow) {
		this.startRow = startRow;
	}

	
	public void setTempRow(int tempRow) { 
		this.tempRow = tempRow; 
	}
	 

	public int getTempRowCount() {
		return this.tempRowCount;
	}

	public int getHeight() {
		return this.height;
	}

	public int getDataCount() {
		return this.dataCount;
	}

	public int getRowCount() {
		return this.rowCount;
	}

	@SuppressWarnings("rawtypes")
	public List getRows() {
		return this.rows;
	}

	@SuppressWarnings("rawtypes")
	public List getVerticalAutoMergeRanges() {
		return this.verticalAutoMergeRanges;
	}
}
