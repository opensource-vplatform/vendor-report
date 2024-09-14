package com.toone.spreadsheet.util;

public class NumberUtil {

	public static boolean isNumber(Object num) {
		if(num==null) {
			return false;
		}
		try {
			Double.valueOf(num.toString());
			return true;
		}catch(Throwable e) {
			return false;
		}
	}
	
}
