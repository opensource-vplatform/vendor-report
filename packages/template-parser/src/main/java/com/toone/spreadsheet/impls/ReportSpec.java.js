package com.toone.spreadsheet.impls;

import java.util.Map;

import com.toone.spreadsheet.IReportSpec;
import com.toone.spreadsheet.util.JsonUtil;

/**
 * 报表数据标准实例
 * @author matoa
 *
 */
public class ReportSpec implements IReportSpec {
	
	private Map<String,Object> data = null;
	
	public ReportSpec(Map<String,Object> data) {
		this.data = data;
	}
	
	public String toJson() {
		return this.data==null ? "":JsonUtil.toJSONString(this.data);
	}

	public Map<String, Object> toMap() {
		return this.data;
	}

}
