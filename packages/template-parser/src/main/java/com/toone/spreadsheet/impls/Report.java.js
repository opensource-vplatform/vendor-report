package com.toone.spreadsheet.impls;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.toone.spreadsheet.IReport;
import com.toone.spreadsheet.IReportSpec;
import com.toone.spreadsheet.ReportException;
import com.toone.spreadsheet.model.ReportParser;
import com.toone.spreadsheet.model.Sheet;
import com.toone.spreadsheet.util.JsonUtil;

public class Report implements IReport{
	
	//报表模板
	private Map<String,Object> template;
	
	private Map<String,Object> reportData;
	
	private List<Map<String,Object>> pages;
	
	private ReportParser parser;
	
	public Report(Map<String,Object> template) {
		this.template = template;
	}
	
	private void checkDataLoaded() {
		if(this.parser==null) {
			throw new ReportException("当前报表模板还未加载数据，请先调用load接口加载数据！");
		}
	}
	
	@SuppressWarnings("unchecked")
	private List<Map<String,Object>> getPages(){
		this.checkDataLoaded();
		if(this.pages==null) {
			Map<String,Object> sheetPages = (Map<String,Object>)this.parser.getSheetPages();
			if(sheetPages!=null) {
				String activeSheetName = (String)this.parser.getActiveSheetName();
				Map<String,Object> sheetPage = (Map<String,Object>)sheetPages.get(activeSheetName);
				if(sheetPage!=null) {
					this.pages = (List<Map<String,Object>>)sheetPage.get("datas");
				}
			}
		}
		return this.pages;
	}

	public int getPageCount() {
		List<Map<String,Object>> pages = this.getPages();
		if(pages!=null) {
			return pages.size();
		}
		return 0;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private Map<String,Object> resetReportData(Sheet sheet) {
		JsonUtil.set(this.reportData, sheet.getDataTable(), "data","dataTable");
		int rowCount = sheet.getRowCount();
		if(rowCount>0) {
			this.reportData.put("rowCount", rowCount);
		}
		List rules = sheet.getRules();
		Map conditionalFormats = (Map)this.reportData.get("conditionalFormats");
		if(conditionalFormats==null) {
			conditionalFormats = new HashMap();
		}
		conditionalFormats.put("rules", rules);
		this.reportData.put("conditionalFormats", conditionalFormats);
		this.reportData.put("spans", sheet.getSpans());
		this.reportData.put("rows", sheet.getRows());
		this.reportData.put("columns", sheet.getColumns());
		this.reportData.put("autoMergeRangeInfos", sheet.getAutoMergeRanges());
		this.reportData.put("autoMergeRangeInfos", sheet.getShapes());
		return this.reportData;
	}

	public IReportSpec navigateTo(int pageIndex) {
		List<Map<String,Object>> pages = this.getPages();
		if(pages!=null) {
			int pageCount = pages.size();
			if(pageIndex+1>pageCount) {
				throw new ReportException("当前报表总页数为:"+pageCount+",导航到第"+(pageIndex+1)+"页失败！");
			}else {
				Sheet sheet = (Sheet)pages.get(pageIndex);
				return new ReportSpec(this.resetReportData(sheet));
			}
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	public void load(Map<String, Object> datas) {
		this.pages = null;
		//内部实现会更改报表模板数据，进行深度拷贝防止更改原始数据
		Map<String,Object> newTemplate = JsonUtil.parseObject(JsonUtil.toJSONString(this.template));
		Map<String,Object> params = new HashMap<String,Object>(2);
		params.put("datas", datas);
		params.put("reportJson", newTemplate);
		this.parser =new ReportParser(params);
		this.reportData = newTemplate;
	}

}
