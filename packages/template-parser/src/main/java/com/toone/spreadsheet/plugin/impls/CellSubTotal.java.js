package com.toone.spreadsheet.plugin.impls;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.toone.spreadsheet.api.ITool;
import com.toone.spreadsheet.model.UnionDatasource;
import com.toone.spreadsheet.plugin.Plugin;
import com.toone.spreadsheet.util.MathUtil;
import com.toone.spreadsheet.util.NumberUtil;
import com.toone.spreadsheet.util.StringUtil;

public class CellSubTotal extends Plugin {

	@SuppressWarnings("rawtypes")
	public CellSubTotal(Map plugin) {
		super(plugin);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private List<Double> toNumberList(List<Map<String, Object>> datas) {
		List<Double> result = new ArrayList();
		for (Map<String, Object> record : datas) {
			Object value = record.get("value");
			if (NumberUtil.isNumber(value)) {
				result.add(Double.valueOf(value+""));
			}
		}
		return result;
	}

	/**
	 * 分组汇总
	 * 
	 * @param {*} value
	 * @param {*} tool
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private Map groupSubTotal(Map value, ITool tool) {
		Map config = this.getConfig();
		int functionNum = (Integer) config.get("functionNum");
		String bindingPath = (String) config.get("bindingPath");
		String tableCode = (String) config.get("tableCode");
		String fieldCode = (String) config.get("fieldCode");
		UnionDatasource unionDatasource = tool.getUnionDatasource();
		List<Map<String, Object>> values = this._isTreeSumField(value, tool)
				? unionDatasource.getLeafFieldValues(tableCode, fieldCode)
				: !StringUtil.isEmpty(bindingPath) ? unionDatasource.getFieldValuesByPath(bindingPath)
						: unionDatasource.getFieldValues(tableCode, fieldCode);
		if (values == null) {
			values = new ArrayList();
		}
		double rest = 0;
		switch (functionNum) {
		case 101:
			// 平均值
			rest = MathUtil.div(MathUtil.sum(this.toNumberList(values)), values.size());
			break;
		case 103:
			// 计数
			rest = values.size();
			break;
		case 102:
			// 数值计数
			rest = this.toNumberList(values).size();
			break;
		case 104:
			// 最大值
			rest = MathUtil.max(this.toNumberList(values));
			break;
		case 105:
			// 最小值
			rest = MathUtil.min(this.toNumberList(values));
			break;
		case 109:
			// 求和
			rest = MathUtil.sum(this.toNumberList(values));
		}
		Map mp = new HashMap(2);
		mp.put("type", "text");
		mp.put("value", rest);
		return mp;
	}

	/**
	 * 是否为属性汇总字段
	 */
	@SuppressWarnings("rawtypes")
	private boolean _isTreeSumField(Map value, ITool tool) {
		Map config = this.getConfig();
		String tableCode = (String) config.get("tableCode");
		String fieldCode = (String) config.get("fieldCode");
		UnionDatasource unionDatasource = tool.getUnionDatasource();
		return unionDatasource.isTreeSumField(tableCode, fieldCode);
	}

	/*	  *//**
			 * 范围转换成公式参数
			 * 
			 * @param {*} ranges
			 * @returns
			 *//*
				 * private _rangesToFormulaArgs(ranges) { const GC = getNamespace(); const
				 * Sheets = GC.Spread.Sheets; const CalcEngine = Sheets.CalcEngine; const
				 * allRelative = CalcEngine.RangeReferenceRelative.allRelative; const
				 * rangesToFormula = CalcEngine.rangesToFormula; return rangesToFormula(ranges,
				 * 0, 0, allRelative, false); }
				 */

	/**
	 * 获取汇总范围
	 * 
	 * @param {*} value
	 * @param {*} tool
	 * @returns
	 *//*
		 * _getSubTotalRanges(value, tool) { const ranges = []; const unionDatasource =
		 * tool.getUnionDatasource(); const config = this.getConfig(); const {
		 * tableCode, fieldCode } = config; const count = tool.getDataCount(tableCode);
		 * const { row, col } = tool.getFieldIndex(tableCode, fieldCode); const GC =
		 * getNamespace(); const Range = GC.Spread.Sheets.Range; if
		 * (this._isTreeSumField(value, tool)) { const index =
		 * tool.getDataIndex(tableCode, fieldCode); const indexs =
		 * unionDatasource.getLeafRanges( tableCode, index, index + count );
		 * indexs.forEach((ind) => { ranges.push(new Range(row + (ind - index), col, 1,
		 * 1)); }); } else { ranges.push(new Range(row, col, count, 1)); } return
		 * ranges; }
		 */

	/**
	 * 汇总
	 * 
	 * @param {*} value
	 * @param {*} tool
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private Map subTotal(Map value, ITool tool) {
		UnionDatasource unionDatasource = tool.getUnionDatasource();
		Map config = this.getConfig();
		String tableCode = (String) config.get("tableCode");
		String fieldCode = (String) config.get("fieldCode");
		int count = tool.getDataCount(tableCode);
		int dataIndex = tool.getDataIndex(null, null);
		int _value = 0;
		if (this._isTreeSumField(value, tool)) {
			int index = tool.getDataIndex(tableCode, fieldCode);
			List<Integer> indexs = unionDatasource.getLeafRanges(tableCode, index, index + count);
			for (int ind : indexs) {
				Map record = unionDatasource.getValue(tableCode + "." + fieldCode, ind);
				double val = 0;
				if (record != null) {
					Object recordVal = record.get("value");
					if (NumberUtil.isNumber(recordVal)) {
						val = (Double) recordVal;
					}
				}
				_value += val;
			}
		} else {
			for (int i = dataIndex; i < count + dataIndex; i++) {
				Map record = unionDatasource.getValue(tableCode + "." + fieldCode, i);
				double val = 0;
				if (record != null) {
					Object recordVal = record.get("value");
					if (NumberUtil.isNumber(recordVal)) {
						val = Double.valueOf(recordVal.toString());
					}
				}
				_value += val;
			}
		}
		Map result = new HashMap(2);
		result.put("type", "text");
		result.put("value", _value);
		return result;
	}

	@SuppressWarnings("rawtypes")
	public Map execute(Map value, ITool tool) {
		return tool.isInGroupSumArea() ? this.groupSubTotal(value, tool) : this.subTotal(value, tool);
	}

}
