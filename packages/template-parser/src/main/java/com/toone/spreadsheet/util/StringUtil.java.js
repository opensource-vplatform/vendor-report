package com.toone.spreadsheet.util;

import java.util.Arrays;
import java.util.List;

public class StringUtil {
	
	public static boolean isEmpty(String str) {
		return str==null||"".equals(str.trim());
	}

	public static String join(List<String> list,String split) {
		StringBuilder builder = new StringBuilder();
		for (int i = 0,len=list.size(); i < len; i++) {
			String item = list.get(i);
			builder.append(item==null ? "null":item);
			if(i+1<len) {
				builder.append(split);
			}
		}
		return builder.toString();
	}
	
	public static String join(String split,String ...strs) {
		return join(Arrays.asList(strs),split);
	}
	
}
