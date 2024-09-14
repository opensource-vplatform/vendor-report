package com.toone.spreadsheet.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;

import com.toone.spreadsheet.api.IHandler;
import com.toone.spreadsheet.util.MapUtil;

@SuppressWarnings("rawtypes")
public class Chunk {
	// 外部传入属性
	private List dataTables = new ArrayList();
	private int dataIndex = 0;
	private List<String> namedStyles = new ArrayList<String>();
	private Map sheet = null;
	private int startRow = 0;
	private UnionDatasource datasource = null;
	private int seqNo = 0;
	private int dataStartIndex = 0;
	private Sheet sheetPage = null;
	private boolean isGroup = false;
	private Variables variable = null;
	// 内部属性
	private double height = 0;
	private List<Row> rows = new ArrayList<Row>();
	private int rowCount = 0;
	private Map rowStyles = new HashedMap();
	private IHandler totalPagesHandler = null;
	private IHandler getValueHandler = null;
	private String groupName = null;
	private boolean isTotalArea = false;
	private UnionDatasource unionDatasourceAll = null;
	private double tempHeight = 0;
	private boolean isFillData = false;
	private int tempRow = 0;
	
	private IHandler pageHandler = null;

	public Chunk() {
		/*
		 * Object.entries(parameter).forEach(([key, value]) => { this[key] = value; });
		 */
		// this.render();
	}

	@SuppressWarnings({ "unchecked" })
	public void render() {
		for (int index = 0, l = this.dataTables.size(); index < l; index++) {
			Map dataTable = (Map) this.dataTables.get(index);
			Map rows = (Map) MapUtil.get(dataTable, "rows", new HashMap());
			Map rowDataTable = (Map) dataTable.get("rowDataTable");
			List spans = (List) MapUtil.get(dataTable, "spans", new ArrayList());
			List rules = (List) MapUtil.get(dataTable, "rules", new ArrayList());
			List autoMergeRanges = (List) MapUtil.get(dataTable, "autoMergeRanges", new ArrayList());
			List shapes = (List) MapUtil.get(dataTable, "shapes", new ArrayList());
			Row row = new Row();
			row.setTemplate(new HashMap(rowDataTable));
			row.setShapes(shapes);
			row.setRows(rows);
			row.setSpans(spans);
			row.setRules(rules);
			row.setAutoMergeRanges(autoMergeRanges);
			row.setDataIndex(this.dataIndex);
			row.setDatasource(this.datasource);
			row.setSheet(this.sheet);
			row.setRowNo(this.startRow + index);
			row.setNamedStyles(this.namedStyles);
			row.setDataStartIndex(this.dataStartIndex);
			row.setSheetPage(this.sheetPage);
			row.setTotalPagesHandler(this.totalPagesHandler);
			row.setDataTableIndex(index);
			row.setGetValueHandler(this.getValueHandler);
			row.setGroup(this.isGroup);
			row.setGroupName(this.groupName);
			row.setTotalArea(this.isTotalArea);
			row.setUnionDatasourceAll(this.unionDatasourceAll);
			row.setSeqNo(this.seqNo);
			row.setTempHeight((int)this.tempHeight / this.dataTables.size());
			row.setFillData(this.isFillData);
			row.setTempRow(this.tempRow);
			row.setpageHandler(this.pageHandler);
			Map style = (Map)this.rowStyles.get(index);
			if (style == null) {
				style = new HashMap();
			}
			row.setStyle(style);
			row.setVariable(this.variable);
			row.render();
			this.rowStyles.putAll(row.getRowStyles());
			this.height += row.getRowHeight();
			this.rowCount += 1;
			this.rows.add(row);
		}
	}

	public void setDataTables(List dataTables) {
		this.dataTables = dataTables;
	}

	public void setNamedStyles(List<String> namedStyles) {
		this.namedStyles = namedStyles;
	}

	public void setSheet(Map sheet) {
		this.sheet = sheet;
	}

	public void setDataIndex(int dataIndex) {
		this.dataIndex = dataIndex;
	}

	public void setDataStartIndex(int dataStartIndex) {
		this.dataStartIndex = dataStartIndex;
	}

	public void setStartRow(int startRow) {
		this.startRow = startRow;
	}

	public void setDatasource(UnionDatasource datasource) {
		this.datasource = datasource;
	}

	public void setTotalPagesHandler(IHandler totalPagesHandler) {
		this.totalPagesHandler = totalPagesHandler;
	}

	public void setSheetPage(Sheet sheetPage) {
		this.sheetPage = sheetPage;
	}

	public void setGetValueHandler(IHandler getValueHandler) {
		this.getValueHandler = getValueHandler;
	}

	public void setGroup(boolean isGroup) {
		this.isGroup = isGroup;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public void setTotalArea(boolean isTotalArea) {
		this.isTotalArea = isTotalArea;
	}

	public void setUnionDatasourceAll(UnionDatasource unionDatasourceAll) {
		this.unionDatasourceAll = unionDatasourceAll;
	}

	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}

	public void setTempHeight(double tempHeight) {
		this.tempHeight = tempHeight;
	}

	public void setVariable(Variables variable) {
		this.variable = variable;
	}

	public void setTempRow(int tempRow) {
		this.tempRow = tempRow;
	}

	public void setFillData(boolean isFillData) {
		this.isFillData = isFillData;
	}

	public double getHeight() {
		return height;
	}

	public List<Row> getRows() {
		return this.rows;
	}
	
	public void setPageHandler(IHandler pageHandler){
		this.pageHandler = pageHandler;
	}

}
