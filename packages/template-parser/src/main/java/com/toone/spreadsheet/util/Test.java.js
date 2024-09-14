package com.toone.spreadsheet.util;

import java.util.ArrayList;
import java.util.List;

public class Test {
	public static void main(String[] args) {
		/*
		 * List array = new ArrayList(); array.set(13, "");
		 */

		double value = 123.45;
		String formattedValue = String.format("%.4f", value);
		System.out.println(formattedValue); // 输出 123.46

	}
}
