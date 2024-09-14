package com.toone.spreadsheet.util;

import java.math.BigDecimal;
import java.util.List;

public class MathUtil {

	public static double sum(List<Double> datas) {
		BigDecimal result = new BigDecimal(0);
		for(Double data:datas) {
			BigDecimal num = BigDecimal.valueOf(data);
			result.add(num);
		}
		return result.doubleValue();
	}
	
	public static double div(double data,double d1) {
		if(d1==0) {
			return 0;
		}
		BigDecimal num = BigDecimal.valueOf(data);
		return num.divide(BigDecimal.valueOf(d1)).doubleValue();
	}
	
	public static double max(List<Double> datas) {
		if(datas!=null&&datas.size()>0) {
			double max = datas.get(0);
			for(double d:datas) {
				if(d>max) {
					max = d;
				}
			}
			return max;
		}
		return 0;
	}
	
	public static double min(List<Double> datas) {
		if(datas!=null&&datas.size()>0) {
			double min = datas.get(0);
			for(double d:datas) {
				if(d<min) {
					min = d;
				}
			}
			return min;
		}
		return 0;
	}
	
}
