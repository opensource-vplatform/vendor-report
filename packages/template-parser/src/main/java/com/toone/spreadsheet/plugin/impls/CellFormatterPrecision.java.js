package com.toone.spreadsheet.plugin.impls;

import java.util.HashMap;
import java.util.Map;

import com.toone.spreadsheet.api.ITool;
import com.toone.spreadsheet.plugin.Plugin;
import com.toone.spreadsheet.util.JsonUtil;

public class CellFormatterPrecision extends Plugin {

	@SuppressWarnings("rawtypes")
	public CellFormatterPrecision(Map plugin) {
		super(plugin);
	}

	@SuppressWarnings("rawtypes")
	public Object handleFormatter(Object value, Map config) {
		Object precisionVal = JsonUtil.get(config, "precision"); // 默认保留2位小数
		int precision = 2;
		if (precisionVal != null) {
			precision = (Integer) precisionVal;
		}
		Object removeTrailingZerosVal = JsonUtil.get(config, "removeTrailingZeros");
		boolean removeTrailingZeros = true; // 默认为 true
		if (removeTrailingZerosVal != null) {
			removeTrailingZeros = (Boolean) removeTrailingZerosVal;
		}
		// 如果 value 是数字，则进行格式化
		try {
			double dbl = Double.valueOf(value + "");
			String formattedValue = String.format("%." + precision + "f", dbl);
			if (removeTrailingZeros) {
				// 去掉尾部的0
				return Double.valueOf(formattedValue);
			}
			return formattedValue;
		} catch (Throwable e) {
			return value;
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Map execute(Map value, ITool tool) {
		Map config = this.getConfig();
		Object val = value.get("value");
		Map result = new HashMap(2);
		result.put("type", "text");
		result.put("value", this.handleFormatter(val, config));
		return result;
	}

}
