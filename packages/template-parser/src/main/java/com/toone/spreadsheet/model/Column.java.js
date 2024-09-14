package com.toone.spreadsheet.model;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.toone.spreadsheet.util.JsonUtil;

public class Column {
	//外部传入属性
	  private int numberOfColumns = 1; //分栏数量
	  private UnionDatasource datasource = null; //数据源
	  private int totalHeight = 0; //栏的最大总高度。所有栏的高度不能大于这个值
	  private Map template = null; //行模板
	  private Map sheet = null;
	  private int startIndex = 0; //数据源的起始索引
	  private List namedStyles = new ArrayList(); //样式命名空间(样式引用)。
	  private int startRow = 0;
	  private boolean isFillData = false; //数据不满一页时是否填充满一页
	  private boolean singleRowFill = false;
	  private boolean fixed = false;
	  private int fixedColumnCount = 0;
	  private int blankSpan = 0;
	  private int oldSheetCount = 20;
	  private String groupName = null;

	  //内部属性
	  private List<ColumnItem> columnItems = new ArrayList(); //存储没一栏的信息
	  private List plugins = new ArrayList(); //待执行的插件
	  private List formulas = new ArrayList(); //待执行的公式
	  private Map dataTable = null;
	  private int rowCount = 0;
	  private int tempRowCount = 0;
	  private int height = 0;
	  private boolean isLastPage = false;
	  private int dataCount = 0;
	  private List<Map> spans = new ArrayList(); //单元格合并信息
	  private List<Map> rows = new ArrayList(); //行相关信息(行高，是否显示)
	  private List rules = new ArrayList(); //单元格的条件规则
	  private List<Map> autoMergeRanges = new ArrayList(); //自动合并区域
	  private int tempRow = 0; 
	  
	  private List expandDataTables = new ArrayList();

	  /*constructor(parameter = {}) {
	    Object.entries(parameter).forEach(([key, value]) => {
	      this[key] = value;
	    });
	    this.render();
	  }*/
	  
	  public void setDatasource(UnionDatasource datasource) {
		  this.datasource = datasource;
	  }
	  
	  public void setTotalHeight(int totalHeight) {
		  this.totalHeight = totalHeight;
	  }
	  
	  public void setStartRow(int startRow) {
		  this.startRow = startRow;
	  }
	  
	  public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	public void setFixed(boolean fixed) {
		this.fixed = fixed;
	}

	public void setFixedColumnCount(int fixedColumnCount) {
		this.fixedColumnCount = fixedColumnCount;
	}

	public void setNumberOfColumns(int numberOfColumns) {
		this.numberOfColumns = numberOfColumns;
	}

	public void setNamedStyles(List namedStyles) {
		this.namedStyles = namedStyles;
	}

	public void setOldSheetCount(int oldSheetCount) {
		this.oldSheetCount = oldSheetCount;
	}

	public void setBlankSpan(int blankSpan) {
		this.blankSpan = blankSpan;
	}

	public void setFillData(boolean isFillData) {
		this.isFillData = isFillData;
	}

	public void setSheet(Map sheet) {
		this.sheet = sheet;
	}

