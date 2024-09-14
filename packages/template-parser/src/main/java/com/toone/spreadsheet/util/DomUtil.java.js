package com.toone.spreadsheet.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

public class DomUtil {

	private static Map<String, Integer> FONT_LINE_HEIGHT = new HashMap<String, Integer>();

	private static Map<String, Integer> FONT_CNCHAR_WIDTH = new HashMap<String, Integer>();

	private static Map<String, Integer> FONT_UNCNCHAR_WIDTH = new HashMap<String, Integer>();

	static {
		// 行高
		FONT_LINE_HEIGHT.put("6pt", 10);
		FONT_LINE_HEIGHT.put("8pt", 14);
		FONT_LINE_HEIGHT.put("9pt", 16);
		FONT_LINE_HEIGHT.put("10pt", 17);
		FONT_LINE_HEIGHT.put("11pt", 20);
		FONT_LINE_HEIGHT.put("12pt", 21);
		FONT_LINE_HEIGHT.put("14pt", 25);
		FONT_LINE_HEIGHT.put("16pt", 29);
		FONT_LINE_HEIGHT.put("18pt", 31);
		FONT_LINE_HEIGHT.put("20pt", 35);
		FONT_LINE_HEIGHT.put("22pt", 39);
		FONT_LINE_HEIGHT.put("24pt", 42);
		FONT_LINE_HEIGHT.put("26pt", 46);
		FONT_LINE_HEIGHT.put("28pt", 49);
		FONT_LINE_HEIGHT.put("36pt", 64);
		FONT_LINE_HEIGHT.put("48pt", 170);
		FONT_LINE_HEIGHT.put("72pt", 254);
		// 中文字符宽度
		FONT_CNCHAR_WIDTH.put("6pt", 8);
		FONT_CNCHAR_WIDTH.put("8pt", 11);
		FONT_CNCHAR_WIDTH.put("9pt", 12);
		FONT_CNCHAR_WIDTH.put("10pt", 14);
		FONT_CNCHAR_WIDTH.put("11pt", 15);
		FONT_CNCHAR_WIDTH.put("12pt", 16);
		FONT_CNCHAR_WIDTH.put("14pt", 19);
		FONT_CNCHAR_WIDTH.put("16pt", 22);
		FONT_CNCHAR_WIDTH.put("18pt", 24);
		FONT_CNCHAR_WIDTH.put("20pt", 27);
		FONT_CNCHAR_WIDTH.put("22pt", 30);
		FONT_CNCHAR_WIDTH.put("24pt", 32);
		FONT_CNCHAR_WIDTH.put("26pt", 35);
		FONT_CNCHAR_WIDTH.put("28pt", 38);
		FONT_CNCHAR_WIDTH.put("36pt", 48);
		FONT_CNCHAR_WIDTH.put("48pt", 64);
		FONT_CNCHAR_WIDTH.put("72pt", 96);
		// 非中文字符宽度
		FONT_UNCNCHAR_WIDTH.put("6pt", 5);
		FONT_UNCNCHAR_WIDTH.put("8pt", 6);
		FONT_UNCNCHAR_WIDTH.put("9pt", 7);
		FONT_UNCNCHAR_WIDTH.put("10pt", 8);
		FONT_UNCNCHAR_WIDTH.put("11pt", 9);
		FONT_UNCNCHAR_WIDTH.put("12pt", 9);
		FONT_UNCNCHAR_WIDTH.put("14pt", 11);
		FONT_UNCNCHAR_WIDTH.put("16pt", 12);
		FONT_UNCNCHAR_WIDTH.put("18pt", 14);
		FONT_UNCNCHAR_WIDTH.put("20pt", 15);
		FONT_UNCNCHAR_WIDTH.put("22pt", 17);
		FONT_UNCNCHAR_WIDTH.put("24pt", 18);
		FONT_UNCNCHAR_WIDTH.put("26pt", 20);
		FONT_UNCNCHAR_WIDTH.put("28pt", 21);
		FONT_UNCNCHAR_WIDTH.put("36pt", 27);
		FONT_UNCNCHAR_WIDTH.put("48pt", 36);
		FONT_UNCNCHAR_WIDTH.put("72pt", 54);
	}

	private static int get(Map<String, Integer> map, String fontSize) {
		if (map.containsKey(fontSize)) {
			return map.get(fontSize);
		}
		throw new RuntimeException("未支持该字体大小！" + fontSize);
	}

	private static int getLineHeight(String fontSize) {
		return get(FONT_LINE_HEIGHT, fontSize);
	}

	private static int getChineseCharWidth(String fontSize) {
		return get(FONT_CNCHAR_WIDTH, fontSize);
	}

	private static int getUnChineseCharWidth(String fontSize) {
		return get(FONT_UNCNCHAR_WIDTH, fontSize);
	}

	private static boolean isChinese(char str) {
		try {
			StringBuilder builder = new StringBuilder(str);
			String res = URLEncoder.encode(builder.toString(), "UTF-8");
			return res.startsWith("%E");
		} catch (UnsupportedEncodingException e) {
			return false;
		}
	}

	public static int getFitHeight(String text, int width, String fontSize) {
		if (text == null || text.length() == 0) {
			return 0;
		}
		int lineHeight = getLineHeight(fontSize);
		int wd = 0;
		int lineCount = 0;
		char[] charSeq = text.toCharArray();
		for (int i = 0, len = charSeq.length; i < len; i++) {
			char chr = charSeq[i];
			int w = isChinese(chr) ? getChineseCharWidth(fontSize) : getUnChineseCharWidth(fontSize);
			if (w > width) {
				return lineHeight;
			}
			int nwd = wd + w;
			if (nwd > width) {
				lineCount++;
				wd = w;
			} else if (nwd == width) {
				lineCount++;
				wd = 0;
			} else {
				wd = nwd;
			}
		}
		if (wd > 0) {
			lineCount++;
		}
		return lineCount * lineHeight;
	}
}
