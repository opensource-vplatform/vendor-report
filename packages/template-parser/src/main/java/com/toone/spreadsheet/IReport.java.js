package com.toone.spreadsheet;

import java.util.Map;

import com.toone.spreadsheet.impls.Report;

/**
 * 报表实例
 * @author matoa
 *
 */
public interface IReport {
	
	/**
	 * 获取总页数
	 * @return
	 */
	int getPageCount();
	
	/**
	 * 导航到指定页数
	 * @param pageIndex
	 * @return 报表数据
	 */
	IReportSpec navigateTo(int pageIndex);
	
	/**
	 * 加载数据
	 * @param datas
	 */
	void load(Map<String,Object> datas);

	/**
	 * 报表模板解析器构造工厂
	 * @author matoa
	 *
	 */
	class Factory{
		
		/**
		 * 根据报表模板，创建报表解析器
		 * @param template
		 * @return
		 */
		public static IReport create(Map<String,Object> template) {
			return new Report(template);
		}
		
	}

}