	public void setSingleRowFill(boolean singleRowFill) {
		this.singleRowFill = singleRowFill;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public void setTempRow(int tempRow) {
		this.tempRow = tempRow;
	}

	public void setTemplate(Map template) {
		this.template = template;
	}

	public boolean isLastPage() {
		return isLastPage;
	}

	public int getHeight() {
		return height;
	}

	public int getDataCount() {
		return dataCount;
	}

	public List getPlugins() {
		return plugins;
	}

	public List getFormulas() {
		return formulas;
	}
	
	public Map getDataTable() {
		return this.dataTable;
	}
	
	public int getTempRowCount() {
		return this.tempRowCount;
	}
	
	public List getSpans() {
		return this.spans;
	}
	
	public List<Map> getRules() {
		return this.rules;
	}
	
	public int getStartRow() {
		return this.startRow;
	}
	
	public int getRowCount() {
		return this.rowCount;
	}
	
	public List getAutoMergeRanges() {
		return this.autoMergeRanges;
	}
	
	public List<Map> getRows(){
		return this.rows;
	}
	
	public List getExpandDataTables(){
		return this.expandDataTables;
	}

	public void render() {
	    for (int i = 0; i < this.numberOfColumns; i++) {
	      ColumnItem columnItem = new ColumnItem();
	      columnItem.setTemplate(this.template);
	      columnItem.setDatasource(this.datasource);
	      columnItem.setTotalHeight(this.totalHeight);
	      columnItem.setParent(i == 0 ? null : this.columnItems.get(i - 1));
		  columnItem.setStartIndex(this.startIndex);
		  columnItem.setSheet(this.sheet);
		  columnItem.setNamedStyles(this.namedStyles);
		  columnItem.setFillData(this.isFillData);
		  columnItem.setSingleRowFill(this.singleRowFill);
		  columnItem.setStartRow(this.startRow);
		  columnItem.setTempRow(this.tempRow);
		  columnItem.render();
	      this.columnItems.set(i, columnItem);
	    }
	    this.genDataTable();
	  }
	  @SuppressWarnings({ "rawtypes", "unchecked" })
	private void genDataTable() {
	    int columnCount = this.fixed ? this.fixedColumnCount : this.oldSheetCount;
	    Map dataTable = new HashMap();
	    Map lastDataTable = null;
	    for(int _index=0,l=this.columnItems.size();_index<l;_index++) {
	    	ColumnItem item = this.columnItems.get(_index);
	    	this.tempRowCount = item.getTempRowCount();
	      if (item.getDataCount() > this.rowCount) {
	        this.rowCount = item.getRowCount();
	      }
	      if (item.getHeight() > this.height) {
	        this.height = item.getHeight();
	      }
	      this.dataCount += item.getDataCount();
	      int colOffset =
	        _index * columnCount + (_index > 0 ? this.blankSpan : 0);
	      List rows = item.getRows();
	      for(int index=0,len=rows.size();index<len;index++) {
	        Row row = (Row)rows.get(index);
	    	  //行号
	        int rowNo = index + this.startRow;
	        if(!dataTable.containsKey(rowNo)) {
	        	dataTable.put(rowNo, new HashMap());
	        }
	        lastDataTable = (Map)dataTable.get(rowNo);
	        Map rowDataTable = row.getDataTable();
	        for(Object o:rowDataTable.entrySet()) {
	        	Entry entry = (Entry)o;
	        	int col = Integer.valueOf((String)entry.getKey());
	        	lastDataTable.put(col + colOffset, entry.getValue());
	        }
	        //合并信息
	        for(Map span:row.getSpans()) {
	        	Map map = new HashMap(span);
	        	map.put("row", rowNo);
	        	map.put("col", (Integer)span.get("col")+colOffset);
	        	this.spans.add(map);
	        }

	        //行高等信息
	        Map rowSizeInfo = this.rows.get(rowNo);
	        if (rowSizeInfo!=null) {
	          if ((Integer)rowSizeInfo.get("size") < row.getRowHeight()) {
	            rowSizeInfo.put("size",row.getRowHeight());
	          }
	        } else {
	        	Map map = new HashMap(row.getRows());
	        	map.put("size", row.getRowHeight());
	          this.rows.set(rowNo, map);
	        }

	        //条件规则
	        for(Map rule : row.getRules()) {
	        	Map map = new HashMap(rule);
		    	List ranges = new ArrayList();
		    	Map range = new HashMap();
		    	range.putAll((Map)((List)rule.get("ranges")).get(0));
		    	range.put("row", rowNo);
		    	range.put("col", (Integer)((Map)((List)rule.get("ranges")).get(0)).get("col")+colOffset);
		    	ranges.add(range);
		    	map.put("ranges", ranges);
	        	this.rules.add(map);
	        }

	        //自动合并
	        for(Map info: row.getAutoMergeRanges()) {
	        	Map map = new HashMap(info);
	        	Map range = new HashMap((Map)info.get("range"));
	        	range.put("row", rowNo);
	        	range.put("col", (Integer)JsonUtil.get(info, "range","col")+colOffset);
	          this.autoMergeRanges.add(info);
	        }
	        
	        
	        //横向扩展
	        Map expandDataTable = (Map)this.expandDataTables.get(rowNo);
	        if(expandDataTable == null){
	        	expandDataTable = new HashMap();
	        	this.expandDataTables.add(expandDataTable);
	        }

	        Map rowExpandDataTable = row.getExpandDataTable();
	        for(Object obj:rowExpandDataTable.entrySet()){
	        	Entry entry = (Entry)obj;
	        	int col = (Integer)entry.getKey() + colOffset;
	        	expandDataTable.put(col,entry.getValue());
	        }
	      
	        //插件
	        this.plugins.addAll(row.getPlugins());
	        //公式
	        this.formulas.addAll(row.getFormulas());
	      }
	      //自动合并区域
	      List<Map> vMergeRanges = item.getVerticalAutoMergeRanges();
	      for(Map info:vMergeRanges) {
	    	  Map map = new HashMap(info);
	    	  Map range = new HashMap((Map)info.get("range"));
	    	  range.put("row", this.startRow);
	    	  range.put("col", (Integer)JsonUtil.get(info, "range","col")+colOffset);
	    	  map.put("range", range);
	        this.autoMergeRanges.add(map);
	      }
	    }
	    this.dataTable = dataTable;
	    if (this.startIndex + this.dataCount >= this.datasource.getCount()) {
	      this.isLastPage = true;
	      //单行填充满一页
	      double size = this.totalHeight - this.height - 10;
	      if (this.isFillData && this.singleRowFill && size >= 20) {
	        Map<Object,Map> _lastDataTable = JsonUtil.parseObject(JsonUtil.toJSONString(lastDataTable));
	        for(Map item:_lastDataTable.values()) {
	        	item.put("value", "");
	        	item.put("formula", "");
	        }
	        this.dataTable.put(this.rowCount + this.startRow ,_lastDataTable);
	        Map rowMap = new HashMap();
	        rowMap.put("size", size);
	        this.rows.set(this.rowCount + this.startRow,rowMap);
	        List spans = new ArrayList();
	        for(Map span:this.spans) {
	          if ((Integer)span.get("row") == this.rowCount + this.startRow - 1) {
	        	  Map spanMap = new HashMap(span);
	        	  spanMap.put("row", this.rowCount + this.startRow);
	        	  spans.add(spanMap);
	          }
	        }
	        this.spans.addAll(spans);
	        this.rowCount += 1;
	      }
	    }
	  }
}